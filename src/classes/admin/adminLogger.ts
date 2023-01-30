export class AdminLogger
{
    public constructor()
    {
        console.log("\n");
    }

    public log(message:string, ip?:string)
    {
        console.log("[+] " + message + (ip? " from : " + ip : ""));
    }

    public error(message:string)
    {
        console.log("[-] " + message);
    }
}