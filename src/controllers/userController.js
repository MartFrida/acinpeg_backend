import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { username, useremail, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already taken" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: username,
      email: useremail,
      password: hashed,
      role,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
