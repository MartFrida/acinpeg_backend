import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import HttpError from '../utils/HttpError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw HttpError(401, 'Not authorized');

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) throw HttpError(404, 'User not found');

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
