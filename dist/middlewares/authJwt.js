"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authJwt = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1];
        // token 검증
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded) {
            res.locals.id = decoded._doc.id;
            next(); // 로그인 성공 시 다음 메서드 실행
        }
        else {
            res.status(403).json({
                success: false,
                message: '로그인이 필요합니다.',
            });
        }
    }
    else {
        res.status(401).json({
            success: false,
            message: '로그인이 필요합니다.',
        });
    }
};
module.exports = authJwt;
//# sourceMappingURL=authJwt.js.map