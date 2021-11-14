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
        const objByTopic = await objectiveProblemModel.findOne({
            topicName:req.body.topicName
        })
        res.status(200).json(objByTopic.questions);
    }
    catch (err){
        res.status(404).json({
            message:"error",
        });
        console.log(err);
    }
}
const fetchByQuestionID = async(req,res)=>{
    try{
        const objQues =await objectiveProblemModel.findOne({
            questionID:req.body.questionID
        }) 
        res.status(200).json(objQues.questions);
    }
    catch(err){
        console.log(err);
    }
}
export {addObjectiveQuestion,fetchByQuestionID,fetchByTopicName};