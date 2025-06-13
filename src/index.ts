import { Application,Assets,Container} from "pixi.js";
import {Background} from "./addingBackground.ts";
import {Coin} from "./addingCoin.ts";
import { HeadButton } from "./addingHeadButton.ts";
import { TailButton } from "./addingTailButton.ts";

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
            { alias: "background", src: "public/headsTails/back.jpg" },
            {alias: "coinAtlas", src: "public/headsTails/coin1_00000.png"},
            {alias: "tailButton", src:"public/buttons/buttonLeft.png"},
            {alias: "headButton", src:"public/buttons/buttonRight.png"},
            {alias:"tails" ,src:"public/headsTails/tail.png"},
            {alias:"heads", src:"public/headsTails/head.png"},
            {alias:"tailButtonHighlight" , src:"public/buttons/buttonLeftHighlight.png"},
            {alias:"headButtonHighlight" , src:"public/buttons/buttonRightHighlight.png"},
        ];
        await Assets.load(assets);
    }

    initializeGame(){
        const background = new Background(this.app);
        this.app.stage.addChild(background);
        new Coin(this.app);
        new HeadButton(this.app);
        new TailButton(this.app);
    }
}

const coinFlipApplication = new Coinflip();
coinFlipApplication.applicationInit();
coinFlipApplication.preload().then(() => {
    coinFlipApplication.initializeGame();
  });