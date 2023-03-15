import 'dotenv/config';
import express, { Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

const appRouter = require('./api');
const localStrategy = require('./passport/localStrategy');

const app = express();
const port = process.env.PORT || 8080;
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

app.use(express.static('public'));
app.get('/', (_req: Request, res: Response) => {
  return res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// passport local 설정 및 express-session 추가
localStrategy();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Swagger UI 미들웨어 적용
const swaggerSpec = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// config bodyParser
app.use(bodyParser.json());

// /api 엔드포인트에 요청이 들어오면 api 폴더로 분기
app.use('/api', appRouter);

app.all('*', (req, res) => {
  res.status(404).send('<h1> 요청 페이지 없음 </h1>');
});

app.listen(port, () => {
  return console.log(`App is listening on port ${port} !`);
});
