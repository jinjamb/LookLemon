import { SceneLoader,SpotLight, Engine, Scene, ShadowGenerator, ArcRotateCamera, HemisphericLight, MeshBuilder, Color3, Vector3, PhysicsShapeType, PhysicsAggregate, HavokPlugin, StandardMaterial, Texture, DirectionalLight } from "@babylonjs/core";
//import HavokPhysics from "@babylonjs/havok";
//import Map from "./../assets/heightMap2.png";
//import {Inspector} from "@babylonjs/inspector";
import 'babylonjs-inspector';
import "@babylonjs/loaders/glTF";

import { CitronModel } from "./Citron.js"
import { ArbreModel } from "./Arbre.js"
import Map from "./../assets/mapSimple.glb"
import Map2 from "./../assets/mapV0.2.glb"

let canvas = document.getElementById("maCanvas");
let engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
//globalThis.HK = await HavokPhysics();
let forceDirection;
let camera;
let sphere;

let boxes;
let keypress = {};
let lemon;
let ground;
const createScene = async function () {

    const scene = new Scene(engine);
    scene.debugLayer.show();
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    ground = await SceneLoader.ImportMeshAsync("", Map, "", scene).then((result) => {
        var ground = result.meshes[0];
        result.meshes.forEach((mesh) => {
            mesh.name = "ground";
            mesh.checkCollisions = true; 
            const groundMat = new StandardMaterial("groundMat", scene);
            groundMat.diffuseColor = new Color3(1, 1, 1); // Blanc, réagit bien à la lumière
            groundMat.specularColor = new Color3(0.5, 0.5, 0.5); // Ajoute un peu de réflexion
            groundMat.emissiveColor = new Color3(0, 0, 0); // Ne brille pas tout seul
            mesh.material = groundMat;
        });
        ground.scaling = new Vector3(15, 15, 15);
        ground.position = new Vector3(0, 0, 0);
        
    });
    
    //creating a spotlight
    let spotLight = new SpotLight(
        "spotLight",
        new Vector3(0, 5, 0), // Position (au-dessus du personnage)
        new Vector3(0, -1, 0), // Direction (vers le bas)
        Math.PI / 2, // Angle d'ouverture du faisceau (ajuster pour changer la taille du cercle)
        1, // Atténuation (plus la valeur est grande, plus la lumière s'atténue rapidement)
        scene
    );
    spotLight.range = 100; // Portée de la lumière

    // Couleur de la lumière
    spotLight.diffuse = new Color3(1, 1, 1); // Lumière légèrement jaune
    spotLight.specular = new Color3(1, 1, 1);

    const citron = new CitronModel();
    const citronMesh = await citron.loadModel(scene);

    const arbre = new ArbreModel();
    arbre.loadModel(scene);

    // Add a skybox 

    // Create sphere with physics
    lemon = citron.getMesh();
    
    // Meshes for the collisions around the sphere
    //box = MeshBuilder.CreateBox("box", { width: 10, height: 10, depth: 1 }, scene);
    //box.position.y = 5;

    sphere.position.y = 5;

    sphere = MeshBuilder.CreateSphere("sphere", { diameter: 10 }, scene);
    
    // Meshes for the collisions around the sphere
    boxes = [];
    boxes["left"] = MeshBuilder.CreateBox("box_left", { width: 10, height: 2, depth: 1 }, scene);
    boxes["right"] = MeshBuilder.CreateBox("box_right", { width: 10, height: 10, depth: 1 }, scene);
    boxes["front"] = MeshBuilder.CreateBox("box_front", { width: 1, height: 2, depth: 10 }, scene);
    boxes["back"] = MeshBuilder.CreateBox("box_back", { width: 1, height: 2, depth: 10 }, scene);
    
    for (let box of Object.values(boxes)) {
        //box.isVisible = false;
        box.checkCollisions = true;
        box.position.y = 10;
    };

    boxes["left"].position.z = -5; boxes["right"].position.z = 5;
    boxes["front"].position.x = 5; boxes["back"].position.x = -5;

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

function addVector(vectors_array) {

    let vector = new Vector3(0, 0, 0);

    for (let i = 0; i < vectors_array.length; i++) {
        vector= vector.add(vectors_array[i]);
        console.log(vector);
    }
    return vector;
}
console.log(addVector([new Vector3(-1,0,-1)]).asArray());
console.log(addVector([new Vector3(-1,0,-1), new Vector3(1,0-1)]).asArray());
console.log(addVector([new Vector3(-1,0,-1), new Vector3(1,0-1), new Vector3(-1,0,1)]).asArray());
console.log(addVector([new Vector3(-1,0,-1), new Vector3(1,0-1), new Vector3(-1,0,1), new Vector3(1,0,1)]).asArray());

function changeCitronRotation(sens) {
    let rotation = citron.getRotation();
    rotation.y += sens;
    citron.setRotation(rotation);
}

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

            
            //console.log(chose.name);
            //console.log("proxi:" + "("+proxi_x+","+ proxi_y+","+proxi_z+")");
            sphere.position.y = proxi_y + 5;
            let vectors_array = [];
            
            //truc
            
            if (keypress["KeyW"]) {
                vectors_array.push(new Vector3(-1, 0, -1));} 
            if (keypress["KeyS"]) {
                vectors_array.push(new Vector3(1, 0, 1));} 
            if (keypress["KeyA"]) {
                vectors_array.push(new Vector3(1, 0, -1));} 
            if (keypress["KeyD"]) {
                vectors_array.push(new Vector3(-1, 0, 1));} 
            if (keypress["Space"]) {
                vectors_array.push(new Vector3(0, 1, 0));} 
            if (keypress["ShiftLeft"]) {
                vectors_array.push(new Vector3(0, -1, 0));}
            
            //let vector = addVector(vectors_array);
            vectors_array = [];
            //sphere.moveWithCollisions(vector.scale(1));
            for (let box of Object.values(boxes)) {
                box.position.y = proxi_y + 5;
                box.moveWithCollisions(vector.scale(1));
                box.onCollideObservable.add(() => {
                    console.log("Collision detected");
                });
            }
            scene.render();
        }
    });
});

window.addEventListener("resize", function () {
    engine.resize();
});