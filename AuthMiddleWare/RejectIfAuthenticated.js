// middlewares/rejectIfAuthenticated.js
import jwt from 'jsonwebtoken';

export const rejectIfAuthenticated = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return next(); // not logged in → allow

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(400).json({ message: 'Already logged in' });
  } catch {
    return next(); // invalid token → allow login
  }
};
