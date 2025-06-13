import { Application, Container, Graphics,Sprite } from "pixi.js";

export class TailButton {
    app : Application;
    tailsButtonContainer: Container;
    tailsButton : Sprite;
    tailsImage : Sprite;

    constructor(app:Application){
        
        this.app = app;
        this.tailsButtonContainer = new Container();
        this.app.stage.addChild(this.tailsButtonContainer);
        this.tailsButtonContainer.pivot.set(0.5);
        
        this.addTailsButton()
    }

    addTailsButton(){
        this.app.stage.sortableChildren = true;
        
        this.tailsButton = Sprite.from("tailButton");
        this.tailsButton.anchor.set(0,0.5);
        this.tailsButtonContainer.addChild(this.tailsButton);

        this.tailsImage = Sprite.from("tails");
        this.tailsButtonContainer.addChild(this.tailsImage);
        this.tailsImage.scale.set(0.9);
        this.tailsImage.x = 0;
        this.tailsImage.y = - this.tailsButtonContainer.height/4;

        this.tailsButtonContainer.y = this.app.screen.height*0.5;
        this.tailsButtonContainer.x = 0;

        this.tailsButtonContainer.zIndex = 10;

        
    }
}

