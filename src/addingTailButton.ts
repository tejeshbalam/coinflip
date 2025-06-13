import { Application, Container,Sprite } from "pixi.js";

export class TailButton {
    app : Application;
    tailsButtonContainer: Container;
    tailsButton : Sprite;
    tailsImage : Sprite;
    tailsHighlightButton : Sprite;
    tailButtonHitArea : Sprite;

    constructor(app:Application){
        
        this.app = app;
        this.tailsButtonContainer = new Container();
        this.app.stage.addChild(this.tailsButtonContainer);
        this.tailsButtonContainer.pivot.set(0.5);
        
        this.addTailsButton()
        this.resize();
        this.app.renderer.on("resize",this.resize,this)
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

        this.tailButtonHitArea = Sprite.from("headButtonHitArea");
        this.tailsButtonContainer.addChild(this.tailButtonHitArea);
        this.tailButtonHitArea.scale.set(0.8);
        this.tailButtonHitArea.anchor.set(0.5);
        this.tailButtonHitArea.x = this.tailsButtonContainer.width/3;
        this.tailButtonHitArea.alpha = 0;
        this.tailButtonHitArea.interactive =  true;

        this.tailsHighlightButton = Sprite.from("tailButtonHighlight");
        this.tailsButtonContainer.addChild(this.tailsHighlightButton);
        this.tailsHighlightButton.anchor.set(0.5);
        this.tailsHighlightButton.x = this.tailsButtonContainer.width/3;
        this.tailsHighlightButton.visible = false;

        this.tailButtonHitArea.on("pointerover", () => {
            this.tailsHighlightButton.visible = true;
        });

        this.tailButtonHitArea.on("pointerout", () => {
            this.tailsHighlightButton.visible = false;
        });

        this.tailsButtonContainer.y = this.app.screen.height*0.5;
        this.tailsButtonContainer.x = 0;        
    }

    resize(){
        const { width } = this.app.renderer;

        const baseWidth = 1400;
        const scale = Math.max(0.4,(width / baseWidth)*0.8);

        this.tailsButtonContainer.scale.set(scale);
        this.tailsButtonContainer.y = this.app.screen.height * 0.5;
        this.tailsButtonContainer.x = 0;
    }
}

