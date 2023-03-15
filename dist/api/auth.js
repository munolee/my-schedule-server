"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../middlewares/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const authJwt = require('../middlewares/authJwt');
/** /api/auth/login Post Endpoint **/
router.post('/login', auth_1.isNotLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate('local', (err, user, info) => {
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
        req.login(user, (loginErr) => __awaiter(void 0, void 0, void 0, function* () {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            const token = jsonwebtoken_1.default.sign(Object.assign({}, user), process.env.JWT_SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            res.status(200).json({
                success: true,
                message: '로그인에 성공하였습니다.',
                token,
            });
        }));
    })(req, res, next);
}));
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
router.get('/login', auth_1.isLoggedIn, (req, res) => {
    res.status(200).json({
        success: true,
        message: '로그인한 상태입니다.',
    });
});
module.exports = router;
//# sourceMappingURL=auth.js.map