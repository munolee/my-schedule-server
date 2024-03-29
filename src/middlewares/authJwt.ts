import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authJwt = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    // token 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
    if (decoded) {
      res.locals.id = decoded._doc.id;
      next(); // 로그인 성공 시 다음 메서드 실행
    } else {
      res.status(403).json({
        success: false,
        message: '로그인이 필요합니다.',
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: '로그인이 필요합니다.',
    });
  }
};

module.exports = authJwt;
