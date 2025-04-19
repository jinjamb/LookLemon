import { SceneLoader, MeshBuilder, Color3, StandardMaterial, ActionManager, Vector3, ExecuteCodeAction, GUID, TextBlock } from "@babylonjs/core";
import Potato from "./../assets/animations/PotatoPNJ.glb";

export class Pnj {

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
        this.clickZone.isPickable = true;
        this.clickZone.position = this.startPosition.clone();
        this.clickZone.position.y = this.clickZone.position.y + 20;
        this.clickZone.position.x = this.clickZone.position.x - 5;
        this.clickZone.position.z = this.clickZone.position.z - 5;
        this.clickZone.checkCollisions = true;
        
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
            if (this.animations && this.animations.length > 0) {
                this.playAnimation("Sad");
            }

        } catch (error) {
            console.error("Erreur lors du chargement du modèle:", error);
            const errorMesh = MeshBuilder.CreateSphere("errorPNJ", { diameter: 2 }, this.scene);
            errorMesh.parent = this.collider;
            const errorMat = new StandardMaterial("errorMat", this.scene);
            errorMat.diffuseColor = new Color3(1, 0, 0);
            errorMesh.material = errorMat;
        }
        
        this.clickZone.actionManager = new ActionManager(this.scene);
        this.clickZone.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnPickTrigger,
                },
                () => {
                        this.handleDialog();
                    }
            )
        );
        
        this.model = this.collider;
        return this.collider;
    }

    playAnimation(name, loop = true) {
        if (this.currentAnimation) {
            this.currentAnimation.stop();
        }
        const anim = this.animations.find(a => a.name === name)
        if (anim) {
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

    //Handle dialog with the pnj
    handleDialog() {
        console.log("Dialog with PNJ started");
    }
}