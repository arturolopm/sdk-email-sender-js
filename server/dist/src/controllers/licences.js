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
exports.sendAllEmails = exports.sendEmailOneWeekLicense = exports.sendEmailOnehMonthLicenseAndIsMonday = exports.sendEmailFourthMonthsLicense = exports.editLicense = exports.deleteLicense = exports.createLicense = exports.getOneLicense = exports.getAllLicenses = void 0;
const license_1 = __importDefault(require("../models/license"));
const user_1 = __importDefault(require("../models/user"));
const utils_1 = require("../utils/utils");
const emailTemplate_1 = require("../templates/emailTemplate");
const getAllLicenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const responseItem = yield license_1.default.findAll();
    res.json(responseItem);
});
exports.getAllLicenses = getAllLicenses;
const getOneLicense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const responseItem = yield license_1.default.findByPk(id);
    if (responseItem) {
        res.json(responseItem);
    }
    else {
        res.status(404).json({
            message: 'User not found'
        });
    }
});
exports.getOneLicense = getOneLicense;
const createLicense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const users = yield user_1.default.findAll();
    if (!users) {
        return res.status(400).json({
            message: 'can not create licenses without any user previously created'
        });
    }
    try {
        const license = yield license_1.default.create(body);
        yield license.save();
        res.status(200).json({
            message: 'License created successfully',
            license
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
});
exports.createLicense = createLicense;
const deleteLicense = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteLicense pending route',
        id
    });
};
exports.deleteLicense = deleteLicense;
const editLicense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const license = yield license_1.default.findByPk(id);
        if (!license) {
            return res.status(404).json({
                message: 'license not found'
            });
        }
        else {
            yield license.update(body);
            res.status(200).json({
                message: 'license updated',
                license
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
exports.editLicense = editLicense;
const sendEmailFourthMonthsLicense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseItem = (yield (0, utils_1.getDataSendEmailsFourMonths)());
        const templates = responseItem.map((data) => {
            const mail = (0, emailTemplate_1.emailTemplate)({
                license_id: data.licenseData.id,
                license_type: data.licenseData.license_type,
                package: data.licenseData.package,
                expiration_datetime: data.licenseData.expiration_datetime,
                poc_name: data.clientData.poc_name,
                poc_email: data.clientData.poc_email
            });
            return { data, mail };
        });
        templates.map((template) => {
            (0, utils_1.sendMail)({
                to: template.data.adminData.email_address,
                template: template.mail
            });
        });
        res.status(200).json({ responseItem });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.sendEmailFourthMonthsLicense = sendEmailFourthMonthsLicense;
const sendEmailOnehMonthLicenseAndIsMonday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMonday = (0, utils_1.isDay)(new Date(), 1);
        const responseItem = isMonday
            ? (yield (0, utils_1.getDataLicensesOneMonthAndIsMonday)())
            : [];
        if (responseItem.length > 0) {
            const templates = responseItem.map((data) => {
                const mail = (0, emailTemplate_1.emailTemplate)({
                    license_id: data.licenseData.id,
                    license_type: data.licenseData.license_type,
                    package: data.licenseData.package,
                    expiration_datetime: data.licenseData.expiration_datetime,
                    poc_name: data.clientData.poc_name,
                    poc_email: data.clientData.poc_email
                });
                return { data, mail };
            });
            templates.map((template) => {
                (0, utils_1.sendMail)({
                    to: template.data.adminData.email_address,
                    template: template.mail
                });
            });
        }
        res.status(200).json({ responseItem });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.sendEmailOnehMonthLicenseAndIsMonday = sendEmailOnehMonthLicenseAndIsMonday;
const sendEmailOneWeekLicense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseItem = (yield (0, utils_1.getDataLicensesOneWeek)());
        if (responseItem.length > 0) {
            const templates = responseItem.map((data) => {
                const mail = (0, emailTemplate_1.emailTemplate)({
                    license_id: data.licenseData.id,
                    license_type: data.licenseData.license_type,
                    package: data.licenseData.package,
                    expiration_datetime: data.licenseData.expiration_datetime,
                    poc_name: data.clientData.poc_name,
                    poc_email: data.clientData.poc_email
                });
                return { data, mail };
            });
            templates.map((template) => {
                (0, utils_1.sendMail)({
                    to: template.data.adminData.email_address,
                    template: template.mail
                });
            });
        }
        res.status(200).json({ responseItem });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.sendEmailOneWeekLicense = sendEmailOneWeekLicense;
const sendAllEmails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fourMonths = (yield (0, utils_1.getDataSendEmailsFourMonths)());
        const oneMonth = (yield (0, utils_1.getDataLicensesOneMonthAndIsMonday)());
        const oneWeek = (yield (0, utils_1.getDataLicensesOneWeek)());
        const responseItem = fourMonths.concat(oneMonth, oneWeek);
        if (responseItem.length > 0) {
            const templates = responseItem.map((data) => {
                const mail = (0, emailTemplate_1.emailTemplate)({
                    license_id: data.licenseData.id,
                    license_type: data.licenseData.license_type,
                    package: data.licenseData.package,
                    expiration_datetime: data.licenseData.expiration_datetime,
                    poc_name: data.clientData.poc_name,
                    poc_email: data.clientData.poc_email
                });
                return { data, mail };
            });
            templates.map((template) => {
                (0, utils_1.sendMail)({
                    to: template.data.adminData.email_address,
                    template: template.mail
                });
            });
        }
        res.status(200).json({ responseItem });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.sendAllEmails = sendAllEmails;
//# sourceMappingURL=licences.js.map