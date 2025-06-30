// addingPopups.ts
import { Application, Container, Text, TextStyle, Graphics } from "pixi.js";

export class Popup {
    app: Application;
    container: Container;

    constructor(app: Application, message: string) {
        this.app = app;
        this.container = new Container();
        this.app.stage.addChild(this.container);
        this.app.stage.sortableChildren = true;
        this.container.zIndex = 999;

        const graphics = new Graphics();
        graphics.beginFill(0x000000, 0.7);
        graphics.drawRoundedRect(0, 0, 300, 100, 10);
        graphics.endFill();
        graphics.pivot.set(150, 50);
        this.container.addChild(graphics);

        const style = new TextStyle({
            fill: "#ffffff",
            fontSize: 24,
            align: "center",
        });

        const text = new Text(message, style);
        text.anchor.set(0.5);
        text.x = 0;
        text.y = 0;
        this.container.addChild(text);

        this.resize();
        window.addEventListener("resize", this.resize.bind(this));

        setTimeout(() => {
            this.app.stage.removeChild(this.container);
        }, 2000);
    }

    resize() {
        const { width} = this.app.renderer;
        this.container.x = width / 2;
        this.container.y = 100;
    }
}
