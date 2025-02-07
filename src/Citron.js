import { SceneLoader, Vector3, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
import Citron from "./../assets/testcitron01.glb";

export class CitronModel {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.citronphy = null;
    }

    async loadModel(scene) {
        try {
            const result = await SceneLoader.ImportMeshAsync("", Citron, "", scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(3, 3, 3);
            this.model.position = new Vector3(0, 0, 3);
            this.model.rotation = new Vector3(0, Math.PI, 0);



            console.log("Citron model loaded successfully");
        } catch (error) {
            console.error("Error loading citron model:", error);
        }
    }
}