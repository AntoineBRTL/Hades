"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLILogger = void 0;
class CLILogger {
    log(message, outline) {
        console.log(`[${outline}] ${message}`);
    }
}
exports.CLILogger = CLILogger;
