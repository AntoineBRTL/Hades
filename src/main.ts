import { Admin } from "./classes/admin/admin.js";
import { Client } from "./classes/client/client.js";
import { CLILogger } from "./classes/CLILogger.js";
import { CommandHelper } from "./classes/commandHelper.js";

class Main
{
    private static DEFAULT_PORT:number = 4035;
    
    public static Main(argv:string[])
    {
        // Help mode
        if(argv.includes("-h") || argv.includes("--hades") || argv.length <= 1)
        {
            new CommandHelper();
            process.exit();
        }

        // Client mode
        else if(argv.includes("-c") || argv.includes("--client"))
        {
            let IP:string;
            let PORT:number;
            IP = argv[2];
            PORT = argv.length <= 3 ? this.DEFAULT_PORT : parseInt(argv[3]);

            new Client(IP, PORT);
        }

        // Admid mode
        else if(argv.includes("-a") || argv.includes("--admin"))
        {
            let PORT:number;
            PORT = argv.length <= 2 ? this.DEFAULT_PORT : parseInt(argv[2]);

            new Admin(PORT);
        }

        else
        {
            let logger = new CLILogger();
            logger.log("Unknown command, try running 'hades -h'", "?");
            process.exit();
        }
    }
}

Main.Main(process.argv.splice(1, process.argv.length - 1));