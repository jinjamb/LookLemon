import { SceneLoader, Vector3, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
import Nuage from "./../assets/Nuage.glb";
import Grotte from "./../assets/Grotte.glb";

export class MapLoader {
    constructor(scene) {
        this.scene = scene;
        this.models = [];
    }

    async load(){
        this.loadModel(Nuage, new Vector3(40, 45, 40), new Vector3(-100, 0, 10), new Vector3(0, Math.PI, 0), "TexNuage.png");
        this.loadModel(Grotte, new Vector3(10, 10, 10), new Vector3(0, 0, -100), new Vector3(0, 0, 0), "TexGrotte.png");
        
    }

    async loadModel(model, scale, position, rotation, texturePath) {
        try {
            const result = await SceneLoader.ImportMeshAsync("", model, "", this.scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(scale.x, scale.y, scale.z);
            this.model.position = new Vector3(position.x, position.y, position.z);
            this.model.rotation = new Vector3(rotation.x, rotation.y, rotation.z);

            this.applyTexture(texturePath);
        } catch (error) {
            console.error("Error loading model:", error);
        }
    }
}