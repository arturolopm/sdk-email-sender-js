"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_1 = require("../controllers/clients");
const router = (0, express_1.Router)();
router.get('/', clients_1.getAllClients);
router.get('/:id', clients_1.getOneClient);
router.post('/', clients_1.createClient);
router.put('/:id', clients_1.editClient);
router.delete('/:id', clients_1.deleteClient);
exports.default = router;
//# sourceMappingURL=clients.js.map