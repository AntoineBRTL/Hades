"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCLIHelper = void 0;
class AdminCLIHelper {
    constructor() {
        this.helper = `
    
    Hades CLI helper:

    [option] [value]

    -b [command]    --brodcast      -- Brodcasts [command].
    -c [port]       --command       -- Enters command mode for the machine [port].
    -d [port]       --disconnect    -- Shutdowns the client on the machine [port].
    -e              --exit          -- Exits Hades.
    -h              --help          -- Displays help.
    -l              --list          -- Lists all machines.
    `;
        console.log(this.helper);
    }
}
exports.AdminCLIHelper = AdminCLIHelper;
