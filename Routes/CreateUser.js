import express from "express";
import User from "../models/User.js";
import {body, validationResult} from "express-validator";
import config from '../utils/environments.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Route to register a new user
router.post('/register',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ errors: [{ msg: "Email is already registered" }] });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = await User.create({ name, email, password: hashedPassword });
      const token = jwt.sign({ _id: user._id }, config.SECRET);

      // localStorage.setItem('token', token);
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.status(200).json({ success: true, token }); // Return token upon successful registration
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

// Route to login a user
router.post('/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User not found. Please register." }] });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ errors: [{ msg: "Incorrect password" }] });
      }

      const token = jwt.sign({ _id: user._id }, config.SECRET);

      res.cookie("token", token, {
        httpOnly: true
      });
      res.status(200).json({ success: true, token: token }); // Return token upon successful login
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

export default router;