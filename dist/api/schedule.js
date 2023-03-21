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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const ScheduleModel_1 = __importDefault(require("../models/ScheduleModel"));
const authJwt = require('../middlewares/authJwt');
const router = express_1.default.Router();
const { ObjectId } = mongoose_1.Types;
/** /api/schedule Get Endpoint **/
router.get('/', authJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = yield ScheduleModel_1.default.find({ userId: res.locals.id });
        res.status(200).json({
            success: true,
            message: '일정 데이터 요청에 성공하였습니다.',
            data: schedule,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: '일정 데이터 전송에 실패하였습니다.',
        });
    }
}));
/** /api/schedule Post Endpoint **/
router.post('/', authJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ScheduleModel_1.default.create(Object.assign(Object.assign({}, req.body), { userId: res.locals.id }));
        res.status(200).json({
            success: true,
            message: '성공적으로 등록되었습니다.',
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: '일정 등록에 실패하였습니다.',
        });
    }
}));
/** /api/schedule Put Endpoint **/
router.put('/:id', authJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const result = yield ScheduleModel_1.default.updateOne({ _id: new ObjectId(_id) }, { $set: Object.assign({}, req.body) }, { upsert: true });
        if (result.modifiedCount === 0) {
            res.status(404).json({
                success: false,
                message: '해당 일정을 찾을 수 없습니다.',
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: '성공적으로 수정되었습니다.',
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: '일정 수정에 실패하였습니다.',
        });
    }
}));
/** /api/schedule Delete Endpoint **/
router.delete('/:id', authJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const result = yield ScheduleModel_1.default.deleteOne({ _id: new ObjectId(_id) });
        if (result.deletedCount === 0) {
            res.status(404).json({
                success: false,
                message: '해당 일정을 찾을 수 없습니다.',
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: '성공적으로 삭제되었습니다.',
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: '일정 삭제에 실패하였습니다.',
        });
    }
}));
module.exports = router;
//# sourceMappingURL=schedule.js.map