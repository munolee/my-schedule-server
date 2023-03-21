import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { UserType } from '../interfaces/user';
import jwt from 'jsonwebtoken';

/** /api/auth/login Post Endpoint **/
export const authLogin = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error, user: UserType, info: { message: string }) => {
    if (err) {
      console.error(err);
      next(err);
    }
    if (info) {
      res.status(401).json({
        success: false,
        message: info.message,
        token: null,
      });
    }
    req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const token = jwt.sign(
        {
          ...user,
        },
        process.env.JWT_SECRET_KEY,
        {
          algorithm: 'HS256',
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );
      res.status(200).json({
        success: true,
        message: '로그인에 성공하였습니다.',
        token,
        userId: user.id,
      });
    });
  })(req, res, next);
};

/** /api/auth/logout Post Endpoint **/
export const authLogout = (req: Request, res: Response) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.status(200).json({
        success: true,
        message: '로그아웃 되었습니다.',
      });
    });
  });
};

/** /api/auth Get Endpoint **/
export const authLogInCheck = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '로그인한 상태입니다.',
  });
};
