import { Request, Response } from 'express';
import { HolidayJsonType } from '../interfaces/schedule';
import { XMLParser } from 'fast-xml-parser';

const request = require('request');

const parser = new XMLParser();
const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=${process.env.OPENAPI_SERVICE_KEY}&numOfRows=100`;

/** /api/holiday Get Endpoint **/
export const getHoliday = async (req: Request, res: Response) => {
  // 공공 데이터 포탈 공휴일 데이터 요청 보내기
  request(`${url}&solYear=${req.query.year}`, async (error: Error, response: Response, body: string | Buffer) => {
    try {
      await new Promise(() => {
        const holidayJson = parser.parse(body).response.body.items.item;

        if (!holidayJson) {
          return res.status(200).json({
            success: true,
            message: '공휴일 데이터가 존재하지 않습니다.',
            data: [],
          });
        }

        // 가져온 데이터를 형식에 맞게 파싱하기
        const holiday = Object.values(holidayJson).map((data: HolidayJsonType) => {
          return {
            _id: '',
            startDate: (data?.locdate).toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
            endDate: (data?.locdate).toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
            eventTitle: data?.dateName,
            typeId: 2,
            bgColor: '#EDAA7D',
          };
        });

        res.status(200).json({
          success: true,
          message: '공휴일 데이터 요청에 성공하였습니다.',
          data: holiday,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: '공휴일 데이터 전송에 실패하였습니다.',
      });
    }
  });
};
