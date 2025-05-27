import { Vector3, KeyboardEventTypes } from "@babylonjs/core";
import FleurC from "./../assets/FleurClaire.glb";
import FleurF from "./../assets/FleurFonce.glb";


import { Fleur } from "./Fleur.js";


export class JeuFleurs {
    constructor(scene) {
        this.scene = scene;
        this.damier = false;
        this.tt = null;
        this.models = [];
        //matrice des tuyaux
        this.matriceModels = [];
        //matrice des fleures: 1 si ya fleur 2 si elle est heruuse 3 si dead 0 pion.
        this.matrice = [
            [1, 1, 1, 1, 1, 0],
            [1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1],
        ];
        this.currentPosition = [0, 0];
        this.keyControles();
        this.scene.onBeforeRenderObservable.add(() => this.update()); 
    }


    keyControles() {
        this.scene.onKeyboardObservable.add((kbInfo) => {
            if (kbInfo.type === KeyboardEventTypes.KEYDOWN) { // KEYDOWN event
                if (kbInfo.event.key.toLowerCase() === 'n') {
                    console.log("n pressed meurt");
                    this.matriceModels.forEach(lignes => {
                        lignes.forEach(fleur => {
                            console.log("fleur=", fleur);
                            fleur[0].meurt();
                        }
                        );
                    });
                }
                if (kbInfo.event.key.toLowerCase() === 'm') {
                    console.log("m pressed chill");
                    this.matriceModels.forEach(lignes => {
                        lignes.forEach(fleur => {
                            fleur[0].chill();
                        });
                    });
                }
                if (kbInfo.event.key.toLowerCase() === 'b') {
                    console.log("b pressed pousse");
                    this.matriceModels.forEach(lignes => {
                        lignes.forEach(fleur => {
                            fleur[0].pousse();
                        });
                    });
                }
            }

        });

    }

    async createFromMatrice(positionInit) {
        let vec = new Vector3(40, 40, 40);
        let coef = 20;

        //let t = this.loadModel(TuyauD, vec, new Vector3(positionInit.x + 3 * coef, positionInit.y, positionInit.z - coef), new Vector3(0, Math.PI, 0), positionInit, true, false);


        for (let i = 0; i < this.matrice.length; i++) {
            let ligne = [];
            for (let j = 0; j < this.matrice[i].length; j++) {
                if (this.matrice[i][j] == 1) {
                    let fleur = new Fleur(this.scene);
                    if (this.damier) {
                        fleur.loadModel(FleurF, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, Math.PI / 2, 0), positionInit);
                        this.damier = false;
                    } else {
                        fleur.loadModel(FleurC, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, Math.PI / 2, 0), positionInit);
                        this.damier = true;
                    }
                    this.models.push(fleur);
                    fleur.chill();
                    this.models.push(fleur);
                    ligne.push([fleur, 1]); // etat

                } else if (this.matrice[i][j] == 0) {
                    ligne.push([null, 0]); // pas de fleur
                    if (this.damier) { this.damier = false; } else { this.damier = true; }
                    // 0 pion
                }
            }
            this.matriceModels.push(ligne);
            if (this.damier) { this.damier = false; } else { this.damier = true; }
        }
        console.log("matriceModels=", this.matriceModels);
    }


    async loadModel(model, scale, position, rotation, posInit) {
        try {

            let fleur = new Fleur(this.scene);
            const result = await fleur.loadModel(model, scale, position, rotation, posInit);
            this.model = result.meshes[0];


            //permet de gerer avec les matrice leur pos et rota
            this.model.metadata = {
                modelType: model,
                gridPosition: {
                    x: Math.floor((position.x - posInit.x) / 20),
                    z: Math.floor((position.z - posInit.z) / 20)
                }//on soutrais pour avoir des valeur quon peut utilisr dans la matrice
            };
            //this.applyTexture(texturePath);

            return result;
        } catch (error) {
            console.error("Error loading model:", error);
        }
    }


    update() {
        let fleur = this.getClosestFleure();
        if(!fleur) {
            console.log("No flower found close enough.");
            return;
        }
        let x = fleur.metadata.gridPosition.x;
        let y = fleur.metadata.gridPosition.z;
        console.log("closest fleur=", fleur, "x=", x, "y=", y);
        console.log("currentPosition=", this.matriceModels);
        if (this.matriceModels[x][y][1] == 1) {
            this.matriceModels[x][y][1] = 2; // on met a jour l'etat de la fleur
            this.currentPosition = [x, y];
            fleur.pousse();
        }
        else if (this.matriceModels[x][y][1] == 2 && this.currentPosition[0] == x && this.currentPosition[1] == y) {
            return;
        }else if (this.matriceModels[x][y][1] == 2) {
            this.matriceModels[x][y][1] = 3; // on met a jour l'etat de la fleur
            this.currentPosition = [x, y];
            fleur.meurt();
        }

    }

    getClosestFleure() {
        console.log("currentPosition=", this.currentPosition);
        let closestFleure = null;
        let closestDistance = Infinity; // Initialiser à l'infini pour trouver la plus proche

        this.matriceModels.forEach(lignes => {
            lignes.forEach(fleur => {
                if (fleur[0]){
                        console.log("fleur=", fleur[0]);
                        const distance = Vector3.Distance(this.scene.player.position, fleur[0].position);
                        //console.log("distance=", distance, "position=", fleur[0].position);
                        if (distance < closestDistance && distance<20) { // 20 is the max distance to consider
                            //console.log("distance=", distance);
                            closestDistance = distance;
                            closestFleure = fleur[0];
                            //console.log("closestFleure=", closestDistance.position);
                        }
                    };
                });
            }
        );
        return closestFleure;
    }
}
