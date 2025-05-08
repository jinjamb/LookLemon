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
import Interact from "../assets/sounds/effects/Interact.mp3";
import FootGrass from "../assets/sounds/effects/FootGrass.mp3";
import TexVide from "./../assets/vide.png"
//import Map from "./../assets/Sol.glb"
import text from "./../assets/texture.png"

let canvas = document.getElementById("maCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
//globalThis.HK = await HavokPhysics();
let pageLoaded = false
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
let pnj1

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
    scene.missionFeuille = false;
    scene.missionTronc = false;
    
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
            volume: 0.3,
        });

    backgroundMusicMenu = new Music(BubbleGum);
    backgroundMusicMenu.setVolume(0.8);
    backgroundMusicMenu.playMusic();

    backgroundMusicGame = new Music(HowSweet);
    backgroundMusicGame.setVolume(0.3);

    clickSound = new Music(Interact);
    clickSound.audioElement.loop = false;
    clickSound.setVolume(0.5);

    walkSound = new Music(FootGrass);
    walkSound.setVolume(0.5);
    
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

    pnj1 = new Pnj(scene);
    await pnj1.loadPnj(scene);
    pnj1.model.position = new Vector3(-120, 27.25, -70);
    pnj1.model.rotation.y = Math.PI/4

    // Create lemon with physics
    lemon = citron.getMesh();
    let position = new Vector3(100, 42.375, 0);
    let rotation = new Vector3(0, Math.PI, 0);
    spawnCitron(lemon, position, rotation);

    window.gameCitron = citron;
    scene.player = lemon;


    //"jump" collision
    jumpPad = MeshBuilder.CreateBox("ground", { width: 15, height: 0.5, depth: 15 }, scene)
    jumpPad.position.y = -100;
    jumpPad.visibility = false;

    //create a camera
    camera = new ArcRotateCamera("camera1", Math.PI / 4, Math.PI / 3, 40, lemon.position, scene);
    camera.attachControl(canvas, true);
    camera.radius = 120 //distance from the lemon;
    camera.lockedTarget = lemon.position;

    // Variables to track the current force
    forceDirection = new Vector3(0, 0, 0);

    // Add keyboard controls
    window.addEventListener("keydown", (event) => {
        keypress[event.code] = true;
        if (playing){
            let distance = Math.sqrt(Math.pow(lemon.position.x - pnj1.model.position.x, 2) + Math.pow(lemon.position.z - pnj1.model.position.z, 2));
            if (distance < 70){
                if (distance < 40) pnj1.changeclickercolor(new Color3(1, 0, 1), true);
                pnj1.model.lookAt(new Vector3(lemon.position.x, pnj1.model.position.y, lemon.position.z));
            }
            else pnj1.changeclickercolor(new Color3(0, 0, 0), false);
            //console.log(event.code)
            switch (event.code) {
                case "KeyI":
                    if (scene.debugLayer.isVisible()) {
                        scene.debugLayer.hide();
                    } else {
                        scene.debugLayer.show();
                    }
                    break;
                case "Escape":
                    pauseResume()
                    break;
                case "Semicolon":
                    if (pause) {
                        spawnCitron(lemon, position, rotation);
                        pauseResume()
                    }
                    break;
                case "KeyE":

                    if (!pnj1.speaking && !pause && distance < 50) {
                        pnj1.handleDialog()
                        clickSound.playMusic();
                     } // a mettre dans un foreach pour tous les pnjs quand on en aura plusieurs 
                    else {
                        pnj1.endDialog()
                    }
            }
        }
    });
    window.addEventListener("keyup", (event) => {
        keypress[event.code] = false;
    });
    //waiting for everything to be ready before letting the player start the game
    //while (!pageLoaded || !citron.ready || !pnj1.ready ) {}
    document.getElementById("buttons").style.display = 'flex'
    document.getElementById("loading").style.display = 'none'
    backgroundMusicMenu.playMusic();

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
let pause = false;

document.getElementById("playbutton").addEventListener("click", function (e) {
    playing = !playing;
    document.getElementById("buttons").style.display = playing ? 'none' : 'flex';
    document.getElementById("pauseButton").style.display =  playing? 'block' : 'none'
    canvas.style.display = 'block'
    backgroundMusicMenu.stopMusic();
    backgroundMusicGame.playMusic();
});


window.addEventListener('load', () => { pageLoaded = true; });

const pauseButton = document.getElementById("pauseButton")
const pauseMenu = document.getElementById("pauseMenu")

function pauseResume() {
    pause = !pause;
    if (pause) backgroundMusicGame.pauseMusic();
    else backgroundMusicGame.playMusic()
    pauseButton.style.display = pause ? 'none' : 'block'
    pauseMenu.style.display = pause ? 'flex' : 'none'
}

pauseButton.addEventListener("click", () => {pauseResume()})
document.getElementById("resumeButton").addEventListener("click", () => {pauseResume()})
document.getElementById("resetButton").addEventListener("click", () => {
    if (pause) {
        pauseResume();
        spawnCitron(lemon, position, rotation);
    }
})
createScene().then((scene) => {

    let jumpY=0;
    let groundCollision = {ray:null, point:0, lastY:lemon.position.y};
    let sideCollision = {
        topLeft: {ray:null, dist:new Vector3(0,0,0)},
        topRight:{ray:null, dist:new Vector3(0,0,0)},
        botRight:{ray:null, dist:new Vector3(0,0,0)},
        botLeft: {ray:null, dist:new Vector3(0,0,0)}
    };
    let delay = 0;

    let position = new Vector3(0, 60, 0);
    let rotation = new Vector3(0, Math.PI/2, 0);

    engine.runRenderLoop(function () {
        if (!playing) {}
        else if (document.getElementById("dialogue").style.display == 'block'){
            gameCitron.stand();
            scene.render();
        }
        else if (scene && !pause) {
            
            //log pour voir la possition du joueur a tt moment
            //console.log("Pos:", lemon.position.x, lemon.position.y, lemon.position.z);
            camera.target = lemon.position
            let origin = new Vector3(lemon.position.x, lemon.position.y+10, lemon.position.z);
            let sideOrigin = new Vector3(lemon.position.x, lemon.position.y+2, lemon.position.z);
            spotLight.position = new Vector3(lemon.position.x,lemon.position.y +100, lemon.position.z);
            try {
                groundCollision.ray = new Ray(origin, new Vector3(0, -1, 0), 100);
                groundCollision.point = scene.pickWithRay(groundCollision.ray, (mesh) => { 
                    return(mesh.name === "ground"); 
                }).pickedPoint.y
            } catch(e) { groundCollision.point = lemon.position.y -20;}

            //bottom right collisions
            try {
                sideCollision.botRight.ray = new Ray(sideOrigin, new Vector3(0, 0, 1.5), 2.5);
                sideCollision.botRight.dist = scene.pickWithRay(sideCollision.botRight.ray, (mesh) => { 
                    return(mesh.name === "ground");
                }).pickedPoint
            }  catch(e){ sideCollision.botRight.point = null; }
            //top left 
            try {
                sideCollision.topLeft.ray = new Ray(sideOrigin, new Vector3(0, 0, -1.5), 2.5);
                sideCollision.topLeft.dist = scene.pickWithRay(sideCollision.topLeft.ray, (mesh) => { 
                    return(mesh.name === "ground"); 
                }).pickedPoint
            } catch(e){ sideCollision.topLeft.point = null;}
            //bottom left
            try {
                sideCollision.botLeft.ray = new Ray(sideOrigin, new Vector3(1.5, 0, 0), 2.5);
                sideCollision.botLeft.dist = scene.pickWithRay(sideCollision.botLeft.ray, (mesh) => { 
                    return(mesh.name === "ground"); 
                }).pickedPoint
            } catch(e){ sideCollision.botLeft.point = null }
            //top right
            try {
                sideCollision.topRight.ray = new Ray(sideOrigin, new Vector3(-1.5, 0, 0), 2.5);
                sideCollision.topRight.dist = scene.pickWithRay(sideCollision.topRight.ray, (mesh) => { 
                    return(mesh.name === "ground"); 
                }).pickedPoint
            } catch(e){ sideCollision.botRight.point = null }

            if (lemon.position.y - groundCollision.point > 3){
                groundCollision.point = lemon.position.y -3.5
            }
        
            lemon.position.y = groundCollision.point + 3;
                        
            // mouvements 
            let vectors_array = [];
            if (keypress["KeyW"] && !keypress["KeyS"]) {
                walkSound.playMusic();
                vectors_array.push(new Vector3(-1,0,-1));
                gameCitron.runForward();
            } 
            if (keypress["KeyS"] && !keypress["KeyW"]) {
                walkSound.playMusic();
                gameCitron.changeCitronRotation(rotation);
                vectors_array.push(new Vector3(1, 0, 1));
                gameCitron.runForward();
            }
            if (keypress["KeyA"] && !keypress["KeyD"]) {
                walkSound.playMusic(); 
                vectors_array.push(new Vector3(1, 0,-1));
                gameCitron.runForward();
            } 
            if (keypress["KeyD"] && !keypress["KeyA"]) {
                walkSound.playMusic(); 
                vectors_array.push(new Vector3(-1,0, 1));
                gameCitron.runForward();
            } 
            if (vectors_array.length === 0) {
                walkSound.stopMusic();
                gameCitron.stand();
            }
            if (keypress["KeyT"]) {
                spawnCitron(lemon, position, rotation);
            } //reset position
            if (keypress["KeyU"]){
                spawnCitron(lemon, new Vector3(0, 0, 0), rotation);
            }
            //gestion du saut et du déplacement aérien
            if (jumping){
                if (jumpPad.position.y - jumpY <= 5){
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
                        console.log(lemon.position) //pour chopper des coordonnées facilement
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

            if (vectors_array.length >= 2) {vector = vector.scale(0.5);}
            lemon.moveWithCollisions(vector.scale(scene.getAnimationRatio()));

            vectors_array = [];
            delay = (delay + 1) % 10

            // on check l'altitude du le citron pour pas qu'il vole indéfiniment            
            if (delay === 0){
                groundCollision.lastY = lemon.position.y
            }

            //Partie de la tp dans le labyrinthe
            //console.log("Test tp:", lemon.position.x, lemon.position.z ,lemon.position.x < -257 , lemon.position.x > -270 , lemon.position.z > -28 , lemon.position.z < 23 );
            if (lemon.position.y>0 && lemon.position.x < -257 && lemon.position.x > -270 && lemon.position.z > -28 && lemon.position.z < 23){
                //console.log("teleportation");
                lemon.position.x = 290;
                lemon.position.y = -85;
                lemon.position.z = 285;
            }
            if (lemon.position.x<15 && lemon.position.x > 0 && lemon.position.z > -7 && lemon.position.z < 13 && lemon.position.y <0){
                //console.log("teleportation2");
                lemon.position.x = 100;
                lemon.position.y = 42;
                lemon.position.z = 0;
                scene.missionFeuille = true ; 
            }
            
            pnj1.setState([scene.missionTronc? 1:0, scene.missionFeuille? 1:0, 0]);
            scene.render();
        }  
        //console.log(lemon.position)
    });
});

window.addEventListener("resize", function () {
    engine.resize();
});