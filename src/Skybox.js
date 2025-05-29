import { Mesh,StandardMaterial } from "@babylonjs/core";

//import SkyboxTexture from "./../assets/skybox/sky";

export class SkyboxModel {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
    }

    async load() {
        try{
            const skybox = Mesh.CreateBox("skyBox", 5000.0, this.scene);
            const skyboxMaterial = new StandardMaterial("skybox", this.scene);
            skyboxMaterial.backFaceCulling = false;
            //skyboxMaterial.reflectionTexture = new CubeTexture("./assets/skybox/skybox", this.scene);
            skybox.material= skyboxMaterial;
        }catch (error) {
            console.error("Error loading skybox model:", error);
        }
        
    }

}
