import { Admin } from "./classes/admin/admin.js";
import { Client } from "./classes/client/client.js";
import { CLILogger } from "./classes/CLILogger.js";
import { CommandHelper } from "./classes/commandHelper.js";

class Main
{
    public static Main(argv:String[])
    {
        // Help mode
        if(argv.includes("-h") || argv.length == 1)
        {
            new CommandHelper();
            process.exit();
        }

        // Client mode
        else if(argv.includes("-c")) new Client(argv[3].toString(), parseInt(argv[2].toString()));

        // Admid mode
        else if(argv.includes("-a")) new Admin(parseInt(argv[2].toString()));

        else
        {
            let logger = new CLILogger();
            logger.log("Unknown command, try running 'hades -h'", "?");
        }
    }
}

Main.Main(process.argv.splice(1, process.argv.length - 1));