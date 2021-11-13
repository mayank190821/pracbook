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

// const addNewCodingProblem = 0;
// const executeCode = 0;

export  {addCodingProblem};