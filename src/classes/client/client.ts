import { ClientSocket } from "./clientSocket.js";
import { RequestSender } from "./requestSender.js";

export class Client
{
    private port:number;
    private ip:string;
    private requestSender:RequestSender;

    public constructor(ip:string, port:number)
    {
        this.ip = ip;
        this.port = port;
        this.requestSender = new RequestSender(this.ip, this.port);

        this.requestSender.open(function(this:Client, socketPort:number)
        {
            new ClientSocket(this.ip, socketPort);
        }.bind(this));
    }
}