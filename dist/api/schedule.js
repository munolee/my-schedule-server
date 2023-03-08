"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const fast_xml_parser_1 = require("fast-xml-parser");
const request = require('request');
const router = express_1.default.Router();
const client = new mongodb_1.MongoClient(process.env.MONGO_URI);
const parser = new fast_xml_parser_1.XMLParser();
// mongo DB 접속 확인
client
    .connect()
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));
const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=${process.env.OPENAPI_SERVICE_KEY}`;
/** /api/schedule Endpoint **/
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // DB 스케쥴 데이터 불러오기
    const schedule = yield client
        .db('schedule')
        .collection('schedule')
        .find()
        .toArray();
    // 공공 데이터 포탈 공휴일 데이터 요청 보내기
    const year = req.query.year || '2023';
    request(`${url}&solYear=${year}`, (error, response, body) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield new Promise(() => {
                const holidayJson = parser.parse(body).response.body.items.item;
                // 가져온 데이터를 형식에 맞게 파싱하기
                const holidaySchedule = Object.values(holidayJson).map((data) => {
                    return {
                        _id: '',
                        startDate: (data === null || data === void 0 ? void 0 : data.locdate)
                            .toString()
                            .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
                        endDate: (data === null || data === void 0 ? void 0 : data.locdate)
                            .toString()
                            .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
                        eventTitle: data === null || data === void 0 ? void 0 : data.dateName,
                        typeId: 2,
                        bgColor: '#EDAA7D',
                    };
                });
                // DB 데이터와 병합, 정렬 후 데이터 내보내기
                const schedules = [...holidaySchedule, ...schedule].sort((a, b) => {
                    if (a.startDate >= b.startDate)
                        return 1;
                    if (a.endDate >= b.endDate)
                        return -1;
                    return -1;
                });
                return res.json(schedules);
            });
        }
        catch (error) {
            console.error(error);
            // 에러 발생 시 DB 데이터만 내보내기
            return res.json(schedule);
        }
    }));
}));
module.exports = router;
//# sourceMappingURL=schedule.js.map