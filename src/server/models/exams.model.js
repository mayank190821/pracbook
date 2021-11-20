import mongoose from "mongoose";

const exams = new mongoose.Schema({
  name: String,
  subject: String,
  duration: Number,
  marks: Number,
  section: String,
  time: String, 
  date: String,
  questionIds: [String],
  completed: Boolean,
});

export default mongoose.model("exams", exams);
