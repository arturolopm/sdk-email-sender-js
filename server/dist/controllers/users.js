"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.deleteUser = exports.createUser = exports.getOneUser = exports.getAllUsers = void 0;
const getAllUsers = (req, res) => {
    res.json({
        msg: 'getUsers'
    });
};
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'getOneUser',
        id
    });
};
exports.getOneUser = getOneUser;
const createUser = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'createUser',
        body
    });
};
exports.createUser = createUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteUser',
        id
    });
};
exports.deleteUser = deleteUser;
const editUser = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'editUser',
        id
    });
};
exports.editUser = editUser;
//# sourceMappingURL=users.js.map