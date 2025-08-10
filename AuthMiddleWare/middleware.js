import jwt from 'jsonwebtoken';

export const checkAuthenticated = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    // No token → user not logged in
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user payload to request
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
