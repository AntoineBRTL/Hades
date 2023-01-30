"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCLICommandHelper = void 0;
class AdminCLICommandHelper {
    constructor() {
        this.helper = `
    
    Hades CLI command mode helper:

    [option] [value]

    -e              --exit          -- Exits command mode.
    -h              --help          -- Displays help.
    `;
        console.log(this.helper);
    }
}
exports.AdminCLICommandHelper = AdminCLICommandHelper;
