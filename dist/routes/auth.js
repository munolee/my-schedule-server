"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const auth_1 = require("../middlewares/auth");
const authJwt = require('../middlewares/authJwt');
const router = express_1.default.Router();
router.post('/login', auth_1.isNotLoggedIn, AuthController_1.authLogin);
router.post('/logout', authJwt, AuthController_1.authLogout);
router.get('/login', auth_1.isLoggedIn, AuthController_1.authLogInCheck);
module.exports = router;
//# sourceMappingURL=auth.js.map