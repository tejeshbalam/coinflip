import { Application, Container, Sprite } from "pixi.js";

export class HeadButton {
    app : Application;
    headsButtonContainer: Container;
    headsButton : Sprite;
    headsImage : Sprite;
    headHiglightButton : Sprite;
    headButtonHitArea : Sprite;

    constructor(app:Application){
        
        this.app = app;
        this.headsButtonContainer = new Container();
        this.app.stage.addChild(this.headsButtonContainer); 
        
        this.addHeadsButton();

        this.resize();
        this.app.renderer.on("resize",this.resize,this);
    }

    addHeadsButton(){
        this.app.stage.sortableChildren = true;

        this.headsButton = Sprite.from("headButton");
        this.headsButtonContainer.addChild(this.headsButton);
        this.headsButton.anchor.set(1,0.5);
        this.headsButton.scale.set(0.8);

        this.headsImage = Sprite.from("heads");
        this.headsButtonContainer.addChild(this.headsImage);
        this.headsImage.scale.set(0.9);
        this.headsImage.x = -this.headsButtonContainer.width*0.4;
        this.headsImage.y= -this.headsButtonContainer.height/4;

        this.headButtonHitArea = Sprite.from("headButtonHitArea");
        this.headsButtonContainer.addChild(this.headButtonHitArea);
        this.headButtonHitArea.scale.set(0.8);
        this.headButtonHitArea.anchor.set(0.5);
        this.headButtonHitArea.x = -this.headsButtonContainer.width/3;
        this.headButtonHitArea.alpha = 0;
        this.headButtonHitArea.interactive =  true;

        this.headHiglightButton = Sprite.from("headButtonHighlight");
        this.headsButtonContainer.addChild(this.headHiglightButton);
        this.headHiglightButton.scale.set(0.8);
        this.headHiglightButton.anchor.set(0.5);
        this.headHiglightButton.x = -this.headsButtonContainer.width/3;
        this.headHiglightButton.visible = false;

        this.headButtonHitArea.on("pointerover",() => {
            this.headHiglightButton.visible = true;
        })

        this.headButtonHitArea.on("pointerout", () => {
            this.headHiglightButton.visible = false;
        })
                
        this.headsButtonContainer.y = this.app.screen.height*0.5;
        this.headsButtonContainer.x = this.app.screen.width;
        
    }

    resize(){
        const { width } = this.app.renderer;

        const baseWidth = 1400;
        const scale = Math.max(0.4,(width / baseWidth)*0.8);

        this.headsButtonContainer.scale.set(scale);
        this.headsButtonContainer.y = this.app.screen.height * 0.5;
        this.headsButtonContainer.x = this.app.screen.width;
    }
}