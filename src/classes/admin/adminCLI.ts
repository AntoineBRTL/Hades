import { Request, Response } from 'express';
import { createInterface } from "readline";
import { CLILogger } from '../CLILogger.js';
import { AdminCLICommandHelper } from './adminCLICommandHelper.js';
import { AdminCLIHelper } from './adminCLIHelper.js';
import { AdminCLILoader } from "./adminCLILoader.js";
import { AdminListener } from "./adminListener.js";
import { AdminSocket } from './adminSocket.js';

const readline = createInterface({
	input: process.stdin,
	output: process.stdout
});

export class AdminCLI
{
    private runningPort: number;
    private adminCLILoader: AdminCLILoader;
    private adminListener: AdminListener;
    private CLILogger: CLILogger;

    public constructor(runningPort: number)
    {
        this.runningPort = runningPort;
        this.CLILogger = new CLILogger();
        this.adminCLILoader = new AdminCLILoader(this.runningPort, this.CLILogger);
        this.adminListener = new AdminListener(this.runningPort, this.CLILogger, this.onGettingConnection.bind(this), this.onLosingConnection.bind(this));

        new AdminCLIHelper();
        this.input();
    }

    private onGettingConnection(request:Request, response:Response)
    {
        // this.adminLogger.log("Creating socket for", request.ip);
        new AdminSocket(this.runningPort, request, response);
    }

    private onLosingConnection(request:Request)
    {
        // this.adminLogger.log("Losing connection with", request.ip);
    }

    private input(callback:Function = this.handleInput.bind(this))
    {
        readline.question("$> ", function(input:string){
            callback(input);
        });
    }

    private inputCommandLine(socket:AdminSocket)
    {
        readline.question(`${socket.getSocketPort().toString()}@${socket.getCWD()} $ `, function(this:AdminCLI, input:string)
        {
            this.handleInputCommandLine(socket, input);
        }.bind(this));
    }

    private handleInputCommandLine(socket:AdminSocket, input:string)
    {
        if(input == "")
        {
            this.input();
            return;
        }

        let splitedInput = input.split(" ");

        if(splitedInput[0] == "-h" || splitedInput[0] == "--help")
        {
            new AdminCLICommandHelper();
            this.inputCommandLine(socket);
            return;
        }

        if(splitedInput[0] == "-e" || splitedInput[0] == "--exit")
        {
            this.CLILogger.speparator();
            this.input();
            return;
        }

        socket.emitCommand(input, this.inputCommandLine.bind(this, socket));
    }

    private handleInput(input:string)
    {
        if(input == "")
        {
            this.input();
            return;
        }

        let splitedInput = input.split(" ");

        if(splitedInput[0] == "-h" || splitedInput[0] == "--help")
        {
            new AdminCLIHelper();
            this.input();
            return;
        }

        if(splitedInput[0] == "-l" || splitedInput[0] == "--list")
        {
            AdminSocket.logSockets(this.CLILogger);
            this.input();
            return;
        }

        if(splitedInput[0] == "-c" || splitedInput[0] == "--command")
        {
            let port = parseInt(splitedInput[1]);
            let socket = AdminSocket.getSocket(port);

            if(!socket) {this.CLILogger.error("Can't find the machine"); this.input(); return;}
            
            this.CLILogger.speparator();

            new AdminCLICommandHelper();
            this.inputCommandLine(socket);
            return;
        }

        if(splitedInput[0] == "-e" || splitedInput[0] == "--exit")
        {
            process.exit(0);
        }

        if(splitedInput[0] == "-i" || splitedInput[0] == "--info")
        {
            this.CLILogger.write(`Listening on port ${this.runningPort.toString()}`);
        }

        this.input();
    }
}