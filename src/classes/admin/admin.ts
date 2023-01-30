import { AdminCLI } from "./adminCLI.js";

export class Admin
{
    private runnningPort:number;
    private adminCLI:AdminCLI;

    public constructor(runningPort:number)
    {
        this.runnningPort = runningPort;
        this.adminCLI = new AdminCLI(this.runnningPort);
    }
}