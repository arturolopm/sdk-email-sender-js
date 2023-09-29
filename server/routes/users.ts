import { Router } from 'express'
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getOneUser
} from '../controllers/users'

const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getOneUser)
router.post('/', createUser)
router.put('/:id', editUser)
router.delete('/:id', deleteUser)

export default router
