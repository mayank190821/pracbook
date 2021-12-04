import studentModel from "../models/student.model.js";
import examsModel from "../models/exams.model.js";
// import config from "../config/config.js";
import extend from "lodash/extend.js";
import jwt from "jsonwebtoken";

const createStudent = async (req, res) => {
  const student = new studentModel(req.body);
  try {
    await student.save();
    return res.status(200).json({
      message: "Student Added",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    let student = await studentModel.findOne({ email: req.body.email });
    if (!student) return res.status(401).json({ error: "Student not found!" });
    if (!student.authenticate(req.body.password))
      return res.status(401).json({ error: "Email and password don't match!" });

    const token = jwt.sign(
      {
        _id: student._id,
      },
      process.env.jwtSecret
    );

    res.cookie("st", token, { expire: new Date() + 9999 });

    return res.status(200).json({
      token: token,
      user: student,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const signOut = (req, res) => {
  res.clearCookie("st");
  return res.status(200).json({
    message: "Successfully Signed Out",
  });
};

const changeStudentPassword = async (req, res) => {
  try {
    if (req.student) {
      if (!req.student.authenticate(req.body.currentPassword)) {
        return res
          .status(401)
          .json({ error: "Email and password don't match!" });
      }
      let student = extend(req.student, { password: req.body.newPassword });
      await student.save();
      return res.status(200).json({ message: "Password changed" });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const studentById = async (req, res, next, id) => {
  try {
    const student = await studentModel.findById(id);
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }
    req.student = student;
    next();
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const getStudentById = async (req, res) => {
  if (!req.student) return res.status(404).json({ error: "user not found" });
  return res.status(200).json({ user: req.student });
};
const getResultById = async (req, res) => {
  try {
    for (
      let i = 0;
      i < JSON.parse(JSON.stringify(req.student.exams)).length;
      i++
    ) {
      return res.status(200).json({ exams: req.student.exams });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const uploadResult = async (req, res) => {
  try {
    if (!req.student) {
      return res.status(400).json({ message: "Student does not exist!" });
    }
    const student = req.student;
    let flag = 0;
    for (let i = 0; i < student.exams.length; i++) {
      if (student.exams[i].examId === req.body.examId) {
        student.exams[i].result = {
          marksObtained: req.body.marks,
        };
        flag = 1;
      }
    }
    if (flag === 0) {
      student.exams.push({
        examId: req.body.examId,
        result: {
          marksObtained: req.body.marks,
        },
      });
    }
    await student.save();
    return res.status(200).json({ message: "Result Uploaded!" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getExamsByStudentId = async (req, res) => {
  try {
    if (req.student) {
      let regexs = req.student.subjects.toString();
      for (let i = 0; i < regexs.length; i++) {
        if (regexs[i] === ",")
          regexs =
            regexs.substr(0, i) + "|" + regexs.substr(i + 1, regexs.length);
      }
      let exams = await examsModel.find({
        section: req.student.section,
        subject: { $regex: regexs, $options: "i" },
      });
      return res.status(200).json({ exams: exams });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export {
  createStudent,
  signIn,
  getResultById,
  getExamsByStudentId,
  uploadResult,
  getStudentById,
  changeStudentPassword,
  signOut,
  studentById,
};
