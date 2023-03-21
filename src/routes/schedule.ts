import express from 'express';
import { getSchedule, createSchedule, updateSchedule, deleteSchedule } from '../controllers/ScheduleController';

const authJwt = require('../middlewares/authJwt');

const router = express.Router();

router.get('/', authJwt, getSchedule);
router.post('/', authJwt, createSchedule);
router.put('/:id', authJwt, updateSchedule);
router.delete('/:id', authJwt, deleteSchedule);

module.exports = router;
