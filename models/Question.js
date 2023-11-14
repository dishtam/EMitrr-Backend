import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String], 
    correctAnswer: Number, 
    language: String,
});


const Question =  mongoose.model('Questions',questionSchema);

export default Question;