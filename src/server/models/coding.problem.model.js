import mongoose from "mongoose";

const codingProblem = new mongoose.Schema({
	name: String,
	questionId: {
		type: String,
		default: "cp" + new Date().valueOf()
	},
	difficulty: String,
	type: String,
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
