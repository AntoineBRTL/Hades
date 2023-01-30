"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const clientSocket_js_1 = require("./clientSocket.js");
const requestSender_js_1 = require("./requestSender.js");
class Client {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.requestSender = new requestSender_js_1.RequestSender(this.ip, this.port);
        this.requestSender.open(function (socketPort) {
            new clientSocket_js_1.ClientSocket(this.ip, socketPort);
        }.bind(this));
    }
}
exports.Client = Client;
