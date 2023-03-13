import express, { Router } from 'express';
import passport from 'passport';
import { isNotLoggedIn, isLoggedIn } from '../middlewares/auth';
import { UserType } from 'user';
import jwt from 'jsonwebtoken';

const router: Router = express.Router();
const authJwt = require('../middlewares/authJwt');

/** /api/auth Get Endpoint **/
router.get('/', authJwt, (req, res, next) => {
  res.send(req.session);
});

/** /api/auth/login Post Endpoint **/
router.post('/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate(
    'local',
    (err: Error, user: UserType, info: { message: string }) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).json({
          success: false,
          message: info.message,
          token: null,
        });
      }
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }
        const token = jwt.sign(
          {
            id: user.id,
            pw: user.pw,
          },
          process.env.JWT_SECRET_KEY,
          {
            algorithm: 'HS256',
            expiresIn: '1h',
          }
        );
        res.status(200).json({
          success: true,
          message: '로그인에 성공하였습니다.',
          token,
        });
      });
    }
  )(req, res, next);
});

/** /api/auth/logout Post Endpoint **/
router.post('/logout', authJwt, (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
