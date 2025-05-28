import { SceneLoader,PointLight, Vector3, StandardMaterial, Color3, Texture } from "@babylonjs/core";


export class TextureTest {
    constructor(scene) {
        this.scene = scene;
        this.model = null;

    }

    async load() {
        try {
            //const result = await SceneLoader.ImportMeshAsync("", , "", this.scene);

        } catch (error) {
            console.error("Error loading model:", error);
        }

    }


}