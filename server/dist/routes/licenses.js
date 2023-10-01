"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const licences_1 = require("../controllers/licences");
const router = (0, express_1.Router)();
router.get('/', licences_1.getAllLicenses);
router.get('/:id', licences_1.getOneLicense);
router.post('/send-email/four-months', licences_1.sendEmailFourthMonthsLicense);
router.post('/send-email/one-month', licences_1.sendEmailOnehMonthLicenseAndIsMonday);
router.post('/send-email/one-week', licences_1.sendEmailOneWeekLicense);
router.post('/', licences_1.createLicense);
router.put('/:id', licences_1.editLicense);
router.delete('/:id', licences_1.deleteLicense);
exports.default = router;
//# sourceMappingURL=licenses.js.map