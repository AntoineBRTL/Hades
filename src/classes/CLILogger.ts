import { CLIColor } from "./CLIColor.js";

export class CLILogger
{
    private CLIColor:CLIColor;

    public constructor()
    {
        this.CLIColor = new CLIColor();
    }

    public log(message: string, outline:string)
    {
        console.log(`[${outline}] ${message}`);
    }

    public write(message:string)
    {
        this.log(message, "+");
    }

    public error(error:string)
    {
        this.log(this.CLIColor.red(error), "-");
    }

    public warn(warn:string)
    {
        this.log(this.CLIColor.yellow(warn), "!");
    }
}