import express, { Router } from 'express';
import passport from 'passport';
import { isNotLoggedIn, isLoggedIn } from '../middlewares/auth';
import { UserType } from 'user';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();
const authJwt = require('../middlewares/authJwt');

/** /api/auth/login Post Endpoint **/
router.post('/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err: Error, user: UserType, info: { message: string }) => {
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
      });
    });
  })(req, res, next);
});

/** /api/auth/logout Post Endpoint **/
router.post('/logout', authJwt, (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.status(200).json({
        success: true,
        message: '로그아웃 되었습니다.',
      });
    });
  });
});

/** /api/auth Get Endpoint **/
router.get('/login', isLoggedIn, (req, res) => {
  res.status(200).json({
    success: true,
    message: '로그인한 상태입니다.',
  });
});

module.exports = router;
