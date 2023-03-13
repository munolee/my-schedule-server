"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authJwt = (req, res, next) => {
    if (req.headers.authorization) {
        // header에서 access token을 가져옵니다.
        const token = req.headers.authorization.split('Bearer ')[1];
        try {
            // token을 검증합니다.
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
            if (decoded) {
                // 로그인 성공 시 다음 메서드 실행
                next();
            }
        }
        catch (err) {
            console.error(err);
            res.status(401).json({
                message: '로그인이 필요합니다.',
            });
        }
    }
};
module.exports = authJwt;
//# sourceMappingURL=authJwt.js.map