import express from "express";
import Question from "../models/Question.js";
const router = express.Router();

router.get('/getQuestions', async (req, res) => {
    try {
        const { language } = req.query;
        const result = await Question.find({ language });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

export default router;
