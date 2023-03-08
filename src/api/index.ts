import express, { Router } from 'express';

const router: Router = express.Router();

router.use('/schedule', require('./schedule'));

module.exports = router;
