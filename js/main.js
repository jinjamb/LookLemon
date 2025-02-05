import "@babylonjs/loaders";
import HavokPhysics from "@babylonjs/havok";
import { Engine, Scene, Vector3, FreeCamera, HemisphericLight, MeshBuilder } from "@babylonjs/core";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import { PhysicsAggregate, PhysicsShapeType } from "@babylonjs/core/Physics/v2";
async function startGame() {
    const canvas = document.querySelector("#myCanvas");
    const engine = new Engine(canvas, true);

    const scene = new Scene(engine);
    //

    // Enable physics
    const havokInstance = await HavokPhysics();
    scene.enablePhysics(new Vector3(0, -9.81, 0), new HavokPlugin(true, havokInstance));



    // Create a camera
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    // Create a light
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


    const ground = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);
    new PhysicsAggregate(ground, PhysicsShapeType.BOX, { mass: 0 }, scene);

    const wallThickness = 1;
    const wallHeight = 10;

    const wall1 = MeshBuilder.CreateBox("wall1", { width: 100, height: wallHeight, depth: wallThickness }, this.scene);
    wall1.position.set(0, wallHeight / 2, -50);

    new PhysicsAggregate(wall1, PhysicsShapeType.BOX, { mass: 0 }, this.scene);

    const wall2 = MeshBuilder.CreateBox("wall2", { width: 100, height: wallHeight, depth: wallThickness }, this.scene);
    wall2.position.set(0, wallHeight / 2, 50);
    new PhysicsAggregate(wall2, PhysicsShapeType.BOX, { mass: 0 }, this.scene);

    const wall3 = MeshBuilder.CreateBox("wall3", { width: wallThickness, height: wallHeight, depth: 100 }, this.scene);
    wall3.position.set(-50, wallHeight / 2, 0);
    new PhysicsAggregate(wall3, PhysicsShapeType.BOX, { mass: 0 }, this.scene);

    const wall4 = MeshBuilder.CreateBox("wall4", { width: wallThickness, height: wallHeight, depth: 100 }, this.scene);
    wall4.position.set(50, wallHeight / 2, 0);
    new PhysicsAggregate(wall4, PhysicsShapeType.BOX, { mass: 0 }, this.scene);




    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
    sphere.position.y = 5;

    spherePhysics = new PhysicsAggregate(sphere, PhysicsShapeType.SPHERE, { mass: 1 }, scene);

    // Add keyboard controls
    window.addEventListener("keydown", (event) => {
        const forceMagnitude = 10;
        switch (event.key) {
            case "w":
                spherePhysics.body.applyImpulse(new Vector3(0, 0, -forceMagnitude), sphere.getAbsolutePosition());
                break;
            case "s":
                spherePhysics.body.applyImpulse(new Vector3(0, 0, forceMagnitude), sphere.getAbsolutePosition());
                break;
            case "a":
                spherePhysics.body.applyImpulse(new Vector3(-forceMagnitude, 0, 0), sphere.getAbsolutePosition());
                break;
            case "d":
                spherePhysics.body.applyImpulse(new Vector3(forceMagnitude, 0, 0), sphere.getAbsolutePosition());
                break;
        }
    });
    // Main animation loop
    engine.runRenderLoop(() => {
        scene.render();
    });

    // Resize event
    window.addEventListener("resize", () => {
        engine.resize();
    });
}

window.onload = startGame;