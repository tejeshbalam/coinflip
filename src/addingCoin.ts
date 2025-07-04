// import { Application, Container , Texture, AnimatedSprite} from "pixi.js";
// import { SoundManager } from "./addingSound";
// import { Socketmanager } from "./socketManager";
// import gsap from "gsap";


// export type CoinResult = "head" | "tail";

// export class Coin{
//     app : Application;
//     coinContainer : Container;
//     coin:AnimatedSprite;
//     onFlipComplete?: (actualResult: CoinResult, userChoice: CoinResult) => void;
//     userChoice: CoinResult = "head";
//     finalFrame : number = 30;
//     frames: Texture[] = [];
//     sound : SoundManager;
//     socket : Socketmanager;

//     constructor(app:Application, sound : SoundManager,socket : Socketmanager){
//         this.app = app;
//         this.sound = sound;
//         this.socket = socket;
//         this.coinContainer = new Container();
//         this.app.stage.addChild(this.coinContainer);

//         this.addCoin(); 
//         this.resize();
//         this.app.renderer.on("resize",this.resize,this);
//     }

//     addCoin() {
//       for (let i = 0; i < 60; i++) {
//           const padded = i.toString().padStart(5, "0");
//           this.frames.push(Texture.from(`coin1_${padded}.png`));
//       }

//       this.coin = new AnimatedSprite(this.frames);
//       this.coin.anchor.set(0.5);
//       this.coin.animationSpeed = 4;
//       this.coin.loop = false;
//       this.coin.scale.set(0.9);

//       // intiall aprroach
//   //  this.coin.onComplete = () => {
//   //       this.sound.stopRotation();
//   //       this.coin.gotoAndStop(this.finalFrame);

//   //       let time = 0;
//   //       const duration = 120;
//   //       const baseScale = 0.9;

//   //       const horizontalRock = () => {
//   //         time++;

//   //         const progress = time / duration;

//   //         const amplitude = 0.05;
//   //         const damping = 6;
//   //         const frequency = 2;

//   //         const offset =
//   //           amplitude *
//   //           Math.exp(-damping * progress) *
//   //           Math.cos(frequency * progress * Math.PI * 2);

//   //         this.coin.scale.x = baseScale + offset;
//   //         this.coin.scale.y = baseScale - offset * 0.2;

//   //         if (time >= duration) {
//   //           this.coin.scale.set(baseScale);
//   //           this.app.ticker.remove(horizontalRock);

//   //           this.sound.playStop();
//   //           const result: CoinResult = this.finalFrame === 30 ? "head" : "tail";
//   //           this.onFlipComplete?.(result, this.userChoice);
//   //         }
//   //       };

//   //       this.app.ticker.add(horizontalRock);
//   //   };

//     // approach two
//     //   this.coin.onComplete = () => {
//     //     this.sound.stopRotation();
//     //     this.coin.gotoAndStop(this.finalFrame);

//     //     const timeline = gsap.timeline({
//     //       onComplete: () => {
//     //         this.coin.rotation = 0;
//     //         this.sound.playStop();

//     //         const result: CoinResult = this.finalFrame === 30 ? "head" : "tail";
//     //         this.onFlipComplete?.(result, this.userChoice);
//     //       },
//     //     });

//     //     timeline.to(this.coin, {
//     //       rotation: 0.3,    
//     //       duration: 0.4,
//     //       ease: "power2.out",
//     //     });

//     //     timeline.to(this.coin, {
//     //       rotation: -0.3,    
//     //       duration: 0.5,
//     //       ease: "power2.out",
//     //     });

//     //     timeline.to(this.coin, {
//     //       rotation: 0.2,
//     //       duration: 0.4,
//     //       ease: "sine.out",
//     //     });

//     //     timeline.to(this.coin, {
//     //       rotation: 0,
//     //       duration: 0.3,
//     //       ease: "sine.out",
//     //     });
//     // };

//     // approach three
//     this.coin.onComplete = () => {
//       this.sound.stopRotation();

//       const center = this.finalFrame;
//       const before = (center - 1 + this.frames.length) % this.frames.length;
//       const after = (center + 1) % this.frames.length;

//       const flipFrames = [
//         this.frames[before],
//         this.frames[center],
//         this.frames[after],
//         this.frames[center],
//       ];

//       this.coin.textures = flipFrames;
//       this.coin.animationSpeed = 0.5;
//       this.coin.loop = false;
//       this.coin.gotoAndPlay(0);

//       const duration = flipFrames.length / this.coin.animationSpeed / 60;

//       gsap.delayedCall(duration, () => {
//         this.coin.textures = this.frames;
//         this.coin.gotoAndStop(center);
//         this.sound.playStop();

//         const result: CoinResult = center === 30 ? "head" : "tail";
//         this.onFlipComplete?.(result, this.userChoice);
//       });
// };

//     this.coinContainer.addChild(this.coin);
//   }


//     flip(choice: CoinResult) {
//         this.coin.animationSpeed = 4;
//         this.userChoice = choice;
//         //this.finalFrame = Math.random() < 0.5 ? 30 : 0;
//         this.finalFrame = 30;

//         const spinFrames : Texture [] = [];
//         const spins = 7;
                
//         for (let i=0; i<spins;i++){
//             spinFrames.push(...this.frames);
//         }

//         spinFrames.push(this.frames[this.finalFrame]);

//         this.coin.textures = spinFrames;
//         this.coin.gotoAndPlay(0);
//         this.sound.playRotation();

//   }
    
//     resize(){
//         const {width,height} = this.app.renderer;

//         this.coinContainer.x = width*0.5;
//         this.coinContainer.y = height*0.5;

//         const baseWidth = 1400;
//         const scale = Math.max(0.3,(width/baseWidth)*0.9);
//         this.coinContainer.scale.set(scale);
//     }
// }

import { Application, Container , Texture, AnimatedSprite} from "pixi.js";
import { SoundManager } from "./addingSound";
import { Socketmanager } from "./socketManager";
import gsap from "gsap";

export type CoinResult = 0 | 1;

export class Coin {
    app: Application;
    coinContainer: Container;
    coin: AnimatedSprite;
    onFlipComplete?: (actualResult: CoinResult, userChoice: CoinResult) => void;
    userChoice: CoinResult;
    finalFrame: number = 30;
    frames: Texture[] = [];
    sound: SoundManager;
    socket: Socketmanager;
    private isFlipping: boolean = false;

    constructor(app: Application, sound: SoundManager, socket: Socketmanager) {
        this.app = app;
        this.sound = sound;
        this.socket = socket;
        this.coinContainer = new Container();
        this.app.stage.addChild(this.coinContainer);

        this.addCoin();
        this.resize();
        this.app.renderer.on("resize", this.resize, this);
    }

    addCoin() {
        for (let i = 0; i < 60; i++) {
            const padded = i.toString().padStart(5, "0");
            this.frames.push(Texture.from(`coin1_${padded}.png`));
        }

        this.coin = new AnimatedSprite(this.frames);
        this.coin.anchor.set(0.5);
        this.coin.animationSpeed = 4;
        this.coin.loop = false;
        this.coin.scale.set(0.9);

        this.coin.onComplete = () => {
            if (!this.isFlipping) return;

            const center = this.finalFrame;
            const before = (center - 1 + this.frames.length) % this.frames.length;
            const after = (center + 1) % this.frames.length;

            const flipFrames = [
                this.frames[before],
                this.frames[center],
                this.frames[after],
                this.frames[center],
            ];

            this.coin.textures = flipFrames;
            this.coin.animationSpeed = 0.5;
            this.coin.loop = false;
            this.coin.gotoAndPlay(0);

            const duration = flipFrames.length / this.coin.animationSpeed / 60;
            const result: CoinResult = center === 30 ? 1 : 0;

            const completeOnce = () => {
                if (!this.isFlipping) return;
                this.isFlipping = false;
                this.coin.textures = this.frames;
                this.coin.gotoAndStop(center);
                this.sound.playStop();
                this.sound.stopRotation();

                if (this.onFlipComplete) {
                    const callback = this.onFlipComplete;
                    this.onFlipComplete = undefined;
                    callback(result, this.userChoice);
                }
            };

            gsap.delayedCall(duration, completeOnce);
        };

        this.coinContainer.addChild(this.coin);
    }

    flip(choice: CoinResult) {
        if (this.isFlipping) return;
        this.isFlipping = true;
        this.coin.animationSpeed = 4;
        this.userChoice = choice;

       // this.finalFrame = Math.random() < 0.5 ? 30 : 0;
        
        this.socket.socket.on("result",() => {
            
        })

        this.finalFrame  = 30;
        const spinFrames: Texture[] = [];
        const spins = 7;

        for (let i = 0; i < spins; i++) {
            spinFrames.push(...this.frames);
        }

        spinFrames.push(this.frames[this.finalFrame]);

        this.coin.textures = spinFrames;
        this.coin.gotoAndPlay(0);
        this.sound.playRotation();
    }

    resize() {
        const { width, height } = this.app.renderer;

        this.coinContainer.x = width * 0.5;
        this.coinContainer.y = height * 0.5;

        const baseWidth = 1400;
        const scale = Math.max(0.3, (width / baseWidth) * 0.9);
        this.coinContainer.scale.set(scale);
    }
}
