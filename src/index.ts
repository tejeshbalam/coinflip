import { Application,Assets} from "pixi.js";
import {Background} from "./addingBackground.ts";
import {Coin} from "./addingCoin.ts";
import { HeadButton } from "./addingHeadButton.ts";
import { TailButton } from "./addingTailButton.ts";
import { Balance } from "./addingBalance.ts"; 
import { Betpanel } from "./addingBet.ts";
import { Panelbackground } from "./addingPanelbg.ts";

class Coinflip{
    app:Application;
    coinFlipContainer:HTMLElement;

    applicationInit(){ 
        const containerElemnt = document.getElementById("coin-flip-container");
        if(!containerElemnt){
            throw new Error("element not found");
        }

        this.coinFlipContainer = containerElemnt;
        this.app = new Application({
            resizeTo:this.coinFlipContainer,
        });

        globalThis.__PIXI_APP__ = this.app;
        this.coinFlipContainer.appendChild(this.app.view as HTMLCanvasElement);
    }

    async preload(){
        const assets = [
            {alias: "background", src: "/headsTails/back.jpg" },
            {alias: "coinSheet", src: "/headsTails/coin.json"},
            {alias: "tailButton", src:"/buttons/buttonLeft.png"},
            {alias: "headButton", src:"/buttons/buttonRight.png"},
            {alias:"tails" ,src:"/headsTails/tail.png"},
            {alias:"heads", src:"/headsTails/head.png"},
            {alias:"tailButtonHighlight" , src:"/buttons/buttonLeftHighlight.png"},
            {alias:"headButtonHighlight" , src:"/buttons/buttonRightHighlight.png"},
            {alias:"tailButtonHitArea", src:"/buttons/buttonLeftHitArea.png"},
            {alias:"headButtonHitArea", src:"/buttons/buttonRightHitArea.png"},
            {alias:"balancePanelLeft", src:"/panel/panel_round_left.png"},
            {alias:"betPanelRight", src:"/panel/panel_round_right.png"},
            {alias:"balanceImage", src:"/panel/balance_icon.png"},
            {alias:"betImage", src:"/panel/bet_icon.png"},
            {alias:"backgroundPanel",src:"/panel/message_back_desktop.png"},
            {alias:"gameLogo",src:"/panel/logo.png"},

        ];
        await Assets.load(assets);
    }

    async initializeGame(){
        const background = new Background(this.app);
        this.app.stage.addChild(background);
        const coin = new Coin(this.app);
        const balance = new Balance(this.app);
        const bet = new Betpanel(this.app);
        new HeadButton(this.app,coin,balance,bet);
        new TailButton(this.app,coin,balance,bet);
        new Panelbackground(this.app);
        
    }
}

const coinFlipApplication = new Coinflip();
coinFlipApplication.applicationInit();
coinFlipApplication.preload().then(() => {
    coinFlipApplication.initializeGame();
  });