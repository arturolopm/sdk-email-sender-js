"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const dbname = process.env.DB_NAME || 'mydb';
const dbUser = process.env.DB_USER || 'root';
const dbPass = process.env.DB_PASS || 'root';
const dbHost = process.env.DB_HOST || 'mariadb';
console.log(dbname, dbUser, dbPass, dbHost);
const db = new sequelize_1.Sequelize(dbname, dbUser, dbPass, {
    host: dbHost,
    port: 3306,
    dialect: 'mariadb'
});
exports.default = db;
//# sourceMappingURL=connection.js.map