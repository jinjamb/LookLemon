import { SceneLoader, Vector3 } from "@babylonjs/core";
import Citron from "./../assets/citron.glb";

export class CitronModel {
    constructor(scene) {
        this.ready = false
        this.scene = scene;
        this.model = null;
        this.citronphy = null;
        this.animationGroups = null;
        this.currentAnimation = null;
        this.state = "Stand";
        
//
//        if (CitronModel.boundingBoxParameters == undefined) {
//            CitronModel.boundingBoxParameters = this.getBoundingInfo();
//        }
//        this.bounder = this.createBoundingBox();
//        this.bounder.dudeMesh = this.dudeMesh;
//    }
//
//    createBoundingBox() {
//        let bounder = new BABYLON.Mesh.CreateBox("bounder" + this.id.toString(), 1, this.scene );
//        bounder.checkCollisions = true;
//    
//        bounder.position = this.dudeMesh.position.clone();
//    
//        let bbInfo = CitronModel.boundingBoxParameters;
//    
//        let max = bbInfo.boundingBox.maximum;
//        let min = bbInfo.boundingBox.minimum;
//    
//        // Not perfect, but kinda of works...
//        // Looks like collisions are computed on a box that has half the size... ?
//        bounder.scaling.x = (max._x - min._x) * this.scaling;
//        bounder.scaling.y = (max._y - min._y) * this.scaling;
//        bounder.scaling.z = (max._z - min._z) * this.scaling * 3;
//        //bounder.isVisible = false;
//    
//        bounder.position.y += (max._y - min._y) * this.scaling / 2;
//    
//        return bounder;
//      }
//
//      getBoundingBoxHeightScaled() {
//        let bbInfo = CitronModel.boundingBoxParameters;
//    
//        let max = bbInfo.boundingBox.maximum;
//        let min = bbInfo.boundingBox.minimum;
//    
//        let lengthY = (max._y - min._y) * this.scaling;
//        return lengthY;
//      }
//    
//
//    
//      calculateBoundingBoxParameters() {
//        // Compute BoundingBoxInfo for the Dude, for this we visit all children meshes
//        let childrenMeshes = this.dudeMesh.getChildren();
//        let bbInfo = this.totalBoundingInfo(childrenMeshes);
//    
//        return bbInfo;
//      }
//    
//      // Taken from BabylonJS Playground example : https://www.babylonjs-playground.com/#QVIDL9#1
//      totalBoundingInfo(meshes) {
//        var boundingInfo = meshes[0].getBoundingInfo();
//        var min = boundingInfo.minimum.add(meshes[0].position);
//        var max = boundingInfo.maximum.add(meshes[0].position);
//        for (var i = 1; i < meshes.length; i++) {
//          boundingInfo = meshes[i].getBoundingInfo();
//          min = BABYLON.Vector3.Minimize(
//            min,
//            boundingInfo.minimum.add(meshes[i].position)
//          );
//          max = BABYLON.Vector3.Maximize(
//            max,
//            boundingInfo.maximum.add(meshes[i].position)
//          );
//        }
//        return new BABYLON.BoundingInfo(min, max);
     
}

    async loadModel(scene) {
        try {
            const result = await SceneLoader.ImportMeshAsync("", Citron, "", scene);
            this.model = result.meshes[0];
            this.model.scaling = new Vector3(35, 35, 35);
            this.model.position = new Vector3(0, 0, 3);
            this.model.rotation = new Vector3(0, -4, 0);

            // this.model.getChildMeshes().forEach((mesh) => {
            //     if (mesh.material) {
                    
            //         const citronMat = new StandardMaterial("Citronmat", scene);
        
            //         // Utiliser une texture au lieu d'une couleur unie
            //         citronMat.diffuseTexture = new Texture(CitronTexture, scene);                    
            //         // Options pour améliorer le rendu de la texture
            //         citronMat.diffuseTexture.hasAlpha = false;
            //         citronMat.specularColor = new Color3(0.2, 0.2, 0.2); // Légère brillance
            //         citronMat.roughness = 0.8; // Surface moins lisse
                    
            //         mesh.material = citronMat;

            //     }
            // });
            
            this.animationGroups = result.animationGroups;

            if (this.animationGroups && this.animationGroups.length > 0) {
                //console.log("Anim dispo :");
                this.animationGroups.forEach((ag, index) => {
                    //console.log(`${index}: ${ag.name}`);
                });

                this.playAnimation("Stand");
            }

            //console.log("Citron model loaded successfully");
            this.ready = true;
        } catch (error) {
            console.error("Error loading citron model:", error);
        }
    }

        /**
         * Plays the specified animation by name.
         * @param {string} name - The name of the animation to play.
         */

        playAnimation(name) {
            if (this.currentAnimation) {
                this.currentAnimation.stop();
            }

            const animation = this.findAnimation(name);
            if (animation) {
                animation.play(true);
                this.currentAnimation = animation;
                this.state = name;
                //console.log("Animation:", name);
            } else {
                console.log("Animation not found:", name);
            }
        }

        /**
     * Trouve une animation par son nom
     * @param {string} name - Nom complet ou partiel de l'animation
     * @returns {BABYLON.AnimationGroup|null} - Le groupe d'animation ou null si non trouvé
     */
    findAnimation(name) {
        if (!this.animationGroups) return null;
        
        // Recherche exacte
        const exactMatch = this.animationGroups.find(ag => ag.name === name);
        if (exactMatch) return exactMatch;
        
        // Recherche partielle (si le nom contient la chaîne recherchée)
        const partialMatch = this.animationGroups.find(ag => 
            ag.name.toLowerCase().includes(name.toLowerCase()));
        return partialMatch || null;
    }

    /**
     * Définit l'état et joue l'animation correspondante
     * @param {string} state - L'état à définir
     */
    setState(state) {
        if (this.state !== state) {
            this.state = state;
            this.playAnimation(state);
        }
    }

    stand() {
        this.setState('Stand');
    }
    
    runBackward() {
        this.setState('Backward');
    }
    
    runForward() {
        this.setState('Run');
    }

    getMesh() {
        return this.model;
    }

    changeCitronRotation(vector) {
        this.model.rotation = vector;
    }
        /*return new Promise((resolve) => {
            SceneLoader.ImportMeshAsync("", Citron, "", scene).then((result) => {
                this.model = result.meshes[0];
                this.model.scaling = new Vector3(1, 1, 1);

                resolve(this.model);
            });
        });*/
}