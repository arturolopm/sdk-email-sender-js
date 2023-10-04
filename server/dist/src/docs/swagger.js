"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Email SDK Sender Documentation',
        version: '1.0.0'
    },
    servers: [
        {
            url: 'http://localhost:8080/'
        }
    ],
    components: {
        schemas: {
            user: {
                type: 'object',
                required: ['first_name', 'last_name', 'email_address', 'isStaff'],
                properties: {
                    first_name: {
                        type: 'string'
                    },
                    last_name: {
                        type: 'string'
                    },
                    email_address: {
                        type: 'string'
                    },
                    isStaff: {
                        type: 'boolean'
                    }
                }
            }
        }
    }
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ['../routes/*.ts']
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
//# sourceMappingURL=swagger.js.map