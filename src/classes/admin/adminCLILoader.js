"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCLILoader = void 0;
class AdminCLILoader {
    constructor(runningPort, adminLogger) {
        this.license = `
    ██╗  ██╗ █████╗ ██████╗ ███████╗███████╗
    ██║  ██║██╔══██╗██╔══██╗██╔════╝██╔════╝
    ███████║███████║██║  ██║█████╗  ███████╗
    ██╔══██║██╔══██║██║  ██║██╔══╝  ╚════██║
    ██║  ██║██║  ██║██████╔╝███████╗███████║
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝    
    2021 - France.

    Hades is a reverse shell developed by Antoine Bartoli, 
    please do not use it for non-legals preposes.
    Hades is not a ssh software, it uses http(s) & ws protocols.`;
        this.runningPort = runningPort;
        this.adminLogger = adminLogger;
        this.adminLogger.log(`Running Hades admin mode on port ${this.runningPort.toString()}`);
        console.log(this.license);
    }
}
exports.AdminCLILoader = AdminCLILoader;
