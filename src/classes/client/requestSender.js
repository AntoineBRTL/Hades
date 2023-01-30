"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSender = exports.ConnectionStatus = exports.Req = void 0;
const axios_1 = __importDefault(require("axios"));
var Req;
(function (Req) {
    Req[Req["StartConnection"] = 0] = "StartConnection";
    Req[Req["StopConnection"] = 1] = "StopConnection";
})(Req = exports.Req || (exports.Req = {}));
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["Opened"] = 0] = "Opened";
    ConnectionStatus[ConnectionStatus["Closed"] = 1] = "Closed";
})(ConnectionStatus = exports.ConnectionStatus || (exports.ConnectionStatus = {}));
/**
 * Class which sends informations from this machine A to machine B
 */
class RequestSender {
    get host() {
        return "http://" + this.ip + ":" + this.port.toString();
    }
    /**
     * @param ip IP of the machine B.
     */
    constructor(ip, port) {
        this.P2PConnectionStatus = ConnectionStatus.Closed;
        this.ip = ip;
        this.port = port;
    }
    /**
     * Send a request to machine B.
     * @param req specifies what to send.
     */
    requestToB(req, callback, callerr) {
        axios_1.default.post(this.host, { req }).then(function (res) {
            if (callback)
                callback(res);
            console.log("[+] Received from Admin : " + res.data.toString());
        }).catch(function (error) {
            if (callerr)
                callerr();
            return error;
        });
    }
    /**
     * Tries opening P2P connection
     */
    open(callback) {
        function tryOpen() {
            console.log("[+] Trying to open P2P connection ...");
            this.requestToB(Req.StartConnection, function (res) {
                if (res.status != 200)
                    return;
                this.P2PConnectionStatus = ConnectionStatus.Opened;
                callback(parseInt(res.data));
            }.bind(this), tryOpen.bind(this));
        }
        ;
        tryOpen.call(this);
    }
    /**
     * Close P2P connection
     */
    close() {
        console.log("[+] Close P2P connection ...");
        this.requestToB(Req.StopConnection);
    }
    getP2PConnectionStatus() {
        return this.P2PConnectionStatus;
    }
}
exports.RequestSender = RequestSender;
