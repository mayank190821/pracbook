import mongoose from "mongoose";

const facultyModel = new mongoose.Schema({
    name: String,
	email: String,
	password: String,
	sections: [String],
	subjects: [String],
});

export default mongoose.model("facultyModel", facultyModel);

