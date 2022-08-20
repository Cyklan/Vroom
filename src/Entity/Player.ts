import {
  AbstractMesh,
  Scene,
  TransformNode,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";
import { AssetImporter } from "../Assets/AssetImporter";

export class Player extends TransformNode {
  scene: Scene;
  playerMesh!: AbstractMesh;
  cameraRoot!: TransformNode;
  yTilt!: TransformNode;
  camera!: UniversalCamera;

  constructor(name: string, scene: Scene) {
    super(name);
    this.scene = scene;
  }

  init = async () => {
    this.scene.getEngine().displayLoadingUI();
    await this.initPlayer();
    this.initCamera();
    this.scene.getEngine().hideLoadingUI();
  };

  initPlayer = async () => {
    const playerMesh = await AssetImporter.Cars.firetruck();
    playerMesh.parent = this;
    playerMesh.rotate(Vector3.Up(), -Math.PI / 4);
    this.playerMesh = playerMesh;
  };

  initCamera = () => {
    this.cameraRoot = new TransformNode("CAMERA_ROOT");
    this.cameraRoot.position = new Vector3(0, 1, 5);
    this.cameraRoot.rotation = new Vector3(0, 0, 0);

    this.yTilt = new TransformNode("yTilt");
    this.yTilt.rotation = new Vector3(-0.4, 0, 0);
    this.yTilt.parent = this.cameraRoot;

    this.camera = new UniversalCamera(
      "camera",
      new Vector3(0, 0, 12),
      this.scene
    );
    this.camera.lockedTarget = this.cameraRoot.position;
    this.camera.fov = 0.47;
    this.camera.parent = this.yTilt;

    this.scene.activeCamera = this.camera;
  };
}
