import { SceneLoader, Vector3, KeyboardEventTypes } from "@babylonjs/core";

import tuyauD from "./../assets/tuyaux/tuyauDroit.glb";
import tuyauA from "./../assets/tuyaux/tuyauAngle.glb";
import EauMap from "./../assets/tuyaux/SolEau.glb";

import { Tuyau } from "./Tuyaux.js";


export class JeuTuyaux {
    constructor(scene) {
        this.scene = scene;
        this.tt = null;
        this.models = [];
        //matrice des tuyaux
        this.matriceModels = [];
        this.eau=null;
        this.eauvisi = false;
        //2 coin 1 droit
        this.matrice = 
        [[2, 1, 1, 1, 2, 1, 2, 2],
        [2, 1, 2, 2, 2, 2, 1, 2],
        [2, 1, 1, 1, 1, 1, 2, 1],
        [2, 1, 2, 2, 1, 1, 1, 1],
        [2, 2, 1, 1, 2, 2, 2, 2],
        [1, 1, 2, 1, 1, 1, 1, 1],
        [2, 2, 2, 1, 2, 1, 1, 2],
        [2, 1, 1, 2, 2, 2, 1, 1]];

        this.rotations = 
        [[1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]];
        //si 1-4 c'est un coin si 5 c'est un droit impaire et si 6 c'est un droit pair
        //5 gauche droite|6haut bas|1gauche haut|2droite haut|3bas droite|4bas gauche 

        this.KeyControles();

    }

    KeyControles() {
        this.scene.onKeyboardObservable.add((kbInfo) => {
            if (kbInfo.type === KeyboardEventTypes.KEYDOWN) { // KEYDOWN event
                if (kbInfo.event.key.toLowerCase() === 'e') {
                    //console.log("O pressed");
                    //console.log(this.scene.activeCamera.position);
                    //le joeur a changer apres c'est juste pour test
                    const playerPosition = this.scene.player.position;
                    if(this.rotateClosestTuyau(playerPosition) !== null){
                        this.changeVisibility();
                    }
                    
                }
                // }if (kbInfo.event.key.toLowerCase() === 'o') {
                //     document.getElementById("eau").src = "./eauP.png";
                // }
            }
        });
    }



    async createFromMatrice(positionInit) {
        let vec = new Vector3(20, 20, 20);
        let coef = 20;
        this.loadLac();
        //let t = this.loadModel(TuyauD, vec, new Vector3(positionInit.x + 3 * coef, positionInit.y, positionInit.z - coef), new Vector3(0, Math.PI, 0), positionInit, true, false);
        let t = new Tuyau(this.scene)
        await t.loadModel(tuyauD, vec, new Vector3(positionInit.x + 3 * coef, positionInit.y, positionInit.z - coef), new Vector3(0, 0, 0), positionInit);
        t.plein();
        for (let i = 0; i < this.matrice.length; i++) {
            let ligne = [];
            for (let j = 0; j < this.matrice[i].length; j++) {
                if (this.matrice[i][j] == 1) {
                    let tuyau = new Tuyau(this.scene);
                    tuyau.loadModel(tuyauD, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, Math.PI / 2, 0),positionInit );
                    this.models.push(tuyau);
                    ligne.push([tuyau,1,1]);//tuyaux,rotation,type
                    //this.loadModel(TuyauDP, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, (this.res[i][j] - 1) * (Math.PI / 2), 0), positionInit, false, true);
                } else if (this.matrice[i][j] == 2) {   
                    let tuyau = new Tuyau(this.scene);
                    await tuyau.loadModel(tuyauA, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, Math.PI / 2, 0),positionInit);
                    this.models.push(tuyau);
                    tuyau.vide();
                    ligne.push([tuyau,1,2]);
                    //this.loadModel(TuyauAP, vec, new Vector3(positionInit.x + i * coef, positionInit.y, positionInit.z + j * coef), new Vector3(0, this.res[i][j] * (Math.PI / 2), 0), positionInit, false, true);
                }
            }
            this.matriceModels.push(ligne);
        }
        console.log("matriceModels=", this.matriceModels);
    }


    async loadModel(model, scale, position, rotation, posInit, visibility, flip) {
        try {
            await this.loadLac();
            let tuyau = new Tuyau(this.scene);
            const result = await tuyau.loadModel(model, scale, position, rotation,posInit);
            this.model = result.meshes[0];

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
            }
            //this.applyTexture(texturePath);
            
            return result;
        } catch (error) {
            console.error("Error loading model:", error);
        }
    }
    Closest(position) {
        let closest = null;
        let min = 50;
        for (const tuyau of this.models) {
            //console.log("tuyau pos=", tuyau.position);
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
        if(closest == null){
            return null;
        }
        console.log("closest=", closest);
        //console.log("gridpos=",closest.metadata.gridPosition);
        if (closest) {
            //console.log("rota=",this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z]);
            if (this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] == 4) {
                //console.log("rota:", this.matriceModels[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z][1]);
                //console.log("tuyau=", this.matriceModels[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z]);
                this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] = 1;
                this.matriceModels[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z][1] = 1;
            } else {
                this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] += 1;
                this.matriceModels[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z][1] += 1;
                //console.log("matrice=",this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z]);
            }
            closest.rotation.y = this.matriceModels[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z][1] * (Math.PI / 2);
        }
        //console.log("matrice=",this.rotations);
        //this.waterPropa(1,1);
    }

    //fonction de test je la laisse au cas ou
    waterPropa() {
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
    //prend une coo d'arrive et une direction 1 nord 2 est 3 sud 4 ouest
    propagation(x, y,dir,res) {
        if (x < 0 || x >= this.matriceModels.length || y < 0 || y >= this.matriceModels[0].length) {return null;}
        let tuyauInfos = this.matriceModels[x][y];
        console.log("propagation= ", x, y);
        console.log("infos X=",x,"y= ",y,"type=", tuyauInfos[2], "rotation=", tuyauInfos[1], "dir=", dir);
        

        //si c'est droit
        if (tuyauInfos[2] == 1) {
            //soit n-s soit e-w
            if(tuyauInfos[1] == 1 || tuyauInfos[1] == 3){
                if (dir == 1) {
                    this.propagation(x+1, y,1,res);
                    res.push([x,y]);
                    return res;
                } else if (dir == 2 || dir == 4) {
                    return;
                }else if (dir == 3) {
                    this.propagation(x - 1, y,3,res);
                    res.push([x,y]);
                    return res;
                }
            }else if(tuyauInfos[1] == 2 || tuyauInfos[1] == 4){
                if (dir == 2) {
                    this.propagation(x, y - 1,2,res);
                    res.push([x,y]);
                    return res;
                } else if (dir == 1 || dir == 3) {
                    return;
                }else if (dir == 4) {
                    this.propagation(x, y + 1,4,res);
                    res.push([x,y]);
                    return res;
                }
            }
        }//si c'est un coin
        else if (tuyauInfos[2] == 2) {
            if (tuyauInfos[1] == 1) {
                //nord-west
                if (dir == 2 || dir == 3) {
                    return res;
                } else if (dir == 1) {
                    this.propagation(x ,y - 1,2,res);
                    res.push([x,y]);
                    return res;
                }else if (dir == 4) {
                    console.log("propagation nord-west");
                    this.propagation(x - 1, y, 3,res);
                    
                    res.push([x,y]);
                    console.log("res=",res);
                    return res;
                }
            }else if (tuyauInfos[1] == 2) {
                //nord-est
                if (dir == 3 || dir == 4) {
                    return res;
                } else if (dir == 1) {
                    this.propagation(x ,y + 1,4,res);
                    res.push([x,y]);
                    return res;
                }else if (dir == 2) {
                    this.propagation(x - 1, y,3,res);
                    res.push([x,y]);
                    return res;
                }
            }else if (tuyauInfos[1] == 3) {
                //sud-est
                if (dir == 1 || dir == 4) {
                    return res;
                } else if (dir == 2) {
                    this.propagation(x + 1, y,1,res);
                    res.push([x,y]);
                    return res;
                }else if (dir == 3) {
                    this.propagation(x ,y + 1,4,res);
                    res.push([x,y]);
                    return res;
                }
            }else if (tuyauInfos[1] == 4) {
                //sud-west
                if (dir == 1 || dir == 2) {
                    return res;
                } else if (dir == 3) {
                    this.propagation(x, y - 1,2,res);
                    res.push([x,y]);
                    return res;
                }else if (dir == 4) {
                    this.propagation(x + 1, y,1,res);
                    res.push([x,y]);
                    return res;
                }
            }
        }    
        return res;
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
                console.log("valides=",valides,"len",valides.length);
                return valides;
            }
        }
        console.log("valides=",valides);
        return valides;
    }

    //change la visibilite des tuyaux bien et mal places
    changeVisibility() {
    
        let valides = this.propagation(3,0,4,[]);
        if(!valides){
            console.log("aucun tuyau valide");
            return;
        }
        //console.log("valides=", valides);
        //console.log("valides=",valides,"len",valides);

        for (let i = 0; i < this.matriceModels.length; i++) {
            for (let j = 0; j < this.matriceModels[i].length; j++) {
                //console.log("matrice=",this.matriceModels[i][j]);
                if (this.matriceModels[i][j][0]) {
                    this.matriceModels[i][j][0].vide();
                }
            }
        }
        let endaccess = false;
        valides.forEach((tuple) => {
            this.matriceModels[tuple[0]][tuple[1]][0].plein();
            if (tuple[0] == 4 && tuple[1] == 7 && this.matriceModels[tuple[0]][tuple[1]][1]== 3) {
                this.showTemporaryMessage("Mission des tuyaux terminée !", 5000);
                document.getElementById("eau").src = "./eauP.png";
                endaccess = true;
            }
        });

        if (endaccess) {
            console.log("rempli lac");
            this.scene.missionTronc=true;
            this.rempliLac();
        }
        else {
            console.log("vide lac");
            this.videLac();
        }
        
    }
    async loadLac(){
        try {
            const result = await SceneLoader.ImportMeshAsync("", EauMap, "", this.scene);
            this.eau = result;
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
        console.log("pleinLac");
        console.log(this.eau);
        this.eauvisi = true;
        
        this.eau.meshes.forEach((mesh) => {
            mesh.isVisible = true;
        });
    }
    async videLac() {
        console.log("videLac");
        console.log(this.eau);
        this.eauvisi = false;
        this.eau.meshes.forEach((mesh) => {
            mesh.isVisible = false;
        });
    }
    showTemporaryMessage(message, duration = 100) {
        const dialogueElement = document.getElementById("notif");
        dialogueElement.innerHTML = message;
        dialogueElement.style.display = 'block';
        dialogueElement.style.opacity = '1';

        // Faire disparaître le message après la durée spécifiée
        setTimeout(() => {
            dialogueElement.style.opacity = '0';
            setTimeout(() => {
                dialogueElement.style.display = 'none';
            }, 500); // Attendre que la transition d'opacité soit terminée
        }, duration);
    }
}