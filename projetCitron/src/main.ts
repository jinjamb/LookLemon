import { Engine, Scene, Vector3, HemisphericLight, FreeCamera, MeshBuilder } from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";

async function createScene(canvas: HTMLCanvasElement) {
    // Initialisation Babylon.js
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    // Ajout d'une caméra
    const camera = new FreeCamera("camera", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    // Lumière
    new HemisphericLight("light", new Vector3(0, 1, 0), scene);


    // Boucle de rendu
    engine.runRenderLoop(() => {
        scene.render();
    });

    // Redimensionnement de la fenêtre
    window.addEventListener("resize", () => {
        engine.resize();
    });
}

// Exécuter la scène
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
createScene(canvas);
