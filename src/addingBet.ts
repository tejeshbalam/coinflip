import {Application,Sprite,Container,Text,TextStyle} from "pixi.js";
import { Socketmanager } from "./socketManager";

export class Betpanel {
    app:Application;
    betContainer : Container;
    betPanel: Sprite;
    betIcon: Sprite;
    betText: Text;
    betAmount : Text;
    betPlaceAmount : number;
    betTextStyle : TextStyle;
    socket : Socketmanager;

    constructor(app:Application,socket : Socketmanager){
        this.app = app;
        this.socket = socket;
        this.betContainer = new Container();
        this.app.stage.addChild(this.betContainer);

        this.addBalance();

        this.resize();
        this.app.renderer.on("resize",this.resize,this)
    }

    addBalance(){
        this.betPanel = Sprite.from("betPanelRight")
        this.betContainer.addChild(this.betPanel);
        this.betPanel.scale.set(2,1);
        
        this.betIcon = Sprite.from("betImage");
        this.betContainer.addChild(this.betIcon);
        this.betIcon.x = this.betContainer.width*0.3;
        this.betIcon.y = this.betContainer.height*0.5;

        this.betTextStyle = new TextStyle({
            fontSize:32,
            fill:"#ffffff",
            align:"center",
        })
        this.betText = new Text("Total Bet",this.betTextStyle);
        this.betContainer.addChild(this.betText);
        this.betText.x =  this.betContainer.width*0.5;
        this.betText.y =  this.betContainer.height*0.3;

        this.betAmount = new Text("20",this.betTextStyle);
        this.betContainer.addChild(this.betAmount);
        this.betAmount.x =  this.betContainer.width*0.5;
        this.betAmount.y =  this.betContainer.height*0.6;

        this.betContainer.x = this.app.screen.width - this.betContainer.width;
        this.betContainer.y = this.app.screen.height - this.betContainer.height;
    }

    updateBetAmount(newBetAmount: number) {
        this.betPlaceAmount = newBetAmount;
        this.betAmount.text = `${this.betPlaceAmount}.00`
    }

    getBetAmount(): number {
        this.betPlaceAmount = 19;
        return this.betPlaceAmount;
    }

    resize(){
        const {width} = this.app.renderer;

        const baseWidth = 1400;
        
        const scale = Math.max(0.4,(width/baseWidth));
        this.betContainer.scale.set(scale);

        this.betContainer.x = this.app.screen.width - this.betContainer.width;
        this.betContainer.y = this.app.screen.height - this.betContainer.height;
    }
}