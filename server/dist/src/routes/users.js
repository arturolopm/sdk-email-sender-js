"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get('/', users_1.getAllUsers);
router.get('/:id', users_1.getOneUser);
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
router.post('/', users_1.createUser);
router.put('/:id', users_1.editUser);
router.delete('/:id', users_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map