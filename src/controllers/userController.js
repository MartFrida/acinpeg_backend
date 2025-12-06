import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import HttpError from '../utils/HttpError.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '1d'; // срок действия токена

export const createUser = async (req, res, next) => {
  try {
    const {username, useremail, password, role} = req.body;

    const exists = await User.findOne ({useremail});
    if (exists) throw HttpError (409, 'This email already in use');

    const hashed = await bcrypt.hash (password, 10);

    const user = await User.create ({
      username,
      useremail,
      password: hashed,
      role,
    });

     res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        username: user.username,
        useremail: user.useremail,
        role: user.role,
      },
    });
    
  } catch (error) {
    next (error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');;
    res.json (users);
  } catch (error) {
    next (error);
  }
};

export const loginUser = async (req, res,next) => {
  try {
    const {useremail, password} = req.body;

    const user = await User.findOne ({useremail});
    if (!user) throw HttpError (404, 'User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw HttpError(401, 'Invalid credentials');

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Можно отправлять токен в HttpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 1 день
    });

     res.json({
      message: 'Logged in successfully',
      user: {
        id: user._id,
        username: user.username,
        useremail: user.useremail,
        role: user.role,
      },
    });

  } catch (error) {
    next (error);
  }
};

// GET CURRENT USER
export const getCurrentUser = async (req, res, next) => {
  try {
    // req.user приходит из middleware auth
        res.json(req.user);
  } catch (error) {
    next(error);
  }
};

// SIGN OUT
export const signOutUser = async (req, res, next) => {
  try {
    // удаляем cookie
    res.clearCookie('token');
    res.json({ message: 'Signed out successfully' });
  } catch (error) {
    next(error);
  }
};
