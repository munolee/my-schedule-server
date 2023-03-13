import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authJwt = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    // header에서 access token을 가져옵니다.
    const token = req.headers.authorization.split('Bearer ')[1];
    try {
      // token을 검증합니다.
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded) {
        // 로그인 성공 시 다음 메서드 실행
        next();
      }
    } catch (err) {
      console.error(err);
      res.status(401).send({
        message: '로그인이 필요합니다.',
      });
    }
  }
};

module.exports = authJwt;
