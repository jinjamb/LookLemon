import { SceneLoader, KeyboardEventTypes, Vector3, SoundTrack } from "@babylonjs/core";

import tuyau from "./../assets/tuyauAngle.glb";

export class Tuyau {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.tuyaux = null;
        this.position = null;
        this.metadata = null;
    }

    playAnimation(name) {
        if (this.currentAnimation) {
            this.currentAnimation.stop();
        }

        const animation = this.findAnimation(name);
        if (animation) {
            animation.play(true);
            this.currentAnimation = animation;
            this.state = name;
            console.log("Animation:", name);
        } else {
            console.log("Animation not found:", name);
            console.log("Available animations:", this.animationGroups ? this.animationGroups.map(ag => ag.name) : "None");
        }
    }

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

    async loadModel(model, scale, position, rotation,posInit){
        this.position = position;
        this.rotation = rotation;
        this.metadata = {
            modelType: model,
            gridPosition: {
                x: Math.floor((position.x - posInit.x) / 20),
                z: Math.floor((position.z - posInit.z) / 20)
            }//on soutrais pour avoir des valeur quon peut utilisr dans la matrice
        };
        try {
            const result = await SceneLoader.ImportMeshAsync("", model, "", this.scene);
            
            const t = result.meshes[0];
            for (let mesh of result.meshes) {
                mesh.isVisible = true;
            }
            t.scaling = scale
            t.position = position;
            t.rotation = rotation;

            this.animationGroups = result.animationGroups;

            return result;
        } catch (error) {
            console.error("Erreur lors du chargement de :", model, "err: ", error);
            return { meshes: [] };
        }
    }
    async vide() {
        this.playAnimation("vide");
    }
    async plein() {
        this.playAnimation("plein");
    }
}