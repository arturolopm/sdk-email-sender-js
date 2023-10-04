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
/**
 * Post track
 * @openapi
 *  paths:
 *  /users:
 *     post:
 *       tags:
 *         - users
 *       summary: "Create User"
 *       description: Create user, staff members
 *       requestBody:
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/user"
 *       responses:
 *         '200':
 *           description: returns the object User if properly inserted.
 *         '500':
 *           description: Error de on server, usually for missing attributes.
 */
router.post('/', createUser)
router.put('/:id', editUser)
router.delete('/:id', deleteUser)

export default router
