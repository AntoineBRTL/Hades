"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSocket = void 0;
const ws_1 = require("ws");
const clientSocket_js_1 = require("../client/clientSocket.js");
class AdminSocket {
    static logSockets(adminLogger) {
        adminLogger.log(`${this.sockets.length} connection(s) opened`);
        for (let socket of this.sockets) {
            adminLogger.log(`${socket.socketPort.toString()} : ${socket.ip}`);
        }
    }
    static getSocket(port) {
        for (let socket of this.sockets) {
            if (socket.socketPort == port)
                return socket;
        }
    }
    constructor(runningPort, request, response) {
        this.runningPort = runningPort;
        this.socketPort = this.getAvailablePort();
        this.request = request;
        this.response = response;
        this.ip = this.request.ip.split(':')[this.request.ip.split(':').length - 1];
        this.cwd = "";
        this.socketServer = new ws_1.WebSocketServer({ port: this.socketPort });
        this.socketServer.on("connection", function (socketClient) {
            socketClient.send(JSON.stringify({ socketAction: clientSocket_js_1.SocketAction.CWDGetter }));
            // console.log("[x] Connection established");
            socketClient.on("message", function (message) {
                let s = JSON.parse(message);
                this.cwd = s.cwd;
                if (s.stdout)
                    console.log(s.stdout);
            }.bind(this));
        }.bind(this));
        this.response.end(this.socketPort.toString());
    }
    getAvailablePort() {
        AdminSocket.sockets.push(this);
        return AdminSocket.sockets.length + this.runningPort;
    }
    emitCommand(command, callback) {
        this.socketServer.clients.forEach(function (client) {
            client.send(JSON.stringify({ socketAction: clientSocket_js_1.SocketAction.Command, command }));
            function handleCallback() {
                client.once("message", function (message) {
                    let parsed = JSON.parse(message);
                    if (!parsed.closed) {
                        client.once("message", handleCallback.bind(this));
                        return;
                    }
                    callback(this);
                }.bind(this));
            }
            handleCallback.call(this);
        }.bind(this));
    }
    getCWD() {
        return this.cwd;
    }
    getSocketPort() {
        return this.socketPort;
    }
}
exports.AdminSocket = AdminSocket;
AdminSocket.sockets = new Array();
