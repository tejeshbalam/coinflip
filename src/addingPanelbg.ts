import { Application,Sprite,Container } from "pixi.js";


export class Panelbackground {
    app:Application;
    panelBackgroundContainer: Container;
    backgroundPanelImage : Sprite;
    logoGameIcon : Sprite;

    constructor(app:Application){
        this.app = app;

        this.panelBackgroundContainer = new Container();
        this.app.stage.addChild(this.panelBackgroundContainer);

        this.addBackgroundPanel();
        this.resize();
        this.app.renderer.on("resize",this.resize,this);
    }

    addBackgroundPanel(){
        this.app.stage.sortableChildren = true;

        this.backgroundPanelImage = Sprite.from("backgroundPanel");
        this.panelBackgroundContainer.addChild(this.backgroundPanelImage);
        this.backgroundPanelImage.scale.set(1,2);

        // this.logoGameIcon = Sprite.from("gameLogo");
        // this.panelBackgroundContainer.addChild(this.logoGameIcon);
        // this.logoGameIcon.anchor.set(0.5);
        // this.logoGameIcon.scale.set(0.8);
        // this.logoGameIcon.alpha = 0.1;
        // this.logoGameIcon.x = this.panelBackgroundContainer.width*0.4;
        // this.logoGameIcon.y= this.panelBackgroundContainer.height*0.5;

        this.panelBackgroundContainer.x = -10;
        this.panelBackgroundContainer.y = this.app.screen.height - this.panelBackgroundContainer.height;
    }
    resize(){
        const {width} = this.app.renderer;

        const baseWidth = 1400;
        
        const scale = Math.max(0.2,(width/baseWidth));
        
        this.panelBackgroundContainer.scale.set(scale);
        //this.panelBackgroundContainer.zIndex = -1;

        this.panelBackgroundContainer.x = 0;
        this.panelBackgroundContainer.y = this.app.screen.height - this.panelBackgroundContainer.height;
    }
} 