import { GLTFLoaderExtension } from "./glTFLoader.js";
import type { IGLTFRuntime } from "./glTFLoaderInterfaces.js";
import { Material } from "@babylonjs/core/Materials/material.js";
/**
 * @internal
 * @deprecated
 */
export declare class GLTFMaterialsCommonExtension extends GLTFLoaderExtension {
    constructor();
    loadRuntimeExtensionsAsync(gltfRuntime: IGLTFRuntime): boolean;
    loadMaterialAsync(gltfRuntime: IGLTFRuntime, id: string, onSuccess: (material: Material) => void, onError: (message: string) => void): boolean;
    private _loadTexture;
}
