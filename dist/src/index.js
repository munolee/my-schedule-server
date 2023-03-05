"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_1 = __importDefault(require("../api/schedule"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.get('/api/schedule', (req, res) => {
    res.json(schedule_1.default);
});
app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});
//# sourceMappingURL=index.js.map