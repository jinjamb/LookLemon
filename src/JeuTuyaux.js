import { SceneLoader, Vector3, KeyboardEventTypes } from "@babylonjs/core";

import TuyauDV from "./../assets/tuyauDroitVide.glb";
import TuyauDP from "./../assets/tuyauDroitPlein.glb";
import TuyauAV from "./../assets/tuyauAngleVide.glb";
import TuyauAP from "./../assets/tuyauAnglePlein.glb";
import EauMap from "./../assets/SolEau.glb";

export class JeuTuyaux {
    constructor(scene) {
        this.scene = scene;
        this.models = [];
        this.modelsP = [];
        this.eau=null;
        this.eauvisi = false;
        this.matrice = [[2, 1, 1, 1, 2, 0, 0, 0],
        [2, 1, 2, 0, 2, 2, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [2, 0, 2, 2, 0, 1, 0, 0],
        [2, 2, 0, 1, 2, 2, 0, 2],
        [0, 1, 0, 1, 1, 0, 0, 1],
        [2, 2, 0, 1, 2, 1, 1, 2],
        [2, 1, 1, 2, 0, 0, 0, 0]];

        this.rotations = [[1, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 1, 1, 0, 1, 0, 0],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [0, 1, 0, 1, 1, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0]];
        //si 1-4 c'est un coin si 5 c'est un droit impaire et si 6 c'est un droit pair
        //5 gauche droite|6haut bas|1gauche haut|2droite haut|3bas droite|4bas gauche 
        this.res =
            [[3, 5, 5, 5, 4, 0, 0, 0],
            [2, 5, 4, 0, 2, 4, 0, 0],
            [0, 0, 6, 0, 0, 6, 0, 0],
            [4, 0, 2, 4, 0, 6, 0, 0],
            [2, 4, 0, 6, 3, 1, 0, 3],
            [0, 6, 0, 6, 6, 0, 0, 6],
            [3, 1, 0, 6, 2, 5, 5, 1],
            [2, 5, 5, 1, 0, 0, 0, 0]];

        this.chemin = [[3, 0], [4, 0], [4, 1], [5, 1], [6, 1], [6, 0], [7, 0], [7, 1], [7, 2],
        [7, 3], [6, 3], [5, 3], [4, 3], [3, 3], [3, 2], [2, 2], [1, 2], [1, 1], [1, 0],
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [3, 5], [4, 5],
        [4, 4], [5, 4], [6, 4], [6, 5], [6, 6], [6, 7], [5, 7], [4, 7]];
        this.KeyControles();

    }

    KeyControles() {
        this.scene.onKeyboardObservable.add((kbInfo) => {
            if (kbInfo.type === KeyboardEventTypes.KEYDOWN) { // KEYDOWN event
                if (kbInfo.event.key.toLowerCase() === 'o') {
                    //console.log("O pressed");
                    //console.log(this.scene.activeCamera.position);
                    //le joeur a changer apres c'est juste pour test
                    const playerPosition = this.scene.player.position;
                    this.rotateClosestTuyau(playerPosition);
                    this.changeVisibility();
                }
            }
        });
    }



    async createFromMatrice(positionInit) {
        let vec = new Vector3(20, 20, 20);
        let coef = 20;
        this.loadLac();
        this.loadModel(TuyauDP, vec, new Vector3(positionInit.x + 3 * coef, positionInit.y, positionInit.z - coef), new Vector3(0, Math.PI, 0), positionInit, true, false);
        for (let i = 0; i < this.matrice.length; i++) {
            for (let j = 0; j < this.matrice[i].length; j++) {
                if (this.matrice[i][j] == 1) {
                    this.loadModel(TuyauDV, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, 0, 0), positionInit, true, true);
                    this.loadModel(TuyauDP, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, (this.res[i][j] - 1) * (Math.PI / 2), 0), positionInit, false, true);
                } else if (this.matrice[i][j] == 2) {
                    this.loadModel(TuyauAV, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, Math.PI / 2, 0), positionInit, true, true);
                    this.loadModel(TuyauAP, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, this.res[i][j] * (Math.PI / 2), 0), positionInit, false, true);
                }
            }
        }
    }


    async loadModel(model, scale, position, rotation, posInit, visibility, flip) {
        try {
            this.eau = await this.loadLac();
            const result = await SceneLoader.ImportMeshAsync("", model, "", this.scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(scale.x, scale.y, scale.z);
            this.model.position = new Vector3(position.x, position.y, position.z);
            this.model.rotation = new Vector3(rotation.x, rotation.y, rotation.z);
            for (let mesh of result.meshes) {
                mesh.isVisible = visibility;
            }
            //permet de gerer avec les matrice leur pos et rota
            this.model.metadata = {
                modelType: model,
                gridPosition: {
                    x: Math.floor((position.x - posInit.x) / 20),
                    z: Math.floor((position.z - posInit.z) / 20)
                }//on soutrais pour avoir des valeur quon peut utilisr dans la matrice
            };
            if (visibility && flip) {
                this.models.push(this.model);
            } else if (!visibility && flip) {
                this.modelsP.push(this.model);
            }
            //this.applyTexture(texturePath);
        } catch (error) {
            console.error("Error loading model:", error);
        }
    }
    Closest(position) {
        let closest = null;
        let min = Infinity;
        for (const tuyau of this.models) {
            const distance = Vector3.Distance(tuyau.position, position);
            if (distance < min) {
                min = distance;
                closest = tuyau;
            }
        }
        return closest;
    }
    rotateClosestTuyau(position) {
        const closest = this.Closest(position);
        console.log("closest=", closest.metadata.gridPosition);
        //console.log("gridpos=",closest.metadata.gridPosition);
        if (closest) {

            closest.rotation.y += Math.PI / 2;
            //console.log("rota=",this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z]);
            if (this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] == 4) {
                this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] = 1;
            } else {
                this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] += 1;
                //console.log("matrice=",this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z]);
            }
        }
        //console.log("matrice=",this.rotations);
        //this.waterPropa(1,1);
    }

    //fonction de test je la laisse au cas ou
    waterPropa(x, y) {
        console.log("waterpropa");

        for (let i = 0; i < this.rotations.length; i++) {
            for (let j = 0; j < this.rotations[i].length; j++) {
                console.log(this.rotations[i][j], this.res[i][j]);
                if (this.rotations[i][j] == this.res[i][j] || (this.res[i][j] > 4 && this.res[i][j] % 2 == this.rotations[i][j] % 2)) {
                    console.log("visible");
                    for (let k = 0; k < this.modelsP.length; k++) {
                        if (this.modelsP[k].metadata.gridPosition.x == i && this.modelsP[k].metadata.gridPosition.z == j) {

                            for (let mesh of this.modelsP[k].getChildMeshes()) {
                                mesh.isVisible = true;
                            }

                        }
                    }
                }
            }
        }
    }

    //retourne les coo des tuyaux bien placés
    tuplesCorrecte() {
        var valides = [];
        for (let i = 0; i < this.chemin.length; i++) {
            let tuple = this.chemin[i];
            if (this.rotations[tuple[0]][tuple[1]] == this.res[tuple[0]][tuple[1]] || (this.res[tuple[0]][tuple[1]] > 4 && this.res[tuple[0]][tuple[1]] % 2 == this.rotations[tuple[0]][tuple[1]] % 2)) {
                //console.log("flow");
                valides.push(tuple);
            } else {
                //console.log("no flow");
                //console.log("valides=",valides);
                return valides;
            }
        }
        //console.log("valides=",valides);
        return valides;
    }

    //change la visibilite des tuyaux bien et mal places
    changeVisibility() {
        let valides = this.tuplesCorrecte();

        //apparition de leau 
        if(valides.length == this.chemin.length && !this.eauvisi){
            this.rempliLac();
            this.scene.missionTronc=true;
            
        }else if(this.eauvisi){
            this.videLac();
        }

        for (let i = 0; i < this.modelsP.length; i++) {
            //console.log("tuple=",this.modelsP[i].metadata.gridPosition,"onValide?=",this.modelsP[i].metadata.gridPosition in valides);
            let tuple = this.modelsP[i].metadata.gridPosition;
            let presence = false;
            for (let possi of valides) {
                if (tuple.x == possi[0] && tuple.z == possi[1]) {
                    //console.log("on rend visible ",tuple);
                    presence = true;
                    for (let mesh of this.modelsP[i].getChildMeshes()) {
                        mesh.isVisible = true;
                    }
                }
            }
            if (!presence) {
                //console.log("on rend invisible ",tuple);
                for (let mesh of this.modelsP[i].getChildMeshes()) {
                    mesh.isVisible = false;
                }
            }
        }

        for (let i = 0; i < this.models.length; i++) {
            let tuple = this.models[i].metadata.gridPosition;
            let presence = false;
            for (let possi of valides) {
                if (tuple.x == possi[0] && tuple.z == possi[1]) {
                    //console.log("on rend invisible ",tuple);
                    presence = true;
                    for (let mesh of this.models[i].getChildMeshes()) {
                        mesh.isVisible = false;
                    }
                }
            }
            if (!presence) {
                //console.log("on rend visible ",tuple);
                for (let mesh of this.models[i].getChildMeshes()) {
                    mesh.isVisible = true;
                }
            }
        }
    }
    async loadLac(){
        try {
            const result = await SceneLoader.ImportMeshAsync("", EauMap, "", this.scene);
            const ground = result.meshes[0];
            result.meshes.forEach((mesh) => {
                mesh.scaling = new Vector3(7, 7, 7);
                mesh.isVisible = false;
            });
            ground.scaling = new Vector3(15, 15, 15);
            ground.position = new Vector3(0, 0, 0);
            ground.rotation = new Vector3(0, Math.PI / 2, 0);
            return result;
        } catch (error) {
            console.error("Erreur lors du chargement du lac:", error);
            return { meshes: [] };
        }
    }
    async rempliLac() {
        this.eauvisi = true;
        this.eau.meshes.forEach((mesh) => {
            mesh.isVisible = true;
        });
    }
    async videLac() {
        this.eauvisi = false;
        this.eau.meshes.forEach((mesh) => {
            mesh.isVisible = false;
        });
    }
}
