import { SceneLoader,PointLight, Vector3, StandardMaterial, Color3, Texture } from "@babylonjs/core";
import cristal from "./../assets/CristLaby.glb";
import cristalText from "./../assets/cristal.png";

export class TextureTest {
    constructor(scene) {
        this.scene = scene;
        this.model = null;

    }

    async load() {
        try {
            const result = await SceneLoader.ImportMeshAsync("", cristal, "", this.scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(160, 160, 160);
            this.model.position = new Vector3(0, -300, 0);
            this.model.rotation = new Vector3(0, 0,0);


            const shiny = new StandardMaterial("shiny", this.scene);
            shiny.diffuseColor = new Color3(1, 1, 1);
            shiny.emissiveColor = new Color3(1, 1, 1); 
            shiny.specularColor = new Color3(1, 1, 1);
            shiny.specularPower = 64; // Augmente la brillance
            shiny.diffuseTexture = new Texture(cristalText, this.scene);
            shiny.diffuseTexture.uScale = 5;
            shiny.diffuseTexture.vScale = 5;
            shiny.diffuseTexture.hasAlpha = true; // Si le texture a un canal alpha
            result.meshes.forEach(mesh => {
                mesh.material = shiny;

            });


            const pointLight = new PointLight("sphereLight", this.model.position, this.scene);
            pointLight.diffuse = new Color3(1, 1, 1); 
            pointLight.specular = new Color3(1, 1, 1);
            pointLight.intensity = 1; 
            pointLight.range = 50; 
            pointLight.radius = 50;
            result.pointLight = pointLight;
            //this.applyTexture(texturePath);
        } catch (error) {
            console.error("Error loading model:", error);
        }

    }


}