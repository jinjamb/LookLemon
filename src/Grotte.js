import { SceneLoader, Vector3, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
import Grotte from "./../assets/Grotte.glb";

export class GrotteModel {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.Grottephy = null;
    }

    async loadModel(scene) {
        try {
            const result = await SceneLoader.ImportMeshAsync("", Grotte, "", scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(40, 45, 40);
            this.model.position = new Vector3(-100, 0, 10);
            this.model.rotation = new Vector3(0, Math.PI, 0);

            this.applyTexture("TexGrotte.png");

            console.log("Grottes model loaded successfully");
        } catch (error) {
            console.error("Error loading Grottes model:", error);
        }
    }
}