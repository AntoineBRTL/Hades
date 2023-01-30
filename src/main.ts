import { Admin } from "./classes/admin/admin.js";
import { Client } from "./classes/client/client.js";
import { CommandHelper } from "./classes/commandHelper.js";

class Main
{
    public static Main(argv:String[])
    {
        // Client mode
        if(argv.includes("-c")) new Client(argv[2].toString(), parseInt(argv[1].toString()));

        // Admid mode
        if(argv.includes("-a")) new Admin(parseInt(argv[1].toString()));

        // Help mode
        if(argv.includes("-h")) new CommandHelper();
    }
}

Main.Main(process.argv.splice(1, process.argv.length - 1));