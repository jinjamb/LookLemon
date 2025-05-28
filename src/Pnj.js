import { SceneLoader, MeshBuilder, Color3, StandardMaterial, ActionManager, Vector3, ExecuteCodeAction, GUID, TextBlock } from "@babylonjs/core";
import CitronVert from "./../assets/animations/CitronVert.glb";

export class Pnj {
    ready = false
    speaking = false
    isTyping = false
    available_dialogues = ['debut']
    name="François-Louis-Gustave"
    state=[0,0,0]
    typingInterval = null;
    currentText = "";
    // 0: eau, 1: soleil, 2: engrais

    dialogues = { 
        debut:"Hey Look Lemon, comment ça va BG? Je sais pas si t'as zieuté l'arbre juste ici mais il l'air vlà fatigué.",
        mid:"L'arbre a déja meilleure mine, mais il a encore besoin d'un petit coup de pouce.",
        eau:"Il doit manquer d'eau! Le lac du Nord est HS, c'est lui qui abreuve le Grand Arbre,\ntu d'vrais guetter (aller voir) la citerne!",
        soleil:"J'pense qu'il a b'zoin de vitamine D ! J'ai cru voir quelqu'un emmener le soleil vers le labyrinthe.\n Je mettrai ma main à couper qu'il y est encore!",
        engrais:"Il a l'air d'avoir besoin d'engrais, mais je sais pas où en trouver.\nPeut-être que tu devrais aller fouiller le champ de fleurs.",
        fin: "Wow Look Lemon, t'as sauvé le Grand Arbre mon pote!",
        fin1: "Look Lemon, QUEL CITRON! T'es le plus cool, t'es le plus beau, t'es le plus fort!",
        fin2: "Look Lemon, QUEL CITRON! Mais dis moi quel citron!\nLook Lemon, QUEL CITRON! Mais dis moi quel citron!",
        fleurNeutre:"Salut, Look Lemon, t'as besoin de mon engrais pour aider l'arbre?<br>Je peux t'aider à une condition, tu vois le champs de fleurs derrière moi?<br>Il manque cruellement de fleurset j'aimerais que tu le fleurisse pour moi.",
        fleurVenere:"BAH ALORS LOOK LEMON! TU AS ÉCRASÉ MES ENFANTS! RECCOMMENCE MAINTENANT!",
        fleurHappy:"Merci Look Lemon, tu as fait un super boulot! Tu peux prendre l'engrais maintenant.",
        fleurfin:"Look Lemon, QUEL CITRON! Mais dis moi quel citron!\nLook Lemon, QUEL CITRON! Mais dis moi quel citron!",
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
            const result = await SceneLoader.ImportMeshAsync("", "", CitronVert, this.scene);
            const root = result.meshes[0];
            root.parent = this.collider;
            root.scaling.scaleInPlace(40);
            root.isPickable = false;
            this.potatoMesh = root;

            this.animations = result.animationGroups;
            if (this.animations && this.animations.length > 0) {
                this.playAnimation("stand");
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
            anim.start(loop);
            this.currentAnimation = anim;
            return true;
        } else {
            //console.warn(`Animation '${name}' non trouvée`);
            //console.log("Available animations:", this.animations ? this.animations.map(ag => ag.name) : "None");
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
        if (state[0]===0) this.addDialog('eau')
        else this.removeDialog('eau')

        if (state[1]===0) this.addDialog('soleil')
        else this.removeDialog('soleil')

        if (state[2]===0) this.addDialog('engrais')
        else {
            //console.log("engrais non dispo")
            this.removeDialog('engrais')
        }
        this.state = state
        let somme = state.reduce((x, y) => x + y, 0)
        if (somme !== 0){
            this.removeDialog('debut')
        }

        if ( somme == 1){ // a passer a 2 pour le vrai jeu
            //this.setDefaultAnimation('Mid')
            this.addDialog('mid')
        }
        else if (somme == 2){ // a passer a 3 pour le vrai jeu
            //this.setDefaultAnimation('Happy')
            this.removeDialog('mid')
            this.addDialog('fin')
            this.addDialog('fin1')
            this.addDialog('fin2')
        }
    }

    //Handle dialog with the pnj
    handleDialog() {
        this.speaking = true
        this.istyping = true
        let random_text = Math.floor(Math.random() * (this.available_dialogues.length))
        this.currentText = `${this.dialogues[this.available_dialogues[random_text]]}`

        document.getElementById("dialogue").style.display = 'flex'
        document.getElementById("nomPnj").style.display = 'flex'

        let i = 0;
        document.getElementById("dialogue").innerHTML = ''; // Clear previous text
        document.getElementById("nomPnj").innerHTML = this.name

        let string = ""

        const type = () => {
            if (i < this.currentText.length) {
                string += this.currentText.charAt(i) + this.currentText.charAt(i + 1);
                document.getElementById("dialogue").innerHTML = `${string}${'\u00A0 '.repeat((this.currentText.length - string.length)/2)}`; // Add spaces to fill the rest of the line
                //console.log(`${this.currentText.length} - ${document.getElementById("dialogue").innerHTML.length}`);
                i+=2
                this.typingInterval = setTimeout(type, 5);
            }
        }
        console.log('')
        type();
    }

    skipTyping() {
            clearTimeout(this.typingInterval);        
            document.getElementById("dialogue").innerHTML = this.currentText;             
            this.istyping = false;
    }


    endDialog(){
        if (!this.istyping || this.currentText === document.getElementById("dialogue").innerHTML) {
            this.speaking = false
            document.getElementById("dialogue").style.display = 'none'
            document.getElementById("nomPnj").style.display = 'none'
        }
        else this.skipTyping()
    }

    removeDialog(dialog){
        this.available_dialogues = this.available_dialogues.filter(item => item !== dialog);
    }

    addDialog(dialog){
        if (!this.available_dialogues.includes(dialog)) this.available_dialogues.push(dialog)
    }
}