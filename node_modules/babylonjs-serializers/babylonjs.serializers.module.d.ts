
declare module "babylonjs-serializers/index" {
export * from "babylonjs-serializers/OBJ/index";
export * from "babylonjs-serializers/glTF/index";
export * from "babylonjs-serializers/stl/index";
export * from "babylonjs-serializers/USDZ/index";

}
declare module "babylonjs-serializers/stl/stlSerializer" {
import { Mesh } from "babylonjs/Meshes/mesh";
import { InstancedMesh } from "babylonjs/Meshes/instancedMesh";
/**
 * Class for generating STL data from a Babylon scene.
 */
export class STLExport {
    /**
     * Exports the geometry of a Mesh array in .STL file format (ASCII)
     * @param meshes list defines the mesh to serialize
     * @param download triggers the automatic download of the file.
     * @param fileName changes the downloads fileName.
     * @param binary changes the STL to a binary type.
     * @param isLittleEndian toggle for binary type exporter.
     * @param doNotBakeTransform toggle if meshes transforms should be baked or not.
     * @param supportInstancedMeshes toggle to export instanced Meshes. Enabling support for instanced meshes will override doNoBakeTransform as true
     * @param exportIndividualMeshes toggle to export each mesh as an independent mesh. By default, all the meshes are combined into one mesh. This property has no effect when exporting in binary format
     * @returns the STL as UTF8 string
     */
    static CreateSTL(meshes: (Mesh | InstancedMesh)[], download?: boolean, fileName?: string, binary?: boolean, isLittleEndian?: boolean, doNotBakeTransform?: boolean, supportInstancedMeshes?: boolean, exportIndividualMeshes?: boolean): any;
}

}
declare module "babylonjs-serializers/stl/index" {
export * from "babylonjs-serializers/stl/stlSerializer";

}
declare module "babylonjs-serializers/glTF/index" {
export * from "babylonjs-serializers/glTF/glTFFileExporter";
export * from "babylonjs-serializers/glTF/2.0/index";

}
declare module "babylonjs-serializers/glTF/glTFFileExporter" {
/** @internal */
export var __IGLTFExporterExtension: number;
/**
 * Interface for extending the exporter
 * @internal
 */
export interface IGLTFExporterExtension {
    /**
     * The name of this extension
     */
    readonly name: string;
    /**
     * Defines whether this extension is enabled
     */
    enabled: boolean;
    /**
     * Defines whether this extension is required
     */
    required: boolean;
}

}
declare module "babylonjs-serializers/glTF/2.0/index" {
export * from "babylonjs-serializers/glTF/2.0/glTFData";
export * from "babylonjs-serializers/glTF/2.0/glTFSerializer";
export { _SolveMetallic, _ConvertToGLTFPBRMetallicRoughness } from "babylonjs-serializers/glTF/2.0/glTFMaterialExporter";

}
declare module "babylonjs-serializers/glTF/2.0/glTFUtilities" {
import { INode } from "babylonjs-gltf2interface";
import { AccessorType, MeshPrimitiveMode } from "babylonjs-gltf2interface";
import { FloatArray, DataArray, IndicesArray } from "babylonjs/types";
import { Vector4 } from "babylonjs/Maths/math.vector";
import { Quaternion, Vector3 } from "babylonjs/Maths/math.vector";
import { VertexBuffer } from "babylonjs/Buffers/buffer";
import { Node } from "babylonjs/node";
export function GetAccessorElementCount(accessorType: AccessorType): number;
export function FloatsNeed16BitInteger(floatArray: FloatArray): boolean;
export function IsStandardVertexAttribute(type: string): boolean;
export function GetAccessorType(kind: string, hasVertexColorAlpha: boolean): AccessorType;
export function GetAttributeType(kind: string): string;
export function GetPrimitiveMode(fillMode: number): MeshPrimitiveMode;
export function IsTriangleFillMode(fillMode: number): boolean;
export function NormalizeTangent(tangent: Vector4 | Vector3): void;
export function ConvertToRightHandedPosition(value: Vector3): Vector3;
export function ConvertToRightHandedRotation(value: Quaternion): Quaternion;
export function ConvertToRightHandedNode(value: INode): void;
/**
 * Rotation by 180 as glTF has a different convention than Babylon.
 * @param rotation Target camera rotation.
 * @returns Ref to camera rotation.
 */
export function ConvertCameraRotationToGLTF(rotation: Quaternion): Quaternion;
export function RotateNode180Y(node: INode): void;
/**
 * Collapses GLTF parent and node into a single node. This is useful for removing nodes that were added by the GLTF importer.
 * @param node Target parent node.
 * @param parentNode Original GLTF node (Light or Camera).
 */
export function CollapseParentNode(node: INode, parentNode: INode): void;
/**
 * Sometimes the GLTF Importer can add extra transform nodes (for lights and cameras). This checks if a parent node was added by the GLTF Importer. If so, it should be removed during serialization.
 * @param babylonNode Original GLTF node (Light or Camera).
 * @param parentBabylonNode Target parent node.
 * @returns True if the parent node was added by the GLTF importer.
 */
export function IsParentAddedByImporter(babylonNode: Node, parentBabylonNode: Node): boolean;
export function IsNoopNode(node: Node, useRightHandedSystem: boolean): boolean;
/**
 * Converts an IndicesArray into either Uint32Array or Uint16Array, only copying if the data is number[].
 * @param indices input array to be converted
 * @param start starting index to copy from
 * @param count number of indices to copy
 * @returns a Uint32Array or Uint16Array
 * @internal
 */
export function IndicesArrayToTypedArray(indices: IndicesArray, start: number, count: number, is32Bits: boolean): Uint32Array | Uint16Array;
export function DataArrayToUint8Array(data: DataArray): Uint8Array;
export function GetMinMax(data: DataArray, vertexBuffer: VertexBuffer, start: number, count: number): {
    min: number[];
    max: number[];
};
/**
 * Removes, in-place, object properties which have the same value as the default value.
 * Useful for avoiding unnecessary properties in the glTF JSON.
 * @param object the object to omit default values from
 * @param defaultValues a partial object with default values
 * @returns object with default values omitted
 */
export function OmitDefaultValues<T extends Object>(object: T, defaultValues: Partial<T>): T;

}
declare module "babylonjs-serializers/glTF/2.0/glTFSerializer" {
import { Node } from "babylonjs/node";
import { Scene } from "babylonjs/scene";
import { Animation } from "babylonjs/Animations/animation";
import { GLTFData } from "babylonjs-serializers/glTF/2.0/glTFData";
/**
 * Mesh compression methods.
 */
export type MeshCompressionMethod = "None" | "Draco";
/**
 * Holds a collection of exporter options and parameters
 */
export interface IExportOptions {
    /**
     * Function which indicates whether a babylon node should be exported or not
     * @param node source Babylon node. It is used to check whether it should be exported to glTF or not
     * @returns boolean, which indicates whether the node should be exported (true) or not (false)
     */
    shouldExportNode?(node: Node): boolean;
    /**
     * Function which indicates whether an animation on the scene should be exported or not
     * @param animation source animation
     * @returns boolean, which indicates whether the animation should be exported (true) or not (false)
     */
    shouldExportAnimation?(animation: Animation): boolean;
    /**
     * Function used to extract the part of node's metadata that will be exported into glTF node extras
     * @param metadata source metadata to read from
     * @returns the data to store to glTF node extras
     */
    metadataSelector?(metadata: any): any;
    /**
     * The sample rate to bake animation curves. Defaults to 1 / 60.
     */
    animationSampleRate?: number;
    /**
     * Begin serialization without waiting for the scene to be ready. Defaults to false.
     */
    exportWithoutWaitingForScene?: boolean;
    /**
     * Indicates if unused vertex uv attributes should be included in export. Defaults to false.
     */
    exportUnusedUVs?: boolean;
    /**
     * Remove no-op root nodes when possible. Defaults to true.
     */
    removeNoopRootNodes?: boolean;
    /**
     * Indicates if coordinate system swapping root nodes should be included in export. Defaults to false.
     * @deprecated Please use removeNoopRootNodes instead
     */
    includeCoordinateSystemConversionNodes?: boolean;
    /**
     * Indicates what compression method to apply to mesh data.
     */
    meshCompressionMethod?: MeshCompressionMethod;
}
/**
 * Class for generating glTF data from a Babylon scene.
 */
export class GLTF2Export {
    /**
     * Exports the scene to .gltf file format
     * @param scene Babylon scene
     * @param fileName Name to use for the .gltf file
     * @param options Exporter options
     * @returns Returns the exported data
     */
    static GLTFAsync(scene: Scene, fileName: string, options?: IExportOptions): Promise<GLTFData>;
    /**
     * Exports the scene to .glb file format
     * @param scene Babylon scene
     * @param fileName Name to use for the .glb file
     * @param options Exporter options
     * @returns Returns the exported data
     */
    static GLBAsync(scene: Scene, fileName: string, options?: IExportOptions): Promise<GLTFData>;
}

}
declare module "babylonjs-serializers/glTF/2.0/glTFMorphTargetsUtilities" {
import { IBufferView, IAccessor } from "babylonjs-gltf2interface";
import { MorphTarget } from "babylonjs/Morph/morphTarget";
import { BufferManager } from "babylonjs-serializers/glTF/2.0/bufferManager";
import { Mesh } from "babylonjs/Meshes/mesh";
/**
 * Interface to store morph target information.
 * @internal
 */
export interface IMorphTargetData {
    attributes: Record<string, number>;
    influence: number;
    name: string;
}
export function BuildMorphTargetBuffers(morphTarget: MorphTarget, mesh: Mesh, bufferManager: BufferManager, bufferViews: IBufferView[], accessors: IAccessor[], convertToRightHanded: boolean): IMorphTargetData;

}
declare module "babylonjs-serializers/glTF/2.0/glTFMaterialExporter" {
import { ITextureInfo, IMaterialPbrMetallicRoughness } from "babylonjs-gltf2interface";
import { ImageMimeType } from "babylonjs-gltf2interface";
import { Nullable } from "babylonjs/types";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { StandardMaterial } from "babylonjs/Materials/standardMaterial";
import { PBRBaseMaterial } from "babylonjs/Materials/PBR/pbrBaseMaterial";
/**
 * Computes the metallic factor from specular glossiness values.
 * @param diffuse diffused value
 * @param specular specular value
 * @param oneMinusSpecularStrength one minus the specular strength
 * @returns metallic value
 * @internal
 */
export function _SolveMetallic(diffuse: number, specular: number, oneMinusSpecularStrength: number): number;
/**
 * Computes the metallic/roughness factors from a Standard Material.
 * @internal
 */
export function _ConvertToGLTFPBRMetallicRoughness(babylonStandardMaterial: StandardMaterial): IMaterialPbrMetallicRoughness;
/**
 * Utility methods for working with glTF material conversion properties.
 * @internal
 */
export class GLTFMaterialExporter {
    private readonly _exporter;
    private _textureMap;
    private _internalTextureToImage;
    constructor(_exporter: GLTFExporter);
    getTextureInfo(babylonTexture: Nullable<BaseTexture>): Nullable<ITextureInfo>;
    exportStandardMaterialAsync(babylonStandardMaterial: StandardMaterial, mimeType: ImageMimeType, hasUVs: boolean): Promise<number>;
    private _finishMaterialAsync;
    private _getImageDataAsync;
    /**
     * Resizes the two source textures to the same dimensions.  If a texture is null, a default white texture is generated.  If both textures are null, returns null
     * @param texture1 first texture to resize
     * @param texture2 second texture to resize
     * @param scene babylonjs scene
     * @returns resized textures or null
     */
    private _resizeTexturesToSameDimensions;
    /**
     * Convert Specular Glossiness Textures to Metallic Roughness
     * See link below for info on the material conversions from PBR Metallic/Roughness and Specular/Glossiness
     * @see https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/examples/convert-between-workflows-bjs/js/babylon.pbrUtilities.js
     * @param diffuseTexture texture used to store diffuse information
     * @param specularGlossinessTexture texture used to store specular and glossiness information
     * @param factors specular glossiness material factors
     * @param mimeType the mime type to use for the texture
     * @returns pbr metallic roughness interface or null
     */
    private _convertSpecularGlossinessTexturesToMetallicRoughnessAsync;
    /**
     * Converts specular glossiness material properties to metallic roughness
     * @param specularGlossiness interface with specular glossiness material properties
     * @returns interface with metallic roughness material properties
     */
    private _convertSpecularGlossinessToMetallicRoughness;
    /**
     * Calculates the surface reflectance, independent of lighting conditions
     * @param color Color source to calculate brightness from
     * @returns number representing the perceived brightness, or zero if color is undefined
     */
    private _getPerceivedBrightness;
    /**
     * Returns the maximum color component value
     * @param color
     * @returns maximum color component value, or zero if color is null or undefined
     */
    private _getMaxComponent;
    /**
     * Convert a PBRMaterial (Metallic/Roughness) to Metallic Roughness factors
     * @param babylonPBRMaterial BJS PBR Metallic Roughness Material
     * @param mimeType mime type to use for the textures
     * @param glTFPbrMetallicRoughness glTF PBR Metallic Roughness interface
     * @param hasUVs specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns glTF PBR Metallic Roughness factors
     */
    private _convertMetalRoughFactorsToMetallicRoughnessAsync;
    private _getTextureSampler;
    private _getGLTFTextureWrapMode;
    /**
     * Convert a PBRMaterial (Specular/Glossiness) to Metallic Roughness factors
     * @param babylonPBRMaterial BJS PBR Metallic Roughness Material
     * @param mimeType mime type to use for the textures
     * @param pbrMetallicRoughness glTF PBR Metallic Roughness interface
     * @param hasUVs specifies if texture coordinates are present on the submesh to determine if textures should be applied
     * @returns glTF PBR Metallic Roughness factors
     */
    private _convertSpecGlossFactorsToMetallicRoughnessAsync;
    exportPBRMaterialAsync(babylonPBRMaterial: PBRBaseMaterial, mimeType: ImageMimeType, hasUVs: boolean): Promise<number>;
    private _setMetallicRoughnessPbrMaterialAsync;
    private _getPixelsFromTexture;
    exportTextureAsync(babylonTexture: BaseTexture, mimeType: ImageMimeType): Promise<Nullable<ITextureInfo>>;
    private _exportTextureInfoAsync;
    private _exportImage;
    private _exportTextureInfo;
    private _exportTextureSampler;
}

}
declare module "babylonjs-serializers/glTF/2.0/glTFExporterExtension" {
import { ImageMimeType, IMeshPrimitive, INode, IMaterial, ITextureInfo, IAccessor } from "babylonjs-gltf2interface";
import { Node } from "babylonjs/node";
import { Nullable } from "babylonjs/types";
import { Texture } from "babylonjs/Materials/Textures/texture";
import { IDisposable } from "babylonjs/scene";
import { IGLTFExporterExtension } from "babylonjs-serializers/glTF/glTFFileExporter";
import { Material } from "babylonjs/Materials/material";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { BufferManager } from "babylonjs-serializers/glTF/2.0/bufferManager";
/** @internal */
export var __IGLTFExporterExtensionV2: number;
/**
 * Interface for a glTF exporter extension
 * @internal
 */
export interface IGLTFExporterExtensionV2 extends IGLTFExporterExtension, IDisposable {
    /**
     * Define this method to modify the default behavior before exporting a texture
     * @param context The context when loading the asset
     * @param babylonTexture The Babylon.js texture
     * @param mimeType The mime-type of the generated image
     * @returns A promise that resolves with the exported texture
     */
    preExportTextureAsync?(context: string, babylonTexture: Texture, mimeType: ImageMimeType): Promise<Nullable<Texture>>;
    /**
     * Define this method to get notified when a texture info is created
     * @param context The context when loading the asset
     * @param textureInfo The glTF texture info
     * @param babylonTexture The Babylon.js texture
     */
    postExportTexture?(context: string, textureInfo: ITextureInfo, babylonTexture: BaseTexture): void;
    /**
     * Define this method to get notified when a primitive is created
     * @param primitive glTF mesh primitive
     * @param bufferManager Buffer manager
     * @param accessors List of glTF accessors
     */
    postExportMeshPrimitive?(primitive: IMeshPrimitive, bufferManager: BufferManager, accessors: IAccessor[]): void;
    /**
     * Define this method to modify the default behavior when exporting a node
     * @param context The context when exporting the node
     * @param node glTF node
     * @param babylonNode BabylonJS node
     * @param nodeMap Current node mapping of babylon node to glTF node index. Useful for combining nodes together.
     * @param convertToRightHanded Flag indicating whether to convert values to right-handed
     * @param bufferManager Buffer manager
     * @returns nullable INode promise
     */
    postExportNodeAsync?(context: string, node: INode, babylonNode: Node, nodeMap: Map<Node, number>, convertToRightHanded: boolean, bufferManager: BufferManager): Promise<Nullable<INode>>;
    /**
     * Define this method to modify the default behavior when exporting a material
     * @param material glTF material
     * @param babylonMaterial BabylonJS material
     * @returns nullable IMaterial promise
     */
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
    /**
     * Define this method to return additional textures to export from a material
     * @param material glTF material
     * @param babylonMaterial BabylonJS material
     * @returns List of textures
     */
    postExportMaterialAdditionalTextures?(context: string, node: IMaterial, babylonMaterial: Material): BaseTexture[];
    /**
     * Define this method to modify the glTF buffer data before it is finalized and written
     * @param bufferManager Buffer manager
     */
    preGenerateBinaryAsync?(bufferManager: BufferManager): Promise<void>;
    /** Gets a boolean indicating that this extension was used */
    wasUsed: boolean;
    /** Gets a boolean indicating that this extension is required for the file to work */
    required: boolean;
    /**
     * Called after the exporter state changes to EXPORTING
     */
    onExporting?(): void;
}

}
declare module "babylonjs-serializers/glTF/2.0/glTFExporter" {
import { IBufferView, IAccessor, INode, IScene, IMesh, IMaterial, ITexture, IImage, ISampler, IAnimation, IMeshPrimitive, IGLTF, ITextureInfo, ISkin, ICamera } from "babylonjs-gltf2interface";
import { ImageMimeType } from "babylonjs-gltf2interface";
import { Nullable } from "babylonjs/types";
import { Node } from "babylonjs/node";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { Texture } from "babylonjs/Materials/Textures/texture";
import { Material } from "babylonjs/Materials/material";
import { Scene } from "babylonjs/scene";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFMaterialExporter } from "babylonjs-serializers/glTF/2.0/glTFMaterialExporter";
import { IExportOptions } from "babylonjs-serializers/glTF/2.0/glTFSerializer";
import { GLTFData } from "babylonjs-serializers/glTF/2.0/glTFData";
import { BufferManager } from "babylonjs-serializers/glTF/2.0/bufferManager";
/** @internal */
export class GLTFExporter {
    readonly _glTF: IGLTF;
    readonly _animations: IAnimation[];
    readonly _accessors: IAccessor[];
    readonly _bufferViews: IBufferView[];
    readonly _cameras: ICamera[];
    readonly _images: IImage[];
    readonly _materials: IMaterial[];
    readonly _meshes: IMesh[];
    readonly _nodes: INode[];
    readonly _samplers: ISampler[];
    readonly _scenes: IScene[];
    readonly _skins: ISkin[];
    readonly _textures: ITexture[];
    readonly _babylonScene: Scene;
    readonly _imageData: {
        [fileName: string]: {
            data: ArrayBuffer;
            mimeType: ImageMimeType;
        };
    };
    /**
     * Baked animation sample rate
     */
    private _animationSampleRate;
    private readonly _options;
    _shouldUseGlb: boolean;
    readonly _materialExporter: GLTFMaterialExporter;
    private readonly _extensions;
    readonly _bufferManager: BufferManager;
    private readonly _shouldExportNodeMap;
    private readonly _nodeMap;
    readonly _materialMap: Map<Material, number>;
    private readonly _camerasMap;
    private readonly _nodesCameraMap;
    private readonly _skinMap;
    private readonly _nodesSkinMap;
    readonly _materialNeedsUVsSet: Set<Material>;
    private static readonly _ExtensionNames;
    private static readonly _ExtensionFactories;
    private _applyExtension;
    private _applyExtensions;
    _extensionsPreExportTextureAsync(context: string, babylonTexture: Texture, mimeType: ImageMimeType): Promise<Nullable<BaseTexture>>;
    _extensionsPostExportNodeAsync(context: string, node: INode, babylonNode: Node, nodeMap: Map<Node, number>, convertToRightHanded: boolean): Promise<Nullable<INode>>;
    _extensionsPostExportMaterialAsync(context: string, material: IMaterial, babylonMaterial: Material): Promise<Nullable<IMaterial>>;
    _extensionsPostExportMaterialAdditionalTextures(context: string, material: IMaterial, babylonMaterial: Material): BaseTexture[];
    _extensionsPostExportTextures(context: string, textureInfo: ITextureInfo, babylonTexture: BaseTexture): void;
    _extensionsPostExportMeshPrimitive(primitive: IMeshPrimitive): void;
    _extensionsPreGenerateBinaryAsync(): Promise<void>;
    private _forEachExtensions;
    private _extensionsOnExporting;
    private _loadExtensions;
    constructor(babylonScene?: Nullable<Scene>, options?: IExportOptions);
    dispose(): void;
    get options(): Required<IExportOptions>;
    static RegisterExtension(name: string, factory: (exporter: GLTFExporter) => IGLTFExporterExtensionV2): void;
    static UnregisterExtension(name: string): boolean;
    private _generateJSON;
    generateGLTFAsync(glTFPrefix: string): Promise<GLTFData>;
    private _generateBinaryAsync;
    /**
     * Pads the number to a multiple of 4
     * @param num number to pad
     * @returns padded number
     */
    private _getPadding;
    generateGLBAsync(glTFPrefix: string): Promise<GLTFData>;
    private _setNodeTransformation;
    private _setCameraTransformation;
    private _listAvailableCameras;
    private _exportAndAssignCameras;
    private _listAvailableSkeletons;
    private _exportAndAssignSkeletons;
    private _exportSceneAsync;
    private _shouldExportNode;
    private _exportNodesAsync;
    private _collectBuffers;
    private _exportBuffers;
    /**
     * Processes a node to be exported to the glTF file
     * @returns A promise that resolves once the node has been exported
     * @internal
     */
    private _exportNodeAsync;
    /**
     * Creates a glTF node from a Babylon.js node. If skipped, returns null.
     * @internal
     */
    private _createNodeAsync;
    private _exportIndices;
    private _exportVertexBuffer;
    private _exportMaterialAsync;
    private _exportMeshAsync;
}

}
declare module "babylonjs-serializers/glTF/2.0/glTFData" {
/**
 * Class for holding and downloading glTF file data
 */
export class GLTFData {
    /**
     * Object which contains the file name as the key and its data as the value
     */
    readonly files: {
        [fileName: string]: string | Blob;
    };
    /**
     * @deprecated Use files instead
     */
    get glTFFiles(): {
        [fileName: string]: string | Blob;
    };
    /**
     * Downloads the glTF data as files based on their names and data
     */
    downloadFiles(): void;
}

}
declare module "babylonjs-serializers/glTF/2.0/glTFAnimation" {
import { IAnimation, INode, IBufferView, IAccessor } from "babylonjs-gltf2interface";
import { AnimationSamplerInterpolation, AnimationChannelTargetPath, AccessorType } from "babylonjs-gltf2interface";
import { Node } from "babylonjs/node";
import { Nullable } from "babylonjs/types";
import { Animation } from "babylonjs/Animations/animation";
import { Scene } from "babylonjs/scene";
import { BufferManager } from "babylonjs-serializers/glTF/2.0/bufferManager";
/**
 * @internal
 * Interface to store animation data.
 */
export interface _IAnimationData {
    /**
     * Keyframe data.
     */
    inputs: number[];
    /**
     * Value data.
     */
    outputs: number[][];
    /**
     * Animation interpolation data.
     */
    samplerInterpolation: AnimationSamplerInterpolation;
    /**
     * Minimum keyframe value.
     */
    inputsMin: number;
    /**
     * Maximum keyframe value.
     */
    inputsMax: number;
}
/**
 * @internal
 */
export interface _IAnimationInfo {
    /**
     * The target channel for the animation
     */
    animationChannelTargetPath: AnimationChannelTargetPath;
    /**
     * The glTF accessor type for the data.
     */
    dataAccessorType: AccessorType.VEC3 | AccessorType.VEC4 | AccessorType.SCALAR;
    /**
     * Specifies if quaternions should be used.
     */
    useQuaternion: boolean;
}
/**
 * @internal
 * Utility class for generating glTF animation data from BabylonJS.
 */
export class _GLTFAnimation {
    /**
     * Determine if a node is transformable - ie has properties it should be part of animation of transformation.
     * @param babylonNode the node to test
     * @returns true if can be animated, false otherwise. False if the parameter is null or undefined.
     */
    private static _IsTransformable;
    /**
     * @ignore
     *
     * Creates glTF channel animation from BabylonJS animation.
     * @param babylonTransformNode - BabylonJS mesh.
     * @param animation - animation.
     * @param animationChannelTargetPath - The target animation channel.
     * @param useQuaternion - Specifies if quaternions are used.
     * @returns nullable IAnimationData
     */
    static _CreateNodeAnimation(babylonTransformNode: Node, animation: Animation, animationChannelTargetPath: AnimationChannelTargetPath, useQuaternion: boolean, animationSampleRate: number): Nullable<_IAnimationData>;
    private static _DeduceAnimationInfo;
    /**
     * @ignore
     * Create node animations from the transform node animations
     * @param babylonNode
     * @param runtimeGLTFAnimation
     * @param idleGLTFAnimations
     * @param nodeMap
     * @param nodes
     * @param bufferManager
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    static _CreateNodeAnimationFromNodeAnimations(babylonNode: Node, runtimeGLTFAnimation: IAnimation, idleGLTFAnimations: IAnimation[], nodeMap: Map<Node, number>, nodes: INode[], bufferManager: BufferManager, bufferViews: IBufferView[], accessors: IAccessor[], animationSampleRate: number, useRightHanded: boolean, shouldExportAnimation?: (animation: Animation) => boolean): void;
    /**
     * @ignore
     * Create individual morph animations from the mesh's morph target animation tracks
     * @param babylonNode
     * @param runtimeGLTFAnimation
     * @param idleGLTFAnimations
     * @param nodeMap
     * @param nodes
     * @param bufferManager
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    static _CreateMorphTargetAnimationFromMorphTargetAnimations(babylonNode: Node, runtimeGLTFAnimation: IAnimation, idleGLTFAnimations: IAnimation[], nodeMap: Map<Node, number>, nodes: INode[], bufferManager: BufferManager, bufferViews: IBufferView[], accessors: IAccessor[], animationSampleRate: number, useRightHanded: boolean, shouldExportAnimation?: (animation: Animation) => boolean): void;
    /**
     * @internal
     * Create node and morph animations from the animation groups
     * @param babylonScene
     * @param glTFAnimations
     * @param nodeMap
     * @param nodes
     * @param bufferManager
     * @param bufferViews
     * @param accessors
     * @param animationSampleRate
     */
    static _CreateNodeAndMorphAnimationFromAnimationGroups(babylonScene: Scene, glTFAnimations: IAnimation[], nodeMap: Map<Node, number>, bufferManager: BufferManager, bufferViews: IBufferView[], accessors: IAccessor[], animationSampleRate: number, leftHandedNodes: Set<Node>, shouldExportAnimation?: (animation: Animation) => boolean): void;
    private static _AddAnimation;
    /**
     * Create a baked animation
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation corresponding to the BabylonJS mesh
     * @param animationChannelTargetPath animation target channel
     * @param minFrame minimum animation frame
     * @param maxFrame maximum animation frame
     * @param fps frames per second of the animation
     * @param sampleRate
     * @param inputs input key frames of the animation
     * @param outputs output key frame data of the animation
     * @param minMaxFrames
     * @param minMaxFrames.min
     * @param minMaxFrames.max
     * @param useQuaternion specifies if quaternions should be used
     */
    private static _CreateBakedAnimation;
    private static _ConvertFactorToVector3OrQuaternion;
    private static _SetInterpolatedValue;
    /**
     * Creates linear animation from the animation key frames
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation
     * @param animationChannelTargetPath The target animation channel
     * @param inputs Array to store the key frame times
     * @param outputs Array to store the key frame data
     * @param useQuaternion Specifies if quaternions are used in the animation
     */
    private static _CreateLinearOrStepAnimation;
    /**
     * Creates cubic spline animation from the animation key frames
     * @param babylonTransformNode BabylonJS mesh
     * @param animation BabylonJS animation
     * @param animationChannelTargetPath The target animation channel
     * @param inputs Array to store the key frame times
     * @param outputs Array to store the key frame data
     * @param useQuaternion Specifies if quaternions are used in the animation
     */
    private static _CreateCubicSplineAnimation;
    private static _GetBasePositionRotationOrScale;
    /**
     * Adds a key frame value
     * @param keyFrame
     * @param animation
     * @param outputs
     * @param animationChannelTargetPath
     * @param babylonTransformNode
     * @param useQuaternion
     */
    private static _AddKeyframeValue;
    /**
     * @internal
     * Determine the interpolation based on the key frames
     * @param keyFrames
     * @param animationChannelTargetPath
     * @param useQuaternion
     */
    private static _DeduceInterpolation;
    /**
     * Adds an input tangent or output tangent to the output data
     * If an input tangent or output tangent is missing, it uses the zero vector or zero quaternion
     * @param tangentType Specifies which type of tangent to handle (inTangent or outTangent)
     * @param outputs The animation data by keyframe
     * @param animationChannelTargetPath The target animation channel
     * @param interpolation The interpolation type
     * @param keyFrame The key frame with the animation data
     * @param useQuaternion Specifies if quaternions are used
     */
    private static _AddSplineTangent;
    /**
     * Get the minimum and maximum key frames' frame values
     * @param keyFrames animation key frames
     * @returns the minimum and maximum key frame value
     */
    private static _CalculateMinMaxKeyFrames;
}

}
declare module "babylonjs-serializers/glTF/2.0/dataWriter" {
import { TypedArray } from "babylonjs/types";
/** @internal */
export class DataWriter {
    private _data;
    private _dataView;
    private _byteOffset;
    writeTypedArray(value: Exclude<TypedArray, BigInt64Array | BigUint64Array>): void;
    constructor(byteLength: number);
    get byteOffset(): number;
    getOutputData(): Uint8Array;
    writeUInt8(value: number): void;
    writeInt8(value: number): void;
    writeInt16(entry: number): void;
    writeUInt16(value: number): void;
    writeInt32(entry: number): void;
    writeUInt32(value: number): void;
    writeFloat32(value: number): void;
    writeFloat64(value: number): void;
    private _checkGrowBuffer;
}

}
declare module "babylonjs-serializers/glTF/2.0/bufferManager" {
import { TypedArray } from "babylonjs/types";
import { AccessorComponentType, AccessorType, IAccessor, IBufferView } from "babylonjs-gltf2interface";
type TypedArrayForglTF = Exclude<TypedArray, Float64Array | BigInt64Array | BigUint64Array>;
interface IPropertyWithBufferView {
    bufferView?: number;
}
/**
 * Utility class to centralize the management of binary data, bufferViews, and the objects that reference them.
 * @internal
 */
export class BufferManager {
    /**
     * Maps a bufferView to its data
     */
    private _bufferViewToData;
    /**
     * Maps a bufferView to glTF objects that reference it via a "bufferView" property (e.g. accessors, images)
     */
    private _bufferViewToProperties;
    /**
     * Maps an accessor to its bufferView
     */
    private _accessorToBufferView;
    /**
     * Generates a binary buffer from the stored bufferViews. Also populates the bufferViews list.
     * @param bufferViews The list of bufferViews to be populated while writing the binary
     * @returns The binary buffer
     */
    generateBinary(bufferViews: IBufferView[]): Uint8Array;
    /**
     * Creates a buffer view based on the supplied arguments
     * @param data a TypedArray to create the bufferView for
     * @param byteStride byte distance between consecutive elements
     * @returns bufferView for glTF
     */
    createBufferView(data: TypedArrayForglTF, byteStride?: number): IBufferView;
    /**
     * Creates an accessor based on the supplied arguments and assigns it to the bufferView
     * @param bufferView The glTF bufferView referenced by this accessor
     * @param type The type of the accessor
     * @param componentType The datatype of components in the attribute
     * @param count The number of attributes referenced by this accessor
     * @param byteOffset The offset relative to the start of the bufferView in bytes
     * @param minMax Minimum and maximum value of each component in this attribute
     * @param normalized Specifies whether integer data values are normalized before usage
     * @returns accessor for glTF
     */
    createAccessor(bufferView: IBufferView, type: AccessorType, componentType: AccessorComponentType, count: number, byteOffset?: number, minMax?: {
        min: number[];
        max: number[];
    }, normalized?: boolean): IAccessor;
    /**
     * Assigns a bufferView to a glTF object that references it
     * @param object The glTF object
     * @param bufferView The bufferView to assign
     */
    setBufferView(object: IPropertyWithBufferView, bufferView: IBufferView): void;
    /**
     * Removes buffer view from the binary data, as well as from all its known references
     * @param bufferView the bufferView to remove
     */
    removeBufferView(bufferView: IBufferView): void;
    getBufferView(accessor: IAccessor): IBufferView;
    getPropertiesWithBufferView(bufferView: IBufferView): IPropertyWithBufferView[];
    getData(bufferView: IBufferView): TypedArrayForglTF;
    private _verifyBufferView;
}
export {};

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/index" {
export * from "babylonjs-serializers/glTF/2.0/Extensions/EXT_mesh_gpu_instancing";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_draco_mesh_compression";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_lights_punctual";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_anisotropy";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_clearcoat";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_diffuse_transmission";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_dispersion";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_emissive_strength";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_ior";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_iridescence";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_sheen";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_specular";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_transmission";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_unlit";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_volume";
export * from "babylonjs-serializers/glTF/2.0/Extensions/KHR_texture_transform";

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_texture_transform" {
import { ITextureInfo } from "babylonjs-gltf2interface";
import { Texture } from "babylonjs/Materials/Textures/texture";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
/**
 * @internal
 */
export class KHR_texture_transform implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    /** Reference to the glTF exporter */
    private _wasUsed;
    constructor();
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    postExportTexture?(context: string, textureInfo: ITextureInfo, babylonTexture: Texture): void;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_volume" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { Material } from "babylonjs/Materials/material";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md)
 */
export class KHR_materials_volume implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _exporter;
    private _wasUsed;
    constructor(exporter: GLTFExporter);
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    /**
     * After exporting a material, deal with additional textures
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns array of additional textures to export
     */
    postExportMaterialAdditionalTextures?(context: string, node: IMaterial, babylonMaterial: Material): BaseTexture[];
    private _isExtensionEnabled;
    private _hasTexturesExtension;
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise that resolves with the updated node
     */
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_unlit" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { Material } from "babylonjs/Materials/material";
/**
 * @internal
 */
export class KHR_materials_unlit implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _wasUsed;
    constructor();
    /** @internal */
    get wasUsed(): boolean;
    dispose(): void;
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_transmission" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { Material } from "babylonjs/Materials/material";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_transmission/README.md)
 */
export class KHR_materials_transmission implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _exporter;
    private _wasUsed;
    constructor(exporter: GLTFExporter);
    /** Dispose */
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    /**
     * After exporting a material, deal with additional textures
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns array of additional textures to export
     */
    postExportMaterialAdditionalTextures?(context: string, node: IMaterial, babylonMaterial: Material): BaseTexture[];
    private _isExtensionEnabled;
    private _hasTexturesExtension;
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns true if successful
     */
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_specular" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { Material } from "babylonjs/Materials/material";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md)
 */
export class KHR_materials_specular implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _exporter;
    private _wasUsed;
    constructor(exporter: GLTFExporter);
    /** Dispose */
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    /**
     * After exporting a material, deal with the additional textures
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns array of additional textures to export
     */
    postExportMaterialAdditionalTextures?(context: string, node: IMaterial, babylonMaterial: Material): BaseTexture[];
    private _isExtensionEnabled;
    private _hasTexturesExtension;
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise, resolves with the material
     */
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_sheen" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { Material } from "babylonjs/Materials/material";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
/**
 * @internal
 */
export class KHR_materials_sheen implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _wasUsed;
    private _exporter;
    constructor(exporter: GLTFExporter);
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    postExportMaterialAdditionalTextures(context: string, node: IMaterial, babylonMaterial: Material): BaseTexture[];
    postExportMaterialAsync(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_iridescence" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { Material } from "babylonjs/Materials/material";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
/**
 * @internal
 */
export class KHR_materials_iridescence implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _exporter;
    private _wasUsed;
    constructor(exporter: GLTFExporter);
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    postExportMaterialAdditionalTextures?(context: string, node: IMaterial, babylonMaterial: Material): BaseTexture[];
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_ior" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { Material } from "babylonjs/Materials/material";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_ior/README.md)
 */
export class KHR_materials_ior implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _wasUsed;
    constructor();
    /** Dispose */
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    private _isExtensionEnabled;
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise, resolves with the material
     */
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_emissive_strength" {
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { Material } from "babylonjs/Materials/material";
import { IMaterial } from "babylonjs-gltf2interface";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
 */
export class KHR_materials_emissive_strength implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _wasUsed;
    /** Dispose */
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise, resolves with the material
     */
    postExportMaterialAsync(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_dispersion" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { Material } from "babylonjs/Materials/material";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/87bd64a7f5e23c84b6aef2e6082069583ed0ddb4/extensions/2.0/Khronos/KHR_materials_dispersion/README.md)
 * @experimental
 */
export class KHR_materials_dispersion implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _wasUsed;
    /** Constructor */
    constructor();
    /** Dispose */
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    private _isExtensionEnabled;
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise, resolves with the material
     */
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_diffuse_transmission" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { Material } from "babylonjs/Materials/material";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
/**
 * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
 * !!! Experimental Extension Subject to Changes !!!
 */
export class KHR_materials_diffuse_transmission implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _exporter;
    private _wasUsed;
    constructor(exporter: GLTFExporter);
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    /**
     * After exporting a material, deal with additional textures
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns array of additional textures to export
     */
    postExportMaterialAdditionalTextures?(context: string, node: IMaterial, babylonMaterial: Material): BaseTexture[];
    private _isExtensionEnabled;
    private _hasTexturesExtension;
    /**
     * After exporting a material
     * @param context GLTF context of the material
     * @param node exported GLTF node
     * @param babylonMaterial corresponding babylon material
     * @returns promise that resolves with the updated node
     */
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_clearcoat" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { Material } from "babylonjs/Materials/material";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
/**
 * @internal
 */
export class KHR_materials_clearcoat implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _exporter;
    private _wasUsed;
    constructor(exporter: GLTFExporter);
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    postExportMaterialAdditionalTextures?(context: string, node: IMaterial, babylonMaterial: Material): BaseTexture[];
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_materials_anisotropy" {
import { IMaterial } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { Material } from "babylonjs/Materials/material";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
/**
 * @internal
 */
export class KHR_materials_anisotropy implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _exporter;
    private _wasUsed;
    constructor(exporter: GLTFExporter);
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    postExportMaterialAdditionalTextures?(context: string, node: IMaterial, babylonMaterial: Material): BaseTexture[];
    postExportMaterialAsync?(context: string, node: IMaterial, babylonMaterial: Material): Promise<IMaterial>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_lights_punctual" {
import { Nullable } from "babylonjs/types";
import { Node } from "babylonjs/node";
import { INode } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
 */
export class KHR_lights_punctual implements IGLTFExporterExtensionV2 {
    /** The name of this extension. */
    readonly name: string;
    /** Defines whether this extension is enabled. */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    /** Reference to the glTF exporter */
    private _exporter;
    private _lights;
    /**
     * @internal
     */
    constructor(exporter: GLTFExporter);
    /** @internal */
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    /** @internal */
    onExporting(): void;
    /**
     * Define this method to modify the default behavior when exporting a node
     * @param context The context when exporting the node
     * @param node glTF node
     * @param babylonNode BabylonJS node
     * @param nodeMap Node mapping of babylon node to glTF node index
     * @param convertToRightHanded Flag to convert the values to right-handed
     * @returns nullable INode promise
     */
    postExportNodeAsync(context: string, node: INode, babylonNode: Node, nodeMap: Map<Node, number>, convertToRightHanded: boolean): Promise<Nullable<INode>>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/KHR_draco_mesh_compression" {
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { IAccessor, IMeshPrimitive } from "babylonjs-gltf2interface";
import { BufferManager } from "babylonjs-serializers/glTF/2.0/bufferManager";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md)
 */
export class KHR_draco_mesh_compression implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** KHR_draco_mesh_compression is required, as uncompressed fallback data is not yet implemented. */
    required: boolean;
    /** BufferViews used for Draco data, which may be eligible for removal after Draco encoding */
    private _bufferViewsUsed;
    /** Accessors that were replaced with Draco data, which may be eligible for removal after Draco encoding */
    private _accessorsUsed;
    /** Promise pool for Draco encoding work */
    private _encodePromises;
    private _wasUsed;
    /** @internal */
    get wasUsed(): boolean;
    /** @internal */
    constructor(exporter: GLTFExporter);
    /** @internal */
    dispose(): void;
    /** @internal */
    postExportMeshPrimitive(primitive: IMeshPrimitive, bufferManager: BufferManager, accessors: IAccessor[]): void;
    /** @internal */
    preGenerateBinaryAsync(bufferManager: BufferManager): Promise<void>;
}

}
declare module "babylonjs-serializers/glTF/2.0/Extensions/EXT_mesh_gpu_instancing" {
import { INode } from "babylonjs-gltf2interface";
import { IGLTFExporterExtensionV2 } from "babylonjs-serializers/glTF/2.0/glTFExporterExtension";
import { BufferManager } from "babylonjs-serializers/glTF/2.0/bufferManager";
import { GLTFExporter } from "babylonjs-serializers/glTF/2.0/glTFExporter";
import { Nullable } from "babylonjs/types";
import { Node } from "babylonjs/node";
import "babylonjs/Meshes/thinInstanceMesh";
/**
 * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
 */
export class EXT_mesh_gpu_instancing implements IGLTFExporterExtensionV2 {
    /** Name of this extension */
    readonly name: string;
    /** Defines whether this extension is enabled */
    enabled: boolean;
    /** Defines whether this extension is required */
    required: boolean;
    private _exporter;
    private _wasUsed;
    constructor(exporter: GLTFExporter);
    dispose(): void;
    /** @internal */
    get wasUsed(): boolean;
    /**
     * After node is exported
     * @param context the GLTF context when loading the asset
     * @param node the node exported
     * @param babylonNode the corresponding babylon node
     * @param nodeMap map from babylon node id to node index
     * @param convertToRightHanded true if we need to convert data from left hand to right hand system.
     * @param bufferManager buffer manager
     * @returns nullable promise, resolves with the node
     */
    postExportNodeAsync(context: string, node: Nullable<INode>, babylonNode: Node, nodeMap: Map<Node, number>, convertToRightHanded: boolean, bufferManager: BufferManager): Promise<Nullable<INode>>;
    private _buildAccessor;
}

}
declare module "babylonjs-serializers/USDZ/usdzExporter" {
import { Mesh } from "babylonjs/Meshes/mesh";
import { Scene } from "babylonjs/scene";
/**
 * Options for the USDZ export
 */
export interface IUSDZExportOptions {
    /**
     * URL to load the fflate library from
     */
    fflateUrl?: string;
    /**
     * Include anchoring properties in the USDZ file
     */
    includeAnchoringProperties?: boolean;
    /**
     * Anchoring type (plane by default)
     */
    anchoringType?: string;
    /**
     * Plane anchoring alignment (horizontal by default)
     */
    planeAnchoringAlignment?: string;
    /**
     * Model file name (model.usda by default)
     */
    modelFileName?: string;
    /**
     * Precision to use for number (5 by default)
     */
    precision?: number;
    /**
     * Export the camera (false by default)
     */
    exportCamera?: boolean;
    /**
     * Camera sensor width (35 by default)
     */
    cameraSensorWidth?: number;
}
/**
 *
 * @param scene scene to export
 * @param options options to configure the export
 * @param meshPredicate predicate to filter the meshes to export
 * @returns a uint8 array containing the USDZ file
 * #H2G5XW#6 - Simple sphere
 * #H2G5XW#7 - Red sphere
 * #5N3RWK#5 - Boombox
 */
export function USDZExportAsync(scene: Scene, options: Partial<IUSDZExportOptions>, meshPredicate?: (m: Mesh) => boolean): Promise<Uint8Array>;

}
declare module "babylonjs-serializers/USDZ/index" {
export * from "babylonjs-serializers/USDZ/usdzExporter";

}
declare module "babylonjs-serializers/OBJ/objSerializer" {
import { Mesh } from "babylonjs/Meshes/mesh";
/**
 * Class for generating OBJ data from a Babylon scene.
 */
export class OBJExport {
    /**
     * Exports the geometry of a Mesh array in .OBJ file format (text)
     * @param meshes defines the list of meshes to serialize
     * @param materials defines if materials should be exported
     * @param matlibname defines the name of the associated mtl file
     * @param globalposition defines if the exported positions are globals or local to the exported mesh
     * @returns the OBJ content
     */
    static OBJ(meshes: Mesh[], materials?: boolean, matlibname?: string, globalposition?: boolean): string;
    /**
     * Exports the material(s) of a mesh in .MTL file format (text)
     * @param mesh defines the mesh to extract the material from
     * @returns the mtl content
     */
    static MTL(mesh: Mesh): string;
}

}
declare module "babylonjs-serializers/OBJ/index" {
export * from "babylonjs-serializers/OBJ/objSerializer";

}
declare module "babylonjs-serializers/legacy/legacy" {
import "babylonjs-serializers/index";
export * from "babylonjs-serializers/legacy/legacy-glTF2Serializer";
export * from "babylonjs-serializers/legacy/legacy-objSerializer";
export * from "babylonjs-serializers/legacy/legacy-stlSerializer";
export * from "babylonjs-serializers/legacy/legacy-usdzSerializer";

}
declare module "babylonjs-serializers/legacy/legacy-usdzSerializer" {
export * from "babylonjs-serializers/USDZ/index";

}
declare module "babylonjs-serializers/legacy/legacy-stlSerializer" {
export * from "babylonjs-serializers/stl/index";

}
declare module "babylonjs-serializers/legacy/legacy-objSerializer" {
export * from "babylonjs-serializers/OBJ/index";

}
declare module "babylonjs-serializers/legacy/legacy-glTF2Serializer" {
export * from "babylonjs-serializers/glTF/glTFFileExporter";
export * from "babylonjs-serializers/glTF/2.0/index";

}

declare module "babylonjs-serializers" {
    export * from "babylonjs-serializers/legacy/legacy";
}


declare module BABYLON {


    /**
     * Class for generating STL data from a Babylon scene.
     */
    export class STLExport {
        /**
         * Exports the geometry of a Mesh array in .STL file format (ASCII)
         * @param meshes list defines the mesh to serialize
         * @param download triggers the automatic download of the file.
         * @param fileName changes the downloads fileName.
         * @param binary changes the STL to a binary type.
         * @param isLittleEndian toggle for binary type exporter.
         * @param doNotBakeTransform toggle if meshes transforms should be baked or not.
         * @param supportInstancedMeshes toggle to export instanced Meshes. Enabling support for instanced meshes will override doNoBakeTransform as true
         * @param exportIndividualMeshes toggle to export each mesh as an independent mesh. By default, all the meshes are combined into one mesh. This property has no effect when exporting in binary format
         * @returns the STL as UTF8 string
         */
        static CreateSTL(meshes: (Mesh | InstancedMesh)[], download?: boolean, fileName?: string, binary?: boolean, isLittleEndian?: boolean, doNotBakeTransform?: boolean, supportInstancedMeshes?: boolean, exportIndividualMeshes?: boolean): any;
    }






    /** @internal */
    export var __IGLTFExporterExtension: number;
    /**
     * Interface for extending the exporter
     * @internal
     */
    export interface IGLTFExporterExtension {
        /**
         * The name of this extension
         */
        readonly name: string;
        /**
         * Defines whether this extension is enabled
         */
        enabled: boolean;
        /**
         * Defines whether this extension is required
         */
        required: boolean;
    }




    export function GetAccessorElementCount(accessorType: BABYLON.GLTF2.AccessorType): number;
    export function FloatsNeed16BitInteger(floatArray: FloatArray): boolean;
    export function IsStandardVertexAttribute(type: string): boolean;
    export function GetAccessorType(kind: string, hasVertexColorAlpha: boolean): BABYLON.GLTF2.AccessorType;
    export function GetAttributeType(kind: string): string;
    export function GetPrimitiveMode(fillMode: number): BABYLON.GLTF2.MeshPrimitiveMode;
    export function IsTriangleFillMode(fillMode: number): boolean;
    export function NormalizeTangent(tangent: Vector4 | Vector3): void;
    export function ConvertToRightHandedPosition(value: Vector3): Vector3;
    export function ConvertToRightHandedRotation(value: Quaternion): Quaternion;
    export function ConvertToRightHandedNode(value: BABYLON.GLTF2.INode): void;
    /**
     * Rotation by 180 as glTF has a different convention than Babylon.
     * @param rotation Target camera rotation.
     * @returns Ref to camera rotation.
     */
    export function ConvertCameraRotationToGLTF(rotation: Quaternion): Quaternion;
    export function RotateNode180Y(node: BABYLON.GLTF2.INode): void;
    /**
     * Collapses GLTF parent and node into a single node. This is useful for removing nodes that were added by the GLTF importer.
     * @param node Target parent node.
     * @param parentNode Original GLTF node (Light or Camera).
     */
    export function CollapseParentNode(node: BABYLON.GLTF2.INode, parentNode: BABYLON.GLTF2.INode): void;
    /**
     * Sometimes the GLTF Importer can add extra transform nodes (for lights and cameras). This checks if a parent node was added by the GLTF Importer. If so, it should be removed during serialization.
     * @param babylonNode Original GLTF node (Light or Camera).
     * @param parentBabylonNode Target parent node.
     * @returns True if the parent node was added by the GLTF importer.
     */
    export function IsParentAddedByImporter(babylonNode: Node, parentBabylonNode: Node): boolean;
    export function IsNoopNode(node: Node, useRightHandedSystem: boolean): boolean;
    /**
     * Converts an IndicesArray into either Uint32Array or Uint16Array, only copying if the data is number[].
     * @param indices input array to be converted
     * @param start starting index to copy from
     * @param count number of indices to copy
     * @returns a Uint32Array or Uint16Array
     * @internal
     */
    export function IndicesArrayToTypedArray(indices: IndicesArray, start: number, count: number, is32Bits: boolean): Uint32Array | Uint16Array;
    export function DataArrayToUint8Array(data: DataArray): Uint8Array;
    export function GetMinMax(data: DataArray, vertexBuffer: VertexBuffer, start: number, count: number): {
        min: number[];
        max: number[];
    };
    /**
     * Removes, in-place, object properties which have the same value as the default value.
     * Useful for avoiding unnecessary properties in the glTF JSON.
     * @param object the object to omit default values from
     * @param defaultValues a partial object with default values
     * @returns object with default values omitted
     */
    export function OmitDefaultValues<T extends Object>(object: T, defaultValues: Partial<T>): T;


    /**
     * Mesh compression methods.
     */
    export type MeshCompressionMethod = "None" | "Draco";
    /**
     * Holds a collection of exporter options and parameters
     */
    export interface IExportOptions {
        /**
         * Function which indicates whether a babylon node should be exported or not
         * @param node source Babylon node. It is used to check whether it should be exported to glTF or not
         * @returns boolean, which indicates whether the node should be exported (true) or not (false)
         */
        shouldExportNode?(node: Node): boolean;
        /**
         * Function which indicates whether an animation on the scene should be exported or not
         * @param animation source animation
         * @returns boolean, which indicates whether the animation should be exported (true) or not (false)
         */
        shouldExportAnimation?(animation: Animation): boolean;
        /**
         * Function used to extract the part of node's metadata that will be exported into glTF node extras
         * @param metadata source metadata to read from
         * @returns the data to store to glTF node extras
         */
        metadataSelector?(metadata: any): any;
        /**
         * The sample rate to bake animation curves. Defaults to 1 / 60.
         */
        animationSampleRate?: number;
        /**
         * Begin serialization without waiting for the scene to be ready. Defaults to false.
         */
        exportWithoutWaitingForScene?: boolean;
        /**
         * Indicates if unused vertex uv attributes should be included in export. Defaults to false.
         */
        exportUnusedUVs?: boolean;
        /**
         * Remove no-op root nodes when possible. Defaults to true.
         */
        removeNoopRootNodes?: boolean;
        /**
         * Indicates if coordinate system swapping root nodes should be included in export. Defaults to false.
         * @deprecated Please use removeNoopRootNodes instead
         */
        includeCoordinateSystemConversionNodes?: boolean;
        /**
         * Indicates what compression method to apply to mesh data.
         */
        meshCompressionMethod?: MeshCompressionMethod;
    }
    /**
     * Class for generating glTF data from a Babylon scene.
     */
    export class GLTF2Export {
        /**
         * Exports the scene to .gltf file format
         * @param scene Babylon scene
         * @param fileName Name to use for the .gltf file
         * @param options Exporter options
         * @returns Returns the exported data
         */
        static GLTFAsync(scene: Scene, fileName: string, options?: IExportOptions): Promise<GLTFData>;
        /**
         * Exports the scene to .glb file format
         * @param scene Babylon scene
         * @param fileName Name to use for the .glb file
         * @param options Exporter options
         * @returns Returns the exported data
         */
        static GLBAsync(scene: Scene, fileName: string, options?: IExportOptions): Promise<GLTFData>;
    }


    /**
     * Interface to store morph target information.
     * @internal
     */
    export interface IMorphTargetData {
        attributes: Record<string, number>;
        influence: number;
        name: string;
    }
    export function BuildMorphTargetBuffers(morphTarget: MorphTarget, mesh: Mesh, bufferManager: BufferManager, bufferViews: BABYLON.GLTF2.IBufferView[], accessors: BABYLON.GLTF2.IAccessor[], convertToRightHanded: boolean): IMorphTargetData;


    /**
     * Computes the metallic factor from specular glossiness values.
     * @param diffuse diffused value
     * @param specular specular value
     * @param oneMinusSpecularStrength one minus the specular strength
     * @returns metallic value
     * @internal
     */
    export function _SolveMetallic(diffuse: number, specular: number, oneMinusSpecularStrength: number): number;
    /**
     * Computes the metallic/roughness factors from a Standard Material.
     * @internal
     */
    export function _ConvertToGLTFPBRMetallicRoughness(babylonStandardMaterial: StandardMaterial): BABYLON.GLTF2.IMaterialPbrMetallicRoughness;
    /**
     * Utility methods for working with glTF material conversion properties.
     * @internal
     */
    export class GLTFMaterialExporter {
        private readonly _exporter;
        private _textureMap;
        private _internalTextureToImage;
        constructor(_exporter: GLTFExporter);
        getTextureInfo(babylonTexture: Nullable<BaseTexture>): Nullable<BABYLON.GLTF2.ITextureInfo>;
        exportStandardMaterialAsync(babylonStandardMaterial: StandardMaterial, mimeType: BABYLON.GLTF2.ImageMimeType, hasUVs: boolean): Promise<number>;
        private _finishMaterialAsync;
        private _getImageDataAsync;
        /**
         * Resizes the two source textures to the same dimensions.  If a texture is null, a default white texture is generated.  If both textures are null, returns null
         * @param texture1 first texture to resize
         * @param texture2 second texture to resize
         * @param scene babylonjs scene
         * @returns resized textures or null
         */
        private _resizeTexturesToSameDimensions;
        /**
         * Convert Specular Glossiness Textures to Metallic Roughness
         * See link below for info on the material conversions from PBR Metallic/Roughness and Specular/Glossiness
         * @see https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/examples/convert-between-workflows-bjs/js/babylon.pbrUtilities.js
         * @param diffuseTexture texture used to store diffuse information
         * @param specularGlossinessTexture texture used to store specular and glossiness information
         * @param factors specular glossiness material factors
         * @param mimeType the mime type to use for the texture
         * @returns pbr metallic roughness interface or null
         */
        private _convertSpecularGlossinessTexturesToMetallicRoughnessAsync;
        /**
         * Converts specular glossiness material properties to metallic roughness
         * @param specularGlossiness interface with specular glossiness material properties
         * @returns interface with metallic roughness material properties
         */
        private _convertSpecularGlossinessToMetallicRoughness;
        /**
         * Calculates the surface reflectance, independent of lighting conditions
         * @param color Color source to calculate brightness from
         * @returns number representing the perceived brightness, or zero if color is undefined
         */
        private _getPerceivedBrightness;
        /**
         * Returns the maximum color component value
         * @param color
         * @returns maximum color component value, or zero if color is null or undefined
         */
        private _getMaxComponent;
        /**
         * Convert a PBRMaterial (Metallic/Roughness) to Metallic Roughness factors
         * @param babylonPBRMaterial BJS PBR Metallic Roughness Material
         * @param mimeType mime type to use for the textures
         * @param glTFPbrMetallicRoughness glTF PBR Metallic Roughness interface
         * @param hasUVs specifies if texture coordinates are present on the submesh to determine if textures should be applied
         * @returns glTF PBR Metallic Roughness factors
         */
        private _convertMetalRoughFactorsToMetallicRoughnessAsync;
        private _getTextureSampler;
        private _getGLTFTextureWrapMode;
        /**
         * Convert a PBRMaterial (Specular/Glossiness) to Metallic Roughness factors
         * @param babylonPBRMaterial BJS PBR Metallic Roughness Material
         * @param mimeType mime type to use for the textures
         * @param pbrMetallicRoughness glTF PBR Metallic Roughness interface
         * @param hasUVs specifies if texture coordinates are present on the submesh to determine if textures should be applied
         * @returns glTF PBR Metallic Roughness factors
         */
        private _convertSpecGlossFactorsToMetallicRoughnessAsync;
        exportPBRMaterialAsync(babylonPBRMaterial: PBRBaseMaterial, mimeType: BABYLON.GLTF2.ImageMimeType, hasUVs: boolean): Promise<number>;
        private _setMetallicRoughnessPbrMaterialAsync;
        private _getPixelsFromTexture;
        exportTextureAsync(babylonTexture: BaseTexture, mimeType: BABYLON.GLTF2.ImageMimeType): Promise<Nullable<BABYLON.GLTF2.ITextureInfo>>;
        private _exportTextureInfoAsync;
        private _exportImage;
        private _exportTextureInfo;
        private _exportTextureSampler;
    }


    /** @internal */
    export var __IGLTFExporterExtensionV2: number;
    /**
     * Interface for a glTF exporter extension
     * @internal
     */
    export interface IGLTFExporterExtensionV2 extends IGLTFExporterExtension, IDisposable {
        /**
         * Define this method to modify the default behavior before exporting a texture
         * @param context The context when loading the asset
         * @param babylonTexture The Babylon.js texture
         * @param mimeType The mime-type of the generated image
         * @returns A promise that resolves with the exported texture
         */
        preExportTextureAsync?(context: string, babylonTexture: Texture, mimeType: BABYLON.GLTF2.ImageMimeType): Promise<Nullable<Texture>>;
        /**
         * Define this method to get notified when a texture info is created
         * @param context The context when loading the asset
         * @param textureInfo The glTF texture info
         * @param babylonTexture The Babylon.js texture
         */
        postExportTexture?(context: string, textureInfo: BABYLON.GLTF2.ITextureInfo, babylonTexture: BaseTexture): void;
        /**
         * Define this method to get notified when a primitive is created
         * @param primitive glTF mesh primitive
         * @param bufferManager Buffer manager
         * @param accessors List of glTF accessors
         */
        postExportMeshPrimitive?(primitive: BABYLON.GLTF2.IMeshPrimitive, bufferManager: BufferManager, accessors: BABYLON.GLTF2.IAccessor[]): void;
        /**
         * Define this method to modify the default behavior when exporting a node
         * @param context The context when exporting the node
         * @param node glTF node
         * @param babylonNode BabylonJS node
         * @param nodeMap Current node mapping of babylon node to glTF node index. Useful for combining nodes together.
         * @param convertToRightHanded Flag indicating whether to convert values to right-handed
         * @param bufferManager Buffer manager
         * @returns nullable BABYLON.GLTF2.INode promise
         */
        postExportNodeAsync?(context: string, node: BABYLON.GLTF2.INode, babylonNode: Node, nodeMap: Map<Node, number>, convertToRightHanded: boolean, bufferManager: BufferManager): Promise<Nullable<BABYLON.GLTF2.INode>>;
        /**
         * Define this method to modify the default behavior when exporting a material
         * @param material glTF material
         * @param babylonMaterial BabylonJS material
         * @returns nullable BABYLON.GLTF2.IMaterial promise
         */
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
        /**
         * Define this method to return additional textures to export from a material
         * @param material glTF material
         * @param babylonMaterial BabylonJS material
         * @returns List of textures
         */
        postExportMaterialAdditionalTextures?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): BaseTexture[];
        /**
         * Define this method to modify the glTF buffer data before it is finalized and written
         * @param bufferManager Buffer manager
         */
        preGenerateBinaryAsync?(bufferManager: BufferManager): Promise<void>;
        /** Gets a boolean indicating that this extension was used */
        wasUsed: boolean;
        /** Gets a boolean indicating that this extension is required for the file to work */
        required: boolean;
        /**
         * Called after the exporter state changes to EXPORTING
         */
        onExporting?(): void;
    }


    /** @internal */
    export class GLTFExporter {
        readonly _glTF: BABYLON.GLTF2.IGLTF;
        readonly _animations: BABYLON.GLTF2.IAnimation[];
        readonly _accessors: BABYLON.GLTF2.IAccessor[];
        readonly _bufferViews: BABYLON.GLTF2.IBufferView[];
        readonly _cameras: BABYLON.GLTF2.ICamera[];
        readonly _images: BABYLON.GLTF2.IImage[];
        readonly _materials: BABYLON.GLTF2.IMaterial[];
        readonly _meshes: BABYLON.GLTF2.IMesh[];
        readonly _nodes: BABYLON.GLTF2.INode[];
        readonly _samplers: BABYLON.GLTF2.ISampler[];
        readonly _scenes: BABYLON.GLTF2.IScene[];
        readonly _skins: BABYLON.GLTF2.ISkin[];
        readonly _textures: BABYLON.GLTF2.ITexture[];
        readonly _babylonScene: Scene;
        readonly _imageData: {
            [fileName: string]: {
                data: ArrayBuffer;
                mimeType: BABYLON.GLTF2.ImageMimeType;
            };
        };
        /**
         * Baked animation sample rate
         */
        private _animationSampleRate;
        private readonly _options;
        _shouldUseGlb: boolean;
        readonly _materialExporter: GLTFMaterialExporter;
        private readonly _extensions;
        readonly _bufferManager: BufferManager;
        private readonly _shouldExportNodeMap;
        private readonly _nodeMap;
        readonly _materialMap: Map<Material, number>;
        private readonly _camerasMap;
        private readonly _nodesCameraMap;
        private readonly _skinMap;
        private readonly _nodesSkinMap;
        readonly _materialNeedsUVsSet: Set<Material>;
        private static readonly _ExtensionNames;
        private static readonly _ExtensionFactories;
        private _applyExtension;
        private _applyExtensions;
        _extensionsPreExportTextureAsync(context: string, babylonTexture: Texture, mimeType: BABYLON.GLTF2.ImageMimeType): Promise<Nullable<BaseTexture>>;
        _extensionsPostExportNodeAsync(context: string, node: BABYLON.GLTF2.INode, babylonNode: Node, nodeMap: Map<Node, number>, convertToRightHanded: boolean): Promise<Nullable<BABYLON.GLTF2.INode>>;
        _extensionsPostExportMaterialAsync(context: string, material: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<Nullable<BABYLON.GLTF2.IMaterial>>;
        _extensionsPostExportMaterialAdditionalTextures(context: string, material: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): BaseTexture[];
        _extensionsPostExportTextures(context: string, textureInfo: BABYLON.GLTF2.ITextureInfo, babylonTexture: BaseTexture): void;
        _extensionsPostExportMeshPrimitive(primitive: BABYLON.GLTF2.IMeshPrimitive): void;
        _extensionsPreGenerateBinaryAsync(): Promise<void>;
        private _forEachExtensions;
        private _extensionsOnExporting;
        private _loadExtensions;
        constructor(babylonScene?: Nullable<Scene>, options?: IExportOptions);
        dispose(): void;
        get options(): Required<IExportOptions>;
        static RegisterExtension(name: string, factory: (exporter: GLTFExporter) => IGLTFExporterExtensionV2): void;
        static UnregisterExtension(name: string): boolean;
        private _generateJSON;
        generateGLTFAsync(glTFPrefix: string): Promise<GLTFData>;
        private _generateBinaryAsync;
        /**
         * Pads the number to a multiple of 4
         * @param num number to pad
         * @returns padded number
         */
        private _getPadding;
        generateGLBAsync(glTFPrefix: string): Promise<GLTFData>;
        private _setNodeTransformation;
        private _setCameraTransformation;
        private _listAvailableCameras;
        private _exportAndAssignCameras;
        private _listAvailableSkeletons;
        private _exportAndAssignSkeletons;
        private _exportSceneAsync;
        private _shouldExportNode;
        private _exportNodesAsync;
        private _collectBuffers;
        private _exportBuffers;
        /**
         * Processes a node to be exported to the glTF file
         * @returns A promise that resolves once the node has been exported
         * @internal
         */
        private _exportNodeAsync;
        /**
         * Creates a glTF node from a Babylon.js node. If skipped, returns null.
         * @internal
         */
        private _createNodeAsync;
        private _exportIndices;
        private _exportVertexBuffer;
        private _exportMaterialAsync;
        private _exportMeshAsync;
    }


    /**
     * Class for holding and downloading glTF file data
     */
    export class GLTFData {
        /**
         * Object which contains the file name as the key and its data as the value
         */
        readonly files: {
            [fileName: string]: string | Blob;
        };
        /**
         * @deprecated Use files instead
         */
        get glTFFiles(): {
            [fileName: string]: string | Blob;
        };
        /**
         * Downloads the glTF data as files based on their names and data
         */
        downloadFiles(): void;
    }


    /**
     * @internal
     * Interface to store animation data.
     */
    export interface _IAnimationData {
        /**
         * Keyframe data.
         */
        inputs: number[];
        /**
         * Value data.
         */
        outputs: number[][];
        /**
         * Animation interpolation data.
         */
        samplerInterpolation: BABYLON.GLTF2.AnimationSamplerInterpolation;
        /**
         * Minimum keyframe value.
         */
        inputsMin: number;
        /**
         * Maximum keyframe value.
         */
        inputsMax: number;
    }
    /**
     * @internal
     */
    export interface _IAnimationInfo {
        /**
         * The target channel for the animation
         */
        animationChannelTargetPath: BABYLON.GLTF2.AnimationChannelTargetPath;
        /**
         * The glTF accessor type for the data.
         */
        dataAccessorType: BABYLON.GLTF2.AccessorType.VEC3 | BABYLON.GLTF2.AccessorType.VEC4 | BABYLON.GLTF2.AccessorType.SCALAR;
        /**
         * Specifies if quaternions should be used.
         */
        useQuaternion: boolean;
    }
    /**
     * @internal
     * Utility class for generating glTF animation data from BabylonJS.
     */
    export class _GLTFAnimation {
        /**
         * Determine if a node is transformable - ie has properties it should be part of animation of transformation.
         * @param babylonNode the node to test
         * @returns true if can be animated, false otherwise. False if the parameter is null or undefined.
         */
        private static _IsTransformable;
        /**
         * @ignore
         *
         * Creates glTF channel animation from BabylonJS animation.
         * @param babylonTransformNode - BabylonJS mesh.
         * @param animation - animation.
         * @param animationChannelTargetPath - The target animation channel.
         * @param useQuaternion - Specifies if quaternions are used.
         * @returns nullable IAnimationData
         */
        static _CreateNodeAnimation(babylonTransformNode: Node, animation: Animation, animationChannelTargetPath: BABYLON.GLTF2.AnimationChannelTargetPath, useQuaternion: boolean, animationSampleRate: number): Nullable<_IAnimationData>;
        private static _DeduceAnimationInfo;
        /**
         * @ignore
         * Create node animations from the transform node animations
         * @param babylonNode
         * @param runtimeGLTFAnimation
         * @param idleGLTFAnimations
         * @param nodeMap
         * @param nodes
         * @param bufferManager
         * @param bufferViews
         * @param accessors
         * @param animationSampleRate
         */
        static _CreateNodeAnimationFromNodeAnimations(babylonNode: Node, runtimeGLTFAnimation: BABYLON.GLTF2.IAnimation, idleGLTFAnimations: BABYLON.GLTF2.IAnimation[], nodeMap: Map<Node, number>, nodes: BABYLON.GLTF2.INode[], bufferManager: BufferManager, bufferViews: BABYLON.GLTF2.IBufferView[], accessors: BABYLON.GLTF2.IAccessor[], animationSampleRate: number, useRightHanded: boolean, shouldExportAnimation?: (animation: Animation) => boolean): void;
        /**
         * @ignore
         * Create individual morph animations from the mesh's morph target animation tracks
         * @param babylonNode
         * @param runtimeGLTFAnimation
         * @param idleGLTFAnimations
         * @param nodeMap
         * @param nodes
         * @param bufferManager
         * @param bufferViews
         * @param accessors
         * @param animationSampleRate
         */
        static _CreateMorphTargetAnimationFromMorphTargetAnimations(babylonNode: Node, runtimeGLTFAnimation: BABYLON.GLTF2.IAnimation, idleGLTFAnimations: BABYLON.GLTF2.IAnimation[], nodeMap: Map<Node, number>, nodes: BABYLON.GLTF2.INode[], bufferManager: BufferManager, bufferViews: BABYLON.GLTF2.IBufferView[], accessors: BABYLON.GLTF2.IAccessor[], animationSampleRate: number, useRightHanded: boolean, shouldExportAnimation?: (animation: Animation) => boolean): void;
        /**
         * @internal
         * Create node and morph animations from the animation groups
         * @param babylonScene
         * @param glTFAnimations
         * @param nodeMap
         * @param nodes
         * @param bufferManager
         * @param bufferViews
         * @param accessors
         * @param animationSampleRate
         */
        static _CreateNodeAndMorphAnimationFromAnimationGroups(babylonScene: Scene, glTFAnimations: BABYLON.GLTF2.IAnimation[], nodeMap: Map<Node, number>, bufferManager: BufferManager, bufferViews: BABYLON.GLTF2.IBufferView[], accessors: BABYLON.GLTF2.IAccessor[], animationSampleRate: number, leftHandedNodes: Set<Node>, shouldExportAnimation?: (animation: Animation) => boolean): void;
        private static _AddAnimation;
        /**
         * Create a baked animation
         * @param babylonTransformNode BabylonJS mesh
         * @param animation BabylonJS animation corresponding to the BabylonJS mesh
         * @param animationChannelTargetPath animation target channel
         * @param minFrame minimum animation frame
         * @param maxFrame maximum animation frame
         * @param fps frames per second of the animation
         * @param sampleRate
         * @param inputs input key frames of the animation
         * @param outputs output key frame data of the animation
         * @param minMaxFrames
         * @param minMaxFrames.min
         * @param minMaxFrames.max
         * @param useQuaternion specifies if quaternions should be used
         */
        private static _CreateBakedAnimation;
        private static _ConvertFactorToVector3OrQuaternion;
        private static _SetInterpolatedValue;
        /**
         * Creates linear animation from the animation key frames
         * @param babylonTransformNode BabylonJS mesh
         * @param animation BabylonJS animation
         * @param animationChannelTargetPath The target animation channel
         * @param inputs Array to store the key frame times
         * @param outputs Array to store the key frame data
         * @param useQuaternion Specifies if quaternions are used in the animation
         */
        private static _CreateLinearOrStepAnimation;
        /**
         * Creates cubic spline animation from the animation key frames
         * @param babylonTransformNode BabylonJS mesh
         * @param animation BabylonJS animation
         * @param animationChannelTargetPath The target animation channel
         * @param inputs Array to store the key frame times
         * @param outputs Array to store the key frame data
         * @param useQuaternion Specifies if quaternions are used in the animation
         */
        private static _CreateCubicSplineAnimation;
        private static _GetBasePositionRotationOrScale;
        /**
         * Adds a key frame value
         * @param keyFrame
         * @param animation
         * @param outputs
         * @param animationChannelTargetPath
         * @param babylonTransformNode
         * @param useQuaternion
         */
        private static _AddKeyframeValue;
        /**
         * @internal
         * Determine the interpolation based on the key frames
         * @param keyFrames
         * @param animationChannelTargetPath
         * @param useQuaternion
         */
        private static _DeduceInterpolation;
        /**
         * Adds an input tangent or output tangent to the output data
         * If an input tangent or output tangent is missing, it uses the zero vector or zero quaternion
         * @param tangentType Specifies which type of tangent to handle (inTangent or outTangent)
         * @param outputs The animation data by keyframe
         * @param animationChannelTargetPath The target animation channel
         * @param interpolation The interpolation type
         * @param keyFrame The key frame with the animation data
         * @param useQuaternion Specifies if quaternions are used
         */
        private static _AddSplineTangent;
        /**
         * Get the minimum and maximum key frames' frame values
         * @param keyFrames animation key frames
         * @returns the minimum and maximum key frame value
         */
        private static _CalculateMinMaxKeyFrames;
    }


    /** @internal */
    export class DataWriter {
        private _data;
        private _dataView;
        private _byteOffset;
        writeTypedArray(value: Exclude<TypedArray, BigInt64Array | BigUint64Array>): void;
        constructor(byteLength: number);
        get byteOffset(): number;
        getOutputData(): Uint8Array;
        writeUInt8(value: number): void;
        writeInt8(value: number): void;
        writeInt16(entry: number): void;
        writeUInt16(value: number): void;
        writeInt32(entry: number): void;
        writeUInt32(value: number): void;
        writeFloat32(value: number): void;
        writeFloat64(value: number): void;
        private _checkGrowBuffer;
    }


    type TypedArrayForglTF = Exclude<TypedArray, Float64Array | BigInt64Array | BigUint64Array>;
    interface IPropertyWithBufferView {
        bufferView?: number;
    }
    /**
     * Utility class to centralize the management of binary data, bufferViews, and the objects that reference them.
     * @internal
     */
    export class BufferManager {
        /**
         * Maps a bufferView to its data
         */
        private _bufferViewToData;
        /**
         * Maps a bufferView to glTF objects that reference it via a "bufferView" property (e.g. accessors, images)
         */
        private _bufferViewToProperties;
        /**
         * Maps an accessor to its bufferView
         */
        private _accessorToBufferView;
        /**
         * Generates a binary buffer from the stored bufferViews. Also populates the bufferViews list.
         * @param bufferViews The list of bufferViews to be populated while writing the binary
         * @returns The binary buffer
         */
        generateBinary(bufferViews: BABYLON.GLTF2.IBufferView[]): Uint8Array;
        /**
         * Creates a buffer view based on the supplied arguments
         * @param data a TypedArray to create the bufferView for
         * @param byteStride byte distance between consecutive elements
         * @returns bufferView for glTF
         */
        createBufferView(data: TypedArrayForglTF, byteStride?: number): BABYLON.GLTF2.IBufferView;
        /**
         * Creates an accessor based on the supplied arguments and assigns it to the bufferView
         * @param bufferView The glTF bufferView referenced by this accessor
         * @param type The type of the accessor
         * @param componentType The datatype of components in the attribute
         * @param count The number of attributes referenced by this accessor
         * @param byteOffset The offset relative to the start of the bufferView in bytes
         * @param minMax Minimum and maximum value of each component in this attribute
         * @param normalized Specifies whether integer data values are normalized before usage
         * @returns accessor for glTF
         */
        createAccessor(bufferView: BABYLON.GLTF2.IBufferView, type: BABYLON.GLTF2.AccessorType, componentType: BABYLON.GLTF2.AccessorComponentType, count: number, byteOffset?: number, minMax?: {
            min: number[];
            max: number[];
        }, normalized?: boolean): BABYLON.GLTF2.IAccessor;
        /**
         * Assigns a bufferView to a glTF object that references it
         * @param object The glTF object
         * @param bufferView The bufferView to assign
         */
        setBufferView(object: IPropertyWithBufferView, bufferView: BABYLON.GLTF2.IBufferView): void;
        /**
         * Removes buffer view from the binary data, as well as from all its known references
         * @param bufferView the bufferView to remove
         */
        removeBufferView(bufferView: BABYLON.GLTF2.IBufferView): void;
        getBufferView(accessor: BABYLON.GLTF2.IAccessor): BABYLON.GLTF2.IBufferView;
        getPropertiesWithBufferView(bufferView: BABYLON.GLTF2.IBufferView): IPropertyWithBufferView[];
        getData(bufferView: BABYLON.GLTF2.IBufferView): TypedArrayForglTF;
        private _verifyBufferView;
    }




    /**
     * @internal
     */
    export class KHR_texture_transform implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_texture_transform";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        /** Reference to the glTF exporter */
        private _wasUsed;
        constructor();
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        postExportTexture?(context: string, textureInfo: BABYLON.GLTF2.ITextureInfo, babylonTexture: Texture): void;
    }


    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md)
     */
    export class KHR_materials_volume implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_volume";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _exporter;
        private _wasUsed;
        constructor(exporter: GLTFExporter);
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        /**
         * After exporting a material, deal with additional textures
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns array of additional textures to export
         */
        postExportMaterialAdditionalTextures?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): BaseTexture[];
        private _isExtensionEnabled;
        private _hasTexturesExtension;
        /**
         * After exporting a material
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns promise that resolves with the updated node
         */
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * @internal
     */
    export class KHR_materials_unlit implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_unlit";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _wasUsed;
        constructor();
        /** @internal */
        get wasUsed(): boolean;
        dispose(): void;
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_transmission/README.md)
     */
    export class KHR_materials_transmission implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_transmission";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _exporter;
        private _wasUsed;
        constructor(exporter: GLTFExporter);
        /** Dispose */
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        /**
         * After exporting a material, deal with additional textures
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns array of additional textures to export
         */
        postExportMaterialAdditionalTextures?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): BaseTexture[];
        private _isExtensionEnabled;
        private _hasTexturesExtension;
        /**
         * After exporting a material
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns true if successful
         */
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md)
     */
    export class KHR_materials_specular implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_specular";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _exporter;
        private _wasUsed;
        constructor(exporter: GLTFExporter);
        /** Dispose */
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        /**
         * After exporting a material, deal with the additional textures
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns array of additional textures to export
         */
        postExportMaterialAdditionalTextures?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): BaseTexture[];
        private _isExtensionEnabled;
        private _hasTexturesExtension;
        /**
         * After exporting a material
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns promise, resolves with the material
         */
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * @internal
     */
    export class KHR_materials_sheen implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_sheen";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _wasUsed;
        private _exporter;
        constructor(exporter: GLTFExporter);
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        postExportMaterialAdditionalTextures(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): BaseTexture[];
        postExportMaterialAsync(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * @internal
     */
    export class KHR_materials_iridescence implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_iridescence";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _exporter;
        private _wasUsed;
        constructor(exporter: GLTFExporter);
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        postExportMaterialAdditionalTextures?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): BaseTexture[];
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_ior/README.md)
     */
    export class KHR_materials_ior implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_ior";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _wasUsed;
        constructor();
        /** Dispose */
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        private _isExtensionEnabled;
        /**
         * After exporting a material
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns promise, resolves with the material
         */
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_emissive_strength/README.md)
     */
    export class KHR_materials_emissive_strength implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_emissive_strength";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _wasUsed;
        /** Dispose */
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        /**
         * After exporting a material
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns promise, resolves with the material
         */
        postExportMaterialAsync(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/87bd64a7f5e23c84b6aef2e6082069583ed0ddb4/extensions/2.0/Khronos/KHR_materials_dispersion/README.md)
     * @experimental
     */
    export class KHR_materials_dispersion implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_dispersion";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _wasUsed;
        /** Constructor */
        constructor();
        /** Dispose */
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        private _isExtensionEnabled;
        /**
         * After exporting a material
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns promise, resolves with the material
         */
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * [Proposed Specification](https://github.com/KhronosGroup/glTF/pull/1825)
     * !!! Experimental Extension Subject to Changes !!!
     */
    export class KHR_materials_diffuse_transmission implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_diffuse_transmission";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _exporter;
        private _wasUsed;
        constructor(exporter: GLTFExporter);
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        /**
         * After exporting a material, deal with additional textures
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns array of additional textures to export
         */
        postExportMaterialAdditionalTextures?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): BaseTexture[];
        private _isExtensionEnabled;
        private _hasTexturesExtension;
        /**
         * After exporting a material
         * @param context GLTF context of the material
         * @param node exported GLTF node
         * @param babylonMaterial corresponding babylon material
         * @returns promise that resolves with the updated node
         */
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * @internal
     */
    export class KHR_materials_clearcoat implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_clearcoat";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _exporter;
        private _wasUsed;
        constructor(exporter: GLTFExporter);
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        postExportMaterialAdditionalTextures?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): BaseTexture[];
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * @internal
     */
    export class KHR_materials_anisotropy implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_materials_anisotropy";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _exporter;
        private _wasUsed;
        constructor(exporter: GLTFExporter);
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        postExportMaterialAdditionalTextures?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): BaseTexture[];
        postExportMaterialAsync?(context: string, node: BABYLON.GLTF2.IMaterial, babylonMaterial: Material): Promise<BABYLON.GLTF2.IMaterial>;
    }


    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/master/extensions/2.0/Khronos/KHR_lights_punctual/README.md)
     */
    export class KHR_lights_punctual implements IGLTFExporterExtensionV2 {
        /** The name of this extension. */
        readonly name = "KHR_lights_punctual";
        /** Defines whether this extension is enabled. */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        /** Reference to the glTF exporter */
        private _exporter;
        private _lights;
        /**
         * @internal
         */
        constructor(exporter: GLTFExporter);
        /** @internal */
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        /** @internal */
        onExporting(): void;
        /**
         * Define this method to modify the default behavior when exporting a node
         * @param context The context when exporting the node
         * @param node glTF node
         * @param babylonNode BabylonJS node
         * @param nodeMap Node mapping of babylon node to glTF node index
         * @param convertToRightHanded Flag to convert the values to right-handed
         * @returns nullable BABYLON.GLTF2.INode promise
         */
        postExportNodeAsync(context: string, node: BABYLON.GLTF2.INode, babylonNode: Node, nodeMap: Map<Node, number>, convertToRightHanded: boolean): Promise<Nullable<BABYLON.GLTF2.INode>>;
    }


    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_draco_mesh_compression/README.md)
     */
    export class KHR_draco_mesh_compression implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "KHR_draco_mesh_compression";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** KHR_draco_mesh_compression is required, as uncompressed fallback data is not yet implemented. */
        required: boolean;
        /** BufferViews used for Draco data, which may be eligible for removal after Draco encoding */
        private _bufferViewsUsed;
        /** Accessors that were replaced with Draco data, which may be eligible for removal after Draco encoding */
        private _accessorsUsed;
        /** Promise pool for Draco encoding work */
        private _encodePromises;
        private _wasUsed;
        /** @internal */
        get wasUsed(): boolean;
        /** @internal */
        constructor(exporter: GLTFExporter);
        /** @internal */
        dispose(): void;
        /** @internal */
        postExportMeshPrimitive(primitive: BABYLON.GLTF2.IMeshPrimitive, bufferManager: BufferManager, accessors: BABYLON.GLTF2.IAccessor[]): void;
        /** @internal */
        preGenerateBinaryAsync(bufferManager: BufferManager): Promise<void>;
    }


    /**
     * [Specification](https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing/README.md)
     */
    export class EXT_mesh_gpu_instancing implements IGLTFExporterExtensionV2 {
        /** Name of this extension */
        readonly name = "EXT_mesh_gpu_instancing";
        /** Defines whether this extension is enabled */
        enabled: boolean;
        /** Defines whether this extension is required */
        required: boolean;
        private _exporter;
        private _wasUsed;
        constructor(exporter: GLTFExporter);
        dispose(): void;
        /** @internal */
        get wasUsed(): boolean;
        /**
         * After node is exported
         * @param context the GLTF context when loading the asset
         * @param node the node exported
         * @param babylonNode the corresponding babylon node
         * @param nodeMap map from babylon node id to node index
         * @param convertToRightHanded true if we need to convert data from left hand to right hand system.
         * @param bufferManager buffer manager
         * @returns nullable promise, resolves with the node
         */
        postExportNodeAsync(context: string, node: Nullable<BABYLON.GLTF2.INode>, babylonNode: Node, nodeMap: Map<Node, number>, convertToRightHanded: boolean, bufferManager: BufferManager): Promise<Nullable<BABYLON.GLTF2.INode>>;
        private _buildAccessor;
    }


    /**
     * Options for the USDZ export
     */
    export interface IUSDZExportOptions {
        /**
         * URL to load the fflate library from
         */
        fflateUrl?: string;
        /**
         * Include anchoring properties in the USDZ file
         */
        includeAnchoringProperties?: boolean;
        /**
         * Anchoring type (plane by default)
         */
        anchoringType?: string;
        /**
         * Plane anchoring alignment (horizontal by default)
         */
        planeAnchoringAlignment?: string;
        /**
         * Model file name (model.usda by default)
         */
        modelFileName?: string;
        /**
         * Precision to use for number (5 by default)
         */
        precision?: number;
        /**
         * Export the camera (false by default)
         */
        exportCamera?: boolean;
        /**
         * Camera sensor width (35 by default)
         */
        cameraSensorWidth?: number;
    }
    /**
     *
     * @param scene scene to export
     * @param options options to configure the export
     * @param meshPredicate predicate to filter the meshes to export
     * @returns a uint8 array containing the USDZ file
     * #H2G5XW#6 - Simple sphere
     * #H2G5XW#7 - Red sphere
     * #5N3RWK#5 - Boombox
     */
    export function USDZExportAsync(scene: Scene, options: Partial<IUSDZExportOptions>, meshPredicate?: (m: Mesh) => boolean): Promise<Uint8Array>;




    /**
     * Class for generating OBJ data from a Babylon scene.
     */
    export class OBJExport {
        /**
         * Exports the geometry of a Mesh array in .OBJ file format (text)
         * @param meshes defines the list of meshes to serialize
         * @param materials defines if materials should be exported
         * @param matlibname defines the name of the associated mtl file
         * @param globalposition defines if the exported positions are globals or local to the exported mesh
         * @returns the OBJ content
         */
        static OBJ(meshes: Mesh[], materials?: boolean, matlibname?: string, globalposition?: boolean): string;
        /**
         * Exports the material(s) of a mesh in .MTL file format (text)
         * @param mesh defines the mesh to extract the material from
         * @returns the mtl content
         */
        static MTL(mesh: Mesh): string;
    }













}


