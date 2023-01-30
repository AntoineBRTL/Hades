"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHelper = void 0;
/**
 * Displays information about arguments in the command line tool.
 */
class CommandHelper {
    /**
     * Creates a command helper.
     */
    constructor() {
        this.helpers = `
    hades [option] [value]

    options:

    -a [port]       --admin         -- Starts hades as administrator.
    -c [port] [ip]  --client        -- Starts hades as client required, ([ip] == *) = Broadcast.
    -h              --help          -- Displays help.
    `;
        console.log(this.helpers);
    }
}
exports.CommandHelper = CommandHelper;
