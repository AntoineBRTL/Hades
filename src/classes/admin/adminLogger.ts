import { CLILogger } from "../CLILogger.js";

export class AdminLogger extends CLILogger
{
    public log(message:string, ip?:string)
    {
        super.log(message + (ip? " from : " + ip : ""), "+");
    }

    public error(message:string)
    {
        super.log(message, "-");
    }
}