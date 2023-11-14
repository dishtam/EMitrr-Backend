import express from "express";

const router = express.Router();

router.get("/home",(req,res)=>{
    res.send('This is Home Page');
})

export default router;