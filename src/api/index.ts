import express, { Router } from 'express';

const router: Router = express.Router();

router.use('/schedule', require('./schedule'));
router.use('/auth', require('./auth'));

module.exports = router;
