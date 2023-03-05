import express, { Request, Response, Router } from 'express'
import { schedule } from "../mock";

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.json(schedule);
})

module.exports = router;