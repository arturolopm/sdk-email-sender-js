"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const client_1 = __importDefault(require("./client"));
const License = connection_1.default.define('License', {
    package: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['javascript_sdk', 'ios_sdk', 'android_sdk']]
        }
    },
    license_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['production', 'evaluation']]
        }
    },
    client_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: client_1.default,
            key: 'id'
        }
    },
    created_datetime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    expiration_datetime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days in milliseconds
    }
});
License.belongsTo(client_1.default, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});
exports.default = License;
//# sourceMappingURL=license.js.map