import { SceneLoader, MeshBuilder, Color3, StandardMaterial, ActionManager, Vector3, ExecuteCodeAction, GUID, TextBlock } from "@babylonjs/core";
import Potato from "./../assets/animations/PotatoPNJ.glb";

export class Pnj {
    ready = false
    speaking = false
    available_dialogues = ['debut']
    name="PNJ"
    state=[0,0,0]
    // 0: eau, 1: soleil, 2: engrais

    dialogues = { 
        debut:"Hey Look Lemon, comment ça va BG? Je sais pas si t'as zieuté l'arbre juste ici mais il l'air vlà fatigué.",
        mid:"L'arbre a déja meilleure mine, mais il a encore besoin d'un petit coup de pouce.",
        eau:"Il doit manquer d'eau! Le lac du Nord est HS, c'est lui qui abreuve le Grand Arbre, tu d'vrais guetter (aller voir) la citerne!",
        soleil:"J'pense qu'il a b'zoin de vitamine D ! J'ai cru voir quelqu'un emmener le soleil vers le labyrinthe. Je mettrai ma main à couper qu'il y est encore!",
        fin: "Wow Look Lemon, t'as sauvé le Grand Arbre mon pote!",
        fin1: "Look Lemon, QUEL CITRON! T'es le plus cool, t'es le plus beau, t'es le plus fort!",
        fin2: "Look Lemon, QUEL CITRON! Mais dis moi quel citron!\nLook Lemon, QUEL CITRON! Mais dis moi quel citron!",
    }

    constructor(scene) {
        this.scene = scene;
        this.collider = null;    // la sphère de collision/pick
        this.potatoMesh = null;  // le mesh importé
        this.startPosition = new Vector3(5, 1, 5);
    }
    
    async loadPnj() {
        this.collider = MeshBuilder.CreateBox("pnjContainer", { size: 0.1 }, this.scene);
        this.collider.position = this.startPosition.clone();
        this.collider.visibility = 0;
        
        this.clickZone = MeshBuilder.CreateSphere("pnjClickZone", { diameter: 4 }, this.scene);
        this.clickZone.parent = this.collider;
        this.clickZone.position = this.startPosition.clone();
        this.clickZone.position.y = this.clickZone.position.y + 20;
        this.clickZone.position.x = this.clickZone.position.x - 5;
        this.clickZone.position.z = this.clickZone.position.z - 5;
        
        const clickMat = new StandardMaterial("clickZoneMat", this.scene);
        clickMat.diffuseColor = new Color3(0, 0, 0);
        clickMat.alpha = 0.3;
        this.clickZone.material = clickMat;
        
        try {
            const result = await SceneLoader.ImportMeshAsync("", "", Potato, this.scene);
            const root = result.meshes[0];
            root.parent = this.collider;
            root.scaling.scaleInPlace(5);
            root.isPickable = false;
            this.potatoMesh = root;

            this.animations = result.animationGroups;
            console.log(this.animations)
            if (this.animations && this.animations.length > 0) {
                this.playAnimation("Sad");
                this.ready = true
            }

        } catch (error) {
            console.error("Erreur lors du chargement du modèle:", error);
            const errorMesh = MeshBuilder.CreateSphere("errorPNJ", { diameter: 2 }, this.scene);
            errorMesh.parent = this.collider;
            const errorMat = new StandardMaterial("errorMat", this.scene);
            errorMat.diffuseColor = new Color3(1, 0, 0);
            errorMesh.material = errorMat;
        }
        
        this.model = this.collider;
        this.ready = true;
        return this.collider;
    }

    playAnimation(name, loop = true) {
        if (this.currentAnimation) {
            this.currentAnimation.stop();
        }
        const anim = this.animations.find(a => a.name === name)
        if (anim && anim !== this.currentAnimation) {
            anim.stop();
            anim.start(loop);
            this.currentAnimation = anim;
            return true;
        } else {
            console.warn(`Animation '${name}' non trouvée`);
            return false;
        }
    }

    getAnimationNames() {
        return this.animations.map(anim => anim.name);
    }

    setDefaultAnimation(name) {
        this.defaultAnimation = name;
        return this.playAnimation(name);
    }

    changeclickercolor(color, proxy){
        this.clickZone.material.diffuseColor = color;
        if (!proxy) this.clickZone.material.alpha = 0.3;
        else this.clickZone.material.alpha = 0.8;
    }

    setState(state) { // y aura jamais 0 0 0 a part au debut donc le 'x <= 2' marche tjrs
        if (state[0]===0){
            this.addDialog('eau')
        }
        else {
            this.removeDialog('eau')
        }
        if (state[1]===0){
            this.addDialog('soleil')
        }
        else {
            this.removeDialog('soleil')
        }/*
        if (state[2]===0){
            this.addDialog('engrais')
        }
        else {
            this.removeDialog('engrais')
        }
        this.state = state*/
        let somme = state.reduce((x, y) => x + y, 0)
        if (somme !== 0){
            this.removeDialog('debut')
        }

        if ( somme == 1){ // a passer a 2 pour le vrai jeu
            this.playAnimation("Mid")
            this.addDialog('mid')
            console.log("Pnj partiellement heureux")
        }
        else if (somme == 2){ // a passer a 3 pour le vrai jeu
            this.playAnimation("Happy")
            this.removeDialog('mid')
            this.addDialog('fin')
            this.addDialog('fin1')
            this.addDialog('fin2')
        }
    }

    //Handle dialog with the pnj
    handleDialog() {
        console.log(this.available_dialogues)
        this.speaking = true
        let random_text = Math.floor(Math.random() * (this.available_dialogues.length))
        
        console.log("random_text", random_text)
        document.getElementById("dialogue").innerHTML = "Bro Tato: "+this.dialogues[this.available_dialogues[random_text]]
        document.getElementById("dialogue").style.display = 'block'
    }

    name(newName){
        this.name = newName;
    }

    endDialog(){
        this.speaking = false
        document.getElementById("dialogue").innerHTML = ""
        document.getElementById("dialogue").style.display = 'none'
    }

    removeDialog(dialog){
        this.available_dialogues = this.available_dialogues.filter(item => item !== dialog);
    }

    addDialog(dialog){
        if (!this.available_dialogues.includes(dialog)) this.available_dialogues.push(dialog)
    }
}