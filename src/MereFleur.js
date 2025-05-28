import { SceneLoader, Vector3, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";

import mamafleur from "./../assets/fleurs/merefleur.glb";

export class MereFleur {
    dialogue = 
    ["Essayer de passer une fois par case",
    "tu peux reessayer mais fait plus attention cette fois !\n Passe une seule fois par case",
    "Bien joué, maintenant j'ai 32 enfants a m'occuper..."];
    numDialogue = 0;
    scene = null;
    heureux = true;
    model = null;
    animationGroups = null;
    currentAnimation = null;
    track = false;
    position = new Vector3(266, 26, 78);
    reset= false;
    name= "Maelle";
    constructor(scene) {
        this.scene = scene;
    }

    //handel d'input


    async loadModel() {
        //sphere de dialogue
        this.clickZone = MeshBuilder.CreateSphere("pnjClickZone", { diameter: 4 }, this.scene);
        this.clickZone.parent = this.collider;
        this.clickZone.position = new Vector3(266, 26, 78);
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
        f.position = new Vector3(266, 26, 78);
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
        //TEXT A CHANGER 
        let text = this.dialogue[this.numDialogue];
        this.reset = true;
        this.playAnimation("standhappy");

        document.getElementById("dialogue").style.display = 'flex';
        document.getElementById("dialogue").innerHTML = ''; // Clear previous text

        //jai copier le code de calvin si ca marche pas c'est pas ma faute
        document.getElementById("nomPnj").style.display = 'flex'
        document.getElementById("nomPnj").innerHTML = this.name
        let i = 0;
        let string = ""

        const type = () => {
            if (i < text.length) {
                string += text.charAt(i);
                document.getElementById("dialogue").innerHTML = `${string}${'\u00A0'.repeat(text - i - 1)}`; // Add spaces to fill the rest of the line
                //console.log(`${this.currentText.length} - ${document.getElementById("dialogue").innerHTML.length}`);
                i++
                this.typingInterval = setTimeout(type, 5);
            }
        }
        type();
    
    }
    endDialog(){
        if (!this.istyping || this.currentText === document.getElementById("dialogue").innerHTML) {
            this.speaking = false
            document.getElementById("dialogue").innerHTML = "";
            document.getElementById("dialogue").style.display = 'none';
            document.getElementById("nomPnj").style.display = 'none'
            
        }else {
            this.istyping = false;
        }
    }
    changeNumdialogue(num) {
        this.numDialogue = num;
    }

}