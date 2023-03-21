import express from 'express';
import { getHoliday } from '../controllers/HolidayController';

const router = express.Router();

router.get('/', getHoliday);

module.exports = router;
