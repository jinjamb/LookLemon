import { SceneLoader, Engine, Scene, ShadowGenerator, FreeCamera, HemisphericLight, MeshBuilder, Color3, Vector3, PhysicsShapeType, PhysicsAggregate, HavokPlugin, StandardMaterial, Texture, DirectionalLight } from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";
import Citron from "./../assets/testcitron01.glb";
import "@babylonjs/loaders/glTF";

let canvas = document.getElementById("maCanvas");
let engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
globalThis.HK = await HavokPhysics();

const createScene = async function () {
    const scene = new Scene(engine);

    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const havokInst = await HavokPhysics();
    const physics = new HavokPlugin(true, havokInst);
    scene.enablePhysics(new Vector3(0, -9.81, 0), physics);
    const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
    ground.position = new Vector3(0, -15, 0);

    let groundPhysics;
    ground.onMeshReadyObservable.add(() => {
        groundPhysics = new PhysicsAggregate(ground, PhysicsShapeType.MESH, { mass: 0 }, scene);
    });
    //create a sphere
    // Load the .glb model and replace the sphere

    const result = await SceneLoader.ImportMeshAsync("", Citron, "", scene);
    const model = result.meshes[0];
    model.scaling = new Vector3(3, 3, 3);

    model.position = new Vector3(0, 0, 3);
    result.rotation = new Vector3(0, Math.PI, 0);
    // Apply physics to the model
    
    let citronphy;
    model.onMeshReadyObservable.add(() => {
        citronphy = new PhysicsAggregate(model, PhysicsShapeType.BOX, { mass: 0 }, scene);
    });

    //create a camera
    const camera = new FreeCamera("camera", new Vector3(-100, 10, 0), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);
    return scene;


};

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