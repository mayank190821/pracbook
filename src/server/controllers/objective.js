import objectiveProblemModel from "../models/objective.problem.model.js";

const addObjectiveQuestion = async (req, res) => {
  console.log(req.body);
  const problem = new objectiveProblemModel(req.body);
  problem.questionId = "ob" + Math.round(new Date() * Math.random() + 0.1);
  try {
    await problem.save();
    res.status(200).json({
      message: "question added",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const fetchByTopicName = async (req, res) => {
  try {
    const objByTopic = await objectiveProblemModel.findOne({
      topicName: req.body.topicName,
    });
    res.status(200).json(objByTopic.questions);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

const fetchByQuestionID = async (req, res) => {
  try {
    const objQues = await objectiveProblemModel.findOne({
      questionId: req.body.questionId,
    });
    res.status(200).json(objQues.questions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const fetchQuestions = async (req, res) => {
  try {
    const objQues = await objectiveProblemModel.find({});
    res.status(200).json({questions:objQues});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export {
  addObjectiveQuestion,
  fetchByQuestionID,
  fetchByTopicName,
  fetchQuestions,
};
