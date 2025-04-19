import { NodeRenderGraphBlock } from "@babylonjs/core/FrameGraph/Node/nodeRenderGraphBlock.js";
import { AdvancedDynamicTexture } from "../advancedDynamicTexture.js";
import { NodeRenderGraphBlockConnectionPointTypes } from "@babylonjs/core/FrameGraph/Node/Types/nodeRenderGraphTypes.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { FrameGraphGUITask } from "./guiTask.js";
/**
 * Block that implements a fullscreen GUI for render graph
 */
export class NodeRenderGraphGUIBlock extends NodeRenderGraphBlock {
    /**
     * Gets the frame graph task associated with this block
     */
    get task() {
        return this._frameGraphTask;
    }
    /**
     * Gets the GUI texture used by this block
     */
    get gui() {
        return this._frameGraphTask.gui;
    }
    /**
     * Create a new NodeRenderGraphGUIBlock
     * @param name defines the block name
     * @param frameGraph defines the hosting frame graph
     * @param scene defines the hosting scene
     */
    constructor(name, frameGraph, scene) {
        super(name, frameGraph, scene);
        this.registerInput("target", NodeRenderGraphBlockConnectionPointTypes.Texture);
        this._addDependenciesInput();
        this.registerOutput("output", NodeRenderGraphBlockConnectionPointTypes.BasedOnInput);
        this.target.addAcceptedConnectionPointTypes(NodeRenderGraphBlockConnectionPointTypes.TextureAll);
        this.output._typeConnectionSource = this.target;
        this._gui = AdvancedDynamicTexture.CreateFullscreenUI(this.name, undefined, {
            useStandalone: true,
        });
        this._frameGraphTask = new FrameGraphGUITask(this.name, frameGraph, this._gui);
    }
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName() {
        return "GUI.NodeRenderGraphGUIBlock";
    }
    /**
     * Gets the target input component
     */
    get target() {
        return this._inputs[0];
    }
    /**
     * Gets the output component
     */
    get output() {
        return this._outputs[0];
    }
    _buildBlock(state) {
        super._buildBlock(state);
        this.output.value = this._frameGraphTask.outputTexture; // the value of the output connection point is the "output" texture of the task
        this._frameGraphTask.targetTexture = this.target.connectedPoint?.value;
    }
}
RegisterClass("BABYLON.GUI.NodeRenderGraphGUIBlock", NodeRenderGraphGUIBlock);
//# sourceMappingURL=renderGraphGUIBlock.js.map