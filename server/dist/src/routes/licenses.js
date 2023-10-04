"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const licences_1 = require("../controllers/licences");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Licenses
 *   description: License management
 */
// Get all licenses
/**
 * @swagger
 * /api/licenses:
 *   get:
 *     summary: Get all licenses
 *     tags: [Licenses]
 *     responses:
 *       200:
 *         description: Return a list of licenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/License'
 */
router.get('/', licences_1.getAllLicenses);
// Get a license by ID
/**
 * @swagger
 * /api/licenses/{id}:
 *   get:
 *     summary: Get a license by ID
 *     tags: [Licenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the license to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Return the license with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/License'
 */
router.get('/:id', licences_1.getOneLicense);
// Get last X emails sent
/**
 * @swagger
 * /api/licenses/last-emails/{lastx}:
 *   get:
 *     summary: Get the last X emails sent
 *     tags: [Licenses]
 *     parameters:
 *       - in: path
 *         name: lastx
 *         required: true
 *         description: Number of last emails to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Return the last X emails sent
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Email'
 */
router.get('/last-emails/:lastx', licences_1.getLastEmailsSent);
// Send emails for licenses expiring in four months
/**
 * @swagger
 * /api/licenses/send-email/four-months:
 *   post:
 *     summary: Send emails for licenses expiring in four months
 *     tags: [Licenses]
 *     responses:
 *       200:
 *         description: Emails sent successfully
 */
router.post('/send-email/four-months', licences_1.sendEmailFourthMonthsLicense);
// Send emails for licenses expiring in one month (and if today is Monday)
/**
 * @swagger
 * /api/licenses/send-email/one-month:
 *   post:
 *     summary: Send emails for licenses expiring in one month (and if today is Monday)
 *     tags: [Licenses]
 *     responses:
 *       200:
 *         description: Emails sent successfully
 */
router.post('/send-email/one-month', licences_1.sendEmailOnehMonthLicenseAndIsMonday);
// Send emails for licenses expiring in one week
/**
 * @swagger
 * /api/licenses/send-email/one-week:
 *   post:
 *     summary: Send emails for licenses expiring in one week
 *     tags: [Licenses]
 *     responses:
 *       200:
 *         description: Emails sent successfully
 */
router.post('/send-email/one-week', licences_1.sendEmailOneWeekLicense);
// Send emails for all licenses
/**
 * @swagger
 * /api/licenses/send-email/all:
 *   post:
 *     summary: Send emails for all licenses
 *     tags: [Licenses]
 *     responses:
 *       200:
 *         description: Emails sent successfully
 */
router.post('/send-email/all', licences_1.sendAllEmails);
// Create a new license
/**
 * @swagger
 * /api/licenses:
 *   post:
 *     summary: Create a new license
 *     tags: [Licenses]
 *     requestBody:
 *       description: License object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/License'
 *     responses:
 *       200:
 *         description: Return the newly created license
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/License'
 */
router.post('/', licences_1.createLicense);
// Update a license by ID
/**
 * @swagger
 * /api/licenses/{id}:
 *   put:
 *     summary: Update a license by ID
 *     tags: [Licenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the license to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated license object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/License'
 *     responses:
 *       200:
 *         description: Return the updated license
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/License'
 */
router.put('/:id', licences_1.editLicense);
// Delete a license by ID
/**
 * @swagger
 * /api/licenses/{id}:
 *   delete:
 *     summary: Delete a license by ID
 *     tags: [Licenses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the license to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: License deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', licences_1.deleteLicense);
exports.default = router;
//# sourceMappingURL=licenses.js.map