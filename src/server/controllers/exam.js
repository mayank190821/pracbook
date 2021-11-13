import examsModel from "../models/exams.model.js";
const addExam = async (req,res) => {
    console.log(req.body);
    const exam = new examsModel(req.body);
    try {
        await exam.save();
        res.status(200).json({
            message : "exam added"
        });
    }
    catch(err) {
        res.status(400).json({
          message: err.message,
        });
    }
}

export {addExam};