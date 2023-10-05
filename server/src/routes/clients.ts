import { Router } from 'express'
import {
  createClient,
  deleteClient,
  editClient,
  getAllClients,
  getOneClient
} from '../controllers/clients'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Client management
 */

// Get all clients
/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Return a list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                description:
 *                 $ref: '#/components/schemas/Client'
 */
router.get('/', getAllClients)

// Get a client by ID
/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client to get
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Return the client with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 */
router.get('/:id', getOneClient)

// Create a new client
/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       description: Client object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Return the newly created client
 *         content:
 *           application/json:
 *             schema:
 *                message:client created succesfully
 *               $ref: '#/components/schemas/Client'
 */
router.post('/', createClient)

// Update a client by ID
/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Update a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated client object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: Return the updated client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 */
router.put('/:id', editClient)

// Delete a client by ID
/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the client to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', deleteClient)

export default router
