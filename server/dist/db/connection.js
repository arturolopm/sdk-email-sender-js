"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbname = process.env.DB_NAME || 'mydb';
const dbUser = process.env.DB_USER || 'root';
const dbPass = process.env.DB_PASS || 'root';
const db = new sequelize_1.Sequelize(dbname, dbUser, dbPass, {
    host: 'localhost',
    dialect: 'mariadb'
});
exports.default = db;
//# sourceMappingURL=connection.js.map