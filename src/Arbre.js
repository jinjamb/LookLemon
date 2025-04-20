import { SceneLoader, Vector3 } from "@babylonjs/core";
import TroncG from "./../assets/arbre/TroncGris.glb";
import TroncM from "./../assets/arbre/TroncMarron.glb";
import FeuilleG from "./../assets/arbre/FeuilleGrise.glb";
import FeuilleV from "./../assets/arbre/FeuilleVerte.glb";

export class ArbreModel {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.FeuilleG = null;
        this.FeuilleV = null;
        this.TroncG = null;
        this.TroncM = null;

    }

    async load() {
        this.FeuilleG = await this.loadModel(FeuilleG,true);
        this.FeuilleV = await this.loadModel(FeuilleV,false);
        this.TroncG = await this.loadModel(TroncG,true);
        this.TroncM = await this.loadModel(TroncM,false);
    }

    async loadModel(model,visi) {
        try {
            const result = await SceneLoader.ImportMeshAsync("", model, "", this.scene);
            const ground = result.meshes[0];
            result.meshes.forEach((mesh) => {
                mesh.isVisible = visi;
                mesh.name = "ground";
            });
            ground.scaling = new Vector3(100, 100, 100);
            ground.position = new Vector3(11, 52.5, 24);
            ground.rotation = new Vector3(0, Math.PI / 2, 0);
            return result;
        } catch (error) {
            console.error("Erreur lors du chargement de :",model,"err: ", error);
            return { meshes: [] };
        }
    }

    async feuilleVerte() {
        this.FeuilleG.meshes.forEach((mesh) => {
            mesh.isVisible = false;
        });
        this.FeuilleV.meshes.forEach((mesh) => {
            mesh.isVisible = true;
        });
    }
    async troncMarron() {
        this.TroncG.meshes.forEach((mesh) => {
            mesh.isVisible = false;
        });
        this.TroncM.meshes.forEach((mesh) => {
            mesh.isVisible = true;
        });
    }
}