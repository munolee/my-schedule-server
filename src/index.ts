import express, { Application } from 'express'
import schedule from "../api/schedule";

const app: Application = express()
const port: number = 3001

app.use('/api/schedule', schedule);

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})