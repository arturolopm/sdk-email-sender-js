"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editClient = exports.deleteClient = exports.createClient = exports.getOneClient = exports.getAllClients = void 0;
const client_1 = __importDefault(require("../models/client"));
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield client_1.default.findAll();
        res.json(clients);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting clients', error: error });
    }
});
exports.getAllClients = getAllClients;
const getOneClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const client = yield client_1.default.findByPk(id);
        if (client) {
            res.json(client);
        }
        else {
            res.status(404).json({ message: 'Client not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting client' });
    }
});
exports.getOneClient = getOneClient;
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const alreadyExists = (yield client_1.default.findOne({
            where: { poc_email: body.poc_email }
        }));
        if (alreadyExists) {
            return res
                .status(400)
                .json({ message: `Client already exist with id ${alreadyExists.id}` });
        }
        const client = yield client_1.default.create(body);
        yield client.save();
        res.status(200).json({ message: 'Client created successfully', client });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating client' });
    }
});
exports.createClient = createClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield client_1.default.destroy({ where: { id } });
        res.status(200).json({ message: 'Client deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting client' });
    }
});
exports.deleteClient = deleteClient;
const editClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const client = yield client_1.default.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        else {
            yield client.update(body);
            res.status(200).json({ message: 'Client updated', client });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating client' });
    }
});
exports.editClient = editClient;
//# sourceMappingURL=clients.js.map