import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import YAML from 'yamljs';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());

app.use(express.static('public'));
app.get('/', (_req: Request, res: Response) => {
  return res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// Swagger UI 미들웨어 적용
const swaggerSpec = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// /api 엔드포인트에 요청이 들어오면 api 폴더로 분기
app.use('/api', require('./api'));

app.all('*', (req, res) => {
  res.status(404).send('<h1> 요청 페이지 없음 </h1>');
});

app.listen(port, () => {
  return console.log(`App is listening on port ${port} !`);
});
