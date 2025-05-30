import { SceneLoader, Vector3, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";

import mamafleur from "./../assets/fleurs/merefleur.glb";

export class MereFleur {
    dialogue = 
    ["T'as besoin de l'engrais? Okay mais à une condition: fais pousser mes enfants en passant une seule fois sur chaque case du champ. d'accord?",
    "Tu as écrasé mes enfants ! Recommence maintenant ! ET DEPUIS LE DÉBUT !",
    "Prends cet engrais, je n'en ai plus besoin maintenant que j'ai 32 enfants à gérer..."];
    // 32 pas 36 c'est 6*6 -4
    // My bad frerot j'ai cru que les pièces étaient adoptées
    numDialogue = 0;
    scene = null;
    heureux = true;
    model = null;
    animationGroups = null;
    currentAnimation = null;
    track = false;
    typingInterval = null;
    image = "neutralFlower.png";
    position = new Vector3(266, 26, 78);
    reset= false;
    name= "Maëlle";
    currentText = "";
    constructor(scene) {
        this.scene = scene;
    }

    //handel d'input


    async loadModel() {
        //sphere de dialogue
        this.clickZone = MeshBuilder.CreateSphere("pnjClickZone", { diameter: 4 }, this.scene);
        this.clickZone.parent = this.collider;
        this.clickZone.position = new Vector3(230, 26, 71);
        this.clickZone.position.y = this.clickZone.position.y + 40;
        this.clickZone.position.x = this.clickZone.position.x - 5;
        this.clickZone.position.z = this.clickZone.position.z - 5;

        const clickMat = new StandardMaterial("clickZoneMat", this.scene);
        clickMat.diffuseColor = new Color3(0, 0, 0);
        clickMat.alpha = 0.3;
        this.clickZone.material = clickMat;

        const result = await SceneLoader.ImportMeshAsync("", mamafleur, "", this.scene);
        this.model = result.meshes[0];
        const f = result.meshes[0];
        for (let mesh of result.meshes) {
            mesh.isVisible = true;
        }
        f.scaling = new Vector3(40, 40, 40);
        f.position = new Vector3(230, 26, 71);
        f.rotation = new Vector3(0, 3 / 4 * Math.PI + Math.PI, 0);

        this.animationGroups = result.animationGroups;
        this.playAnimation("standhappy");
    }

    changeclickercolor(color, proxy){
        this.clickZone.material.diffuseColor = color;
        if (!proxy) this.clickZone.material.alpha = 0.3;
        else this.clickZone.material.alpha = 0.8;
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
            //console.log("Animation:", name);
        } else {
            console.warn("Animation not found:", name);
            //console.log("Animation not found:", name);
            //console.log("Available animations:", this.animationGroups ? this.animationGroups.map(ag => ag.name) : "None");
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

    notHappy() {
        this.heureux = false;
        this.playAnimation("nothappy");
        //apres 1s on repasse sur stading mais en nothappy
        setTimeout(() => {
            this.playAnimation("standnothappy");
        }, 800);
    }
    handleDialog() {
        this.speaking = true
        this.istyping = true
        this.currentText = this.dialogue[this.numDialogue];
        this.reset = true;
        this.playAnimation("standhappy");

        document.getElementById("photoHolder").innerHTML = '<img src="'+this.image+'" id="photo">';

        //jai copier le code de calvin si ca marche pas c'est pas ma faute
        document.getElementById("dialogContainer").style.display = 'flex';
        document.getElementById("nomPnj").innerHTML = this.name
        document.getElementById("photoHolder").style.display = 'block';
        let i = 0;
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
            document.getElementById("dialogue").innerHTML = "";
            document.getElementById("dialogContainer").style.display = 'none';
        }      
        else this.skipTyping()
    }
    
    changeNumdialogue(num) {
        if (num === 2 && this.numDialogue !== 2) {
            document.getElementById("photoHolder").innerHTML = '<img src="happyFlower.png" id="photo">';
            this.image = "happyFlower.png";
        }
        else if (num === 1 && this.numDialogue !== 1) {
            document.getElementById("photoHolder").innerHTML = '<img src="angryFlower.png" id="photo">';
            this.image = "angryFlower.png";
        }
        this.numDialogue = num;
    }

}