import express, {Application, Request, Response} from 'express'
import schedule from "../api/schedule";

const app: Application = express()
const port = process.env.PORT || 8080

app.get('/api/schedule', (req: Request, res: Response) => {
    res.json(schedule);
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})