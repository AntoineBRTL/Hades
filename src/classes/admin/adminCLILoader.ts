import { AdminLogger } from "./adminLogger.js";

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
    private adminLogger:AdminLogger;

    public constructor(runningPort:number, adminLogger:AdminLogger)
    {
        this.runningPort = runningPort;
        this.adminLogger = adminLogger;
        
        this.adminLogger.log(`Running Hades admin mode on port ${this.runningPort.toString()}`);
        console.log(this.license);
    }
}