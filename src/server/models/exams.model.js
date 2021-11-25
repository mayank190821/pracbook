import mongoose from "mongoose";

const exams = new mongoose.Schema({
  name: String,
  subject: String,
  duration: Number,
  marks: Number,
  year:String,
  section: String,
  time: String, 
  date: String,
  questionIds: [String],
  objectCount: Number,
  codingCount: Number,
  completed: Boolean,
});

export default mongoose.model("exams", exams);
