"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const user_1 = __importDefault(require("./user"));
const Client = connection_1.default.define('Client', {
    poc_name: {
        type: sequelize_1.DataTypes.STRING
    },
    poc_email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    admin_poc: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.default,
            key: 'id'
        }
    }
});
exports.default = Client;
//# sourceMappingURL=client.js.map