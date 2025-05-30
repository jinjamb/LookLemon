import { SceneLoader, MeshBuilder, Color3, StandardMaterial, Vector3 } from "@babylonjs/core";
import CitronVert from "./../assets/animations/CitronVert.glb";
import paneau from "./../assets/animations/panneau.glb";

export class Pnj {
    ready = false
    speaking = false
    isTyping = false
    available_dialogues = ['debut']
    index = 0
    name = "François-Louis-Gustave"
    state = [0, 0, 0]
    typingInterval = null;
    currentText = "";
    image = "";
    // 0: eau, 1: soleil, 2: engrais

    dialogues = {
        debut: "Hey Look Lemon, comment ça va BG? Je sais pas si t'as zieuté le citronnier juste ici mais il à l'air vlà fatigué.",
        mid: "Le citronnier a déja meilleure mine, mais il a encore besoin d'un petit coup de pouce.",
        eau: "Le citronnier doit manquer d'eau! Le lac du Nord est vide, c'est lui qui abreuve le Grand Citronnier, tu d'vrais guetter (aller voir) la citerne!",
        soleil: "J'pense que le citronnier a b'zoin de vitamine D ! J'ai cru voir quelqu'un emmener le soleil vers le labyrinthe à l'est. Je mettrai ma main à couper qu'il y est encore!",
        engrais: "Le citronnier a l'air d'avoir besoin d'engrais, mais je sais pas où en trouver. Demande à Maëlle, elle est à coté du champ de fleurs au sud-ouest.",
        fin: "Wow Look Lemon, t'as sauvé le Grand Citronnier mon pote!",
        fin1: "Look Lemon, QUEL CITRON! T'es le plus cool, t'es le plus beau, t'es le plus fort!",
        fin2: "Look Lemon, QUEL CITRON! Look Lemon, mais dis moi quel citron! Look Lemon, QUEL CITRON!",
    }

    constructor(scene) {
        this.scene = scene;
        this.collider = null;    // la sphère de collision/pick
        this.potatoMesh = null;  // le mesh importé
        this.startPosition = new Vector3(5, 1, 5);
    }
    async loadPanneau(text1, text2, text3) {
        this.collider = MeshBuilder.CreateBox("ground", { height: 30, width: 8, depth: 8 }, this.scene);
        this.collider.position = this.startPosition.clone();
        this.collider.visibility = 0;

        this.name = "Panneau tout à fait normal";
        this.dialogues = { debut: text1, milieu: text2, fin: text3 };
        this.available_dialogues = ["debut"];

        this.image = "neutralPanel.png";

        this.clickZone = MeshBuilder.CreateSphere("pnjClickZone", { diameter: 4 }, this.scene);
        this.clickZone.parent = this.collider;
        this.clickZone.position = this.startPosition.clone();
        this.clickZone.position.y = this.clickZone.position.y + 25;
        this.clickZone.position.x = this.clickZone.position.x - 5;
        this.clickZone.position.z = this.clickZone.position.z - 5;

        const clickMat = new StandardMaterial("clickZoneMat", this.scene);
        clickMat.diffuseColor = new Color3(0, 0, 0);
        clickMat.alpha = 0.3;
        this.clickZone.material = clickMat;

        try {
            const result = await SceneLoader.ImportMeshAsync("", "", paneau, this.scene);
            const root = result.meshes[0];
            root.parent = this.collider;
            root.scaling.scaleInPlace(150);
            root.isPickable = false;
            this.potatoMesh = root;

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
    async loadPnj() {
        this.collider = MeshBuilder.CreateBox("ground", { height: 30, width: 8, depth: 8 }, this.scene);
        this.collider.position = this.startPosition.clone();
        this.collider.visibility = 0;

        this.clickZone = MeshBuilder.CreateSphere("pnjClickZone", { diameter: 4 }, this.scene);
        this.clickZone.parent = this.collider;
        this.clickZone.position = this.startPosition.clone();
        this.clickZone.position.y = this.clickZone.position.y + 20;
        this.clickZone.position.x = this.clickZone.position.x - 5;
        this.clickZone.position.z = this.clickZone.position.z - 5;

        this.image = "startLime.png";

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
            console.warn(`Animation '${name}' non trouvée`);
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

    changeclickercolor(color, proxy) {
        this.clickZone.material.diffuseColor = color;
        if (!proxy) this.clickZone.material.alpha = 0.3;
        else this.clickZone.material.alpha = 0.8;
    }

    setState(state) {
        if (this.name !== "François-Louis-Gustave" || this.available_dialogues[0] == 'debut' || this.available_dialogues[0] == 'mid') {
            return
        }
        if (state[0] === 0) this.addDialog('eau')
        else this.removeDialog('eau')

        if (state[1] === 0) this.addDialog('soleil')
        else this.removeDialog('soleil')

        if (state[2] === 0) this.addDialog('engrais')
        else this.removeDialog('engrais')

        this.state = state
        let somme = state.reduce((x, y) => x + y, 0)
        if (somme == 0) {
            //this.setDefaultAnimation('Sad')
            this.image = "startLime.png";
        }
        else if (somme == 1) {
            //this.setDefaultAnimation('Mid')
            if (this.image === "startLime.png") {
                this.available_dialogues = ['mid']
                this.index = 0;
            }
            this.image = "sadLime.png";
        }
        else if (somme == 2) {
            //this.setDefaultAnimation('Mid')
            if (this.image === "sadLime.png") {
                this.available_dialogues = ['mid']
                this.index = 0;
            }
            this.image = "midLime.png";
        }
        else if (somme == 3) {
            //this.setDefaultAnimation('Happy')
            this.removeDialog('mid')
            this.addDialog('fin')
            this.addDialog('fin1')
            this.addDialog('fin2')
            this.image = "happyLime.png";
        }
    }

    //Handle dialog with the pnj
    handleDialog() {
                    console.log(this.available_dialogues);

        this.speaking = true
        this.istyping = true
        this.currentText = `${this.dialogues[this.available_dialogues[this.index]]}`
        if ((this.available_dialogues[0] == 'debut' || this.available_dialogues[0] == 'mid') && this.name === "François-Louis-Gustave") {
            this.removeDialog('debut');
            this.removeDialog('mid');
        }
        else {
            this.index = (this.index + 1) % this.available_dialogues.length;
        }
        document.getElementById("dialogContainer").style.display = 'flex';
        document.getElementById("nomPnj").innerHTML = this.name
        document.getElementById("photoHolder").style.display = 'block';
        document.getElementById("photoHolder").innerHTML = '<img src="' + this.image + '" id="photo">';
        console.log(document.getElementById("photoHolder").innerHTML);

        let i = 0;
        let string = ""
        const type = () => {
            if (i < this.currentText.length) {
                string += this.currentText.charAt(i) + this.currentText.charAt(i + 1);
                document.getElementById("dialogue").innerHTML = `${string}${'\u00A0 '.repeat((this.currentText.length - string.length) / 2)}`; // Add spaces to fill the rest of the line
                //console.log(`${this.currentText.length} - ${document.getElementById("dialogue").innerHTML.length}`);
                i += 2;
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


    endDialog() {
        if (!this.istyping || this.currentText === document.getElementById("dialogue").innerHTML) {
            this.speaking = false
            document.getElementById("dialogue").innerHTML = "";
            document.getElementById("dialogContainer").style.display = 'none';

        }
        else this.skipTyping()
    }

    removeDialog(dialog) {
        this.available_dialogues = this.available_dialogues.filter(item => item !== dialog);
    }

    addDialog(dialog) {
        if (!this.available_dialogues.includes(dialog)) this.available_dialogues.push(dialog)
    }
}