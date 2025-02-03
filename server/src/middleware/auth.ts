import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    console.log(err, user);
    if (err || !user) {
      return res.sendStatus(403);
    }
    req.user = user as JwtPayload;
    return next();
  });
  return;
};
