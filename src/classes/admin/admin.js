"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const adminCLI_js_1 = require("./adminCLI.js");
class Admin {
    constructor(runningPort) {
        this.runnningPort = runningPort;
        this.adminCLI = new adminCLI_js_1.AdminCLI(this.runnningPort);
    }
}
exports.Admin = Admin;
