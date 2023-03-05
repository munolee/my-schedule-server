"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mock_1 = require("../mock");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    return res.json(mock_1.schedule);
});
module.exports = router;
//# sourceMappingURL=schedule.js.map