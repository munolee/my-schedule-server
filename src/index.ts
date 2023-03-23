import 'dotenv/config';
import express, { Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import mongoose from 'mongoose';
import appRouter from './routes';

const localStrategy = require('./passport/localStrategy');

const app = express();

// To allow cross-origin requests
app.use(cors({ credentials: true, origin: '*' }));

// setup passport local, session
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

// setup bodyparser
app.use(bodyParser.json());

// Route Prefixes
app.use('/api', appRouter);

// setup Swagger middleware
const swaggerSpec = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Send index.html on root request
app.use(express.static('dist'));
app.get('/', (req: Request, res: Response) => {
  console.log('sending index.html');
  res.sendFile('/dist/index.html');
});

// throw 404 if URL not found
app.all('*', (req, res) => {
  res.status(404).send('<h1> Page not found </h1>');
});

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`App is listening on port ${port} !`));
  })
  .catch((err) => console.log(err.message));
