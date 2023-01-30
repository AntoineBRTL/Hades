import axios, { AxiosResponse } from "axios";

export enum Req
{
    StartConnection,
    StopConnection
}

export enum ConnectionStatus
{
    Opened,
    Closed
}

/**
 * Class which sends informations from this machine A to machine B
 */
export class RequestSender
{
    private P2PConnectionStatus: ConnectionStatus;

    /**
     * IP of the machine B.
     */
    private ip:String;

    /**
     * Port the machine B is listening on.
     */
    private port:number;

    private get host()
    {
        return "http://" + this.ip + ":" + this.port.toString();
    }

    /**
     * @param ip IP of the machine B.
     */
    public constructor(ip: String, port: number)
    {
        this.P2PConnectionStatus = ConnectionStatus.Closed;
        this.ip = ip;
        this.port = port;
    }

    /**
     * Send a request to machine B.
     * @param req specifies what to send.
     */
    private requestToB(req:Req, callback?:Function, callerr?:Function)
    {
        axios.post(this.host, {req}).then(function(res)
        {
            if(callback) callback(res);
            console.log("[+] Received from Admin : " + res.data.toString());
        }).catch(function(this:RequestSender, error){
            if(callerr)
                callerr();
            return error;
        });
    }

    /**
     * Tries opening P2P connection
     */
    public open(callback:Function)
    {
        function tryOpen(this:RequestSender)
        {
            console.log("[+] Trying to open P2P connection ...");

            this.requestToB(Req.StartConnection, function(this:RequestSender, res:AxiosResponse)
            {
                if(res.status != 200) return;
                this.P2PConnectionStatus = ConnectionStatus.Opened;
                callback(parseInt(res.data));
            }.bind(this), tryOpen.bind(this));
        };

        tryOpen.call(this);
    }

    /**
     * Close P2P connection
     */
    public close()
    {
        console.log("[+] Close P2P connection ...");
        this.requestToB(Req.StopConnection);
    }

    public getP2PConnectionStatus()
    {
        return this.P2PConnectionStatus;
    }
}