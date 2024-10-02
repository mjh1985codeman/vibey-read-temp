import { Router } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(401).json({ message: "Password doesn't match" });
  }
  const secretKey = process.env.JWT_SECRET_KEY || "";
  const token = jwt.sign({ username }, secretKey, { expiresIn: "24h" });
  return res.status(201).json({ token });
};
const router = Router();
// POST /login - Login a user
router.post("/login", login);
export default router;
