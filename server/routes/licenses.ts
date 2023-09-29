import { Router } from 'express'
import {
  createLicense,
  deleteLicense,
  editLicense,
  getAllLicenses,
  getOneLicense
} from '../controllers/licences'

const router = Router()

router.get('/', getAllLicenses)
router.get('/:id', getOneLicense)
router.post('/', createLicense)
router.put('/:id', editLicense)
router.delete('/:id', deleteLicense)

export default router
