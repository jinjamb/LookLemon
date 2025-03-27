import { SceneLoader, Vector3, PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core";
import Citron from "./../assets/CoolLemon.glb";

export class CitronModel {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.citronphy = null;
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
            this.model.scaling = new Vector3(5, 5, 5);
            this.model.position = new Vector3(0, 0, 3);
            this.model.rotation = new Vector3(0, -4, 0);

            console.log("Citron model loaded successfully");
        } catch (error) {
            console.error("Error loading citron model:", error);
        }

        /*return new Promise((resolve) => {
            SceneLoader.ImportMeshAsync("", Citron, "", scene).then((result) => {
                this.model = result.meshes[0];
                this.model.scaling = new Vector3(1, 1, 1);

                resolve(this.model);
            });
        });*/
    }

    getMesh() {
        return this.model;
    }
}