import express, { Application, Request, Response } from 'express'
import { schedule } from "./mock";

const app: Application = express()
const port: number = 3001

app.get('/schedule', (req: Request, res: Response) => {
    res.json(schedule);
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})