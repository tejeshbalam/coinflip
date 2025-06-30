import { io,Socket } from "socket.io-client";


export class Socketmanager{
    socket : Socket
    balanceAmount : number;

    constructor(){

        this.socket = io(import.meta.env.VITE_BACKEND_URL,{
            transports : ["websocket"],
        })

        this.socket.on("connect",()=>{
            console.log("server connected")
        })

        this.socket.on("bet_info",(data) => {
            this.balanceAmount = data.balance;
        })
    }

    on(event: string, callback: (...args: any[]) => void) {
        this.socket.on(event, callback);
    }
}

