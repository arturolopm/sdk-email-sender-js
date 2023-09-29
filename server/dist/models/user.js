"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define('User', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    isStaff: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    poc_contact_name: {
        type: sequelize_1.DataTypes.STRING
    },
    poc_contact_email: {
        type: sequelize_1.DataTypes.STRING
    },
    admin_poc: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    }
});
exports.default = User;
//# sourceMappingURL=user.js.map