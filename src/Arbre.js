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
            this.model.scaling = new Vector3(4, 4, 4);
            this.model.position = new Vector3(0, 0, 3);
            this.model.rotation = new Vector3(0, Math.PI, 0);

            // Apply physics to the model
            this.model.onMeshReadyObservable.add(() => {
                this.Arbrephy = new PhysicsAggregate(this.model, PhysicsShapeType.BOX, { mass: 0 }, this.scene);
            });

            console.log("Arbre model loaded successfully");
        } catch (error) {
            console.error("Error loading Arbre model:", error);
        }
    }
}