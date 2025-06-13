import { Application, Container, Sprite } from "pixi.js";

export class Background extends Container {
    app : Application
    background : Sprite

    constructor(app:Application){
        super();
        this.app = app;
        this.addBackground();
        this.resize();
        this.app.renderer.on("resize",this.resize,this);
    }

    addBackground(){
     
        this.background = Sprite.from("background");

        this.background.anchor.set(0.5);
 
        this.addChild(this.background);
        
    }
    resize(){
        const {width,height} = this.app.renderer;
        this.background.x = width*0.5;
        this.background.y = height*0.5;

        const textureWidth = this.background.texture.width;
        const textureHeight = this.background.texture.height;

        const scaleX = width / textureWidth;
        const scaleY = height / textureHeight;
        const scale = Math.min(scaleX, scaleY);
        this.background.scale.set(scale);
    }
}