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
        this.app.stage.sortableChildren = true;
     
        this.background = Sprite.from("background");

        this.background.anchor.set(0.5);
 
        this.addChild(this.background);
        
    }
    
    resize(){
        const {width,height} = this.app.renderer;
        this.background.x = width*0.5;
        this.background.y = height*0.5;

        const baseWidth = 1400;

        const scale = Math.max(0.3,(width/baseWidth)*0.8);
        this.background.scale.set(scale);
        this.background.zIndex = -2;
    }
}