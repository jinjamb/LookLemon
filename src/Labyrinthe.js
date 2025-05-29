import { SceneLoader, Vector3, Color3, PointLight, GlowLayer, StandardMaterial, Texture } from "@babylonjs/core";
import Labyrinthe from "./../assets/labyrinthe/Labyrinthe.glb";
import soleil from "./../assets/labyrinthe/Soleil.glb";
import soleilText from "./../assets/labyrinthe/soleil.png";
import cristalModelViolet from "./../assets/labyrinthe/CristauxViolet.glb";
import cristalModelVert from "./../assets/labyrinthe/CristauxVert.glb";
import cristalViolet from "./../assets/labyrinthe/cristalViolet.png";
import cristalVert from "./../assets/labyrinthe/cristalVert.png";



export class LabyrintheModel {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.Labyrinthephy = null;
    }

    async loadCristaux(position, model, texture) {
        try {
            const result = await SceneLoader.ImportMeshAsync("", model, "", this.scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(160, 160, 160);
            this.model.position = position;
            this.model.rotation = new Vector3(0, Math.PI, 0);


            const shiny = new StandardMaterial("shiny", this.scene);
            shiny.diffuseColor = new Color3(1, 1, 1);
            shiny.emissiveColor = new Color3(1, 1, 1);
            shiny.specularColor = new Color3(1, 1, 1);
            shiny.specularPower = 64; // Augmente la brillance

            shiny.diffuseTexture = new Texture(texture, this.scene);
            shiny.diffuseTexture.uScale = 5;
            shiny.diffuseTexture.vScale = 5;
            shiny.diffuseTexture.hasAlpha = true; // Si le texture a un canal alpha

            const glowLayer = new GlowLayer("glow", this.scene);
            glowLayer.intensity = 0.3; // Ajuste l'intensité de la lueur

            result.meshes.forEach(mesh => {
                mesh.material = shiny;
                glowLayer.addIncludedOnlyMesh(mesh);
            });
        } catch (error) {
            console.error("Error loading model:", error);
        }
    }
    async loadModel(scene) {
        let position = new Vector3(600, -200, 600);
        try {
            const result = await SceneLoader.ImportMeshAsync("", Labyrinthe, "", scene);
            this.model = result.meshes[0];
            result.meshes.forEach((mesh) => {
                mesh.name = "ground";
                mesh.checkCollisions = true;
                this.scene.light.excludedMeshes.push(mesh);
                mesh.checkCollisions = true;
                const groundMat = new StandardMaterial("groundMat", scene);
                groundMat.diffuseColor = new Color3(1, 1, 1); // Blanc, réagit bien à la lumière
                groundMat.specularColor = new Color3(0.5, 0.5, 0.5); // Ajoute un peu de réflexion
                groundMat.emissiveColor = new Color3(0, 0, 0); // Ne brille pas tout seul
                mesh.material = groundMat;
            });
            this.model.scaling = new Vector3(160, 160, 160);
            this.model.position = position;
            this.model.rotation = new Vector3(0, Math.PI, 0);

            this.createLightSphere(position.add(new Vector3(-10, 10, 10)));
            //this.createLightSphere( new Vector3(390,-190,410)); // Position de la sphère de lumière
            this.loadCristaux(position, cristalModelViolet, cristalViolet);
            this.loadCristaux(position, cristalModelVert, cristalVert);

            //console.log("Labyrinthe model loaded successfully");
        } catch (error) {
            console.error("Error loading Labyrinthe model:", error);
        }
    }
    async createLightSphere(positionSoleil) {
        // Créer une sphère
        const result = await SceneLoader.ImportMeshAsync("", soleil, "", this.scene);
        this.model = result.meshes[0];
        this.model.scaling = new Vector3(20, 20, 20);
        this.model.rotation = new Vector3(0, Math.PI/2, 0);
        this.model.position = positionSoleil;

        const shiny = new StandardMaterial("sol", this.scene);
        shiny.diffuseColor = new Color3(1, 1, 1);
        shiny.emissiveColor = new Color3(1, 1, 1);
        shiny.specularColor = new Color3(1, 1, 1);
        shiny.specularPower = 64; // Augmente la brillance

        shiny.diffuseTexture = new Texture(soleilText, this.scene);
        shiny.diffuseTexture.uScale = 5;
        shiny.diffuseTexture.vScale = 5;
        shiny.diffuseTexture.hasAlpha = true; // Si le texture a un canal alpha

        const glowLayer = new GlowLayer("glow", this.scene);
        glowLayer.intensity = 0.5; // Ajuste l'intensité de la lueur

        result.meshes.forEach(mesh => {
            mesh.material = shiny;
            glowLayer.addIncludedOnlyMesh(mesh);
        });

        const pointLight = new PointLight("sphereLight", this.model.position, this.scene);
        pointLight.diffuse = new Color3(1, 1, 1); 
        pointLight.specular = new Color3(1, 1, 1);
        pointLight.intensity = 1; 
        pointLight.range = 50; 
        pointLight.radius = 50;
        this.model.pointLight = pointLight;
    }
}