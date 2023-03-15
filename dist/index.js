"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
const appRouter = require('./api');
const localStrategy = require('./passport/localStrategy');
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express_1.default.static('public'));
app.get('/', (_req, res) => {
    return res.sendFile('index.html', { root: path_1.default.join(__dirname, 'public') });
});
// passport local 설정 및 express-session 추가
localStrategy();
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Swagger UI 미들웨어 적용
const swaggerSpec = yamljs_1.default.load(path_1.default.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// config bodyParser
app.use(body_parser_1.default.json());
// /api 엔드포인트에 요청이 들어오면 api 폴더로 분기
app.use('/api', appRouter);
app.all('*', (req, res) => {
    res.status(404).send('<h1> 요청 페이지 없음 </h1>');
});
app.listen(port, () => {
    return console.log(`App is listening on port ${port} !`);
});
//# sourceMappingURL=index.js.map