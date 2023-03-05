"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mock_1 = require("../api/mock");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.get('/api/schedule', (req, res) => {
    return res.json(mock_1.schedule);
});
app.listen(port, () => {
    return console.log(`App is listening on port ${port} !`);
});
//# sourceMappingURL=index.js.map