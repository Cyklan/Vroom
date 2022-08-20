import "@babylonjs/loaders/glTF"
import { Color4, Engine, HemisphericLight, Mesh, Scene, Vector3 } from "@babylonjs/core";
import { Player } from "./Entity/Player";

export default class App {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;

  constructor() {
    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.clearColor = new Color4(0.42, 0.68, 0.81, 1.0);

    const light = new HemisphericLight("globalLight", Vector3.Up(), this.scene);
    light.intensity = 0.7;

    Mesh.CreateGround("ground", 30, 30, 2, this.scene);

    // this.scene.debugLayer.show({
    //   overlay: true,
    // })

    this.initPlayer();
  }

  async initPlayer() {
    await new Player("player", this.scene).init();
    this.main()
  }

  main = () => {
    const fpsOverlay = document.getElementById("fps");

    this.engine.runRenderLoop(() => {
      this.scene.render();
      fpsOverlay!.innerHTML = "FPS: " + this.engine.getFps().toFixed();
    });
  }
}
