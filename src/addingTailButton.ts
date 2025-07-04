import { Application, Container,Sprite,Text,TextStyle } from "pixi.js";
import type { Coin, CoinResult} from "./addingCoin";
import { Betpanel } from "./addingBet";
import { Balance } from "./addingBalance";
import { SoundManager } from "./addingSound";
import { Socketmanager } from "./socketManager";
import { Popup } from "./addingPopups";

export class TailButton {
    app : Application;
    tailsButtonContainer: Container;
    tailsButton : Sprite;
    tailsImage : Sprite;
    tailsHighlightButton : Sprite;
    tailButtonHitArea : Sprite;
    tailText : Text;
    tailTextStyle : TextStyle;
    coin : Coin;
    bet : Betpanel;
    balance : Balance;
    sound : SoundManager;
    socket : Socketmanager;

    constructor(app:Application,coin:Coin,balance : Balance, bet : Betpanel, sound : SoundManager,socket : Socketmanager){
        
        this.app = app;
        this.coin = coin;
        this.balance = balance;
        this.bet = bet;
        this.sound = sound;
        this.socket = socket;
        this.tailsButtonContainer = new Container();
        this.app.stage.addChild(this.tailsButtonContainer);
        this.tailsButtonContainer.pivot.set(0.5);
        
        this.addTailsButton()
        this.resize();
        this.app.renderer.on("resize",this.resize,this)
    }

    addTailsButton(){
        this.app.stage.sortableChildren = true;
        
        this.tailsButton = Sprite.from("tailButton");
        this.tailsButton.anchor.set(0,0.5);
        this.tailsButtonContainer.addChild(this.tailsButton);

        this.tailsImage = Sprite.from("tails");
        this.tailsButtonContainer.addChild(this.tailsImage);
        this.tailsImage.scale.set(0.9);
        this.tailsImage.x = 0;
        this.tailsImage.y = - this.tailsButtonContainer.height/4;

        this.tailButtonHitArea = Sprite.from("headButtonHitArea");
        this.tailsButtonContainer.addChild(this.tailButtonHitArea);
        this.tailButtonHitArea.scale.set(0.8);
        this.tailButtonHitArea.anchor.set(0.5);
        this.tailButtonHitArea.x = this.tailsButtonContainer.width/3;
        this.tailButtonHitArea.alpha = 0;
        this.tailButtonHitArea.interactive =  true;

        this.tailsHighlightButton = Sprite.from("tailButtonHighlight");
        this.tailsButtonContainer.addChild(this.tailsHighlightButton);
        this.tailsHighlightButton.anchor.set(0.5);
        this.tailsHighlightButton.x = this.tailsButtonContainer.width/3;
        this.tailsHighlightButton.visible = false;

        this.tailTextStyle = new TextStyle({
            fontSize:32,
            fill:"#ffffff",
            align:"center",
        })
        this.tailText = new Text("TAILS", this.tailTextStyle);
        this.tailsButtonContainer.addChild(this.tailText);
        this.tailText.x = this.tailsButtonContainer.width*0.1;
        this.tailText.y = this.tailsButtonContainer.height*0.1;

        this.tailButtonHitArea.on("pointerover", () => {
            this.tailsHighlightButton.visible = true;
        });

        this.tailButtonHitArea.on("pointerout", () => {
            this.tailsHighlightButton.visible = false;
        });

        this.tailButtonHitArea.on("pointerdown", () => {
            const betAmount = this.bet.getBetAmount();
            let currentBalance = this.balance.getBalance();

            if(betAmount > currentBalance){
                // alert("Insufficent Balance");
                new Popup(this.app,"Insufficent Balance")
            }
            else if (betAmount > 20000 || betAmount < 20) {
                //alert("Bet Place should be 20-20000")
                new Popup(this.app,"Bet Amount will be 20-20000")
            }
            else{
                this.balance.updateBalance(this.balance.getBalance() - betAmount);
                this.coin.flip(0);

                this.socket.socket.emit("bt", {
                    type: 0,
                    amount: betAmount
                });

                this.coin.onFlipComplete = (result: CoinResult, user: CoinResult) => {
                    if (result === user) {
                        this.balance.updateBalance(this.balance.getBalance() + betAmount*2);
                        this.sound.playWin();
                        new Popup(this.app,"You Win");
                    } else {
                       // this.balance.updateBalance(currentBalance - 1);
                       //alert("lose the bet");
                       new Popup(this.app,"You Lost");
                    }
                };
            }
        });

        this.tailsButtonContainer.y = this.app.screen.height*0.5;
        this.tailsButtonContainer.x = 0;        
    }

    resize(){
        const { width } = this.app.renderer;

        const baseWidth = 1400;
        const scale = Math.max(0.4,(width / baseWidth)*0.8);

        this.tailsButtonContainer.scale.set(scale);
        this.tailsButtonContainer.y = this.app.screen.height * 0.5;
        this.tailsButtonContainer.x = 0;
    }
}

