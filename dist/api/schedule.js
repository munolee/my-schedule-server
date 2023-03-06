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
const express_1 = __importDefault(require("express"));
const fast_xml_parser_1 = require("fast-xml-parser");
const mock_1 = require("../mock");
const request = require('request');
const router = express_1.default.Router();
const parser = new fast_xml_parser_1.XMLParser();
const serviceKey = 'UqfEaWsllhXKcqR1XHjqNFvwf75vk1k4HOd4IAh6eK1aIK75vhki%2FgEuhDeo%2BEe3hp1%2F%2BvHRLeGjM9ZTFQfVIA%3D%3D';
const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=${serviceKey}`;
/** /api/schedule Endpoint **/
router.get('/', (req, res) => {
    // 공공 데이터 포탈 공휴일 데이터 요청 보내기
    const year = req.query.year || '2023';
    request(url + `&solYear=${year}`, (error, response, body) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield new Promise(() => {
                const holidayJson = parser.parse(body).response.body.items.item;
                // 가져온 데이터를 형식에 맞게 파싱하기
                const holidaySchedule = Object.values(holidayJson).map((data) => {
                    return {
                        startDate: (data === null || data === void 0 ? void 0 : data.locdate).toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
                        endDate: (data === null || data === void 0 ? void 0 : data.locdate).toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
                        eventTitle: data === null || data === void 0 ? void 0 : data.dateName,
                        typeId: 2,
                        bgColor: "#EDAA7D"
                    };
                });
                // Mock 데이터와 병합, 정렬 후 데이터 내보내기
                const schedules = [...holidaySchedule, ...mock_1.schedule].sort((a, b) => {
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
            // 에러 발생 시 Mock 데이터만 내보내기
            return res.json(mock_1.schedule);
        }
    }));
});
module.exports = router;
//# sourceMappingURL=schedule.js.map