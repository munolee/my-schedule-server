import express, { Application, Request, Response } from "express";
import { schedule } from "./mock";

const app: Application = express()

export default app.get('/', (req: Request, res: Response) => {
    res.json(schedule);
})