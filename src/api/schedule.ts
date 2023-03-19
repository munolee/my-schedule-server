import 'dotenv/config';
import express, { Request, Response, Router } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { XMLParser } from 'fast-xml-parser';
import { ScheduleType, HolidayJsonType } from 'schedule';

const request = require('request');
const authJwt = require('../middlewares/authJwt');

const router: Router = express.Router();
const client = new MongoClient(process.env.MONGO_URI);
const parser = new XMLParser();

// mongo DB 접속 확인
client
  .connect()
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=${process.env.OPENAPI_SERVICE_KEY}&numOfRows=100`;

/** /api/schedule Get Endpoint **/
router.get('/', authJwt, async (req: Request, res: Response) => {
  // DB 스케쥴 데이터 불러오기
  const schedule = await client
    .db('schedule')
    .collection<ScheduleType>('schedule')
    .find({ userId: res.locals.id })
    .toArray();

  // 공공 데이터 포탈 공휴일 데이터 요청 보내기
  const year = req.query.year || '2023';
  request(
    `${url}&solYear=${year}`,
    async (error: Error, response: Response, body: string | Buffer) => {
      try {
        await new Promise(() => {
          const holidayJson = parser.parse(body).response.body.items.item;

          // 가져온 데이터를 형식에 맞게 파싱하기
          const holidaySchedule: ScheduleType[] = Object.values(
            holidayJson
          ).map((data: HolidayJsonType) => {
            return {
              _id: '',
              startDate: (data?.locdate)
                .toString()
                .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
              endDate: (data?.locdate)
                .toString()
                .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
              eventTitle: data?.dateName,
              typeId: 2,
              bgColor: '#EDAA7D',
            };
          });

          // DB 데이터와 병합, 정렬 후 데이터 내보내기
          const schedules = [...holidaySchedule, ...schedule].sort((a, b) => {
            if (a.startDate >= b.startDate) return 1;
            if (a.endDate >= b.endDate) return -1;
            return -1;
          });
          res.json(schedules);
        });
      } catch (error) {
        console.error(error);
        // 에러 발생 시 DB 데이터만 내보내기
        res.json(schedule);
      }
    }
  );
});

/** /api/schedule Post Endpoint **/
router.post('/', authJwt, async (req: Request, res: Response) => {
  try {
    await client
      .db('schedule')
      .collection<ScheduleType>('schedule')
      .insertOne({
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
    const result = await client
      .db('schedule')
      .collection<ScheduleType>('schedule')
      .updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...req.body } },
        { upsert: true }
      );

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
    const result = await client
      .db('schedule')
      .collection<ScheduleType>('schedule')
      .deleteOne({ _id: new ObjectId(_id) });

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
