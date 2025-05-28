import { SceneLoader, Vector3, KeyboardEventTypes } from "@babylonjs/core";

import TuyauDV from "./../assets/tuyauDroitVide.glb";
import TuyauDP from "./../assets/tuyauDroitPlein.glb";

export class JeuFleurs {
    constructor(scene) {
        this.scene = scene;
        this.models = [];
        this.modelsP = [];
        this.previousFlower = null;
        this.matrice = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 1]
        ];
        this.alreadyGrown = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 0],
            [0, 0, 0, 0, 2, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 0, 0],
        ]

        this.KeyControles();

    }

    KeyControles() {
        console.log(this.scene.missionBranche)
        
        window.addEventListener("keydown", (event) => {
            if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].indexOf(event.code) != -1) { // KEYDOWN event
                const playerPosition = this.scene.player.position;
                if (!this.scene.missionBranche) this.checkGround(playerPosition);
            }
        });
    }

    async createFromMatrice(positionInit) {
        let vec = new Vector3(20, 20, 20);
        let coef = 20;
        for (let i = 0; i < this.matrice.length; i++) {
            for (let j = 0; j < this.matrice[i].length; j++) {
                if (this.matrice[i][j] == 1) {
                    this.loadModel(TuyauDP, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, 0, 0), positionInit, true, true);
                } // a remplacer par la terre et la fleur
                else {
                    this.loadModel(TuyauDV, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, 0, 0), positionInit, true, true);
                }
            }
        }   
    }

    async loadModel(model, scale, position, rotation, posInit, visibility, flip) {
        try {
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
        let min = 10;
        for (const tuyau of this.models) {
            const distance = Vector3.Distance(tuyau.position, position);
            if (distance < min) {
                min = distance;
                closest = tuyau;
            }
        }
        this.checkFinish()
        return closest;
    }

    checkGround(position) {
        let closest = this.Closest(position);
        if (closest != this.previousFlower && closest != null ) {
            if (this.alreadyGrown[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] < 1 ){
                closest.position.y += 2;
                // animation fleur()
                console.log(`fleur [${closest.metadata.gridPosition.x}, ${closest.metadata.gridPosition.z}] plantée`);
                this.alreadyGrown[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] = 1; //a virer du coup
            }
            else {
                // on ecrase la fleur
                console.log(`fleur [${closest.metadata.gridPosition.x}, ${closest.metadata.gridPosition.z}] déja plantée`);
            }
        }
        this.previousFlower = closest;
    }

    resetGrid(){
        for (let i = 0; i < this.alreadyGrown.length; i++) {
            for (let j = 0; j < this.alreadyGrown[i].length; j++) {
                if (this.alreadyGrown[i][j] == 1) {
                    //mettre fleurs plantées
                    const model = this.models.find(m => m.metadata.gridPosition.x === i && m.metadata.gridPosition.z === j);
                    if (model) {
                        // jouer anim de départ
                        model.position.y -= 2;
                    }
                }
                this.alreadyGrown[i][j] = 0;
            }
        }
    }

    checkFinish(){
        for (let i = 0; i < this.alreadyGrown.length; i++) {
            for (let j = 0; j < this.alreadyGrown[i].length; j++) {
                if (this.alreadyGrown[i][j] == 0) return ; // Il reste des fleurs à planter
            }
        }
        console.log("Toutes les fleurs sont plantées !");
        this.scene.missionBranche = true; // Toutes les fleurs sont plantées
    }

}