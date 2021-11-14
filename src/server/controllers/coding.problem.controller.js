import codingProblemModel from "../models/coding.problem.model.js";

const addCodingProblem = async (req, res) => {
    const problem = new codingProblemModel(req.body);
    try{
        await problem.save();
        return res.status(200).json({
            message: "problem saved"
        });
    }catch(err){
        return res.status(400).json({
            message: err.message
        })
    }
}

const filterProblems = async (req, res) => {
    try{
        const problems = await codingProblemModel.find(req.body);
        return res.status(200).json(problems);
    }
    catch(err){
        return res.status(400).json({
            message: err
        })
    }
}

const getProblemById = async (req, res) => {
    try{
        const problem = await codingProblemModel.findOne({_id:req.body.id});
        return res.status(200).json(problem);
    }
    catch(err){
        return res.status(400).json({
            message: err
        })
    }
}
// const executeCode = 0;

export  {addCodingProblem, filterProblems, getProblemById};