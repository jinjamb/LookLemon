import { SceneLoader, Vector3,Color3,PointLight,StandardMaterial,MeshBuilder, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
import Labyrinthe from "./../assets/maze.glb";
import { Sphere } from "cannon";

export class LabyrintheModel {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.Labyrinthephy = null;
    }

    async loadModel(scene) {
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
            this.model.scaling = new Vector3(160, 80, 160);
            this.model.position = new Vector3(0, -90, 0);
            this.model.rotation = new Vector3(0, 0,0);

            this.createLightSphere();
            console.log("Labyrinthe model loaded successfully");
        } catch (error) {
            console.error("Error loading Labyrinthe model:", error);
        }
    }
    createLightSphere() {
        // Créer une sphère
        const sphere = MeshBuilder.CreateSphere("lightSphere", {
            diameter: 20,
            segments: 16
        }, this.scene);
        sphere.position = new Vector3(10, -80, 0); // Position initiale de la sphère
        const sphereMat = new StandardMaterial("sphereMat", this.scene);
        sphereMat.diffuseColor = new Color3(1, 1, 1);
        sphereMat.emissiveColor = new Color3(1, 1, 1); 
        sphereMat.specularColor = new Color3(1, 1, 1);
        sphere.material = sphereMat;

        const pointLight = new PointLight("sphereLight", sphere.position, this.scene);
        pointLight.diffuse = new Color3(1, 1, 1); 
        pointLight.specular = new Color3(1, 1, 1);
        pointLight.intensity = 1; 
        pointLight.range = 50; 
        pointLight.radius = 50;
        sphere.pointLight = pointLight;
    }
}