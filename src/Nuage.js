import { SceneLoader, Vector3 } from "@babylonjs/core";
import Nuage from "./../assets/Nuage.glb";

export class NuageModel {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.Nuagephy = null;
    }

    async loadModel(scene) {
        try {
            const result = await SceneLoader.ImportMeshAsync("", Nuage, "", scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(40, 45, 40);
            this.model.position = new Vector3(-100, 0, 10);
            this.model.rotation = new Vector3(0, Math.PI, 0);

            this.applyTexture("TexNuage.png");

            console.log("Nuages model loaded successfully");
        } catch (error) {
            console.error("Error loading Nuages model:", error);
        }
    }
}