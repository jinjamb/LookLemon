import { SceneLoader, Vector3, HemisphericLight } from "@babylonjs/core";

//import Grotte from "./../assets/Grotte.glb";
import MapColi from "./../assets/map/SolColi.glb"
import MapVisu from "./../assets/map/SolVisu.glb";
import Citerne from "./../assets/tuyaux/citerne.glb"
import { JeuFleurs } from "./JeuFleurs.js";
import {LabyrintheModel} from "./Labyrinthe.js"




//import Rocks from "././assets/deco/Rocks.glb";
//import GrassMix from "././assets/deco/GrassMix.glb";
//import GrassPatch from "././assets/deco/GrassPatch.glb";
import { JeuTuyaux } from "./JeuTuyaux.js"
import { ArbreModel } from "./Arbre.js";
import { SkyboxModel } from "./Skybox.js";



export class MapLoader {
    constructor(scene) {
        this.scene = scene;
        this.models = [];
        this.TroncEnCours = true;
        this.FeuilleEnCours = true;
        this.BrancheEnCours = true;
    }

    async load() {
        this.loadGround();
        this.loadvisualGround();
        new LabyrintheModel(this.scene).loadModel();
        this.loadModel(Citerne, new Vector3(150, 150, 150), new Vector3(55, 67, -530), new Vector3(0, Math.PI, 0));
        await new JeuTuyaux(this.scene).createFromMatrice(new Vector3(-5, 68, -480)); // load le jeu des tuyaux
        await new JeuFleurs(this.scene).createFromMatrice(new Vector3( 250, 22,-50)); // load le jeu des fleures
        
        new SkyboxModel(this.scene).load(); // load le skybox
        this.arbreModel = new ArbreModel(this.scene);
        this.arbreModel.load();
        this.setupMissionTroncObserver();

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
            if (this.scene.missionBranche === true && this.arbreModel && this.BrancheEnCours) {
                //this.arbreModel.branches();
                this.arbreModel.citron();
                this.BrancheEnCours = false;
            }
            
        });
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



        await SceneLoader.ImportMeshAsync("", MapColi, "", this.scene).then((result) => {
            var ground = result.meshes[0];
            result.meshes.forEach((mesh) => {
                mesh.scaling = new Vector3(7, 7, 7);
                mesh.name = "ground";
                mesh.checkCollisions = true;
                mesh.visibility = 0;

            });
            ground.scaling = new Vector3(15, 15, 15);
            ground.position = new Vector3(0, -3, 0);
            ground.rotation = new Vector3(0, Math.PI / 2, 0);
        });

    }
}