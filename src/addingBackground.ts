import { Application, Container, Sprite } from "pixi.js";

export class Background extends Container {
    app : Application

    constructor(app:Application){
        super();
        this.app = app;
        this.addBackground()
        
    }

    addBackground(){
     
        const background = Sprite.from("background");

        background.anchor.set(0.5);
 
        background.x = this.app.screen.width*0.5;
        background.y = this.app.screen.height*0.5;

        this.app.stage.addChild(background);


        // const screenHeight = this.app.screen.height;
        // const screenWidth = this.app.screen.width;

        // const textureHeight = background.texture.height;
        // const textureWidth = background.texture.width;

        // background.scale.x = screenWidth / textureWidth;
        // background.scale.y = screenHeight / textureHeight;
        
        background.scale.set(0.8);
    }

}