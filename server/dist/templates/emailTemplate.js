"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const emailTemplate = ({ license_id, license_type, package: package_type, expiration_datetime, poc_name, poc_email }) => {
    return `
        <html>
        <head>
        <title>License Expiration Notification</title>
        </head>
        <body>
        <p>Hello,</p>
        <p>This is a notification regarding your license expiration.</p>
        
        <ul>
        <li>License ID: ${license_id}</li>
        <li>License Type: ${license_type}</li>
        <li>Package: ${package_type}</li>
        <li>Expiration Date: ${expiration_datetime}</li>
        <li>Client POC Name: ${poc_name}</li>
        <li>Client POC Email: ${poc_email}</li>
        </ul>
        
        <p>Best regards</p>
        </body>
        </html>
        `;
};
exports.emailTemplate = emailTemplate;
//# sourceMappingURL=emailTemplate.js.map