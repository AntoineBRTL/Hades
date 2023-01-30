export class CLILogger
{
    public log(message: string, outline:string)
    {
        console.log(`[${outline}] ${message}`);
    }
}