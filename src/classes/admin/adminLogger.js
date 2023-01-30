"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLogger = void 0;
const CLILogger_js_1 = require("../CLILogger.js");
class AdminLogger extends CLILogger_js_1.CLILogger {
    log(message, ip) {
        super.log(message + (ip ? " from : " + ip : ""), "+");
    }
    error(message) {
        super.log(message, "-");
    }
}
exports.AdminLogger = AdminLogger;
