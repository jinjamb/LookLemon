import HavokPhysics from "@babylonjs/havok";
import { Engine, Scene, Vector3, FreeCamera, HemisphericLight, MeshBuilder, StandardMaterial, Color3, HavokPlugin, PhysicsAggregate, PhysicsShapeType, ArcRotateCamera } from "@babylonjs/core";


let canvas = document.getElementById("maCanvas") as HTMLCanvasElement;
let engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
globalThis.HK = await HavokPhysics();

const createScene = async function () {
  const scene = new Scene(engine);


  // Create a static camera
  const camera = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 20, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);

  // Create a light
  const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  //physics
  //const havokInstance = await HavokPhysics();
  const physics = new HavokPlugin(true);
  scene.enablePhysics(new Vector3(0, -9.81, 0), physics);

  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 },scene);
  const groundPhysics = new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, scene);
  return scene;
}

createScene().then((scene) => {
  engine.runRenderLoop(function () {
    if (scene) {
      scene.render();
    }
  });
});

window.addEventListener("resize", function () {
  engine.resize();
});