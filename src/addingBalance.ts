import {Application,Sprite,Container,Text,TextStyle} from "pixi.js";

export class Balance {
    app:Application;
    balanceContainer : Container;
    balancePanel: Sprite;
    balanceIcon: Sprite;
    balanceText : Text;
    balanceTextStyle : TextStyle;
    balanceAmount : Text;
    currentBalance : number = 1000;

    constructor(app:Application){
        this.app = app;
        this.balanceContainer = new Container();
        this.app.stage.addChild(this.balanceContainer);

        this.addBalance();

        this.resize();
        this.app.renderer.on("resize",this.resize,this);
    }

    addBalance(){
        this.balancePanel = Sprite.from("balancePanelLeft")
        this.balanceContainer.addChild(this.balancePanel);
        this.balancePanel.scale.set(2,1);
        
        this.balanceIcon = Sprite.from("balanceImage");
        this.balanceContainer.addChild(this.balanceIcon);
        this.balanceIcon.x = this.balanceContainer.width*0.05;
        this.balanceIcon.y = this.balanceContainer.height*0.3;

        this.balanceTextStyle = new TextStyle({
            fontSize:32,
            fill:"#ffffff",
            align:"center",
        });
        this.balanceText = new Text("Balance",this.balanceTextStyle);
        this.balanceContainer.addChild(this.balanceText);
        this.balanceText.x = this.balanceContainer.width*0.25;
        this.balanceText.y = this.balanceContainer.height*0.35;
        
        this.balanceAmount = new Text("1000.00 FUN",this.balanceTextStyle);
        this.balanceContainer.addChild(this.balanceAmount);
        this.balanceAmount.x = this.balanceContainer.width*0.25;
        this.balanceAmount.y = this.balanceContainer.height*0.6;

        

        this.balanceContainer.x = 0;
        this.balanceContainer.y = this.app.screen.height - this.balanceContainer.height;
    }

    updateBalance(newAmount: number) {
        this.currentBalance = newAmount;
        this.balanceAmount.text = `${this.currentBalance}.00 FUN`
    }

    getBalance(): number {
        return this.currentBalance;
    }

    resize(){
        const {width} = this.app.renderer;

        const baseWidth = 1400;

        const scale = Math.max(0.4,(width/baseWidth));
        this.balanceContainer.scale.set(scale);

        this.balanceContainer.x = 0;
        this.balanceContainer.y = this.app.screen.height - this.balanceContainer.height;
    }
}