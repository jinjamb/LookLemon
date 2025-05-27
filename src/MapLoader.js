import { SceneLoader, Vector3, HemisphericLight, MeshBuilder,StandardMaterial, Texture } from "@babylonjs/core";
import Nuage from "./../assets/nuage.glb";
//import Grotte from "./../assets/Grotte.glb";
import MapColi from "./../assets/SolColi.glb"
import MapVisu from "./../assets/SolVisu.glb";
import Citerne from "./../assets/citerne.glb"
import grass from "./../assets/grass.jpg";
import cristal from "./../assets/cristal.glb";

import tuyauD from "./../assets/tuyauDroit.glb";

//import Rocks from "././assets/deco/Rocks.glb";
//import GrassMix from "././assets/deco/GrassMix.glb";
//import GrassPatch from "././assets/deco/GrassPatch.glb";
import { JeuTuyaux } from "./JeuTuyauxv2.js"
import { LabyrintheModel } from "./Labyrinthe.js"
import { ArbreModel } from "./Arbre.js";
import { SkyboxModel } from "./Skybox.js";
import { TextureTest } from "./TextureTest.js";
import { Tuyau } from "./Tuyaux.js";


export class MapLoader {
    constructor(scene) {
        this.scene = scene;
        this.models = [];
        this.TroncEnCours = true;
        this.FeuilleEnCours = true;
    }

    async load() {
        this.loadGround();
        this.loadvisualGround();
        //this.murs();
        //this.loadModel(Nuage, new Vector3(40, 45, 40), new Vector3(-100, 0, 10), new Vector3(0, Math.PI, 0));
        //this.loadModel(Grotte, new Vector3(10, 10, 10), new Vector3(0, 0, -100), new Vector3(0, 0, 0));
        new LabyrintheModel(this.scene).loadModel();
        this.loadModel(Citerne, new Vector3(150, 150, 150), new Vector3(55, 67, -530), new Vector3(0, Math.PI, 0));
        await new JeuTuyaux(this.scene).createFromMatrice(new Vector3(-5, 68, -480)); // load le jeu des tuyaux
        new SkyboxModel(this.scene).load(); // load le skybox
        this.arbreModel = new ArbreModel(this.scene);
        this.arbreModel.load();
        this.setupMissionTroncObserver();
        //new TextureTest(this.scene).load();

        //this.loadModel(cristal, new Vector3(100, 100, 100), new Vector3(280, -80, 280), new Vector3(0, 0, 0));

        //new Tuyau(this.scene).loadModel(tuyauD, new Vector3(100, 100, 100),new Vector3(0, 60, 0), new Vector3(0, Math.PI / 2, 0));

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
    //plus necessaire car la map collision les geres
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
    async loadvisualGround() {
        await SceneLoader.ImportMeshAsync("", MapVisu, "", this.scene).then((result) => {
            var ground = result.meshes[0];
            result.meshes.forEach((mesh) => {
                mesh.scaling = new Vector3(7, 7, 7);
                mesh.name = "deco";
            });
            ground.scaling = new Vector3(15, 15, 15);
            ground.position = new Vector3(0, 0, 0);
            ground.rotation = new Vector3(0, Math.PI / 2, 0);
        });
    }

    async loadGround() {
        const light = new HemisphericLight("light", new Vector3(0, 1, 0), this.scene);
        light.intensity = 1;
        this.scene.light = light;

        let material = new StandardMaterial("material", this.scene);
        material.diffuseTexture = new Texture(grass, this.scene);

        material.diffuseTexture.uScale = 10;
        material.diffuseTexture.vScale = 10;
        await SceneLoader.ImportMeshAsync("", MapColi, "", this.scene).then((result) => {
            var ground = result.meshes[0];
            result.meshes.forEach((mesh) => {
                mesh.scaling = new Vector3(7, 7, 7);
                mesh.name = "ground";
                mesh.checkCollisions = true;
                mesh.visibility = 0;
                //mesh.material = material;
            });
            ground.scaling = new Vector3(15, 15, 15);
            ground.position = new Vector3(0, -3, 0);
            ground.rotation = new Vector3(0, Math.PI / 2, 0);
        });

    }
}