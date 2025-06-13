import { Application, Container , Sprite} from "pixi.js";

export class Coin{
    app : Application;
    coinContainer : Container;

    constructor(app:Application){
        this.app = app;
        this.addCoin(); 
    }

    addCoin(){
        const coin = Sprite.from("coinAtlas");

        this.app.stage.addChild(coin);

        coin.x= this.app.screen.width*0.5;
        coin.y = this.app.screen.height*0.5;

        coin.anchor.set(0.5);

        coin.scale.set(0.8);
    }
}