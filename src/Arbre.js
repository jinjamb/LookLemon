import { SceneLoader, Vector3, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
import Arbre from "./../assets/tree.glb";

export class ArbreModel {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.Arbrephy = null;
    }

    async loadModel(scene) {
        try {
            const result = await SceneLoader.ImportMeshAsync("", Arbre, "", scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(6, 6, 6);
            this.model.position = new Vector3(-40, 10, 10);
            this.model.rotation = new Vector3(0, Math.PI, 0);

            // Apply physics to the model

            console.log("Arbre model loaded successfully");
        } catch (error) {
            console.error("Error loading Arbre model:", error);
        }
    }
}