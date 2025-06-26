import { io,Socket } from "socket.io-client";


export class SoundManager{
    socket : Socket

    constructor(){

        this.socket = io(import.meta.env.VITE_BACKEND_URL,{
            transports : ["websocket"],
        })

        this.socket.on("connect",()=>{
            console.log("server connected")
        })
    }

    sendBet(choice : number, btAmt : number){
        this.socket.emit("bt",{choice,btAmt})
    };

    onInfo(userInfo: (data:{user_id:number,operator_id:number, balance:number}) => void){
        this.socket.on("info",userInfo)
    }

    onResult(betResults:(data:{status:"win"| "loss",winAmt:number,mult:number}) => void){
        this.socket.on("result",betResults)
    }
}
