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
export {addObjectiveQuestion};