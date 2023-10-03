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
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/users"));
const licenses_1 = __importDefault(require("../routes/licenses"));
const clients_1 = __importDefault(require("../routes/clients"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const migrate_1 = __importDefault(require("../db/migrate"));
class Server {
    constructor() {
        this.apiPath = {
            users: '/api/users',
            licenses: '/api/licenses',
            clients: '/api/clients'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        // init
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                yield connection_1.default.sync();
                const dbName = connection_1.default.getDatabaseName();
                console.log(`connected to database ${dbName}`);
                yield (0, migrate_1.default)();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)({}));
        // Bodyparser
        this.app.use(express_1.default.json());
        //public
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPath.users, users_1.default);
        this.app.use(this.apiPath.licenses, licenses_1.default);
        this.app.use(this.apiPath.clients, clients_1.default);
        this.app.use('/*', express_1.default.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`server listening on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map