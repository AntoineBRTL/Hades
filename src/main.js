"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_js_1 = require("./classes/admin/admin.js");
const client_js_1 = require("./classes/client/client.js");
const CLILogger_js_1 = require("./classes/CLILogger.js");
const commandHelper_js_1 = require("./classes/commandHelper.js");
class Main {
    static Main(argv) {
        // Help mode
        if (argv.includes("-h") || argv.length == 1) {
            new commandHelper_js_1.CommandHelper();
            process.exit();
        }
        // Client mode
        else if (argv.includes("-c"))
            new client_js_1.Client(argv[3].toString(), parseInt(argv[2].toString()));
        // Admid mode
        else if (argv.includes("-a"))
            new admin_js_1.Admin(parseInt(argv[2].toString()));
        else {
            let logger = new CLILogger_js_1.CLILogger();
            logger.log("Unknown command, try running 'hades -h'", "?");
        }
    }
}
Main.Main(process.argv.splice(1, process.argv.length - 1));
