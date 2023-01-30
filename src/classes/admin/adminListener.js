"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminListener = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const requestSender_js_1 = require("../client/requestSender.js");
class AdminListener {
    constructor(port, adminLogger, onGettingConnection, onLosingConnection) {
        this.serverPort = port;
        this.adminLogger = adminLogger;
        this.app = (0, express_1.default)();
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.server = this.app.listen(this.serverPort);
        this.onGettingConnection = onGettingConnection;
        this.onLosingConnection = onLosingConnection;
        this.app.post("*", function (request, response) {
            let req = request.body.req;
            // adminLogger.log(`Received : ${req} -> ${Req[req].toString()}`, request.ip);
            if (req == requestSender_js_1.Req.StartConnection) {
                this.onGettingConnection(request, response);
            }
            if (req == requestSender_js_1.Req.StartConnection) {
                this.onLosingConnection(request);
                response.end();
            }
        }.bind(this));
    }
}
exports.AdminListener = AdminListener;
