import express, { Router } from 'express';

const router: Router = express.Router();

router.use('/auth', require('./auth'));

router.use('/schedule', require('./schedule'));

module.exports = router;
