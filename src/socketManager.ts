import { io, Socket } from "socket.io-client";

type ResultData = {
    result: "head" | "tail";
    balance: string;
};

export class Socketmanager {
    socket: Socket;
    balanceAmount: number = 0;
    onBalanceUpdate?: (balance: number) => void;

    onResultReceived?: (data: ResultData) => void;

    constructor() {
        this.socket = io("https://headtai.maharaj365.in", {
            transports: ["websocket"],
            query: {
                token: "0197cef6-e660eae0-7a06-8b708a-79",
                game_id: "4"
            }
        });

        this.socket.on("connect", () => {
            console.log("Connected to backend");
        });

        this.socket.on("info", (data) => {
            if (data && data.balance) {
                this.balanceAmount = parseFloat(data.balance);
                console.log("Balance from info:", this.balanceAmount);
                if (this.onBalanceUpdate) this.onBalanceUpdate(this.balanceAmount);
            }
        });

        this.socket.on("result", (data: ResultData) => {
            console.log("Result received:", data);
            if (data.balance) {
                this.balanceAmount = parseFloat(data.balance);
                if (this.onBalanceUpdate) this.onBalanceUpdate(this.balanceAmount);
            }
            if (this.onResultReceived) this.onResultReceived(data);
        });

        this.socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });
    }

    setBalanceUpdateCallback(callback: (balance: number) => void) {
        this.onBalanceUpdate = callback;
    }

    setResultCallback(callback: (data: ResultData) => void) {
        this.onResultReceived = callback;
    }

    getBalance(): number {
        return this.balanceAmount;
    }
}
