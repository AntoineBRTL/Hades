import { CLILogger } from "../CLILogger.js";

export class AdminCLILoader
{
    private license:string = `
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

    private runningPort:number;
    private adminLogger:CLILogger;

    public constructor(runningPort:number, adminLogger:CLILogger)
    {
        this.runningPort = runningPort;
        this.adminLogger = adminLogger;
        
        this.adminLogger.write(`Running Hades admin mode on port ${this.runningPort.toString()}`);
        console.log(this.license);
    }
}