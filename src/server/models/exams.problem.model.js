import mongoose from "mongoose";

const exams = new mongoose.Schema({
    name: String,
    examId:String,
    subject:String,
    type:String,
    duration:Number,
    marks:Number,
    section:String,
    time : Number,
    date: Date
});
export default mongoose.model("exams", exams);
