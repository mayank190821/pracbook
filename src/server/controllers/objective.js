import objectiveProblemModel from "../models/objective.problem.model.js";

const addObjectiveQuestion = async(req,res)=>{
    const problem = new objectiveProblemModel(req.body);
    try{
    await problem.save();
    res.status(200).json({
        message:"objective Question added",
    });
    }
    catch (err){
        res.status(404).json({
            message:"error",
        });
        console.log(err);
    }
}
const fetchByTopicName=async(req,res)=>{
    try{
        const questions = await objectiveProblemModel.findOne({
            topicName:req.body.topicName
        })
        res.status(200).json(questions.questions);
    }
    catch (err){
        console.log(err);
    }
}
const fetchByQuestionID = async(req,res)=>{

}
export {addObjectiveQuestion,fetchByQuestionID,fetchByTopicName};