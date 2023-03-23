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
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const localStrategy = require('./passport/localStrategy');
const app = (0, express_1.default)();
// To allow cross-origin requests
app.use((0, cors_1.default)({ credentials: true, origin: true }));
// setup passport local, session
localStrategy();
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// setup bodyparser
app.use(body_parser_1.default.json());
// Route Prefixes
app.use('/api', routes_1.default);
// setup Swagger middleware
const swaggerSpec = yamljs_1.default.load(path_1.default.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Send index.html on root request
app.use(express_1.default.static('dist'));
app.get('/', (req, res) => {
    console.log('sending index.html');
    res.sendFile('/dist/index.html');
});
// throw 404 if URL not found
app.all('*', (req, res) => {
    res.status(404).send('<h1> Page not found </h1>');
});
const port = process.env.PORT || 8080;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(port, () => console.log(`App is listening on port ${port} !`));
})
    .catch((err) => console.log(err.message));
//# sourceMappingURL=index.js.map