import { SceneLoader, Vector3, StandardMaterial, Texture } from "@babylonjs/core";
import TestShad from "./../assets/testTexture.glb";
import grass from "./../assets/grass.jpg";

export class TextureTest {
    constructor(scene) {
        this.scene = scene;
        this.model = null;

    }

    async load() {
        let model = await SceneLoader.ImportMeshAsync(null, TestShad, "", this.scene);
        let material = new StandardMaterial("material", this.scene);
        material.diffuseTexture = new Texture(grass, this.scene);

        material.diffuseTexture.uScale = 10;
        material.diffuseTexture.vScale = 10;
        model.meshes.forEach(mesh => {
            mesh.material = material;
        });
        model.meshes[0].position = new Vector3(100, 70, 0);
        model.meshes[0].scaling = new Vector3(50, 50, 50);
    }


}