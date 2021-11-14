import mongoose from 'mongoose';
const objectiveProblem = new mongoose.Schema({
    topicName:String,
    questionID:{
		type: String,
		default: "ob" + Math.round(new Date().valueOf() * (Math.random()+ 0.1))
	},
    questions:{
        question:String,
        option1:String,
        option2:String,
        option3:String,
        option4:String,
        answer:String
    }
});
export default mongoose.model('objectiveProblem',objectiveProblem);