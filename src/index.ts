import express, { Request, Response } from 'express'
import {schedule} from "../api/mock";

const app = express()
const port = process.env.PORT || 8080

app.get('/', (_req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel')
})

app.get('/api/schedule', (req: Request, res: Response) => {
    return res.json(schedule);
})

app.listen(port, () => {
    return console.log(`App is listening on port ${port} !`)
})