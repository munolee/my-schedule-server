import express, { Request, Response } from 'express'
import path from "path";
import { schedule } from "../api/mock";

const app = express()
const port = process.env.PORT || 8080

app.use(express.static('public'))

app.get('/', (_req: Request, res: Response) => {
    return res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

app.get('/api/schedule', (req: Request, res: Response) => {
    return res.json(schedule);
})

app.listen(port, () => {
    return console.log(`App is listening on port ${port} !`)
})