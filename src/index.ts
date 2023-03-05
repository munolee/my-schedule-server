import express, { Application, Request, Response } from 'express'
import {schedule} from "./mock";

const index: Application = express()
const port: number = 3001

index.get('/schedule', (req: Request, res: Response) => {
    res.json(schedule);
})

index.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})