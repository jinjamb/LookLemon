import { SceneLoader, Engine, Scene, ShadowGenerator, ArcRotateCamera, HemisphericLight, MeshBuilder, Color3, Vector3, PhysicsShapeType, PhysicsAggregate, HavokPlugin, StandardMaterial, Texture, DirectionalLight } from "@babylonjs/core";
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
let camera;
let sphere;
let box;
let keypress = {};

const createScene = async function () {

    const scene = new Scene(engine);
    scene.debugLayer.show();
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    let ground = await SceneLoader.ImportMeshAsync("", Map, "", scene).then((result) => {
        var ground = result.meshes[0];
        result.meshes.forEach((mesh) => { mesh.name = "ground"; });
        ground.scaling = new Vector3(10, 10, 10);
        ground.position = new Vector3(0, -15, 0);
    });

    const citron = new CitronModel();
    citron.loadModel(scene);

    const arbre = new ArbreModel();
    arbre.loadModel(scene);

    // Add a skybox 

    // Create sphere with physics
    sphere = MeshBuilder.CreateSphere("sphere", { diameter: 10 }, scene);
    
    // Meshes for the collisions around the sphere
    //box = MeshBuilder.CreateBox("box", { width: 10, height: 10, depth: 1 }, scene);
    //box.position.y = 5;

    sphere.position.y = 5;

    //create a camera
    camera = new ArcRotateCamera("camera1", Math.PI / 4, Math.PI / 3, 40, sphere.position, scene);
    camera.attachControl(canvas, true);
    camera.radius = 120 //distance from the sphere;

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
            let chose
            let old
            camera.target = sphere.position
            
            let origin = new BABYLON.Vector3(sphere.position.x, sphere.position.y, sphere.position.z);
            let ray_y = new BABYLON.Ray(origin, new BABYLON.Vector3(0, -1, 0), 10000);
            let proxi_y = scene.pickWithRay(ray_y, (mesh) => { 
                chose = mesh;
                return(mesh.name === "ground"); 
            }).pickedPoint.y

            let ray_x = new BABYLON.Ray(origin, new BABYLON.Vector3(-1, 0, 0), 10000);
            let proxi_x = scene.pickWithRay(ray_y, (mesh) => { 
                chose = mesh;
                return(mesh.name === "ground"); 
            }).pickedPoint.x
            let ray_z = new BABYLON.Ray(origin, new BABYLON.Vector3(0, 0, -1), 10000);
            let proxi_z = scene.pickWithRay(ray_y, (mesh) => { 
                chose = mesh;
                return(mesh.name === "ground"); 
            }).pickedPoint.z            
    
            //console.log(chose.name);
            //console.log("proxi:" + "("+proxi_x+","+ proxi_y+","+proxi_z+")");
            old = sphere.position.y;
            sphere.position.y = proxi_y + 5;
            //box.position.y = sphere.position.y;
            //box.position.x = sphere.position.x+10;
            //box.position.z = sphere.position.z;
            
            //truc
            let vector = new Vector3(0, 0, 0);
            if (keypress["KeyW"]) {
                vector.add()
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