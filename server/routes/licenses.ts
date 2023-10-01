import { Router } from 'express'
import {
  createLicense,
  deleteLicense,
  editLicense,
  getAllLicenses,
  getOneLicense,
  sendEmailFourthMonthsLicense,
  sendEmailOnehMonthLicenseAndIsMonday,
  sendEmailOneWeekLicense
} from '../controllers/licences'

const router = Router()

router.get('/', getAllLicenses)
router.get('/:id', getOneLicense)
router.post('/send-email/four-months', sendEmailFourthMonthsLicense)
router.post('/send-email/one-month', sendEmailOnehMonthLicenseAndIsMonday)
router.post('/send-email/one-week', sendEmailOneWeekLicense)
router.post('/', createLicense)
router.put('/:id', editLicense)
router.delete('/:id', deleteLicense)

export default router
