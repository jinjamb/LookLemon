import { SceneLoader, Engine, Scene, ShadowGenerator, FreeCamera, HemisphericLight, MeshBuilder, Color3, Vector3, PhysicsShapeType, PhysicsAggregate, HavokPlugin, StandardMaterial, Texture, DirectionalLight } from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";
import Map from "./../assets/heightMap2.png";
//import {Inspector} from "@babylonjs/inspector";
import 'babylonjs-inspector';
import "@babylonjs/loaders/glTF";

import {CitronModel} from "./Citron.js"
import {ArbreModel} from "./Arbre.js"

let canvas = document.getElementById("maCanvas");
let engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
globalThis.HK = await HavokPhysics();
let forceDirection;
let spherePhysics;
let sphere;


const createScene = async function () {


    const scene = new Scene(engine);
    scene.debugLayer.show();
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    const havokInst = await HavokPhysics();
    const physics = new HavokPlugin(true, havokInst);
    scene.enablePhysics(new Vector3(0, -9.81, 0), physics);
    //const ground = MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, scene);

    const ground = MeshBuilder.CreateGroundFromHeightMap("gdhm", Map,{width:500, height :500, subdivisions: 50, maxHeight: 40}, scene); //scene is optional and defaults to the current scene


    ground.position = new Vector3(0, -15, 0);

    let groundPhysics;
    ground.onMeshReadyObservable.add(() => {
        groundPhysics = new PhysicsAggregate(ground, PhysicsShapeType.MESH, { mass: 0 }, scene);
    });
    

    const citron = new CitronModel();
    citron.loadModel(scene);

    const arbre = new ArbreModel();
    arbre.loadModel(scene);



    //create a camera
    const camera = new FreeCamera("camera", new Vector3(-100, 10, 0), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    // Create sphere with physics
    sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
    sphere.position.y = 10;
    spherePhysics = new PhysicsAggregate(sphere, PhysicsShapeType.SPHERE, { mass: 1 }, scene);

    // Variables to track the current force
    forceDirection = new Vector3(0, 0, 0);

    // Add keyboard controls
    window.addEventListener("keydown", (event) => {
        const forceMagnitude = 40;
        switch (event.key) {
            case "w":
                forceDirection.z = forceMagnitude;
                break;
            case "s":
                forceDirection.z = -forceMagnitude;
                break;
            case "a":
                forceDirection.x = -forceMagnitude;
                break;
            case "d":
                forceDirection.x = forceMagnitude;
                break;
        }
    });

    window.addEventListener("keyup", (event) => {
        switch (event.key) {
            case "w":
            case "s":
                forceDirection.z = 0;
                spherePhysics.body.setLinearVelocity(Vector3.Zero());
                break;
            case "a":
            case "d":
                
                forceDirection.x = 0;
                spherePhysics.body.setLinearVelocity(Vector3.Zero());
                break;

        }
    });
    window.addEventListener("keydown", (ev) => {
        // I est apuiller
        if (ev.keyCode === 73) {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else {
                scene.debugLayer.show();
            }
        }
    });



    return scene;


};

createScene().then((scene) => {
    engine.runRenderLoop(function () {
        if (scene) {
            if (forceDirection.length() > 0) {
                spherePhysics.body.applyForce(forceDirection, sphere.getAbsolutePosition());
            }
            scene.render();
        }
    });
});

window.addEventListener("resize", function () {
    engine.resize();
});