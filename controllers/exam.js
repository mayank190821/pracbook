import examsModel from "../models/exams.model.js";
import axios from "axios";

const addExam = async (req, res) => {
  const exam = new examsModel(req.body);
  try {
    await exam.save();
    res.status(200).json({
      message: "exam added",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
const compile = async (req, res) => {
  var options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions",
    params: { base64_encoded: "false", fields: "*", wait: true },
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "x-rapidapi-key": process.env.compileKey,
    },
    data: req.body,
  };

  await axios
    .request(options)
    .then((response) => {
      return res.status(200).json({ data: response.data });
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
};

const getExamById = async (req, res) => {
  try {
    const exam = await examsModel.findById({ _id: req.headers.id });
    res.status(200).json(exam);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
const deleteOneByID = async (req, res) => {
  try {
    const exam = await examsModel.findByIdAndDelete(req.body.id);
    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export { addExam, getExamById, deleteOneByID, compile };
