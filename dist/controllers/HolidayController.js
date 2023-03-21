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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHoliday = void 0;
const fast_xml_parser_1 = require("fast-xml-parser");
const request = require('request');
const parser = new fast_xml_parser_1.XMLParser();
const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=${process.env.OPENAPI_SERVICE_KEY}&numOfRows=100`;
/** /api/holiday Get Endpoint **/
const getHoliday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 공공 데이터 포탈 공휴일 데이터 요청 보내기
    request(`${url}&solYear=${req.query.year}`, (error, response, body) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield new Promise(() => {
                const holidayJson = parser.parse(body).response.body.items.item;
                // 가져온 데이터를 형식에 맞게 파싱하기
                const holiday = Object.values(holidayJson).map((data) => {
                    return {
                        _id: '',
                        startDate: (data === null || data === void 0 ? void 0 : data.locdate).toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
                        endDate: (data === null || data === void 0 ? void 0 : data.locdate).toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
                        eventTitle: data === null || data === void 0 ? void 0 : data.dateName,
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
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: '공휴일 데이터 전송에 실패하였습니다.',
            });
        }
    }));
});
exports.getHoliday = getHoliday;
//# sourceMappingURL=HolidayController.js.map