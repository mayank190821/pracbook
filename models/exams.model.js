import mongoose from "mongoose";

const exams = new mongoose.Schema({
  name: String,
  subject: String,
  duration: Number,
  objMarks: Number,
  codingMarks: Number,
  year: String,
  section: String,
  dateTime: Date,
  questionIds: [String],
  objectCount: Number,
  codingCount: Number,
  completed: Boolean,
});

export default mongoose.model("exams", exams);
