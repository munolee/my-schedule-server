import express, { Request, Response, Router } from 'express'
import { XMLParser } from 'fast-xml-parser';
import { schedule } from '../mock';
import { ScheduleType, HolidayJsonType } from 'schedule';

const request = require('request');

const router: Router = express.Router();
const parser = new XMLParser();

const serviceKey =  'UqfEaWsllhXKcqR1XHjqNFvwf75vk1k4HOd4IAh6eK1aIK75vhki%2FgEuhDeo%2BEe3hp1%2F%2BvHRLeGjM9ZTFQfVIA%3D%3D'
const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=${serviceKey}`
let holidayJson = {}

/** /api/schedule Endpoint **/
router.get('/', (req: Request, res: Response) => {

    // 공공 데이터 포탈 공휴일 데이터 요청 보내기
    const year = req.query.year || '2023';
    request(url + `&solYear=${year}`, async (error: Error, response: Response, body: string | Buffer) => {
        if (!error && response.statusCode == 200) {
            await new Promise(() => {
                holidayJson = parser.parse(body).response.body.items.item
            })
        } else {
            console.error(error);
            res.status(500).send('Something went wrong');
        }
    });

    // 가져온 데이터를 형식에 맞게 파싱하기
    const holidaySchedule: ScheduleType[] = Object.values(holidayJson).map((data: HolidayJsonType) => {
        return {
            startDate: (data.locdate).toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
            endDate: (data.locdate).toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
            eventTitle: data.dateName,
            typeId: 2,
            bgColor: "#EDAA7D"
        }
    })

    // Mock 데이터와 병합, 정렬 후 데이터 내보내기
    const schedules = [...holidaySchedule, ...schedule].sort((a, b) => {
        if (a.startDate >= b.startDate) return 1;
        if (a.endDate >= b.endDate) return -1;
        return -1;
    })
    return res.json(schedules);
})

module.exports = router;