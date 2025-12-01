import {Router} from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {getUsers, createUser} from '../controllers/userController.js';

const authRouter = Router ();
const router = Router ();
router.get ('/', getUsers);

// Register
authRouter.post ('/register', createUser);

// Login
authRouter.post ('/login', async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne ({username});
  if (!user) return res.status (400).json ({error: 'User not found'});

  const match = await bcrypt.compare (password, user.password);
  if (!match) return res.status (400).json ({error: 'Invalid password'});

  const token = jwt.sign (
    {id: user._id, role: user.role},
    process.env.JWT_SECRET
  );
  res.json ({token, user});
});

export default authRouter;
