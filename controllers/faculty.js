import facultyModel from "../models/faculty.model.js";
import examsModel from "../models/exams.model.js";
import extend from "lodash/extend.js";
import jwt from "jsonwebtoken";
// import config from "./../../config/config.js";
import studentModel from "../models/student.model.js";

const createFaculty = async (req, res) => {
  const faculty = new facultyModel(req.body);
  try {
    await faculty.save();
    return res.status(200).json({
      message: "Faculty Added",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let faculty = await facultyModel.findOne({ email: req.body.email });
    if (!faculty) return res.status(401).json({ error: "Faculty not found!" });
    if (!faculty.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match!" });
    }

    const token = jwt.sign(
      {
        _id: faculty._id,
      },
      process.env.jwtSecret
    );

    res.cookie("ft", token, { expire: new Date() + 9999 });

    return res.status(200).json({
      token: token,
      user: faculty,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const logout = (req, res) => {
  res.clearCookie("ft");
  return res.status(200).json({
    message: "Successfully logged out",
  });
};

const facultyById = async (req, res, next, id) => {
  const faculty = await facultyModel.findById(id);
  try {
    if (!faculty) {
      return res.status(400).json({ message: "Faculty not found" });
    }
    req.faculty = faculty;
    next();
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const changeFacultyPassword = async (req, res) => {
  try {
    if (req.faculty) {
      if (!req.faculty.authenticate(req.body.currentPassword)) {
        return res
          .status(401)
          .json({ error: "Email and password don't match!" });
      }
      let faculty = extend(req.faculty, {
        password: req.body.newPassword,
        name: req.body.name,
      });
      await faculty.save();
      return res.status(200).json({ message: "password changed" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getExamsByFaculty = async (req, res) => {
  try {
    let exams = [];
    if (req.faculty) {
      const sections = req.faculty.sections;
      for (let i = 0; i < JSON.parse(JSON.stringify(sections)).length; i++) {
        for (
          let j = 0;
          j < JSON.parse(JSON.stringify(sections[i].subjects)).length;
          j++
        ) {
          const exam = await examsModel.find({
            section: sections[i].sectionName,
            subject: { $regex: `${sections[i].subjects[j]}`, $options: "i" },
          });
          if (exam.length !== 0) exams.push(exam);
        }
      }
    }
    return res.status(200).json({ exams: exams });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const fetchExamId = async (req, res, next) => {
  let exam = await examsModel.findOne({
    name: req.body.type,
    subject: { $regex: `${req.body.subject}`, $options: "i" },
    section: req.body.section,
    year: req.body.year,
  });
  if (exam) {
    req.examId = exam._id;
  }
  next();
};

const examResults = async (req, res) => {
  try {
    if (!req.faculty) {
      res.status(400).json({ message: "Faculty not found!" });
    }
    let examId = req.examId;
    let students = await studentModel.find({
      section: req.body.section,
      subjects: { $regex: `${req.body.subject}`, $options: "i" },
      year: req.body.year,
    });
    let results = [],
      marks;
    students.forEach((student) => {
      marks = -1;
      student.exams.forEach((exam) => {
        if (exam.examId === examId.toString()) {
          marks = exam.result.marksObtained;
        }
      });
      results.push({
        name: student.name,
        section: student.section,
        status: marks === -1 ? "A" : "P",
        marks: marks === -1 ? "N/A" : marks,
        year: student.year,
        rollNumber: student.rollNumber,
      });
    });
    res.status(200).json({
      results: results,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};
export {
  createFaculty,
  login,
  logout,
  examResults,
  facultyById,
  getExamsByFaculty,
  changeFacultyPassword,
  fetchExamId,
};
