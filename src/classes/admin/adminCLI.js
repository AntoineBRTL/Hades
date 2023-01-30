"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCLI = void 0;
const readline_1 = require("readline");
const adminCLICommandHelper_js_1 = require("./adminCLICommandHelper.js");
const adminCLIHelper_js_1 = require("./adminCLIHelper.js");
const adminCLILoader_js_1 = require("./adminCLILoader.js");
const adminListener_js_1 = require("./adminListener.js");
const adminLogger_js_1 = require("./adminLogger.js");
const adminSocket_js_1 = require("./adminSocket.js");
const readline = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
class AdminCLI {
    constructor(runningPort) {
        this.runningPort = runningPort;
        this.adminLogger = new adminLogger_js_1.AdminLogger();
        this.adminCLILoader = new adminCLILoader_js_1.AdminCLILoader(this.runningPort, this.adminLogger);
        this.adminListener = new adminListener_js_1.AdminListener(this.runningPort, this.adminLogger, this.onGettingConnection.bind(this), this.onLosingConnection.bind(this));
        new adminCLIHelper_js_1.AdminCLIHelper();
        this.input();
    }
    onGettingConnection(request, response) {
        // this.adminLogger.log("Creating socket for", request.ip);
        new adminSocket_js_1.AdminSocket(this.runningPort, request, response);
    }
    onLosingConnection(request) {
        // this.adminLogger.log("Losing connection with", request.ip);
    }
    input(callback = this.handleInput.bind(this)) {
        readline.question("$> ", function (input) {
            callback(input);
        });
    }
    inputCommandLine(socket) {
        readline.question(`${socket.getSocketPort().toString()}@${socket.getCWD()}> $ `, function (input) {
            this.handleInputCommandLine(socket, input);
        }.bind(this));
    }
    handleInputCommandLine(socket, input) {
        if (input == "") {
            this.input();
            return;
        }
        let splitedInput = input.split(" ");
        if (splitedInput[0] == "-h" || splitedInput[0] == "--help") {
            new adminCLICommandHelper_js_1.AdminCLICommandHelper();
            this.inputCommandLine(socket);
            return;
        }
        if (splitedInput[0] == "-e" || splitedInput[0] == "--exit") {
            this.input();
            return;
        }
        socket.emitCommand(input, this.inputCommandLine.bind(this, socket));
    }
    handleInput(input) {
        if (input == "") {
            this.input();
            return;
        }
        let splitedInput = input.split(" ");
        if (splitedInput[0] == "-h" || splitedInput[0] == "--help") {
            new adminCLIHelper_js_1.AdminCLIHelper();
            this.input();
            return;
        }
        if (splitedInput[0] == "-l" || splitedInput[0] == "--list") {
            adminSocket_js_1.AdminSocket.logSockets(this.adminLogger);
            this.input();
            return;
        }
        if (splitedInput[0] == "-c" || splitedInput[0] == "--command") {
            let port = parseInt(splitedInput[1]);
            let socket = adminSocket_js_1.AdminSocket.getSocket(port);
            if (!socket) {
                this.adminLogger.error("Can't find the machine");
                this.input();
                return;
            }
            new adminCLICommandHelper_js_1.AdminCLICommandHelper();
            this.inputCommandLine(socket);
            return;
        }
        if (splitedInput[0] == "-e" || splitedInput[0] == "--exit") {
            process.exit(0);
        }
        this.input();
    }
}
exports.AdminCLI = AdminCLI;
