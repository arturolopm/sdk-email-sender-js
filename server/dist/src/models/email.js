"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const license_1 = __importDefault(require("./license"));
const Email = connection_1.default.define('Email', {
    sent_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW // Default value is the current timestamp
    }
});
Email.belongsTo(license_1.default, {
    foreignKey: {
        name: 'license_id',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
exports.default = Email;
//# sourceMappingURL=email.js.map