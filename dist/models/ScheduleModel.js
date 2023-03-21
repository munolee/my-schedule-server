"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const scheduleSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    eventTitle: {
        type: String,
        required: true,
    },
    typeId: {
        type: Number,
        required: true,
    },
    bgColor: {
        type: String,
        required: true,
    },
});
const Schedule = mongoose_1.default.model('Schedule', scheduleSchema, 'schedule');
exports.default = Schedule;
//# sourceMappingURL=ScheduleModel.js.map