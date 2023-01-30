import express, { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import { Req } from '../client/requestSender.js';
import { AdminSocket } from './adminSocket.js';
import { Server } from 'http';
import { AdminLogger } from './adminLogger.js';

export class AdminListener
{
    private serverPort: number;
    private app: Express;
    private server: Server;
    private onGettingConnection: Function;
    private onLosingConnection: Function;
    private adminLogger: AdminLogger;

    public constructor(port: number, adminLogger:AdminLogger, onGettingConnection:Function, onLosingConnection:Function)
    {
        this.serverPort = port;
        this.adminLogger = adminLogger;

        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.server = this.app.listen(this.serverPort);

        this.onGettingConnection = onGettingConnection;
        this.onLosingConnection = onLosingConnection;

        this.app.post("*", function(this:AdminListener, request:Request, response:Response)
        {
            let req = request.body.req;
            // adminLogger.log(`Received : ${req} -> ${Req[req].toString()}`, request.ip);
            
            if(req == Req.StartConnection)
            {
                this.onGettingConnection(request, response);
            }

            if(req == Req.StartConnection)
            {
                this.onLosingConnection(request);
                response.end();
            }
        }.bind(this));
    }
}