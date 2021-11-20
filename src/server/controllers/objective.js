import objectiveProblemModel from "../models/objective.problem.model.js";

const addObjectiveQuestion = async (req, res) => {
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
    const question = await objectiveProblemModel.findOne({
      questionId: req.headers.id,
    });
    res.status(200).json({question: question});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { addObjectiveQuestion, fetchByQuestionID, fetchByTopicName };
