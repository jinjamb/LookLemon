import { Ray,SceneLoader,SpotLight, Sound, Engine, Scene, ShadowGenerator, ArcRotateCamera, HemisphericLight, MeshBuilder, Color3, Vector3, PhysicsShapeType, PhysicsAggregate, HavokPlugin, StandardMaterial, Texture, DirectionalLight, Vector4 } from "@babylonjs/core";
//import HavokPhysics from "@babylonjs/havok";
//import Map from "./../assets/heightMap2.png";
//import {Inspector} from "@babylonjs/inspector";
import 'babylonjs-inspector';
import "@babylonjs/loaders/glTF";


import { CitronModel } from "./Citron.js"
import { MapLoader } from "./MapLoader.js"

import { Pnj } from "./Pnj.js";
import { Music } from "./Music.js";
import BubbleGum from "../assets/sounds/music/BubbleGum.mp3";
import HowSweet from "../assets/sounds/music/HowSweet.mp3";

import Map from "./../assets/Sol.glb"
import text from "./../assets/texture.png"

let canvas = document.getElementById("maCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
//globalThis.HK = await HavokPhysics();
let camera;
let spotLight;
let forceDirection;
let keypress = {};

let clickSound;
let walkSound;
let backgroundMusicMenu;
let backgroundMusicGame;

let sphere;
let lemon;


let jumpPad;
let jumping = false;

function spawnCitron(lemon, position, rotation) {
    if (!lemon) {
        console.error("Le citron n'est pas initialisé!");
        return;
    }

    lemon.position.x = position.x;
    lemon.position.y = position.y;
    lemon.position.z = position.z;
        
    lemon.rotation.x = rotation.x;
    lemon.rotation.y = rotation.y;
    lemon.rotation.z = rotation.z;
        
    jumping = false;
    if (jumpPad) {
        jumpPad.position.y = -100;
    }
}

const createScene = async function () {

    const scene = new Scene(engine);
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    scene.light = light;
    
    clickSound = new Sound("click", "../assets/sounds/effect/Interact.mp3", scene, null, { 
        loop: false, 
        autoplay: false,
        volume: 0.5,});
    
    walkSound = new Sound("walk", "../assets/sounds/effect/FootGrass.mp3", scene, null, {
        loop: false, 
        autoplay: false,
        volume: 0.5,});

    
    backgroundMusicGame = new Sound("backgroundMusicGame", "./../assets/sounds/music/HowSweet.mp3", scene, null,
        { 
            loop: true, 
            autoplay: false,
            volume: 0.5,});

    backgroundMusicMenu = new Music(BubbleGum);
    backgroundMusicMenu.setVolume(0.8);
    backgroundMusicMenu.playMusic();

    backgroundMusicGame = new Music(HowSweet);
    backgroundMusicGame.setVolume(0.5);

    ground = await SceneLoader.ImportMeshAsync("", Map, "", scene).then((result) => {
        var ground = result.meshes[0];
        result.meshes.forEach((mesh) => {
            mesh.scaling = new Vector3(7, 7, 7);
            mesh.name = "ground";
            mesh.checkCollisions = true;
            
        });
        ground.scaling = new Vector3(15, 15, 15);
        ground.position = new Vector3(0, 0, 0);
    });
    
    //creating a spotlight
    spotLight = new SpotLight(
        "spotLight",
        new Vector3(0, 5, 0), // Position (au-dessus du personnage)
        new Vector3(0, -1, 0), // Direction (vers le bas)
        Math.PI / 6, // Angle d'ouverture du faisceau (ajuster pour changer la taille du cercle)
        1, // Atténuation (plus la valeur est grande, plus la lumière s'atténue rapidement)
        scene
    );
    spotLight.range = 200; // Portée de la lumière

    // Couleur de la lumière
    spotLight.diffuse = new Color3(1, 1, 1); // Lumière légèrement jaune
    spotLight.specular = new Color3(1, 1, 1);
    spotLight.intensity = 1; // Intensité de la lumière
    
    const citron = new CitronModel();
    const citronMesh = await citron.loadModel(scene);


    new MapLoader(scene).load(); // Load the map

    const pnj1 = new Pnj(scene);
    await pnj1.loadPnj(scene);
    pnj1.model.position = new Vector3(10, 50, 0);
    



    // Create lemon with physics
    lemon = citron.getMesh();
    let position = new Vector3(0, 55, 0);
    let rotation = new Vector3(0, -10, 0);
    spawnCitron(lemon, position, rotation);

    window.gameCitron = citron;
    scene.player = lemon;
    sphere = MeshBuilder.CreateSphere("sphere", { diameter: 3 }, scene);
    
    //"jump" collision
    jumpPad = MeshBuilder.CreateBox("ground", { width: 15, height: 0.5, depth: 15 }, scene)
    jumpPad.position.y = -100
    
    const jumpPadMaterial = new StandardMaterial("jumpPadMaterial", scene);

    jumpPadMaterial.diffuseTexture = new Texture("textures/transparentTexture.png", scene);
    jumpPadMaterial.diffuseTexture.hasAlpha = true;
    jumpPadMaterial.alpha = 0.5; // Ajustez la transparence (0 = complètement transparent, 1 = opaque)
    jumpPad.material = jumpPadMaterial;

    //create a camera
    camera = new ArcRotateCamera("camera1", Math.PI / 4, Math.PI / 3, 40, lemon.position, scene);
    camera.attachControl(canvas, true);
    camera.radius = 120 //distance from the lemon;

    // Variables to track the current force
    forceDirection = new Vector3(0, 0, 0);

    // Add keyboard controls
    window.addEventListener("keydown", (event) => {
        keypress[event.code] = true;

        switch (event.code) {
            case "KeyI":
                if (playing){
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
                break;}
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
    }
    return vector;
}

let playing = false;

document.getElementById("playbutton").addEventListener("click", function (e) {
    playing = !playing;
    document.getElementById("buttons").style.display = playing ? 'none' : 'flex';
    if (playing) {
        backgroundMusicMenu.stopMusic();
        backgroundMusicGame.playMusic();
    } else {
        backgroundMusicGame.stopMusic();
        backgroundMusicMenu.playMusic();
    }
});

window.addEventListener('load', () => {
    document.getElementById("buttons").style.display = 'flex'
    document.getElementById("loading").style.display = 'none'
});


createScene().then((scene) => {

    let jumpY=0;
    let groundCollision = {ray:null, point:0, lastY:lemon.position.y};
    let sideCollision = {
        topLeft:{ray:null, dist:new Vector3(0,0,0)} ,
        topRight:{ray:null, dist:new Vector3(0,0,0)},
        botRight:{ray:null, dist:new Vector3(0,0,0)},
        botLeft:{ray:null, dist:new Vector3(0,0,0)}
    };
    let delay = 0;

    let position = new Vector3(0, 60, 0);
    let rotation = new Vector3(0, Math.PI/2, 0);

    engine.runRenderLoop(function () {
        if (!playing) {}
        else if (scene) {
            console.log("Pos:", lemon.position.x, lemon.position.y, lemon.position.z);
            camera.target = lemon.position
            let origin = new Vector3(lemon.position.x, lemon.position.y, lemon.position.z); 
            spotLight.position = new Vector3(lemon.position.x,lemon.position.y +100, lemon.position.z);
            try {
                groundCollision.ray = new Ray(origin, new Vector3(0, -1, 0), 100);
                groundCollision.point = scene.pickWithRay(groundCollision.ray, (mesh) => { 
                    return(mesh.name === "ground"); 
                }).pickedPoint.y
            } catch(e) { groundCollision.point = lemon.position.y -7; }

            //bottom right collisions
            try {
                sideCollision.botRight.ray = new Ray(origin, new Vector3(0, 0, 1), 1);
                sideCollision.botRight.dist = scene.pickWithRay(sideCollision.botRight.ray, (mesh) => { 
                    return(mesh.name === "ground"); 
                }).pickedPoint
            }  catch(e){ sideCollision.botRight.point = null }
            //top left 
            try {
                sideCollision.topLeft.ray = new Ray(origin, new Vector3(0, 0, -1), 1);
                sideCollision.topLeft.dist = scene.pickWithRay(sideCollision.topLeft.ray, (mesh) => { 
                    return(mesh.name === "ground"); 
                }).pickedPoint
            } catch(e){ sideCollision.topLeft.point = null }
            //bottom left
            try {
                sideCollision.botLeft.ray = new Ray(origin, new Vector3(1, 0, 0), 1);
                sideCollision.botLeft.dist = scene.pickWithRay(sideCollision.botLeft.ray, (mesh) => { 
                    return(mesh.name === "ground"); 
                }).pickedPoint
            } catch(e){ sideCollision.botLeft.point = null }
            //top right
            try {
                sideCollision.topRight.ray = new Ray(origin, new Vector3(-1, 0, 0), 1);
                sideCollision.topRight.dist = scene.pickWithRay(sideCollision.topRight.ray, (mesh) => { 
                    return(mesh.name === "ground"); 
                }).pickedPoint
            } catch(e){ sideCollision.botRight.point = null }

            if (lemon.position.y - groundCollision.point > 5){
                groundCollision.point = lemon.position.y -5.5
            }
        
            lemon.position.y = groundCollision.point + 1;
                        
            // mouvements 
            let vectors_array = [];
            if (keypress["KeyW"] && !keypress["KeyS"]) {
                vectors_array.push(new Vector3(-1,0,-1));
                gameCitron.runForward();
            } 
            if (keypress["KeyS"] && !keypress["KeyW"]) {
                gameCitron.changeCitronRotation(rotation);
                vectors_array.push(new Vector3(1, 0, 1));
                gameCitron.runForward();
            }
            if (keypress["KeyA"] && !keypress["KeyD"]) { 
                vectors_array.push(new Vector3(1, 0,-1));
                gameCitron.runForward();
            } 
            if (keypress["KeyD"] && !keypress["KeyA"]) { 
                vectors_array.push(new Vector3(-1,0, 1));
                gameCitron.runForward();
            } 
            if (vectors_array.length === 0) {
                gameCitron.stand();
            }
            if (keypress["KeyT"]) {
                spawnCitron(lemon, position, rotation);
            } //reset position
            if(keypress["KeyU"]){
                spawnCitron(lemon, new Vector3(0, 0, 0), rotation);
            }
            //gestion du saut et du déplacement aérien
            if (jumping){
                if (jumpPad.position.y - jumpY <= 2.5){
                    jumpPad.position.y += 0.2;
                }
                else {
                    jumping = false;
                }
                jumpPad.position.x = lemon.position.x;
                jumpPad.position.z = lemon.position.z
            }
            else {
                if (groundCollision.lastY >= lemon.position.y - 0.001 && groundCollision.lastY <= lemon.position.y + 0.001 ) { // if the lemon is on the ground
                    if (keypress["Space"]) {
                        jumping = true; // we can jump
                        jumpY = groundCollision.point;
                        jumpPad.position.y = jumpY;
                        jumpPad.position.x = lemon.position.x;
                        jumpPad.position.z = lemon.position.z
                    }
                    else {
                        jumpPad.position.y = - 100
                    }
                }
                else { // if we are still up
                    jumpPad.position.y += -0.2
                }
            }

            let vector = addVector(vectors_array);
            if (sideCollision.botRight.dist && vector.z > 0){ vector.z = 0; }
            if (sideCollision.botLeft.dist && vector.x > 0){ vector.x = 0; }
            if (sideCollision.topLeft.dist && vector.z < 0){ vector.z = 0; }
            if (sideCollision.topRight.dist && vector.x < 0){ vector.x = 0; }
            
                      
            // Rotate the lemon to face movement direction
                // Calculate angle based on movement direction
                //Trouver un autre moyen de faire ça
            if (vector.length() > 0.1) {    
                let targetAngle;

                if (keypress["KeyW"] && keypress["KeyA"]) { targetAngle = Math.PI/2; }
                else if (keypress["KeyW"] && keypress["KeyD"]) { targetAngle = Math.PI; }
                else if (keypress["KeyS"] && keypress["KeyA"]) { targetAngle = 0 ; }
                else if (keypress["KeyS"] && keypress["KeyD"]) { targetAngle = -Math.PI/2 ; }

                else if (keypress["KeyA"]) { targetAngle = Math.PI/4 }
                else if (keypress["KeyD"]) { targetAngle = -3*Math.PI/4 }
                else if (keypress["KeyW"]) { targetAngle = 3*Math.PI/4 }
                else if (keypress["KeyS"]) { targetAngle = -Math.PI/4 }

                
                // Set the rotation of the lemon (y-axis rotation for turning left/right)
                // Using a smooth rotation for better visual effect
                const currentRotation = lemon.rotation.y;
                const rotationSpeed = 0.1; 
            
                // Calculate the shortest path to the target angle
                let angleDiff = targetAngle - currentRotation;
                if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
                
                // Apply smooth rotation
                lemon.rotation.y += angleDiff * rotationSpeed;
            }

            if (vectors_array.length === 2) { vector.scale(0.5);}
            lemon.moveWithCollisions(vector.scale(0.1));

            scene.render();
            vectors_array = [];
            delay = (delay + 1) % 10

            // on check l'altitude du le citron pour pas qu'il vole indéfiniment            
            if (delay === 0){
                groundCollision.lastY = lemon.position.y
            }
        }
    });
});

window.addEventListener("resize", function () {
    engine.resize();
});