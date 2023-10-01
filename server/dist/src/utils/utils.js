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
exports.sendMail = exports.getDataLicensesOneWeek = exports.getDataLicensesOneMonthAndIsMonday = exports.getDataSendEmailsFourMonths = exports.isDay = exports.addWeeks = exports.addMonths = void 0;
const transporter_1 = require("../../config/transporter");
const license_1 = __importDefault(require("../models/license"));
const client_1 = __importDefault(require("../models/client"));
const user_1 = __importDefault(require("../models/user"));
const addMonths = (date, months) => {
    date.setMonth(date.getMonth() + months);
    return date;
};
exports.addMonths = addMonths;
const addWeeks = (date, weeks) => {
    const millisecondsInAWeek = 604800000; // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    const millisecondsToAdd = weeks * millisecondsInAWeek;
    const updatedDate = new Date(date.getTime() + millisecondsToAdd);
    return updatedDate;
};
exports.addWeeks = addWeeks;
const isDay = (date, day) => {
    return date.getDay() === day; // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
};
exports.isDay = isDay;
const getDataSendEmailsFourMonths = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fourMonthsLater = (0, exports.addMonths)(new Date(), 4);
        const formattedFourMonthsLater = fourMonthsLater.toISOString().slice(0, 10);
        const licenses = yield license_1.default.findAll({
            where: {
                expiration_datetime: formattedFourMonthsLater
            }
        });
        const promises = licenses.map((licence) => __awaiter(void 0, void 0, void 0, function* () {
            const licenseData = licence.get();
            const client = yield client_1.default.findByPk(licenseData.client_id);
            const clientData = client === null || client === void 0 ? void 0 : client.get();
            const admin_poc = yield user_1.default.findByPk(clientData.admin_poc);
            const adminData = admin_poc === null || admin_poc === void 0 ? void 0 : admin_poc.get();
            return { licenseData, clientData, adminData };
        }));
        const responseItem = yield Promise.all(promises);
        return responseItem;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.getDataSendEmailsFourMonths = getDataSendEmailsFourMonths;
const getDataLicensesOneMonthAndIsMonday = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneMonthLater = (0, exports.addMonths)(new Date(), 1);
        const formattedOneMonthsLater = oneMonthLater.toISOString().slice(0, 10);
        const licenses = yield license_1.default.findAll({
            where: {
                expiration_datetime: formattedOneMonthsLater
            }
        });
        const promises = licenses.map((licence) => __awaiter(void 0, void 0, void 0, function* () {
            const licenseData = licence.get();
            const client = yield client_1.default.findByPk(licenseData.client_id);
            const clientData = client === null || client === void 0 ? void 0 : client.get();
            const admin_poc = yield user_1.default.findByPk(clientData.admin_poc);
            const adminData = admin_poc === null || admin_poc === void 0 ? void 0 : admin_poc.get();
            return { licenseData, clientData, adminData };
        }));
        const responseItem = yield Promise.all(promises);
        return responseItem;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.getDataLicensesOneMonthAndIsMonday = getDataLicensesOneMonthAndIsMonday;
const getDataLicensesOneWeek = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneWeekLater = (0, exports.addWeeks)(new Date(), 1);
        const formattedOneWeekLater = oneWeekLater.toISOString().slice(0, 10);
        const licenses = yield license_1.default.findAll({
            where: {
                expiration_datetime: formattedOneWeekLater
            }
        });
        const promises = licenses.map((licence) => __awaiter(void 0, void 0, void 0, function* () {
            const licenseData = licence.get();
            const client = yield client_1.default.findByPk(licenseData.client_id);
            const clientData = client === null || client === void 0 ? void 0 : client.get();
            const admin_poc = yield user_1.default.findByPk(clientData.admin_poc);
            const adminData = admin_poc === null || admin_poc === void 0 ? void 0 : admin_poc.get();
            return { licenseData, clientData, adminData };
        }));
        const responseItem = yield Promise.all(promises);
        return responseItem;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.getDataLicensesOneWeek = getDataLicensesOneWeek;
const sendMail = ({ to, template }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter_1.transporter.sendMail({
            from: process.env.EMAIL_SENDER,
            to: to,
            subject: 'License about to expire',
            // text:"hello there",
            html: template
        });
        return { sent: to };
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMail = sendMail;
//# sourceMappingURL=utils.js.map