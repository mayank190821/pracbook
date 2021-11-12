import mongoose from "mongoose";

const codingProblem = new mongoose.Schema({
	name: String,
	problemStatement: String,
	constraints: String,
	inputFormat: String,
    outputFormat: String,
    sampleInput: [String],
	sampleOutput: [String],
	explanation: [String],
	inputTestCases: [String],
	outputTestCases: [String]
});

export default mongoose.model("codingProblem", codingProblem);
