"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.static('public'));
app.get('/', (_req, res) => {
    return res.sendFile('index.html', { root: path_1.default.join(__dirname, 'public') });
});
// Swagger UI 미들웨어 적용
const swaggerSpec = yamljs_1.default.load(path_1.default.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// /api 엔드포인트에 요청이 들어오면 api 폴더로 분기
app.use('/api', require('./api'));
app.all('*', (req, res) => {
    res.status(404).send('<h1> 요청 페이지 없음 </h1>');
});
app.listen(port, () => {
    return console.log(`App is listening on port ${port} !`);
});
//# sourceMappingURL=index.js.map