import { SceneLoader, Vector3, PhysicsAggregate, PhysicsShapeType, KeyBoardEventTypes } from "@babylonjs/core";

import TuyauDV from "./../assets/TuyauDroitVide.glb";
import TuyauDP from "./../assets/TuyauDroitPlein.glb";
import TuyauAV from "./../assets/TuyauAngleVide.glb";
import TuyauAP from "./../assets/TuyauAnglePlein.glb";

export class JeuTuyaux {
    constructor(scene) {
        this.scene = scene;
        this.models = [];
        this.modelsP=[];
        this.tuyauphy = null;
        this.matrice = [[1,2,0,0,0,0],
                        [0,1,0,2,1,2],
                        [0,2,1,2,0,1],
                        [0,0,0,0,0,1],
                        [0,2,1,1,1,2]];
        this.rotations=[[1,1,0,0,0,0],
                        [0,1,0,1,1,1],
                        [0,1,1,1,0,1],
                        [0,0,0,0,0,1],
                        [0,1,1,1,1,1]];
        //si 1-4 c'est un coin si 5 c'est un droit impaire et si 6 c'est un droit pair
        //5 gauche droite|6haut bas|1gauche haut|2droite haut|3bas droite|4bas gauche 
        this.res=[[5,4,0,0,0,0],
                [0,6,0,3,5,4],
                [0,2,5,1,0,6],
                [0,0,0,0,0,6],
                [0,3,5,5,5,1]];
        this.KeyControles();
        this.log=console.log("JeuTuyaux");
    }

    KeyControles() {
        this.scene.onKeyboardObservable.add((kbInfo) => {
            if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) { // KEYDOWN event
                if (kbInfo.event.key.toLowerCase() === 'o') {
                    console.log("O pressed");
                    console.log(this.scene.activeCamera.position);
                    //le joeur a changer apres c'est juste pour test
                    const playerPosition = this.scene.activeCamera.position;
                    this.rotateClosestTuyau(playerPosition);
                }
            }
        });
    }

    async load() {
        this.loadModel(TuyauDV, new Vector3(10, 10, 10), new Vector3(0, 0, 0), new Vector3(0, 0, 0), "TexTuyau.png");
    }


    async createFromMatrice(positionInit){
        for(let i = 0; i < this.matrice.length; i++) {
            for (let j = 0; j < this.matrice[i].length; j++) {
                if (this.matrice[i][j] == 1) {
                    this.loadModel(TuyauDV, new Vector3(5, 5, 5), new Vector3(positionInit.x + i * 5, positionInit.y, positionInit.z + j * 5), new Vector3(0, 0, 0), "TexTuyau.png",positionInit,true);
                    this.loadModel(TuyauDP, new Vector3(5, 5, 5), new Vector3(positionInit.x + i * 5, positionInit.y, positionInit.z + j * 5), new Vector3(0, (this.res[i][j]-1)* (Math.PI/2), 0), "TexTuyau.png",positionInit,false);
                }else if (this.matrice[i][j] == 2) {
                    this.loadModel(TuyauAV, new Vector3(5, 5, 5), new Vector3(positionInit.x + i * 5, positionInit.y, positionInit.z + j * 5), new Vector3(0, Math.PI / 2, 0), "TexTuyau.png",positionInit,true);
                    this.loadModel(TuyauAP, new Vector3(5, 5, 5), new Vector3(positionInit.x + i * 5, positionInit.y, positionInit.z + j * 5), new Vector3(0, this.res[i][j]*(Math.PI / 2), 0), "TexTuyau.png",positionInit,false);
                }
            }
        }
    }


    async loadModel(model, scale, position, rotation, texturePath,posInit,visibility) {
        try {
            const result = await SceneLoader.ImportMeshAsync("", model, "", this.scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(scale.x, scale.y, scale.z);
            this.model.position = new Vector3(position.x, position.y, position.z);
            this.model.rotation = new Vector3(rotation.x, rotation.y, rotation.z);
            for (let mesh of result.meshes) {
                mesh.isVisible = visibility;
            }


            this.model.metadata = {
                modelType: model,
                gridPosition:{
                    x:Math.floor((position.x-posInit.x)/5),
                    z:Math.floor((position.z-posInit.z)/5)
                }//on soutrais pour avoir des valeur quon peut utilisr dans la matrice
            };
            if(visibility){
                this.models.push(this.model);
            }else{
                this.modelsP.push(this.model);
            }
            //this.applyTexture(texturePath);
        } catch (error) {
            console.error("Error loading model:", error);
        }
    }
    Closest(position){
        let closest = null;
        let min = Infinity;
        for(const tuyau of this.models){
            const distance = Vector3.Distance(tuyau.position, position);
            if(distance<min){
                min = distance;
                closest = tuyau;
            }
        }
        return closest;
    }
    rotateClosestTuyau(position){
        const closest = this.Closest(position);
        console.log("gridpos=",closest.metadata.gridPosition);
        if(closest){

            closest.rotation.y += Math.PI / 2;
            console.log("rota=",this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z]);
            if(this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] == 4){
                this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] = 1;
            }else{
                this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z] += 1 ;
                console.log("matrice=",this.rotations[closest.metadata.gridPosition.x][closest.metadata.gridPosition.z]);
            }
        }
        console.log("matrice=",this.rotations);
        this.waterPropa(1,1);
    }
    waterPropa(x,y){
        console.log("waterpropa");
        
        for(let i = 0; i < this.rotations.length; i++) {
            for (let j = 0; j < this.rotations[i].length; j++) {
                console.log(this.rotations[i][j], this.res[i][j]);
                if (this.rotations[i][j] == this.res[i][j] || (this.res[i][j] > 4 && this.res[i][j]%2 == this.rotations[i][j]%2)) {
                    console.log("visible");
                    for(let k = 0; k < this.modelsP.length; k++) {
                        if(this.modelsP[k].metadata.gridPosition.x == i && this.modelsP[k].metadata.gridPosition.z == j){
                            
                            for(let mesh of this.modelsP[k].getChildMeshes()) {
                                mesh.isVisible = true;
                            }
                            
                        }
                    }
                }
            }
        }
    }
}