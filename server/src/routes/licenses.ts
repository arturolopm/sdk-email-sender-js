import { Router } from 'express'
import {
  createLicense,
  deleteLicense,
  editLicense,
  getAllLicenses,
  getOneLicense,
  sendAllEmails,
  sendEmailFourthMonthsLicense,
  sendEmailOnehMonthLicenseAndIsMonday,
  sendEmailOneWeekLicense,
  getLastEmailsSent
} from '../controllers/licences'

const router = Router()

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
router.get('/', getAllLicenses)

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
router.get('/:id', getOneLicense)

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
router.get('/last-emails/:lastx', getLastEmailsSent)

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
router.post('/send-email/four-months', sendEmailFourthMonthsLicense)

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
router.post('/send-email/one-month', sendEmailOnehMonthLicenseAndIsMonday)

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
router.post('/send-email/one-week', sendEmailOneWeekLicense)

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
router.post('/send-email/all', sendAllEmails)

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
router.post('/', createLicense)

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
router.put('/:id', editLicense)

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
router.delete('/:id', deleteLicense)

export default router
