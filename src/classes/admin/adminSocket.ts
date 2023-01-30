import { Response, Request } from "express";
import { WebSocketServer, WebSocket } from "ws";
import { AdminLogger } from "./adminLogger.js";
import { SocketAction } from "../client/clientSocket.js";

export class AdminSocket
{
    private static sockets:AdminSocket[] = new Array();

    public static logSockets(adminLogger:AdminLogger)
    {
        adminLogger.log(`${this.sockets.length} connection(s) opened`);
        for(let socket of this.sockets)
        {
            adminLogger.log(`${socket.socketPort.toString()} : ${socket.ip}`);
        }
    }

    public static getSocket(port:number)
    {
        for(let socket of this.sockets)
        {
            if(socket.socketPort == port) return socket;
        }
    }

    private runningPort:number;
    private socketPort:number;
    private socketServer:WebSocketServer;
    private response:Response;
    private request:Request
    private ip:string;
    private cwd:string;

    public constructor(runningPort:number, request:Request, response:Response)
    {
        this.runningPort = runningPort;
        this.socketPort = this.getAvailablePort();
        this.request = request;
        this.response = response;
        this.ip = this.request.ip.split(':')[this.request.ip.split(':').length - 1];
        this.cwd = "";

        this.socketServer = new WebSocketServer({port: this.socketPort});
        this.socketServer.on("connection", function(this:AdminSocket, socketClient:WebSocket)
        {
            socketClient.send(JSON.stringify({socketAction : SocketAction.CWDGetter}));
            // console.log("[x] Connection established");
            socketClient.on("message", function(this:AdminSocket, message:string)
            {
                let s = JSON.parse(message);
                this.cwd = s.cwd;
                if(s.stdout) console.log(s.stdout);
            }.bind(this));
        }.bind(this));

        this.response.end(this.socketPort.toString());
    }

    private getAvailablePort()
    {
        AdminSocket.sockets.push(this);
        return AdminSocket.sockets.length + this.runningPort;
    }

    public emitCommand(command:string, callback:Function)
    {
        this.socketServer.clients.forEach(function(this:AdminSocket, client:WebSocket)
        {
            client.send(JSON.stringify({socketAction : SocketAction.Command, command}));

            function handleCallback(this:AdminSocket)
            {
                client.once("message", function(this:AdminSocket, message:string)
                {
                    let parsed = JSON.parse(message);
                    if(!parsed.closed)
                    {
                        client.once("message", handleCallback.bind(this));
                        return;
                    }
                    callback(this);
                }.bind(this));
            }
            handleCallback.call(this);
        }.bind(this));
    }

    public getCWD()
    {
        return this.cwd;
    }

    public getSocketPort()
    {
        return this.socketPort;
    }
}