import 'dotenv/config';
import express, { Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import Schedule from '../models/ScheduleModel';

const authJwt = require('../middlewares/authJwt');

const router: Router = express.Router();

const { ObjectId } = Types;

/** /api/schedule Get Endpoint **/
router.get('/', authJwt, async (req: Request, res: Response) => {
  try {
    const schedule = await Schedule.find({ userId: res.locals.id });
    res.status(200).json({
      success: true,
      message: '일정 데이터 요청에 성공하였습니다.',
      data: schedule,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '일정 데이터 전송에 실패하였습니다.',
    });
  }
});

/** /api/schedule Post Endpoint **/
router.post('/', authJwt, async (req: Request, res: Response) => {
  try {
    await Schedule.create({
      ...req.body,
      userId: res.locals.id,
    });
    res.status(200).json({
      success: true,
      message: '성공적으로 등록되었습니다.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '일정 등록에 실패하였습니다.',
    });
  }
});

/** /api/schedule Put Endpoint **/
router.put('/:id', authJwt, async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const result = await Schedule.updateOne({ _id: new ObjectId(_id) }, { $set: { ...req.body } }, { upsert: true });

    if (result.modifiedCount === 0) {
      res.status(404).json({
        success: false,
        message: '해당 일정을 찾을 수 없습니다.',
      });
    } else {
      res.status(200).json({
        success: true,
        message: '성공적으로 수정되었습니다.',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '일정 수정에 실패하였습니다.',
    });
  }
});

/** /api/schedule Delete Endpoint **/
router.delete('/:id', authJwt, async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const result = await Schedule.deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: '해당 일정을 찾을 수 없습니다.',
      });
    } else {
      res.status(200).json({
        success: true,
        message: '성공적으로 삭제되었습니다.',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '일정 삭제에 실패하였습니다.',
    });
  }
});

module.exports = router;
