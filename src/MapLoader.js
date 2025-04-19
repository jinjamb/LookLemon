import { SceneLoader, Vector3,HemisphericLight } from "@babylonjs/core";
//import Nuage from "./../assets/Nuage.glb";
//import Grotte from "./../assets/Grotte.glb";
import Map from "./../assets/Sol.glb"
import {LabyrintheModel} from "./Labyrinthe.js"

export class MapLoader {
    constructor(scene) {
        this.scene = scene;
        this.models = [];
    }

    async load(){
        this.loadGround();
        //this.loadModel(Nuage, new Vector3(40, 45, 40), new Vector3(-100, 0, 10), new Vector3(0, Math.PI, 0));
        //this.loadModel(Grotte, new Vector3(10, 10, 10), new Vector3(0, 0, -100), new Vector3(0, 0, 0));
        new LabyrintheModel(this.scene).loadModel();
    }

    async loadModel(model, scale, position, rotation) {
        try {
            const result = await SceneLoader.ImportMeshAsync("", model, "", this.scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(scale.x, scale.y, scale.z);
            this.model.position = new Vector3(position.x, position.y, position.z);
            this.model.rotation = new Vector3(rotation.x, rotation.y, rotation.z);

            //this.applyTexture(texturePath);
        } catch (error) {
            console.error("Error loading model:", error);
        }
    }
    async loadGround() {
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
        this.scene.light = light;
            
        
        await SceneLoader.ImportMeshAsync("", Map, "", this.scene).then((result) => {
            var ground = result.meshes[0];
            result.meshes.forEach((mesh) => {
                mesh.scaling = new Vector3(7, 7, 7);
                mesh.name = "ground";
                mesh.checkCollisions = true;
                
            });
            ground.scaling = new Vector3(15, 15, 15);
            ground.position = new Vector3(0, 0, 0);
            ground.rotation = new Vector3(0, Math.PI/2, 0);
        });
    
    }
}