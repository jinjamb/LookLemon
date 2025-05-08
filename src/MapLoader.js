import { SceneLoader, Vector3, HemisphericLight, MeshBuilder,StandardMaterial, Texture } from "@babylonjs/core";
import Nuage from "./../assets/nuage.glb";
//import Grotte from "./../assets/Grotte.glb";
import Map from "./../assets/Sol.glb"
import Citerne from "./../assets/citerne.glb"
import grass from "./../assets/grass.jpg";

//import Rocks from "././assets/deco/Rocks.glb";
//import GrassMix from "././assets/deco/GrassMix.glb";
//import GrassPatch from "././assets/deco/GrassPatch.glb";
import { JeuTuyaux } from "./JeuTuyaux.js"
import { LabyrintheModel } from "./Labyrinthe.js"
import { ArbreModel } from "./Arbre.js";
import { SkyboxModel } from "./Skybox.js";
import { TextureTest } from "./TextureTest.js";


export class MapLoader {
    constructor(scene) {
        this.scene = scene;
        this.models = [];
        this.TroncEnCours = true;
        this.FeuilleEnCours = true;
    }

    async load() {
        this.loadGround();
        this.murs();
        //this.loadModel(Nuage, new Vector3(40, 45, 40), new Vector3(-100, 0, 10), new Vector3(0, Math.PI, 0));
        //this.loadModel(Grotte, new Vector3(10, 10, 10), new Vector3(0, 0, -100), new Vector3(0, 0, 0));
        new LabyrintheModel(this.scene).loadModel();
        this.loadModel(Nuage, new Vector3(200, 200, 200), new Vector3(-350, 15, -200), new Vector3(0, 5 / 6 * Math.PI, 0));
        this.loadModel(Nuage, new Vector3(180, 200, 180), new Vector3(-190, 25, -350), new Vector3(0, 4 / 6 * Math.PI, 0));
        this.loadModel(Citerne, new Vector3(150, 150, 150), new Vector3(55, 67, -530), new Vector3(0, Math.PI, 0));
        new JeuTuyaux(this.scene).createFromMatrice(new Vector3(-5, 68, -480)); // load le jeu des tuyaux
        new SkyboxModel(this.scene).load(); // load le skybox
        this.arbreModel = new ArbreModel(this.scene);
        this.arbreModel.load();
        this.setupMissionTroncObserver();
        new TextureTest(this.scene).load();
        //this.loadRandomDeco(10, 10, 10);

    }

    setupMissionTroncObserver() {
        this.scene.onBeforeRenderObservable.add(() => {
            if (this.scene.missionTronc === true && this.arbreModel && this.TroncEnCours) {
                this.arbreModel.troncMarron();
                this.TroncEnCours = false;
            }
            if (this.scene.missionFeuille === true && this.arbreModel && this.FeuilleEnCours) {
                this.arbreModel.feuilleVerte();
                this.FeuilleEnCours = false;
            }
        });
    }
    async murs() {
        this.murInvisible(new Vector3(-350, 50, -190), -Math.PI / 4, 1100);
        this.murInvisible(new Vector3(90, 50, -555), Math.PI / 2, 200);
        this.murInvisible(new Vector3(350, 50, -210), Math.PI / 6, 900);
        this.murInvisible(new Vector3(-210, 50, 173), -4 * Math.PI / 6, 800);
        this.murInvisible(new Vector3(86, 50, 252), Math.PI / 2, 400);
        this.murInvisible(new Vector3(250, 50, 160), -Math.PI / 4, 400);
        this.murInvisible(new Vector3(390, 50, -55), 0, 400);
    }
    async murInvisible(pos, rot, lar) {
        let m1 = MeshBuilder.CreateBox("murInvisible", { height: 180, width: 5, depth: lar }, this.scene);
        m1.position = pos
        m1.rotation = new Vector3(0, rot, 0);
        m1.name = "ground";
        m1.visibility = false;
    }

    async loadRandomDeco(rockCount = 10, grassMixCount = 40, grassPatchCount = 50) {
        const bounds = { minX: -200, maxX: 200, minZ: -200, maxZ: 200 };

        for (let i = 0; i < rockCount; i++) {
            const position = this.getRandomPosition(bounds);
            const scale = this.getRandomScale(2.5, 5);
            const rotation = this.getRandomRotation();

            await this.loadModel(Rocks, scale, position, rotation);
        }
        for (let i = 0; i < grassMixCount; i++) {
            const position = this.getRandomPosition(bounds);
            const scale = this.getRandomScale(2.5, 5);
            const rotation = this.getRandomRotation();

            await this.loadModel(GrassMix, scale, position, rotation);
        }
        for (let i = 0; i < grassPatchCount; i++) {
            const position = this.getRandomPosition(bounds);
            const scale = this.getRandomScale(2.5, 5);
            const rotation = this.getRandomRotation();

            await this.loadModel(GrassPatch, scale, position, rotation);
        }
    }

    getRandomPosition(bounds) {
        const x = Math.random() * (bounds.maxX - bounds.minX) + bounds.minX;
        const z = Math.random() * (bounds.maxZ - bounds.minZ) + bounds.minZ;
        return new Vector3(x, 27, z);
    }

    getRandomScale(min, max) {
        const scale = Math.random() * (max - min) + min;
        return new Vector3(scale, scale, scale);
    }

    getRandomRotation() {
        return new Vector3(0, Math.random() * Math.PI * 2, 0);
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
        light.intensity = 1;
        this.scene.light = light;

        let material = new StandardMaterial("material", this.scene);
        material.diffuseTexture = new Texture(grass, this.scene);

        material.diffuseTexture.uScale = 10;
        material.diffuseTexture.vScale = 10;
        await SceneLoader.ImportMeshAsync("", Map, "", this.scene).then((result) => {
            var ground = result.meshes[0];
            result.meshes.forEach((mesh) => {
                mesh.scaling = new Vector3(7, 7, 7);
                mesh.name = "ground";
                mesh.checkCollisions = true;
                //mesh.material = material;
 
            });
            ground.scaling = new Vector3(15, 15, 15);
            ground.position = new Vector3(0, 0, 0);
            ground.rotation = new Vector3(0, Math.PI / 2, 0);
        });

    }
}