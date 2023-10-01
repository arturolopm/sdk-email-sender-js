import { Router } from 'express'
import {
  createClient,
  deleteClient,
  editClient,
  getAllClients,
  getOneClient
} from '../controllers/clients'

const router = Router()

router.get('/', getAllClients)
router.get('/:id', getOneClient)
router.post('/', createClient)
router.put('/:id', editClient)
router.delete('/:id', deleteClient)

export default router
