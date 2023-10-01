"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define('User', {
    first_name: {
        type: sequelize_1.DataTypes.STRING
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING
    },
    email_address: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: false
    },
    isStaff: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
});
exports.default = User;
//# sourceMappingURL=user.js.map