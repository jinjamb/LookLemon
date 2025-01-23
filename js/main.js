
let canvas;
let engine;
let scene;
let camera;

window.onload = startGame;

function startGame() {
    canvas = document.querySelector("#myCanvas");
    engine = new BABYLON.Engine(canvas, true);

    scene = createScene();

    //let sphere = scene.getMeshByName("mySphere");

    // main animation loop 60 times/s
    engine.runRenderLoop(() => {
        scene.render();
    });
}


function createPyrm2Max(n){
    for(let u=0; u<n; u++){
        for (let i = 0; i < n-2*u; i++) {
            for (let j = 0; j < n-2*u; j++) {
                let box = BABYLON.MeshBuilder.CreateBox("myBox", {size: 2}, scene);
                box.position.y = u * 2;
                box.position.x = i * 2+u*2;
                box.position.z = j * 2+u*2;
                let groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
                groundMaterial.diffuseTexture = new BABYLON.Texture("textures/terre.jpg", scene);
                // Apply the material to the cube
                box.material = groundMaterial;
            }
        }
    }
}

function createScene() {
    let scene = new BABYLON.Scene(engine);
    
    // background
    scene.clearColor = new BABYLON.Color3(1, 0, 1);
    createPyrm2Max(2);

    
    BABYLON.SceneLoader.Append("models/", "tree.glb", scene, function () {
        console.log("Model loaded successfully!");
    });

    // Create a camera
    camera = new BABYLON.FreeCamera("myCamera", new BABYLON.Vector3(0, 50, -50), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas);
   

    // Create a light
    let light = new BABYLON.HemisphericLight("myLight", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    light.diffuse = new BABYLON.Color3(1, 1, 1);

    return scene;
}

window.addEventListener("resize", () => {
    engine.resize()
});