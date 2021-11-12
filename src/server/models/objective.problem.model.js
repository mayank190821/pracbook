import mongoose from 'mongoose';
const objectiveProblem = new mongoose.Schema({
    topicName:String,
    questions:[{
        question:String,
        option1:String,
        option2:String,
        option3:String,
        option4:String,
        answer:String
    }]
});
export default mongoose.model('objectiveProblem',objectiveProblem);