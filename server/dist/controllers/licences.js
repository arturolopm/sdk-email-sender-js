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
exports.sendEmailOneWeekLicense = exports.sendEmailOnehMonthLicenseAndIsMonday = exports.sendEmailFourthMonthsLicense = exports.editLicense = exports.deleteLicense = exports.createLicense = exports.getOneLicense = exports.getAllLicenses = void 0;
const license_1 = __importDefault(require("./../models/license"));
const user_1 = __importDefault(require("../models/user"));
const utils_1 = require("../utils/utils");
const client_1 = __importDefault(require("../models/client"));
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
        const fourMonthsLater = (0, utils_1.addMonths)(new Date(), 4);
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
        return res.json({ responseItem });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.sendEmailFourthMonthsLicense = sendEmailFourthMonthsLicense;
const sendEmailOnehMonthLicenseAndIsMonday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneMonthLater = (0, utils_1.addMonths)(new Date(), 1);
        const formattedOneMonthsLater = oneMonthLater.toISOString().slice(0, 10);
        const isMonday = (0, utils_1.isDay)(new Date(), 1);
        if (!isMonday) {
            return res.status(404).json({
                message: 'Today is not a Monday, emails not sent'
            });
        }
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
        return res.json({ responseItem });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.sendEmailOnehMonthLicenseAndIsMonday = sendEmailOnehMonthLicenseAndIsMonday;
const sendEmailOneWeekLicense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneWeekLater = (0, utils_1.addWeeks)(new Date(), 1);
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
        return res.json({ responseItem });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.sendEmailOneWeekLicense = sendEmailOneWeekLicense;
//# sourceMappingURL=licences.js.map