import { Application, Container, Graphics, Sprite } from "pixi.js";

export class HeadButton {
    app : Application;
    headsButtonContainer: Container;
    headsButton : Sprite;
    headsImage: Sprite;
    headHiglightButton : Sprite;

    constructor(app:Application){
        
        this.app = app;
        this.headsButtonContainer = new Container();
        this.app.stage.addChild(this.headsButtonContainer);
        
        this.addHeadsButton();
    }

    addHeadsButton(){
        this.app.stage.sortableChildren = true;

        this.headsButton = Sprite.from("headButton");
        this.headsButtonContainer.addChild(this.headsButton);
        this.headsButton.anchor.set(1,0.5);
        this.headsButton.scale.set(0.8);
        this.headsButton.interactive = true;

        this.headsImage = Sprite.from("heads");
        this.headsButtonContainer.addChild(this.headsImage);
        this.headsImage.scale.set(0.9);
        this.headsImage.x = -this.headsButtonContainer.width*0.4;
        this.headsImage.y= -this.headsButtonContainer.height/4;

        this.headHiglightButton = Sprite.from("headButtonHighlight");
        this.headsButtonContainer.addChild(this.headHiglightButton);
        this.headHiglightButton.scale.set(0.8);
        this.headHiglightButton.anchor.set(0.5);
        this.headHiglightButton.x = -this.headsButtonContainer.width/3;
        this.headHiglightButton.visible = false;

        this.headsButton.on("pointerover",() => {
            this.headHiglightButton.visible = true;
        })

        this.headsButton.on("pointerout", () => {
            this.headHiglightButton.visible = false;
        })
                
        this.headsButtonContainer.y = this.app.screen.height*0.5;
        this.headsButtonContainer.x = this.app.screen.width;

        this.headsButtonContainer.zIndex = 11;

        
    }
}