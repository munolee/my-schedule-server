"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ScheduleController_1 = require("../controllers/ScheduleController");
const authJwt = require('../middlewares/authJwt');
const router = express_1.default.Router();
router.get('/', authJwt, ScheduleController_1.getSchedule);
router.post('/', authJwt, ScheduleController_1.createSchedule);
router.put('/:id', authJwt, ScheduleController_1.updateSchedule);
router.delete('/:id', authJwt, ScheduleController_1.deleteSchedule);
module.exports = router;
//# sourceMappingURL=schedule.js.map