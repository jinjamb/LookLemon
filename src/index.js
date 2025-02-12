import { SceneLoader, Engine, Scene,ArcRotateCamera, ShadowGenerator, FreeCamera, HemisphericLight, MeshBuilder, Color3, Vector3, PhysicsShapeType, PhysicsAggregate, HavokPlugin, StandardMaterial, Texture, DirectionalLight } from "@babylonjs/core";
//import HavokPhysics from "@babylonjs/havok";
//import Map from "./../assets/heightMap2.png";
//import {Inspector} from "@babylonjs/inspector";
import 'babylonjs-inspector';
import "@babylonjs/loaders/glTF";

import { CitronModel } from "./Citron.js"
import { ArbreModel } from "./Arbre.js"
import Map from "./../assets/mapSimple.glb"

let canvas = document.getElementById("maCanvas");
let engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
//globalThis.HK = await HavokPhysics();
let forceDirection;
let spherePhysics;
let sphere;
let keypress = {};
let camera;
const createScene = async function () {


    const scene = new Scene(engine);
    scene.debugLayer.show();
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    //const havokInst = await HavokPhysics();
    //const physics = new HavokPlugin(true, havokInst);
    //scene.enablePhysics(new Vector3(0, -9.81, 0), physics);
    //const ground = MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, scene);

    //const ground = MeshBuilder.CreateGroundFromHeightMap("gdhm", Map,{width:500, height :500, subdivisions: 50, maxHeight: 40}, scene); //scene is optional and defaults to the current scene
    const ground = await SceneLoader.ImportMeshAsync("", Map, "", scene).then((result) => {
        var ground = result.meshes[0];
        ground.scaling = new Vector3(10, 10, 10);
        ground.position = new Vector3(0, -15, 0);
        result.meshes.forEach(element => {
            element.checkCollisions = true;
        });
        //ground.physicsImpostor = new PhysicsAggregate(ground, PhysicsShapeType.MESH, { mass: 0 }, scene);
    });

    //ground.position = new Vector3(0, -15, 0);

    // let groundPhysics;
    // ground.onMeshReadyObservable.add(() => {
    //     groundPhysics = new PhysicsAggregate(ground, PhysicsShapeType.MESH, { mass: 0 }, scene);
    // });


    const citron = new CitronModel();
    citron.loadModel(scene);

    const arbre = new ArbreModel();
    arbre.loadModel(scene);


    // Create sphere with physics
    sphere = MeshBuilder.CreateSphere("sphere", { diameter: 3 }, scene);
    sphere.position.y = 7;
    sphere.checkCollisions = true;
    let sphereMin = sphere.getBoundingInfo().boundingBox.minimum;
    let sphereMax = sphere.getBoundingInfo().boundingBox.maximum;
    let newMin = BABYLON.Vector3.Minimize(sphereMin, sphereMin);
    let newMax = BABYLON.Vector3.Maximize(sphereMax, sphereMax);
    newMax = newMax.add(new BABYLON.Vector3(1, 1, 1));
    newMin = newMin.subtract(new BABYLON.Vector3(1, 1, 1));
    console.log("sphere: " , (sphereMin, sphereMax))
    console.log("new: " , (newMin, newMax));
    sphere.setBoundingInfo(new BABYLON.BoundingInfo(newMax, newMin));

    //create a camera
    camera = new ArcRotateCamera("camera1", Math.PI / 4, Math.PI / 3, 40, sphere.position, scene);
    camera.attachControl(canvas, true);

    // Add a skybox 

    //spherePhysics = new PhysicsAggregate(sphere, PhysicsShapeType.SPHERE, { mass: 0 }, scene);
    //spherePhysics.body.setLinearDamping(1);
    // Variables to track the current force
    forceDirection = new Vector3(0, 0, 0);

    // Add keyboard controls
    window.addEventListener("keydown", (event) => {
        keypress[event.code] = true;

        switch (event.code) {
            case "KeyI":
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
                break;
        }
    });
    window.addEventListener("keyup", (event) => {
        keypress[event.code] = false;
    });
    return scene;

};

createScene().then((scene) => {
    engine.runRenderLoop(function () {
        
        if (scene) {
            camera.target = sphere.position;
            //sphere.moveWithCollisions(new Vector3(0, -0.1, 0));
            scene.meshes.forEach(mesh => {
                if (mesh !== sphere && sphere.intersectsMesh(mesh, false)) {
                    //sphere.moveWithCollisions(new Vector3(0, 0.3, 0));
                }
            });
            //truc  
            if (keypress["KeyW"] && keypress["KeyA"]) {
                sphere.moveWithCollisions(new Vector3(0, 0, -1).scale(1));
            } else if (keypress["KeyW"] && keypress["KeyD"]) {
                sphere.moveWithCollisions(new Vector3(-1, 0, 0).scale(1));
            } else if (keypress["KeyS"] && keypress["KeyA"]) {
                sphere.moveWithCollisions(new Vector3(1, 0, 0).scale(1));
            } else if (keypress["KeyS"] && keypress["KeyD"]) {
                sphere.moveWithCollisions(new Vector3(0, 0, 1).scale(1));
            } else
            if (keypress["KeyW"]) {
                sphere.moveWithCollisions(new Vector3(-1, 0, -1).scale(1));
            } else if (keypress["KeyS"]) {
                sphere.moveWithCollisions(new Vector3(1, 0, 1).scale(1));
            } else if (keypress["KeyA"]) {
                sphere.moveWithCollisions(new Vector3(1, 0, -1).scale(1));
            } else if (keypress["KeyD"]) {
                sphere.moveWithCollisions(new Vector3(-1, 0, 1).scale(1));
            }else if (keypress["Space"]) {
                sphere.moveWithCollisions(new Vector3(0, 1, 0).scale(1));
            }else if (keypress["ShiftLeft"]) {
                sphere.moveWithCollisions(new Vector3(0, -1, 0).scale(1));
            }

            scene.render();
        }
    });
});

window.addEventListener("resize", function () {
    engine.resize();
});