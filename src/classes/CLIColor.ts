export class CLIColor
{
    private reset:string = "\x1b[0m";
    private bright:string = "\x1b[1m";
    private dim:string = "\x1b[2m";
    private underscore:string = "\x1b[4m";
    private blink:string = "\x1b[5m";
    private reverse:string = "\x1b[7m";
    private hidden:string = "\x1b[8m";

    private fgBlack:string = "\x1b[30m";
    private fgRed:string = "\x1b[31m";
    private fgGreen:string = "\x1b[32m";
    private fgYellow:string = "\x1b[33m";
    private fgBlue:string = "\x1b[34m";
    private fgMagenta:string = "\x1b[35m";
    private fgCyan:string = "\x1b[36m";
    private fgWhite:string = "\x1b[37m";
    private fgGray:string = "\x1b[90m";

    private bgBlack:string = "\x1b[40m";
    private bgRed:string = "\x1b[41m";
    private bgGreen:string = "\x1b[42m";
    private bgYellow:string = "\x1b[43m";
    private bgBlue:string = "\x1b[44m";
    private bgMagenta:string = "\x1b[45m";
    private bgCyan:string = "\x1b[46m";
    private bgWhite:string = "\x1b[47m";
    private bgGray:string = "\x1b[100m";

    public red(s:string):string
    {
        return this.fgRed + s + this.reset;
    }

    public yellow(s:string):string
    {
        return this.fgYellow + s + this.reset;
    }
}