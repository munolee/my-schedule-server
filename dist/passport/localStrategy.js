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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const LocalStrategy = passport_local_1.default.Strategy;
module.exports = () => {
    passport_1.default.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
        session: true,
        passReqToCallback: false,
    }, (id, pw, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // 가입된 회원인지 아닌지 확인
            const exUser = yield UserModel_1.default.findOne({ id: id });
            // 만일 가입된 회원이면
            if (exUser) {
                if (pw === exUser.pw) {
                    done(null, exUser);
                }
                else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); //
                }
            }
            else {
                // DB에 해당 id가 없다면, 회원 가입 한적이 없다.
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    })));
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
};
//# sourceMappingURL=localStrategy.js.map