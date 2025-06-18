import { Howl } from "howler";

export class SoundManager {
  music: Howl;
  rotation: Howl;
  win: Howl;
  stop: Howl;

  constructor() {
    this.music = new Howl({
      src: ["/sounds/headsTails/music.mp3"],
      loop: true,
      volume: 0.5,
    });

    this.rotation = new Howl({
      src: ["/sounds/headsTails/rotation.mp3"],
      loop: true,
      volume: 1,
    });

    this.win = new Howl({
      src: ["/sounds/headsTails/win.mp3"],
      volume: 1,
    });

    this.stop = new Howl({
      src: ["/sounds/headsTails/stop.mp3"],
      volume: 1,
    });

    this.music.play();
  }

  playRotation() {
    this.rotation.play();
  }

  stopRotation() {
    this.rotation.stop();
  }

  playWin() {
    this.win.play();
  }

  playStop() {
    this.stop.play();
  }

  stopMusic() {
    this.music.stop();
  }
}
