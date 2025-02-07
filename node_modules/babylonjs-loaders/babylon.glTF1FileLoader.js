(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-loaders", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-loaders"] = factory(require("babylonjs"));
	else
		root["LOADERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_tools__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/loaders/src/glTF/1.0/glTFBinaryExtension.ts":
/*!****************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/1.0/glTFBinaryExtension.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFBinaryExtension: () => (/* binding */ GLTFBinaryExtension)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFLoader */ "../../../dev/loaders/src/glTF/1.0/glTFLoader.ts");
/* harmony import */ var _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFLoaderUtils */ "../../../dev/loaders/src/glTF/1.0/glTFLoaderUtils.ts");
/* harmony import */ var _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFLoaderInterfaces */ "../../../dev/loaders/src/glTF/1.0/glTFLoaderInterfaces.ts");




var BinaryExtensionBufferName = "binary_glTF";
/**
 * @internal
 * @deprecated
 */
var GLTFBinaryExtension = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(GLTFBinaryExtension, _super);
    function GLTFBinaryExtension() {
        return _super.call(this, "KHR_binary_glTF") || this;
    }
    GLTFBinaryExtension.prototype.loadRuntimeAsync = function (scene, data, rootUrl, onSuccess) {
        var extensionsUsed = data.json.extensionsUsed;
        if (!extensionsUsed || extensionsUsed.indexOf(this.name) === -1 || !data.bin) {
            return false;
        }
        this._bin = data.bin;
        onSuccess(_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderBase.CreateRuntime(data.json, scene, rootUrl));
        return true;
    };
    GLTFBinaryExtension.prototype.loadBufferAsync = function (gltfRuntime, id, onSuccess, onError) {
        if (gltfRuntime.extensionsUsed.indexOf(this.name) === -1) {
            return false;
        }
        if (id !== BinaryExtensionBufferName) {
            return false;
        }
        this._bin.readAsync(0, this._bin.byteLength).then(onSuccess, function (error) { return onError(error.message); });
        return true;
    };
    GLTFBinaryExtension.prototype.loadTextureBufferAsync = function (gltfRuntime, id, onSuccess) {
        var texture = gltfRuntime.textures[id];
        var source = gltfRuntime.images[texture.source];
        if (!source.extensions || !(this.name in source.extensions)) {
            return false;
        }
        var sourceExt = source.extensions[this.name];
        var bufferView = gltfRuntime.bufferViews[sourceExt.bufferView];
        var buffer = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_1__.GLTFUtils.GetBufferFromBufferView(gltfRuntime, bufferView, 0, bufferView.byteLength, _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EComponentType.UNSIGNED_BYTE);
        onSuccess(buffer);
        return true;
    };
    GLTFBinaryExtension.prototype.loadShaderStringAsync = function (gltfRuntime, id, onSuccess) {
        var shader = gltfRuntime.shaders[id];
        if (!shader.extensions || !(this.name in shader.extensions)) {
            return false;
        }
        var binaryExtensionShader = shader.extensions[this.name];
        var bufferView = gltfRuntime.bufferViews[binaryExtensionShader.bufferView];
        var shaderBytes = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_1__.GLTFUtils.GetBufferFromBufferView(gltfRuntime, bufferView, 0, bufferView.byteLength, _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EComponentType.UNSIGNED_BYTE);
        setTimeout(function () {
            var shaderString = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_1__.GLTFUtils.DecodeBufferToText(shaderBytes);
            onSuccess(shaderString);
        });
        return true;
    };
    return GLTFBinaryExtension;
}(_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderExtension));

_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(new GLTFBinaryExtension());


/***/ }),

/***/ "../../../dev/loaders/src/glTF/1.0/glTFLoader.ts":
/*!*******************************************************!*\
  !*** ../../../dev/loaders/src/glTF/1.0/glTFLoader.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFLoader: () => (/* binding */ GLTFLoader),
/* harmony export */   GLTFLoaderBase: () => (/* binding */ GLTFLoaderBase),
/* harmony export */   GLTFLoaderExtension: () => (/* binding */ GLTFLoaderExtension)
/* harmony export */ });
/* harmony import */ var _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFLoaderInterfaces */ "../../../dev/loaders/src/glTF/1.0/glTFLoaderInterfaces.ts");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Engines/constants */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFLoaderUtils */ "../../../dev/loaders/src/glTF/1.0/glTFLoaderUtils.ts");
/* harmony import */ var _glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../glTFFileLoader */ "../../../dev/loaders/src/glTF/glTFFileLoader.ts");




























/**
 * Tokenizer. Used for shaders compatibility
 * Automatically map world, view, projection, worldViewProjection, attributes and so on
 */
var ETokenType;
(function (ETokenType) {
    ETokenType[ETokenType["IDENTIFIER"] = 1] = "IDENTIFIER";
    ETokenType[ETokenType["UNKNOWN"] = 2] = "UNKNOWN";
    ETokenType[ETokenType["END_OF_INPUT"] = 3] = "END_OF_INPUT";
})(ETokenType || (ETokenType = {}));
var Tokenizer = /** @class */ (function () {
    function Tokenizer(toParse) {
        this._pos = 0;
        this.currentToken = ETokenType.UNKNOWN;
        this.currentIdentifier = "";
        this.currentString = "";
        this.isLetterOrDigitPattern = /^[a-zA-Z0-9]+$/;
        this._toParse = toParse;
        this._maxPos = toParse.length;
    }
    Tokenizer.prototype.getNextToken = function () {
        if (this.isEnd()) {
            return ETokenType.END_OF_INPUT;
        }
        this.currentString = this.read();
        this.currentToken = ETokenType.UNKNOWN;
        if (this.currentString === "_" || this.isLetterOrDigitPattern.test(this.currentString)) {
            this.currentToken = ETokenType.IDENTIFIER;
            this.currentIdentifier = this.currentString;
            while (!this.isEnd() && (this.isLetterOrDigitPattern.test((this.currentString = this.peek())) || this.currentString === "_")) {
                this.currentIdentifier += this.currentString;
                this.forward();
            }
        }
        return this.currentToken;
    };
    Tokenizer.prototype.peek = function () {
        return this._toParse[this._pos];
    };
    Tokenizer.prototype.read = function () {
        return this._toParse[this._pos++];
    };
    Tokenizer.prototype.forward = function () {
        this._pos++;
    };
    Tokenizer.prototype.isEnd = function () {
        return this._pos >= this._maxPos;
    };
    return Tokenizer;
}());
/**
 * Values
 */
var glTFTransforms = ["MODEL", "VIEW", "PROJECTION", "MODELVIEW", "MODELVIEWPROJECTION", "JOINTMATRIX"];
var babylonTransforms = ["world", "view", "projection", "worldView", "worldViewProjection", "mBones"];
var glTFAnimationPaths = ["translation", "rotation", "scale"];
var babylonAnimationPaths = ["position", "rotationQuaternion", "scaling"];
/**
 * Parse
 * @param parsedBuffers
 * @param gltfRuntime
 */
var parseBuffers = function (parsedBuffers, gltfRuntime) {
    for (var buf in parsedBuffers) {
        var parsedBuffer = parsedBuffers[buf];
        gltfRuntime.buffers[buf] = parsedBuffer;
        gltfRuntime.buffersCount++;
    }
};
var parseShaders = function (parsedShaders, gltfRuntime) {
    for (var sha in parsedShaders) {
        var parsedShader = parsedShaders[sha];
        gltfRuntime.shaders[sha] = parsedShader;
        gltfRuntime.shaderscount++;
    }
};
var parseObject = function (parsedObjects, runtimeProperty, gltfRuntime) {
    for (var object in parsedObjects) {
        var parsedObject = parsedObjects[object];
        gltfRuntime[runtimeProperty][object] = parsedObject;
    }
};
/**
 * Utils
 * @param buffer
 */
var normalizeUVs = function (buffer) {
    if (!buffer) {
        return;
    }
    for (var i = 0; i < buffer.length / 2; i++) {
        buffer[i * 2 + 1] = 1.0 - buffer[i * 2 + 1];
    }
};
var getAttribute = function (attributeParameter) {
    if (attributeParameter.semantic === "NORMAL") {
        return "normal";
    }
    else if (attributeParameter.semantic === "POSITION") {
        return "position";
    }
    else if (attributeParameter.semantic === "JOINT") {
        return "matricesIndices";
    }
    else if (attributeParameter.semantic === "WEIGHT") {
        return "matricesWeights";
    }
    else if (attributeParameter.semantic === "COLOR") {
        return "color";
    }
    else if (attributeParameter.semantic && attributeParameter.semantic.indexOf("TEXCOORD_") !== -1) {
        var channel = Number(attributeParameter.semantic.split("_")[1]);
        return "uv" + (channel === 0 ? "" : channel + 1);
    }
    return null;
};
/**
 * Loads and creates animations
 * @param gltfRuntime
 */
var loadAnimations = function (gltfRuntime) {
    for (var anim in gltfRuntime.animations) {
        var animation = gltfRuntime.animations[anim];
        if (!animation.channels || !animation.samplers) {
            continue;
        }
        var lastAnimation = null;
        for (var i = 0; i < animation.channels.length; i++) {
            // Get parameters and load buffers
            var channel = animation.channels[i];
            var sampler = animation.samplers[channel.sampler];
            if (!sampler) {
                continue;
            }
            var inputData = null;
            var outputData = null;
            if (animation.parameters) {
                inputData = animation.parameters[sampler.input];
                outputData = animation.parameters[sampler.output];
            }
            else {
                inputData = sampler.input;
                outputData = sampler.output;
            }
            var bufferInput = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetBufferFromAccessor(gltfRuntime, gltfRuntime.accessors[inputData]);
            var bufferOutput = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetBufferFromAccessor(gltfRuntime, gltfRuntime.accessors[outputData]);
            var targetId = channel.target.id;
            var targetNode = gltfRuntime.scene.getNodeById(targetId);
            if (targetNode === null) {
                targetNode = gltfRuntime.scene.getNodeByName(targetId);
            }
            if (targetNode === null) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Creating animation named " + anim + ". But cannot find node named " + targetId + " to attach to");
                continue;
            }
            var isBone = targetNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Bone;
            // Get target path (position, rotation or scaling)
            var targetPath = channel.target.path;
            var targetPathIndex = glTFAnimationPaths.indexOf(targetPath);
            if (targetPathIndex !== -1) {
                targetPath = babylonAnimationPaths[targetPathIndex];
            }
            // Determine animation type
            var animationType = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Animation.ANIMATIONTYPE_MATRIX;
            if (!isBone) {
                if (targetPath === "rotationQuaternion") {
                    animationType = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Animation.ANIMATIONTYPE_QUATERNION;
                    targetNode.rotationQuaternion = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion();
                }
                else {
                    animationType = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Animation.ANIMATIONTYPE_VECTOR3;
                }
            }
            // Create animation and key frames
            var babylonAnimation = null;
            var keys = [];
            var arrayOffset = 0;
            var modifyKey = false;
            if (isBone && lastAnimation && lastAnimation.getKeys().length === bufferInput.length) {
                babylonAnimation = lastAnimation;
                modifyKey = true;
            }
            if (!modifyKey) {
                gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
                babylonAnimation = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Animation(anim, isBone ? "_matrix" : targetPath, 1, animationType, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Animation.ANIMATIONLOOPMODE_CYCLE);
                gltfRuntime.scene._blockEntityCollection = false;
            }
            // For each frame
            for (var j = 0; j < bufferInput.length; j++) {
                var value = null;
                if (targetPath === "rotationQuaternion") {
                    // VEC4
                    value = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion.FromArray([bufferOutput[arrayOffset], bufferOutput[arrayOffset + 1], bufferOutput[arrayOffset + 2], bufferOutput[arrayOffset + 3]]);
                    arrayOffset += 4;
                }
                else {
                    // Position and scaling are VEC3
                    value = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray([bufferOutput[arrayOffset], bufferOutput[arrayOffset + 1], bufferOutput[arrayOffset + 2]]);
                    arrayOffset += 3;
                }
                if (isBone) {
                    var bone = targetNode;
                    var translation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero();
                    var rotationQuaternion = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion();
                    var scaling = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero();
                    // Warning on decompose
                    var mat = bone.getBaseMatrix();
                    if (modifyKey && lastAnimation) {
                        mat = lastAnimation.getKeys()[j].value;
                    }
                    mat.decompose(scaling, rotationQuaternion, translation);
                    if (targetPath === "position") {
                        translation = value;
                    }
                    else if (targetPath === "rotationQuaternion") {
                        rotationQuaternion = value;
                    }
                    else {
                        scaling = value;
                    }
                    value = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.Compose(scaling, rotationQuaternion, translation);
                }
                if (!modifyKey) {
                    keys.push({
                        frame: bufferInput[j],
                        value: value,
                    });
                }
                else if (lastAnimation) {
                    lastAnimation.getKeys()[j].value = value;
                }
            }
            // Finish
            if (!modifyKey && babylonAnimation) {
                babylonAnimation.setKeys(keys);
                targetNode.animations.push(babylonAnimation);
            }
            lastAnimation = babylonAnimation;
            gltfRuntime.scene.stopAnimation(targetNode);
            gltfRuntime.scene.beginAnimation(targetNode, 0, bufferInput[bufferInput.length - 1], true, 1.0);
        }
    }
};
/**
 * @returns the bones transformation matrix
 * @param node
 */
var configureBoneTransformation = function (node) {
    var mat = null;
    if (node.translation || node.rotation || node.scale) {
        var scale = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(node.scale || [1, 1, 1]);
        var rotation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion.FromArray(node.rotation || [0, 0, 0, 1]);
        var position = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(node.translation || [0, 0, 0]);
        mat = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.Compose(scale, rotation, position);
    }
    else {
        mat = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.FromArray(node.matrix);
    }
    return mat;
};
/**
 * Returns the parent bone
 * @param gltfRuntime
 * @param skins
 * @param jointName
 * @param newSkeleton
 * @returns the parent bone
 */
var getParentBone = function (gltfRuntime, skins, jointName, newSkeleton) {
    // Try to find
    for (var i = 0; i < newSkeleton.bones.length; i++) {
        if (newSkeleton.bones[i].name === jointName) {
            return newSkeleton.bones[i];
        }
    }
    // Not found, search in gltf nodes
    var nodes = gltfRuntime.nodes;
    for (var nde in nodes) {
        var node = nodes[nde];
        if (!node.jointName) {
            continue;
        }
        var children = node.children;
        for (var i = 0; i < children.length; i++) {
            var child = gltfRuntime.nodes[children[i]];
            if (!child.jointName) {
                continue;
            }
            if (child.jointName === jointName) {
                var mat = configureBoneTransformation(node);
                var bone = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Bone(node.name || "", newSkeleton, getParentBone(gltfRuntime, skins, node.jointName, newSkeleton), mat);
                bone.id = nde;
                return bone;
            }
        }
    }
    return null;
};
/**
 * Returns the appropriate root node
 * @param nodesToRoot
 * @param id
 * @returns the root node
 */
var getNodeToRoot = function (nodesToRoot, id) {
    for (var i = 0; i < nodesToRoot.length; i++) {
        var nodeToRoot = nodesToRoot[i];
        for (var j = 0; j < nodeToRoot.node.children.length; j++) {
            var child = nodeToRoot.node.children[j];
            if (child === id) {
                return nodeToRoot.bone;
            }
        }
    }
    return null;
};
/**
 * Returns the node with the joint name
 * @param gltfRuntime
 * @param jointName
 * @returns the node with the joint name
 */
var getJointNode = function (gltfRuntime, jointName) {
    var nodes = gltfRuntime.nodes;
    var node = nodes[jointName];
    if (node) {
        return {
            node: node,
            id: jointName,
        };
    }
    for (var nde in nodes) {
        node = nodes[nde];
        if (node.jointName === jointName) {
            return {
                node: node,
                id: nde,
            };
        }
    }
    return null;
};
/**
 * Checks if a nodes is in joints
 * @param skins
 * @param id
 * @returns true if the node is in joints, else false
 */
var nodeIsInJoints = function (skins, id) {
    for (var i = 0; i < skins.jointNames.length; i++) {
        if (skins.jointNames[i] === id) {
            return true;
        }
    }
    return false;
};
/**
 * Fills the nodes to root for bones and builds hierarchy
 * @param gltfRuntime
 * @param newSkeleton
 * @param skins
 * @param nodesToRoot
 */
var getNodesToRoot = function (gltfRuntime, newSkeleton, skins, nodesToRoot) {
    // Creates nodes for root
    for (var nde in gltfRuntime.nodes) {
        var node = gltfRuntime.nodes[nde];
        var id = nde;
        if (!node.jointName || nodeIsInJoints(skins, node.jointName)) {
            continue;
        }
        // Create node to root bone
        var mat = configureBoneTransformation(node);
        var bone = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Bone(node.name || "", newSkeleton, null, mat);
        bone.id = id;
        nodesToRoot.push({ bone: bone, node: node, id: id });
    }
    // Parenting
    for (var i = 0; i < nodesToRoot.length; i++) {
        var nodeToRoot = nodesToRoot[i];
        var children = nodeToRoot.node.children;
        for (var j = 0; j < children.length; j++) {
            var child = null;
            for (var k = 0; k < nodesToRoot.length; k++) {
                if (nodesToRoot[k].id === children[j]) {
                    child = nodesToRoot[k];
                    break;
                }
            }
            if (child) {
                child.bone._parent = nodeToRoot.bone;
                nodeToRoot.bone.children.push(child.bone);
            }
        }
    }
};
/**
 * Imports a skeleton
 * @param gltfRuntime
 * @param skins
 * @param mesh
 * @param newSkeleton
 * @returns the bone name
 */
var importSkeleton = function (gltfRuntime, skins, mesh, newSkeleton) {
    if (!newSkeleton) {
        newSkeleton = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Skeleton(skins.name || "", "", gltfRuntime.scene);
    }
    if (!skins.babylonSkeleton) {
        return newSkeleton;
    }
    // Find the root bones
    var nodesToRoot = [];
    var nodesToRootToAdd = [];
    getNodesToRoot(gltfRuntime, newSkeleton, skins, nodesToRoot);
    newSkeleton.bones = [];
    // Joints
    for (var i = 0; i < skins.jointNames.length; i++) {
        var jointNode = getJointNode(gltfRuntime, skins.jointNames[i]);
        if (!jointNode) {
            continue;
        }
        var node = jointNode.node;
        if (!node) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Joint named " + skins.jointNames[i] + " does not exist");
            continue;
        }
        var id = jointNode.id;
        // Optimize, if the bone already exists...
        var existingBone = gltfRuntime.scene.getBoneById(id);
        if (existingBone) {
            newSkeleton.bones.push(existingBone);
            continue;
        }
        // Search for parent bone
        var foundBone = false;
        var parentBone = null;
        for (var j = 0; j < i; j++) {
            var jointNode_1 = getJointNode(gltfRuntime, skins.jointNames[j]);
            if (!jointNode_1) {
                continue;
            }
            var joint = jointNode_1.node;
            if (!joint) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Joint named " + skins.jointNames[j] + " does not exist when looking for parent");
                continue;
            }
            var children = joint.children;
            if (!children) {
                continue;
            }
            foundBone = false;
            for (var k = 0; k < children.length; k++) {
                if (children[k] === id) {
                    parentBone = getParentBone(gltfRuntime, skins, skins.jointNames[j], newSkeleton);
                    foundBone = true;
                    break;
                }
            }
            if (foundBone) {
                break;
            }
        }
        // Create bone
        var mat = configureBoneTransformation(node);
        if (!parentBone && nodesToRoot.length > 0) {
            parentBone = getNodeToRoot(nodesToRoot, id);
            if (parentBone) {
                if (nodesToRootToAdd.indexOf(parentBone) === -1) {
                    nodesToRootToAdd.push(parentBone);
                }
            }
        }
        var bone = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Bone(node.jointName || "", newSkeleton, parentBone, mat);
        bone.id = id;
    }
    // Polish
    var bones = newSkeleton.bones;
    newSkeleton.bones = [];
    for (var i = 0; i < skins.jointNames.length; i++) {
        var jointNode = getJointNode(gltfRuntime, skins.jointNames[i]);
        if (!jointNode) {
            continue;
        }
        for (var j = 0; j < bones.length; j++) {
            if (bones[j].id === jointNode.id) {
                newSkeleton.bones.push(bones[j]);
                break;
            }
        }
    }
    newSkeleton.prepare();
    // Finish
    for (var i = 0; i < nodesToRootToAdd.length; i++) {
        newSkeleton.bones.push(nodesToRootToAdd[i]);
    }
    return newSkeleton;
};
/**
 * Imports a mesh and its geometries
 * @param gltfRuntime
 * @param node
 * @param meshes
 * @param id
 * @param newMesh
 * @returns the new mesh
 */
var importMesh = function (gltfRuntime, node, meshes, id, newMesh) {
    if (!newMesh) {
        gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
        newMesh = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Mesh(node.name || "", gltfRuntime.scene);
        newMesh._parentContainer = gltfRuntime.assetContainer;
        gltfRuntime.scene._blockEntityCollection = false;
        newMesh.id = id;
    }
    if (!node.babylonNode) {
        return newMesh;
    }
    var subMaterials = [];
    var vertexData = null;
    var verticesStarts = [];
    var verticesCounts = [];
    var indexStarts = [];
    var indexCounts = [];
    for (var meshIndex = 0; meshIndex < meshes.length; meshIndex++) {
        var meshId = meshes[meshIndex];
        var mesh = gltfRuntime.meshes[meshId];
        if (!mesh) {
            continue;
        }
        // Positions, normals and UVs
        for (var i = 0; i < mesh.primitives.length; i++) {
            // Temporary vertex data
            var tempVertexData = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.VertexData();
            var primitive = mesh.primitives[i];
            if (primitive.mode !== 4) {
                // continue;
            }
            var attributes = primitive.attributes;
            var accessor = null;
            var buffer = null;
            // Set positions, normal and uvs
            for (var semantic in attributes) {
                // Link accessor and buffer view
                accessor = gltfRuntime.accessors[attributes[semantic]];
                buffer = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetBufferFromAccessor(gltfRuntime, accessor);
                if (semantic === "NORMAL") {
                    tempVertexData.normals = new Float32Array(buffer.length);
                    tempVertexData.normals.set(buffer);
                }
                else if (semantic === "POSITION") {
                    if (_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader.HomogeneousCoordinates) {
                        tempVertexData.positions = new Float32Array(buffer.length - buffer.length / 4);
                        for (var j = 0; j < buffer.length; j += 4) {
                            tempVertexData.positions[j] = buffer[j];
                            tempVertexData.positions[j + 1] = buffer[j + 1];
                            tempVertexData.positions[j + 2] = buffer[j + 2];
                        }
                    }
                    else {
                        tempVertexData.positions = new Float32Array(buffer.length);
                        tempVertexData.positions.set(buffer);
                    }
                    verticesCounts.push(tempVertexData.positions.length);
                }
                else if (semantic.indexOf("TEXCOORD_") !== -1) {
                    var channel = Number(semantic.split("_")[1]);
                    var uvKind = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.VertexBuffer.UVKind + (channel === 0 ? "" : channel + 1);
                    var uvs = new Float32Array(buffer.length);
                    uvs.set(buffer);
                    normalizeUVs(uvs);
                    tempVertexData.set(uvs, uvKind);
                }
                else if (semantic === "JOINT") {
                    tempVertexData.matricesIndices = new Float32Array(buffer.length);
                    tempVertexData.matricesIndices.set(buffer);
                }
                else if (semantic === "WEIGHT") {
                    tempVertexData.matricesWeights = new Float32Array(buffer.length);
                    tempVertexData.matricesWeights.set(buffer);
                }
                else if (semantic === "COLOR") {
                    tempVertexData.colors = new Float32Array(buffer.length);
                    tempVertexData.colors.set(buffer);
                }
            }
            // Indices
            accessor = gltfRuntime.accessors[primitive.indices];
            if (accessor) {
                buffer = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetBufferFromAccessor(gltfRuntime, accessor);
                tempVertexData.indices = new Int32Array(buffer.length);
                tempVertexData.indices.set(buffer);
                indexCounts.push(tempVertexData.indices.length);
            }
            else {
                // Set indices on the fly
                var indices = [];
                for (var j = 0; j < tempVertexData.positions.length / 3; j++) {
                    indices.push(j);
                }
                tempVertexData.indices = new Int32Array(indices);
                indexCounts.push(tempVertexData.indices.length);
            }
            if (!vertexData) {
                vertexData = tempVertexData;
            }
            else {
                vertexData.merge(tempVertexData);
            }
            // Sub material
            var material_1 = gltfRuntime.scene.getMaterialById(primitive.material);
            subMaterials.push(material_1 === null ? _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetDefaultMaterial(gltfRuntime.scene) : material_1);
            // Update vertices start and index start
            verticesStarts.push(verticesStarts.length === 0 ? 0 : verticesStarts[verticesStarts.length - 1] + verticesCounts[verticesCounts.length - 2]);
            indexStarts.push(indexStarts.length === 0 ? 0 : indexStarts[indexStarts.length - 1] + indexCounts[indexCounts.length - 2]);
        }
    }
    var material;
    gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
    if (subMaterials.length > 1) {
        material = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.MultiMaterial("multimat" + id, gltfRuntime.scene);
        material.subMaterials = subMaterials;
    }
    else {
        material = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial("multimat" + id, gltfRuntime.scene);
    }
    if (subMaterials.length === 1) {
        material = subMaterials[0];
    }
    material._parentContainer = gltfRuntime.assetContainer;
    if (!newMesh.material) {
        newMesh.material = material;
    }
    // Apply geometry
    new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Geometry(id, gltfRuntime.scene, vertexData, false, newMesh);
    newMesh.computeWorldMatrix(true);
    gltfRuntime.scene._blockEntityCollection = false;
    // Apply submeshes
    newMesh.subMeshes = [];
    var index = 0;
    for (var meshIndex = 0; meshIndex < meshes.length; meshIndex++) {
        var meshId = meshes[meshIndex];
        var mesh = gltfRuntime.meshes[meshId];
        if (!mesh) {
            continue;
        }
        for (var i = 0; i < mesh.primitives.length; i++) {
            if (mesh.primitives[i].mode !== 4) {
                //continue;
            }
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.SubMesh.AddToMesh(index, verticesStarts[index], verticesCounts[index], indexStarts[index], indexCounts[index], newMesh, newMesh, true);
            index++;
        }
    }
    // Finish
    return newMesh;
};
/**
 * Configure node transformation from position, rotation and scaling
 * @param newNode
 * @param position
 * @param rotation
 * @param scaling
 */
var configureNode = function (newNode, position, rotation, scaling) {
    if (newNode.position) {
        newNode.position = position;
    }
    if (newNode.rotationQuaternion || newNode.rotation) {
        newNode.rotationQuaternion = rotation;
    }
    if (newNode.scaling) {
        newNode.scaling = scaling;
    }
};
/**
 * Configures node from transformation matrix
 * @param newNode
 * @param node
 */
var configureNodeFromMatrix = function (newNode, node) {
    if (node.matrix) {
        var position = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
        var rotation = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion();
        var scaling = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0);
        var mat = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.FromArray(node.matrix);
        mat.decompose(scaling, rotation, position);
        configureNode(newNode, position, rotation, scaling);
    }
    else if (node.translation && node.rotation && node.scale) {
        configureNode(newNode, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(node.translation), babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion.FromArray(node.rotation), babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(node.scale));
    }
    newNode.computeWorldMatrix(true);
};
/**
 * Imports a node
 * @param gltfRuntime
 * @param node
 * @param id
 * @returns the newly imported node
 */
var importNode = function (gltfRuntime, node, id) {
    var lastNode = null;
    if (gltfRuntime.importOnlyMeshes && (node.skin || node.meshes)) {
        if (gltfRuntime.importMeshesNames && gltfRuntime.importMeshesNames.length > 0 && gltfRuntime.importMeshesNames.indexOf(node.name || "") === -1) {
            return null;
        }
    }
    // Meshes
    if (node.skin) {
        if (node.meshes) {
            var skin = gltfRuntime.skins[node.skin];
            var newMesh = importMesh(gltfRuntime, node, node.meshes, id, node.babylonNode);
            newMesh.skeleton = gltfRuntime.scene.getLastSkeletonById(node.skin);
            if (newMesh.skeleton === null) {
                newMesh.skeleton = importSkeleton(gltfRuntime, skin, newMesh, skin.babylonSkeleton);
                if (!skin.babylonSkeleton) {
                    skin.babylonSkeleton = newMesh.skeleton;
                }
            }
            lastNode = newMesh;
        }
    }
    else if (node.meshes) {
        /**
         * Improve meshes property
         */
        var newMesh = importMesh(gltfRuntime, node, node.mesh ? [node.mesh] : node.meshes, id, node.babylonNode);
        lastNode = newMesh;
    }
    // Lights
    else if (node.light && !node.babylonNode && !gltfRuntime.importOnlyMeshes) {
        var light = gltfRuntime.lights[node.light];
        if (light) {
            if (light.type === "ambient") {
                var ambienLight = light[light.type];
                var hemiLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.HemisphericLight(node.light, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), gltfRuntime.scene);
                hemiLight.name = node.name || "";
                if (ambienLight.color) {
                    hemiLight.diffuse = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(ambienLight.color);
                }
                lastNode = hemiLight;
            }
            else if (light.type === "directional") {
                var directionalLight = light[light.type];
                var dirLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(node.light, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), gltfRuntime.scene);
                dirLight.name = node.name || "";
                if (directionalLight.color) {
                    dirLight.diffuse = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(directionalLight.color);
                }
                lastNode = dirLight;
            }
            else if (light.type === "point") {
                var pointLight = light[light.type];
                var ptLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.PointLight(node.light, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), gltfRuntime.scene);
                ptLight.name = node.name || "";
                if (pointLight.color) {
                    ptLight.diffuse = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(pointLight.color);
                }
                lastNode = ptLight;
            }
            else if (light.type === "spot") {
                var spotLight = light[light.type];
                var spLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.SpotLight(node.light, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), 0, 0, gltfRuntime.scene);
                spLight.name = node.name || "";
                if (spotLight.color) {
                    spLight.diffuse = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(spotLight.color);
                }
                if (spotLight.fallOfAngle) {
                    spLight.angle = spotLight.fallOfAngle;
                }
                if (spotLight.fallOffExponent) {
                    spLight.exponent = spotLight.fallOffExponent;
                }
                lastNode = spLight;
            }
        }
    }
    // Cameras
    else if (node.camera && !node.babylonNode && !gltfRuntime.importOnlyMeshes) {
        var camera = gltfRuntime.cameras[node.camera];
        if (camera) {
            gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
            if (camera.type === "orthographic") {
                var orthoCamera = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.FreeCamera(node.camera, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), gltfRuntime.scene, false);
                orthoCamera.name = node.name || "";
                orthoCamera.mode = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Camera.ORTHOGRAPHIC_CAMERA;
                orthoCamera.attachControl();
                lastNode = orthoCamera;
                orthoCamera._parentContainer = gltfRuntime.assetContainer;
            }
            else if (camera.type === "perspective") {
                var perspectiveCamera = camera[camera.type];
                var persCamera = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.FreeCamera(node.camera, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.Zero(), gltfRuntime.scene, false);
                persCamera.name = node.name || "";
                persCamera.attachControl();
                if (!perspectiveCamera.aspectRatio) {
                    perspectiveCamera.aspectRatio = gltfRuntime.scene.getEngine().getRenderWidth() / gltfRuntime.scene.getEngine().getRenderHeight();
                }
                if (perspectiveCamera.znear && perspectiveCamera.zfar) {
                    persCamera.maxZ = perspectiveCamera.zfar;
                    persCamera.minZ = perspectiveCamera.znear;
                }
                lastNode = persCamera;
                persCamera._parentContainer = gltfRuntime.assetContainer;
            }
            gltfRuntime.scene._blockEntityCollection = false;
        }
    }
    // Empty node
    if (!node.jointName) {
        if (node.babylonNode) {
            return node.babylonNode;
        }
        else if (lastNode === null) {
            gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
            var dummy = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Mesh(node.name || "", gltfRuntime.scene);
            dummy._parentContainer = gltfRuntime.assetContainer;
            gltfRuntime.scene._blockEntityCollection = false;
            node.babylonNode = dummy;
            lastNode = dummy;
        }
    }
    if (lastNode !== null) {
        if (node.matrix && lastNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Mesh) {
            configureNodeFromMatrix(lastNode, node);
        }
        else {
            var translation = node.translation || [0, 0, 0];
            var rotation = node.rotation || [0, 0, 0, 1];
            var scale = node.scale || [1, 1, 1];
            configureNode(lastNode, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(translation), babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Quaternion.FromArray(rotation), babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(scale));
        }
        lastNode.updateCache(true);
        node.babylonNode = lastNode;
    }
    return lastNode;
};
/**
 * Traverses nodes and creates them
 * @param gltfRuntime
 * @param id
 * @param parent
 * @param meshIncluded
 */
var traverseNodes = function (gltfRuntime, id, parent, meshIncluded) {
    if (meshIncluded === void 0) { meshIncluded = false; }
    var node = gltfRuntime.nodes[id];
    var newNode = null;
    if (gltfRuntime.importOnlyMeshes && !meshIncluded && gltfRuntime.importMeshesNames) {
        if (gltfRuntime.importMeshesNames.indexOf(node.name || "") !== -1 || gltfRuntime.importMeshesNames.length === 0) {
            meshIncluded = true;
        }
        else {
            meshIncluded = false;
        }
    }
    else {
        meshIncluded = true;
    }
    if (!node.jointName && meshIncluded) {
        newNode = importNode(gltfRuntime, node, id);
        if (newNode !== null) {
            newNode.id = id;
            newNode.parent = parent;
        }
    }
    if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
            traverseNodes(gltfRuntime, node.children[i], newNode, meshIncluded);
        }
    }
};
/**
 * do stuff after buffers, shaders are loaded (e.g. hook up materials, load animations, etc.)
 * @param gltfRuntime
 */
var postLoad = function (gltfRuntime) {
    // Nodes
    var currentScene = gltfRuntime.currentScene;
    if (currentScene) {
        for (var i = 0; i < currentScene.nodes.length; i++) {
            traverseNodes(gltfRuntime, currentScene.nodes[i], null);
        }
    }
    else {
        for (var thing in gltfRuntime.scenes) {
            currentScene = gltfRuntime.scenes[thing];
            for (var i = 0; i < currentScene.nodes.length; i++) {
                traverseNodes(gltfRuntime, currentScene.nodes[i], null);
            }
        }
    }
    // Set animations
    loadAnimations(gltfRuntime);
    for (var i = 0; i < gltfRuntime.scene.skeletons.length; i++) {
        var skeleton = gltfRuntime.scene.skeletons[i];
        gltfRuntime.scene.beginAnimation(skeleton, 0, Number.MAX_VALUE, true, 1.0);
    }
};
/**
 * onBind shaderrs callback to set uniforms and matrices
 * @param mesh
 * @param gltfRuntime
 * @param unTreatedUniforms
 * @param shaderMaterial
 * @param technique
 * @param material
 * @param onSuccess
 */
var onBindShaderMaterial = function (mesh, gltfRuntime, unTreatedUniforms, shaderMaterial, technique, material, onSuccess) {
    var materialValues = material.values || technique.parameters;
    for (var unif in unTreatedUniforms) {
        var uniform = unTreatedUniforms[unif];
        var type = uniform.type;
        if (type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT2 || type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT3 || type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT4) {
            if (uniform.semantic && !uniform.source && !uniform.node) {
                _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.SetMatrix(gltfRuntime.scene, mesh, uniform, unif, shaderMaterial.getEffect());
            }
            else if (uniform.semantic && (uniform.source || uniform.node)) {
                var source = gltfRuntime.scene.getNodeByName(uniform.source || uniform.node || "");
                if (source === null) {
                    source = gltfRuntime.scene.getNodeById(uniform.source || uniform.node || "");
                }
                if (source === null) {
                    continue;
                }
                _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.SetMatrix(gltfRuntime.scene, source, uniform, unif, shaderMaterial.getEffect());
            }
        }
        else {
            var value = materialValues[technique.uniforms[unif]];
            if (!value) {
                continue;
            }
            if (type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.SAMPLER_2D) {
                var texture = gltfRuntime.textures[material.values ? value : uniform.value].babylonTexture;
                if (texture === null || texture === undefined) {
                    continue;
                }
                shaderMaterial.getEffect().setTexture(unif, texture);
            }
            else {
                _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.SetUniform(shaderMaterial.getEffect(), unif, value, type);
            }
        }
    }
    onSuccess(shaderMaterial);
};
/**
 * Prepare uniforms to send the only one time
 * Loads the appropriate textures
 * @param gltfRuntime
 * @param shaderMaterial
 * @param technique
 * @param material
 */
var prepareShaderMaterialUniforms = function (gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms) {
    var materialValues = material.values || technique.parameters;
    var techniqueUniforms = technique.uniforms;
    var _loop_1 = function (unif) {
        var uniform = unTreatedUniforms[unif];
        var type = uniform.type;
        var value = materialValues[techniqueUniforms[unif]];
        if (value === undefined) {
            // In case the value is the same for all materials
            value = uniform.value;
        }
        if (!value) {
            return "continue";
        }
        var onLoadTexture = function (uniformName) {
            return function (texture) {
                if (uniform.value && uniformName) {
                    // Static uniform
                    shaderMaterial.setTexture(uniformName, texture);
                    delete unTreatedUniforms[uniformName];
                }
            };
        };
        // Texture (sampler2D)
        if (type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.SAMPLER_2D) {
            GLTFLoaderExtension.LoadTextureAsync(gltfRuntime, material.values ? value : uniform.value, onLoadTexture(unif), function () { return onLoadTexture(null); });
        }
        // Others
        else {
            if (uniform.value && _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.SetUniform(shaderMaterial, unif, material.values ? value : uniform.value, type)) {
                // Static uniform
                delete unTreatedUniforms[unif];
            }
        }
    };
    /**
     * Prepare values here (not matrices)
     */
    for (var unif in unTreatedUniforms) {
        _loop_1(unif);
    }
};
/**
 * Shader compilation failed
 * @param program
 * @param shaderMaterial
 * @param onError
 * @returns callback when shader is compiled
 */
var onShaderCompileError = function (program, shaderMaterial, onError) {
    return function (effect, error) {
        shaderMaterial.dispose(true);
        onError("Cannot compile program named " + program.name + ". Error: " + error + ". Default material will be applied");
    };
};
/**
 * Shader compilation success
 * @param gltfRuntime
 * @param shaderMaterial
 * @param technique
 * @param material
 * @param unTreatedUniforms
 * @param onSuccess
 * @returns callback when shader is compiled
 */
var onShaderCompileSuccess = function (gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms, onSuccess) {
    return function (_) {
        prepareShaderMaterialUniforms(gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms);
        shaderMaterial.onBind = function (mesh) {
            onBindShaderMaterial(mesh, gltfRuntime, unTreatedUniforms, shaderMaterial, technique, material, onSuccess);
        };
    };
};
/**
 * Returns the appropriate uniform if already handled by babylon
 * @param tokenizer
 * @param technique
 * @param unTreatedUniforms
 * @returns the name of the uniform handled by babylon
 */
var parseShaderUniforms = function (tokenizer, technique, unTreatedUniforms) {
    for (var unif in technique.uniforms) {
        var uniform = technique.uniforms[unif];
        var uniformParameter = technique.parameters[uniform];
        if (tokenizer.currentIdentifier === unif) {
            if (uniformParameter.semantic && !uniformParameter.source && !uniformParameter.node) {
                var transformIndex = glTFTransforms.indexOf(uniformParameter.semantic);
                if (transformIndex !== -1) {
                    delete unTreatedUniforms[unif];
                    return babylonTransforms[transformIndex];
                }
            }
        }
    }
    return tokenizer.currentIdentifier;
};
/**
 * All shaders loaded. Create materials one by one
 * @param gltfRuntime
 */
var importMaterials = function (gltfRuntime) {
    // Create materials
    for (var mat in gltfRuntime.materials) {
        GLTFLoaderExtension.LoadMaterialAsync(gltfRuntime, mat, function () { }, function () { });
    }
};
/**
 * Implementation of the base glTF spec
 * @internal
 */
var GLTFLoaderBase = /** @class */ (function () {
    function GLTFLoaderBase() {
    }
    GLTFLoaderBase.CreateRuntime = function (parsedData, scene, rootUrl) {
        var gltfRuntime = {
            extensions: {},
            accessors: {},
            buffers: {},
            bufferViews: {},
            meshes: {},
            lights: {},
            cameras: {},
            nodes: {},
            images: {},
            textures: {},
            shaders: {},
            programs: {},
            samplers: {},
            techniques: {},
            materials: {},
            animations: {},
            skins: {},
            extensionsUsed: [],
            scenes: {},
            buffersCount: 0,
            shaderscount: 0,
            scene: scene,
            rootUrl: rootUrl,
            loadedBufferCount: 0,
            loadedBufferViews: {},
            loadedShaderCount: 0,
            importOnlyMeshes: false,
            dummyNodes: [],
            assetContainer: null,
        };
        // Parse
        if (parsedData.extensions) {
            parseObject(parsedData.extensions, "extensions", gltfRuntime);
        }
        if (parsedData.extensionsUsed) {
            parseObject(parsedData.extensionsUsed, "extensionsUsed", gltfRuntime);
        }
        if (parsedData.buffers) {
            parseBuffers(parsedData.buffers, gltfRuntime);
        }
        if (parsedData.bufferViews) {
            parseObject(parsedData.bufferViews, "bufferViews", gltfRuntime);
        }
        if (parsedData.accessors) {
            parseObject(parsedData.accessors, "accessors", gltfRuntime);
        }
        if (parsedData.meshes) {
            parseObject(parsedData.meshes, "meshes", gltfRuntime);
        }
        if (parsedData.lights) {
            parseObject(parsedData.lights, "lights", gltfRuntime);
        }
        if (parsedData.cameras) {
            parseObject(parsedData.cameras, "cameras", gltfRuntime);
        }
        if (parsedData.nodes) {
            parseObject(parsedData.nodes, "nodes", gltfRuntime);
        }
        if (parsedData.images) {
            parseObject(parsedData.images, "images", gltfRuntime);
        }
        if (parsedData.textures) {
            parseObject(parsedData.textures, "textures", gltfRuntime);
        }
        if (parsedData.shaders) {
            parseShaders(parsedData.shaders, gltfRuntime);
        }
        if (parsedData.programs) {
            parseObject(parsedData.programs, "programs", gltfRuntime);
        }
        if (parsedData.samplers) {
            parseObject(parsedData.samplers, "samplers", gltfRuntime);
        }
        if (parsedData.techniques) {
            parseObject(parsedData.techniques, "techniques", gltfRuntime);
        }
        if (parsedData.materials) {
            parseObject(parsedData.materials, "materials", gltfRuntime);
        }
        if (parsedData.animations) {
            parseObject(parsedData.animations, "animations", gltfRuntime);
        }
        if (parsedData.skins) {
            parseObject(parsedData.skins, "skins", gltfRuntime);
        }
        if (parsedData.scenes) {
            gltfRuntime.scenes = parsedData.scenes;
        }
        if (parsedData.scene && parsedData.scenes) {
            gltfRuntime.currentScene = parsedData.scenes[parsedData.scene];
        }
        return gltfRuntime;
    };
    GLTFLoaderBase.LoadBufferAsync = function (gltfRuntime, id, onSuccess, onError, onProgress) {
        var buffer = gltfRuntime.buffers[id];
        if (babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.IsBase64(buffer.uri)) {
            setTimeout(function () { return onSuccess(new Uint8Array(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.DecodeBase64(buffer.uri))); });
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.LoadFile(gltfRuntime.rootUrl + buffer.uri, function (data) { return onSuccess(new Uint8Array(data)); }, onProgress, undefined, true, function (request) {
                if (request) {
                    onError(request.status + " " + request.statusText);
                }
            });
        }
    };
    GLTFLoaderBase.LoadTextureBufferAsync = function (gltfRuntime, id, onSuccess, onError) {
        var texture = gltfRuntime.textures[id];
        if (!texture || !texture.source) {
            onError("");
            return;
        }
        if (texture.babylonTexture) {
            onSuccess(null);
            return;
        }
        var source = gltfRuntime.images[texture.source];
        if (babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.IsBase64(source.uri)) {
            setTimeout(function () { return onSuccess(new Uint8Array(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.DecodeBase64(source.uri))); });
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.LoadFile(gltfRuntime.rootUrl + source.uri, function (data) { return onSuccess(new Uint8Array(data)); }, undefined, undefined, true, function (request) {
                if (request) {
                    onError(request.status + " " + request.statusText);
                }
            });
        }
    };
    GLTFLoaderBase.CreateTextureAsync = function (gltfRuntime, id, buffer, onSuccess) {
        var texture = gltfRuntime.textures[id];
        if (texture.babylonTexture) {
            onSuccess(texture.babylonTexture);
            return;
        }
        var sampler = gltfRuntime.samplers[texture.sampler];
        var createMipMaps = sampler.minFilter === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.NEAREST_MIPMAP_NEAREST ||
            sampler.minFilter === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.NEAREST_MIPMAP_LINEAR ||
            sampler.minFilter === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.LINEAR_MIPMAP_NEAREST ||
            sampler.minFilter === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.LINEAR_MIPMAP_LINEAR;
        var samplingMode = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.BILINEAR_SAMPLINGMODE;
        var blob = buffer == null ? new Blob() : new Blob([buffer]);
        var blobURL = URL.createObjectURL(blob);
        var revokeBlobURL = function () { return URL.revokeObjectURL(blobURL); };
        var newTexture = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture(blobURL, gltfRuntime.scene, !createMipMaps, true, samplingMode, revokeBlobURL, revokeBlobURL);
        if (sampler.wrapS !== undefined) {
            newTexture.wrapU = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetWrapMode(sampler.wrapS);
        }
        if (sampler.wrapT !== undefined) {
            newTexture.wrapV = _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_2__.GLTFUtils.GetWrapMode(sampler.wrapT);
        }
        newTexture.name = id;
        texture.babylonTexture = newTexture;
        onSuccess(newTexture);
    };
    GLTFLoaderBase.LoadShaderStringAsync = function (gltfRuntime, id, onSuccess, onError) {
        var shader = gltfRuntime.shaders[id];
        if (babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.IsBase64(shader.uri)) {
            var shaderString = atob(shader.uri.split(",")[1]);
            if (onSuccess) {
                onSuccess(shaderString);
            }
        }
        else {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.LoadFile(gltfRuntime.rootUrl + shader.uri, onSuccess, undefined, undefined, false, function (request) {
                if (request && onError) {
                    onError(request.status + " " + request.statusText);
                }
            });
        }
    };
    GLTFLoaderBase.LoadMaterialAsync = function (gltfRuntime, id, onSuccess, onError) {
        var material = gltfRuntime.materials[id];
        if (!material.technique) {
            if (onError) {
                onError("No technique found.");
            }
            return;
        }
        var technique = gltfRuntime.techniques[material.technique];
        if (!technique) {
            gltfRuntime.scene._blockEntityCollection = !!gltfRuntime.assetContainer;
            var defaultMaterial = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial(id, gltfRuntime.scene);
            defaultMaterial._parentContainer = gltfRuntime.assetContainer;
            gltfRuntime.scene._blockEntityCollection = false;
            defaultMaterial.diffuseColor = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3(0.5, 0.5, 0.5);
            defaultMaterial.sideOrientation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Material.CounterClockWiseSideOrientation;
            onSuccess(defaultMaterial);
            return;
        }
        var program = gltfRuntime.programs[technique.program];
        var states = technique.states;
        var vertexShader = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore[program.vertexShader + "VertexShader"];
        var pixelShader = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore[program.fragmentShader + "PixelShader"];
        var newVertexShader = "";
        var newPixelShader = "";
        var vertexTokenizer = new Tokenizer(vertexShader);
        var pixelTokenizer = new Tokenizer(pixelShader);
        var unTreatedUniforms = {};
        var uniforms = [];
        var attributes = [];
        var samplers = [];
        // Fill uniform, sampler2D and attributes
        for (var unif in technique.uniforms) {
            var uniform = technique.uniforms[unif];
            var uniformParameter = technique.parameters[uniform];
            unTreatedUniforms[unif] = uniformParameter;
            if (uniformParameter.semantic && !uniformParameter.node && !uniformParameter.source) {
                var transformIndex = glTFTransforms.indexOf(uniformParameter.semantic);
                if (transformIndex !== -1) {
                    uniforms.push(babylonTransforms[transformIndex]);
                    delete unTreatedUniforms[unif];
                }
                else {
                    uniforms.push(unif);
                }
            }
            else if (uniformParameter.type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.SAMPLER_2D) {
                samplers.push(unif);
            }
            else {
                uniforms.push(unif);
            }
        }
        for (var attr in technique.attributes) {
            var attribute = technique.attributes[attr];
            var attributeParameter = technique.parameters[attribute];
            if (attributeParameter.semantic) {
                var name_1 = getAttribute(attributeParameter);
                if (name_1) {
                    attributes.push(name_1);
                }
            }
        }
        // Configure vertex shader
        while (!vertexTokenizer.isEnd() && vertexTokenizer.getNextToken()) {
            var tokenType = vertexTokenizer.currentToken;
            if (tokenType !== ETokenType.IDENTIFIER) {
                newVertexShader += vertexTokenizer.currentString;
                continue;
            }
            var foundAttribute = false;
            for (var attr in technique.attributes) {
                var attribute = technique.attributes[attr];
                var attributeParameter = technique.parameters[attribute];
                if (vertexTokenizer.currentIdentifier === attr && attributeParameter.semantic) {
                    newVertexShader += getAttribute(attributeParameter);
                    foundAttribute = true;
                    break;
                }
            }
            if (foundAttribute) {
                continue;
            }
            newVertexShader += parseShaderUniforms(vertexTokenizer, technique, unTreatedUniforms);
        }
        // Configure pixel shader
        while (!pixelTokenizer.isEnd() && pixelTokenizer.getNextToken()) {
            var tokenType = pixelTokenizer.currentToken;
            if (tokenType !== ETokenType.IDENTIFIER) {
                newPixelShader += pixelTokenizer.currentString;
                continue;
            }
            newPixelShader += parseShaderUniforms(pixelTokenizer, technique, unTreatedUniforms);
        }
        // Create shader material
        var shaderPath = {
            vertex: program.vertexShader + id,
            fragment: program.fragmentShader + id,
        };
        var options = {
            attributes: attributes,
            uniforms: uniforms,
            samplers: samplers,
            needAlphaBlending: states && states.enable && states.enable.indexOf(3042) !== -1,
        };
        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore[program.vertexShader + id + "VertexShader"] = newVertexShader;
        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore[program.fragmentShader + id + "PixelShader"] = newPixelShader;
        var shaderMaterial = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial(id, gltfRuntime.scene, shaderPath, options);
        shaderMaterial.onError = onShaderCompileError(program, shaderMaterial, onError);
        shaderMaterial.onCompiled = onShaderCompileSuccess(gltfRuntime, shaderMaterial, technique, material, unTreatedUniforms, onSuccess);
        shaderMaterial.sideOrientation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Material.CounterClockWiseSideOrientation;
        if (states && states.functions) {
            var functions = states.functions;
            if (functions.cullFace && functions.cullFace[0] !== _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ECullingType.BACK) {
                shaderMaterial.backFaceCulling = false;
            }
            var blendFunc = functions.blendFuncSeparate;
            if (blendFunc) {
                if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.SRC_ALPHA &&
                    blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE_MINUS_SRC_ALPHA &&
                    blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                    blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                    shaderMaterial.alphaMode = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_COMBINE;
                }
                else if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                    blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                    blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ZERO &&
                    blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                    shaderMaterial.alphaMode = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_ONEONE;
                }
                else if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.SRC_ALPHA &&
                    blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                    blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ZERO &&
                    blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                    shaderMaterial.alphaMode = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_ADD;
                }
                else if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ZERO &&
                    blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE_MINUS_SRC_COLOR &&
                    blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                    blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                    shaderMaterial.alphaMode = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_SUBTRACT;
                }
                else if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.DST_COLOR &&
                    blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ZERO &&
                    blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                    blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                    shaderMaterial.alphaMode = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_MULTIPLY;
                }
                else if (blendFunc[0] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.SRC_ALPHA &&
                    blendFunc[1] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE_MINUS_SRC_COLOR &&
                    blendFunc[2] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE &&
                    blendFunc[3] === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EBlendingFunction.ONE) {
                    shaderMaterial.alphaMode = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Constants.ALPHA_MAXIMIZED;
                }
            }
        }
    };
    return GLTFLoaderBase;
}());

/**
 * glTF V1 Loader
 * @internal
 * @deprecated
 */
var GLTFLoader = /** @class */ (function () {
    function GLTFLoader() {
    }
    GLTFLoader.RegisterExtension = function (extension) {
        if (GLTFLoader.Extensions[extension.name]) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error('Tool with the same name "' + extension.name + '" already exists');
            return;
        }
        GLTFLoader.Extensions[extension.name] = extension;
    };
    GLTFLoader.prototype.dispose = function () {
        // do nothing
    };
    GLTFLoader.prototype._importMeshAsync = function (meshesNames, scene, data, rootUrl, assetContainer, onSuccess, onProgress, onError) {
        var _this = this;
        scene.useRightHandedSystem = true;
        GLTFLoaderExtension.LoadRuntimeAsync(scene, data, rootUrl, function (gltfRuntime) {
            gltfRuntime.assetContainer = assetContainer;
            gltfRuntime.importOnlyMeshes = true;
            if (meshesNames === "") {
                gltfRuntime.importMeshesNames = [];
            }
            else if (typeof meshesNames === "string") {
                gltfRuntime.importMeshesNames = [meshesNames];
            }
            else if (meshesNames && !(meshesNames instanceof Array)) {
                gltfRuntime.importMeshesNames = [meshesNames];
            }
            else {
                gltfRuntime.importMeshesNames = [];
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn("Argument meshesNames must be of type string or string[]");
            }
            // Create nodes
            _this._createNodes(gltfRuntime);
            var meshes = [];
            var skeletons = [];
            // Fill arrays of meshes and skeletons
            for (var nde in gltfRuntime.nodes) {
                var node = gltfRuntime.nodes[nde];
                if (node.babylonNode instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.AbstractMesh) {
                    meshes.push(node.babylonNode);
                }
            }
            for (var skl in gltfRuntime.skins) {
                var skin = gltfRuntime.skins[skl];
                if (skin.babylonSkeleton instanceof babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Skeleton) {
                    skeletons.push(skin.babylonSkeleton);
                }
            }
            // Load buffers, shaders, materials, etc.
            _this._loadBuffersAsync(gltfRuntime, function () {
                _this._loadShadersAsync(gltfRuntime, function () {
                    importMaterials(gltfRuntime);
                    postLoad(gltfRuntime);
                    if (!_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader.IncrementalLoading && onSuccess) {
                        onSuccess(meshes, skeletons);
                    }
                });
            });
            if (_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader.IncrementalLoading && onSuccess) {
                onSuccess(meshes, skeletons);
            }
        }, onError);
        return true;
    };
    /**
     * Imports one or more meshes from a loaded gltf file and adds them to the scene
     * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param assetContainer defines the asset container to use (can be null)
     * @param data gltf data containing information of the meshes in a loaded file
     * @param rootUrl root url to load from
     * @param onProgress event that fires when loading progress has occured
     * @returns a promise containg the loaded meshes, particles, skeletons and animations
     */
    GLTFLoader.prototype.importMeshAsync = function (meshesNames, scene, assetContainer, data, rootUrl, onProgress) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._importMeshAsync(meshesNames, scene, data, rootUrl, assetContainer, function (meshes, skeletons) {
                resolve({
                    meshes: meshes,
                    particleSystems: [],
                    skeletons: skeletons,
                    animationGroups: [],
                    lights: [],
                    transformNodes: [],
                    geometries: [],
                    spriteManagers: [],
                });
            }, onProgress, function (message) {
                reject(new Error(message));
            });
        });
    };
    GLTFLoader.prototype._loadAsync = function (scene, data, rootUrl, onSuccess, onProgress, onError) {
        var _this = this;
        scene.useRightHandedSystem = true;
        GLTFLoaderExtension.LoadRuntimeAsync(scene, data, rootUrl, function (gltfRuntime) {
            // Load runtime extensios
            GLTFLoaderExtension.LoadRuntimeExtensionsAsync(gltfRuntime, function () {
                // Create nodes
                _this._createNodes(gltfRuntime);
                // Load buffers, shaders, materials, etc.
                _this._loadBuffersAsync(gltfRuntime, function () {
                    _this._loadShadersAsync(gltfRuntime, function () {
                        importMaterials(gltfRuntime);
                        postLoad(gltfRuntime);
                        if (!_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader.IncrementalLoading) {
                            onSuccess();
                        }
                    });
                });
                if (_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader.IncrementalLoading) {
                    onSuccess();
                }
            }, onError);
        }, onError);
    };
    /**
     * Imports all objects from a loaded gltf file and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data gltf data containing information of the meshes in a loaded file
     * @param rootUrl root url to load from
     * @param onProgress event that fires when loading progress has occured
     * @returns a promise which completes when objects have been loaded to the scene
     */
    GLTFLoader.prototype.loadAsync = function (scene, data, rootUrl, onProgress) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._loadAsync(scene, data, rootUrl, function () {
                resolve();
            }, onProgress, function (message) {
                reject(new Error(message));
            });
        });
    };
    GLTFLoader.prototype._loadShadersAsync = function (gltfRuntime, onload) {
        var hasShaders = false;
        var processShader = function (sha, shader) {
            GLTFLoaderExtension.LoadShaderStringAsync(gltfRuntime, sha, function (shaderString) {
                if (shaderString instanceof ArrayBuffer) {
                    return;
                }
                gltfRuntime.loadedShaderCount++;
                if (shaderString) {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore[sha + (shader.type === _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EShaderType.VERTEX ? "VertexShader" : "PixelShader")] = shaderString;
                }
                if (gltfRuntime.loadedShaderCount === gltfRuntime.shaderscount) {
                    onload();
                }
            }, function () {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error("Error when loading shader program named " + sha + " located at " + shader.uri);
            });
        };
        for (var sha in gltfRuntime.shaders) {
            hasShaders = true;
            var shader = gltfRuntime.shaders[sha];
            if (shader) {
                processShader.bind(this, sha, shader)();
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error("No shader named: " + sha);
            }
        }
        if (!hasShaders) {
            onload();
        }
    };
    GLTFLoader.prototype._loadBuffersAsync = function (gltfRuntime, onLoad) {
        var hasBuffers = false;
        var processBuffer = function (buf, buffer) {
            GLTFLoaderExtension.LoadBufferAsync(gltfRuntime, buf, function (bufferView) {
                gltfRuntime.loadedBufferCount++;
                if (bufferView) {
                    if (bufferView.byteLength != gltfRuntime.buffers[buf].byteLength) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error("Buffer named " + buf + " is length " + bufferView.byteLength + ". Expected: " + buffer.byteLength); // Improve error message
                    }
                    gltfRuntime.loadedBufferViews[buf] = bufferView;
                }
                if (gltfRuntime.loadedBufferCount === gltfRuntime.buffersCount) {
                    onLoad();
                }
            }, function () {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error("Error when loading buffer named " + buf + " located at " + buffer.uri);
            });
        };
        for (var buf in gltfRuntime.buffers) {
            hasBuffers = true;
            var buffer = gltfRuntime.buffers[buf];
            if (buffer) {
                processBuffer.bind(this, buf, buffer)();
            }
            else {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Error("No buffer named: " + buf);
            }
        }
        if (!hasBuffers) {
            onLoad();
        }
    };
    GLTFLoader.prototype._createNodes = function (gltfRuntime) {
        var currentScene = gltfRuntime.currentScene;
        if (currentScene) {
            // Only one scene even if multiple scenes are defined
            for (var i = 0; i < currentScene.nodes.length; i++) {
                traverseNodes(gltfRuntime, currentScene.nodes[i], null);
            }
        }
        else {
            // Load all scenes
            for (var thing in gltfRuntime.scenes) {
                currentScene = gltfRuntime.scenes[thing];
                for (var i = 0; i < currentScene.nodes.length; i++) {
                    traverseNodes(gltfRuntime, currentScene.nodes[i], null);
                }
            }
        }
    };
    GLTFLoader.Extensions = {};
    return GLTFLoader;
}());

/** @internal */
var GLTFLoaderExtension = /** @class */ (function () {
    function GLTFLoaderExtension(name) {
        this._name = name;
    }
    Object.defineProperty(GLTFLoaderExtension.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Defines an override for loading the runtime
     * Return true to stop further extensions from loading the runtime
     * @param scene
     * @param data
     * @param rootUrl
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from loading the runtime
     */
    GLTFLoaderExtension.prototype.loadRuntimeAsync = function (scene, data, rootUrl, onSuccess, onError) {
        return false;
    };
    /**
     * Defines an onverride for creating gltf runtime
     * Return true to stop further extensions from creating the runtime
     * @param gltfRuntime
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from creating the runtime
     */
    GLTFLoaderExtension.prototype.loadRuntimeExtensionsAsync = function (gltfRuntime, onSuccess, onError) {
        return false;
    };
    /**
     * Defines an override for loading buffers
     * Return true to stop further extensions from loading this buffer
     * @param gltfRuntime
     * @param id
     * @param onSuccess
     * @param onError
     * @param onProgress
     * @returns true to stop further extensions from loading this buffer
     */
    GLTFLoaderExtension.prototype.loadBufferAsync = function (gltfRuntime, id, onSuccess, onError, onProgress) {
        return false;
    };
    /**
     * Defines an override for loading texture buffers
     * Return true to stop further extensions from loading this texture data
     * @param gltfRuntime
     * @param id
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from loading this texture data
     */
    GLTFLoaderExtension.prototype.loadTextureBufferAsync = function (gltfRuntime, id, onSuccess, onError) {
        return false;
    };
    /**
     * Defines an override for creating textures
     * Return true to stop further extensions from loading this texture
     * @param gltfRuntime
     * @param id
     * @param buffer
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from loading this texture
     */
    GLTFLoaderExtension.prototype.createTextureAsync = function (gltfRuntime, id, buffer, onSuccess, onError) {
        return false;
    };
    /**
     * Defines an override for loading shader strings
     * Return true to stop further extensions from loading this shader data
     * @param gltfRuntime
     * @param id
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from loading this shader data
     */
    GLTFLoaderExtension.prototype.loadShaderStringAsync = function (gltfRuntime, id, onSuccess, onError) {
        return false;
    };
    /**
     * Defines an override for loading materials
     * Return true to stop further extensions from loading this material
     * @param gltfRuntime
     * @param id
     * @param onSuccess
     * @param onError
     * @returns true to stop further extensions from loading this material
     */
    GLTFLoaderExtension.prototype.loadMaterialAsync = function (gltfRuntime, id, onSuccess, onError) {
        return false;
    };
    // ---------
    // Utilities
    // ---------
    GLTFLoaderExtension.LoadRuntimeAsync = function (scene, data, rootUrl, onSuccess, onError) {
        GLTFLoaderExtension._ApplyExtensions(function (loaderExtension) {
            return loaderExtension.loadRuntimeAsync(scene, data, rootUrl, onSuccess, onError);
        }, function () {
            setTimeout(function () {
                if (!onSuccess) {
                    return;
                }
                onSuccess(GLTFLoaderBase.CreateRuntime(data.json, scene, rootUrl));
            });
        });
    };
    GLTFLoaderExtension.LoadRuntimeExtensionsAsync = function (gltfRuntime, onSuccess, onError) {
        GLTFLoaderExtension._ApplyExtensions(function (loaderExtension) {
            return loaderExtension.loadRuntimeExtensionsAsync(gltfRuntime, onSuccess, onError);
        }, function () {
            setTimeout(function () {
                onSuccess();
            });
        });
    };
    GLTFLoaderExtension.LoadBufferAsync = function (gltfRuntime, id, onSuccess, onError, onProgress) {
        GLTFLoaderExtension._ApplyExtensions(function (loaderExtension) {
            return loaderExtension.loadBufferAsync(gltfRuntime, id, onSuccess, onError, onProgress);
        }, function () {
            GLTFLoaderBase.LoadBufferAsync(gltfRuntime, id, onSuccess, onError, onProgress);
        });
    };
    GLTFLoaderExtension.LoadTextureAsync = function (gltfRuntime, id, onSuccess, onError) {
        GLTFLoaderExtension._LoadTextureBufferAsync(gltfRuntime, id, function (buffer) {
            if (buffer) {
                GLTFLoaderExtension._CreateTextureAsync(gltfRuntime, id, buffer, onSuccess, onError);
            }
        }, onError);
    };
    GLTFLoaderExtension.LoadShaderStringAsync = function (gltfRuntime, id, onSuccess, onError) {
        GLTFLoaderExtension._ApplyExtensions(function (loaderExtension) {
            return loaderExtension.loadShaderStringAsync(gltfRuntime, id, onSuccess, onError);
        }, function () {
            GLTFLoaderBase.LoadShaderStringAsync(gltfRuntime, id, onSuccess, onError);
        });
    };
    GLTFLoaderExtension.LoadMaterialAsync = function (gltfRuntime, id, onSuccess, onError) {
        GLTFLoaderExtension._ApplyExtensions(function (loaderExtension) {
            return loaderExtension.loadMaterialAsync(gltfRuntime, id, onSuccess, onError);
        }, function () {
            GLTFLoaderBase.LoadMaterialAsync(gltfRuntime, id, onSuccess, onError);
        });
    };
    GLTFLoaderExtension._LoadTextureBufferAsync = function (gltfRuntime, id, onSuccess, onError) {
        GLTFLoaderExtension._ApplyExtensions(function (loaderExtension) {
            return loaderExtension.loadTextureBufferAsync(gltfRuntime, id, onSuccess, onError);
        }, function () {
            GLTFLoaderBase.LoadTextureBufferAsync(gltfRuntime, id, onSuccess, onError);
        });
    };
    GLTFLoaderExtension._CreateTextureAsync = function (gltfRuntime, id, buffer, onSuccess, onError) {
        GLTFLoaderExtension._ApplyExtensions(function (loaderExtension) {
            return loaderExtension.createTextureAsync(gltfRuntime, id, buffer, onSuccess, onError);
        }, function () {
            GLTFLoaderBase.CreateTextureAsync(gltfRuntime, id, buffer, onSuccess);
        });
    };
    GLTFLoaderExtension._ApplyExtensions = function (func, defaultFunc) {
        for (var extensionName in GLTFLoader.Extensions) {
            var loaderExtension = GLTFLoader.Extensions[extensionName];
            if (func(loaderExtension)) {
                return;
            }
        }
        defaultFunc();
    };
    return GLTFLoaderExtension;
}());

_glTFFileLoader__WEBPACK_IMPORTED_MODULE_3__.GLTFFileLoader._CreateGLTF1Loader = function () { return new GLTFLoader(); };


/***/ }),

/***/ "../../../dev/loaders/src/glTF/1.0/glTFLoaderInterfaces.ts":
/*!*****************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/1.0/glTFLoaderInterfaces.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EBlendingFunction: () => (/* binding */ EBlendingFunction),
/* harmony export */   EComponentType: () => (/* binding */ EComponentType),
/* harmony export */   ECullingType: () => (/* binding */ ECullingType),
/* harmony export */   EParameterType: () => (/* binding */ EParameterType),
/* harmony export */   EShaderType: () => (/* binding */ EShaderType),
/* harmony export */   ETextureFilterType: () => (/* binding */ ETextureFilterType),
/* harmony export */   ETextureFormat: () => (/* binding */ ETextureFormat),
/* harmony export */   ETextureWrapMode: () => (/* binding */ ETextureWrapMode)
/* harmony export */ });
/**
 * Enums
 * @internal
 */
var EComponentType;
(function (EComponentType) {
    EComponentType[EComponentType["BYTE"] = 5120] = "BYTE";
    EComponentType[EComponentType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    EComponentType[EComponentType["SHORT"] = 5122] = "SHORT";
    EComponentType[EComponentType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    EComponentType[EComponentType["FLOAT"] = 5126] = "FLOAT";
})(EComponentType || (EComponentType = {}));
/** @internal */
var EShaderType;
(function (EShaderType) {
    EShaderType[EShaderType["FRAGMENT"] = 35632] = "FRAGMENT";
    EShaderType[EShaderType["VERTEX"] = 35633] = "VERTEX";
})(EShaderType || (EShaderType = {}));
/** @internal */
var EParameterType;
(function (EParameterType) {
    EParameterType[EParameterType["BYTE"] = 5120] = "BYTE";
    EParameterType[EParameterType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    EParameterType[EParameterType["SHORT"] = 5122] = "SHORT";
    EParameterType[EParameterType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    EParameterType[EParameterType["INT"] = 5124] = "INT";
    EParameterType[EParameterType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
    EParameterType[EParameterType["FLOAT"] = 5126] = "FLOAT";
    EParameterType[EParameterType["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
    EParameterType[EParameterType["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
    EParameterType[EParameterType["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
    EParameterType[EParameterType["INT_VEC2"] = 35667] = "INT_VEC2";
    EParameterType[EParameterType["INT_VEC3"] = 35668] = "INT_VEC3";
    EParameterType[EParameterType["INT_VEC4"] = 35669] = "INT_VEC4";
    EParameterType[EParameterType["BOOL"] = 35670] = "BOOL";
    EParameterType[EParameterType["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
    EParameterType[EParameterType["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
    EParameterType[EParameterType["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
    EParameterType[EParameterType["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
    EParameterType[EParameterType["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
    EParameterType[EParameterType["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
    EParameterType[EParameterType["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
})(EParameterType || (EParameterType = {}));
/** @internal */
var ETextureWrapMode;
(function (ETextureWrapMode) {
    ETextureWrapMode[ETextureWrapMode["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
    ETextureWrapMode[ETextureWrapMode["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
    ETextureWrapMode[ETextureWrapMode["REPEAT"] = 10497] = "REPEAT";
})(ETextureWrapMode || (ETextureWrapMode = {}));
/** @internal */
var ETextureFilterType;
(function (ETextureFilterType) {
    ETextureFilterType[ETextureFilterType["NEAREST"] = 9728] = "NEAREST";
    ETextureFilterType[ETextureFilterType["LINEAR"] = 9728] = "LINEAR";
    ETextureFilterType[ETextureFilterType["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
    ETextureFilterType[ETextureFilterType["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
    ETextureFilterType[ETextureFilterType["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
    ETextureFilterType[ETextureFilterType["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
})(ETextureFilterType || (ETextureFilterType = {}));
/** @internal */
var ETextureFormat;
(function (ETextureFormat) {
    ETextureFormat[ETextureFormat["ALPHA"] = 6406] = "ALPHA";
    ETextureFormat[ETextureFormat["RGB"] = 6407] = "RGB";
    ETextureFormat[ETextureFormat["RGBA"] = 6408] = "RGBA";
    ETextureFormat[ETextureFormat["LUMINANCE"] = 6409] = "LUMINANCE";
    ETextureFormat[ETextureFormat["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
})(ETextureFormat || (ETextureFormat = {}));
/** @internal */
var ECullingType;
(function (ECullingType) {
    ECullingType[ECullingType["FRONT"] = 1028] = "FRONT";
    ECullingType[ECullingType["BACK"] = 1029] = "BACK";
    ECullingType[ECullingType["FRONT_AND_BACK"] = 1032] = "FRONT_AND_BACK";
})(ECullingType || (ECullingType = {}));
/** @internal */
var EBlendingFunction;
(function (EBlendingFunction) {
    EBlendingFunction[EBlendingFunction["ZERO"] = 0] = "ZERO";
    EBlendingFunction[EBlendingFunction["ONE"] = 1] = "ONE";
    EBlendingFunction[EBlendingFunction["SRC_COLOR"] = 768] = "SRC_COLOR";
    EBlendingFunction[EBlendingFunction["ONE_MINUS_SRC_COLOR"] = 769] = "ONE_MINUS_SRC_COLOR";
    EBlendingFunction[EBlendingFunction["DST_COLOR"] = 774] = "DST_COLOR";
    EBlendingFunction[EBlendingFunction["ONE_MINUS_DST_COLOR"] = 775] = "ONE_MINUS_DST_COLOR";
    EBlendingFunction[EBlendingFunction["SRC_ALPHA"] = 770] = "SRC_ALPHA";
    EBlendingFunction[EBlendingFunction["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
    EBlendingFunction[EBlendingFunction["DST_ALPHA"] = 772] = "DST_ALPHA";
    EBlendingFunction[EBlendingFunction["ONE_MINUS_DST_ALPHA"] = 773] = "ONE_MINUS_DST_ALPHA";
    EBlendingFunction[EBlendingFunction["CONSTANT_COLOR"] = 32769] = "CONSTANT_COLOR";
    EBlendingFunction[EBlendingFunction["ONE_MINUS_CONSTANT_COLOR"] = 32770] = "ONE_MINUS_CONSTANT_COLOR";
    EBlendingFunction[EBlendingFunction["CONSTANT_ALPHA"] = 32771] = "CONSTANT_ALPHA";
    EBlendingFunction[EBlendingFunction["ONE_MINUS_CONSTANT_ALPHA"] = 32772] = "ONE_MINUS_CONSTANT_ALPHA";
    EBlendingFunction[EBlendingFunction["SRC_ALPHA_SATURATE"] = 776] = "SRC_ALPHA_SATURATE";
})(EBlendingFunction || (EBlendingFunction = {}));


/***/ }),

/***/ "../../../dev/loaders/src/glTF/1.0/glTFLoaderUtils.ts":
/*!************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/1.0/glTFLoaderUtils.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFUtils: () => (/* binding */ GLTFUtils)
/* harmony export */ });
/* harmony import */ var _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFLoaderInterfaces */ "../../../dev/loaders/src/glTF/1.0/glTFLoaderInterfaces.ts");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Materials/Textures/texture */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__);






/**
 * Utils functions for GLTF
 * @internal
 * @deprecated
 */
var GLTFUtils = /** @class */ (function () {
    function GLTFUtils() {
    }
    /**
     * Sets the given "parameter" matrix
     * @param scene the Scene object
     * @param source the source node where to pick the matrix
     * @param parameter the GLTF technique parameter
     * @param uniformName the name of the shader's uniform
     * @param shaderMaterial the shader material
     */
    GLTFUtils.SetMatrix = function (scene, source, parameter, uniformName, shaderMaterial) {
        var mat = null;
        if (parameter.semantic === "MODEL") {
            mat = source.getWorldMatrix();
        }
        else if (parameter.semantic === "PROJECTION") {
            mat = scene.getProjectionMatrix();
        }
        else if (parameter.semantic === "VIEW") {
            mat = scene.getViewMatrix();
        }
        else if (parameter.semantic === "MODELVIEWINVERSETRANSPOSE") {
            mat = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.Transpose(source.getWorldMatrix().multiply(scene.getViewMatrix()).invert());
        }
        else if (parameter.semantic === "MODELVIEW") {
            mat = source.getWorldMatrix().multiply(scene.getViewMatrix());
        }
        else if (parameter.semantic === "MODELVIEWPROJECTION") {
            mat = source.getWorldMatrix().multiply(scene.getTransformMatrix());
        }
        else if (parameter.semantic === "MODELINVERSE") {
            mat = source.getWorldMatrix().invert();
        }
        else if (parameter.semantic === "VIEWINVERSE") {
            mat = scene.getViewMatrix().invert();
        }
        else if (parameter.semantic === "PROJECTIONINVERSE") {
            mat = scene.getProjectionMatrix().invert();
        }
        else if (parameter.semantic === "MODELVIEWINVERSE") {
            mat = source.getWorldMatrix().multiply(scene.getViewMatrix()).invert();
        }
        else if (parameter.semantic === "MODELVIEWPROJECTIONINVERSE") {
            mat = source.getWorldMatrix().multiply(scene.getTransformMatrix()).invert();
        }
        else if (parameter.semantic === "MODELINVERSETRANSPOSE") {
            mat = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.Transpose(source.getWorldMatrix().invert());
        }
        if (mat) {
            switch (parameter.type) {
                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT2:
                    shaderMaterial.setMatrix2x2(uniformName, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.GetAsMatrix2x2(mat));
                    break;
                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT3:
                    shaderMaterial.setMatrix3x3(uniformName, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Matrix.GetAsMatrix3x3(mat));
                    break;
                case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_MAT4:
                    shaderMaterial.setMatrix(uniformName, mat);
                    break;
                default:
                    break;
            }
        }
    };
    /**
     * Sets the given "parameter" matrix
     * @param shaderMaterial the shader material
     * @param uniform the name of the shader's uniform
     * @param value the value of the uniform
     * @param type the uniform's type (EParameterType FLOAT, VEC2, VEC3 or VEC4)
     * @returns true if set, else false
     */
    GLTFUtils.SetUniform = function (shaderMaterial, uniform, value, type) {
        switch (type) {
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT:
                shaderMaterial.setFloat(uniform, value);
                return true;
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_VEC2:
                shaderMaterial.setVector2(uniform, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector2.FromArray(value));
                return true;
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_VEC3:
                shaderMaterial.setVector3(uniform, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3.FromArray(value));
                return true;
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EParameterType.FLOAT_VEC4:
                shaderMaterial.setVector4(uniform, babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector4.FromArray(value));
                return true;
            default:
                return false;
        }
    };
    /**
     * Returns the wrap mode of the texture
     * @param mode the mode value
     * @returns the wrap mode (TEXTURE_WRAP_ADDRESSMODE, MIRROR_ADDRESSMODE or CLAMP_ADDRESSMODE)
     */
    GLTFUtils.GetWrapMode = function (mode) {
        switch (mode) {
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureWrapMode.CLAMP_TO_EDGE:
                return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.CLAMP_ADDRESSMODE;
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureWrapMode.MIRRORED_REPEAT:
                return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.MIRROR_ADDRESSMODE;
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureWrapMode.REPEAT:
                return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.WRAP_ADDRESSMODE;
            default:
                return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.WRAP_ADDRESSMODE;
        }
    };
    /**
     * Returns the byte stride giving an accessor
     * @param accessor the GLTF accessor objet
     * @returns the byte stride
     */
    GLTFUtils.GetByteStrideFromType = function (accessor) {
        // Needs this function since "byteStride" isn't requiered in glTF format
        var type = accessor.type;
        switch (type) {
            case "VEC2":
                return 2;
            case "VEC3":
                return 3;
            case "VEC4":
                return 4;
            case "MAT2":
                return 4;
            case "MAT3":
                return 9;
            case "MAT4":
                return 16;
            default:
                return 1;
        }
    };
    /**
     * Returns the texture filter mode giving a mode value
     * @param mode the filter mode value
     * @returns the filter mode (TODO - needs to be a type?)
     */
    GLTFUtils.GetTextureFilterMode = function (mode) {
        switch (mode) {
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.LINEAR:
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.LINEAR_MIPMAP_NEAREST:
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.LINEAR_MIPMAP_LINEAR:
                return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.TRILINEAR_SAMPLINGMODE;
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.NEAREST:
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.ETextureFilterType.NEAREST_MIPMAP_NEAREST:
                return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.NEAREST_SAMPLINGMODE;
            default:
                return babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Texture.BILINEAR_SAMPLINGMODE;
        }
    };
    GLTFUtils.GetBufferFromBufferView = function (gltfRuntime, bufferView, byteOffset, byteLength, componentType) {
        byteOffset = bufferView.byteOffset + byteOffset;
        var loadedBufferView = gltfRuntime.loadedBufferViews[bufferView.buffer];
        if (byteOffset + byteLength > loadedBufferView.byteLength) {
            throw new Error("Buffer access is out of range");
        }
        var buffer = loadedBufferView.buffer;
        byteOffset += loadedBufferView.byteOffset;
        switch (componentType) {
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EComponentType.BYTE:
                return new Int8Array(buffer, byteOffset, byteLength);
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EComponentType.UNSIGNED_BYTE:
                return new Uint8Array(buffer, byteOffset, byteLength);
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EComponentType.SHORT:
                return new Int16Array(buffer, byteOffset, byteLength);
            case _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_0__.EComponentType.UNSIGNED_SHORT:
                return new Uint16Array(buffer, byteOffset, byteLength);
            default:
                return new Float32Array(buffer, byteOffset, byteLength);
        }
    };
    /**
     * Returns a buffer from its accessor
     * @param gltfRuntime the GLTF runtime
     * @param accessor the GLTF accessor
     * @returns an array buffer view
     */
    GLTFUtils.GetBufferFromAccessor = function (gltfRuntime, accessor) {
        var bufferView = gltfRuntime.bufferViews[accessor.bufferView];
        var byteLength = accessor.count * GLTFUtils.GetByteStrideFromType(accessor);
        return GLTFUtils.GetBufferFromBufferView(gltfRuntime, bufferView, accessor.byteOffset, byteLength, accessor.componentType);
    };
    /**
     * Decodes a buffer view into a string
     * @param view the buffer view
     * @returns a string
     */
    GLTFUtils.DecodeBufferToText = function (view) {
        var result = "";
        var length = view.byteLength;
        for (var i = 0; i < length; ++i) {
            result += String.fromCharCode(view[i]);
        }
        return result;
    };
    /**
     * Returns the default material of gltf. Related to
     * https://github.com/KhronosGroup/glTF/tree/master/specification/1.0#appendix-a-default-material
     * @param scene the Babylon.js scene
     * @returns the default Babylon material
     */
    GLTFUtils.GetDefaultMaterial = function (scene) {
        if (!GLTFUtils._DefaultMaterial) {
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore["GLTFDefaultMaterialVertexShader"] = [
                "precision highp float;",
                "",
                "uniform mat4 worldView;",
                "uniform mat4 projection;",
                "",
                "attribute vec3 position;",
                "",
                "void main(void)",
                "{",
                "    gl_Position = projection * worldView * vec4(position, 1.0);",
                "}",
            ].join("\n");
            babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Effect.ShadersStore["GLTFDefaultMaterialPixelShader"] = [
                "precision highp float;",
                "",
                "uniform vec4 u_emission;",
                "",
                "void main(void)",
                "{",
                "    gl_FragColor = u_emission;",
                "}",
            ].join("\n");
            var shaderPath = {
                vertex: "GLTFDefaultMaterial",
                fragment: "GLTFDefaultMaterial",
            };
            var options = {
                attributes: ["position"],
                uniforms: ["worldView", "projection", "u_emission"],
                samplers: new Array(),
                needAlphaBlending: false,
            };
            GLTFUtils._DefaultMaterial = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial("GLTFDefaultMaterial", scene, shaderPath, options);
            GLTFUtils._DefaultMaterial.setColor4("u_emission", new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color4(0.5, 0.5, 0.5, 1.0));
        }
        return GLTFUtils._DefaultMaterial;
    };
    // The GLTF default material
    GLTFUtils._DefaultMaterial = null;
    return GLTFUtils;
}());



/***/ }),

/***/ "../../../dev/loaders/src/glTF/1.0/glTFMaterialsCommonExtension.ts":
/*!*************************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/1.0/glTFMaterialsCommonExtension.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFMaterialsCommonExtension: () => (/* binding */ GLTFMaterialsCommonExtension)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFLoader */ "../../../dev/loaders/src/glTF/1.0/glTFLoader.ts");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs/Lights/spotLight */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__);











/**
 * @internal
 * @deprecated
 */
var GLTFMaterialsCommonExtension = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(GLTFMaterialsCommonExtension, _super);
    function GLTFMaterialsCommonExtension() {
        return _super.call(this, "KHR_materials_common") || this;
    }
    GLTFMaterialsCommonExtension.prototype.loadRuntimeExtensionsAsync = function (gltfRuntime) {
        if (!gltfRuntime.extensions) {
            return false;
        }
        var extension = gltfRuntime.extensions[this.name];
        if (!extension) {
            return false;
        }
        // Create lights
        var lights = extension.lights;
        if (lights) {
            for (var thing in lights) {
                var light = lights[thing];
                switch (light.type) {
                    case "ambient": {
                        var ambientLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.HemisphericLight(light.name, new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0), gltfRuntime.scene);
                        var ambient = light.ambient;
                        if (ambient) {
                            ambientLight.diffuse = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(ambient.color || [1, 1, 1]);
                        }
                        break;
                    }
                    case "point": {
                        var pointLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.PointLight(light.name, new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(10, 10, 10), gltfRuntime.scene);
                        var point = light.point;
                        if (point) {
                            pointLight.diffuse = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(point.color || [1, 1, 1]);
                        }
                        break;
                    }
                    case "directional": {
                        var dirLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(light.name, new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0), gltfRuntime.scene);
                        var directional = light.directional;
                        if (directional) {
                            dirLight.diffuse = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(directional.color || [1, 1, 1]);
                        }
                        break;
                    }
                    case "spot": {
                        var spot = light.spot;
                        if (spot) {
                            var spotLight = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.SpotLight(light.name, new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 10, 0), new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, -1, 0), spot.fallOffAngle || Math.PI, spot.fallOffExponent || 0.0, gltfRuntime.scene);
                            spotLight.diffuse = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(spot.color || [1, 1, 1]);
                        }
                        break;
                    }
                    default:
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Tools.Warn('GLTF Material Common extension: light type "' + light.type + "” not supported");
                        break;
                }
            }
        }
        return false;
    };
    GLTFMaterialsCommonExtension.prototype.loadMaterialAsync = function (gltfRuntime, id, onSuccess, onError) {
        var material = gltfRuntime.materials[id];
        if (!material || !material.extensions) {
            return false;
        }
        var extension = material.extensions[this.name];
        if (!extension) {
            return false;
        }
        var standardMaterial = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.StandardMaterial(id, gltfRuntime.scene);
        standardMaterial.sideOrientation = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Material.CounterClockWiseSideOrientation;
        if (extension.technique === "CONSTANT") {
            standardMaterial.disableLighting = true;
        }
        standardMaterial.backFaceCulling = extension.doubleSided === undefined ? false : !extension.doubleSided;
        standardMaterial.alpha = extension.values.transparency === undefined ? 1.0 : extension.values.transparency;
        standardMaterial.specularPower = extension.values.shininess === undefined ? 0.0 : extension.values.shininess;
        // Ambient
        if (typeof extension.values.ambient === "string") {
            this._loadTexture(gltfRuntime, extension.values.ambient, standardMaterial, "ambientTexture", onError);
        }
        else {
            standardMaterial.ambientColor = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(extension.values.ambient || [0, 0, 0]);
        }
        // Diffuse
        if (typeof extension.values.diffuse === "string") {
            this._loadTexture(gltfRuntime, extension.values.diffuse, standardMaterial, "diffuseTexture", onError);
        }
        else {
            standardMaterial.diffuseColor = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(extension.values.diffuse || [0, 0, 0]);
        }
        // Emission
        if (typeof extension.values.emission === "string") {
            this._loadTexture(gltfRuntime, extension.values.emission, standardMaterial, "emissiveTexture", onError);
        }
        else {
            standardMaterial.emissiveColor = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(extension.values.emission || [0, 0, 0]);
        }
        // Specular
        if (typeof extension.values.specular === "string") {
            this._loadTexture(gltfRuntime, extension.values.specular, standardMaterial, "specularTexture", onError);
        }
        else {
            standardMaterial.specularColor = babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_1__.Color3.FromArray(extension.values.specular || [0, 0, 0]);
        }
        return true;
    };
    GLTFMaterialsCommonExtension.prototype._loadTexture = function (gltfRuntime, id, material, propertyPath, onError) {
        // Create buffer from texture url
        _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderBase.LoadTextureBufferAsync(gltfRuntime, id, function (buffer) {
            // Create texture from buffer
            _glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderBase.CreateTextureAsync(gltfRuntime, id, buffer, function (texture) { return (material[propertyPath] = texture); });
        }, onError);
    };
    return GLTFMaterialsCommonExtension;
}(_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderExtension));

_glTFLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoader.RegisterExtension(new GLTFMaterialsCommonExtension());


/***/ }),

/***/ "../../../dev/loaders/src/glTF/1.0/index.ts":
/*!**************************************************!*\
  !*** ../../../dev/loaders/src/glTF/1.0/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EBlendingFunction: () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EBlendingFunction),
/* harmony export */   EComponentType: () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EComponentType),
/* harmony export */   ECullingType: () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.ECullingType),
/* harmony export */   EParameterType: () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EParameterType),
/* harmony export */   EShaderType: () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.EShaderType),
/* harmony export */   ETextureFilterType: () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.ETextureFilterType),
/* harmony export */   ETextureFormat: () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.ETextureFormat),
/* harmony export */   ETextureWrapMode: () => (/* reexport safe */ _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__.ETextureWrapMode),
/* harmony export */   GLTFBinaryExtension: () => (/* reexport safe */ _glTFBinaryExtension__WEBPACK_IMPORTED_MODULE_0__.GLTFBinaryExtension),
/* harmony export */   GLTFLoader: () => (/* reexport safe */ _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader),
/* harmony export */   GLTFLoaderBase: () => (/* reexport safe */ _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderBase),
/* harmony export */   GLTFLoaderExtension: () => (/* reexport safe */ _glTFLoader__WEBPACK_IMPORTED_MODULE_1__.GLTFLoaderExtension),
/* harmony export */   GLTFMaterialsCommonExtension: () => (/* reexport safe */ _glTFMaterialsCommonExtension__WEBPACK_IMPORTED_MODULE_4__.GLTFMaterialsCommonExtension),
/* harmony export */   GLTFUtils: () => (/* reexport safe */ _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_3__.GLTFUtils)
/* harmony export */ });
/* harmony import */ var _glTFBinaryExtension__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glTFBinaryExtension */ "../../../dev/loaders/src/glTF/1.0/glTFBinaryExtension.ts");
/* harmony import */ var _glTFLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFLoader */ "../../../dev/loaders/src/glTF/1.0/glTFLoader.ts");
/* harmony import */ var _glTFLoaderInterfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFLoaderInterfaces */ "../../../dev/loaders/src/glTF/1.0/glTFLoaderInterfaces.ts");
/* harmony import */ var _glTFLoaderUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./glTFLoaderUtils */ "../../../dev/loaders/src/glTF/1.0/glTFLoaderUtils.ts");
/* harmony import */ var _glTFMaterialsCommonExtension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./glTFMaterialsCommonExtension */ "../../../dev/loaders/src/glTF/1.0/glTFMaterialsCommonExtension.ts");







/***/ }),

/***/ "../../../dev/loaders/src/glTF/glTFFileLoader.metadata.ts":
/*!****************************************************************!*\
  !*** ../../../dev/loaders/src/glTF/glTFFileLoader.metadata.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFFileLoaderMetadata: () => (/* binding */ GLTFFileLoaderMetadata),
/* harmony export */   GLTFMagicBase64Encoded: () => (/* binding */ GLTFMagicBase64Encoded)
/* harmony export */ });
var GLTFMagicBase64Encoded = "Z2xURg"; // "glTF" base64 encoded (without the quotes!)
var GLTFFileLoaderMetadata = {
    name: "gltf",
    extensions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ".gltf": { isBinary: false, mimeType: "model/gltf+json" },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ".glb": { isBinary: true, mimeType: "model/gltf-binary" },
    },
    canDirectLoad: function (data) {
        return ((data.indexOf("asset") !== -1 && data.indexOf("version") !== -1) ||
            data.startsWith("data:base64," + GLTFMagicBase64Encoded) || // this is technically incorrect, but will continue to support for backcompat.
            data.startsWith("data:;base64," + GLTFMagicBase64Encoded) ||
            data.startsWith("data:application/octet-stream;base64," + GLTFMagicBase64Encoded) ||
            data.startsWith("data:model/gltf-binary;base64," + GLTFMagicBase64Encoded));
    },
};


/***/ }),

/***/ "../../../dev/loaders/src/glTF/glTFFileLoader.ts":
/*!*******************************************************!*\
  !*** ../../../dev/loaders/src/glTF/glTFFileLoader.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFFileLoader: () => (/* binding */ GLTFFileLoader),
/* harmony export */   GLTFLoaderAnimationStartMode: () => (/* binding */ GLTFLoaderAnimationStartMode),
/* harmony export */   GLTFLoaderCoordinateSystemMode: () => (/* binding */ GLTFLoaderCoordinateSystemMode),
/* harmony export */   GLTFLoaderState: () => (/* binding */ GLTFLoaderState)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/error */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _glTFValidation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glTFValidation */ "../../../dev/loaders/src/glTF/glTFValidation.ts");
/* harmony import */ var _glTFFileLoader_metadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glTFFileLoader.metadata */ "../../../dev/loaders/src/glTF/glTFFileLoader.metadata.ts");











function readAsync(arrayBuffer, byteOffset, byteLength) {
    try {
        return Promise.resolve(new Uint8Array(arrayBuffer, byteOffset, byteLength));
    }
    catch (e) {
        return Promise.reject(e);
    }
}
function readViewAsync(arrayBufferView, byteOffset, byteLength) {
    try {
        if (byteOffset < 0 || byteOffset >= arrayBufferView.byteLength) {
            throw new RangeError("Offset is out of range.");
        }
        if (byteOffset + byteLength > arrayBufferView.byteLength) {
            throw new RangeError("Length is out of range.");
        }
        return Promise.resolve(new Uint8Array(arrayBufferView.buffer, arrayBufferView.byteOffset + byteOffset, byteLength));
    }
    catch (e) {
        return Promise.reject(e);
    }
}
/**
 * Mode that determines the coordinate system to use.
 */
var GLTFLoaderCoordinateSystemMode;
(function (GLTFLoaderCoordinateSystemMode) {
    /**
     * Automatically convert the glTF right-handed data to the appropriate system based on the current coordinate system mode of the scene.
     */
    GLTFLoaderCoordinateSystemMode[GLTFLoaderCoordinateSystemMode["AUTO"] = 0] = "AUTO";
    /**
     * Sets the useRightHandedSystem flag on the scene.
     */
    GLTFLoaderCoordinateSystemMode[GLTFLoaderCoordinateSystemMode["FORCE_RIGHT_HANDED"] = 1] = "FORCE_RIGHT_HANDED";
})(GLTFLoaderCoordinateSystemMode || (GLTFLoaderCoordinateSystemMode = {}));
/**
 * Mode that determines what animations will start.
 */
var GLTFLoaderAnimationStartMode;
(function (GLTFLoaderAnimationStartMode) {
    /**
     * No animation will start.
     */
    GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["NONE"] = 0] = "NONE";
    /**
     * The first animation will start.
     */
    GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["FIRST"] = 1] = "FIRST";
    /**
     * All animations will start.
     */
    GLTFLoaderAnimationStartMode[GLTFLoaderAnimationStartMode["ALL"] = 2] = "ALL";
})(GLTFLoaderAnimationStartMode || (GLTFLoaderAnimationStartMode = {}));
/**
 * Loader state.
 */
var GLTFLoaderState;
(function (GLTFLoaderState) {
    /**
     * The asset is loading.
     */
    GLTFLoaderState[GLTFLoaderState["LOADING"] = 0] = "LOADING";
    /**
     * The asset is ready for rendering.
     */
    GLTFLoaderState[GLTFLoaderState["READY"] = 1] = "READY";
    /**
     * The asset is completely loaded.
     */
    GLTFLoaderState[GLTFLoaderState["COMPLETE"] = 2] = "COMPLETE";
})(GLTFLoaderState || (GLTFLoaderState = {}));
var GLTFLoaderOptions = /** @class */ (function () {
    function GLTFLoaderOptions() {
        // ----------
        // V2 options
        // ----------
        /**
         * The coordinate system mode. Defaults to AUTO.
         */
        this.coordinateSystemMode = GLTFLoaderCoordinateSystemMode.AUTO;
        /**
         * The animation start mode. Defaults to FIRST.
         */
        this.animationStartMode = GLTFLoaderAnimationStartMode.FIRST;
        /**
         * Defines if the loader should load node animations. Defaults to true.
         * NOTE: The animation of this node will still load if the node is also a joint of a skin and `loadSkins` is true.
         */
        this.loadNodeAnimations = true;
        /**
         * Defines if the loader should load skins. Defaults to true.
         */
        this.loadSkins = true;
        /**
         * Defines if the loader should load morph targets. Defaults to true.
         */
        this.loadMorphTargets = true;
        /**
         * Defines if the loader should compile materials before raising the success callback. Defaults to false.
         */
        this.compileMaterials = false;
        /**
         * Defines if the loader should also compile materials with clip planes. Defaults to false.
         */
        this.useClipPlane = false;
        /**
         * Defines if the loader should compile shadow generators before raising the success callback. Defaults to false.
         */
        this.compileShadowGenerators = false;
        /**
         * Defines if the Alpha blended materials are only applied as coverage.
         * If false, (default) The luminance of each pixel will reduce its opacity to simulate the behaviour of most physical materials.
         * If true, no extra effects are applied to transparent pixels.
         */
        this.transparencyAsCoverage = false;
        /**
         * Defines if the loader should use range requests when load binary glTF files from HTTP.
         * Enabling will disable offline support and glTF validator.
         * Defaults to false.
         */
        this.useRangeRequests = false;
        /**
         * Defines if the loader should create instances when multiple glTF nodes point to the same glTF mesh. Defaults to true.
         */
        this.createInstances = true;
        /**
         * Defines if the loader should always compute the bounding boxes of meshes and not use the min/max values from the position accessor. Defaults to false.
         */
        this.alwaysComputeBoundingBox = false;
        /**
         * If true, load all materials defined in the file, even if not used by any mesh. Defaults to false.
         */
        this.loadAllMaterials = false;
        /**
         * If true, load only the materials defined in the file. Defaults to false.
         */
        this.loadOnlyMaterials = false;
        /**
         * If true, do not load any materials defined in the file. Defaults to false.
         */
        this.skipMaterials = false;
        /**
         * If true, load the color (gamma encoded) textures into sRGB buffers (if supported by the GPU), which will yield more accurate results when sampling the texture. Defaults to true.
         */
        this.useSRGBBuffers = true;
        /**
         * When loading glTF animations, which are defined in seconds, target them to this FPS. Defaults to 60.
         */
        this.targetFps = 60;
        /**
         * Defines if the loader should always compute the nearest common ancestor of the skeleton joints instead of using `skin.skeleton`. Defaults to false.
         * Set this to true if loading assets with invalid `skin.skeleton` values.
         */
        this.alwaysComputeSkeletonRootNode = false;
        /**
         * If true, the loader will derive the name for Babylon textures from the glTF texture name, image name, or image url. Defaults to false.
         * Note that it is possible for multiple Babylon textures to share the same name when the Babylon textures load from the same glTF texture or image.
         */
        this.useGltfTextureNames = false;
        /**
         * Function called before loading a url referenced by the asset.
         * @param url url referenced by the asset
         * @returns Async url to load
         */
        this.preprocessUrlAsync = function (url) { return Promise.resolve(url); };
        /**
         * Defines options for glTF extensions.
         */
        this.extensionOptions = {};
    }
    // eslint-disable-next-line babylonjs/available
    GLTFLoaderOptions.prototype.copyFrom = function (options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        if (options) {
            this.onParsed = options.onParsed;
            this.coordinateSystemMode = (_a = options.coordinateSystemMode) !== null && _a !== void 0 ? _a : this.coordinateSystemMode;
            this.animationStartMode = (_b = options.animationStartMode) !== null && _b !== void 0 ? _b : this.animationStartMode;
            this.loadNodeAnimations = (_c = options.loadNodeAnimations) !== null && _c !== void 0 ? _c : this.loadNodeAnimations;
            this.loadSkins = (_d = options.loadSkins) !== null && _d !== void 0 ? _d : this.loadSkins;
            this.loadMorphTargets = (_e = options.loadMorphTargets) !== null && _e !== void 0 ? _e : this.loadMorphTargets;
            this.compileMaterials = (_f = options.compileMaterials) !== null && _f !== void 0 ? _f : this.compileMaterials;
            this.useClipPlane = (_g = options.useClipPlane) !== null && _g !== void 0 ? _g : this.useClipPlane;
            this.compileShadowGenerators = (_h = options.compileShadowGenerators) !== null && _h !== void 0 ? _h : this.compileShadowGenerators;
            this.transparencyAsCoverage = (_j = options.transparencyAsCoverage) !== null && _j !== void 0 ? _j : this.transparencyAsCoverage;
            this.useRangeRequests = (_k = options.useRangeRequests) !== null && _k !== void 0 ? _k : this.useRangeRequests;
            this.createInstances = (_l = options.createInstances) !== null && _l !== void 0 ? _l : this.createInstances;
            this.alwaysComputeBoundingBox = (_m = options.alwaysComputeBoundingBox) !== null && _m !== void 0 ? _m : this.alwaysComputeBoundingBox;
            this.loadAllMaterials = (_o = options.loadAllMaterials) !== null && _o !== void 0 ? _o : this.loadAllMaterials;
            this.loadOnlyMaterials = (_p = options.loadOnlyMaterials) !== null && _p !== void 0 ? _p : this.loadOnlyMaterials;
            this.skipMaterials = (_q = options.skipMaterials) !== null && _q !== void 0 ? _q : this.skipMaterials;
            this.useSRGBBuffers = (_r = options.useSRGBBuffers) !== null && _r !== void 0 ? _r : this.useSRGBBuffers;
            this.targetFps = (_s = options.targetFps) !== null && _s !== void 0 ? _s : this.targetFps;
            this.alwaysComputeSkeletonRootNode = (_t = options.alwaysComputeSkeletonRootNode) !== null && _t !== void 0 ? _t : this.alwaysComputeSkeletonRootNode;
            this.useGltfTextureNames = (_u = options.useGltfTextureNames) !== null && _u !== void 0 ? _u : this.useGltfTextureNames;
            this.preprocessUrlAsync = (_v = options.preprocessUrlAsync) !== null && _v !== void 0 ? _v : this.preprocessUrlAsync;
            this.customRootNode = options.customRootNode;
            this.onMeshLoaded = options.onMeshLoaded;
            this.onSkinLoaded = options.onSkinLoaded;
            this.onTextureLoaded = options.onTextureLoaded;
            this.onMaterialLoaded = options.onMaterialLoaded;
            this.onCameraLoaded = options.onCameraLoaded;
            this.extensionOptions = (_w = options.extensionOptions) !== null && _w !== void 0 ? _w : this.extensionOptions;
        }
    };
    return GLTFLoaderOptions;
}());
/**
 * File loader for loading glTF files into a scene.
 */
var GLTFFileLoader = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(GLTFFileLoader, _super);
    /**
     * Creates a new glTF file loader.
     * @param options The options for the loader
     */
    function GLTFFileLoader(options) {
        var _this = _super.call(this) || this;
        // --------------------
        // Begin Common options
        // --------------------
        /**
         * Raised when the asset has been parsed
         */
        _this.onParsedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        // --------------
        // End V1 options
        // --------------
        /**
         * Observable raised when the loader creates a mesh after parsing the glTF properties of the mesh.
         * Note that the observable is raised as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
         */
        _this.onMeshLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when the loader creates a skin after parsing the glTF properties of the skin node.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
         * @param node - the transform node that corresponds to the original glTF skin node used for animations
         * @param skinnedNode - the transform node that is the skinned mesh itself or the parent of the skinned meshes
         */
        _this.onSkinLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when the loader creates a texture after parsing the glTF properties of the texture.
         */
        _this.onTextureLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when the loader creates a material after parsing the glTF properties of the material.
         */
        _this.onMaterialLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when the loader creates a camera after parsing the glTF properties of the camera.
         */
        _this.onCameraLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when the asset is completely loaded, immediately before the loader is disposed.
         * For assets with LODs, raised when all of the LODs are complete.
         * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
         */
        _this.onCompleteObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised when an error occurs.
         */
        _this.onErrorObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised after the loader is disposed.
         */
        _this.onDisposeObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Observable raised after a loader extension is created.
         * Set additional options for a loader extension in this event.
         */
        _this.onExtensionLoadedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        /**
         * Defines if the loader should validate the asset.
         */
        _this.validate = false;
        /**
         * Observable raised after validation when validate is set to true. The event data is the result of the validation.
         */
        _this.onValidatedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        _this._loader = null;
        _this._state = null;
        _this._requests = new Array();
        /**
         * Name of the loader ("gltf")
         */
        _this.name = _glTFFileLoader_metadata__WEBPACK_IMPORTED_MODULE_2__.GLTFFileLoaderMetadata.name;
        /** @internal */
        _this.extensions = _glTFFileLoader_metadata__WEBPACK_IMPORTED_MODULE_2__.GLTFFileLoaderMetadata.extensions;
        /**
         * Observable raised when the loader state changes.
         */
        _this.onLoaderStateChangedObservable = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable();
        _this._logIndentLevel = 0;
        _this._loggingEnabled = false;
        /** @internal */
        _this._log = _this._logDisabled;
        _this._capturePerformanceCounters = false;
        /** @internal */
        _this._startPerformanceCounter = _this._startPerformanceCounterDisabled;
        /** @internal */
        _this._endPerformanceCounter = _this._endPerformanceCounterDisabled;
        _this.copyFrom(options);
        return _this;
    }
    Object.defineProperty(GLTFFileLoader.prototype, "onParsed", {
        /**
         * Raised when the asset has been parsed
         */
        set: function (callback) {
            if (this._onParsedObserver) {
                this.onParsedObservable.remove(this._onParsedObserver);
            }
            if (callback) {
                this._onParsedObserver = this.onParsedObservable.add(callback);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onMeshLoaded", {
        /**
         * Callback raised when the loader creates a mesh after parsing the glTF properties of the mesh.
         * Note that the callback is called as soon as the mesh object is created, meaning some data may not have been setup yet for this mesh (vertex data, morph targets, material, ...)
         */
        set: function (callback) {
            if (this._onMeshLoadedObserver) {
                this.onMeshLoadedObservable.remove(this._onMeshLoadedObserver);
            }
            if (callback) {
                this._onMeshLoadedObserver = this.onMeshLoadedObservable.add(callback);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onSkinLoaded", {
        /**
         * Callback raised when the loader creates a skin after parsing the glTF properties of the skin node.
         * @see https://doc.babylonjs.com/features/featuresDeepDive/importers/glTF/glTFSkinning#ignoring-the-transform-of-the-skinned-mesh
         */
        set: function (callback) {
            if (this._onSkinLoadedObserver) {
                this.onSkinLoadedObservable.remove(this._onSkinLoadedObserver);
            }
            if (callback) {
                this._onSkinLoadedObserver = this.onSkinLoadedObservable.add(function (data) { return callback(data.node, data.skinnedNode); });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onTextureLoaded", {
        /**
         * Callback raised when the loader creates a texture after parsing the glTF properties of the texture.
         */
        set: function (callback) {
            if (this._onTextureLoadedObserver) {
                this.onTextureLoadedObservable.remove(this._onTextureLoadedObserver);
            }
            if (callback) {
                this._onTextureLoadedObserver = this.onTextureLoadedObservable.add(callback);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onMaterialLoaded", {
        /**
         * Callback raised when the loader creates a material after parsing the glTF properties of the material.
         */
        set: function (callback) {
            if (this._onMaterialLoadedObserver) {
                this.onMaterialLoadedObservable.remove(this._onMaterialLoadedObserver);
            }
            if (callback) {
                this._onMaterialLoadedObserver = this.onMaterialLoadedObservable.add(callback);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onCameraLoaded", {
        /**
         * Callback raised when the loader creates a camera after parsing the glTF properties of the camera.
         */
        set: function (callback) {
            if (this._onCameraLoadedObserver) {
                this.onCameraLoadedObservable.remove(this._onCameraLoadedObserver);
            }
            if (callback) {
                this._onCameraLoadedObserver = this.onCameraLoadedObservable.add(callback);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onComplete", {
        /**
         * Callback raised when the asset is completely loaded, immediately before the loader is disposed.
         * For assets with LODs, raised when all of the LODs are complete.
         * For assets without LODs, raised when the model is complete, immediately after the loader resolves the returned promise.
         */
        set: function (callback) {
            if (this._onCompleteObserver) {
                this.onCompleteObservable.remove(this._onCompleteObserver);
            }
            this._onCompleteObserver = this.onCompleteObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onError", {
        /**
         * Callback raised when an error occurs.
         */
        set: function (callback) {
            if (this._onErrorObserver) {
                this.onErrorObservable.remove(this._onErrorObserver);
            }
            this._onErrorObserver = this.onErrorObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onDispose", {
        /**
         * Callback raised after the loader is disposed.
         */
        set: function (callback) {
            if (this._onDisposeObserver) {
                this.onDisposeObservable.remove(this._onDisposeObserver);
            }
            this._onDisposeObserver = this.onDisposeObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onExtensionLoaded", {
        /**
         * Callback raised after a loader extension is created.
         */
        set: function (callback) {
            if (this._onExtensionLoadedObserver) {
                this.onExtensionLoadedObservable.remove(this._onExtensionLoadedObserver);
            }
            this._onExtensionLoadedObserver = this.onExtensionLoadedObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "loggingEnabled", {
        /**
         * Defines if the loader logging is enabled.
         */
        get: function () {
            return this._loggingEnabled;
        },
        set: function (value) {
            if (this._loggingEnabled === value) {
                return;
            }
            this._loggingEnabled = value;
            if (this._loggingEnabled) {
                this._log = this._logEnabled;
            }
            else {
                this._log = this._logDisabled;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "capturePerformanceCounters", {
        /**
         * Defines if the loader should capture performance counters.
         */
        get: function () {
            return this._capturePerformanceCounters;
        },
        set: function (value) {
            if (this._capturePerformanceCounters === value) {
                return;
            }
            this._capturePerformanceCounters = value;
            if (this._capturePerformanceCounters) {
                this._startPerformanceCounter = this._startPerformanceCounterEnabled;
                this._endPerformanceCounter = this._endPerformanceCounterEnabled;
            }
            else {
                this._startPerformanceCounter = this._startPerformanceCounterDisabled;
                this._endPerformanceCounter = this._endPerformanceCounterDisabled;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GLTFFileLoader.prototype, "onValidated", {
        /**
         * Callback raised after a loader extension is created.
         */
        set: function (callback) {
            if (this._onValidatedObserver) {
                this.onValidatedObservable.remove(this._onValidatedObserver);
            }
            this._onValidatedObserver = this.onValidatedObservable.add(callback);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Disposes the loader, releases resources during load, and cancels any outstanding requests.
     */
    GLTFFileLoader.prototype.dispose = function () {
        if (this._loader) {
            this._loader.dispose();
            this._loader = null;
        }
        for (var _i = 0, _a = this._requests; _i < _a.length; _i++) {
            var request = _a[_i];
            request.abort();
        }
        this._requests.length = 0;
        delete this._progressCallback;
        this.preprocessUrlAsync = function (url) { return Promise.resolve(url); };
        this.onMeshLoadedObservable.clear();
        this.onSkinLoadedObservable.clear();
        this.onTextureLoadedObservable.clear();
        this.onMaterialLoadedObservable.clear();
        this.onCameraLoadedObservable.clear();
        this.onCompleteObservable.clear();
        this.onExtensionLoadedObservable.clear();
        this.onDisposeObservable.notifyObservers(undefined);
        this.onDisposeObservable.clear();
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.loadFile = function (scene, fileOrUrl, rootUrl, onSuccess, onProgress, useArrayBuffer, onError, name) {
        var _this = this;
        if (ArrayBuffer.isView(fileOrUrl)) {
            this._loadBinary(scene, fileOrUrl, rootUrl, onSuccess, onError, name);
            return null;
        }
        this._progressCallback = onProgress;
        var fileName = fileOrUrl.name || babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.GetFilename(fileOrUrl);
        if (useArrayBuffer) {
            if (this.useRangeRequests) {
                if (this.validate) {
                    babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("glTF validation is not supported when range requests are enabled");
                }
                var fileRequest_1 = {
                    abort: function () { },
                    onCompleteObservable: new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Observable(),
                };
                var dataBuffer = {
                    readAsync: function (byteOffset, byteLength) {
                        return new Promise(function (resolve, reject) {
                            _this._loadFile(scene, fileOrUrl, function (data) {
                                resolve(new Uint8Array(data));
                            }, true, function (error) {
                                reject(error);
                            }, function (webRequest) {
                                webRequest.setRequestHeader("Range", "bytes=".concat(byteOffset, "-").concat(byteOffset + byteLength - 1));
                            });
                        });
                    },
                    byteLength: 0,
                };
                this._unpackBinaryAsync(new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader(dataBuffer)).then(function (loaderData) {
                    fileRequest_1.onCompleteObservable.notifyObservers(fileRequest_1);
                    onSuccess(loaderData);
                }, onError ? function (error) { return onError(undefined, error); } : undefined);
                return fileRequest_1;
            }
            return this._loadFile(scene, fileOrUrl, function (data) {
                _this._validate(scene, new Uint8Array(data, 0, data.byteLength), rootUrl, fileName);
                _this._unpackBinaryAsync(new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader({
                    readAsync: function (byteOffset, byteLength) { return readAsync(data, byteOffset, byteLength); },
                    byteLength: data.byteLength,
                })).then(function (loaderData) {
                    onSuccess(loaderData);
                }, onError ? function (error) { return onError(undefined, error); } : undefined);
            }, true, onError);
        }
        else {
            return this._loadFile(scene, fileOrUrl, function (data) {
                try {
                    _this._validate(scene, data, rootUrl, fileName);
                    onSuccess({ json: _this._parseJson(data) });
                }
                catch (_a) {
                    if (onError) {
                        onError();
                    }
                }
            }, false, onError);
        }
    };
    GLTFFileLoader.prototype._loadBinary = function (scene, data, rootUrl, onSuccess, onError, fileName) {
        this._validate(scene, new Uint8Array(data.buffer, data.byteOffset, data.byteLength), rootUrl, fileName);
        this._unpackBinaryAsync(new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader({
            readAsync: function (byteOffset, byteLength) { return readViewAsync(data, byteOffset, byteLength); },
            byteLength: data.byteLength,
        })).then(function (loaderData) {
            onSuccess(loaderData);
        }, onError ? function (error) { return onError(undefined, error); } : undefined);
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.importMeshAsync = function (meshesNames, scene, data, rootUrl, onProgress, fileName) {
        var _this = this;
        return Promise.resolve().then(function () {
            _this.onParsedObservable.notifyObservers(data);
            _this.onParsedObservable.clear();
            _this._log("Loading ".concat(fileName || ""));
            _this._loader = _this._getLoader(data);
            return _this._loader.importMeshAsync(meshesNames, scene, null, data, rootUrl, onProgress, fileName);
        });
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.loadAsync = function (scene, data, rootUrl, onProgress, fileName) {
        var _this = this;
        return Promise.resolve().then(function () {
            _this.onParsedObservable.notifyObservers(data);
            _this.onParsedObservable.clear();
            _this._log("Loading ".concat(fileName || ""));
            _this._loader = _this._getLoader(data);
            return _this._loader.loadAsync(scene, data, rootUrl, onProgress, fileName);
        });
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.loadAssetContainerAsync = function (scene, data, rootUrl, onProgress, fileName) {
        var _this = this;
        return Promise.resolve().then(function () {
            _this.onParsedObservable.notifyObservers(data);
            _this.onParsedObservable.clear();
            _this._log("Loading ".concat(fileName || ""));
            _this._loader = _this._getLoader(data);
            // Prepare the asset container.
            var container = new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
            // Get materials/textures when loading to add to container
            var materials = [];
            _this.onMaterialLoadedObservable.add(function (material) {
                materials.push(material);
            });
            var textures = [];
            _this.onTextureLoadedObservable.add(function (texture) {
                textures.push(texture);
            });
            var cameras = [];
            _this.onCameraLoadedObservable.add(function (camera) {
                cameras.push(camera);
            });
            var morphTargetManagers = [];
            _this.onMeshLoadedObservable.add(function (mesh) {
                if (mesh.morphTargetManager) {
                    morphTargetManagers.push(mesh.morphTargetManager);
                }
            });
            return _this._loader.importMeshAsync(null, scene, container, data, rootUrl, onProgress, fileName).then(function (result) {
                Array.prototype.push.apply(container.geometries, result.geometries);
                Array.prototype.push.apply(container.meshes, result.meshes);
                Array.prototype.push.apply(container.particleSystems, result.particleSystems);
                Array.prototype.push.apply(container.skeletons, result.skeletons);
                Array.prototype.push.apply(container.animationGroups, result.animationGroups);
                Array.prototype.push.apply(container.materials, materials);
                Array.prototype.push.apply(container.textures, textures);
                Array.prototype.push.apply(container.lights, result.lights);
                Array.prototype.push.apply(container.transformNodes, result.transformNodes);
                Array.prototype.push.apply(container.cameras, cameras);
                Array.prototype.push.apply(container.morphTargetManagers, morphTargetManagers);
                return container;
            });
        });
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.canDirectLoad = function (data) {
        return _glTFFileLoader_metadata__WEBPACK_IMPORTED_MODULE_2__.GLTFFileLoaderMetadata.canDirectLoad(data);
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype.directLoad = function (scene, data) {
        if (data.startsWith("base64," + _glTFFileLoader_metadata__WEBPACK_IMPORTED_MODULE_2__.GLTFMagicBase64Encoded) || // this is technically incorrect, but will continue to support for backcompat.
            data.startsWith(";base64," + _glTFFileLoader_metadata__WEBPACK_IMPORTED_MODULE_2__.GLTFMagicBase64Encoded) ||
            data.startsWith("application/octet-stream;base64," + _glTFFileLoader_metadata__WEBPACK_IMPORTED_MODULE_2__.GLTFMagicBase64Encoded) ||
            data.startsWith("model/gltf-binary;base64," + _glTFFileLoader_metadata__WEBPACK_IMPORTED_MODULE_2__.GLTFMagicBase64Encoded)) {
            var arrayBuffer_1 = (0,babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DecodeBase64UrlToBinary)(data);
            this._validate(scene, new Uint8Array(arrayBuffer_1, 0, arrayBuffer_1.byteLength));
            return this._unpackBinaryAsync(new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.DataReader({
                readAsync: function (byteOffset, byteLength) { return readAsync(arrayBuffer_1, byteOffset, byteLength); },
                byteLength: arrayBuffer_1.byteLength,
            }));
        }
        this._validate(scene, data);
        return Promise.resolve({ json: this._parseJson(data) });
    };
    /** @internal */
    GLTFFileLoader.prototype.createPlugin = function (options) {
        return new GLTFFileLoader(options[_glTFFileLoader_metadata__WEBPACK_IMPORTED_MODULE_2__.GLTFFileLoaderMetadata.name]);
    };
    Object.defineProperty(GLTFFileLoader.prototype, "loaderState", {
        /**
         * The loader state or null if the loader is not active.
         */
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns a promise that resolves when the asset is completely loaded.
     * @returns a promise that resolves when the asset is completely loaded.
     */
    GLTFFileLoader.prototype.whenCompleteAsync = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onCompleteObservable.addOnce(function () {
                resolve();
            });
            _this.onErrorObservable.addOnce(function (reason) {
                reject(reason);
            });
        });
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype._setState = function (state) {
        if (this._state === state) {
            return;
        }
        this._state = state;
        this.onLoaderStateChangedObservable.notifyObservers(this._state);
        this._log(GLTFLoaderState[this._state]);
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype._loadFile = function (scene, fileOrUrl, onSuccess, useArrayBuffer, onError, onOpened) {
        var _this = this;
        var request = scene._loadFile(fileOrUrl, onSuccess, function (event) {
            _this._onProgress(event, request);
        }, true, useArrayBuffer, onError, onOpened);
        request.onCompleteObservable.add(function () {
            // Force the length computable to be true since we can guarantee the data is loaded.
            request._lengthComputable = true;
            request._total = request._loaded;
        });
        this._requests.push(request);
        return request;
    };
    GLTFFileLoader.prototype._onProgress = function (event, request) {
        if (!this._progressCallback) {
            return;
        }
        request._lengthComputable = event.lengthComputable;
        request._loaded = event.loaded;
        request._total = event.total;
        var lengthComputable = true;
        var loaded = 0;
        var total = 0;
        for (var _i = 0, _a = this._requests; _i < _a.length; _i++) {
            var request_1 = _a[_i];
            if (request_1._lengthComputable === undefined || request_1._loaded === undefined || request_1._total === undefined) {
                return;
            }
            lengthComputable = lengthComputable && request_1._lengthComputable;
            loaded += request_1._loaded;
            total += request_1._total;
        }
        this._progressCallback({
            lengthComputable: lengthComputable,
            loaded: loaded,
            total: lengthComputable ? total : 0,
        });
    };
    GLTFFileLoader.prototype._validate = function (scene, data, rootUrl, fileName) {
        var _this = this;
        if (rootUrl === void 0) { rootUrl = ""; }
        if (fileName === void 0) { fileName = ""; }
        if (!this.validate) {
            return;
        }
        this._startPerformanceCounter("Validate JSON");
        _glTFValidation__WEBPACK_IMPORTED_MODULE_1__.GLTFValidation.ValidateAsync(data, rootUrl, fileName, function (uri) {
            return _this.preprocessUrlAsync(rootUrl + uri).then(function (url) {
                return scene._loadFileAsync(url, undefined, true, true).then(function (data) {
                    return new Uint8Array(data, 0, data.byteLength);
                });
            });
        }).then(function (result) {
            _this._endPerformanceCounter("Validate JSON");
            _this.onValidatedObservable.notifyObservers(result);
            _this.onValidatedObservable.clear();
        }, function (reason) {
            _this._endPerformanceCounter("Validate JSON");
            babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Failed to validate: ".concat(reason.message));
            _this.onValidatedObservable.clear();
        });
    };
    GLTFFileLoader.prototype._getLoader = function (loaderData) {
        var asset = loaderData.json.asset || {};
        this._log("Asset version: ".concat(asset.version));
        asset.minVersion && this._log("Asset minimum version: ".concat(asset.minVersion));
        asset.generator && this._log("Asset generator: ".concat(asset.generator));
        var version = GLTFFileLoader._parseVersion(asset.version);
        if (!version) {
            throw new Error("Invalid version: " + asset.version);
        }
        if (asset.minVersion !== undefined) {
            var minVersion = GLTFFileLoader._parseVersion(asset.minVersion);
            if (!minVersion) {
                throw new Error("Invalid minimum version: " + asset.minVersion);
            }
            if (GLTFFileLoader._compareVersion(minVersion, { major: 2, minor: 0 }) > 0) {
                throw new Error("Incompatible minimum version: " + asset.minVersion);
            }
        }
        var createLoaders = {
            1: GLTFFileLoader._CreateGLTF1Loader,
            2: GLTFFileLoader._CreateGLTF2Loader,
        };
        var createLoader = createLoaders[version.major];
        if (!createLoader) {
            throw new Error("Unsupported version: " + asset.version);
        }
        return createLoader(this);
    };
    GLTFFileLoader.prototype._parseJson = function (json) {
        this._startPerformanceCounter("Parse JSON");
        this._log("JSON length: ".concat(json.length));
        var parsed = JSON.parse(json);
        this._endPerformanceCounter("Parse JSON");
        return parsed;
    };
    GLTFFileLoader.prototype._unpackBinaryAsync = function (dataReader) {
        var _this = this;
        this._startPerformanceCounter("Unpack Binary");
        // Read magic + version + length + json length + json format
        return dataReader.loadAsync(20).then(function () {
            var Binary = {
                Magic: 0x46546c67,
            };
            var magic = dataReader.readUint32();
            if (magic !== Binary.Magic) {
                throw new babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.RuntimeError("Unexpected magic: " + magic, babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.ErrorCodes.GLTFLoaderUnexpectedMagicError);
            }
            var version = dataReader.readUint32();
            if (_this.loggingEnabled) {
                _this._log("Binary version: ".concat(version));
            }
            var length = dataReader.readUint32();
            if (!_this.useRangeRequests && length !== dataReader.buffer.byteLength) {
                babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Logger.Warn("Length in header does not match actual data length: ".concat(length, " != ").concat(dataReader.buffer.byteLength));
            }
            var unpacked;
            switch (version) {
                case 1: {
                    unpacked = _this._unpackBinaryV1Async(dataReader, length);
                    break;
                }
                case 2: {
                    unpacked = _this._unpackBinaryV2Async(dataReader, length);
                    break;
                }
                default: {
                    throw new Error("Unsupported version: " + version);
                }
            }
            _this._endPerformanceCounter("Unpack Binary");
            return unpacked;
        });
    };
    GLTFFileLoader.prototype._unpackBinaryV1Async = function (dataReader, length) {
        var ContentFormat = {
            JSON: 0,
        };
        var contentLength = dataReader.readUint32();
        var contentFormat = dataReader.readUint32();
        if (contentFormat !== ContentFormat.JSON) {
            throw new Error("Unexpected content format: ".concat(contentFormat));
        }
        var bodyLength = length - dataReader.byteOffset;
        var data = { json: this._parseJson(dataReader.readString(contentLength)), bin: null };
        if (bodyLength !== 0) {
            var startByteOffset_1 = dataReader.byteOffset;
            data.bin = {
                readAsync: function (byteOffset, byteLength) { return dataReader.buffer.readAsync(startByteOffset_1 + byteOffset, byteLength); },
                byteLength: bodyLength,
            };
        }
        return Promise.resolve(data);
    };
    GLTFFileLoader.prototype._unpackBinaryV2Async = function (dataReader, length) {
        var _this = this;
        var ChunkFormat = {
            JSON: 0x4e4f534a,
            BIN: 0x004e4942,
        };
        // Read the JSON chunk header.
        var chunkLength = dataReader.readUint32();
        var chunkFormat = dataReader.readUint32();
        if (chunkFormat !== ChunkFormat.JSON) {
            throw new Error("First chunk format is not JSON");
        }
        // Bail if there are no other chunks.
        if (dataReader.byteOffset + chunkLength === length) {
            return dataReader.loadAsync(chunkLength).then(function () {
                return { json: _this._parseJson(dataReader.readString(chunkLength)), bin: null };
            });
        }
        // Read the JSON chunk and the length and type of the next chunk.
        return dataReader.loadAsync(chunkLength + 8).then(function () {
            var data = { json: _this._parseJson(dataReader.readString(chunkLength)), bin: null };
            var readAsync = function () {
                var chunkLength = dataReader.readUint32();
                var chunkFormat = dataReader.readUint32();
                switch (chunkFormat) {
                    case ChunkFormat.JSON: {
                        throw new Error("Unexpected JSON chunk");
                    }
                    case ChunkFormat.BIN: {
                        var startByteOffset_2 = dataReader.byteOffset;
                        data.bin = {
                            readAsync: function (byteOffset, byteLength) { return dataReader.buffer.readAsync(startByteOffset_2 + byteOffset, byteLength); },
                            byteLength: chunkLength,
                        };
                        dataReader.skipBytes(chunkLength);
                        break;
                    }
                    default: {
                        // ignore unrecognized chunkFormat
                        dataReader.skipBytes(chunkLength);
                        break;
                    }
                }
                if (dataReader.byteOffset !== length) {
                    return dataReader.loadAsync(8).then(readAsync);
                }
                return Promise.resolve(data);
            };
            return readAsync();
        });
    };
    GLTFFileLoader._parseVersion = function (version) {
        if (version === "1.0" || version === "1.0.1") {
            return {
                major: 1,
                minor: 0,
            };
        }
        var match = (version + "").match(/^(\d+)\.(\d+)/);
        if (!match) {
            return null;
        }
        return {
            major: parseInt(match[1]),
            minor: parseInt(match[2]),
        };
    };
    GLTFFileLoader._compareVersion = function (a, b) {
        if (a.major > b.major) {
            return 1;
        }
        if (a.major < b.major) {
            return -1;
        }
        if (a.minor > b.minor) {
            return 1;
        }
        if (a.minor < b.minor) {
            return -1;
        }
        return 0;
    };
    /**
     * @internal
     */
    GLTFFileLoader.prototype._logOpen = function (message) {
        this._log(message);
        this._logIndentLevel++;
    };
    /** @internal */
    GLTFFileLoader.prototype._logClose = function () {
        --this._logIndentLevel;
    };
    GLTFFileLoader.prototype._logEnabled = function (message) {
        var spaces = GLTFFileLoader._logSpaces.substring(0, this._logIndentLevel * 2);
        babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Logger.Log("".concat(spaces).concat(message));
    };
    GLTFFileLoader.prototype._logDisabled = function (message) { };
    GLTFFileLoader.prototype._startPerformanceCounterEnabled = function (counterName) {
        babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.StartPerformanceCounter(counterName);
    };
    GLTFFileLoader.prototype._startPerformanceCounterDisabled = function (counterName) { };
    GLTFFileLoader.prototype._endPerformanceCounterEnabled = function (counterName) {
        babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.Tools.EndPerformanceCounter(counterName);
    };
    GLTFFileLoader.prototype._endPerformanceCounterDisabled = function (counterName) { };
    // ------------------
    // End Common options
    // ------------------
    // ----------------
    // Begin V1 options
    // ----------------
    /**
     * Set this property to false to disable incremental loading which delays the loader from calling the success callback until after loading the meshes and shaders.
     * Textures always loads asynchronously. For example, the success callback can compute the bounding information of the loaded meshes when incremental loading is disabled.
     * Defaults to true.
     * @internal
     */
    GLTFFileLoader.IncrementalLoading = true;
    /**
     * Set this property to true in order to work with homogeneous coordinates, available with some converters and exporters.
     * Defaults to false. See https://en.wikipedia.org/wiki/Homogeneous_coordinates.
     * @internal
     */
    GLTFFileLoader.HomogeneousCoordinates = false;
    GLTFFileLoader._logSpaces = "                                ";
    return GLTFFileLoader;
}(GLTFLoaderOptions));

(0,babylonjs_Misc_observable__WEBPACK_IMPORTED_MODULE_0__.registerSceneLoaderPlugin)(new GLTFFileLoader());


/***/ }),

/***/ "../../../dev/loaders/src/glTF/glTFValidation.ts":
/*!*******************************************************!*\
  !*** ../../../dev/loaders/src/glTF/glTFValidation.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFValidation: () => (/* binding */ GLTFValidation)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/tools */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__);

function validateAsync(data, rootUrl, fileName, getExternalResource) {
    var options = {
        externalResourceFunction: getExternalResource,
    };
    if (fileName) {
        options.uri = rootUrl === "file:" ? fileName : rootUrl + fileName;
    }
    return ArrayBuffer.isView(data) ? GLTFValidator.validateBytes(data, options) : GLTFValidator.validateString(data, options);
}
/**
 * The worker function that gets converted to a blob url to pass into a worker.
 */
function workerFunc() {
    var pendingExternalResources = [];
    onmessage = function (message) {
        var data = message.data;
        switch (data.id) {
            case "init": {
                importScripts(data.url);
                break;
            }
            case "validate": {
                validateAsync(data.data, data.rootUrl, data.fileName, function (uri) {
                    return new Promise(function (resolve, reject) {
                        var index = pendingExternalResources.length;
                        pendingExternalResources.push({ resolve: resolve, reject: reject });
                        postMessage({ id: "getExternalResource", index: index, uri: uri });
                    });
                }).then(function (value) {
                    postMessage({ id: "validate.resolve", value: value });
                }, function (reason) {
                    postMessage({ id: "validate.reject", reason: reason });
                });
                break;
            }
            case "getExternalResource.resolve": {
                pendingExternalResources[data.index].resolve(data.value);
                break;
            }
            case "getExternalResource.reject": {
                pendingExternalResources[data.index].reject(data.reason);
                break;
            }
        }
    };
}
/**
 * glTF validation
 */
var GLTFValidation = /** @class */ (function () {
    function GLTFValidation() {
    }
    /**
     * Validate a glTF asset using the glTF-Validator.
     * @param data The JSON of a glTF or the array buffer of a binary glTF
     * @param rootUrl The root url for the glTF
     * @param fileName The file name for the glTF
     * @param getExternalResource The callback to get external resources for the glTF validator
     * @returns A promise that resolves with the glTF validation results once complete
     */
    GLTFValidation.ValidateAsync = function (data, rootUrl, fileName, getExternalResource) {
        var _this = this;
        if (typeof Worker === "function") {
            return new Promise(function (resolve, reject) {
                var workerContent = "".concat(validateAsync, "(").concat(workerFunc, ")()");
                var workerBlobUrl = URL.createObjectURL(new Blob([workerContent], { type: "application/javascript" }));
                var worker = new Worker(workerBlobUrl);
                var onError = function (error) {
                    worker.removeEventListener("error", onError);
                    worker.removeEventListener("message", onMessage);
                    reject(error);
                };
                var onMessage = function (message) {
                    var data = message.data;
                    switch (data.id) {
                        case "getExternalResource": {
                            getExternalResource(data.uri).then(function (value) {
                                worker.postMessage({ id: "getExternalResource.resolve", index: data.index, value: value }, [value.buffer]);
                            }, function (reason) {
                                worker.postMessage({ id: "getExternalResource.reject", index: data.index, reason: reason });
                            });
                            break;
                        }
                        case "validate.resolve": {
                            worker.removeEventListener("error", onError);
                            worker.removeEventListener("message", onMessage);
                            resolve(data.value);
                            worker.terminate();
                            break;
                        }
                        case "validate.reject": {
                            worker.removeEventListener("error", onError);
                            worker.removeEventListener("message", onMessage);
                            reject(data.reason);
                            worker.terminate();
                        }
                    }
                };
                worker.addEventListener("error", onError);
                worker.addEventListener("message", onMessage);
                worker.postMessage({ id: "init", url: babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.GetBabylonScriptURL(_this.Configuration.url) });
                if (ArrayBuffer.isView(data)) {
                    // Slice the data to avoid copying the whole array buffer.
                    var slicedData = data.slice();
                    worker.postMessage({ id: "validate", data: slicedData, rootUrl: rootUrl, fileName: fileName }, [slicedData.buffer]);
                }
                else {
                    worker.postMessage({ id: "validate", data: data, rootUrl: rootUrl, fileName: fileName });
                }
            });
        }
        else {
            if (!this._LoadScriptPromise) {
                this._LoadScriptPromise = babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.LoadBabylonScriptAsync(this.Configuration.url);
            }
            return this._LoadScriptPromise.then(function () {
                return validateAsync(data, rootUrl, fileName, getExternalResource);
            });
        }
    };
    /**
     * The configuration. Defaults to `{ url: "https://cdn.babylonjs.com/gltf_validator.js" }`.
     */
    GLTFValidation.Configuration = {
        url: "".concat(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools._DefaultCdnUrl, "/gltf_validator.js"),
    };
    return GLTFValidation;
}());



/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-glTF.ts":
/*!******************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-glTF.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTFFileLoader: () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFFileLoader),
/* harmony export */   GLTFLoaderAnimationStartMode: () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderAnimationStartMode),
/* harmony export */   GLTFLoaderCoordinateSystemMode: () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderCoordinateSystemMode),
/* harmony export */   GLTFLoaderState: () => (/* reexport safe */ loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderState),
/* harmony export */   GLTFValidation: () => (/* reexport safe */ loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__.GLTFValidation)
/* harmony export */ });
/* harmony import */ var loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/glTF/glTFFileLoader */ "../../../dev/loaders/src/glTF/glTFFileLoader.ts");
/* harmony import */ var loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! loaders/glTF/glTFValidation */ "../../../dev/loaders/src/glTF/glTFValidation.ts");


/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    for (var key in loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[key] = loaders_glTF_glTFFileLoader__WEBPACK_IMPORTED_MODULE_0__[key];
    }
    for (var key in loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__) {
        globalObject.BABYLON[key] = loaders_glTF_glTFValidation__WEBPACK_IMPORTED_MODULE_1__[key];
    }
}




/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-glTF1.ts":
/*!*******************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-glTF1.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTF1: () => (/* reexport module object */ loaders_glTF_1_0_index__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var loaders_glTF_1_0_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/glTF/1.0/index */ "../../../dev/loaders/src/glTF/1.0/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    globalObject.BABYLON = globalObject.BABYLON || {};
    globalObject.BABYLON.GLTF1 = globalObject.BABYLON.GLTF1 || {};
    for (var key in loaders_glTF_1_0_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON.GLTF1[key] = loaders_glTF_1_0_index__WEBPACK_IMPORTED_MODULE_0__[key];
    }
}



/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-glTF1FileLoader.ts":
/*!*****************************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-glTF1FileLoader.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GLTF1: () => (/* reexport safe */ _legacy_glTF1__WEBPACK_IMPORTED_MODULE_1__.GLTF1),
/* harmony export */   GLTFFileLoader: () => (/* reexport safe */ _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__.GLTFFileLoader),
/* harmony export */   GLTFLoaderAnimationStartMode: () => (/* reexport safe */ _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderAnimationStartMode),
/* harmony export */   GLTFLoaderCoordinateSystemMode: () => (/* reexport safe */ _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderCoordinateSystemMode),
/* harmony export */   GLTFLoaderState: () => (/* reexport safe */ _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__.GLTFLoaderState),
/* harmony export */   GLTFValidation: () => (/* reexport safe */ _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__.GLTFValidation)
/* harmony export */ });
/* harmony import */ var _legacy_glTF__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./legacy-glTF */ "../../../lts/loaders/src/legacy/legacy-glTF.ts");
/* harmony import */ var _legacy_glTF1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legacy-glTF1 */ "../../../lts/loaders/src/legacy/legacy-glTF1.ts");
// eslint-disable-next-line import/export




/***/ }),

/***/ "babylonjs/Misc/tools":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_tools__;

/***/ }),

/***/ "../../../../node_modules/tslib/tslib.es6.mjs":
/*!****************************************************!*\
  !*** ../../../../node_modules/tslib/tslib.es6.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __rewriteRelativeImportExtension: () => (/* binding */ __rewriteRelativeImportExtension),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension,
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./src/glTF1FileLoader.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loaders: () => (/* reexport module object */ _lts_loaders_legacy_legacy_glTF1FileLoader__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_loaders_legacy_legacy_glTF1FileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/loaders/legacy/legacy-glTF1FileLoader */ "../../../lts/loaders/src/legacy/legacy-glTF1FileLoader.ts");
// eslint-disable-next-line import/export


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_loaders_legacy_legacy_glTF1FileLoader__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5nbFRGMUZpbGVMb2FkZXIuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFJQTtBQUlBO0FBYUE7OztBQUdBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1REE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBQ0E7QUFHQTs7O0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQVVBO0FBUkE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQVNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7QUFPQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFyQ0E7O0FBRUE7QUFDQTtBQUFBO0FBbUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQVFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUFBO0FBd2FBO0FBdmFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUFBO0FBMFRBO0FBdlRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQVVBO0FBRUE7QUFLQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFFQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUFBO0FBUUE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFRQTtBQUVBO0FBS0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUVBOzs7Ozs7O0FBT0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBeFRBO0FBeVRBO0FBQUE7QUExVEE7QUE0VEE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBOzs7QUFBQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQU9BO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQU9BO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQU9BO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBTUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFPQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDendFQTs7O0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBOzs7O0FBSUE7QUFDQTtBQUFBO0FBbVFBO0FBbFFBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFPQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFuUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBd0RBOzs7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBTUE7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQXlCQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQXNDQTs7QUFFQTtBQUNBO0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQTBCQTtBQUFBO0FBNENBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUVBOzs7O0FBSUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBbUNBOztBQUVBO0FBQ0E7QUFRQTtBQXhNQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBd0tBO0FBQUE7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFPQTs7O0FBR0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQXVDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQWlCQTs7Ozs7QUFLQTtBQUNBO0FBaUJBOztBQUVBO0FBQ0E7QUFnQkE7O0FBRUE7QUFDQTtBQWdCQTs7QUFFQTtBQUNBO0FBZ0JBOzs7O0FBSUE7QUFDQTtBQWdCQTs7QUFFQTtBQUNBO0FBY0E7O0FBRUE7QUFDQTtBQWNBOzs7QUFHQTtBQUNBO0FBMERBOztBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBY0E7QUFDQTtBQUVBO0FBRUE7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFrVEE7O0FBRUE7QUFDQTtBQXVVQTtBQUNBO0FBRUE7QUFDQTtBQXNCQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBNThCQTs7QUFDQTtBQWdCQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUF5Q0E7QUFKQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQWdCQTtBQUpBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBWUE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBWUE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBWUE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBZ0JBO0FBTEE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFZQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQVlBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBYUE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFLQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFkQTtBQW1CQTtBQUhBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBaEJBO0FBaUNBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBZUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBR0E7QUFJQTtBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFFQTtBQVFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBR0E7QUFFQTs7QUFFQTtBQUNBO0FBQUE7QUFRQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBT0E7OztBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQVFBO0FBSUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBU0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUE5N0JBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUE0M0JBO0FBOENBO0FBQUE7QUF0K0JBO0FBdytCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqM0NBO0FBU0E7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVlBOztBQUVBO0FBQ0E7QUFBQTtBQXlGQTtBQS9FQTs7Ozs7OztBQU9BO0FBQ0E7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdkZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBbUZBO0FBQUE7QUF6RkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RGQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ0ZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2haQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0xPQURFUlMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvMS4wL2dsVEZCaW5hcnlFeHRlbnNpb24udHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvZ2xURi8xLjAvZ2xURkxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzEuMC9nbFRGTG9hZGVySW50ZXJmYWNlcy50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzEuMC9nbFRGTG9hZGVyVXRpbHMudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvZ2xURi8xLjAvZ2xURk1hdGVyaWFsc0NvbW1vbkV4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGLzEuMC9pbmRleC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9nbFRGL2dsVEZGaWxlTG9hZGVyLm1ldGFkYXRhLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL2dsVEYvZ2xURkZpbGVMb2FkZXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvZ2xURi9nbFRGVmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2x0cy9sb2FkZXJzL3NyYy9sZWdhY3kvbGVnYWN5LWdsVEYudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9sdHMvbG9hZGVycy9zcmMvbGVnYWN5L2xlZ2FjeS1nbFRGMS50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2x0cy9sb2FkZXJzL3NyYy9sZWdhY3kvbGVnYWN5LWdsVEYxRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uL3NyYy9nbFRGMUZpbGVMb2FkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYmFieWxvbmpzLWxvYWRlcnNcIiwgW1wiYmFieWxvbmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJhYnlsb25qcy1sb2FkZXJzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJMT0FERVJTXCJdID0gZmFjdG9yeShyb290W1wiQkFCWUxPTlwiXSk7XG59KSgodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMpLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWlzY190b29sc19fKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgR0xURkxvYWRlckV4dGVuc2lvbiwgR0xURkxvYWRlciwgR0xURkxvYWRlckJhc2UgfSBmcm9tIFwiLi9nbFRGTG9hZGVyXCI7XHJcbmltcG9ydCB7IEdMVEZVdGlscyB9IGZyb20gXCIuL2dsVEZMb2FkZXJVdGlsc1wiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURkxvYWRlckRhdGEgfSBmcm9tIFwiLi4vZ2xURkZpbGVMb2FkZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBJR0xURlJ1bnRpbWUsIElHTFRGVGV4dHVyZSwgSUdMVEZJbWFnZSwgSUdMVEZCdWZmZXJWaWV3LCBJR0xURlNoYWRlciB9IGZyb20gXCIuL2dsVEZMb2FkZXJJbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IEVDb21wb25lbnRUeXBlIH0gZnJvbSBcIi4vZ2xURkxvYWRlckludGVyZmFjZXNcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgSURhdGFCdWZmZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RhdGFSZWFkZXJcIjtcclxuXHJcbmNvbnN0IEJpbmFyeUV4dGVuc2lvbkJ1ZmZlck5hbWUgPSBcImJpbmFyeV9nbFRGXCI7XHJcblxyXG5pbnRlcmZhY2UgSUdMVEZCaW5hcnlFeHRlbnNpb25TaGFkZXIge1xyXG4gICAgYnVmZmVyVmlldzogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSUdMVEZCaW5hcnlFeHRlbnNpb25JbWFnZSB7XHJcbiAgICBidWZmZXJWaWV3OiBzdHJpbmc7XHJcbiAgICBtaW1lVHlwZTogc3RyaW5nO1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG59XHJcblxyXG4vKipcclxuICogQGludGVybmFsXHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR0xURkJpbmFyeUV4dGVuc2lvbiBleHRlbmRzIEdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgcHJpdmF0ZSBfYmluOiBJRGF0YUJ1ZmZlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJLSFJfYmluYXJ5X2dsVEZcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGxvYWRSdW50aW1lQXN5bmMoc2NlbmU6IFNjZW5lLCBkYXRhOiBJR0xURkxvYWRlckRhdGEsIHJvb3RVcmw6IHN0cmluZywgb25TdWNjZXNzOiAoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSkgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbnNVc2VkID0gKDxhbnk+ZGF0YS5qc29uKS5leHRlbnNpb25zVXNlZDtcclxuICAgICAgICBpZiAoIWV4dGVuc2lvbnNVc2VkIHx8IGV4dGVuc2lvbnNVc2VkLmluZGV4T2YodGhpcy5uYW1lKSA9PT0gLTEgfHwgIWRhdGEuYmluKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2JpbiA9IGRhdGEuYmluO1xyXG4gICAgICAgIG9uU3VjY2VzcyhHTFRGTG9hZGVyQmFzZS5DcmVhdGVSdW50aW1lKGRhdGEuanNvbiwgc2NlbmUsIHJvb3RVcmwpKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgbG9hZEJ1ZmZlckFzeW5jKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIGlkOiBzdHJpbmcsIG9uU3VjY2VzczogKGJ1ZmZlcjogQXJyYXlCdWZmZXJWaWV3KSA9PiB2b2lkLCBvbkVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGdsdGZSdW50aW1lLmV4dGVuc2lvbnNVc2VkLmluZGV4T2YodGhpcy5uYW1lKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlkICE9PSBCaW5hcnlFeHRlbnNpb25CdWZmZXJOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2Jpbi5yZWFkQXN5bmMoMCwgdGhpcy5fYmluLmJ5dGVMZW5ndGgpLnRoZW4ob25TdWNjZXNzLCAoZXJyb3IpID0+IG9uRXJyb3IoZXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBsb2FkVGV4dHVyZUJ1ZmZlckFzeW5jKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIGlkOiBzdHJpbmcsIG9uU3VjY2VzczogKGJ1ZmZlcjogQXJyYXlCdWZmZXJWaWV3KSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZTogSUdMVEZUZXh0dXJlID0gZ2x0ZlJ1bnRpbWUudGV4dHVyZXNbaWRdO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZTogSUdMVEZJbWFnZSA9IGdsdGZSdW50aW1lLmltYWdlc1t0ZXh0dXJlLnNvdXJjZV07XHJcbiAgICAgICAgaWYgKCFzb3VyY2UuZXh0ZW5zaW9ucyB8fCAhKHRoaXMubmFtZSBpbiBzb3VyY2UuZXh0ZW5zaW9ucykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc291cmNlRXh0OiBJR0xURkJpbmFyeUV4dGVuc2lvbkltYWdlID0gc291cmNlLmV4dGVuc2lvbnNbdGhpcy5uYW1lXTtcclxuICAgICAgICBjb25zdCBidWZmZXJWaWV3OiBJR0xURkJ1ZmZlclZpZXcgPSBnbHRmUnVudGltZS5idWZmZXJWaWV3c1tzb3VyY2VFeHQuYnVmZmVyVmlld107XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gR0xURlV0aWxzLkdldEJ1ZmZlckZyb21CdWZmZXJWaWV3KGdsdGZSdW50aW1lLCBidWZmZXJWaWV3LCAwLCBidWZmZXJWaWV3LmJ5dGVMZW5ndGgsIEVDb21wb25lbnRUeXBlLlVOU0lHTkVEX0JZVEUpO1xyXG4gICAgICAgIG9uU3VjY2VzcyhidWZmZXIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBsb2FkU2hhZGVyU3RyaW5nQXN5bmMoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSwgaWQ6IHN0cmluZywgb25TdWNjZXNzOiAoc2hhZGVyU3RyaW5nOiBzdHJpbmcpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBzaGFkZXI6IElHTFRGU2hhZGVyID0gZ2x0ZlJ1bnRpbWUuc2hhZGVyc1tpZF07XHJcbiAgICAgICAgaWYgKCFzaGFkZXIuZXh0ZW5zaW9ucyB8fCAhKHRoaXMubmFtZSBpbiBzaGFkZXIuZXh0ZW5zaW9ucykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYmluYXJ5RXh0ZW5zaW9uU2hhZGVyOiBJR0xURkJpbmFyeUV4dGVuc2lvblNoYWRlciA9IHNoYWRlci5leHRlbnNpb25zW3RoaXMubmFtZV07XHJcbiAgICAgICAgY29uc3QgYnVmZmVyVmlldzogSUdMVEZCdWZmZXJWaWV3ID0gZ2x0ZlJ1bnRpbWUuYnVmZmVyVmlld3NbYmluYXJ5RXh0ZW5zaW9uU2hhZGVyLmJ1ZmZlclZpZXddO1xyXG4gICAgICAgIGNvbnN0IHNoYWRlckJ5dGVzID0gR0xURlV0aWxzLkdldEJ1ZmZlckZyb21CdWZmZXJWaWV3KGdsdGZSdW50aW1lLCBidWZmZXJWaWV3LCAwLCBidWZmZXJWaWV3LmJ5dGVMZW5ndGgsIEVDb21wb25lbnRUeXBlLlVOU0lHTkVEX0JZVEUpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2hhZGVyU3RyaW5nID0gR0xURlV0aWxzLkRlY29kZUJ1ZmZlclRvVGV4dChzaGFkZXJCeXRlcyk7XHJcbiAgICAgICAgICAgIG9uU3VjY2VzcyhzaGFkZXJTdHJpbmcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihuZXcgR0xURkJpbmFyeUV4dGVuc2lvbigpKTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXHJcbmltcG9ydCB0eXBlIHtcclxuICAgIElHTFRGUnVudGltZSxcclxuICAgIElHTFRGVGVjaG5pcXVlUGFyYW1ldGVyLFxyXG4gICAgSUdMVEZBbmltYXRpb24sXHJcbiAgICBJR0xURkFuaW1hdGlvblNhbXBsZXIsXHJcbiAgICBJR0xURk5vZGUsXHJcbiAgICBJR0xURlNraW5zLFxyXG4gICAgSU5vZGVUb1Jvb3QsXHJcbiAgICBJSm9pbnROb2RlLFxyXG4gICAgSUdMVEZNZXNoLFxyXG4gICAgSUdMVEZBY2Nlc3NvcixcclxuICAgIElHTFRGTGlnaHQsXHJcbiAgICBJR0xURkFtYmllbkxpZ2h0LFxyXG4gICAgSUdMVEZEaXJlY3Rpb25hbExpZ2h0LFxyXG4gICAgSUdMVEZQb2ludExpZ2h0LFxyXG4gICAgSUdMVEZTcG90TGlnaHQsXHJcbiAgICBJR0xURkNhbWVyYSxcclxuICAgIElHTFRGQ2FtZXJhUGVyc3BlY3RpdmUsXHJcbiAgICBJR0xURlNjZW5lLFxyXG4gICAgSUdMVEZUZWNobmlxdWUsXHJcbiAgICBJR0xURk1hdGVyaWFsLFxyXG4gICAgSUdMVEZQcm9ncmFtLFxyXG4gICAgSUdMVEZCdWZmZXIsXHJcbiAgICBJR0xURlRleHR1cmUsXHJcbiAgICBJR0xURkltYWdlLFxyXG4gICAgSUdMVEZTYW1wbGVyLFxyXG4gICAgSUdMVEZTaGFkZXIsXHJcbiAgICBJR0xURlRlY2huaXF1ZVN0YXRlcyxcclxufSBmcm9tIFwiLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBFUGFyYW1ldGVyVHlwZSwgRVRleHR1cmVGaWx0ZXJUeXBlLCBFQ3VsbGluZ1R5cGUsIEVCbGVuZGluZ0Z1bmN0aW9uLCBFU2hhZGVyVHlwZSB9IGZyb20gXCIuL2dsVEZMb2FkZXJJbnRlcmZhY2VzXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IEZsb2F0QXJyYXksIE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgUXVhdGVybmlvbiwgVmVjdG9yMywgTWF0cml4IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHsgQ2FtZXJhIH0gZnJvbSBcImNvcmUvQ2FtZXJhcy9jYW1lcmFcIjtcclxuaW1wb3J0IHsgRnJlZUNhbWVyYSB9IGZyb20gXCJjb3JlL0NhbWVyYXMvZnJlZUNhbWVyYVwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tIFwiY29yZS9BbmltYXRpb25zL2FuaW1hdGlvblwiO1xyXG5pbXBvcnQgeyBCb25lIH0gZnJvbSBcImNvcmUvQm9uZXMvYm9uZVwiO1xyXG5pbXBvcnQgeyBTa2VsZXRvbiB9IGZyb20gXCJjb3JlL0JvbmVzL3NrZWxldG9uXCI7XHJcbmltcG9ydCB7IEVmZmVjdCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9lZmZlY3RcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgTXVsdGlNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tdWx0aU1hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFN0YW5kYXJkTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvc3RhbmRhcmRNYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBTaGFkZXJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9zaGFkZXJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOb2RlIH0gZnJvbSBcImNvcmUvbm9kZVwiO1xyXG5pbXBvcnQgeyBWZXJ0ZXhEYXRhIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2gudmVydGV4RGF0YVwiO1xyXG5pbXBvcnQgeyBWZXJ0ZXhCdWZmZXIgfSBmcm9tIFwiY29yZS9CdWZmZXJzL2J1ZmZlclwiO1xyXG5pbXBvcnQgeyBHZW9tZXRyeSB9IGZyb20gXCJjb3JlL01lc2hlcy9nZW9tZXRyeVwiO1xyXG5pbXBvcnQgeyBTdWJNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL3N1Yk1lc2hcIjtcclxuaW1wb3J0IHsgQWJzdHJhY3RNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2Fic3RyYWN0TWVzaFwiO1xyXG5pbXBvcnQgeyBNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL21lc2hcIjtcclxuaW1wb3J0IHsgSGVtaXNwaGVyaWNMaWdodCB9IGZyb20gXCJjb3JlL0xpZ2h0cy9oZW1pc3BoZXJpY0xpZ2h0XCI7XHJcbmltcG9ydCB7IERpcmVjdGlvbmFsTGlnaHQgfSBmcm9tIFwiY29yZS9MaWdodHMvZGlyZWN0aW9uYWxMaWdodFwiO1xyXG5pbXBvcnQgeyBQb2ludExpZ2h0IH0gZnJvbSBcImNvcmUvTGlnaHRzL3BvaW50TGlnaHRcIjtcclxuaW1wb3J0IHsgU3BvdExpZ2h0IH0gZnJvbSBcImNvcmUvTGlnaHRzL3Nwb3RMaWdodFwiO1xyXG5pbXBvcnQgdHlwZSB7IElTY2VuZUxvYWRlckFzeW5jUmVzdWx0LCBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50IH0gZnJvbSBcImNvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuXHJcbmltcG9ydCB7IEdMVEZVdGlscyB9IGZyb20gXCIuL2dsVEZMb2FkZXJVdGlsc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElHTFRGTG9hZGVyLCBJR0xURkxvYWRlckRhdGEgfSBmcm9tIFwiLi4vZ2xURkZpbGVMb2FkZXJcIjtcclxuaW1wb3J0IHsgR0xURkZpbGVMb2FkZXIgfSBmcm9tIFwiLi4vZ2xURkZpbGVMb2FkZXJcIjtcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSBcImNvcmUvRW5naW5lcy9jb25zdGFudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBBc3NldENvbnRhaW5lciB9IGZyb20gXCJjb3JlL2Fzc2V0Q29udGFpbmVyXCI7XHJcblxyXG4vKipcclxuICogVG9rZW5pemVyLiBVc2VkIGZvciBzaGFkZXJzIGNvbXBhdGliaWxpdHlcclxuICogQXV0b21hdGljYWxseSBtYXAgd29ybGQsIHZpZXcsIHByb2plY3Rpb24sIHdvcmxkVmlld1Byb2plY3Rpb24sIGF0dHJpYnV0ZXMgYW5kIHNvIG9uXHJcbiAqL1xyXG5lbnVtIEVUb2tlblR5cGUge1xyXG4gICAgSURFTlRJRklFUiA9IDEsXHJcblxyXG4gICAgVU5LTk9XTiA9IDIsXHJcbiAgICBFTkRfT0ZfSU5QVVQgPSAzLFxyXG59XHJcblxyXG5jbGFzcyBUb2tlbml6ZXIge1xyXG4gICAgcHJpdmF0ZSBfdG9QYXJzZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfcG9zOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBfbWF4UG9zOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGN1cnJlbnRUb2tlbjogRVRva2VuVHlwZSA9IEVUb2tlblR5cGUuVU5LTk9XTjtcclxuICAgIHB1YmxpYyBjdXJyZW50SWRlbnRpZmllcjogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBjdXJyZW50U3RyaW5nOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGlzTGV0dGVyT3JEaWdpdFBhdHRlcm46IFJlZ0V4cCA9IC9eW2EtekEtWjAtOV0rJC87XHJcblxyXG4gICAgY29uc3RydWN0b3IodG9QYXJzZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdG9QYXJzZSA9IHRvUGFyc2U7XHJcbiAgICAgICAgdGhpcy5fbWF4UG9zID0gdG9QYXJzZS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5leHRUb2tlbigpOiBFVG9rZW5UeXBlIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBFVG9rZW5UeXBlLkVORF9PRl9JTlBVVDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudFN0cmluZyA9IHRoaXMucmVhZCgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRva2VuID0gRVRva2VuVHlwZS5VTktOT1dOO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RyaW5nID09PSBcIl9cIiB8fCB0aGlzLmlzTGV0dGVyT3JEaWdpdFBhdHRlcm4udGVzdCh0aGlzLmN1cnJlbnRTdHJpbmcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRva2VuID0gRVRva2VuVHlwZS5JREVOVElGSUVSO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJZGVudGlmaWVyID0gdGhpcy5jdXJyZW50U3RyaW5nO1xyXG4gICAgICAgICAgICB3aGlsZSAoIXRoaXMuaXNFbmQoKSAmJiAodGhpcy5pc0xldHRlck9yRGlnaXRQYXR0ZXJuLnRlc3QoKHRoaXMuY3VycmVudFN0cmluZyA9IHRoaXMucGVlaygpKSkgfHwgdGhpcy5jdXJyZW50U3RyaW5nID09PSBcIl9cIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudElkZW50aWZpZXIgKz0gdGhpcy5jdXJyZW50U3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRUb2tlbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGVlaygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b1BhcnNlW3RoaXMuX3Bvc107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9QYXJzZVt0aGlzLl9wb3MrK107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZvcndhcmQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcG9zKys7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzRW5kKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3MgPj0gdGhpcy5fbWF4UG9zO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVmFsdWVzXHJcbiAqL1xyXG5jb25zdCBnbFRGVHJhbnNmb3JtcyA9IFtcIk1PREVMXCIsIFwiVklFV1wiLCBcIlBST0pFQ1RJT05cIiwgXCJNT0RFTFZJRVdcIiwgXCJNT0RFTFZJRVdQUk9KRUNUSU9OXCIsIFwiSk9JTlRNQVRSSVhcIl07XHJcbmNvbnN0IGJhYnlsb25UcmFuc2Zvcm1zID0gW1wid29ybGRcIiwgXCJ2aWV3XCIsIFwicHJvamVjdGlvblwiLCBcIndvcmxkVmlld1wiLCBcIndvcmxkVmlld1Byb2plY3Rpb25cIiwgXCJtQm9uZXNcIl07XHJcblxyXG5jb25zdCBnbFRGQW5pbWF0aW9uUGF0aHMgPSBbXCJ0cmFuc2xhdGlvblwiLCBcInJvdGF0aW9uXCIsIFwic2NhbGVcIl07XHJcbmNvbnN0IGJhYnlsb25BbmltYXRpb25QYXRocyA9IFtcInBvc2l0aW9uXCIsIFwicm90YXRpb25RdWF0ZXJuaW9uXCIsIFwic2NhbGluZ1wiXTtcclxuXHJcbi8qKlxyXG4gKiBQYXJzZVxyXG4gKiBAcGFyYW0gcGFyc2VkQnVmZmVyc1xyXG4gKiBAcGFyYW0gZ2x0ZlJ1bnRpbWVcclxuICovXHJcbmNvbnN0IHBhcnNlQnVmZmVycyA9IChwYXJzZWRCdWZmZXJzOiBhbnksIGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUpID0+IHtcclxuICAgIGZvciAoY29uc3QgYnVmIGluIHBhcnNlZEJ1ZmZlcnMpIHtcclxuICAgICAgICBjb25zdCBwYXJzZWRCdWZmZXIgPSBwYXJzZWRCdWZmZXJzW2J1Zl07XHJcbiAgICAgICAgZ2x0ZlJ1bnRpbWUuYnVmZmVyc1tidWZdID0gcGFyc2VkQnVmZmVyO1xyXG4gICAgICAgIGdsdGZSdW50aW1lLmJ1ZmZlcnNDb3VudCsrO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgcGFyc2VTaGFkZXJzID0gKHBhcnNlZFNoYWRlcnM6IGFueSwgZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSkgPT4ge1xyXG4gICAgZm9yIChjb25zdCBzaGEgaW4gcGFyc2VkU2hhZGVycykge1xyXG4gICAgICAgIGNvbnN0IHBhcnNlZFNoYWRlciA9IHBhcnNlZFNoYWRlcnNbc2hhXTtcclxuICAgICAgICBnbHRmUnVudGltZS5zaGFkZXJzW3NoYV0gPSBwYXJzZWRTaGFkZXI7XHJcbiAgICAgICAgZ2x0ZlJ1bnRpbWUuc2hhZGVyc2NvdW50Kys7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZU9iamVjdCA9IChwYXJzZWRPYmplY3RzOiBhbnksIHJ1bnRpbWVQcm9wZXJ0eTogc3RyaW5nLCBnbHRmUnVudGltZTogSUdMVEZSdW50aW1lKSA9PiB7XHJcbiAgICBmb3IgKGNvbnN0IG9iamVjdCBpbiBwYXJzZWRPYmplY3RzKSB7XHJcbiAgICAgICAgY29uc3QgcGFyc2VkT2JqZWN0ID0gcGFyc2VkT2JqZWN0c1tvYmplY3RdO1xyXG4gICAgICAgICg8YW55PmdsdGZSdW50aW1lKVtydW50aW1lUHJvcGVydHldW29iamVjdF0gPSBwYXJzZWRPYmplY3Q7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogVXRpbHNcclxuICogQHBhcmFtIGJ1ZmZlclxyXG4gKi9cclxuY29uc3Qgbm9ybWFsaXplVVZzID0gKGJ1ZmZlcjogYW55KSA9PiB7XHJcbiAgICBpZiAoIWJ1ZmZlcikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlci5sZW5ndGggLyAyOyBpKyspIHtcclxuICAgICAgICBidWZmZXJbaSAqIDIgKyAxXSA9IDEuMCAtIGJ1ZmZlcltpICogMiArIDFdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgZ2V0QXR0cmlidXRlID0gKGF0dHJpYnV0ZVBhcmFtZXRlcjogSUdMVEZUZWNobmlxdWVQYXJhbWV0ZXIpOiBOdWxsYWJsZTxzdHJpbmc+ID0+IHtcclxuICAgIGlmIChhdHRyaWJ1dGVQYXJhbWV0ZXIuc2VtYW50aWMgPT09IFwiTk9STUFMXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJub3JtYWxcIjtcclxuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlUGFyYW1ldGVyLnNlbWFudGljID09PSBcIlBPU0lUSU9OXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJwb3NpdGlvblwiO1xyXG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVQYXJhbWV0ZXIuc2VtYW50aWMgPT09IFwiSk9JTlRcIikge1xyXG4gICAgICAgIHJldHVybiBcIm1hdHJpY2VzSW5kaWNlc1wiO1xyXG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVQYXJhbWV0ZXIuc2VtYW50aWMgPT09IFwiV0VJR0hUXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJtYXRyaWNlc1dlaWdodHNcIjtcclxuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlUGFyYW1ldGVyLnNlbWFudGljID09PSBcIkNPTE9SXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJjb2xvclwiO1xyXG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGVQYXJhbWV0ZXIuc2VtYW50aWMgJiYgYXR0cmlidXRlUGFyYW1ldGVyLnNlbWFudGljLmluZGV4T2YoXCJURVhDT09SRF9cIikgIT09IC0xKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IE51bWJlcihhdHRyaWJ1dGVQYXJhbWV0ZXIuc2VtYW50aWMuc3BsaXQoXCJfXCIpWzFdKTtcclxuICAgICAgICByZXR1cm4gXCJ1dlwiICsgKGNoYW5uZWwgPT09IDAgPyBcIlwiIDogY2hhbm5lbCArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvYWRzIGFuZCBjcmVhdGVzIGFuaW1hdGlvbnNcclxuICogQHBhcmFtIGdsdGZSdW50aW1lXHJcbiAqL1xyXG5jb25zdCBsb2FkQW5pbWF0aW9ucyA9IChnbHRmUnVudGltZTogSUdMVEZSdW50aW1lKSA9PiB7XHJcbiAgICBmb3IgKGNvbnN0IGFuaW0gaW4gZ2x0ZlJ1bnRpbWUuYW5pbWF0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IGFuaW1hdGlvbjogSUdMVEZBbmltYXRpb24gPSBnbHRmUnVudGltZS5hbmltYXRpb25zW2FuaW1dO1xyXG5cclxuICAgICAgICBpZiAoIWFuaW1hdGlvbi5jaGFubmVscyB8fCAhYW5pbWF0aW9uLnNhbXBsZXJzKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxhc3RBbmltYXRpb246IE51bGxhYmxlPEFuaW1hdGlvbj4gPSBudWxsO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFuaW1hdGlvbi5jaGFubmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBHZXQgcGFyYW1ldGVycyBhbmQgbG9hZCBidWZmZXJzXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSBhbmltYXRpb24uY2hhbm5lbHNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IHNhbXBsZXI6IElHTFRGQW5pbWF0aW9uU2FtcGxlciA9IGFuaW1hdGlvbi5zYW1wbGVyc1tjaGFubmVsLnNhbXBsZXJdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzYW1wbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGlucHV0RGF0YTogTnVsbGFibGU8c3RyaW5nPiA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBvdXRwdXREYXRhOiBOdWxsYWJsZTxzdHJpbmc+ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChhbmltYXRpb24ucGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhID0gYW5pbWF0aW9uLnBhcmFtZXRlcnNbc2FtcGxlci5pbnB1dF07XHJcbiAgICAgICAgICAgICAgICBvdXRwdXREYXRhID0gYW5pbWF0aW9uLnBhcmFtZXRlcnNbc2FtcGxlci5vdXRwdXRdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5wdXREYXRhID0gc2FtcGxlci5pbnB1dDtcclxuICAgICAgICAgICAgICAgIG91dHB1dERhdGEgPSBzYW1wbGVyLm91dHB1dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYnVmZmVySW5wdXQgPSBHTFRGVXRpbHMuR2V0QnVmZmVyRnJvbUFjY2Vzc29yKGdsdGZSdW50aW1lLCBnbHRmUnVudGltZS5hY2Nlc3NvcnNbaW5wdXREYXRhXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlck91dHB1dCA9IEdMVEZVdGlscy5HZXRCdWZmZXJGcm9tQWNjZXNzb3IoZ2x0ZlJ1bnRpbWUsIGdsdGZSdW50aW1lLmFjY2Vzc29yc1tvdXRwdXREYXRhXSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRJZCA9IGNoYW5uZWwudGFyZ2V0LmlkO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0Tm9kZTogYW55ID0gZ2x0ZlJ1bnRpbWUuc2NlbmUuZ2V0Tm9kZUJ5SWQodGFyZ2V0SWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldE5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldE5vZGUgPSBnbHRmUnVudGltZS5zY2VuZS5nZXROb2RlQnlOYW1lKHRhcmdldElkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldE5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oXCJDcmVhdGluZyBhbmltYXRpb24gbmFtZWQgXCIgKyBhbmltICsgXCIuIEJ1dCBjYW5ub3QgZmluZCBub2RlIG5hbWVkIFwiICsgdGFyZ2V0SWQgKyBcIiB0byBhdHRhY2ggdG9cIik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgaXNCb25lID0gdGFyZ2V0Tm9kZSBpbnN0YW5jZW9mIEJvbmU7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGFyZ2V0IHBhdGggKHBvc2l0aW9uLCByb3RhdGlvbiBvciBzY2FsaW5nKVxyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0UGF0aCA9IGNoYW5uZWwudGFyZ2V0LnBhdGg7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldFBhdGhJbmRleCA9IGdsVEZBbmltYXRpb25QYXRocy5pbmRleE9mKHRhcmdldFBhdGgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRhcmdldFBhdGhJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFBhdGggPSBiYWJ5bG9uQW5pbWF0aW9uUGF0aHNbdGFyZ2V0UGF0aEluZGV4XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGFuaW1hdGlvbiB0eXBlXHJcbiAgICAgICAgICAgIGxldCBhbmltYXRpb25UeXBlID0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfTUFUUklYO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc0JvbmUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRQYXRoID09PSBcInJvdGF0aW9uUXVhdGVybmlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uVHlwZSA9IEFuaW1hdGlvbi5BTklNQVRJT05UWVBFX1FVQVRFUk5JT047XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Tm9kZS5yb3RhdGlvblF1YXRlcm5pb24gPSBuZXcgUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25UeXBlID0gQW5pbWF0aW9uLkFOSU1BVElPTlRZUEVfVkVDVE9SMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuaW1hdGlvbiBhbmQga2V5IGZyYW1lc1xyXG4gICAgICAgICAgICBsZXQgYmFieWxvbkFuaW1hdGlvbjogTnVsbGFibGU8QW5pbWF0aW9uPiA9IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGFycmF5T2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgbGV0IG1vZGlmeUtleSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzQm9uZSAmJiBsYXN0QW5pbWF0aW9uICYmIGxhc3RBbmltYXRpb24uZ2V0S2V5cygpLmxlbmd0aCA9PT0gYnVmZmVySW5wdXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uQW5pbWF0aW9uID0gbGFzdEFuaW1hdGlvbjtcclxuICAgICAgICAgICAgICAgIG1vZGlmeUtleSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghbW9kaWZ5S2V5KSB7XHJcbiAgICAgICAgICAgICAgICBnbHRmUnVudGltZS5zY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gISFnbHRmUnVudGltZS5hc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIGJhYnlsb25BbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uKGFuaW0sIGlzQm9uZSA/IFwiX21hdHJpeFwiIDogdGFyZ2V0UGF0aCwgMSwgYW5pbWF0aW9uVHlwZSwgQW5pbWF0aW9uLkFOSU1BVElPTkxPT1BNT0RFX0NZQ0xFKTtcclxuICAgICAgICAgICAgICAgIGdsdGZSdW50aW1lLnNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRm9yIGVhY2ggZnJhbWVcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBidWZmZXJJbnB1dC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRQYXRoID09PSBcInJvdGF0aW9uUXVhdGVybmlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVkVDNFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gUXVhdGVybmlvbi5Gcm9tQXJyYXkoW2J1ZmZlck91dHB1dFthcnJheU9mZnNldF0sIGJ1ZmZlck91dHB1dFthcnJheU9mZnNldCArIDFdLCBidWZmZXJPdXRwdXRbYXJyYXlPZmZzZXQgKyAyXSwgYnVmZmVyT3V0cHV0W2FycmF5T2Zmc2V0ICsgM11dKTtcclxuICAgICAgICAgICAgICAgICAgICBhcnJheU9mZnNldCArPSA0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQb3NpdGlvbiBhbmQgc2NhbGluZyBhcmUgVkVDM1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gVmVjdG9yMy5Gcm9tQXJyYXkoW2J1ZmZlck91dHB1dFthcnJheU9mZnNldF0sIGJ1ZmZlck91dHB1dFthcnJheU9mZnNldCArIDFdLCBidWZmZXJPdXRwdXRbYXJyYXlPZmZzZXQgKyAyXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5T2Zmc2V0ICs9IDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzQm9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvbmUgPSA8Qm9uZT50YXJnZXROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGlvbiA9IFZlY3RvcjMuWmVybygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3RhdGlvblF1YXRlcm5pb24gPSBuZXcgUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsaW5nID0gVmVjdG9yMy5aZXJvKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdhcm5pbmcgb24gZGVjb21wb3NlXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdCA9IGJvbmUuZ2V0QmFzZU1hdHJpeCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9kaWZ5S2V5ICYmIGxhc3RBbmltYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0ID0gbGFzdEFuaW1hdGlvbi5nZXRLZXlzKClbal0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXQuZGVjb21wb3NlKHNjYWxpbmcsIHJvdGF0aW9uUXVhdGVybmlvbiwgdHJhbnNsYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0UGF0aCA9PT0gXCJwb3NpdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXRQYXRoID09PSBcInJvdGF0aW9uUXVhdGVybmlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uUXVhdGVybmlvbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxpbmcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gTWF0cml4LkNvbXBvc2Uoc2NhbGluZywgcm90YXRpb25RdWF0ZXJuaW9uLCB0cmFuc2xhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFtb2RpZnlLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZTogYnVmZmVySW5wdXRbal0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdEFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RBbmltYXRpb24uZ2V0S2V5cygpW2pdLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEZpbmlzaFxyXG4gICAgICAgICAgICBpZiAoIW1vZGlmeUtleSAmJiBiYWJ5bG9uQW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uQW5pbWF0aW9uLnNldEtleXMoa2V5cyk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXROb2RlLmFuaW1hdGlvbnMucHVzaChiYWJ5bG9uQW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGFzdEFuaW1hdGlvbiA9IGJhYnlsb25BbmltYXRpb247XHJcblxyXG4gICAgICAgICAgICBnbHRmUnVudGltZS5zY2VuZS5zdG9wQW5pbWF0aW9uKHRhcmdldE5vZGUpO1xyXG4gICAgICAgICAgICBnbHRmUnVudGltZS5zY2VuZS5iZWdpbkFuaW1hdGlvbih0YXJnZXROb2RlLCAwLCBidWZmZXJJbnB1dFtidWZmZXJJbnB1dC5sZW5ndGggLSAxXSwgdHJ1ZSwgMS4wKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQHJldHVybnMgdGhlIGJvbmVzIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxyXG4gKiBAcGFyYW0gbm9kZVxyXG4gKi9cclxuY29uc3QgY29uZmlndXJlQm9uZVRyYW5zZm9ybWF0aW9uID0gKG5vZGU6IElHTFRGTm9kZSk6IE1hdHJpeCA9PiB7XHJcbiAgICBsZXQgbWF0OiBOdWxsYWJsZTxNYXRyaXg+ID0gbnVsbDtcclxuXHJcbiAgICBpZiAobm9kZS50cmFuc2xhdGlvbiB8fCBub2RlLnJvdGF0aW9uIHx8IG5vZGUuc2NhbGUpIHtcclxuICAgICAgICBjb25zdCBzY2FsZSA9IFZlY3RvcjMuRnJvbUFycmF5KG5vZGUuc2NhbGUgfHwgWzEsIDEsIDFdKTtcclxuICAgICAgICBjb25zdCByb3RhdGlvbiA9IFF1YXRlcm5pb24uRnJvbUFycmF5KG5vZGUucm90YXRpb24gfHwgWzAsIDAsIDAsIDFdKTtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IFZlY3RvcjMuRnJvbUFycmF5KG5vZGUudHJhbnNsYXRpb24gfHwgWzAsIDAsIDBdKTtcclxuXHJcbiAgICAgICAgbWF0ID0gTWF0cml4LkNvbXBvc2Uoc2NhbGUsIHJvdGF0aW9uLCBwb3NpdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1hdCA9IE1hdHJpeC5Gcm9tQXJyYXkobm9kZS5tYXRyaXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgcGFyZW50IGJvbmVcclxuICogQHBhcmFtIGdsdGZSdW50aW1lXHJcbiAqIEBwYXJhbSBza2luc1xyXG4gKiBAcGFyYW0gam9pbnROYW1lXHJcbiAqIEBwYXJhbSBuZXdTa2VsZXRvblxyXG4gKiBAcmV0dXJucyB0aGUgcGFyZW50IGJvbmVcclxuICovXHJcbmNvbnN0IGdldFBhcmVudEJvbmUgPSAoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSwgc2tpbnM6IElHTFRGU2tpbnMsIGpvaW50TmFtZTogc3RyaW5nLCBuZXdTa2VsZXRvbjogU2tlbGV0b24pOiBOdWxsYWJsZTxCb25lPiA9PiB7XHJcbiAgICAvLyBUcnkgdG8gZmluZFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdTa2VsZXRvbi5ib25lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChuZXdTa2VsZXRvbi5ib25lc1tpXS5uYW1lID09PSBqb2ludE5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1NrZWxldG9uLmJvbmVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBOb3QgZm91bmQsIHNlYXJjaCBpbiBnbHRmIG5vZGVzXHJcbiAgICBjb25zdCBub2RlcyA9IGdsdGZSdW50aW1lLm5vZGVzO1xyXG4gICAgZm9yIChjb25zdCBuZGUgaW4gbm9kZXMpIHtcclxuICAgICAgICBjb25zdCBub2RlOiBJR0xURk5vZGUgPSBub2Rlc1tuZGVdO1xyXG5cclxuICAgICAgICBpZiAoIW5vZGUuam9pbnROYW1lKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQ6IElHTFRGTm9kZSA9IGdsdGZSdW50aW1lLm5vZGVzW2NoaWxkcmVuW2ldXTtcclxuICAgICAgICAgICAgaWYgKCFjaGlsZC5qb2ludE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hpbGQuam9pbnROYW1lID09PSBqb2ludE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdCA9IGNvbmZpZ3VyZUJvbmVUcmFuc2Zvcm1hdGlvbihub2RlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJvbmUgPSBuZXcgQm9uZShub2RlLm5hbWUgfHwgXCJcIiwgbmV3U2tlbGV0b24sIGdldFBhcmVudEJvbmUoZ2x0ZlJ1bnRpbWUsIHNraW5zLCBub2RlLmpvaW50TmFtZSwgbmV3U2tlbGV0b24pLCBtYXQpO1xyXG4gICAgICAgICAgICAgICAgYm9uZS5pZCA9IG5kZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBib25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHJvb3Qgbm9kZVxyXG4gKiBAcGFyYW0gbm9kZXNUb1Jvb3RcclxuICogQHBhcmFtIGlkXHJcbiAqIEByZXR1cm5zIHRoZSByb290IG5vZGVcclxuICovXHJcbmNvbnN0IGdldE5vZGVUb1Jvb3QgPSAobm9kZXNUb1Jvb3Q6IElOb2RlVG9Sb290W10sIGlkOiBzdHJpbmcpOiBOdWxsYWJsZTxCb25lPiA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzVG9Sb290Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZVRvUm9vdCA9IG5vZGVzVG9Sb290W2ldO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5vZGVUb1Jvb3Qubm9kZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IG5vZGVUb1Jvb3Qubm9kZS5jaGlsZHJlbltqXTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVUb1Jvb3QuYm9uZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBub2RlIHdpdGggdGhlIGpvaW50IG5hbWVcclxuICogQHBhcmFtIGdsdGZSdW50aW1lXHJcbiAqIEBwYXJhbSBqb2ludE5hbWVcclxuICogQHJldHVybnMgdGhlIG5vZGUgd2l0aCB0aGUgam9pbnQgbmFtZVxyXG4gKi9cclxuY29uc3QgZ2V0Sm9pbnROb2RlID0gKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIGpvaW50TmFtZTogc3RyaW5nKTogTnVsbGFibGU8SUpvaW50Tm9kZT4gPT4ge1xyXG4gICAgY29uc3Qgbm9kZXMgPSBnbHRmUnVudGltZS5ub2RlcztcclxuICAgIGxldCBub2RlOiBJR0xURk5vZGUgPSBub2Rlc1tqb2ludE5hbWVdO1xyXG4gICAgaWYgKG5vZGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBub2RlOiBub2RlLFxyXG4gICAgICAgICAgICBpZDogam9pbnROYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBuZGUgaW4gbm9kZXMpIHtcclxuICAgICAgICBub2RlID0gbm9kZXNbbmRlXTtcclxuICAgICAgICBpZiAobm9kZS5qb2ludE5hbWUgPT09IGpvaW50TmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZTogbm9kZSxcclxuICAgICAgICAgICAgICAgIGlkOiBuZGUsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIG5vZGVzIGlzIGluIGpvaW50c1xyXG4gKiBAcGFyYW0gc2tpbnNcclxuICogQHBhcmFtIGlkXHJcbiAqIEByZXR1cm5zIHRydWUgaWYgdGhlIG5vZGUgaXMgaW4gam9pbnRzLCBlbHNlIGZhbHNlXHJcbiAqL1xyXG5jb25zdCBub2RlSXNJbkpvaW50cyA9IChza2luczogSUdMVEZTa2lucywgaWQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2lucy5qb2ludE5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHNraW5zLmpvaW50TmFtZXNbaV0gPT09IGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlsbHMgdGhlIG5vZGVzIHRvIHJvb3QgZm9yIGJvbmVzIGFuZCBidWlsZHMgaGllcmFyY2h5XHJcbiAqIEBwYXJhbSBnbHRmUnVudGltZVxyXG4gKiBAcGFyYW0gbmV3U2tlbGV0b25cclxuICogQHBhcmFtIHNraW5zXHJcbiAqIEBwYXJhbSBub2Rlc1RvUm9vdFxyXG4gKi9cclxuY29uc3QgZ2V0Tm9kZXNUb1Jvb3QgPSAoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSwgbmV3U2tlbGV0b246IFNrZWxldG9uLCBza2luczogSUdMVEZTa2lucywgbm9kZXNUb1Jvb3Q6IElOb2RlVG9Sb290W10pID0+IHtcclxuICAgIC8vIENyZWF0ZXMgbm9kZXMgZm9yIHJvb3RcclxuICAgIGZvciAoY29uc3QgbmRlIGluIGdsdGZSdW50aW1lLm5vZGVzKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZTogSUdMVEZOb2RlID0gZ2x0ZlJ1bnRpbWUubm9kZXNbbmRlXTtcclxuICAgICAgICBjb25zdCBpZCA9IG5kZTtcclxuXHJcbiAgICAgICAgaWYgKCFub2RlLmpvaW50TmFtZSB8fCBub2RlSXNJbkpvaW50cyhza2lucywgbm9kZS5qb2ludE5hbWUpKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIG5vZGUgdG8gcm9vdCBib25lXHJcbiAgICAgICAgY29uc3QgbWF0ID0gY29uZmlndXJlQm9uZVRyYW5zZm9ybWF0aW9uKG5vZGUpO1xyXG4gICAgICAgIGNvbnN0IGJvbmUgPSBuZXcgQm9uZShub2RlLm5hbWUgfHwgXCJcIiwgbmV3U2tlbGV0b24sIG51bGwsIG1hdCk7XHJcbiAgICAgICAgYm9uZS5pZCA9IGlkO1xyXG4gICAgICAgIG5vZGVzVG9Sb290LnB1c2goeyBib25lOiBib25lLCBub2RlOiBub2RlLCBpZDogaWQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGFyZW50aW5nXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzVG9Sb290Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZVRvUm9vdCA9IG5vZGVzVG9Sb290W2ldO1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZVRvUm9vdC5ub2RlLmNoaWxkcmVuO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZDogTnVsbGFibGU8SU5vZGVUb1Jvb3Q+ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgbm9kZXNUb1Jvb3QubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChub2Rlc1RvUm9vdFtrXS5pZCA9PT0gY2hpbGRyZW5bal0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IG5vZGVzVG9Sb290W2tdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICg8YW55PmNoaWxkLmJvbmUpLl9wYXJlbnQgPSBub2RlVG9Sb290LmJvbmU7XHJcbiAgICAgICAgICAgICAgICBub2RlVG9Sb290LmJvbmUuY2hpbGRyZW4ucHVzaChjaGlsZC5ib25lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbXBvcnRzIGEgc2tlbGV0b25cclxuICogQHBhcmFtIGdsdGZSdW50aW1lXHJcbiAqIEBwYXJhbSBza2luc1xyXG4gKiBAcGFyYW0gbWVzaFxyXG4gKiBAcGFyYW0gbmV3U2tlbGV0b25cclxuICogQHJldHVybnMgdGhlIGJvbmUgbmFtZVxyXG4gKi9cclxuY29uc3QgaW1wb3J0U2tlbGV0b24gPSAoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSwgc2tpbnM6IElHTFRGU2tpbnMsIG1lc2g6IE1lc2gsIG5ld1NrZWxldG9uOiBTa2VsZXRvbiB8IHVuZGVmaW5lZCk6IFNrZWxldG9uID0+IHtcclxuICAgIGlmICghbmV3U2tlbGV0b24pIHtcclxuICAgICAgICBuZXdTa2VsZXRvbiA9IG5ldyBTa2VsZXRvbihza2lucy5uYW1lIHx8IFwiXCIsIFwiXCIsIGdsdGZSdW50aW1lLnNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXNraW5zLmJhYnlsb25Ta2VsZXRvbikge1xyXG4gICAgICAgIHJldHVybiBuZXdTa2VsZXRvbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGaW5kIHRoZSByb290IGJvbmVzXHJcbiAgICBjb25zdCBub2Rlc1RvUm9vdDogSU5vZGVUb1Jvb3RbXSA9IFtdO1xyXG4gICAgY29uc3Qgbm9kZXNUb1Jvb3RUb0FkZDogQm9uZVtdID0gW107XHJcblxyXG4gICAgZ2V0Tm9kZXNUb1Jvb3QoZ2x0ZlJ1bnRpbWUsIG5ld1NrZWxldG9uLCBza2lucywgbm9kZXNUb1Jvb3QpO1xyXG4gICAgbmV3U2tlbGV0b24uYm9uZXMgPSBbXTtcclxuXHJcbiAgICAvLyBKb2ludHNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbnMuam9pbnROYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGpvaW50Tm9kZSA9IGdldEpvaW50Tm9kZShnbHRmUnVudGltZSwgc2tpbnMuam9pbnROYW1lc1tpXSk7XHJcblxyXG4gICAgICAgIGlmICgham9pbnROb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IGpvaW50Tm9kZS5ub2RlO1xyXG5cclxuICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgVG9vbHMuV2FybihcIkpvaW50IG5hbWVkIFwiICsgc2tpbnMuam9pbnROYW1lc1tpXSArIFwiIGRvZXMgbm90IGV4aXN0XCIpO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlkID0gam9pbnROb2RlLmlkO1xyXG5cclxuICAgICAgICAvLyBPcHRpbWl6ZSwgaWYgdGhlIGJvbmUgYWxyZWFkeSBleGlzdHMuLi5cclxuICAgICAgICBjb25zdCBleGlzdGluZ0JvbmUgPSBnbHRmUnVudGltZS5zY2VuZS5nZXRCb25lQnlJZChpZCk7XHJcbiAgICAgICAgaWYgKGV4aXN0aW5nQm9uZSkge1xyXG4gICAgICAgICAgICBuZXdTa2VsZXRvbi5ib25lcy5wdXNoKGV4aXN0aW5nQm9uZSk7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2VhcmNoIGZvciBwYXJlbnQgYm9uZVxyXG4gICAgICAgIGxldCBmb3VuZEJvbmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgcGFyZW50Qm9uZTogTnVsbGFibGU8Qm9uZT4gPSBudWxsO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGk7IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBqb2ludE5vZGUgPSBnZXRKb2ludE5vZGUoZ2x0ZlJ1bnRpbWUsIHNraW5zLmpvaW50TmFtZXNbal0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFqb2ludE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBqb2ludDogSUdMVEZOb2RlID0gam9pbnROb2RlLm5vZGU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWpvaW50KSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5XYXJuKFwiSm9pbnQgbmFtZWQgXCIgKyBza2lucy5qb2ludE5hbWVzW2pdICsgXCIgZG9lcyBub3QgZXhpc3Qgd2hlbiBsb29raW5nIGZvciBwYXJlbnRcIik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBqb2ludC5jaGlsZHJlbjtcclxuICAgICAgICAgICAgaWYgKCFjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm91bmRCb25lID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGNoaWxkcmVuLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5ba10gPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Qm9uZSA9IGdldFBhcmVudEJvbmUoZ2x0ZlJ1bnRpbWUsIHNraW5zLCBza2lucy5qb2ludE5hbWVzW2pdLCBuZXdTa2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRCb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGZvdW5kQm9uZSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBib25lXHJcbiAgICAgICAgY29uc3QgbWF0ID0gY29uZmlndXJlQm9uZVRyYW5zZm9ybWF0aW9uKG5vZGUpO1xyXG5cclxuICAgICAgICBpZiAoIXBhcmVudEJvbmUgJiYgbm9kZXNUb1Jvb3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBwYXJlbnRCb25lID0gZ2V0Tm9kZVRvUm9vdChub2Rlc1RvUm9vdCwgaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmVudEJvbmUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChub2Rlc1RvUm9vdFRvQWRkLmluZGV4T2YocGFyZW50Qm9uZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZXNUb1Jvb3RUb0FkZC5wdXNoKHBhcmVudEJvbmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBib25lID0gbmV3IEJvbmUobm9kZS5qb2ludE5hbWUgfHwgXCJcIiwgbmV3U2tlbGV0b24sIHBhcmVudEJvbmUsIG1hdCk7XHJcbiAgICAgICAgYm9uZS5pZCA9IGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBvbGlzaFxyXG4gICAgY29uc3QgYm9uZXMgPSBuZXdTa2VsZXRvbi5ib25lcztcclxuICAgIG5ld1NrZWxldG9uLmJvbmVzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2lucy5qb2ludE5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgam9pbnROb2RlID0gZ2V0Sm9pbnROb2RlKGdsdGZSdW50aW1lLCBza2lucy5qb2ludE5hbWVzW2ldKTtcclxuXHJcbiAgICAgICAgaWYgKCFqb2ludE5vZGUpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvbmVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChib25lc1tqXS5pZCA9PT0gam9pbnROb2RlLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTa2VsZXRvbi5ib25lcy5wdXNoKGJvbmVzW2pdKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5ld1NrZWxldG9uLnByZXBhcmUoKTtcclxuXHJcbiAgICAvLyBGaW5pc2hcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXNUb1Jvb3RUb0FkZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG5ld1NrZWxldG9uLmJvbmVzLnB1c2gobm9kZXNUb1Jvb3RUb0FkZFtpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ld1NrZWxldG9uO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEltcG9ydHMgYSBtZXNoIGFuZCBpdHMgZ2VvbWV0cmllc1xyXG4gKiBAcGFyYW0gZ2x0ZlJ1bnRpbWVcclxuICogQHBhcmFtIG5vZGVcclxuICogQHBhcmFtIG1lc2hlc1xyXG4gKiBAcGFyYW0gaWRcclxuICogQHBhcmFtIG5ld01lc2hcclxuICogQHJldHVybnMgdGhlIG5ldyBtZXNoXHJcbiAqL1xyXG5jb25zdCBpbXBvcnRNZXNoID0gKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIG5vZGU6IElHTFRGTm9kZSwgbWVzaGVzOiBzdHJpbmdbXSwgaWQ6IHN0cmluZywgbmV3TWVzaDogTWVzaCk6IE1lc2ggPT4ge1xyXG4gICAgaWYgKCFuZXdNZXNoKSB7XHJcbiAgICAgICAgZ2x0ZlJ1bnRpbWUuc2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhZ2x0ZlJ1bnRpbWUuYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgbmV3TWVzaCA9IG5ldyBNZXNoKG5vZGUubmFtZSB8fCBcIlwiLCBnbHRmUnVudGltZS5zY2VuZSk7XHJcbiAgICAgICAgbmV3TWVzaC5fcGFyZW50Q29udGFpbmVyID0gZ2x0ZlJ1bnRpbWUuYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgZ2x0ZlJ1bnRpbWUuc2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIG5ld01lc2guaWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW5vZGUuYmFieWxvbk5vZGUpIHtcclxuICAgICAgICByZXR1cm4gbmV3TWVzaDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdWJNYXRlcmlhbHM6IE1hdGVyaWFsW10gPSBbXTtcclxuXHJcbiAgICBsZXQgdmVydGV4RGF0YTogTnVsbGFibGU8VmVydGV4RGF0YT4gPSBudWxsO1xyXG4gICAgY29uc3QgdmVydGljZXNTdGFydHM6IG51bWJlcltdID0gW107XHJcbiAgICBjb25zdCB2ZXJ0aWNlc0NvdW50czogbnVtYmVyW10gPSBbXTtcclxuICAgIGNvbnN0IGluZGV4U3RhcnRzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgY29uc3QgaW5kZXhDb3VudHM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgbWVzaEluZGV4ID0gMDsgbWVzaEluZGV4IDwgbWVzaGVzLmxlbmd0aDsgbWVzaEluZGV4KyspIHtcclxuICAgICAgICBjb25zdCBtZXNoSWQgPSBtZXNoZXNbbWVzaEluZGV4XTtcclxuICAgICAgICBjb25zdCBtZXNoOiBJR0xURk1lc2ggPSBnbHRmUnVudGltZS5tZXNoZXNbbWVzaElkXTtcclxuXHJcbiAgICAgICAgaWYgKCFtZXNoKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUG9zaXRpb25zLCBub3JtYWxzIGFuZCBVVnNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lc2gucHJpbWl0aXZlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBUZW1wb3JhcnkgdmVydGV4IGRhdGFcclxuICAgICAgICAgICAgY29uc3QgdGVtcFZlcnRleERhdGEgPSBuZXcgVmVydGV4RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcHJpbWl0aXZlID0gbWVzaC5wcmltaXRpdmVzW2ldO1xyXG4gICAgICAgICAgICBpZiAocHJpbWl0aXZlLm1vZGUgIT09IDQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVzID0gcHJpbWl0aXZlLmF0dHJpYnV0ZXM7XHJcbiAgICAgICAgICAgIGxldCBhY2Nlc3NvcjogTnVsbGFibGU8SUdMVEZBY2Nlc3Nvcj4gPSBudWxsO1xyXG4gICAgICAgICAgICBsZXQgYnVmZmVyOiBhbnkgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHBvc2l0aW9ucywgbm9ybWFsIGFuZCB1dnNcclxuICAgICAgICAgICAgZm9yIChjb25zdCBzZW1hbnRpYyBpbiBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBMaW5rIGFjY2Vzc29yIGFuZCBidWZmZXIgdmlld1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzb3IgPSBnbHRmUnVudGltZS5hY2Nlc3NvcnNbYXR0cmlidXRlc1tzZW1hbnRpY11dO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gR0xURlV0aWxzLkdldEJ1ZmZlckZyb21BY2Nlc3NvcihnbHRmUnVudGltZSwgYWNjZXNzb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZW1hbnRpYyA9PT0gXCJOT1JNQUxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBWZXJ0ZXhEYXRhLm5vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICg8RmxvYXQzMkFycmF5PnRlbXBWZXJ0ZXhEYXRhLm5vcm1hbHMpLnNldChidWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzZW1hbnRpYyA9PT0gXCJQT1NJVElPTlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEdMVEZGaWxlTG9hZGVyLkhvbW9nZW5lb3VzQ29vcmRpbmF0ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFZlcnRleERhdGEucG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShidWZmZXIubGVuZ3RoIC0gYnVmZmVyLmxlbmd0aCAvIDQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBidWZmZXIubGVuZ3RoOyBqICs9IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBWZXJ0ZXhEYXRhLnBvc2l0aW9uc1tqXSA9IGJ1ZmZlcltqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBWZXJ0ZXhEYXRhLnBvc2l0aW9uc1tqICsgMV0gPSBidWZmZXJbaiArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFZlcnRleERhdGEucG9zaXRpb25zW2ogKyAyXSA9IGJ1ZmZlcltqICsgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wVmVydGV4RGF0YS5wb3NpdGlvbnMgPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoPEZsb2F0MzJBcnJheT50ZW1wVmVydGV4RGF0YS5wb3NpdGlvbnMpLnNldChidWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGljZXNDb3VudHMucHVzaCh0ZW1wVmVydGV4RGF0YS5wb3NpdGlvbnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VtYW50aWMuaW5kZXhPZihcIlRFWENPT1JEX1wiKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGFubmVsID0gTnVtYmVyKHNlbWFudGljLnNwbGl0KFwiX1wiKVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXZLaW5kID0gVmVydGV4QnVmZmVyLlVWS2luZCArIChjaGFubmVsID09PSAwID8gXCJcIiA6IGNoYW5uZWwgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1dnMgPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICg8RmxvYXQzMkFycmF5PnV2cykuc2V0KGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplVVZzKHV2cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcFZlcnRleERhdGEuc2V0KHV2cywgdXZLaW5kKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VtYW50aWMgPT09IFwiSk9JTlRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBWZXJ0ZXhEYXRhLm1hdHJpY2VzSW5kaWNlcyA9IG5ldyBGbG9hdDMyQXJyYXkoYnVmZmVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxGbG9hdDMyQXJyYXk+dGVtcFZlcnRleERhdGEubWF0cmljZXNJbmRpY2VzKS5zZXQoYnVmZmVyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VtYW50aWMgPT09IFwiV0VJR0hUXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wVmVydGV4RGF0YS5tYXRyaWNlc1dlaWdodHMgPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICg8RmxvYXQzMkFycmF5PnRlbXBWZXJ0ZXhEYXRhLm1hdHJpY2VzV2VpZ2h0cykuc2V0KGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbWFudGljID09PSBcIkNPTE9SXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wVmVydGV4RGF0YS5jb2xvcnMgPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICg8RmxvYXQzMkFycmF5PnRlbXBWZXJ0ZXhEYXRhLmNvbG9ycykuc2V0KGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluZGljZXNcclxuICAgICAgICAgICAgYWNjZXNzb3IgPSBnbHRmUnVudGltZS5hY2Nlc3NvcnNbcHJpbWl0aXZlLmluZGljZXNdO1xyXG4gICAgICAgICAgICBpZiAoYWNjZXNzb3IpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IEdMVEZVdGlscy5HZXRCdWZmZXJGcm9tQWNjZXNzb3IoZ2x0ZlJ1bnRpbWUsIGFjY2Vzc29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wVmVydGV4RGF0YS5pbmRpY2VzID0gbmV3IEludDMyQXJyYXkoYnVmZmVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wVmVydGV4RGF0YS5pbmRpY2VzLnNldChidWZmZXIpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXhDb3VudHMucHVzaCh0ZW1wVmVydGV4RGF0YS5pbmRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgaW5kaWNlcyBvbiB0aGUgZmx5XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAoPEZsb2F0QXJyYXk+dGVtcFZlcnRleERhdGEucG9zaXRpb25zKS5sZW5ndGggLyAzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRpY2VzLnB1c2goaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcFZlcnRleERhdGEuaW5kaWNlcyA9IG5ldyBJbnQzMkFycmF5KGluZGljZXMpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXhDb3VudHMucHVzaCh0ZW1wVmVydGV4RGF0YS5pbmRpY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdmVydGV4RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmVydGV4RGF0YSA9IHRlbXBWZXJ0ZXhEYXRhO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmVydGV4RGF0YS5tZXJnZSh0ZW1wVmVydGV4RGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFN1YiBtYXRlcmlhbFxyXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbCA9IGdsdGZSdW50aW1lLnNjZW5lLmdldE1hdGVyaWFsQnlJZChwcmltaXRpdmUubWF0ZXJpYWwpO1xyXG5cclxuICAgICAgICAgICAgc3ViTWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwgPT09IG51bGwgPyBHTFRGVXRpbHMuR2V0RGVmYXVsdE1hdGVyaWFsKGdsdGZSdW50aW1lLnNjZW5lKSA6IG1hdGVyaWFsKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB2ZXJ0aWNlcyBzdGFydCBhbmQgaW5kZXggc3RhcnRcclxuICAgICAgICAgICAgdmVydGljZXNTdGFydHMucHVzaCh2ZXJ0aWNlc1N0YXJ0cy5sZW5ndGggPT09IDAgPyAwIDogdmVydGljZXNTdGFydHNbdmVydGljZXNTdGFydHMubGVuZ3RoIC0gMV0gKyB2ZXJ0aWNlc0NvdW50c1t2ZXJ0aWNlc0NvdW50cy5sZW5ndGggLSAyXSk7XHJcbiAgICAgICAgICAgIGluZGV4U3RhcnRzLnB1c2goaW5kZXhTdGFydHMubGVuZ3RoID09PSAwID8gMCA6IGluZGV4U3RhcnRzW2luZGV4U3RhcnRzLmxlbmd0aCAtIDFdICsgaW5kZXhDb3VudHNbaW5kZXhDb3VudHMubGVuZ3RoIC0gMl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBtYXRlcmlhbDogU3RhbmRhcmRNYXRlcmlhbCB8IE11bHRpTWF0ZXJpYWw7XHJcbiAgICBnbHRmUnVudGltZS5zY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gISFnbHRmUnVudGltZS5hc3NldENvbnRhaW5lcjtcclxuICAgIGlmIChzdWJNYXRlcmlhbHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIG1hdGVyaWFsID0gbmV3IE11bHRpTWF0ZXJpYWwoXCJtdWx0aW1hdFwiICsgaWQsIGdsdGZSdW50aW1lLnNjZW5lKTtcclxuICAgICAgICAobWF0ZXJpYWwgYXMgTXVsdGlNYXRlcmlhbCkuc3ViTWF0ZXJpYWxzID0gc3ViTWF0ZXJpYWxzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtYXRlcmlhbCA9IG5ldyBTdGFuZGFyZE1hdGVyaWFsKFwibXVsdGltYXRcIiArIGlkLCBnbHRmUnVudGltZS5zY2VuZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN1Yk1hdGVyaWFscy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBtYXRlcmlhbCA9IHN1Yk1hdGVyaWFsc1swXSBhcyBTdGFuZGFyZE1hdGVyaWFsO1xyXG4gICAgfVxyXG5cclxuICAgIG1hdGVyaWFsLl9wYXJlbnRDb250YWluZXIgPSBnbHRmUnVudGltZS5hc3NldENvbnRhaW5lcjtcclxuXHJcbiAgICBpZiAoIW5ld01lc2gubWF0ZXJpYWwpIHtcclxuICAgICAgICBuZXdNZXNoLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXBwbHkgZ2VvbWV0cnlcclxuICAgIG5ldyBHZW9tZXRyeShpZCwgZ2x0ZlJ1bnRpbWUuc2NlbmUsIHZlcnRleERhdGEhLCBmYWxzZSwgbmV3TWVzaCk7XHJcbiAgICBuZXdNZXNoLmNvbXB1dGVXb3JsZE1hdHJpeCh0cnVlKTtcclxuXHJcbiAgICBnbHRmUnVudGltZS5zY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgLy8gQXBwbHkgc3VibWVzaGVzXHJcbiAgICBuZXdNZXNoLnN1Yk1lc2hlcyA9IFtdO1xyXG4gICAgbGV0IGluZGV4ID0gMDtcclxuICAgIGZvciAobGV0IG1lc2hJbmRleCA9IDA7IG1lc2hJbmRleCA8IG1lc2hlcy5sZW5ndGg7IG1lc2hJbmRleCsrKSB7XHJcbiAgICAgICAgY29uc3QgbWVzaElkID0gbWVzaGVzW21lc2hJbmRleF07XHJcbiAgICAgICAgY29uc3QgbWVzaDogSUdMVEZNZXNoID0gZ2x0ZlJ1bnRpbWUubWVzaGVzW21lc2hJZF07XHJcblxyXG4gICAgICAgIGlmICghbWVzaCkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzaC5wcmltaXRpdmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXNoLnByaW1pdGl2ZXNbaV0ubW9kZSAhPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgLy9jb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgU3ViTWVzaC5BZGRUb01lc2goaW5kZXgsIHZlcnRpY2VzU3RhcnRzW2luZGV4XSwgdmVydGljZXNDb3VudHNbaW5kZXhdLCBpbmRleFN0YXJ0c1tpbmRleF0sIGluZGV4Q291bnRzW2luZGV4XSwgbmV3TWVzaCwgbmV3TWVzaCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpbmlzaFxyXG4gICAgcmV0dXJuIG5ld01lc2g7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29uZmlndXJlIG5vZGUgdHJhbnNmb3JtYXRpb24gZnJvbSBwb3NpdGlvbiwgcm90YXRpb24gYW5kIHNjYWxpbmdcclxuICogQHBhcmFtIG5ld05vZGVcclxuICogQHBhcmFtIHBvc2l0aW9uXHJcbiAqIEBwYXJhbSByb3RhdGlvblxyXG4gKiBAcGFyYW0gc2NhbGluZ1xyXG4gKi9cclxuY29uc3QgY29uZmlndXJlTm9kZSA9IChuZXdOb2RlOiBhbnksIHBvc2l0aW9uOiBWZWN0b3IzLCByb3RhdGlvbjogUXVhdGVybmlvbiwgc2NhbGluZzogVmVjdG9yMykgPT4ge1xyXG4gICAgaWYgKG5ld05vZGUucG9zaXRpb24pIHtcclxuICAgICAgICBuZXdOb2RlLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld05vZGUucm90YXRpb25RdWF0ZXJuaW9uIHx8IG5ld05vZGUucm90YXRpb24pIHtcclxuICAgICAgICBuZXdOb2RlLnJvdGF0aW9uUXVhdGVybmlvbiA9IHJvdGF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdOb2RlLnNjYWxpbmcpIHtcclxuICAgICAgICBuZXdOb2RlLnNjYWxpbmcgPSBzY2FsaW5nO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbmZpZ3VyZXMgbm9kZSBmcm9tIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxyXG4gKiBAcGFyYW0gbmV3Tm9kZVxyXG4gKiBAcGFyYW0gbm9kZVxyXG4gKi9cclxuY29uc3QgY29uZmlndXJlTm9kZUZyb21NYXRyaXggPSAobmV3Tm9kZTogTWVzaCwgbm9kZTogSUdMVEZOb2RlKSA9PiB7XHJcbiAgICBpZiAobm9kZS5tYXRyaXgpIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IG5ldyBWZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgICAgIGNvbnN0IHJvdGF0aW9uID0gbmV3IFF1YXRlcm5pb24oKTtcclxuICAgICAgICBjb25zdCBzY2FsaW5nID0gbmV3IFZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgY29uc3QgbWF0ID0gTWF0cml4LkZyb21BcnJheShub2RlLm1hdHJpeCk7XHJcbiAgICAgICAgbWF0LmRlY29tcG9zZShzY2FsaW5nLCByb3RhdGlvbiwgcG9zaXRpb24pO1xyXG5cclxuICAgICAgICBjb25maWd1cmVOb2RlKG5ld05vZGUsIHBvc2l0aW9uLCByb3RhdGlvbiwgc2NhbGluZyk7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUudHJhbnNsYXRpb24gJiYgbm9kZS5yb3RhdGlvbiAmJiBub2RlLnNjYWxlKSB7XHJcbiAgICAgICAgY29uZmlndXJlTm9kZShuZXdOb2RlLCBWZWN0b3IzLkZyb21BcnJheShub2RlLnRyYW5zbGF0aW9uKSwgUXVhdGVybmlvbi5Gcm9tQXJyYXkobm9kZS5yb3RhdGlvbiksIFZlY3RvcjMuRnJvbUFycmF5KG5vZGUuc2NhbGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdOb2RlLmNvbXB1dGVXb3JsZE1hdHJpeCh0cnVlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbXBvcnRzIGEgbm9kZVxyXG4gKiBAcGFyYW0gZ2x0ZlJ1bnRpbWVcclxuICogQHBhcmFtIG5vZGVcclxuICogQHBhcmFtIGlkXHJcbiAqIEByZXR1cm5zIHRoZSBuZXdseSBpbXBvcnRlZCBub2RlXHJcbiAqL1xyXG5jb25zdCBpbXBvcnROb2RlID0gKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIG5vZGU6IElHTFRGTm9kZSwgaWQ6IHN0cmluZyk6IE51bGxhYmxlPE5vZGU+ID0+IHtcclxuICAgIGxldCBsYXN0Tm9kZTogTnVsbGFibGU8Tm9kZT4gPSBudWxsO1xyXG5cclxuICAgIGlmIChnbHRmUnVudGltZS5pbXBvcnRPbmx5TWVzaGVzICYmIChub2RlLnNraW4gfHwgbm9kZS5tZXNoZXMpKSB7XHJcbiAgICAgICAgaWYgKGdsdGZSdW50aW1lLmltcG9ydE1lc2hlc05hbWVzICYmIGdsdGZSdW50aW1lLmltcG9ydE1lc2hlc05hbWVzLmxlbmd0aCA+IDAgJiYgZ2x0ZlJ1bnRpbWUuaW1wb3J0TWVzaGVzTmFtZXMuaW5kZXhPZihub2RlLm5hbWUgfHwgXCJcIikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBNZXNoZXNcclxuICAgIGlmIChub2RlLnNraW4pIHtcclxuICAgICAgICBpZiAobm9kZS5tZXNoZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2tpbjogSUdMVEZTa2lucyA9IGdsdGZSdW50aW1lLnNraW5zW25vZGUuc2tpbl07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuZXdNZXNoID0gaW1wb3J0TWVzaChnbHRmUnVudGltZSwgbm9kZSwgbm9kZS5tZXNoZXMsIGlkLCA8TWVzaD5ub2RlLmJhYnlsb25Ob2RlKTtcclxuICAgICAgICAgICAgbmV3TWVzaC5za2VsZXRvbiA9IGdsdGZSdW50aW1lLnNjZW5lLmdldExhc3RTa2VsZXRvbkJ5SWQobm9kZS5za2luKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdNZXNoLnNrZWxldG9uID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdNZXNoLnNrZWxldG9uID0gaW1wb3J0U2tlbGV0b24oZ2x0ZlJ1bnRpbWUsIHNraW4sIG5ld01lc2gsIHNraW4uYmFieWxvblNrZWxldG9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNraW4uYmFieWxvblNrZWxldG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbi5iYWJ5bG9uU2tlbGV0b24gPSBuZXdNZXNoLnNrZWxldG9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsYXN0Tm9kZSA9IG5ld01lc2g7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChub2RlLm1lc2hlcykge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEltcHJvdmUgbWVzaGVzIHByb3BlcnR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3QgbmV3TWVzaCA9IGltcG9ydE1lc2goZ2x0ZlJ1bnRpbWUsIG5vZGUsIG5vZGUubWVzaCA/IFtub2RlLm1lc2hdIDogbm9kZS5tZXNoZXMsIGlkLCA8TWVzaD5ub2RlLmJhYnlsb25Ob2RlKTtcclxuICAgICAgICBsYXN0Tm9kZSA9IG5ld01lc2g7XHJcbiAgICB9XHJcbiAgICAvLyBMaWdodHNcclxuICAgIGVsc2UgaWYgKG5vZGUubGlnaHQgJiYgIW5vZGUuYmFieWxvbk5vZGUgJiYgIWdsdGZSdW50aW1lLmltcG9ydE9ubHlNZXNoZXMpIHtcclxuICAgICAgICBjb25zdCBsaWdodDogSUdMVEZMaWdodCA9IGdsdGZSdW50aW1lLmxpZ2h0c1tub2RlLmxpZ2h0XTtcclxuXHJcbiAgICAgICAgaWYgKGxpZ2h0KSB7XHJcbiAgICAgICAgICAgIGlmIChsaWdodC50eXBlID09PSBcImFtYmllbnRcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYW1iaWVuTGlnaHQ6IElHTFRGQW1iaWVuTGlnaHQgPSAoPGFueT5saWdodClbbGlnaHQudHlwZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZW1pTGlnaHQgPSBuZXcgSGVtaXNwaGVyaWNMaWdodChub2RlLmxpZ2h0LCBWZWN0b3IzLlplcm8oKSwgZ2x0ZlJ1bnRpbWUuc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgaGVtaUxpZ2h0Lm5hbWUgPSBub2RlLm5hbWUgfHwgXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW1iaWVuTGlnaHQuY29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBoZW1pTGlnaHQuZGlmZnVzZSA9IENvbG9yMy5Gcm9tQXJyYXkoYW1iaWVuTGlnaHQuY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxhc3ROb2RlID0gaGVtaUxpZ2h0O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpZ2h0LnR5cGUgPT09IFwiZGlyZWN0aW9uYWxcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uYWxMaWdodDogSUdMVEZEaXJlY3Rpb25hbExpZ2h0ID0gKDxhbnk+bGlnaHQpW2xpZ2h0LnR5cGVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGlyTGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodChub2RlLmxpZ2h0LCBWZWN0b3IzLlplcm8oKSwgZ2x0ZlJ1bnRpbWUuc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgZGlyTGlnaHQubmFtZSA9IG5vZGUubmFtZSB8fCBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb25hbExpZ2h0LmNvbG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyTGlnaHQuZGlmZnVzZSA9IENvbG9yMy5Gcm9tQXJyYXkoZGlyZWN0aW9uYWxMaWdodC5jb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGFzdE5vZGUgPSBkaXJMaWdodDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaWdodC50eXBlID09PSBcInBvaW50XCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50TGlnaHQ6IElHTFRGUG9pbnRMaWdodCA9ICg8YW55PmxpZ2h0KVtsaWdodC50eXBlXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHB0TGlnaHQgPSBuZXcgUG9pbnRMaWdodChub2RlLmxpZ2h0LCBWZWN0b3IzLlplcm8oKSwgZ2x0ZlJ1bnRpbWUuc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgcHRMaWdodC5uYW1lID0gbm9kZS5uYW1lIHx8IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50TGlnaHQuY29sb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBwdExpZ2h0LmRpZmZ1c2UgPSBDb2xvcjMuRnJvbUFycmF5KHBvaW50TGlnaHQuY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxhc3ROb2RlID0gcHRMaWdodDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaWdodC50eXBlID09PSBcInNwb3RcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BvdExpZ2h0OiBJR0xURlNwb3RMaWdodCA9ICg8YW55PmxpZ2h0KVtsaWdodC50eXBlXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwTGlnaHQgPSBuZXcgU3BvdExpZ2h0KG5vZGUubGlnaHQsIFZlY3RvcjMuWmVybygpLCBWZWN0b3IzLlplcm8oKSwgMCwgMCwgZ2x0ZlJ1bnRpbWUuc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgc3BMaWdodC5uYW1lID0gbm9kZS5uYW1lIHx8IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNwb3RMaWdodC5jb2xvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwTGlnaHQuZGlmZnVzZSA9IENvbG9yMy5Gcm9tQXJyYXkoc3BvdExpZ2h0LmNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3BvdExpZ2h0LmZhbGxPZkFuZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BMaWdodC5hbmdsZSA9IHNwb3RMaWdodC5mYWxsT2ZBbmdsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3BvdExpZ2h0LmZhbGxPZmZFeHBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwTGlnaHQuZXhwb25lbnQgPSBzcG90TGlnaHQuZmFsbE9mZkV4cG9uZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxhc3ROb2RlID0gc3BMaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIENhbWVyYXNcclxuICAgIGVsc2UgaWYgKG5vZGUuY2FtZXJhICYmICFub2RlLmJhYnlsb25Ob2RlICYmICFnbHRmUnVudGltZS5pbXBvcnRPbmx5TWVzaGVzKSB7XHJcbiAgICAgICAgY29uc3QgY2FtZXJhOiBJR0xURkNhbWVyYSA9IGdsdGZSdW50aW1lLmNhbWVyYXNbbm9kZS5jYW1lcmFdO1xyXG5cclxuICAgICAgICBpZiAoY2FtZXJhKSB7XHJcbiAgICAgICAgICAgIGdsdGZSdW50aW1lLnNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSAhIWdsdGZSdW50aW1lLmFzc2V0Q29udGFpbmVyO1xyXG4gICAgICAgICAgICBpZiAoY2FtZXJhLnR5cGUgPT09IFwib3J0aG9ncmFwaGljXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9ydGhvQ2FtZXJhID0gbmV3IEZyZWVDYW1lcmEobm9kZS5jYW1lcmEsIFZlY3RvcjMuWmVybygpLCBnbHRmUnVudGltZS5zY2VuZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9ydGhvQ2FtZXJhLm5hbWUgPSBub2RlLm5hbWUgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIG9ydGhvQ2FtZXJhLm1vZGUgPSBDYW1lcmEuT1JUSE9HUkFQSElDX0NBTUVSQTtcclxuICAgICAgICAgICAgICAgIG9ydGhvQ2FtZXJhLmF0dGFjaENvbnRyb2woKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXN0Tm9kZSA9IG9ydGhvQ2FtZXJhO1xyXG5cclxuICAgICAgICAgICAgICAgIG9ydGhvQ2FtZXJhLl9wYXJlbnRDb250YWluZXIgPSBnbHRmUnVudGltZS5hc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYW1lcmEudHlwZSA9PT0gXCJwZXJzcGVjdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJzcGVjdGl2ZUNhbWVyYTogSUdMVEZDYW1lcmFQZXJzcGVjdGl2ZSA9ICg8YW55PmNhbWVyYSlbY2FtZXJhLnR5cGVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGVyc0NhbWVyYSA9IG5ldyBGcmVlQ2FtZXJhKG5vZGUuY2FtZXJhLCBWZWN0b3IzLlplcm8oKSwgZ2x0ZlJ1bnRpbWUuc2NlbmUsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBwZXJzQ2FtZXJhLm5hbWUgPSBub2RlLm5hbWUgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIHBlcnNDYW1lcmEuYXR0YWNoQ29udHJvbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcGVyc3BlY3RpdmVDYW1lcmEuYXNwZWN0UmF0aW8pIHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZUNhbWVyYS5hc3BlY3RSYXRpbyA9IGdsdGZSdW50aW1lLnNjZW5lLmdldEVuZ2luZSgpLmdldFJlbmRlcldpZHRoKCkgLyBnbHRmUnVudGltZS5zY2VuZS5nZXRFbmdpbmUoKS5nZXRSZW5kZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGVyc3BlY3RpdmVDYW1lcmEuem5lYXIgJiYgcGVyc3BlY3RpdmVDYW1lcmEuemZhcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNDYW1lcmEubWF4WiA9IHBlcnNwZWN0aXZlQ2FtZXJhLnpmYXI7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc0NhbWVyYS5taW5aID0gcGVyc3BlY3RpdmVDYW1lcmEuem5lYXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGFzdE5vZGUgPSBwZXJzQ2FtZXJhO1xyXG4gICAgICAgICAgICAgICAgcGVyc0NhbWVyYS5fcGFyZW50Q29udGFpbmVyID0gZ2x0ZlJ1bnRpbWUuYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdsdGZSdW50aW1lLnNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRW1wdHkgbm9kZVxyXG4gICAgaWYgKCFub2RlLmpvaW50TmFtZSkge1xyXG4gICAgICAgIGlmIChub2RlLmJhYnlsb25Ob2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlLmJhYnlsb25Ob2RlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGFzdE5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgZ2x0ZlJ1bnRpbWUuc2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhZ2x0ZlJ1bnRpbWUuYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIGNvbnN0IGR1bW15ID0gbmV3IE1lc2gobm9kZS5uYW1lIHx8IFwiXCIsIGdsdGZSdW50aW1lLnNjZW5lKTtcclxuICAgICAgICAgICAgZHVtbXkuX3BhcmVudENvbnRhaW5lciA9IGdsdGZSdW50aW1lLmFzc2V0Q29udGFpbmVyO1xyXG4gICAgICAgICAgICBnbHRmUnVudGltZS5zY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG5vZGUuYmFieWxvbk5vZGUgPSBkdW1teTtcclxuICAgICAgICAgICAgbGFzdE5vZGUgPSBkdW1teTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhc3ROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKG5vZGUubWF0cml4ICYmIGxhc3ROb2RlIGluc3RhbmNlb2YgTWVzaCkge1xyXG4gICAgICAgICAgICBjb25maWd1cmVOb2RlRnJvbU1hdHJpeChsYXN0Tm9kZSwgbm9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRpb24gPSBub2RlLnRyYW5zbGF0aW9uIHx8IFswLCAwLCAwXTtcclxuICAgICAgICAgICAgY29uc3Qgcm90YXRpb24gPSBub2RlLnJvdGF0aW9uIHx8IFswLCAwLCAwLCAxXTtcclxuICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBub2RlLnNjYWxlIHx8IFsxLCAxLCAxXTtcclxuICAgICAgICAgICAgY29uZmlndXJlTm9kZShsYXN0Tm9kZSwgVmVjdG9yMy5Gcm9tQXJyYXkodHJhbnNsYXRpb24pLCBRdWF0ZXJuaW9uLkZyb21BcnJheShyb3RhdGlvbiksIFZlY3RvcjMuRnJvbUFycmF5KHNjYWxlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsYXN0Tm9kZS51cGRhdGVDYWNoZSh0cnVlKTtcclxuICAgICAgICBub2RlLmJhYnlsb25Ob2RlID0gbGFzdE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhc3ROb2RlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyYXZlcnNlcyBub2RlcyBhbmQgY3JlYXRlcyB0aGVtXHJcbiAqIEBwYXJhbSBnbHRmUnVudGltZVxyXG4gKiBAcGFyYW0gaWRcclxuICogQHBhcmFtIHBhcmVudFxyXG4gKiBAcGFyYW0gbWVzaEluY2x1ZGVkXHJcbiAqL1xyXG5jb25zdCB0cmF2ZXJzZU5vZGVzID0gKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIGlkOiBzdHJpbmcsIHBhcmVudDogTnVsbGFibGU8Tm9kZT4sIG1lc2hJbmNsdWRlZDogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XHJcbiAgICBjb25zdCBub2RlOiBJR0xURk5vZGUgPSBnbHRmUnVudGltZS5ub2Rlc1tpZF07XHJcbiAgICBsZXQgbmV3Tm9kZTogTnVsbGFibGU8Tm9kZT4gPSBudWxsO1xyXG5cclxuICAgIGlmIChnbHRmUnVudGltZS5pbXBvcnRPbmx5TWVzaGVzICYmICFtZXNoSW5jbHVkZWQgJiYgZ2x0ZlJ1bnRpbWUuaW1wb3J0TWVzaGVzTmFtZXMpIHtcclxuICAgICAgICBpZiAoZ2x0ZlJ1bnRpbWUuaW1wb3J0TWVzaGVzTmFtZXMuaW5kZXhPZihub2RlLm5hbWUgfHwgXCJcIikgIT09IC0xIHx8IGdsdGZSdW50aW1lLmltcG9ydE1lc2hlc05hbWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBtZXNoSW5jbHVkZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1lc2hJbmNsdWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWVzaEluY2x1ZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW5vZGUuam9pbnROYW1lICYmIG1lc2hJbmNsdWRlZCkge1xyXG4gICAgICAgIG5ld05vZGUgPSBpbXBvcnROb2RlKGdsdGZSdW50aW1lLCBub2RlLCBpZCk7XHJcblxyXG4gICAgICAgIGlmIChuZXdOb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIG5ld05vZGUuaWQgPSBpZDtcclxuICAgICAgICAgICAgbmV3Tm9kZS5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRyYXZlcnNlTm9kZXMoZ2x0ZlJ1bnRpbWUsIG5vZGUuY2hpbGRyZW5baV0sIG5ld05vZGUsIG1lc2hJbmNsdWRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGRvIHN0dWZmIGFmdGVyIGJ1ZmZlcnMsIHNoYWRlcnMgYXJlIGxvYWRlZCAoZS5nLiBob29rIHVwIG1hdGVyaWFscywgbG9hZCBhbmltYXRpb25zLCBldGMuKVxyXG4gKiBAcGFyYW0gZ2x0ZlJ1bnRpbWVcclxuICovXHJcbmNvbnN0IHBvc3RMb2FkID0gKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUpID0+IHtcclxuICAgIC8vIE5vZGVzXHJcbiAgICBsZXQgY3VycmVudFNjZW5lOiBJR0xURlNjZW5lID0gPElHTFRGU2NlbmU+Z2x0ZlJ1bnRpbWUuY3VycmVudFNjZW5lO1xyXG5cclxuICAgIGlmIChjdXJyZW50U2NlbmUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTY2VuZS5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0cmF2ZXJzZU5vZGVzKGdsdGZSdW50aW1lLCBjdXJyZW50U2NlbmUubm9kZXNbaV0sIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChjb25zdCB0aGluZyBpbiBnbHRmUnVudGltZS5zY2VuZXMpIHtcclxuICAgICAgICAgICAgY3VycmVudFNjZW5lID0gPElHTFRGU2NlbmU+Z2x0ZlJ1bnRpbWUuc2NlbmVzW3RoaW5nXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFNjZW5lLm5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0cmF2ZXJzZU5vZGVzKGdsdGZSdW50aW1lLCBjdXJyZW50U2NlbmUubm9kZXNbaV0sIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCBhbmltYXRpb25zXHJcbiAgICBsb2FkQW5pbWF0aW9ucyhnbHRmUnVudGltZSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnbHRmUnVudGltZS5zY2VuZS5za2VsZXRvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBza2VsZXRvbiA9IGdsdGZSdW50aW1lLnNjZW5lLnNrZWxldG9uc1tpXTtcclxuICAgICAgICBnbHRmUnVudGltZS5zY2VuZS5iZWdpbkFuaW1hdGlvbihza2VsZXRvbiwgMCwgTnVtYmVyLk1BWF9WQUxVRSwgdHJ1ZSwgMS4wKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBvbkJpbmQgc2hhZGVycnMgY2FsbGJhY2sgdG8gc2V0IHVuaWZvcm1zIGFuZCBtYXRyaWNlc1xyXG4gKiBAcGFyYW0gbWVzaFxyXG4gKiBAcGFyYW0gZ2x0ZlJ1bnRpbWVcclxuICogQHBhcmFtIHVuVHJlYXRlZFVuaWZvcm1zXHJcbiAqIEBwYXJhbSBzaGFkZXJNYXRlcmlhbFxyXG4gKiBAcGFyYW0gdGVjaG5pcXVlXHJcbiAqIEBwYXJhbSBtYXRlcmlhbFxyXG4gKiBAcGFyYW0gb25TdWNjZXNzXHJcbiAqL1xyXG5jb25zdCBvbkJpbmRTaGFkZXJNYXRlcmlhbCA9IChcclxuICAgIG1lc2g6IEFic3RyYWN0TWVzaCxcclxuICAgIGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsXHJcbiAgICB1blRyZWF0ZWRVbmlmb3JtczogeyBba2V5OiBzdHJpbmddOiBJR0xURlRlY2huaXF1ZVBhcmFtZXRlciB9LFxyXG4gICAgc2hhZGVyTWF0ZXJpYWw6IFNoYWRlck1hdGVyaWFsLFxyXG4gICAgdGVjaG5pcXVlOiBJR0xURlRlY2huaXF1ZSxcclxuICAgIG1hdGVyaWFsOiBJR0xURk1hdGVyaWFsLFxyXG4gICAgb25TdWNjZXNzOiAoc2hhZGVyTWF0ZXJpYWw6IFNoYWRlck1hdGVyaWFsKSA9PiB2b2lkXHJcbikgPT4ge1xyXG4gICAgY29uc3QgbWF0ZXJpYWxWYWx1ZXMgPSBtYXRlcmlhbC52YWx1ZXMgfHwgdGVjaG5pcXVlLnBhcmFtZXRlcnM7XHJcblxyXG4gICAgZm9yIChjb25zdCB1bmlmIGluIHVuVHJlYXRlZFVuaWZvcm1zKSB7XHJcbiAgICAgICAgY29uc3QgdW5pZm9ybTogSUdMVEZUZWNobmlxdWVQYXJhbWV0ZXIgPSB1blRyZWF0ZWRVbmlmb3Jtc1t1bmlmXTtcclxuICAgICAgICBjb25zdCB0eXBlID0gdW5pZm9ybS50eXBlO1xyXG5cclxuICAgICAgICBpZiAodHlwZSA9PT0gRVBhcmFtZXRlclR5cGUuRkxPQVRfTUFUMiB8fCB0eXBlID09PSBFUGFyYW1ldGVyVHlwZS5GTE9BVF9NQVQzIHx8IHR5cGUgPT09IEVQYXJhbWV0ZXJUeXBlLkZMT0FUX01BVDQpIHtcclxuICAgICAgICAgICAgaWYgKHVuaWZvcm0uc2VtYW50aWMgJiYgIXVuaWZvcm0uc291cmNlICYmICF1bmlmb3JtLm5vZGUpIHtcclxuICAgICAgICAgICAgICAgIEdMVEZVdGlscy5TZXRNYXRyaXgoZ2x0ZlJ1bnRpbWUuc2NlbmUsIG1lc2gsIHVuaWZvcm0sIHVuaWYsIDxFZmZlY3Q+c2hhZGVyTWF0ZXJpYWwuZ2V0RWZmZWN0KCkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVuaWZvcm0uc2VtYW50aWMgJiYgKHVuaWZvcm0uc291cmNlIHx8IHVuaWZvcm0ubm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBnbHRmUnVudGltZS5zY2VuZS5nZXROb2RlQnlOYW1lKHVuaWZvcm0uc291cmNlIHx8IHVuaWZvcm0ubm9kZSB8fCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSBnbHRmUnVudGltZS5zY2VuZS5nZXROb2RlQnlJZCh1bmlmb3JtLnNvdXJjZSB8fCB1bmlmb3JtLm5vZGUgfHwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgR0xURlV0aWxzLlNldE1hdHJpeChnbHRmUnVudGltZS5zY2VuZSwgc291cmNlLCB1bmlmb3JtLCB1bmlmLCA8RWZmZWN0PnNoYWRlck1hdGVyaWFsLmdldEVmZmVjdCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gKDxhbnk+bWF0ZXJpYWxWYWx1ZXMpW3RlY2huaXF1ZS51bmlmb3Jtc1t1bmlmXV07XHJcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gRVBhcmFtZXRlclR5cGUuU0FNUExFUl8yRCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dHVyZSA9IGdsdGZSdW50aW1lLnRleHR1cmVzW21hdGVyaWFsLnZhbHVlcyA/IHZhbHVlIDogdW5pZm9ybS52YWx1ZV0uYmFieWxvblRleHR1cmU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRleHR1cmUgPT09IG51bGwgfHwgdGV4dHVyZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgKDxFZmZlY3Q+c2hhZGVyTWF0ZXJpYWwuZ2V0RWZmZWN0KCkpLnNldFRleHR1cmUodW5pZiwgdGV4dHVyZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHTFRGVXRpbHMuU2V0VW5pZm9ybSg8RWZmZWN0PnNoYWRlck1hdGVyaWFsLmdldEVmZmVjdCgpLCB1bmlmLCB2YWx1ZSwgdHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWNjZXNzKHNoYWRlck1hdGVyaWFsKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQcmVwYXJlIHVuaWZvcm1zIHRvIHNlbmQgdGhlIG9ubHkgb25lIHRpbWVcclxuICogTG9hZHMgdGhlIGFwcHJvcHJpYXRlIHRleHR1cmVzXHJcbiAqIEBwYXJhbSBnbHRmUnVudGltZVxyXG4gKiBAcGFyYW0gc2hhZGVyTWF0ZXJpYWxcclxuICogQHBhcmFtIHRlY2huaXF1ZVxyXG4gKiBAcGFyYW0gbWF0ZXJpYWxcclxuICovXHJcbmNvbnN0IHByZXBhcmVTaGFkZXJNYXRlcmlhbFVuaWZvcm1zID0gKFxyXG4gICAgZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSxcclxuICAgIHNoYWRlck1hdGVyaWFsOiBTaGFkZXJNYXRlcmlhbCxcclxuICAgIHRlY2huaXF1ZTogSUdMVEZUZWNobmlxdWUsXHJcbiAgICBtYXRlcmlhbDogSUdMVEZNYXRlcmlhbCxcclxuICAgIHVuVHJlYXRlZFVuaWZvcm1zOiB7IFtrZXk6IHN0cmluZ106IElHTFRGVGVjaG5pcXVlUGFyYW1ldGVyIH1cclxuKSA9PiB7XHJcbiAgICBjb25zdCBtYXRlcmlhbFZhbHVlcyA9IG1hdGVyaWFsLnZhbHVlcyB8fCB0ZWNobmlxdWUucGFyYW1ldGVycztcclxuICAgIGNvbnN0IHRlY2huaXF1ZVVuaWZvcm1zID0gdGVjaG5pcXVlLnVuaWZvcm1zO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlcGFyZSB2YWx1ZXMgaGVyZSAobm90IG1hdHJpY2VzKVxyXG4gICAgICovXHJcbiAgICBmb3IgKGNvbnN0IHVuaWYgaW4gdW5UcmVhdGVkVW5pZm9ybXMpIHtcclxuICAgICAgICBjb25zdCB1bmlmb3JtOiBJR0xURlRlY2huaXF1ZVBhcmFtZXRlciA9IHVuVHJlYXRlZFVuaWZvcm1zW3VuaWZdO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSB1bmlmb3JtLnR5cGU7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gKDxhbnk+bWF0ZXJpYWxWYWx1ZXMpW3RlY2huaXF1ZVVuaWZvcm1zW3VuaWZdXTtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gSW4gY2FzZSB0aGUgdmFsdWUgaXMgdGhlIHNhbWUgZm9yIGFsbCBtYXRlcmlhbHNcclxuICAgICAgICAgICAgdmFsdWUgPSA8YW55PnVuaWZvcm0udmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb25Mb2FkVGV4dHVyZSA9ICh1bmlmb3JtTmFtZTogTnVsbGFibGU8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRleHR1cmU6IFRleHR1cmUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh1bmlmb3JtLnZhbHVlICYmIHVuaWZvcm1OYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3RhdGljIHVuaWZvcm1cclxuICAgICAgICAgICAgICAgICAgICBzaGFkZXJNYXRlcmlhbC5zZXRUZXh0dXJlKHVuaWZvcm1OYW1lLCB0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdW5UcmVhdGVkVW5pZm9ybXNbdW5pZm9ybU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFRleHR1cmUgKHNhbXBsZXIyRClcclxuICAgICAgICBpZiAodHlwZSA9PT0gRVBhcmFtZXRlclR5cGUuU0FNUExFUl8yRCkge1xyXG4gICAgICAgICAgICBHTFRGTG9hZGVyRXh0ZW5zaW9uLkxvYWRUZXh0dXJlQXN5bmMoZ2x0ZlJ1bnRpbWUsIG1hdGVyaWFsLnZhbHVlcyA/IHZhbHVlIDogdW5pZm9ybS52YWx1ZSwgb25Mb2FkVGV4dHVyZSh1bmlmKSwgKCkgPT4gb25Mb2FkVGV4dHVyZShudWxsKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE90aGVyc1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodW5pZm9ybS52YWx1ZSAmJiBHTFRGVXRpbHMuU2V0VW5pZm9ybShzaGFkZXJNYXRlcmlhbCwgdW5pZiwgbWF0ZXJpYWwudmFsdWVzID8gdmFsdWUgOiB1bmlmb3JtLnZhbHVlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gU3RhdGljIHVuaWZvcm1cclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB1blRyZWF0ZWRVbmlmb3Jtc1t1bmlmXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTaGFkZXIgY29tcGlsYXRpb24gZmFpbGVkXHJcbiAqIEBwYXJhbSBwcm9ncmFtXHJcbiAqIEBwYXJhbSBzaGFkZXJNYXRlcmlhbFxyXG4gKiBAcGFyYW0gb25FcnJvclxyXG4gKiBAcmV0dXJucyBjYWxsYmFjayB3aGVuIHNoYWRlciBpcyBjb21waWxlZFxyXG4gKi9cclxuY29uc3Qgb25TaGFkZXJDb21waWxlRXJyb3IgPSAocHJvZ3JhbTogSUdMVEZQcm9ncmFtLCBzaGFkZXJNYXRlcmlhbDogU2hhZGVyTWF0ZXJpYWwsIG9uRXJyb3I6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpID0+IHtcclxuICAgIHJldHVybiAoZWZmZWN0OiBFZmZlY3QsIGVycm9yOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBzaGFkZXJNYXRlcmlhbC5kaXNwb3NlKHRydWUpO1xyXG4gICAgICAgIG9uRXJyb3IoXCJDYW5ub3QgY29tcGlsZSBwcm9ncmFtIG5hbWVkIFwiICsgcHJvZ3JhbS5uYW1lICsgXCIuIEVycm9yOiBcIiArIGVycm9yICsgXCIuIERlZmF1bHQgbWF0ZXJpYWwgd2lsbCBiZSBhcHBsaWVkXCIpO1xyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTaGFkZXIgY29tcGlsYXRpb24gc3VjY2Vzc1xyXG4gKiBAcGFyYW0gZ2x0ZlJ1bnRpbWVcclxuICogQHBhcmFtIHNoYWRlck1hdGVyaWFsXHJcbiAqIEBwYXJhbSB0ZWNobmlxdWVcclxuICogQHBhcmFtIG1hdGVyaWFsXHJcbiAqIEBwYXJhbSB1blRyZWF0ZWRVbmlmb3Jtc1xyXG4gKiBAcGFyYW0gb25TdWNjZXNzXHJcbiAqIEByZXR1cm5zIGNhbGxiYWNrIHdoZW4gc2hhZGVyIGlzIGNvbXBpbGVkXHJcbiAqL1xyXG5jb25zdCBvblNoYWRlckNvbXBpbGVTdWNjZXNzID0gKFxyXG4gICAgZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSxcclxuICAgIHNoYWRlck1hdGVyaWFsOiBTaGFkZXJNYXRlcmlhbCxcclxuICAgIHRlY2huaXF1ZTogSUdMVEZUZWNobmlxdWUsXHJcbiAgICBtYXRlcmlhbDogSUdMVEZNYXRlcmlhbCxcclxuICAgIHVuVHJlYXRlZFVuaWZvcm1zOiB7IFtrZXk6IHN0cmluZ106IElHTFRGVGVjaG5pcXVlUGFyYW1ldGVyIH0sXHJcbiAgICBvblN1Y2Nlc3M6IChzaGFkZXJNYXRlcmlhbDogU2hhZGVyTWF0ZXJpYWwpID0+IHZvaWRcclxuKSA9PiB7XHJcbiAgICByZXR1cm4gKF86IEVmZmVjdCkgPT4ge1xyXG4gICAgICAgIHByZXBhcmVTaGFkZXJNYXRlcmlhbFVuaWZvcm1zKGdsdGZSdW50aW1lLCBzaGFkZXJNYXRlcmlhbCwgdGVjaG5pcXVlLCBtYXRlcmlhbCwgdW5UcmVhdGVkVW5pZm9ybXMpO1xyXG5cclxuICAgICAgICBzaGFkZXJNYXRlcmlhbC5vbkJpbmQgPSAobWVzaDogQWJzdHJhY3RNZXNoKSA9PiB7XHJcbiAgICAgICAgICAgIG9uQmluZFNoYWRlck1hdGVyaWFsKG1lc2gsIGdsdGZSdW50aW1lLCB1blRyZWF0ZWRVbmlmb3Jtcywgc2hhZGVyTWF0ZXJpYWwsIHRlY2huaXF1ZSwgbWF0ZXJpYWwsIG9uU3VjY2Vzcyk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgdW5pZm9ybSBpZiBhbHJlYWR5IGhhbmRsZWQgYnkgYmFieWxvblxyXG4gKiBAcGFyYW0gdG9rZW5pemVyXHJcbiAqIEBwYXJhbSB0ZWNobmlxdWVcclxuICogQHBhcmFtIHVuVHJlYXRlZFVuaWZvcm1zXHJcbiAqIEByZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSB1bmlmb3JtIGhhbmRsZWQgYnkgYmFieWxvblxyXG4gKi9cclxuY29uc3QgcGFyc2VTaGFkZXJVbmlmb3JtcyA9ICh0b2tlbml6ZXI6IFRva2VuaXplciwgdGVjaG5pcXVlOiBJR0xURlRlY2huaXF1ZSwgdW5UcmVhdGVkVW5pZm9ybXM6IHsgW2tleTogc3RyaW5nXTogSUdMVEZUZWNobmlxdWVQYXJhbWV0ZXIgfSk6IHN0cmluZyA9PiB7XHJcbiAgICBmb3IgKGNvbnN0IHVuaWYgaW4gdGVjaG5pcXVlLnVuaWZvcm1zKSB7XHJcbiAgICAgICAgY29uc3QgdW5pZm9ybSA9IHRlY2huaXF1ZS51bmlmb3Jtc1t1bmlmXTtcclxuICAgICAgICBjb25zdCB1bmlmb3JtUGFyYW1ldGVyOiBJR0xURlRlY2huaXF1ZVBhcmFtZXRlciA9IHRlY2huaXF1ZS5wYXJhbWV0ZXJzW3VuaWZvcm1dO1xyXG5cclxuICAgICAgICBpZiAodG9rZW5pemVyLmN1cnJlbnRJZGVudGlmaWVyID09PSB1bmlmKSB7XHJcbiAgICAgICAgICAgIGlmICh1bmlmb3JtUGFyYW1ldGVyLnNlbWFudGljICYmICF1bmlmb3JtUGFyYW1ldGVyLnNvdXJjZSAmJiAhdW5pZm9ybVBhcmFtZXRlci5ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2Zvcm1JbmRleCA9IGdsVEZUcmFuc2Zvcm1zLmluZGV4T2YodW5pZm9ybVBhcmFtZXRlci5zZW1hbnRpYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zZm9ybUluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB1blRyZWF0ZWRVbmlmb3Jtc1t1bmlmXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmFieWxvblRyYW5zZm9ybXNbdHJhbnNmb3JtSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0b2tlbml6ZXIuY3VycmVudElkZW50aWZpZXI7XHJcbn07XHJcblxyXG4vKipcclxuICogQWxsIHNoYWRlcnMgbG9hZGVkLiBDcmVhdGUgbWF0ZXJpYWxzIG9uZSBieSBvbmVcclxuICogQHBhcmFtIGdsdGZSdW50aW1lXHJcbiAqL1xyXG5jb25zdCBpbXBvcnRNYXRlcmlhbHMgPSAoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSkgPT4ge1xyXG4gICAgLy8gQ3JlYXRlIG1hdGVyaWFsc1xyXG4gICAgZm9yIChjb25zdCBtYXQgaW4gZ2x0ZlJ1bnRpbWUubWF0ZXJpYWxzKSB7XHJcbiAgICAgICAgR0xURkxvYWRlckV4dGVuc2lvbi5Mb2FkTWF0ZXJpYWxBc3luYyhcclxuICAgICAgICAgICAgZ2x0ZlJ1bnRpbWUsXHJcbiAgICAgICAgICAgIG1hdCxcclxuICAgICAgICAgICAgKCkgPT4ge30sXHJcbiAgICAgICAgICAgICgpID0+IHt9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgYmFzZSBnbFRGIHNwZWNcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR0xURkxvYWRlckJhc2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBDcmVhdGVSdW50aW1lKHBhcnNlZERhdGE6IGFueSwgc2NlbmU6IFNjZW5lLCByb290VXJsOiBzdHJpbmcpOiBJR0xURlJ1bnRpbWUge1xyXG4gICAgICAgIGNvbnN0IGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUgPSB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IHt9LFxyXG4gICAgICAgICAgICBhY2Nlc3NvcnM6IHt9LFxyXG4gICAgICAgICAgICBidWZmZXJzOiB7fSxcclxuICAgICAgICAgICAgYnVmZmVyVmlld3M6IHt9LFxyXG4gICAgICAgICAgICBtZXNoZXM6IHt9LFxyXG4gICAgICAgICAgICBsaWdodHM6IHt9LFxyXG4gICAgICAgICAgICBjYW1lcmFzOiB7fSxcclxuICAgICAgICAgICAgbm9kZXM6IHt9LFxyXG4gICAgICAgICAgICBpbWFnZXM6IHt9LFxyXG4gICAgICAgICAgICB0ZXh0dXJlczoge30sXHJcbiAgICAgICAgICAgIHNoYWRlcnM6IHt9LFxyXG4gICAgICAgICAgICBwcm9ncmFtczoge30sXHJcbiAgICAgICAgICAgIHNhbXBsZXJzOiB7fSxcclxuICAgICAgICAgICAgdGVjaG5pcXVlczoge30sXHJcbiAgICAgICAgICAgIG1hdGVyaWFsczoge30sXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnM6IHt9LFxyXG4gICAgICAgICAgICBza2luczoge30sXHJcbiAgICAgICAgICAgIGV4dGVuc2lvbnNVc2VkOiBbXSxcclxuXHJcbiAgICAgICAgICAgIHNjZW5lczoge30sXHJcblxyXG4gICAgICAgICAgICBidWZmZXJzQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHNoYWRlcnNjb3VudDogMCxcclxuXHJcbiAgICAgICAgICAgIHNjZW5lOiBzY2VuZSxcclxuICAgICAgICAgICAgcm9vdFVybDogcm9vdFVybCxcclxuXHJcbiAgICAgICAgICAgIGxvYWRlZEJ1ZmZlckNvdW50OiAwLFxyXG4gICAgICAgICAgICBsb2FkZWRCdWZmZXJWaWV3czoge30sXHJcblxyXG4gICAgICAgICAgICBsb2FkZWRTaGFkZXJDb3VudDogMCxcclxuXHJcbiAgICAgICAgICAgIGltcG9ydE9ubHlNZXNoZXM6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgZHVtbXlOb2RlczogW10sXHJcblxyXG4gICAgICAgICAgICBhc3NldENvbnRhaW5lcjogbnVsbCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBQYXJzZVxyXG4gICAgICAgIGlmIChwYXJzZWREYXRhLmV4dGVuc2lvbnMpIHtcclxuICAgICAgICAgICAgcGFyc2VPYmplY3QocGFyc2VkRGF0YS5leHRlbnNpb25zLCBcImV4dGVuc2lvbnNcIiwgZ2x0ZlJ1bnRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcnNlZERhdGEuZXh0ZW5zaW9uc1VzZWQpIHtcclxuICAgICAgICAgICAgcGFyc2VPYmplY3QocGFyc2VkRGF0YS5leHRlbnNpb25zVXNlZCwgXCJleHRlbnNpb25zVXNlZFwiLCBnbHRmUnVudGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyc2VkRGF0YS5idWZmZXJzKSB7XHJcbiAgICAgICAgICAgIHBhcnNlQnVmZmVycyhwYXJzZWREYXRhLmJ1ZmZlcnMsIGdsdGZSdW50aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJzZWREYXRhLmJ1ZmZlclZpZXdzKSB7XHJcbiAgICAgICAgICAgIHBhcnNlT2JqZWN0KHBhcnNlZERhdGEuYnVmZmVyVmlld3MsIFwiYnVmZmVyVmlld3NcIiwgZ2x0ZlJ1bnRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcnNlZERhdGEuYWNjZXNzb3JzKSB7XHJcbiAgICAgICAgICAgIHBhcnNlT2JqZWN0KHBhcnNlZERhdGEuYWNjZXNzb3JzLCBcImFjY2Vzc29yc1wiLCBnbHRmUnVudGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyc2VkRGF0YS5tZXNoZXMpIHtcclxuICAgICAgICAgICAgcGFyc2VPYmplY3QocGFyc2VkRGF0YS5tZXNoZXMsIFwibWVzaGVzXCIsIGdsdGZSdW50aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJzZWREYXRhLmxpZ2h0cykge1xyXG4gICAgICAgICAgICBwYXJzZU9iamVjdChwYXJzZWREYXRhLmxpZ2h0cywgXCJsaWdodHNcIiwgZ2x0ZlJ1bnRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcnNlZERhdGEuY2FtZXJhcykge1xyXG4gICAgICAgICAgICBwYXJzZU9iamVjdChwYXJzZWREYXRhLmNhbWVyYXMsIFwiY2FtZXJhc1wiLCBnbHRmUnVudGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyc2VkRGF0YS5ub2Rlcykge1xyXG4gICAgICAgICAgICBwYXJzZU9iamVjdChwYXJzZWREYXRhLm5vZGVzLCBcIm5vZGVzXCIsIGdsdGZSdW50aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJzZWREYXRhLmltYWdlcykge1xyXG4gICAgICAgICAgICBwYXJzZU9iamVjdChwYXJzZWREYXRhLmltYWdlcywgXCJpbWFnZXNcIiwgZ2x0ZlJ1bnRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcnNlZERhdGEudGV4dHVyZXMpIHtcclxuICAgICAgICAgICAgcGFyc2VPYmplY3QocGFyc2VkRGF0YS50ZXh0dXJlcywgXCJ0ZXh0dXJlc1wiLCBnbHRmUnVudGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyc2VkRGF0YS5zaGFkZXJzKSB7XHJcbiAgICAgICAgICAgIHBhcnNlU2hhZGVycyhwYXJzZWREYXRhLnNoYWRlcnMsIGdsdGZSdW50aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJzZWREYXRhLnByb2dyYW1zKSB7XHJcbiAgICAgICAgICAgIHBhcnNlT2JqZWN0KHBhcnNlZERhdGEucHJvZ3JhbXMsIFwicHJvZ3JhbXNcIiwgZ2x0ZlJ1bnRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcnNlZERhdGEuc2FtcGxlcnMpIHtcclxuICAgICAgICAgICAgcGFyc2VPYmplY3QocGFyc2VkRGF0YS5zYW1wbGVycywgXCJzYW1wbGVyc1wiLCBnbHRmUnVudGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyc2VkRGF0YS50ZWNobmlxdWVzKSB7XHJcbiAgICAgICAgICAgIHBhcnNlT2JqZWN0KHBhcnNlZERhdGEudGVjaG5pcXVlcywgXCJ0ZWNobmlxdWVzXCIsIGdsdGZSdW50aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJzZWREYXRhLm1hdGVyaWFscykge1xyXG4gICAgICAgICAgICBwYXJzZU9iamVjdChwYXJzZWREYXRhLm1hdGVyaWFscywgXCJtYXRlcmlhbHNcIiwgZ2x0ZlJ1bnRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcnNlZERhdGEuYW5pbWF0aW9ucykge1xyXG4gICAgICAgICAgICBwYXJzZU9iamVjdChwYXJzZWREYXRhLmFuaW1hdGlvbnMsIFwiYW5pbWF0aW9uc1wiLCBnbHRmUnVudGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyc2VkRGF0YS5za2lucykge1xyXG4gICAgICAgICAgICBwYXJzZU9iamVjdChwYXJzZWREYXRhLnNraW5zLCBcInNraW5zXCIsIGdsdGZSdW50aW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJzZWREYXRhLnNjZW5lcykge1xyXG4gICAgICAgICAgICBnbHRmUnVudGltZS5zY2VuZXMgPSBwYXJzZWREYXRhLnNjZW5lcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJzZWREYXRhLnNjZW5lICYmIHBhcnNlZERhdGEuc2NlbmVzKSB7XHJcbiAgICAgICAgICAgIGdsdGZSdW50aW1lLmN1cnJlbnRTY2VuZSA9IHBhcnNlZERhdGEuc2NlbmVzW3BhcnNlZERhdGEuc2NlbmVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGdsdGZSdW50aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTG9hZEJ1ZmZlckFzeW5jKFxyXG4gICAgICAgIGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsXHJcbiAgICAgICAgaWQ6IHN0cmluZyxcclxuICAgICAgICBvblN1Y2Nlc3M6IChidWZmZXI6IEFycmF5QnVmZmVyVmlldykgPT4gdm9pZCxcclxuICAgICAgICBvbkVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkLFxyXG4gICAgICAgIG9uUHJvZ3Jlc3M/OiAoKSA9PiB2b2lkXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBidWZmZXI6IElHTFRGQnVmZmVyID0gZ2x0ZlJ1bnRpbWUuYnVmZmVyc1tpZF07XHJcblxyXG4gICAgICAgIGlmIChUb29scy5Jc0Jhc2U2NChidWZmZXIudXJpKSkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IG9uU3VjY2VzcyhuZXcgVWludDhBcnJheShUb29scy5EZWNvZGVCYXNlNjQoYnVmZmVyLnVyaSkpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVG9vbHMuTG9hZEZpbGUoXHJcbiAgICAgICAgICAgICAgICBnbHRmUnVudGltZS5yb290VXJsICsgYnVmZmVyLnVyaSxcclxuICAgICAgICAgICAgICAgIChkYXRhKSA9PiBvblN1Y2Nlc3MobmV3IFVpbnQ4QXJyYXkoZGF0YSBhcyBBcnJheUJ1ZmZlcikpLFxyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzcyxcclxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAocmVxdWVzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3IocmVxdWVzdC5zdGF0dXMgKyBcIiBcIiArIHJlcXVlc3Quc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIExvYWRUZXh0dXJlQnVmZmVyQXN5bmMoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSwgaWQ6IHN0cmluZywgb25TdWNjZXNzOiAoYnVmZmVyOiBOdWxsYWJsZTxBcnJheUJ1ZmZlclZpZXc+KSA9PiB2b2lkLCBvbkVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZTogSUdMVEZUZXh0dXJlID0gZ2x0ZlJ1bnRpbWUudGV4dHVyZXNbaWRdO1xyXG5cclxuICAgICAgICBpZiAoIXRleHR1cmUgfHwgIXRleHR1cmUuc291cmNlKSB7XHJcbiAgICAgICAgICAgIG9uRXJyb3IoXCJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0ZXh0dXJlLmJhYnlsb25UZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIG9uU3VjY2VzcyhudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc291cmNlOiBJR0xURkltYWdlID0gZ2x0ZlJ1bnRpbWUuaW1hZ2VzW3RleHR1cmUuc291cmNlXTtcclxuXHJcbiAgICAgICAgaWYgKFRvb2xzLklzQmFzZTY0KHNvdXJjZS51cmkpKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gb25TdWNjZXNzKG5ldyBVaW50OEFycmF5KFRvb2xzLkRlY29kZUJhc2U2NChzb3VyY2UudXJpKSkpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBUb29scy5Mb2FkRmlsZShcclxuICAgICAgICAgICAgICAgIGdsdGZSdW50aW1lLnJvb3RVcmwgKyBzb3VyY2UudXJpLFxyXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IG9uU3VjY2VzcyhuZXcgVWludDhBcnJheShkYXRhIGFzIEFycmF5QnVmZmVyKSksXHJcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICAgKHJlcXVlc3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yKHJlcXVlc3Quc3RhdHVzICsgXCIgXCIgKyByZXF1ZXN0LnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBDcmVhdGVUZXh0dXJlQXN5bmMoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSwgaWQ6IHN0cmluZywgYnVmZmVyOiBOdWxsYWJsZTxBcnJheUJ1ZmZlclZpZXc+LCBvblN1Y2Nlc3M6ICh0ZXh0dXJlOiBUZXh0dXJlKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGV4dHVyZTogSUdMVEZUZXh0dXJlID0gZ2x0ZlJ1bnRpbWUudGV4dHVyZXNbaWRdO1xyXG5cclxuICAgICAgICBpZiAodGV4dHVyZS5iYWJ5bG9uVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBvblN1Y2Nlc3ModGV4dHVyZS5iYWJ5bG9uVGV4dHVyZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNhbXBsZXI6IElHTFRGU2FtcGxlciA9IGdsdGZSdW50aW1lLnNhbXBsZXJzW3RleHR1cmUuc2FtcGxlcl07XHJcblxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZU1pcE1hcHMgPVxyXG4gICAgICAgICAgICBzYW1wbGVyLm1pbkZpbHRlciA9PT0gRVRleHR1cmVGaWx0ZXJUeXBlLk5FQVJFU1RfTUlQTUFQX05FQVJFU1QgfHxcclxuICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPT09IEVUZXh0dXJlRmlsdGVyVHlwZS5ORUFSRVNUX01JUE1BUF9MSU5FQVIgfHxcclxuICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPT09IEVUZXh0dXJlRmlsdGVyVHlwZS5MSU5FQVJfTUlQTUFQX05FQVJFU1QgfHxcclxuICAgICAgICAgICAgc2FtcGxlci5taW5GaWx0ZXIgPT09IEVUZXh0dXJlRmlsdGVyVHlwZS5MSU5FQVJfTUlQTUFQX0xJTkVBUjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2FtcGxpbmdNb2RlID0gVGV4dHVyZS5CSUxJTkVBUl9TQU1QTElOR01PREU7XHJcblxyXG4gICAgICAgIGNvbnN0IGJsb2IgPSBidWZmZXIgPT0gbnVsbCA/IG5ldyBCbG9iKCkgOiBuZXcgQmxvYihbYnVmZmVyXSk7XHJcbiAgICAgICAgY29uc3QgYmxvYlVSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgY29uc3QgcmV2b2tlQmxvYlVSTCA9ICgpID0+IFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYlVSTCk7XHJcbiAgICAgICAgY29uc3QgbmV3VGV4dHVyZSA9IG5ldyBUZXh0dXJlKGJsb2JVUkwsIGdsdGZSdW50aW1lLnNjZW5lLCAhY3JlYXRlTWlwTWFwcywgdHJ1ZSwgc2FtcGxpbmdNb2RlLCByZXZva2VCbG9iVVJMLCByZXZva2VCbG9iVVJMKTtcclxuICAgICAgICBpZiAoc2FtcGxlci53cmFwUyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG5ld1RleHR1cmUud3JhcFUgPSBHTFRGVXRpbHMuR2V0V3JhcE1vZGUoc2FtcGxlci53cmFwUyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzYW1wbGVyLndyYXBUICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbmV3VGV4dHVyZS53cmFwViA9IEdMVEZVdGlscy5HZXRXcmFwTW9kZShzYW1wbGVyLndyYXBUKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3VGV4dHVyZS5uYW1lID0gaWQ7XHJcblxyXG4gICAgICAgIHRleHR1cmUuYmFieWxvblRleHR1cmUgPSBuZXdUZXh0dXJlO1xyXG4gICAgICAgIG9uU3VjY2VzcyhuZXdUZXh0dXJlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIExvYWRTaGFkZXJTdHJpbmdBc3luYyhnbHRmUnVudGltZTogSUdMVEZSdW50aW1lLCBpZDogc3RyaW5nLCBvblN1Y2Nlc3M6IChzaGFkZXJTdHJpbmc6IHN0cmluZyB8IEFycmF5QnVmZmVyKSA9PiB2b2lkLCBvbkVycm9yPzogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNoYWRlcjogSUdMVEZTaGFkZXIgPSBnbHRmUnVudGltZS5zaGFkZXJzW2lkXTtcclxuXHJcbiAgICAgICAgaWYgKFRvb2xzLklzQmFzZTY0KHNoYWRlci51cmkpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoYWRlclN0cmluZyA9IGF0b2Ioc2hhZGVyLnVyaS5zcGxpdChcIixcIilbMV0pO1xyXG4gICAgICAgICAgICBpZiAob25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3Moc2hhZGVyU3RyaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFRvb2xzLkxvYWRGaWxlKGdsdGZSdW50aW1lLnJvb3RVcmwgKyBzaGFkZXIudXJpLCBvblN1Y2Nlc3MsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmYWxzZSwgKHJlcXVlc3QpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0ICYmIG9uRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkVycm9yKHJlcXVlc3Quc3RhdHVzICsgXCIgXCIgKyByZXF1ZXN0LnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkTWF0ZXJpYWxBc3luYyhnbHRmUnVudGltZTogSUdMVEZSdW50aW1lLCBpZDogc3RyaW5nLCBvblN1Y2Nlc3M6IChtYXRlcmlhbDogTWF0ZXJpYWwpID0+IHZvaWQsIG9uRXJyb3I6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbDogSUdMVEZNYXRlcmlhbCA9IGdsdGZSdW50aW1lLm1hdGVyaWFsc1tpZF07XHJcbiAgICAgICAgaWYgKCFtYXRlcmlhbC50ZWNobmlxdWUpIHtcclxuICAgICAgICAgICAgaWYgKG9uRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIG9uRXJyb3IoXCJObyB0ZWNobmlxdWUgZm91bmQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRlY2huaXF1ZTogSUdMVEZUZWNobmlxdWUgPSBnbHRmUnVudGltZS50ZWNobmlxdWVzW21hdGVyaWFsLnRlY2huaXF1ZV07XHJcbiAgICAgICAgaWYgKCF0ZWNobmlxdWUpIHtcclxuICAgICAgICAgICAgZ2x0ZlJ1bnRpbWUuc2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9ICEhZ2x0ZlJ1bnRpbWUuYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRNYXRlcmlhbCA9IG5ldyBTdGFuZGFyZE1hdGVyaWFsKGlkLCBnbHRmUnVudGltZS5zY2VuZSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHRNYXRlcmlhbC5fcGFyZW50Q29udGFpbmVyID0gZ2x0ZlJ1bnRpbWUuYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIGdsdGZSdW50aW1lLnNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgZGVmYXVsdE1hdGVyaWFsLmRpZmZ1c2VDb2xvciA9IG5ldyBDb2xvcjMoMC41LCAwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHRNYXRlcmlhbC5zaWRlT3JpZW50YXRpb24gPSBNYXRlcmlhbC5Db3VudGVyQ2xvY2tXaXNlU2lkZU9yaWVudGF0aW9uO1xyXG4gICAgICAgICAgICBvblN1Y2Nlc3MoZGVmYXVsdE1hdGVyaWFsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcHJvZ3JhbTogSUdMVEZQcm9ncmFtID0gZ2x0ZlJ1bnRpbWUucHJvZ3JhbXNbdGVjaG5pcXVlLnByb2dyYW1dO1xyXG4gICAgICAgIGNvbnN0IHN0YXRlczogSUdMVEZUZWNobmlxdWVTdGF0ZXMgPSB0ZWNobmlxdWUuc3RhdGVzO1xyXG5cclxuICAgICAgICBjb25zdCB2ZXJ0ZXhTaGFkZXI6IHN0cmluZyA9IEVmZmVjdC5TaGFkZXJzU3RvcmVbcHJvZ3JhbS52ZXJ0ZXhTaGFkZXIgKyBcIlZlcnRleFNoYWRlclwiXTtcclxuICAgICAgICBjb25zdCBwaXhlbFNoYWRlcjogc3RyaW5nID0gRWZmZWN0LlNoYWRlcnNTdG9yZVtwcm9ncmFtLmZyYWdtZW50U2hhZGVyICsgXCJQaXhlbFNoYWRlclwiXTtcclxuICAgICAgICBsZXQgbmV3VmVydGV4U2hhZGVyID0gXCJcIjtcclxuICAgICAgICBsZXQgbmV3UGl4ZWxTaGFkZXIgPSBcIlwiO1xyXG5cclxuICAgICAgICBjb25zdCB2ZXJ0ZXhUb2tlbml6ZXIgPSBuZXcgVG9rZW5pemVyKHZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgY29uc3QgcGl4ZWxUb2tlbml6ZXIgPSBuZXcgVG9rZW5pemVyKHBpeGVsU2hhZGVyKTtcclxuXHJcbiAgICAgICAgY29uc3QgdW5UcmVhdGVkVW5pZm9ybXM6IHsgW2tleTogc3RyaW5nXTogSUdMVEZUZWNobmlxdWVQYXJhbWV0ZXIgfSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IHVuaWZvcm1zOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgY29uc3Qgc2FtcGxlcnM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIC8vIEZpbGwgdW5pZm9ybSwgc2FtcGxlcjJEIGFuZCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgZm9yIChjb25zdCB1bmlmIGluIHRlY2huaXF1ZS51bmlmb3Jtcykge1xyXG4gICAgICAgICAgICBjb25zdCB1bmlmb3JtID0gdGVjaG5pcXVlLnVuaWZvcm1zW3VuaWZdO1xyXG4gICAgICAgICAgICBjb25zdCB1bmlmb3JtUGFyYW1ldGVyOiBJR0xURlRlY2huaXF1ZVBhcmFtZXRlciA9IHRlY2huaXF1ZS5wYXJhbWV0ZXJzW3VuaWZvcm1dO1xyXG5cclxuICAgICAgICAgICAgdW5UcmVhdGVkVW5pZm9ybXNbdW5pZl0gPSB1bmlmb3JtUGFyYW1ldGVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKHVuaWZvcm1QYXJhbWV0ZXIuc2VtYW50aWMgJiYgIXVuaWZvcm1QYXJhbWV0ZXIubm9kZSAmJiAhdW5pZm9ybVBhcmFtZXRlci5zb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybUluZGV4ID0gZ2xURlRyYW5zZm9ybXMuaW5kZXhPZih1bmlmb3JtUGFyYW1ldGVyLnNlbWFudGljKTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1JbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB1bmlmb3Jtcy5wdXNoKGJhYnlsb25UcmFuc2Zvcm1zW3RyYW5zZm9ybUluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHVuVHJlYXRlZFVuaWZvcm1zW3VuaWZdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1bmlmb3Jtcy5wdXNoKHVuaWYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVuaWZvcm1QYXJhbWV0ZXIudHlwZSA9PT0gRVBhcmFtZXRlclR5cGUuU0FNUExFUl8yRCkge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlcnMucHVzaCh1bmlmKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVuaWZvcm1zLnB1c2godW5pZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgYXR0ciBpbiB0ZWNobmlxdWUuYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSB0ZWNobmlxdWUuYXR0cmlidXRlc1thdHRyXTtcclxuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlUGFyYW1ldGVyOiBJR0xURlRlY2huaXF1ZVBhcmFtZXRlciA9IHRlY2huaXF1ZS5wYXJhbWV0ZXJzW2F0dHJpYnV0ZV07XHJcblxyXG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlUGFyYW1ldGVyLnNlbWFudGljKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZVBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaChuYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ29uZmlndXJlIHZlcnRleCBzaGFkZXJcclxuICAgICAgICB3aGlsZSAoIXZlcnRleFRva2VuaXplci5pc0VuZCgpICYmIHZlcnRleFRva2VuaXplci5nZXROZXh0VG9rZW4oKSkge1xyXG4gICAgICAgICAgICBjb25zdCB0b2tlblR5cGUgPSB2ZXJ0ZXhUb2tlbml6ZXIuY3VycmVudFRva2VuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRva2VuVHlwZSAhPT0gRVRva2VuVHlwZS5JREVOVElGSUVSKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWZXJ0ZXhTaGFkZXIgKz0gdmVydGV4VG9rZW5pemVyLmN1cnJlbnRTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGZvdW5kQXR0cmlidXRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF0dHIgaW4gdGVjaG5pcXVlLmF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IHRlY2huaXF1ZS5hdHRyaWJ1dGVzW2F0dHJdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlUGFyYW1ldGVyOiBJR0xURlRlY2huaXF1ZVBhcmFtZXRlciA9IHRlY2huaXF1ZS5wYXJhbWV0ZXJzW2F0dHJpYnV0ZV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZlcnRleFRva2VuaXplci5jdXJyZW50SWRlbnRpZmllciA9PT0gYXR0ciAmJiBhdHRyaWJ1dGVQYXJhbWV0ZXIuc2VtYW50aWMpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdWZXJ0ZXhTaGFkZXIgKz0gZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZVBhcmFtZXRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91bmRBdHRyaWJ1dGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZm91bmRBdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuZXdWZXJ0ZXhTaGFkZXIgKz0gcGFyc2VTaGFkZXJVbmlmb3Jtcyh2ZXJ0ZXhUb2tlbml6ZXIsIHRlY2huaXF1ZSwgdW5UcmVhdGVkVW5pZm9ybXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ29uZmlndXJlIHBpeGVsIHNoYWRlclxyXG4gICAgICAgIHdoaWxlICghcGl4ZWxUb2tlbml6ZXIuaXNFbmQoKSAmJiBwaXhlbFRva2VuaXplci5nZXROZXh0VG9rZW4oKSkge1xyXG4gICAgICAgICAgICBjb25zdCB0b2tlblR5cGUgPSBwaXhlbFRva2VuaXplci5jdXJyZW50VG9rZW47XHJcblxyXG4gICAgICAgICAgICBpZiAodG9rZW5UeXBlICE9PSBFVG9rZW5UeXBlLklERU5USUZJRVIpIHtcclxuICAgICAgICAgICAgICAgIG5ld1BpeGVsU2hhZGVyICs9IHBpeGVsVG9rZW5pemVyLmN1cnJlbnRTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbmV3UGl4ZWxTaGFkZXIgKz0gcGFyc2VTaGFkZXJVbmlmb3JtcyhwaXhlbFRva2VuaXplciwgdGVjaG5pcXVlLCB1blRyZWF0ZWRVbmlmb3Jtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgc2hhZGVyIG1hdGVyaWFsXHJcbiAgICAgICAgY29uc3Qgc2hhZGVyUGF0aCA9IHtcclxuICAgICAgICAgICAgdmVydGV4OiBwcm9ncmFtLnZlcnRleFNoYWRlciArIGlkLFxyXG4gICAgICAgICAgICBmcmFnbWVudDogcHJvZ3JhbS5mcmFnbWVudFNoYWRlciArIGlkLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXHJcbiAgICAgICAgICAgIHVuaWZvcm1zOiB1bmlmb3JtcyxcclxuICAgICAgICAgICAgc2FtcGxlcnM6IHNhbXBsZXJzLFxyXG4gICAgICAgICAgICBuZWVkQWxwaGFCbGVuZGluZzogc3RhdGVzICYmIHN0YXRlcy5lbmFibGUgJiYgc3RhdGVzLmVuYWJsZS5pbmRleE9mKDMwNDIpICE9PSAtMSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBFZmZlY3QuU2hhZGVyc1N0b3JlW3Byb2dyYW0udmVydGV4U2hhZGVyICsgaWQgKyBcIlZlcnRleFNoYWRlclwiXSA9IG5ld1ZlcnRleFNoYWRlcjtcclxuICAgICAgICBFZmZlY3QuU2hhZGVyc1N0b3JlW3Byb2dyYW0uZnJhZ21lbnRTaGFkZXIgKyBpZCArIFwiUGl4ZWxTaGFkZXJcIl0gPSBuZXdQaXhlbFNoYWRlcjtcclxuXHJcbiAgICAgICAgY29uc3Qgc2hhZGVyTWF0ZXJpYWwgPSBuZXcgU2hhZGVyTWF0ZXJpYWwoaWQsIGdsdGZSdW50aW1lLnNjZW5lLCBzaGFkZXJQYXRoLCBvcHRpb25zKTtcclxuICAgICAgICBzaGFkZXJNYXRlcmlhbC5vbkVycm9yID0gb25TaGFkZXJDb21waWxlRXJyb3IocHJvZ3JhbSwgc2hhZGVyTWF0ZXJpYWwsIG9uRXJyb3IpO1xyXG4gICAgICAgIHNoYWRlck1hdGVyaWFsLm9uQ29tcGlsZWQgPSBvblNoYWRlckNvbXBpbGVTdWNjZXNzKGdsdGZSdW50aW1lLCBzaGFkZXJNYXRlcmlhbCwgdGVjaG5pcXVlLCBtYXRlcmlhbCwgdW5UcmVhdGVkVW5pZm9ybXMsIG9uU3VjY2Vzcyk7XHJcbiAgICAgICAgc2hhZGVyTWF0ZXJpYWwuc2lkZU9yaWVudGF0aW9uID0gTWF0ZXJpYWwuQ291bnRlckNsb2NrV2lzZVNpZGVPcmllbnRhdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKHN0YXRlcyAmJiBzdGF0ZXMuZnVuY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bmN0aW9ucyA9IHN0YXRlcy5mdW5jdGlvbnM7XHJcbiAgICAgICAgICAgIGlmIChmdW5jdGlvbnMuY3VsbEZhY2UgJiYgZnVuY3Rpb25zLmN1bGxGYWNlWzBdICE9PSBFQ3VsbGluZ1R5cGUuQkFDSykge1xyXG4gICAgICAgICAgICAgICAgc2hhZGVyTWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJsZW5kRnVuYyA9IGZ1bmN0aW9ucy5ibGVuZEZ1bmNTZXBhcmF0ZTtcclxuICAgICAgICAgICAgaWYgKGJsZW5kRnVuYykge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kRnVuY1swXSA9PT0gRUJsZW5kaW5nRnVuY3Rpb24uU1JDX0FMUEhBICYmXHJcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRGdW5jWzFdID09PSBFQmxlbmRpbmdGdW5jdGlvbi5PTkVfTUlOVVNfU1JDX0FMUEhBICYmXHJcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRGdW5jWzJdID09PSBFQmxlbmRpbmdGdW5jdGlvbi5PTkUgJiZcclxuICAgICAgICAgICAgICAgICAgICBibGVuZEZ1bmNbM10gPT09IEVCbGVuZGluZ0Z1bmN0aW9uLk9ORVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhZGVyTWF0ZXJpYWwuYWxwaGFNb2RlID0gQ29uc3RhbnRzLkFMUEhBX0NPTUJJTkU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kRnVuY1swXSA9PT0gRUJsZW5kaW5nRnVuY3Rpb24uT05FICYmXHJcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRGdW5jWzFdID09PSBFQmxlbmRpbmdGdW5jdGlvbi5PTkUgJiZcclxuICAgICAgICAgICAgICAgICAgICBibGVuZEZ1bmNbMl0gPT09IEVCbGVuZGluZ0Z1bmN0aW9uLlpFUk8gJiZcclxuICAgICAgICAgICAgICAgICAgICBibGVuZEZ1bmNbM10gPT09IEVCbGVuZGluZ0Z1bmN0aW9uLk9ORVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhZGVyTWF0ZXJpYWwuYWxwaGFNb2RlID0gQ29uc3RhbnRzLkFMUEhBX09ORU9ORTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRGdW5jWzBdID09PSBFQmxlbmRpbmdGdW5jdGlvbi5TUkNfQUxQSEEgJiZcclxuICAgICAgICAgICAgICAgICAgICBibGVuZEZ1bmNbMV0gPT09IEVCbGVuZGluZ0Z1bmN0aW9uLk9ORSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kRnVuY1syXSA9PT0gRUJsZW5kaW5nRnVuY3Rpb24uWkVSTyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kRnVuY1szXSA9PT0gRUJsZW5kaW5nRnVuY3Rpb24uT05FXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGFkZXJNYXRlcmlhbC5hbHBoYU1vZGUgPSBDb25zdGFudHMuQUxQSEFfQUREO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICBibGVuZEZ1bmNbMF0gPT09IEVCbGVuZGluZ0Z1bmN0aW9uLlpFUk8gJiZcclxuICAgICAgICAgICAgICAgICAgICBibGVuZEZ1bmNbMV0gPT09IEVCbGVuZGluZ0Z1bmN0aW9uLk9ORV9NSU5VU19TUkNfQ09MT1IgJiZcclxuICAgICAgICAgICAgICAgICAgICBibGVuZEZ1bmNbMl0gPT09IEVCbGVuZGluZ0Z1bmN0aW9uLk9ORSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kRnVuY1szXSA9PT0gRUJsZW5kaW5nRnVuY3Rpb24uT05FXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGFkZXJNYXRlcmlhbC5hbHBoYU1vZGUgPSBDb25zdGFudHMuQUxQSEFfU1VCVFJBQ1Q7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kRnVuY1swXSA9PT0gRUJsZW5kaW5nRnVuY3Rpb24uRFNUX0NPTE9SICYmXHJcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRGdW5jWzFdID09PSBFQmxlbmRpbmdGdW5jdGlvbi5aRVJPICYmXHJcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRGdW5jWzJdID09PSBFQmxlbmRpbmdGdW5jdGlvbi5PTkUgJiZcclxuICAgICAgICAgICAgICAgICAgICBibGVuZEZ1bmNbM10gPT09IEVCbGVuZGluZ0Z1bmN0aW9uLk9ORVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhZGVyTWF0ZXJpYWwuYWxwaGFNb2RlID0gQ29uc3RhbnRzLkFMUEhBX01VTFRJUExZO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgICAgICBibGVuZEZ1bmNbMF0gPT09IEVCbGVuZGluZ0Z1bmN0aW9uLlNSQ19BTFBIQSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kRnVuY1sxXSA9PT0gRUJsZW5kaW5nRnVuY3Rpb24uT05FX01JTlVTX1NSQ19DT0xPUiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kRnVuY1syXSA9PT0gRUJsZW5kaW5nRnVuY3Rpb24uT05FICYmXHJcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRGdW5jWzNdID09PSBFQmxlbmRpbmdGdW5jdGlvbi5PTkVcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYWRlck1hdGVyaWFsLmFscGhhTW9kZSA9IENvbnN0YW50cy5BTFBIQV9NQVhJTUlaRUQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnbFRGIFYxIExvYWRlclxyXG4gKiBAaW50ZXJuYWxcclxuICogQGRlcHJlY2F0ZWRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHTFRGTG9hZGVyIGltcGxlbWVudHMgSUdMVEZMb2FkZXIge1xyXG4gICAgcHVibGljIHN0YXRpYyBFeHRlbnNpb25zOiB7IFtuYW1lOiBzdHJpbmddOiBHTFRGTG9hZGVyRXh0ZW5zaW9uIH0gPSB7fTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFJlZ2lzdGVyRXh0ZW5zaW9uKGV4dGVuc2lvbjogR0xURkxvYWRlckV4dGVuc2lvbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChHTFRGTG9hZGVyLkV4dGVuc2lvbnNbZXh0ZW5zaW9uLm5hbWVdKSB7XHJcbiAgICAgICAgICAgIFRvb2xzLkVycm9yKCdUb29sIHdpdGggdGhlIHNhbWUgbmFtZSBcIicgKyBleHRlbnNpb24ubmFtZSArICdcIiBhbHJlYWR5IGV4aXN0cycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHTFRGTG9hZGVyLkV4dGVuc2lvbnNbZXh0ZW5zaW9uLm5hbWVdID0gZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbXBvcnRNZXNoQXN5bmMoXHJcbiAgICAgICAgbWVzaGVzTmFtZXM6IGFueSxcclxuICAgICAgICBzY2VuZTogU2NlbmUsXHJcbiAgICAgICAgZGF0YTogSUdMVEZMb2FkZXJEYXRhLFxyXG4gICAgICAgIHJvb3RVcmw6IHN0cmluZyxcclxuICAgICAgICBhc3NldENvbnRhaW5lcjogTnVsbGFibGU8QXNzZXRDb250YWluZXI+LFxyXG4gICAgICAgIG9uU3VjY2VzczogKG1lc2hlczogQWJzdHJhY3RNZXNoW10sIHNrZWxldG9uczogU2tlbGV0b25bXSkgPT4gdm9pZCxcclxuICAgICAgICBvblByb2dyZXNzPzogKGV2ZW50OiBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50KSA9PiB2b2lkLFxyXG4gICAgICAgIG9uRXJyb3I/OiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkXHJcbiAgICApOiBib29sZWFuIHtcclxuICAgICAgICBzY2VuZS51c2VSaWdodEhhbmRlZFN5c3RlbSA9IHRydWU7XHJcblxyXG4gICAgICAgIEdMVEZMb2FkZXJFeHRlbnNpb24uTG9hZFJ1bnRpbWVBc3luYyhcclxuICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgICAgIHJvb3RVcmwsXHJcbiAgICAgICAgICAgIChnbHRmUnVudGltZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZ2x0ZlJ1bnRpbWUuYXNzZXRDb250YWluZXIgPSBhc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIGdsdGZSdW50aW1lLmltcG9ydE9ubHlNZXNoZXMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNoZXNOYW1lcyA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsdGZSdW50aW1lLmltcG9ydE1lc2hlc05hbWVzID0gW107XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXNoZXNOYW1lcyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsdGZSdW50aW1lLmltcG9ydE1lc2hlc05hbWVzID0gW21lc2hlc05hbWVzXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWVzaGVzTmFtZXMgJiYgIShtZXNoZXNOYW1lcyBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsdGZSdW50aW1lLmltcG9ydE1lc2hlc05hbWVzID0gW21lc2hlc05hbWVzXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2x0ZlJ1bnRpbWUuaW1wb3J0TWVzaGVzTmFtZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBUb29scy5XYXJuKFwiQXJndW1lbnQgbWVzaGVzTmFtZXMgbXVzdCBiZSBvZiB0eXBlIHN0cmluZyBvciBzdHJpbmdbXVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbm9kZXNcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU5vZGVzKGdsdGZSdW50aW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNoZXM6IEFic3RyYWN0TWVzaFtdID0gW107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBza2VsZXRvbnM6IFNrZWxldG9uW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGaWxsIGFycmF5cyBvZiBtZXNoZXMgYW5kIHNrZWxldG9uc1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZGUgaW4gZ2x0ZlJ1bnRpbWUubm9kZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlOiBJR0xURk5vZGUgPSBnbHRmUnVudGltZS5ub2Rlc1tuZGVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5iYWJ5bG9uTm9kZSBpbnN0YW5jZW9mIEFic3RyYWN0TWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNoZXMucHVzaCg8QWJzdHJhY3RNZXNoPm5vZGUuYmFieWxvbk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNrbCBpbiBnbHRmUnVudGltZS5za2lucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNraW46IElHTFRGU2tpbnMgPSBnbHRmUnVudGltZS5za2luc1tza2xdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbi5iYWJ5bG9uU2tlbGV0b24gaW5zdGFuY2VvZiBTa2VsZXRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBza2VsZXRvbnMucHVzaChza2luLmJhYnlsb25Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIExvYWQgYnVmZmVycywgc2hhZGVycywgbWF0ZXJpYWxzLCBldGMuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkQnVmZmVyc0FzeW5jKGdsdGZSdW50aW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZFNoYWRlcnNBc3luYyhnbHRmUnVudGltZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRNYXRlcmlhbHMoZ2x0ZlJ1bnRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0TG9hZChnbHRmUnVudGltZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUdMVEZGaWxlTG9hZGVyLkluY3JlbWVudGFsTG9hZGluZyAmJiBvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcyhtZXNoZXMsIHNrZWxldG9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChHTFRGRmlsZUxvYWRlci5JbmNyZW1lbnRhbExvYWRpbmcgJiYgb25TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzKG1lc2hlcywgc2tlbGV0b25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25FcnJvclxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1wb3J0cyBvbmUgb3IgbW9yZSBtZXNoZXMgZnJvbSBhIGxvYWRlZCBnbHRmIGZpbGUgYW5kIGFkZHMgdGhlbSB0byB0aGUgc2NlbmVcclxuICAgICAqIEBwYXJhbSBtZXNoZXNOYW1lcyBhIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIG9mIHRoZSBtZXNoIG5hbWVzIHRoYXQgc2hvdWxkIGJlIGxvYWRlZCBmcm9tIHRoZSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgdGhlIHNjZW5lIHRoZSBtZXNoZXMgc2hvdWxkIGJlIGFkZGVkIHRvXHJcbiAgICAgKiBAcGFyYW0gYXNzZXRDb250YWluZXIgZGVmaW5lcyB0aGUgYXNzZXQgY29udGFpbmVyIHRvIHVzZSAoY2FuIGJlIG51bGwpXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBnbHRmIGRhdGEgY29udGFpbmluZyBpbmZvcm1hdGlvbiBvZiB0aGUgbWVzaGVzIGluIGEgbG9hZGVkIGZpbGVcclxuICAgICAqIEBwYXJhbSByb290VXJsIHJvb3QgdXJsIHRvIGxvYWQgZnJvbVxyXG4gICAgICogQHBhcmFtIG9uUHJvZ3Jlc3MgZXZlbnQgdGhhdCBmaXJlcyB3aGVuIGxvYWRpbmcgcHJvZ3Jlc3MgaGFzIG9jY3VyZWRcclxuICAgICAqIEByZXR1cm5zIGEgcHJvbWlzZSBjb250YWluZyB0aGUgbG9hZGVkIG1lc2hlcywgcGFydGljbGVzLCBza2VsZXRvbnMgYW5kIGFuaW1hdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcG9ydE1lc2hBc3luYyhcclxuICAgICAgICBtZXNoZXNOYW1lczogYW55LFxyXG4gICAgICAgIHNjZW5lOiBTY2VuZSxcclxuICAgICAgICBhc3NldENvbnRhaW5lcjogTnVsbGFibGU8QXNzZXRDb250YWluZXI+LFxyXG4gICAgICAgIGRhdGE6IElHTFRGTG9hZGVyRGF0YSxcclxuICAgICAgICByb290VXJsOiBzdHJpbmcsXHJcbiAgICAgICAgb25Qcm9ncmVzcz86IChldmVudDogSVNjZW5lTG9hZGVyUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZFxyXG4gICAgKTogUHJvbWlzZTxJU2NlbmVMb2FkZXJBc3luY1Jlc3VsdD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltcG9ydE1lc2hBc3luYyhcclxuICAgICAgICAgICAgICAgIG1lc2hlc05hbWVzLFxyXG4gICAgICAgICAgICAgICAgc2NlbmUsXHJcbiAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgcm9vdFVybCxcclxuICAgICAgICAgICAgICAgIGFzc2V0Q29udGFpbmVyLFxyXG4gICAgICAgICAgICAgICAgKG1lc2hlcywgc2tlbGV0b25zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc2hlczogbWVzaGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWNsZVN5c3RlbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBza2VsZXRvbnM6IHNrZWxldG9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uR3JvdXBzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlnaHRzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtTm9kZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9tZXRyaWVzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlTWFuYWdlcnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MsXHJcbiAgICAgICAgICAgICAgICAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IobWVzc2FnZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRBc3luYyhcclxuICAgICAgICBzY2VuZTogU2NlbmUsXHJcbiAgICAgICAgZGF0YTogSUdMVEZMb2FkZXJEYXRhLFxyXG4gICAgICAgIHJvb3RVcmw6IHN0cmluZyxcclxuICAgICAgICBvblN1Y2Nlc3M6ICgpID0+IHZvaWQsXHJcbiAgICAgICAgb25Qcm9ncmVzcz86IChldmVudDogSVNjZW5lTG9hZGVyUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZCxcclxuICAgICAgICBvbkVycm9yPzogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgc2NlbmUudXNlUmlnaHRIYW5kZWRTeXN0ZW0gPSB0cnVlO1xyXG5cclxuICAgICAgICBHTFRGTG9hZGVyRXh0ZW5zaW9uLkxvYWRSdW50aW1lQXN5bmMoXHJcbiAgICAgICAgICAgIHNjZW5lLFxyXG4gICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICByb290VXJsLFxyXG4gICAgICAgICAgICAoZ2x0ZlJ1bnRpbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIExvYWQgcnVudGltZSBleHRlbnNpb3NcclxuICAgICAgICAgICAgICAgIEdMVEZMb2FkZXJFeHRlbnNpb24uTG9hZFJ1bnRpbWVFeHRlbnNpb25zQXN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgZ2x0ZlJ1bnRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbm9kZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlTm9kZXMoZ2x0ZlJ1bnRpbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTG9hZCBidWZmZXJzLCBzaGFkZXJzLCBtYXRlcmlhbHMsIGV0Yy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZEJ1ZmZlcnNBc3luYyhnbHRmUnVudGltZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZFNoYWRlcnNBc3luYyhnbHRmUnVudGltZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcG9ydE1hdGVyaWFscyhnbHRmUnVudGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdExvYWQoZ2x0ZlJ1bnRpbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUdMVEZGaWxlTG9hZGVyLkluY3JlbWVudGFsTG9hZGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoR0xURkZpbGVMb2FkZXIuSW5jcmVtZW50YWxMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvclxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25FcnJvclxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBvcnRzIGFsbCBvYmplY3RzIGZyb20gYSBsb2FkZWQgZ2x0ZiBmaWxlIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgdGhlIHNjZW5lIHRoZSBvYmplY3RzIHNob3VsZCBiZSBhZGRlZCB0b1xyXG4gICAgICogQHBhcmFtIGRhdGEgZ2x0ZiBkYXRhIGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gb2YgdGhlIG1lc2hlcyBpbiBhIGxvYWRlZCBmaWxlXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCByb290IHVybCB0byBsb2FkIGZyb21cclxuICAgICAqIEBwYXJhbSBvblByb2dyZXNzIGV2ZW50IHRoYXQgZmlyZXMgd2hlbiBsb2FkaW5nIHByb2dyZXNzIGhhcyBvY2N1cmVkXHJcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2Ugd2hpY2ggY29tcGxldGVzIHdoZW4gb2JqZWN0cyBoYXZlIGJlZW4gbG9hZGVkIHRvIHRoZSBzY2VuZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEFzeW5jKHNjZW5lOiBTY2VuZSwgZGF0YTogSUdMVEZMb2FkZXJEYXRhLCByb290VXJsOiBzdHJpbmcsIG9uUHJvZ3Jlc3M/OiAoZXZlbnQ6IElTY2VuZUxvYWRlclByb2dyZXNzRXZlbnQpID0+IHZvaWQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkQXN5bmMoXHJcbiAgICAgICAgICAgICAgICBzY2VuZSxcclxuICAgICAgICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgICAgICAgICByb290VXJsLFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvblByb2dyZXNzLFxyXG4gICAgICAgICAgICAgICAgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkU2hhZGVyc0FzeW5jKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIG9ubG9hZDogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBoYXNTaGFkZXJzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2Nlc3NTaGFkZXIgPSAoc2hhOiBzdHJpbmcsIHNoYWRlcjogSUdMVEZTaGFkZXIpID0+IHtcclxuICAgICAgICAgICAgR0xURkxvYWRlckV4dGVuc2lvbi5Mb2FkU2hhZGVyU3RyaW5nQXN5bmMoXHJcbiAgICAgICAgICAgICAgICBnbHRmUnVudGltZSxcclxuICAgICAgICAgICAgICAgIHNoYSxcclxuICAgICAgICAgICAgICAgIChzaGFkZXJTdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZGVyU3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2x0ZlJ1bnRpbWUubG9hZGVkU2hhZGVyQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRlclN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBFZmZlY3QuU2hhZGVyc1N0b3JlW3NoYSArIChzaGFkZXIudHlwZSA9PT0gRVNoYWRlclR5cGUuVkVSVEVYID8gXCJWZXJ0ZXhTaGFkZXJcIiA6IFwiUGl4ZWxTaGFkZXJcIildID0gc2hhZGVyU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdsdGZSdW50aW1lLmxvYWRlZFNoYWRlckNvdW50ID09PSBnbHRmUnVudGltZS5zaGFkZXJzY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBUb29scy5FcnJvcihcIkVycm9yIHdoZW4gbG9hZGluZyBzaGFkZXIgcHJvZ3JhbSBuYW1lZCBcIiArIHNoYSArIFwiIGxvY2F0ZWQgYXQgXCIgKyBzaGFkZXIudXJpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHNoYSBpbiBnbHRmUnVudGltZS5zaGFkZXJzKSB7XHJcbiAgICAgICAgICAgIGhhc1NoYWRlcnMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2hhZGVyOiBJR0xURlNoYWRlciA9IGdsdGZSdW50aW1lLnNoYWRlcnNbc2hhXTtcclxuICAgICAgICAgICAgaWYgKHNoYWRlcikge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc1NoYWRlci5iaW5kKHRoaXMsIHNoYSwgc2hhZGVyKSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJObyBzaGFkZXIgbmFtZWQ6IFwiICsgc2hhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFoYXNTaGFkZXJzKSB7XHJcbiAgICAgICAgICAgIG9ubG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2FkQnVmZmVyc0FzeW5jKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIG9uTG9hZDogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBoYXNCdWZmZXJzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2Nlc3NCdWZmZXIgPSAoYnVmOiBzdHJpbmcsIGJ1ZmZlcjogSUdMVEZCdWZmZXIpID0+IHtcclxuICAgICAgICAgICAgR0xURkxvYWRlckV4dGVuc2lvbi5Mb2FkQnVmZmVyQXN5bmMoXHJcbiAgICAgICAgICAgICAgICBnbHRmUnVudGltZSxcclxuICAgICAgICAgICAgICAgIGJ1ZixcclxuICAgICAgICAgICAgICAgIChidWZmZXJWaWV3KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2x0ZlJ1bnRpbWUubG9hZGVkQnVmZmVyQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlclZpZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1ZmZlclZpZXcuYnl0ZUxlbmd0aCAhPSBnbHRmUnVudGltZS5idWZmZXJzW2J1Zl0uYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJCdWZmZXIgbmFtZWQgXCIgKyBidWYgKyBcIiBpcyBsZW5ndGggXCIgKyBidWZmZXJWaWV3LmJ5dGVMZW5ndGggKyBcIi4gRXhwZWN0ZWQ6IFwiICsgYnVmZmVyLmJ5dGVMZW5ndGgpOyAvLyBJbXByb3ZlIGVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2x0ZlJ1bnRpbWUubG9hZGVkQnVmZmVyVmlld3NbYnVmXSA9IGJ1ZmZlclZpZXc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2x0ZlJ1bnRpbWUubG9hZGVkQnVmZmVyQ291bnQgPT09IGdsdGZSdW50aW1lLmJ1ZmZlcnNDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFRvb2xzLkVycm9yKFwiRXJyb3Igd2hlbiBsb2FkaW5nIGJ1ZmZlciBuYW1lZCBcIiArIGJ1ZiArIFwiIGxvY2F0ZWQgYXQgXCIgKyBidWZmZXIudXJpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGJ1ZiBpbiBnbHRmUnVudGltZS5idWZmZXJzKSB7XHJcbiAgICAgICAgICAgIGhhc0J1ZmZlcnMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnVmZmVyOiBJR0xURkJ1ZmZlciA9IGdsdGZSdW50aW1lLmJ1ZmZlcnNbYnVmXTtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc0J1ZmZlci5iaW5kKHRoaXMsIGJ1ZiwgYnVmZmVyKSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuRXJyb3IoXCJObyBidWZmZXIgbmFtZWQ6IFwiICsgYnVmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFoYXNCdWZmZXJzKSB7XHJcbiAgICAgICAgICAgIG9uTG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9jcmVhdGVOb2RlcyhnbHRmUnVudGltZTogSUdMVEZSdW50aW1lKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTY2VuZSA9IDxJR0xURlNjZW5lPmdsdGZSdW50aW1lLmN1cnJlbnRTY2VuZTtcclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnRTY2VuZSkge1xyXG4gICAgICAgICAgICAvLyBPbmx5IG9uZSBzY2VuZSBldmVuIGlmIG11bHRpcGxlIHNjZW5lcyBhcmUgZGVmaW5lZFxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTY2VuZS5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdHJhdmVyc2VOb2RlcyhnbHRmUnVudGltZSwgY3VycmVudFNjZW5lLm5vZGVzW2ldLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIExvYWQgYWxsIHNjZW5lc1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRoaW5nIGluIGdsdGZSdW50aW1lLnNjZW5lcykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFNjZW5lID0gPElHTFRGU2NlbmU+Z2x0ZlJ1bnRpbWUuc2NlbmVzW3RoaW5nXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTY2VuZS5ub2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYXZlcnNlTm9kZXMoZ2x0ZlJ1bnRpbWUsIGN1cnJlbnRTY2VuZS5ub2Rlc1tpXSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgYW4gb3ZlcnJpZGUgZm9yIGxvYWRpbmcgdGhlIHJ1bnRpbWVcclxuICAgICAqIFJldHVybiB0cnVlIHRvIHN0b3AgZnVydGhlciBleHRlbnNpb25zIGZyb20gbG9hZGluZyB0aGUgcnVudGltZVxyXG4gICAgICogQHBhcmFtIHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmxcclxuICAgICAqIEBwYXJhbSBvblN1Y2Nlc3NcclxuICAgICAqIEBwYXJhbSBvbkVycm9yXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlIHRvIHN0b3AgZnVydGhlciBleHRlbnNpb25zIGZyb20gbG9hZGluZyB0aGUgcnVudGltZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFJ1bnRpbWVBc3luYyhzY2VuZTogU2NlbmUsIGRhdGE6IElHTFRGTG9hZGVyRGF0YSwgcm9vdFVybDogc3RyaW5nLCBvblN1Y2Nlc3M/OiAoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSkgPT4gdm9pZCwgb25FcnJvcj86IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGFuIG9udmVycmlkZSBmb3IgY3JlYXRpbmcgZ2x0ZiBydW50aW1lXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSB0byBzdG9wIGZ1cnRoZXIgZXh0ZW5zaW9ucyBmcm9tIGNyZWF0aW5nIHRoZSBydW50aW1lXHJcbiAgICAgKiBAcGFyYW0gZ2x0ZlJ1bnRpbWVcclxuICAgICAqIEBwYXJhbSBvblN1Y2Nlc3NcclxuICAgICAqIEBwYXJhbSBvbkVycm9yXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlIHRvIHN0b3AgZnVydGhlciBleHRlbnNpb25zIGZyb20gY3JlYXRpbmcgdGhlIHJ1bnRpbWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRSdW50aW1lRXh0ZW5zaW9uc0FzeW5jKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIG9uU3VjY2VzczogKCkgPT4gdm9pZCwgb25FcnJvcj86IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGFuIG92ZXJyaWRlIGZvciBsb2FkaW5nIGJ1ZmZlcnNcclxuICAgICAqIFJldHVybiB0cnVlIHRvIHN0b3AgZnVydGhlciBleHRlbnNpb25zIGZyb20gbG9hZGluZyB0aGlzIGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIGdsdGZSdW50aW1lXHJcbiAgICAgKiBAcGFyYW0gaWRcclxuICAgICAqIEBwYXJhbSBvblN1Y2Nlc3NcclxuICAgICAqIEBwYXJhbSBvbkVycm9yXHJcbiAgICAgKiBAcGFyYW0gb25Qcm9ncmVzc1xyXG4gICAgICogQHJldHVybnMgdHJ1ZSB0byBzdG9wIGZ1cnRoZXIgZXh0ZW5zaW9ucyBmcm9tIGxvYWRpbmcgdGhpcyBidWZmZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRCdWZmZXJBc3luYyhcclxuICAgICAgICBnbHRmUnVudGltZTogSUdMVEZSdW50aW1lLFxyXG4gICAgICAgIGlkOiBzdHJpbmcsXHJcbiAgICAgICAgb25TdWNjZXNzOiAoYnVmZmVyOiBBcnJheUJ1ZmZlclZpZXcpID0+IHZvaWQsXHJcbiAgICAgICAgb25FcnJvcjogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCxcclxuICAgICAgICBvblByb2dyZXNzPzogKCkgPT4gdm9pZFxyXG4gICAgKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhbiBvdmVycmlkZSBmb3IgbG9hZGluZyB0ZXh0dXJlIGJ1ZmZlcnNcclxuICAgICAqIFJldHVybiB0cnVlIHRvIHN0b3AgZnVydGhlciBleHRlbnNpb25zIGZyb20gbG9hZGluZyB0aGlzIHRleHR1cmUgZGF0YVxyXG4gICAgICogQHBhcmFtIGdsdGZSdW50aW1lXHJcbiAgICAgKiBAcGFyYW0gaWRcclxuICAgICAqIEBwYXJhbSBvblN1Y2Nlc3NcclxuICAgICAqIEBwYXJhbSBvbkVycm9yXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlIHRvIHN0b3AgZnVydGhlciBleHRlbnNpb25zIGZyb20gbG9hZGluZyB0aGlzIHRleHR1cmUgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFRleHR1cmVCdWZmZXJBc3luYyhnbHRmUnVudGltZTogSUdMVEZSdW50aW1lLCBpZDogc3RyaW5nLCBvblN1Y2Nlc3M6IChidWZmZXI6IEFycmF5QnVmZmVyVmlldykgPT4gdm9pZCwgb25FcnJvcjogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgYW4gb3ZlcnJpZGUgZm9yIGNyZWF0aW5nIHRleHR1cmVzXHJcbiAgICAgKiBSZXR1cm4gdHJ1ZSB0byBzdG9wIGZ1cnRoZXIgZXh0ZW5zaW9ucyBmcm9tIGxvYWRpbmcgdGhpcyB0ZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0gZ2x0ZlJ1bnRpbWVcclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICogQHBhcmFtIGJ1ZmZlclxyXG4gICAgICogQHBhcmFtIG9uU3VjY2Vzc1xyXG4gICAgICogQHBhcmFtIG9uRXJyb3JcclxuICAgICAqIEByZXR1cm5zIHRydWUgdG8gc3RvcCBmdXJ0aGVyIGV4dGVuc2lvbnMgZnJvbSBsb2FkaW5nIHRoaXMgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlVGV4dHVyZUFzeW5jKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIGlkOiBzdHJpbmcsIGJ1ZmZlcjogQXJyYXlCdWZmZXJWaWV3LCBvblN1Y2Nlc3M6ICh0ZXh0dXJlOiBUZXh0dXJlKSA9PiB2b2lkLCBvbkVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhbiBvdmVycmlkZSBmb3IgbG9hZGluZyBzaGFkZXIgc3RyaW5nc1xyXG4gICAgICogUmV0dXJuIHRydWUgdG8gc3RvcCBmdXJ0aGVyIGV4dGVuc2lvbnMgZnJvbSBsb2FkaW5nIHRoaXMgc2hhZGVyIGRhdGFcclxuICAgICAqIEBwYXJhbSBnbHRmUnVudGltZVxyXG4gICAgICogQHBhcmFtIGlkXHJcbiAgICAgKiBAcGFyYW0gb25TdWNjZXNzXHJcbiAgICAgKiBAcGFyYW0gb25FcnJvclxyXG4gICAgICogQHJldHVybnMgdHJ1ZSB0byBzdG9wIGZ1cnRoZXIgZXh0ZW5zaW9ucyBmcm9tIGxvYWRpbmcgdGhpcyBzaGFkZXIgZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFNoYWRlclN0cmluZ0FzeW5jKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIGlkOiBzdHJpbmcsIG9uU3VjY2VzczogKHNoYWRlclN0cmluZzogc3RyaW5nKSA9PiB2b2lkLCBvbkVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBhbiBvdmVycmlkZSBmb3IgbG9hZGluZyBtYXRlcmlhbHNcclxuICAgICAqIFJldHVybiB0cnVlIHRvIHN0b3AgZnVydGhlciBleHRlbnNpb25zIGZyb20gbG9hZGluZyB0aGlzIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gZ2x0ZlJ1bnRpbWVcclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICogQHBhcmFtIG9uU3VjY2Vzc1xyXG4gICAgICogQHBhcmFtIG9uRXJyb3JcclxuICAgICAqIEByZXR1cm5zIHRydWUgdG8gc3RvcCBmdXJ0aGVyIGV4dGVuc2lvbnMgZnJvbSBsb2FkaW5nIHRoaXMgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRNYXRlcmlhbEFzeW5jKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIGlkOiBzdHJpbmcsIG9uU3VjY2VzczogKG1hdGVyaWFsOiBNYXRlcmlhbCkgPT4gdm9pZCwgb25FcnJvcjogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS1cclxuICAgIC8vIFV0aWxpdGllc1xyXG4gICAgLy8gLS0tLS0tLS0tXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkUnVudGltZUFzeW5jKFxyXG4gICAgICAgIHNjZW5lOiBTY2VuZSxcclxuICAgICAgICBkYXRhOiBJR0xURkxvYWRlckRhdGEsXHJcbiAgICAgICAgcm9vdFVybDogc3RyaW5nLFxyXG4gICAgICAgIG9uU3VjY2Vzcz86IChnbHRmUnVudGltZTogSUdMVEZSdW50aW1lKSA9PiB2b2lkLFxyXG4gICAgICAgIG9uRXJyb3I/OiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBHTFRGTG9hZGVyRXh0ZW5zaW9uLl9BcHBseUV4dGVuc2lvbnMoXHJcbiAgICAgICAgICAgIChsb2FkZXJFeHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2FkZXJFeHRlbnNpb24ubG9hZFJ1bnRpbWVBc3luYyhzY2VuZSwgZGF0YSwgcm9vdFVybCwgb25TdWNjZXNzLCBvbkVycm9yKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoR0xURkxvYWRlckJhc2UuQ3JlYXRlUnVudGltZShkYXRhLmpzb24sIHNjZW5lLCByb290VXJsKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkUnVudGltZUV4dGVuc2lvbnNBc3luYyhnbHRmUnVudGltZTogSUdMVEZSdW50aW1lLCBvblN1Y2Nlc3M6ICgpID0+IHZvaWQsIG9uRXJyb3I/OiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgR0xURkxvYWRlckV4dGVuc2lvbi5fQXBwbHlFeHRlbnNpb25zKFxyXG4gICAgICAgICAgICAobG9hZGVyRXh0ZW5zaW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZGVyRXh0ZW5zaW9uLmxvYWRSdW50aW1lRXh0ZW5zaW9uc0FzeW5jKGdsdGZSdW50aW1lLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIExvYWRCdWZmZXJBc3luYyhcclxuICAgICAgICBnbHRmUnVudGltZTogSUdMVEZSdW50aW1lLFxyXG4gICAgICAgIGlkOiBzdHJpbmcsXHJcbiAgICAgICAgb25TdWNjZXNzOiAoYnVmZmVyVmlldzogQXJyYXlCdWZmZXJWaWV3KSA9PiB2b2lkLFxyXG4gICAgICAgIG9uRXJyb3I6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQsXHJcbiAgICAgICAgb25Qcm9ncmVzcz86ICgpID0+IHZvaWRcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIEdMVEZMb2FkZXJFeHRlbnNpb24uX0FwcGx5RXh0ZW5zaW9ucyhcclxuICAgICAgICAgICAgKGxvYWRlckV4dGVuc2lvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRlckV4dGVuc2lvbi5sb2FkQnVmZmVyQXN5bmMoZ2x0ZlJ1bnRpbWUsIGlkLCBvblN1Y2Nlc3MsIG9uRXJyb3IsIG9uUHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHTFRGTG9hZGVyQmFzZS5Mb2FkQnVmZmVyQXN5bmMoZ2x0ZlJ1bnRpbWUsIGlkLCBvblN1Y2Nlc3MsIG9uRXJyb3IsIG9uUHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIExvYWRUZXh0dXJlQXN5bmMoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSwgaWQ6IHN0cmluZywgb25TdWNjZXNzOiAodGV4dHVyZTogVGV4dHVyZSkgPT4gdm9pZCwgb25FcnJvcjogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIEdMVEZMb2FkZXJFeHRlbnNpb24uX0xvYWRUZXh0dXJlQnVmZmVyQXN5bmMoXHJcbiAgICAgICAgICAgIGdsdGZSdW50aW1lLFxyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgKGJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIEdMVEZMb2FkZXJFeHRlbnNpb24uX0NyZWF0ZVRleHR1cmVBc3luYyhnbHRmUnVudGltZSwgaWQsIGJ1ZmZlciwgb25TdWNjZXNzLCBvbkVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25FcnJvclxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkU2hhZGVyU3RyaW5nQXN5bmMoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSwgaWQ6IHN0cmluZywgb25TdWNjZXNzOiAoc2hhZGVyRGF0YTogc3RyaW5nIHwgQXJyYXlCdWZmZXIpID0+IHZvaWQsIG9uRXJyb3I6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBHTFRGTG9hZGVyRXh0ZW5zaW9uLl9BcHBseUV4dGVuc2lvbnMoXHJcbiAgICAgICAgICAgIChsb2FkZXJFeHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2FkZXJFeHRlbnNpb24ubG9hZFNoYWRlclN0cmluZ0FzeW5jKGdsdGZSdW50aW1lLCBpZCwgb25TdWNjZXNzLCBvbkVycm9yKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR0xURkxvYWRlckJhc2UuTG9hZFNoYWRlclN0cmluZ0FzeW5jKGdsdGZSdW50aW1lLCBpZCwgb25TdWNjZXNzLCBvbkVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkTWF0ZXJpYWxBc3luYyhnbHRmUnVudGltZTogSUdMVEZSdW50aW1lLCBpZDogc3RyaW5nLCBvblN1Y2Nlc3M6IChtYXRlcmlhbDogTWF0ZXJpYWwpID0+IHZvaWQsIG9uRXJyb3I6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBHTFRGTG9hZGVyRXh0ZW5zaW9uLl9BcHBseUV4dGVuc2lvbnMoXHJcbiAgICAgICAgICAgIChsb2FkZXJFeHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2FkZXJFeHRlbnNpb24ubG9hZE1hdGVyaWFsQXN5bmMoZ2x0ZlJ1bnRpbWUsIGlkLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHTFRGTG9hZGVyQmFzZS5Mb2FkTWF0ZXJpYWxBc3luYyhnbHRmUnVudGltZSwgaWQsIG9uU3VjY2Vzcywgb25FcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9Mb2FkVGV4dHVyZUJ1ZmZlckFzeW5jKFxyXG4gICAgICAgIGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsXHJcbiAgICAgICAgaWQ6IHN0cmluZyxcclxuICAgICAgICBvblN1Y2Nlc3M6IChidWZmZXI6IE51bGxhYmxlPEFycmF5QnVmZmVyVmlldz4pID0+IHZvaWQsXHJcbiAgICAgICAgb25FcnJvcjogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgR0xURkxvYWRlckV4dGVuc2lvbi5fQXBwbHlFeHRlbnNpb25zKFxyXG4gICAgICAgICAgICAobG9hZGVyRXh0ZW5zaW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZGVyRXh0ZW5zaW9uLmxvYWRUZXh0dXJlQnVmZmVyQXN5bmMoZ2x0ZlJ1bnRpbWUsIGlkLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHTFRGTG9hZGVyQmFzZS5Mb2FkVGV4dHVyZUJ1ZmZlckFzeW5jKGdsdGZSdW50aW1lLCBpZCwgb25TdWNjZXNzLCBvbkVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0NyZWF0ZVRleHR1cmVBc3luYyhcclxuICAgICAgICBnbHRmUnVudGltZTogSUdMVEZSdW50aW1lLFxyXG4gICAgICAgIGlkOiBzdHJpbmcsXHJcbiAgICAgICAgYnVmZmVyOiBBcnJheUJ1ZmZlclZpZXcsXHJcbiAgICAgICAgb25TdWNjZXNzOiAodGV4dHVyZTogVGV4dHVyZSkgPT4gdm9pZCxcclxuICAgICAgICBvbkVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBHTFRGTG9hZGVyRXh0ZW5zaW9uLl9BcHBseUV4dGVuc2lvbnMoXHJcbiAgICAgICAgICAgIChsb2FkZXJFeHRlbnNpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2FkZXJFeHRlbnNpb24uY3JlYXRlVGV4dHVyZUFzeW5jKGdsdGZSdW50aW1lLCBpZCwgYnVmZmVyLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHTFRGTG9hZGVyQmFzZS5DcmVhdGVUZXh0dXJlQXN5bmMoZ2x0ZlJ1bnRpbWUsIGlkLCBidWZmZXIsIG9uU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9BcHBseUV4dGVuc2lvbnMoZnVuYzogKGxvYWRlckV4dGVuc2lvbjogR0xURkxvYWRlckV4dGVuc2lvbikgPT4gYm9vbGVhbiwgZGVmYXVsdEZ1bmM6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGV4dGVuc2lvbk5hbWUgaW4gR0xURkxvYWRlci5FeHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvYWRlckV4dGVuc2lvbiA9IEdMVEZMb2FkZXIuRXh0ZW5zaW9uc1tleHRlbnNpb25OYW1lXTtcclxuICAgICAgICAgICAgaWYgKGZ1bmMobG9hZGVyRXh0ZW5zaW9uKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWZhdWx0RnVuYygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5HTFRGRmlsZUxvYWRlci5fQ3JlYXRlR0xURjFMb2FkZXIgPSAoKSA9PiBuZXcgR0xURkxvYWRlcigpO1xyXG4iLCJpbXBvcnQgdHlwZSB7IEFzc2V0Q29udGFpbmVyIH0gZnJvbSBcImNvcmUvYXNzZXRDb250YWluZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBCb25lIH0gZnJvbSBcImNvcmUvQm9uZXMvYm9uZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNrZWxldG9uIH0gZnJvbSBcImNvcmUvQm9uZXMvc2tlbGV0b25cIjtcclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOb2RlIH0gZnJvbSBcImNvcmUvbm9kZVwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcblxyXG4vKipcclxuICogRW51bXNcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5leHBvcnQgZW51bSBFQ29tcG9uZW50VHlwZSB7XHJcbiAgICBCWVRFID0gNTEyMCxcclxuICAgIFVOU0lHTkVEX0JZVEUgPSA1MTIxLFxyXG4gICAgU0hPUlQgPSA1MTIyLFxyXG4gICAgVU5TSUdORURfU0hPUlQgPSA1MTIzLFxyXG4gICAgRkxPQVQgPSA1MTI2LFxyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBlbnVtIEVTaGFkZXJUeXBlIHtcclxuICAgIEZSQUdNRU5UID0gMzU2MzIsXHJcbiAgICBWRVJURVggPSAzNTYzMyxcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgZW51bSBFUGFyYW1ldGVyVHlwZSB7XHJcbiAgICBCWVRFID0gNTEyMCxcclxuICAgIFVOU0lHTkVEX0JZVEUgPSA1MTIxLFxyXG4gICAgU0hPUlQgPSA1MTIyLFxyXG4gICAgVU5TSUdORURfU0hPUlQgPSA1MTIzLFxyXG4gICAgSU5UID0gNTEyNCxcclxuICAgIFVOU0lHTkVEX0lOVCA9IDUxMjUsXHJcbiAgICBGTE9BVCA9IDUxMjYsXHJcbiAgICBGTE9BVF9WRUMyID0gMzU2NjQsXHJcbiAgICBGTE9BVF9WRUMzID0gMzU2NjUsXHJcbiAgICBGTE9BVF9WRUM0ID0gMzU2NjYsXHJcbiAgICBJTlRfVkVDMiA9IDM1NjY3LFxyXG4gICAgSU5UX1ZFQzMgPSAzNTY2OCxcclxuICAgIElOVF9WRUM0ID0gMzU2NjksXHJcbiAgICBCT09MID0gMzU2NzAsXHJcbiAgICBCT09MX1ZFQzIgPSAzNTY3MSxcclxuICAgIEJPT0xfVkVDMyA9IDM1NjcyLFxyXG4gICAgQk9PTF9WRUM0ID0gMzU2NzMsXHJcbiAgICBGTE9BVF9NQVQyID0gMzU2NzQsXHJcbiAgICBGTE9BVF9NQVQzID0gMzU2NzUsXHJcbiAgICBGTE9BVF9NQVQ0ID0gMzU2NzYsXHJcbiAgICBTQU1QTEVSXzJEID0gMzU2NzgsXHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGVudW0gRVRleHR1cmVXcmFwTW9kZSB7XHJcbiAgICBDTEFNUF9UT19FREdFID0gMzMwNzEsXHJcbiAgICBNSVJST1JFRF9SRVBFQVQgPSAzMzY0OCxcclxuICAgIFJFUEVBVCA9IDEwNDk3LFxyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBlbnVtIEVUZXh0dXJlRmlsdGVyVHlwZSB7XHJcbiAgICBORUFSRVNUID0gOTcyOCxcclxuICAgIExJTkVBUiA9IDk3MjgsXHJcbiAgICBORUFSRVNUX01JUE1BUF9ORUFSRVNUID0gOTk4NCxcclxuICAgIExJTkVBUl9NSVBNQVBfTkVBUkVTVCA9IDk5ODUsXHJcbiAgICBORUFSRVNUX01JUE1BUF9MSU5FQVIgPSA5OTg2LFxyXG4gICAgTElORUFSX01JUE1BUF9MSU5FQVIgPSA5OTg3LFxyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBlbnVtIEVUZXh0dXJlRm9ybWF0IHtcclxuICAgIEFMUEhBID0gNjQwNixcclxuICAgIFJHQiA9IDY0MDcsXHJcbiAgICBSR0JBID0gNjQwOCxcclxuICAgIExVTUlOQU5DRSA9IDY0MDksXHJcbiAgICBMVU1JTkFOQ0VfQUxQSEEgPSA2NDEwLFxyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBlbnVtIEVDdWxsaW5nVHlwZSB7XHJcbiAgICBGUk9OVCA9IDEwMjgsXHJcbiAgICBCQUNLID0gMTAyOSxcclxuICAgIEZST05UX0FORF9CQUNLID0gMTAzMixcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgZW51bSBFQmxlbmRpbmdGdW5jdGlvbiB7XHJcbiAgICBaRVJPID0gMCxcclxuICAgIE9ORSA9IDEsXHJcbiAgICBTUkNfQ09MT1IgPSA3NjgsXHJcbiAgICBPTkVfTUlOVVNfU1JDX0NPTE9SID0gNzY5LFxyXG4gICAgRFNUX0NPTE9SID0gNzc0LFxyXG4gICAgT05FX01JTlVTX0RTVF9DT0xPUiA9IDc3NSxcclxuICAgIFNSQ19BTFBIQSA9IDc3MCxcclxuICAgIE9ORV9NSU5VU19TUkNfQUxQSEEgPSA3NzEsXHJcbiAgICBEU1RfQUxQSEEgPSA3NzIsXHJcbiAgICBPTkVfTUlOVVNfRFNUX0FMUEhBID0gNzczLFxyXG4gICAgQ09OU1RBTlRfQ09MT1IgPSAzMjc2OSxcclxuICAgIE9ORV9NSU5VU19DT05TVEFOVF9DT0xPUiA9IDMyNzcwLFxyXG4gICAgQ09OU1RBTlRfQUxQSEEgPSAzMjc3MSxcclxuICAgIE9ORV9NSU5VU19DT05TVEFOVF9BTFBIQSA9IDMyNzcyLFxyXG4gICAgU1JDX0FMUEhBX1NBVFVSQVRFID0gNzc2LFxyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZQcm9wZXJ0eSB7XHJcbiAgICBleHRlbnNpb25zPzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcclxuICAgIGV4dHJhcz86IE9iamVjdDtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGQ2hpbGRSb290UHJvcGVydHkgZXh0ZW5kcyBJR0xURlByb3BlcnR5IHtcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkFjY2Vzc29yIGV4dGVuZHMgSUdMVEZDaGlsZFJvb3RQcm9wZXJ0eSB7XHJcbiAgICBidWZmZXJWaWV3OiBzdHJpbmc7XHJcbiAgICBieXRlT2Zmc2V0OiBudW1iZXI7XHJcbiAgICBieXRlU3RyaWRlOiBudW1iZXI7XHJcbiAgICBjb3VudDogbnVtYmVyO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgY29tcG9uZW50VHlwZTogRUNvbXBvbmVudFR5cGU7XHJcblxyXG4gICAgbWF4PzogbnVtYmVyW107XHJcbiAgICBtaW4/OiBudW1iZXJbXTtcclxuICAgIG5hbWU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkJ1ZmZlclZpZXcgZXh0ZW5kcyBJR0xURkNoaWxkUm9vdFByb3BlcnR5IHtcclxuICAgIGJ1ZmZlcjogc3RyaW5nO1xyXG4gICAgYnl0ZU9mZnNldDogbnVtYmVyO1xyXG4gICAgYnl0ZUxlbmd0aDogbnVtYmVyO1xyXG4gICAgYnl0ZVN0cmlkZTogbnVtYmVyO1xyXG5cclxuICAgIHRhcmdldD86IG51bWJlcjtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGQnVmZmVyIGV4dGVuZHMgSUdMVEZDaGlsZFJvb3RQcm9wZXJ0eSB7XHJcbiAgICB1cmk6IHN0cmluZztcclxuXHJcbiAgICBieXRlTGVuZ3RoPzogbnVtYmVyO1xyXG4gICAgdHlwZT86IHN0cmluZztcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGU2hhZGVyIGV4dGVuZHMgSUdMVEZDaGlsZFJvb3RQcm9wZXJ0eSB7XHJcbiAgICB1cmk6IHN0cmluZztcclxuICAgIHR5cGU6IEVTaGFkZXJUeXBlO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZQcm9ncmFtIGV4dGVuZHMgSUdMVEZDaGlsZFJvb3RQcm9wZXJ0eSB7XHJcbiAgICBhdHRyaWJ1dGVzOiBzdHJpbmdbXTtcclxuICAgIGZyYWdtZW50U2hhZGVyOiBzdHJpbmc7XHJcbiAgICB2ZXJ0ZXhTaGFkZXI6IHN0cmluZztcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGVGVjaG5pcXVlUGFyYW1ldGVyIHtcclxuICAgIHR5cGU6IG51bWJlcjtcclxuXHJcbiAgICBjb3VudD86IG51bWJlcjtcclxuICAgIHNlbWFudGljPzogc3RyaW5nO1xyXG4gICAgbm9kZT86IHN0cmluZztcclxuICAgIHZhbHVlPzogbnVtYmVyIHwgYm9vbGVhbiB8IHN0cmluZyB8IEFycmF5PGFueT47XHJcbiAgICBzb3VyY2U/OiBzdHJpbmc7XHJcblxyXG4gICAgYmFieWxvblZhbHVlPzogYW55O1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZUZWNobmlxdWVDb21tb25Qcm9maWxlIHtcclxuICAgIGxpZ2h0aW5nTW9kZWw6IHN0cmluZztcclxuICAgIHRleGNvb3JkQmluZGluZ3M6IE9iamVjdDtcclxuXHJcbiAgICBwYXJhbWV0ZXJzPzogQXJyYXk8YW55PjtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGVGVjaG5pcXVlU3RhdGVzRnVuY3Rpb25zIHtcclxuICAgIGJsZW5kQ29sb3I/OiBudW1iZXJbXTtcclxuICAgIGJsZW5kRXF1YXRpb25TZXBhcmF0ZT86IG51bWJlcltdO1xyXG4gICAgYmxlbmRGdW5jU2VwYXJhdGU/OiBudW1iZXJbXTtcclxuICAgIGNvbG9yTWFzazogYm9vbGVhbltdO1xyXG4gICAgY3VsbEZhY2U6IG51bWJlcltdO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZUZWNobmlxdWVTdGF0ZXMge1xyXG4gICAgZW5hYmxlOiBudW1iZXJbXTtcclxuICAgIGZ1bmN0aW9uczogSUdMVEZUZWNobmlxdWVTdGF0ZXNGdW5jdGlvbnM7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURlRlY2huaXF1ZSBleHRlbmRzIElHTFRGQ2hpbGRSb290UHJvcGVydHkge1xyXG4gICAgcGFyYW1ldGVyczogeyBba2V5OiBzdHJpbmddOiBJR0xURlRlY2huaXF1ZVBhcmFtZXRlciB9O1xyXG4gICAgcHJvZ3JhbTogc3RyaW5nO1xyXG5cclxuICAgIGF0dHJpYnV0ZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICB1bmlmb3JtczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICAgIHN0YXRlczogSUdMVEZUZWNobmlxdWVTdGF0ZXM7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURk1hdGVyaWFsIGV4dGVuZHMgSUdMVEZDaGlsZFJvb3RQcm9wZXJ0eSB7XHJcbiAgICB0ZWNobmlxdWU/OiBzdHJpbmc7XHJcbiAgICB2YWx1ZXM6IHN0cmluZ1tdO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZNZXNoUHJpbWl0aXZlIGV4dGVuZHMgSUdMVEZQcm9wZXJ0eSB7XHJcbiAgICBhdHRyaWJ1dGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gICAgaW5kaWNlczogc3RyaW5nO1xyXG4gICAgbWF0ZXJpYWw6IHN0cmluZztcclxuXHJcbiAgICBtb2RlPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZNZXNoIGV4dGVuZHMgSUdMVEZDaGlsZFJvb3RQcm9wZXJ0eSB7XHJcbiAgICBwcmltaXRpdmVzOiBJR0xURk1lc2hQcmltaXRpdmVbXTtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGSW1hZ2UgZXh0ZW5kcyBJR0xURkNoaWxkUm9vdFByb3BlcnR5IHtcclxuICAgIHVyaTogc3RyaW5nO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZTYW1wbGVyIGV4dGVuZHMgSUdMVEZDaGlsZFJvb3RQcm9wZXJ0eSB7XHJcbiAgICBtYWdGaWx0ZXI/OiBudW1iZXI7XHJcbiAgICBtaW5GaWx0ZXI/OiBudW1iZXI7XHJcbiAgICB3cmFwUz86IG51bWJlcjtcclxuICAgIHdyYXBUPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZUZXh0dXJlIGV4dGVuZHMgSUdMVEZDaGlsZFJvb3RQcm9wZXJ0eSB7XHJcbiAgICBzYW1wbGVyOiBzdHJpbmc7XHJcbiAgICBzb3VyY2U6IHN0cmluZztcclxuXHJcbiAgICBmb3JtYXQ/OiBFVGV4dHVyZUZvcm1hdDtcclxuICAgIGludGVybmFsRm9ybWF0PzogRVRleHR1cmVGb3JtYXQ7XHJcbiAgICB0YXJnZXQ/OiBudW1iZXI7XHJcbiAgICB0eXBlPzogbnVtYmVyO1xyXG5cclxuICAgIC8vIEJhYnlsb24uanMgdmFsdWVzIChvcHRpbWl6ZSlcclxuICAgIGJhYnlsb25UZXh0dXJlPzogVGV4dHVyZTtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGQW1iaWVuTGlnaHQge1xyXG4gICAgY29sb3I/OiBudW1iZXJbXTtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGRGlyZWN0aW9uYWxMaWdodCB7XHJcbiAgICBjb2xvcj86IG51bWJlcltdO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZQb2ludExpZ2h0IHtcclxuICAgIGNvbG9yPzogbnVtYmVyW107XHJcbiAgICBjb25zdGFudEF0dGVudWF0aW9uPzogbnVtYmVyO1xyXG4gICAgbGluZWFyQXR0ZW51YXRpb24/OiBudW1iZXI7XHJcbiAgICBxdWFkcmF0aWNBdHRlbnVhdGlvbj86IG51bWJlcjtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGU3BvdExpZ2h0IHtcclxuICAgIGNvbG9yPzogbnVtYmVyW107XHJcbiAgICBjb25zdGFudEF0dGVudWF0aW9uPzogbnVtYmVyO1xyXG4gICAgZmFsbE9mQW5nbGU/OiBudW1iZXI7XHJcbiAgICBmYWxsT2ZmRXhwb25lbnQ/OiBudW1iZXI7XHJcbiAgICBsaW5lYXJBdHRlbnVhdGlvbj86IG51bWJlcjtcclxuICAgIHF1YWRyYXRpY0F0dGVudWF0aW9uPzogbnVtYmVyO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZMaWdodCBleHRlbmRzIElHTFRGQ2hpbGRSb290UHJvcGVydHkge1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZDYW1lcmFPcnRob2dyYXBoaWMge1xyXG4gICAgeG1hZzogbnVtYmVyO1xyXG4gICAgeW1hZzogbnVtYmVyO1xyXG4gICAgemZhcjogbnVtYmVyO1xyXG4gICAgem5lYXI6IG51bWJlcjtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGQ2FtZXJhUGVyc3BlY3RpdmUge1xyXG4gICAgYXNwZWN0UmF0aW86IG51bWJlcjtcclxuICAgIHlmb3Y6IG51bWJlcjtcclxuICAgIHpmYXI6IG51bWJlcjtcclxuICAgIHpuZWFyOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkNhbWVyYSBleHRlbmRzIElHTFRGQ2hpbGRSb290UHJvcGVydHkge1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZBbmltYXRpb25DaGFubmVsVGFyZ2V0IHtcclxuICAgIGlkOiBzdHJpbmc7XHJcbiAgICBwYXRoOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkFuaW1hdGlvbkNoYW5uZWwge1xyXG4gICAgc2FtcGxlcjogc3RyaW5nO1xyXG4gICAgdGFyZ2V0OiBJR0xURkFuaW1hdGlvbkNoYW5uZWxUYXJnZXQ7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkFuaW1hdGlvblNhbXBsZXIge1xyXG4gICAgaW5wdXQ6IHN0cmluZztcclxuICAgIG91dHB1dDogc3RyaW5nO1xyXG5cclxuICAgIGludGVycG9sYXRpb24/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkFuaW1hdGlvbiBleHRlbmRzIElHTFRGQ2hpbGRSb290UHJvcGVydHkge1xyXG4gICAgY2hhbm5lbHM/OiBJR0xURkFuaW1hdGlvbkNoYW5uZWxbXTtcclxuICAgIHBhcmFtZXRlcnM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gICAgc2FtcGxlcnM/OiB7IFtrZXk6IHN0cmluZ106IElHTFRGQW5pbWF0aW9uU2FtcGxlciB9O1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZOb2RlSW5zdGFuY2VTa2luIHtcclxuICAgIHNrZWxldG9uczogc3RyaW5nW107XHJcbiAgICBza2luOiBzdHJpbmc7XHJcbiAgICBtZXNoZXM6IHN0cmluZ1tdO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZTa2lucyBleHRlbmRzIElHTFRGQ2hpbGRSb290UHJvcGVydHkge1xyXG4gICAgYmluZFNoYXBlTWF0cml4OiBudW1iZXJbXTtcclxuICAgIGludmVyc2VCaW5kTWF0cmljZXM6IHN0cmluZztcclxuICAgIGpvaW50TmFtZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIGJhYnlsb25Ta2VsZXRvbj86IFNrZWxldG9uO1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZOb2RlIGV4dGVuZHMgSUdMVEZDaGlsZFJvb3RQcm9wZXJ0eSB7XHJcbiAgICBjYW1lcmE/OiBzdHJpbmc7XHJcbiAgICBjaGlsZHJlbjogc3RyaW5nW107XHJcbiAgICBza2luPzogc3RyaW5nO1xyXG4gICAgam9pbnROYW1lPzogc3RyaW5nO1xyXG4gICAgbGlnaHQ/OiBzdHJpbmc7XHJcbiAgICBtYXRyaXg6IG51bWJlcltdO1xyXG4gICAgbWVzaD86IHN0cmluZztcclxuICAgIG1lc2hlcz86IHN0cmluZ1tdO1xyXG4gICAgcm90YXRpb24/OiBudW1iZXJbXTtcclxuICAgIHNjYWxlPzogbnVtYmVyW107XHJcbiAgICB0cmFuc2xhdGlvbj86IG51bWJlcltdO1xyXG5cclxuICAgIC8vIEJhYnlsb24uanMgdmFsdWVzIChvcHRpbWl6ZSlcclxuICAgIGJhYnlsb25Ob2RlPzogTm9kZTtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGU2NlbmUgZXh0ZW5kcyBJR0xURkNoaWxkUm9vdFByb3BlcnR5IHtcclxuICAgIG5vZGVzOiBzdHJpbmdbXTtcclxufVxyXG5cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGUnVudGltZSB7XHJcbiAgICBleHRlbnNpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xyXG4gICAgYWNjZXNzb3JzOiB7IFtrZXk6IHN0cmluZ106IElHTFRGQWNjZXNzb3IgfTtcclxuICAgIGJ1ZmZlcnM6IHsgW2tleTogc3RyaW5nXTogSUdMVEZCdWZmZXIgfTtcclxuICAgIGJ1ZmZlclZpZXdzOiB7IFtrZXk6IHN0cmluZ106IElHTFRGQnVmZmVyVmlldyB9O1xyXG4gICAgbWVzaGVzOiB7IFtrZXk6IHN0cmluZ106IElHTFRGTWVzaCB9O1xyXG4gICAgbGlnaHRzOiB7IFtrZXk6IHN0cmluZ106IElHTFRGTGlnaHQgfTtcclxuICAgIGNhbWVyYXM6IHsgW2tleTogc3RyaW5nXTogSUdMVEZDYW1lcmEgfTtcclxuICAgIG5vZGVzOiB7IFtrZXk6IHN0cmluZ106IElHTFRGTm9kZSB9O1xyXG4gICAgaW1hZ2VzOiB7IFtrZXk6IHN0cmluZ106IElHTFRGSW1hZ2UgfTtcclxuICAgIHRleHR1cmVzOiB7IFtrZXk6IHN0cmluZ106IElHTFRGVGV4dHVyZSB9O1xyXG4gICAgc2hhZGVyczogeyBba2V5OiBzdHJpbmddOiBJR0xURlNoYWRlciB9O1xyXG4gICAgcHJvZ3JhbXM6IHsgW2tleTogc3RyaW5nXTogSUdMVEZQcm9ncmFtIH07XHJcbiAgICBzYW1wbGVyczogeyBba2V5OiBzdHJpbmddOiBJR0xURlNhbXBsZXIgfTtcclxuICAgIHRlY2huaXF1ZXM6IHsgW2tleTogc3RyaW5nXTogSUdMVEZUZWNobmlxdWUgfTtcclxuICAgIG1hdGVyaWFsczogeyBba2V5OiBzdHJpbmddOiBJR0xURk1hdGVyaWFsIH07XHJcbiAgICBhbmltYXRpb25zOiB7IFtrZXk6IHN0cmluZ106IElHTFRGQW5pbWF0aW9uIH07XHJcbiAgICBza2luczogeyBba2V5OiBzdHJpbmddOiBJR0xURlNraW5zIH07XHJcblxyXG4gICAgY3VycmVudFNjZW5lPzogT2JqZWN0O1xyXG4gICAgc2NlbmVzOiB7IFtrZXk6IHN0cmluZ106IElHTFRGU2NlbmUgfTsgLy8gdjEuMVxyXG5cclxuICAgIGV4dGVuc2lvbnNVc2VkOiBzdHJpbmdbXTtcclxuICAgIGV4dGVuc2lvbnNSZXF1aXJlZD86IHN0cmluZ1tdOyAvLyB2MS4xXHJcblxyXG4gICAgYnVmZmVyc0NvdW50OiBudW1iZXI7XHJcbiAgICBzaGFkZXJzY291bnQ6IG51bWJlcjtcclxuXHJcbiAgICBzY2VuZTogU2NlbmU7XHJcbiAgICByb290VXJsOiBzdHJpbmc7XHJcblxyXG4gICAgbG9hZGVkQnVmZmVyQ291bnQ6IG51bWJlcjtcclxuICAgIGxvYWRlZEJ1ZmZlclZpZXdzOiB7IFtuYW1lOiBzdHJpbmddOiBBcnJheUJ1ZmZlclZpZXcgfTtcclxuXHJcbiAgICBsb2FkZWRTaGFkZXJDb3VudDogbnVtYmVyO1xyXG5cclxuICAgIGltcG9ydE9ubHlNZXNoZXM6IGJvb2xlYW47XHJcbiAgICBpbXBvcnRNZXNoZXNOYW1lcz86IHN0cmluZ1tdO1xyXG5cclxuICAgIGR1bW15Tm9kZXM6IE5vZGVbXTtcclxuXHJcbiAgICBhc3NldENvbnRhaW5lcjogTnVsbGFibGU8QXNzZXRDb250YWluZXI+O1xyXG59XHJcblxyXG4vKiogQGludGVybmFsICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU5vZGVUb1Jvb3Qge1xyXG4gICAgYm9uZTogQm9uZTtcclxuICAgIG5vZGU6IElHTFRGTm9kZTtcclxuICAgIGlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJSm9pbnROb2RlIHtcclxuICAgIG5vZGU6IElHTFRGTm9kZTtcclxuICAgIGlkOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHR5cGUgeyBJR0xURlRlY2huaXF1ZVBhcmFtZXRlciwgSUdMVEZBY2Nlc3NvciwgSUdMVEZSdW50aW1lLCBJR0xURkJ1ZmZlclZpZXcgfSBmcm9tIFwiLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBFUGFyYW1ldGVyVHlwZSwgRVRleHR1cmVXcmFwTW9kZSwgRVRleHR1cmVGaWx0ZXJUeXBlLCBFQ29tcG9uZW50VHlwZSB9IGZyb20gXCIuL2dsVEZMb2FkZXJJbnRlcmZhY2VzXCI7XHJcblxyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiwgVmVjdG9yMywgVmVjdG9yNCwgTWF0cml4IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgQ29sb3I0IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgeyBFZmZlY3QgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvZWZmZWN0XCI7XHJcbmltcG9ydCB7IFNoYWRlck1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3NoYWRlck1hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE5vZGUgfSBmcm9tIFwiY29yZS9ub2RlXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5cclxuLyoqXHJcbiAqIFV0aWxzIGZ1bmN0aW9ucyBmb3IgR0xURlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGRlcHJlY2F0ZWRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHTFRGVXRpbHMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBcInBhcmFtZXRlclwiIG1hdHJpeFxyXG4gICAgICogQHBhcmFtIHNjZW5lIHRoZSBTY2VuZSBvYmplY3RcclxuICAgICAqIEBwYXJhbSBzb3VyY2UgdGhlIHNvdXJjZSBub2RlIHdoZXJlIHRvIHBpY2sgdGhlIG1hdHJpeFxyXG4gICAgICogQHBhcmFtIHBhcmFtZXRlciB0aGUgR0xURiB0ZWNobmlxdWUgcGFyYW1ldGVyXHJcbiAgICAgKiBAcGFyYW0gdW5pZm9ybU5hbWUgdGhlIG5hbWUgb2YgdGhlIHNoYWRlcidzIHVuaWZvcm1cclxuICAgICAqIEBwYXJhbSBzaGFkZXJNYXRlcmlhbCB0aGUgc2hhZGVyIG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU2V0TWF0cml4KHNjZW5lOiBTY2VuZSwgc291cmNlOiBOb2RlLCBwYXJhbWV0ZXI6IElHTFRGVGVjaG5pcXVlUGFyYW1ldGVyLCB1bmlmb3JtTmFtZTogc3RyaW5nLCBzaGFkZXJNYXRlcmlhbDogU2hhZGVyTWF0ZXJpYWwgfCBFZmZlY3QpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbWF0OiBOdWxsYWJsZTxNYXRyaXg+ID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtZXRlci5zZW1hbnRpYyA9PT0gXCJNT0RFTFwiKSB7XHJcbiAgICAgICAgICAgIG1hdCA9IHNvdXJjZS5nZXRXb3JsZE1hdHJpeCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVyLnNlbWFudGljID09PSBcIlBST0pFQ1RJT05cIikge1xyXG4gICAgICAgICAgICBtYXQgPSBzY2VuZS5nZXRQcm9qZWN0aW9uTWF0cml4KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXIuc2VtYW50aWMgPT09IFwiVklFV1wiKSB7XHJcbiAgICAgICAgICAgIG1hdCA9IHNjZW5lLmdldFZpZXdNYXRyaXgoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlci5zZW1hbnRpYyA9PT0gXCJNT0RFTFZJRVdJTlZFUlNFVFJBTlNQT1NFXCIpIHtcclxuICAgICAgICAgICAgbWF0ID0gTWF0cml4LlRyYW5zcG9zZShzb3VyY2UuZ2V0V29ybGRNYXRyaXgoKS5tdWx0aXBseShzY2VuZS5nZXRWaWV3TWF0cml4KCkpLmludmVydCgpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlci5zZW1hbnRpYyA9PT0gXCJNT0RFTFZJRVdcIikge1xyXG4gICAgICAgICAgICBtYXQgPSBzb3VyY2UuZ2V0V29ybGRNYXRyaXgoKS5tdWx0aXBseShzY2VuZS5nZXRWaWV3TWF0cml4KCkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVyLnNlbWFudGljID09PSBcIk1PREVMVklFV1BST0pFQ1RJT05cIikge1xyXG4gICAgICAgICAgICBtYXQgPSBzb3VyY2UuZ2V0V29ybGRNYXRyaXgoKS5tdWx0aXBseShzY2VuZS5nZXRUcmFuc2Zvcm1NYXRyaXgoKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXIuc2VtYW50aWMgPT09IFwiTU9ERUxJTlZFUlNFXCIpIHtcclxuICAgICAgICAgICAgbWF0ID0gc291cmNlLmdldFdvcmxkTWF0cml4KCkuaW52ZXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXIuc2VtYW50aWMgPT09IFwiVklFV0lOVkVSU0VcIikge1xyXG4gICAgICAgICAgICBtYXQgPSBzY2VuZS5nZXRWaWV3TWF0cml4KCkuaW52ZXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXIuc2VtYW50aWMgPT09IFwiUFJPSkVDVElPTklOVkVSU0VcIikge1xyXG4gICAgICAgICAgICBtYXQgPSBzY2VuZS5nZXRQcm9qZWN0aW9uTWF0cml4KCkuaW52ZXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXIuc2VtYW50aWMgPT09IFwiTU9ERUxWSUVXSU5WRVJTRVwiKSB7XHJcbiAgICAgICAgICAgIG1hdCA9IHNvdXJjZS5nZXRXb3JsZE1hdHJpeCgpLm11bHRpcGx5KHNjZW5lLmdldFZpZXdNYXRyaXgoKSkuaW52ZXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXIuc2VtYW50aWMgPT09IFwiTU9ERUxWSUVXUFJPSkVDVElPTklOVkVSU0VcIikge1xyXG4gICAgICAgICAgICBtYXQgPSBzb3VyY2UuZ2V0V29ybGRNYXRyaXgoKS5tdWx0aXBseShzY2VuZS5nZXRUcmFuc2Zvcm1NYXRyaXgoKSkuaW52ZXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXIuc2VtYW50aWMgPT09IFwiTU9ERUxJTlZFUlNFVFJBTlNQT1NFXCIpIHtcclxuICAgICAgICAgICAgbWF0ID0gTWF0cml4LlRyYW5zcG9zZShzb3VyY2UuZ2V0V29ybGRNYXRyaXgoKS5pbnZlcnQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF0KSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGFyYW1ldGVyLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRVBhcmFtZXRlclR5cGUuRkxPQVRfTUFUMjpcclxuICAgICAgICAgICAgICAgICAgICBzaGFkZXJNYXRlcmlhbC5zZXRNYXRyaXgyeDIodW5pZm9ybU5hbWUsIE1hdHJpeC5HZXRBc01hdHJpeDJ4MihtYXQpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRVBhcmFtZXRlclR5cGUuRkxPQVRfTUFUMzpcclxuICAgICAgICAgICAgICAgICAgICBzaGFkZXJNYXRlcmlhbC5zZXRNYXRyaXgzeDModW5pZm9ybU5hbWUsIE1hdHJpeC5HZXRBc01hdHJpeDN4MyhtYXQpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRVBhcmFtZXRlclR5cGUuRkxPQVRfTUFUNDpcclxuICAgICAgICAgICAgICAgICAgICBzaGFkZXJNYXRlcmlhbC5zZXRNYXRyaXgodW5pZm9ybU5hbWUsIG1hdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2l2ZW4gXCJwYXJhbWV0ZXJcIiBtYXRyaXhcclxuICAgICAqIEBwYXJhbSBzaGFkZXJNYXRlcmlhbCB0aGUgc2hhZGVyIG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0gdW5pZm9ybSB0aGUgbmFtZSBvZiB0aGUgc2hhZGVyJ3MgdW5pZm9ybVxyXG4gICAgICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSBvZiB0aGUgdW5pZm9ybVxyXG4gICAgICogQHBhcmFtIHR5cGUgdGhlIHVuaWZvcm0ncyB0eXBlIChFUGFyYW1ldGVyVHlwZSBGTE9BVCwgVkVDMiwgVkVDMyBvciBWRUM0KVxyXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBzZXQsIGVsc2UgZmFsc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTZXRVbmlmb3JtKHNoYWRlck1hdGVyaWFsOiBTaGFkZXJNYXRlcmlhbCB8IEVmZmVjdCwgdW5pZm9ybTogc3RyaW5nLCB2YWx1ZTogYW55LCB0eXBlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBFUGFyYW1ldGVyVHlwZS5GTE9BVDpcclxuICAgICAgICAgICAgICAgIHNoYWRlck1hdGVyaWFsLnNldEZsb2F0KHVuaWZvcm0sIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBjYXNlIEVQYXJhbWV0ZXJUeXBlLkZMT0FUX1ZFQzI6XHJcbiAgICAgICAgICAgICAgICBzaGFkZXJNYXRlcmlhbC5zZXRWZWN0b3IyKHVuaWZvcm0sIFZlY3RvcjIuRnJvbUFycmF5KHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgY2FzZSBFUGFyYW1ldGVyVHlwZS5GTE9BVF9WRUMzOlxyXG4gICAgICAgICAgICAgICAgc2hhZGVyTWF0ZXJpYWwuc2V0VmVjdG9yMyh1bmlmb3JtLCBWZWN0b3IzLkZyb21BcnJheSh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGNhc2UgRVBhcmFtZXRlclR5cGUuRkxPQVRfVkVDNDpcclxuICAgICAgICAgICAgICAgIHNoYWRlck1hdGVyaWFsLnNldFZlY3RvcjQodW5pZm9ybSwgVmVjdG9yNC5Gcm9tQXJyYXkodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHdyYXAgbW9kZSBvZiB0aGUgdGV4dHVyZVxyXG4gICAgICogQHBhcmFtIG1vZGUgdGhlIG1vZGUgdmFsdWVcclxuICAgICAqIEByZXR1cm5zIHRoZSB3cmFwIG1vZGUgKFRFWFRVUkVfV1JBUF9BRERSRVNTTU9ERSwgTUlSUk9SX0FERFJFU1NNT0RFIG9yIENMQU1QX0FERFJFU1NNT0RFKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFdyYXBNb2RlKG1vZGU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRVRleHR1cmVXcmFwTW9kZS5DTEFNUF9UT19FREdFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmUuQ0xBTVBfQUREUkVTU01PREU7XHJcbiAgICAgICAgICAgIGNhc2UgRVRleHR1cmVXcmFwTW9kZS5NSVJST1JFRF9SRVBFQVQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcbiAgICAgICAgICAgIGNhc2UgRVRleHR1cmVXcmFwTW9kZS5SRVBFQVQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZS5XUkFQX0FERFJFU1NNT0RFO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmUuV1JBUF9BRERSRVNTTU9ERTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBieXRlIHN0cmlkZSBnaXZpbmcgYW4gYWNjZXNzb3JcclxuICAgICAqIEBwYXJhbSBhY2Nlc3NvciB0aGUgR0xURiBhY2Nlc3NvciBvYmpldFxyXG4gICAgICogQHJldHVybnMgdGhlIGJ5dGUgc3RyaWRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0Qnl0ZVN0cmlkZUZyb21UeXBlKGFjY2Vzc29yOiBJR0xURkFjY2Vzc29yKTogbnVtYmVyIHtcclxuICAgICAgICAvLyBOZWVkcyB0aGlzIGZ1bmN0aW9uIHNpbmNlIFwiYnl0ZVN0cmlkZVwiIGlzbid0IHJlcXVpZXJlZCBpbiBnbFRGIGZvcm1hdFxyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBhY2Nlc3Nvci50eXBlO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIlZFQzJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgICAgICBjYXNlIFwiVkVDM1wiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgICAgIGNhc2UgXCJWRUM0XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICAgICAgY2FzZSBcIk1BVDJcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiA0O1xyXG4gICAgICAgICAgICBjYXNlIFwiTUFUM1wiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDk7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNQVQ0XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTY7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0ZXh0dXJlIGZpbHRlciBtb2RlIGdpdmluZyBhIG1vZGUgdmFsdWVcclxuICAgICAqIEBwYXJhbSBtb2RlIHRoZSBmaWx0ZXIgbW9kZSB2YWx1ZVxyXG4gICAgICogQHJldHVybnMgdGhlIGZpbHRlciBtb2RlIChUT0RPIC0gbmVlZHMgdG8gYmUgYSB0eXBlPylcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXRUZXh0dXJlRmlsdGVyTW9kZShtb2RlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHN3aXRjaCAobW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIEVUZXh0dXJlRmlsdGVyVHlwZS5MSU5FQVI6XHJcbiAgICAgICAgICAgIGNhc2UgRVRleHR1cmVGaWx0ZXJUeXBlLkxJTkVBUl9NSVBNQVBfTkVBUkVTVDpcclxuICAgICAgICAgICAgY2FzZSBFVGV4dHVyZUZpbHRlclR5cGUuTElORUFSX01JUE1BUF9MSU5FQVI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZS5UUklMSU5FQVJfU0FNUExJTkdNT0RFO1xyXG4gICAgICAgICAgICBjYXNlIEVUZXh0dXJlRmlsdGVyVHlwZS5ORUFSRVNUOlxyXG4gICAgICAgICAgICBjYXNlIEVUZXh0dXJlRmlsdGVyVHlwZS5ORUFSRVNUX01JUE1BUF9ORUFSRVNUOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREU7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVGV4dHVyZS5CSUxJTkVBUl9TQU1QTElOR01PREU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0QnVmZmVyRnJvbUJ1ZmZlclZpZXcoXHJcbiAgICAgICAgZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSxcclxuICAgICAgICBidWZmZXJWaWV3OiBJR0xURkJ1ZmZlclZpZXcsXHJcbiAgICAgICAgYnl0ZU9mZnNldDogbnVtYmVyLFxyXG4gICAgICAgIGJ5dGVMZW5ndGg6IG51bWJlcixcclxuICAgICAgICBjb21wb25lbnRUeXBlOiBFQ29tcG9uZW50VHlwZVxyXG4gICAgKTogQXJyYXlCdWZmZXJWaWV3IHtcclxuICAgICAgICBieXRlT2Zmc2V0ID0gYnVmZmVyVmlldy5ieXRlT2Zmc2V0ICsgYnl0ZU9mZnNldDtcclxuXHJcbiAgICAgICAgY29uc3QgbG9hZGVkQnVmZmVyVmlldyA9IGdsdGZSdW50aW1lLmxvYWRlZEJ1ZmZlclZpZXdzW2J1ZmZlclZpZXcuYnVmZmVyXTtcclxuICAgICAgICBpZiAoYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGggPiBsb2FkZWRCdWZmZXJWaWV3LmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVmZmVyIGFjY2VzcyBpcyBvdXQgb2YgcmFuZ2VcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBidWZmZXIgPSBsb2FkZWRCdWZmZXJWaWV3LmJ1ZmZlcjtcclxuICAgICAgICBieXRlT2Zmc2V0ICs9IGxvYWRlZEJ1ZmZlclZpZXcuYnl0ZU9mZnNldDtcclxuXHJcbiAgICAgICAgc3dpdGNoIChjb21wb25lbnRUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRUNvbXBvbmVudFR5cGUuQllURTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50OEFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIGNhc2UgRUNvbXBvbmVudFR5cGUuVU5TSUdORURfQllURTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xyXG4gICAgICAgICAgICBjYXNlIEVDb21wb25lbnRUeXBlLlNIT1JUOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnQxNkFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIGNhc2UgRUNvbXBvbmVudFR5cGUuVU5TSUdORURfU0hPUlQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQxNkFycmF5KGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShidWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBidWZmZXIgZnJvbSBpdHMgYWNjZXNzb3JcclxuICAgICAqIEBwYXJhbSBnbHRmUnVudGltZSB0aGUgR0xURiBydW50aW1lXHJcbiAgICAgKiBAcGFyYW0gYWNjZXNzb3IgdGhlIEdMVEYgYWNjZXNzb3JcclxuICAgICAqIEByZXR1cm5zIGFuIGFycmF5IGJ1ZmZlciB2aWV3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0QnVmZmVyRnJvbUFjY2Vzc29yKGdsdGZSdW50aW1lOiBJR0xURlJ1bnRpbWUsIGFjY2Vzc29yOiBJR0xURkFjY2Vzc29yKTogYW55IHtcclxuICAgICAgICBjb25zdCBidWZmZXJWaWV3OiBJR0xURkJ1ZmZlclZpZXcgPSBnbHRmUnVudGltZS5idWZmZXJWaWV3c1thY2Nlc3Nvci5idWZmZXJWaWV3XTtcclxuICAgICAgICBjb25zdCBieXRlTGVuZ3RoID0gYWNjZXNzb3IuY291bnQgKiBHTFRGVXRpbHMuR2V0Qnl0ZVN0cmlkZUZyb21UeXBlKGFjY2Vzc29yKTtcclxuICAgICAgICByZXR1cm4gR0xURlV0aWxzLkdldEJ1ZmZlckZyb21CdWZmZXJWaWV3KGdsdGZSdW50aW1lLCBidWZmZXJWaWV3LCBhY2Nlc3Nvci5ieXRlT2Zmc2V0LCBieXRlTGVuZ3RoLCBhY2Nlc3Nvci5jb21wb25lbnRUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlY29kZXMgYSBidWZmZXIgdmlldyBpbnRvIGEgc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0gdmlldyB0aGUgYnVmZmVyIHZpZXdcclxuICAgICAqIEByZXR1cm5zIGEgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRGVjb2RlQnVmZmVyVG9UZXh0KHZpZXc6IEFycmF5QnVmZmVyVmlldyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdmlldy5ieXRlTGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCg8YW55PnZpZXcpW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkZWZhdWx0IG1hdGVyaWFsIG9mIGdsdGYuIFJlbGF0ZWQgdG9cclxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9LaHJvbm9zR3JvdXAvZ2xURi90cmVlL21hc3Rlci9zcGVjaWZpY2F0aW9uLzEuMCNhcHBlbmRpeC1hLWRlZmF1bHQtbWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBzY2VuZSB0aGUgQmFieWxvbi5qcyBzY2VuZVxyXG4gICAgICogQHJldHVybnMgdGhlIGRlZmF1bHQgQmFieWxvbiBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldERlZmF1bHRNYXRlcmlhbChzY2VuZTogU2NlbmUpOiBTaGFkZXJNYXRlcmlhbCB7XHJcbiAgICAgICAgaWYgKCFHTFRGVXRpbHMuX0RlZmF1bHRNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBFZmZlY3QuU2hhZGVyc1N0b3JlW1wiR0xURkRlZmF1bHRNYXRlcmlhbFZlcnRleFNoYWRlclwiXSA9IFtcclxuICAgICAgICAgICAgICAgIFwicHJlY2lzaW9uIGhpZ2hwIGZsb2F0O1wiLFxyXG4gICAgICAgICAgICAgICAgXCJcIixcclxuICAgICAgICAgICAgICAgIFwidW5pZm9ybSBtYXQ0IHdvcmxkVmlldztcIixcclxuICAgICAgICAgICAgICAgIFwidW5pZm9ybSBtYXQ0IHByb2plY3Rpb247XCIsXHJcbiAgICAgICAgICAgICAgICBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdHRyaWJ1dGUgdmVjMyBwb3NpdGlvbjtcIixcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInZvaWQgbWFpbih2b2lkKVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ7XCIsXHJcbiAgICAgICAgICAgICAgICBcIiAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb24gKiB3b3JsZFZpZXcgKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ9XCIsXHJcbiAgICAgICAgICAgIF0uam9pbihcIlxcblwiKTtcclxuXHJcbiAgICAgICAgICAgIEVmZmVjdC5TaGFkZXJzU3RvcmVbXCJHTFRGRGVmYXVsdE1hdGVyaWFsUGl4ZWxTaGFkZXJcIl0gPSBbXHJcbiAgICAgICAgICAgICAgICBcInByZWNpc2lvbiBoaWdocCBmbG9hdDtcIixcclxuICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuaWZvcm0gdmVjNCB1X2VtaXNzaW9uO1wiLFxyXG4gICAgICAgICAgICAgICAgXCJcIixcclxuICAgICAgICAgICAgICAgIFwidm9pZCBtYWluKHZvaWQpXCIsXHJcbiAgICAgICAgICAgICAgICBcIntcIixcclxuICAgICAgICAgICAgICAgIFwiICAgIGdsX0ZyYWdDb2xvciA9IHVfZW1pc3Npb247XCIsXHJcbiAgICAgICAgICAgICAgICBcIn1cIixcclxuICAgICAgICAgICAgXS5qb2luKFwiXFxuXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2hhZGVyUGF0aCA9IHtcclxuICAgICAgICAgICAgICAgIHZlcnRleDogXCJHTFRGRGVmYXVsdE1hdGVyaWFsXCIsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudDogXCJHTFRGRGVmYXVsdE1hdGVyaWFsXCIsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogW1wicG9zaXRpb25cIl0sXHJcbiAgICAgICAgICAgICAgICB1bmlmb3JtczogW1wid29ybGRWaWV3XCIsIFwicHJvamVjdGlvblwiLCBcInVfZW1pc3Npb25cIl0sXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyczogbmV3IEFycmF5PHN0cmluZz4oKSxcclxuICAgICAgICAgICAgICAgIG5lZWRBbHBoYUJsZW5kaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIEdMVEZVdGlscy5fRGVmYXVsdE1hdGVyaWFsID0gbmV3IFNoYWRlck1hdGVyaWFsKFwiR0xURkRlZmF1bHRNYXRlcmlhbFwiLCBzY2VuZSwgc2hhZGVyUGF0aCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIEdMVEZVdGlscy5fRGVmYXVsdE1hdGVyaWFsLnNldENvbG9yNChcInVfZW1pc3Npb25cIiwgbmV3IENvbG9yNCgwLjUsIDAuNSwgMC41LCAxLjApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBHTFRGVXRpbHMuX0RlZmF1bHRNYXRlcmlhbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGUgR0xURiBkZWZhdWx0IG1hdGVyaWFsXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRGVmYXVsdE1hdGVyaWFsOiBOdWxsYWJsZTxTaGFkZXJNYXRlcmlhbD4gPSBudWxsO1xyXG59XHJcbiIsImltcG9ydCB7IEdMVEZMb2FkZXJFeHRlbnNpb24sIEdMVEZMb2FkZXJCYXNlLCBHTFRGTG9hZGVyIH0gZnJvbSBcIi4vZ2xURkxvYWRlclwiO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBJR0xURlJ1bnRpbWUsIElHTFRGTWF0ZXJpYWwgfSBmcm9tIFwiLi9nbFRGTG9hZGVySW50ZXJmYWNlc1wiO1xyXG5cclxuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiY29yZS9NaXNjL3Rvb2xzXCI7XHJcbmltcG9ydCB7IE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsXCI7XHJcbmltcG9ydCB7IFN0YW5kYXJkTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvc3RhbmRhcmRNYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBIZW1pc3BoZXJpY0xpZ2h0IH0gZnJvbSBcImNvcmUvTGlnaHRzL2hlbWlzcGhlcmljTGlnaHRcIjtcclxuaW1wb3J0IHsgRGlyZWN0aW9uYWxMaWdodCB9IGZyb20gXCJjb3JlL0xpZ2h0cy9kaXJlY3Rpb25hbExpZ2h0XCI7XHJcbmltcG9ydCB7IFBvaW50TGlnaHQgfSBmcm9tIFwiY29yZS9MaWdodHMvcG9pbnRMaWdodFwiO1xyXG5pbXBvcnQgeyBTcG90TGlnaHQgfSBmcm9tIFwiY29yZS9MaWdodHMvc3BvdExpZ2h0XCI7XHJcblxyXG5pbnRlcmZhY2UgSUdMVEZNYXRlcmlhbHNDb21tb25FeHRlbnNpb25WYWx1ZXMge1xyXG4gICAgYW1iaWVudD86IG51bWJlcltdIHwgc3RyaW5nO1xyXG4gICAgZGlmZnVzZT86IG51bWJlcltdIHwgc3RyaW5nO1xyXG4gICAgZW1pc3Npb24/OiBudW1iZXJbXSB8IHN0cmluZztcclxuICAgIHNwZWN1bGFyPzogbnVtYmVyW10gfCBzdHJpbmc7XHJcbiAgICBzaGluaW5lc3M/OiBudW1iZXI7XHJcbiAgICB0cmFuc3BhcmVuY3k/OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJR0xURk1hdGVyaWFsc0NvbW1vbkV4dGVuc2lvbiB7XHJcbiAgICB0ZWNobmlxdWU6IHN0cmluZztcclxuICAgIHRyYW5zcGFyZW50PzogbnVtYmVyO1xyXG4gICAgZG91YmxlU2lkZWQ/OiBib29sZWFuO1xyXG4gICAgdmFsdWVzOiBJR0xURk1hdGVyaWFsc0NvbW1vbkV4dGVuc2lvblZhbHVlcztcclxufVxyXG5cclxuaW50ZXJmYWNlIElHTFRGUnVudGltZUNvbW1vbkV4dGVuc2lvbiB7XHJcbiAgICBsaWdodHM6IHsgW2tleTogc3RyaW5nXTogSUdMVEZMaWdodENvbW1vbkV4dGVuc2lvbiB9O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSUdMVEZMaWdodENvbW1vbkV4dGVuc2lvbiB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcblxyXG4gICAgYW1iaWVudD86IElHTFRGQW1iaWVudExpZ2h0Q29tbW9uRXh0ZW5zaW9uO1xyXG4gICAgcG9pbnQ/OiBJR0xURlBvaW50TGlnaHRDb21tb25FeHRlbnNpb247XHJcbiAgICBkaXJlY3Rpb25hbD86IElHTFRGRGlyZWN0aW9uYWxMaWdodENvbW1vbkV4dGVuc2lvbjtcclxuICAgIHNwb3Q/OiBJR0xURlNwb3RMaWdodENvbW1vbkV4dGVuc2lvbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElHTFRGUG9pbnRMaWdodENvbW1vbkV4dGVuc2lvbiB7XHJcbiAgICBjb2xvcjogbnVtYmVyW107XHJcbiAgICBjb25zdGFudEF0dGVudWF0aW9uOiBudW1iZXI7XHJcbiAgICBsaW5lYXJBdHRlbnVhdGlvbjogbnVtYmVyO1xyXG4gICAgcXVhZHJhdGljQXR0ZW51YXRpb246IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIElHTFRGQW1iaWVudExpZ2h0Q29tbW9uRXh0ZW5zaW9uIHtcclxuICAgIGNvbG9yOiBudW1iZXJbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIElHTFRGRGlyZWN0aW9uYWxMaWdodENvbW1vbkV4dGVuc2lvbiB7XHJcbiAgICBjb2xvcjogbnVtYmVyW107XHJcbn1cclxuXHJcbmludGVyZmFjZSBJR0xURlNwb3RMaWdodENvbW1vbkV4dGVuc2lvbiB7XHJcbiAgICBjb2xvcjogbnVtYmVyW107XHJcbiAgICBjb25zdGFudEF0dGVudWF0aW9uOiBudW1iZXI7XHJcbiAgICBmYWxsT2ZmQW5nbGU6IG51bWJlcjtcclxuICAgIGZhbGxPZmZFeHBvbmVudDogbnVtYmVyO1xyXG4gICAgbGluZWFyQXR0ZW51YXRpb246IG51bWJlcjtcclxuICAgIHF1YWRyYXRpY0F0dGVudWF0aW9uOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJuYWxcclxuICogQGRlcHJlY2F0ZWRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHTFRGTWF0ZXJpYWxzQ29tbW9uRXh0ZW5zaW9uIGV4dGVuZHMgR0xURkxvYWRlckV4dGVuc2lvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIktIUl9tYXRlcmlhbHNfY29tbW9uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBsb2FkUnVudGltZUV4dGVuc2lvbnNBc3luYyhnbHRmUnVudGltZTogSUdMVEZSdW50aW1lKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCFnbHRmUnVudGltZS5leHRlbnNpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbjogSUdMVEZSdW50aW1lQ29tbW9uRXh0ZW5zaW9uID0gZ2x0ZlJ1bnRpbWUuZXh0ZW5zaW9uc1t0aGlzLm5hbWVdO1xyXG4gICAgICAgIGlmICghZXh0ZW5zaW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBsaWdodHNcclxuICAgICAgICBjb25zdCBsaWdodHMgPSBleHRlbnNpb24ubGlnaHRzO1xyXG4gICAgICAgIGlmIChsaWdodHMpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB0aGluZyBpbiBsaWdodHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpZ2h0OiBJR0xURkxpZ2h0Q29tbW9uRXh0ZW5zaW9uID0gbGlnaHRzW3RoaW5nXTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxpZ2h0LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYW1iaWVudFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFtYmllbnRMaWdodCA9IG5ldyBIZW1pc3BoZXJpY0xpZ2h0KGxpZ2h0Lm5hbWUsIG5ldyBWZWN0b3IzKDAsIDEsIDApLCBnbHRmUnVudGltZS5zY2VuZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFtYmllbnQgPSBsaWdodC5hbWJpZW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW1iaWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1iaWVudExpZ2h0LmRpZmZ1c2UgPSBDb2xvcjMuRnJvbUFycmF5KGFtYmllbnQuY29sb3IgfHwgWzEsIDEsIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBvaW50XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9pbnRMaWdodCA9IG5ldyBQb2ludExpZ2h0KGxpZ2h0Lm5hbWUsIG5ldyBWZWN0b3IzKDEwLCAxMCwgMTApLCBnbHRmUnVudGltZS5zY2VuZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gbGlnaHQucG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRMaWdodC5kaWZmdXNlID0gQ29sb3IzLkZyb21BcnJheShwb2ludC5jb2xvciB8fCBbMSwgMSwgMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGlyZWN0aW9uYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJMaWdodCA9IG5ldyBEaXJlY3Rpb25hbExpZ2h0KGxpZ2h0Lm5hbWUsIG5ldyBWZWN0b3IzKDAsIC0xLCAwKSwgZ2x0ZlJ1bnRpbWUuc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3Rpb25hbCA9IGxpZ2h0LmRpcmVjdGlvbmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpckxpZ2h0LmRpZmZ1c2UgPSBDb2xvcjMuRnJvbUFycmF5KGRpcmVjdGlvbmFsLmNvbG9yIHx8IFsxLCAxLCAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzcG90XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BvdCA9IGxpZ2h0LnNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcG90KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzcG90TGlnaHQgPSBuZXcgU3BvdExpZ2h0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3RvcjMoMCwgMTAsIDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IzKDAsIC0xLCAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcG90LmZhbGxPZmZBbmdsZSB8fCBNYXRoLlBJLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3QuZmFsbE9mZkV4cG9uZW50IHx8IDAuMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbHRmUnVudGltZS5zY2VuZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwb3RMaWdodC5kaWZmdXNlID0gQ29sb3IzLkZyb21BcnJheShzcG90LmNvbG9yIHx8IFsxLCAxLCAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oJ0dMVEYgTWF0ZXJpYWwgQ29tbW9uIGV4dGVuc2lvbjogbGlnaHQgdHlwZSBcIicgKyBsaWdodC50eXBlICsgXCLigJ0gbm90IHN1cHBvcnRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgbG9hZE1hdGVyaWFsQXN5bmMoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSwgaWQ6IHN0cmluZywgb25TdWNjZXNzOiAobWF0ZXJpYWw6IE1hdGVyaWFsKSA9PiB2b2lkLCBvbkVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWw6IElHTFRGTWF0ZXJpYWwgPSBnbHRmUnVudGltZS5tYXRlcmlhbHNbaWRdO1xyXG4gICAgICAgIGlmICghbWF0ZXJpYWwgfHwgIW1hdGVyaWFsLmV4dGVuc2lvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uOiBJR0xURk1hdGVyaWFsc0NvbW1vbkV4dGVuc2lvbiA9IG1hdGVyaWFsLmV4dGVuc2lvbnNbdGhpcy5uYW1lXTtcclxuICAgICAgICBpZiAoIWV4dGVuc2lvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdGFuZGFyZE1hdGVyaWFsID0gbmV3IFN0YW5kYXJkTWF0ZXJpYWwoaWQsIGdsdGZSdW50aW1lLnNjZW5lKTtcclxuICAgICAgICBzdGFuZGFyZE1hdGVyaWFsLnNpZGVPcmllbnRhdGlvbiA9IE1hdGVyaWFsLkNvdW50ZXJDbG9ja1dpc2VTaWRlT3JpZW50YXRpb247XHJcblxyXG4gICAgICAgIGlmIChleHRlbnNpb24udGVjaG5pcXVlID09PSBcIkNPTlNUQU5UXCIpIHtcclxuICAgICAgICAgICAgc3RhbmRhcmRNYXRlcmlhbC5kaXNhYmxlTGlnaHRpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhbmRhcmRNYXRlcmlhbC5iYWNrRmFjZUN1bGxpbmcgPSBleHRlbnNpb24uZG91YmxlU2lkZWQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogIWV4dGVuc2lvbi5kb3VibGVTaWRlZDtcclxuICAgICAgICBzdGFuZGFyZE1hdGVyaWFsLmFscGhhID0gZXh0ZW5zaW9uLnZhbHVlcy50cmFuc3BhcmVuY3kgPT09IHVuZGVmaW5lZCA/IDEuMCA6IGV4dGVuc2lvbi52YWx1ZXMudHJhbnNwYXJlbmN5O1xyXG4gICAgICAgIHN0YW5kYXJkTWF0ZXJpYWwuc3BlY3VsYXJQb3dlciA9IGV4dGVuc2lvbi52YWx1ZXMuc2hpbmluZXNzID09PSB1bmRlZmluZWQgPyAwLjAgOiBleHRlbnNpb24udmFsdWVzLnNoaW5pbmVzcztcclxuXHJcbiAgICAgICAgLy8gQW1iaWVudFxyXG4gICAgICAgIGlmICh0eXBlb2YgZXh0ZW5zaW9uLnZhbHVlcy5hbWJpZW50ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRUZXh0dXJlKGdsdGZSdW50aW1lLCBleHRlbnNpb24udmFsdWVzLmFtYmllbnQsIHN0YW5kYXJkTWF0ZXJpYWwsIFwiYW1iaWVudFRleHR1cmVcIiwgb25FcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhbmRhcmRNYXRlcmlhbC5hbWJpZW50Q29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KGV4dGVuc2lvbi52YWx1ZXMuYW1iaWVudCB8fCBbMCwgMCwgMF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGlmZnVzZVxyXG4gICAgICAgIGlmICh0eXBlb2YgZXh0ZW5zaW9uLnZhbHVlcy5kaWZmdXNlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRUZXh0dXJlKGdsdGZSdW50aW1lLCBleHRlbnNpb24udmFsdWVzLmRpZmZ1c2UsIHN0YW5kYXJkTWF0ZXJpYWwsIFwiZGlmZnVzZVRleHR1cmVcIiwgb25FcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhbmRhcmRNYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KGV4dGVuc2lvbi52YWx1ZXMuZGlmZnVzZSB8fCBbMCwgMCwgMF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRW1pc3Npb25cclxuICAgICAgICBpZiAodHlwZW9mIGV4dGVuc2lvbi52YWx1ZXMuZW1pc3Npb24gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZFRleHR1cmUoZ2x0ZlJ1bnRpbWUsIGV4dGVuc2lvbi52YWx1ZXMuZW1pc3Npb24sIHN0YW5kYXJkTWF0ZXJpYWwsIFwiZW1pc3NpdmVUZXh0dXJlXCIsIG9uRXJyb3IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YW5kYXJkTWF0ZXJpYWwuZW1pc3NpdmVDb2xvciA9IENvbG9yMy5Gcm9tQXJyYXkoZXh0ZW5zaW9uLnZhbHVlcy5lbWlzc2lvbiB8fCBbMCwgMCwgMF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3BlY3VsYXJcclxuICAgICAgICBpZiAodHlwZW9mIGV4dGVuc2lvbi52YWx1ZXMuc3BlY3VsYXIgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZFRleHR1cmUoZ2x0ZlJ1bnRpbWUsIGV4dGVuc2lvbi52YWx1ZXMuc3BlY3VsYXIsIHN0YW5kYXJkTWF0ZXJpYWwsIFwic3BlY3VsYXJUZXh0dXJlXCIsIG9uRXJyb3IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YW5kYXJkTWF0ZXJpYWwuc3BlY3VsYXJDb2xvciA9IENvbG9yMy5Gcm9tQXJyYXkoZXh0ZW5zaW9uLnZhbHVlcy5zcGVjdWxhciB8fCBbMCwgMCwgMF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZFRleHR1cmUoZ2x0ZlJ1bnRpbWU6IElHTFRGUnVudGltZSwgaWQ6IHN0cmluZywgbWF0ZXJpYWw6IFN0YW5kYXJkTWF0ZXJpYWwsIHByb3BlcnR5UGF0aDogc3RyaW5nLCBvbkVycm9yOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGJ1ZmZlciBmcm9tIHRleHR1cmUgdXJsXHJcbiAgICAgICAgR0xURkxvYWRlckJhc2UuTG9hZFRleHR1cmVCdWZmZXJBc3luYyhcclxuICAgICAgICAgICAgZ2x0ZlJ1bnRpbWUsXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICAoYnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGV4dHVyZSBmcm9tIGJ1ZmZlclxyXG4gICAgICAgICAgICAgICAgR0xURkxvYWRlckJhc2UuQ3JlYXRlVGV4dHVyZUFzeW5jKGdsdGZSdW50aW1lLCBpZCwgYnVmZmVyLCAodGV4dHVyZSkgPT4gKCg8YW55Pm1hdGVyaWFsKVtwcm9wZXJ0eVBhdGhdID0gdGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkVycm9yXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuR0xURkxvYWRlci5SZWdpc3RlckV4dGVuc2lvbihuZXcgR0xURk1hdGVyaWFsc0NvbW1vbkV4dGVuc2lvbigpKTtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vZ2xURkJpbmFyeUV4dGVuc2lvblwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nbFRGTG9hZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dsVEZMb2FkZXJJbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dsVEZMb2FkZXJVdGlsc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nbFRGTWF0ZXJpYWxzQ29tbW9uRXh0ZW5zaW9uXCI7XHJcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlc1xyXG5pbXBvcnQgdHlwZSB7IElTY2VuZUxvYWRlclBsdWdpbkV4dGVuc2lvbnMsIElTY2VuZUxvYWRlclBsdWdpbk1ldGFkYXRhIH0gZnJvbSBcImNvcmUvaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBHTFRGTWFnaWNCYXNlNjRFbmNvZGVkID0gXCJaMnhVUmdcIjsgLy8gXCJnbFRGXCIgYmFzZTY0IGVuY29kZWQgKHdpdGhvdXQgdGhlIHF1b3RlcyEpXHJcblxyXG5leHBvcnQgY29uc3QgR0xURkZpbGVMb2FkZXJNZXRhZGF0YSA9IHtcclxuICAgIG5hbWU6IFwiZ2x0ZlwiLFxyXG5cclxuICAgIGV4dGVuc2lvbnM6IHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICAgICAgXCIuZ2x0ZlwiOiB7IGlzQmluYXJ5OiBmYWxzZSwgbWltZVR5cGU6IFwibW9kZWwvZ2x0Zitqc29uXCIgfSxcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICAgICAgXCIuZ2xiXCI6IHsgaXNCaW5hcnk6IHRydWUsIG1pbWVUeXBlOiBcIm1vZGVsL2dsdGYtYmluYXJ5XCIgfSxcclxuICAgIH0gYXMgY29uc3Qgc2F0aXNmaWVzIElTY2VuZUxvYWRlclBsdWdpbkV4dGVuc2lvbnMsXHJcblxyXG4gICAgY2FuRGlyZWN0TG9hZChkYXRhOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAoZGF0YS5pbmRleE9mKFwiYXNzZXRcIikgIT09IC0xICYmIGRhdGEuaW5kZXhPZihcInZlcnNpb25cIikgIT09IC0xKSB8fFxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJkYXRhOmJhc2U2NCxcIiArIEdMVEZNYWdpY0Jhc2U2NEVuY29kZWQpIHx8IC8vIHRoaXMgaXMgdGVjaG5pY2FsbHkgaW5jb3JyZWN0LCBidXQgd2lsbCBjb250aW51ZSB0byBzdXBwb3J0IGZvciBiYWNrY29tcGF0LlxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJkYXRhOjtiYXNlNjQsXCIgKyBHTFRGTWFnaWNCYXNlNjRFbmNvZGVkKSB8fFxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJkYXRhOmFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbTtiYXNlNjQsXCIgKyBHTFRGTWFnaWNCYXNlNjRFbmNvZGVkKSB8fFxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJkYXRhOm1vZGVsL2dsdGYtYmluYXJ5O2Jhc2U2NCxcIiArIEdMVEZNYWdpY0Jhc2U2NEVuY29kZWQpXHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIElTY2VuZUxvYWRlclBsdWdpbk1ldGFkYXRhO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXHJcbmltcG9ydCB0eXBlICogYXMgR0xURjIgZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHR5cGUgeyBPYnNlcnZlciB9IGZyb20gXCJjb3JlL01pc2Mvb2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcImNvcmUvTWlzYy9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcImNvcmUvTWlzYy90b29sc1wiO1xyXG5pbXBvcnQgdHlwZSB7IENhbWVyYSB9IGZyb20gXCJjb3JlL0NhbWVyYXMvY2FtZXJhXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IEFic3RyYWN0TWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9hYnN0cmFjdE1lc2hcIjtcclxuaW1wb3J0IHR5cGUgeyBJU2NlbmVMb2FkZXJQbHVnaW5GYWN0b3J5LCBJU2NlbmVMb2FkZXJQbHVnaW5Bc3luYywgSVNjZW5lTG9hZGVyUHJvZ3Jlc3NFdmVudCwgSVNjZW5lTG9hZGVyQXN5bmNSZXN1bHQsIFNjZW5lTG9hZGVyUGx1Z2luT3B0aW9ucyB9IGZyb20gXCJjb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXJcIjtcclxuaW1wb3J0IHsgcmVnaXN0ZXJTY2VuZUxvYWRlclBsdWdpbiB9IGZyb20gXCJjb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXJcIjtcclxuaW1wb3J0IHsgQXNzZXRDb250YWluZXIgfSBmcm9tIFwiY29yZS9hc3NldENvbnRhaW5lclwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lLCBJRGlzcG9zYWJsZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgV2ViUmVxdWVzdCB9IGZyb20gXCJjb3JlL01pc2Mvd2ViUmVxdWVzdFwiO1xyXG5pbXBvcnQgdHlwZSB7IElGaWxlUmVxdWVzdCB9IGZyb20gXCJjb3JlL01pc2MvZmlsZVJlcXVlc3RcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmUvTWlzYy9sb2dnZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBJRGF0YUJ1ZmZlciB9IGZyb20gXCJjb3JlL01pc2MvZGF0YVJlYWRlclwiO1xyXG5pbXBvcnQgeyBEYXRhUmVhZGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kYXRhUmVhZGVyXCI7XHJcbmltcG9ydCB7IEdMVEZWYWxpZGF0aW9uIH0gZnJvbSBcIi4vZ2xURlZhbGlkYXRpb25cIjtcclxuaW1wb3J0IHsgR0xURkZpbGVMb2FkZXJNZXRhZGF0YSwgR0xURk1hZ2ljQmFzZTY0RW5jb2RlZCB9IGZyb20gXCIuL2dsVEZGaWxlTG9hZGVyLm1ldGFkYXRhXCI7XHJcbmltcG9ydCB0eXBlIHsgTG9hZEZpbGVFcnJvciB9IGZyb20gXCJjb3JlL01pc2MvZmlsZVRvb2xzXCI7XHJcbmltcG9ydCB7IERlY29kZUJhc2U2NFVybFRvQmluYXJ5IH0gZnJvbSBcImNvcmUvTWlzYy9maWxlVG9vbHNcIjtcclxuaW1wb3J0IHsgUnVudGltZUVycm9yLCBFcnJvckNvZGVzIH0gZnJvbSBcImNvcmUvTWlzYy9lcnJvclwiO1xyXG5pbXBvcnQgdHlwZSB7IFRyYW5zZm9ybU5vZGUgfSBmcm9tIFwiY29yZS9NZXNoZXMvdHJhbnNmb3JtTm9kZVwiO1xyXG5pbXBvcnQgdHlwZSB7IE1vcnBoVGFyZ2V0TWFuYWdlciB9IGZyb20gXCJjb3JlL01vcnBoL21vcnBoVGFyZ2V0TWFuYWdlclwiO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgb3B0aW9ucyBmb3IgZ2xURiBsb2FkZXIgZXh0ZW5zaW9ucy4gVGhpcyBpbnRlcmZhY2UgaXMgZXh0ZW5kZWQgYnkgc3BlY2lmaWMgZXh0ZW5zaW9ucy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgR0xURkxvYWRlckV4dGVuc2lvbk9wdGlvbnMgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHVuZGVmaW5lZD4ge31cclxuXHJcbmRlY2xhcmUgbW9kdWxlIFwiY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCIge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzZG9jL3JlcXVpcmUtanNkb2NcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgU2NlbmVMb2FkZXJQbHVnaW5PcHRpb25zIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmVzIG9wdGlvbnMgZm9yIHRoZSBnbFRGIGxvYWRlci5cclxuICAgICAgICAgKi9cclxuICAgICAgICBbR0xURkZpbGVMb2FkZXJNZXRhZGF0YS5uYW1lXTogUGFydGlhbDxHTFRGTG9hZGVyT3B0aW9ucz47XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJRmlsZVJlcXVlc3RJbmZvIGV4dGVuZHMgSUZpbGVSZXF1ZXN0IHtcclxuICAgIF9sZW5ndGhDb21wdXRhYmxlPzogYm9vbGVhbjtcclxuICAgIF9sb2FkZWQ/OiBudW1iZXI7XHJcbiAgICBfdG90YWw/OiBudW1iZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRBc3luYyhhcnJheUJ1ZmZlcjogQXJyYXlCdWZmZXIsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aDogbnVtYmVyKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRWaWV3QXN5bmMoYXJyYXlCdWZmZXJWaWV3OiBBcnJheUJ1ZmZlclZpZXcsIGJ5dGVPZmZzZXQ6IG51bWJlciwgYnl0ZUxlbmd0aDogbnVtYmVyKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBieXRlT2Zmc2V0ID49IGFycmF5QnVmZmVyVmlldy5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiT2Zmc2V0IGlzIG91dCBvZiByYW5nZS5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYnl0ZU9mZnNldCArIGJ5dGVMZW5ndGggPiBhcnJheUJ1ZmZlclZpZXcuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkxlbmd0aCBpcyBvdXQgb2YgcmFuZ2UuXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlclZpZXcuYnVmZmVyLCBhcnJheUJ1ZmZlclZpZXcuYnl0ZU9mZnNldCArIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNb2RlIHRoYXQgZGV0ZXJtaW5lcyB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gdXNlLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gR0xURkxvYWRlckNvb3JkaW5hdGVTeXN0ZW1Nb2RlIHtcclxuICAgIC8qKlxyXG4gICAgICogQXV0b21hdGljYWxseSBjb252ZXJ0IHRoZSBnbFRGIHJpZ2h0LWhhbmRlZCBkYXRhIHRvIHRoZSBhcHByb3ByaWF0ZSBzeXN0ZW0gYmFzZWQgb24gdGhlIGN1cnJlbnQgY29vcmRpbmF0ZSBzeXN0ZW0gbW9kZSBvZiB0aGUgc2NlbmUuXHJcbiAgICAgKi9cclxuICAgIEFVVE8sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSB1c2VSaWdodEhhbmRlZFN5c3RlbSBmbGFnIG9uIHRoZSBzY2VuZS5cclxuICAgICAqL1xyXG4gICAgRk9SQ0VfUklHSFRfSEFOREVELFxyXG59XHJcblxyXG4vKipcclxuICogTW9kZSB0aGF0IGRldGVybWluZXMgd2hhdCBhbmltYXRpb25zIHdpbGwgc3RhcnQuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBHTFRGTG9hZGVyQW5pbWF0aW9uU3RhcnRNb2RlIHtcclxuICAgIC8qKlxyXG4gICAgICogTm8gYW5pbWF0aW9uIHdpbGwgc3RhcnQuXHJcbiAgICAgKi9cclxuICAgIE5PTkUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZmlyc3QgYW5pbWF0aW9uIHdpbGwgc3RhcnQuXHJcbiAgICAgKi9cclxuICAgIEZJUlNULFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsIGFuaW1hdGlvbnMgd2lsbCBzdGFydC5cclxuICAgICAqL1xyXG4gICAgQUxMLFxyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIHRoYXQgY29udGFpbnMgdGhlIGRhdGEgZm9yIHRoZSBnbFRGIGFzc2V0LlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkxvYWRlckRhdGEge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgZ2xURiBKU09OLlxyXG4gICAgICovXHJcbiAgICBqc29uOiBPYmplY3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgQklOIGNodW5rIG9mIGEgYmluYXJ5IGdsVEYuXHJcbiAgICAgKi9cclxuICAgIGJpbjogTnVsbGFibGU8SURhdGFCdWZmZXI+O1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJmYWNlIGZvciBleHRlbmRpbmcgdGhlIGxvYWRlci5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdMVEZMb2FkZXJFeHRlbnNpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHRoaXMgZXh0ZW5zaW9uIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBvcmRlciBvZiB0aGlzIGV4dGVuc2lvbi5cclxuICAgICAqIFRoZSBsb2FkZXIgc29ydHMgdGhlIGV4dGVuc2lvbnMgdXNpbmcgdGhlc2UgdmFsdWVzIHdoZW4gbG9hZGluZy5cclxuICAgICAqL1xyXG4gICAgb3JkZXI/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMb2FkZXIgc3RhdGUuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBHTFRGTG9hZGVyU3RhdGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYXNzZXQgaXMgbG9hZGluZy5cclxuICAgICAqL1xyXG4gICAgTE9BRElORyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhc3NldCBpcyByZWFkeSBmb3IgcmVuZGVyaW5nLlxyXG4gICAgICovXHJcbiAgICBSRUFEWSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhc3NldCBpcyBjb21wbGV0ZWx5IGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgQ09NUExFVEUsXHJcbn1cclxuXHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR0xURkxvYWRlciBleHRlbmRzIElEaXNwb3NhYmxlIHtcclxuICAgIGltcG9ydE1lc2hBc3luYzogKFxyXG4gICAgICAgIG1lc2hlc05hbWVzOiBzdHJpbmcgfCByZWFkb25seSBzdHJpbmdbXSB8IG51bGwgfCB1bmRlZmluZWQsXHJcbiAgICAgICAgc2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIGNvbnRhaW5lcjogTnVsbGFibGU8QXNzZXRDb250YWluZXI+LFxyXG4gICAgICAgIGRhdGE6IElHTFRGTG9hZGVyRGF0YSxcclxuICAgICAgICByb290VXJsOiBzdHJpbmcsXHJcbiAgICAgICAgb25Qcm9ncmVzcz86IChldmVudDogSVNjZW5lTG9hZGVyUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZCxcclxuICAgICAgICBmaWxlTmFtZT86IHN0cmluZ1xyXG4gICAgKSA9PiBQcm9taXNlPElTY2VuZUxvYWRlckFzeW5jUmVzdWx0PjtcclxuICAgIGxvYWRBc3luYzogKHNjZW5lOiBTY2VuZSwgZGF0YTogSUdMVEZMb2FkZXJEYXRhLCByb290VXJsOiBzdHJpbmcsIG9uUHJvZ3Jlc3M/OiAoZXZlbnQ6IElTY2VuZUxvYWRlclByb2dyZXNzRXZlbnQpID0+IHZvaWQsIGZpbGVOYW1lPzogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+O1xyXG59XHJcblxyXG4vKipcclxuICogQWRkcyBkZWZhdWx0L2ltcGxpY2l0IG9wdGlvbnMgdG8gZXh0ZW5zaW9uIHNwZWNpZmljIG9wdGlvbnMuXHJcbiAqL1xyXG50eXBlIERlZmF1bHRFeHRlbnNpb25PcHRpb25zPEJhc2VFeHRlbnNpb25PcHRpb25zPiA9IHtcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgZXh0ZW5zaW9uIGlzIGVuYWJsZWRcclxuICAgICAqL1xyXG4gICAgZW5hYmxlZD86IGJvb2xlYW47XHJcbn0gJiBCYXNlRXh0ZW5zaW9uT3B0aW9ucztcclxuXHJcbmFic3RyYWN0IGNsYXNzIEdMVEZMb2FkZXJPcHRpb25zIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBiYWJ5bG9uanMvYXZhaWxhYmxlXHJcbiAgICBwcm90ZWN0ZWQgY29weUZyb20ob3B0aW9ucz86IFBhcnRpYWw8UmVhZG9ubHk8R0xURkxvYWRlck9wdGlvbnM+Pikge1xyXG4gICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QYXJzZWQgPSBvcHRpb25zLm9uUGFyc2VkO1xyXG4gICAgICAgICAgICB0aGlzLmNvb3JkaW5hdGVTeXN0ZW1Nb2RlID0gb3B0aW9ucy5jb29yZGluYXRlU3lzdGVtTW9kZSA/PyB0aGlzLmNvb3JkaW5hdGVTeXN0ZW1Nb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXJ0TW9kZSA9IG9wdGlvbnMuYW5pbWF0aW9uU3RhcnRNb2RlID8/IHRoaXMuYW5pbWF0aW9uU3RhcnRNb2RlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWROb2RlQW5pbWF0aW9ucyA9IG9wdGlvbnMubG9hZE5vZGVBbmltYXRpb25zID8/IHRoaXMubG9hZE5vZGVBbmltYXRpb25zO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTa2lucyA9IG9wdGlvbnMubG9hZFNraW5zID8/IHRoaXMubG9hZFNraW5zO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRNb3JwaFRhcmdldHMgPSBvcHRpb25zLmxvYWRNb3JwaFRhcmdldHMgPz8gdGhpcy5sb2FkTW9ycGhUYXJnZXRzO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVNYXRlcmlhbHMgPSBvcHRpb25zLmNvbXBpbGVNYXRlcmlhbHMgPz8gdGhpcy5jb21waWxlTWF0ZXJpYWxzO1xyXG4gICAgICAgICAgICB0aGlzLnVzZUNsaXBQbGFuZSA9IG9wdGlvbnMudXNlQ2xpcFBsYW5lID8/IHRoaXMudXNlQ2xpcFBsYW5lO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVTaGFkb3dHZW5lcmF0b3JzID0gb3B0aW9ucy5jb21waWxlU2hhZG93R2VuZXJhdG9ycyA/PyB0aGlzLmNvbXBpbGVTaGFkb3dHZW5lcmF0b3JzO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zcGFyZW5jeUFzQ292ZXJhZ2UgPSBvcHRpb25zLnRyYW5zcGFyZW5jeUFzQ292ZXJhZ2UgPz8gdGhpcy50cmFuc3BhcmVuY3lBc0NvdmVyYWdlO1xyXG4gICAgICAgICAgICB0aGlzLnVzZVJhbmdlUmVxdWVzdHMgPSBvcHRpb25zLnVzZVJhbmdlUmVxdWVzdHMgPz8gdGhpcy51c2VSYW5nZVJlcXVlc3RzO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUluc3RhbmNlcyA9IG9wdGlvbnMuY3JlYXRlSW5zdGFuY2VzID8/IHRoaXMuY3JlYXRlSW5zdGFuY2VzO1xyXG4gICAgICAgICAgICB0aGlzLmFsd2F5c0NvbXB1dGVCb3VuZGluZ0JveCA9IG9wdGlvbnMuYWx3YXlzQ29tcHV0ZUJvdW5kaW5nQm94ID8/IHRoaXMuYWx3YXlzQ29tcHV0ZUJvdW5kaW5nQm94O1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRBbGxNYXRlcmlhbHMgPSBvcHRpb25zLmxvYWRBbGxNYXRlcmlhbHMgPz8gdGhpcy5sb2FkQWxsTWF0ZXJpYWxzO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRPbmx5TWF0ZXJpYWxzID0gb3B0aW9ucy5sb2FkT25seU1hdGVyaWFscyA/PyB0aGlzLmxvYWRPbmx5TWF0ZXJpYWxzO1xyXG4gICAgICAgICAgICB0aGlzLnNraXBNYXRlcmlhbHMgPSBvcHRpb25zLnNraXBNYXRlcmlhbHMgPz8gdGhpcy5za2lwTWF0ZXJpYWxzO1xyXG4gICAgICAgICAgICB0aGlzLnVzZVNSR0JCdWZmZXJzID0gb3B0aW9ucy51c2VTUkdCQnVmZmVycyA/PyB0aGlzLnVzZVNSR0JCdWZmZXJzO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldEZwcyA9IG9wdGlvbnMudGFyZ2V0RnBzID8/IHRoaXMudGFyZ2V0RnBzO1xyXG4gICAgICAgICAgICB0aGlzLmFsd2F5c0NvbXB1dGVTa2VsZXRvblJvb3ROb2RlID0gb3B0aW9ucy5hbHdheXNDb21wdXRlU2tlbGV0b25Sb290Tm9kZSA/PyB0aGlzLmFsd2F5c0NvbXB1dGVTa2VsZXRvblJvb3ROb2RlO1xyXG4gICAgICAgICAgICB0aGlzLnVzZUdsdGZUZXh0dXJlTmFtZXMgPSBvcHRpb25zLnVzZUdsdGZUZXh0dXJlTmFtZXMgPz8gdGhpcy51c2VHbHRmVGV4dHVyZU5hbWVzO1xyXG4gICAgICAgICAgICB0aGlzLnByZXByb2Nlc3NVcmxBc3luYyA9IG9wdGlvbnMucHJlcHJvY2Vzc1VybEFzeW5jID8/IHRoaXMucHJlcHJvY2Vzc1VybEFzeW5jO1xyXG4gICAgICAgICAgICB0aGlzLmN1c3RvbVJvb3ROb2RlID0gb3B0aW9ucy5jdXN0b21Sb290Tm9kZTtcclxuICAgICAgICAgICAgdGhpcy5vbk1lc2hMb2FkZWQgPSBvcHRpb25zLm9uTWVzaExvYWRlZDtcclxuICAgICAgICAgICAgdGhpcy5vblNraW5Mb2FkZWQgPSBvcHRpb25zLm9uU2tpbkxvYWRlZDtcclxuICAgICAgICAgICAgdGhpcy5vblRleHR1cmVMb2FkZWQgPSBvcHRpb25zLm9uVGV4dHVyZUxvYWRlZDtcclxuICAgICAgICAgICAgdGhpcy5vbk1hdGVyaWFsTG9hZGVkID0gb3B0aW9ucy5vbk1hdGVyaWFsTG9hZGVkO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2FtZXJhTG9hZGVkID0gb3B0aW9ucy5vbkNhbWVyYUxvYWRlZDtcclxuICAgICAgICAgICAgdGhpcy5leHRlbnNpb25PcHRpb25zID0gb3B0aW9ucy5leHRlbnNpb25PcHRpb25zID8/IHRoaXMuZXh0ZW5zaW9uT3B0aW9ucztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIENvbW1vbiBvcHRpb25zXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmFpc2VkIHdoZW4gdGhlIGFzc2V0IGhhcyBiZWVuIHBhcnNlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25QYXJzZWQ/OiAoKGxvYWRlckRhdGE6IElHTFRGTG9hZGVyRGF0YSkgPT4gdm9pZCkgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLVxyXG4gICAgLy8gVjIgb3B0aW9uc1xyXG4gICAgLy8gLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvb3JkaW5hdGUgc3lzdGVtIG1vZGUuIERlZmF1bHRzIHRvIEFVVE8uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb29yZGluYXRlU3lzdGVtTW9kZSA9IEdMVEZMb2FkZXJDb29yZGluYXRlU3lzdGVtTW9kZS5BVVRPO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGFuaW1hdGlvbiBzdGFydCBtb2RlLiBEZWZhdWx0cyB0byBGSVJTVC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFuaW1hdGlvblN0YXJ0TW9kZSA9IEdMVEZMb2FkZXJBbmltYXRpb25TdGFydE1vZGUuRklSU1Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBsb2FkZXIgc2hvdWxkIGxvYWQgbm9kZSBhbmltYXRpb25zLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAgICogTk9URTogVGhlIGFuaW1hdGlvbiBvZiB0aGlzIG5vZGUgd2lsbCBzdGlsbCBsb2FkIGlmIHRoZSBub2RlIGlzIGFsc28gYSBqb2ludCBvZiBhIHNraW4gYW5kIGBsb2FkU2tpbnNgIGlzIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkTm9kZUFuaW1hdGlvbnMgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgbG9hZGVyIHNob3VsZCBsb2FkIHNraW5zLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFNraW5zID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgaWYgdGhlIGxvYWRlciBzaG91bGQgbG9hZCBtb3JwaCB0YXJnZXRzLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZE1vcnBoVGFyZ2V0cyA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBsb2FkZXIgc2hvdWxkIGNvbXBpbGUgbWF0ZXJpYWxzIGJlZm9yZSByYWlzaW5nIHRoZSBzdWNjZXNzIGNhbGxiYWNrLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbXBpbGVNYXRlcmlhbHMgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgaWYgdGhlIGxvYWRlciBzaG91bGQgYWxzbyBjb21waWxlIG1hdGVyaWFscyB3aXRoIGNsaXAgcGxhbmVzLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHVzZUNsaXBQbGFuZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgbG9hZGVyIHNob3VsZCBjb21waWxlIHNoYWRvdyBnZW5lcmF0b3JzIGJlZm9yZSByYWlzaW5nIHRoZSBzdWNjZXNzIGNhbGxiYWNrLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbXBpbGVTaGFkb3dHZW5lcmF0b3JzID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBBbHBoYSBibGVuZGVkIG1hdGVyaWFscyBhcmUgb25seSBhcHBsaWVkIGFzIGNvdmVyYWdlLlxyXG4gICAgICogSWYgZmFsc2UsIChkZWZhdWx0KSBUaGUgbHVtaW5hbmNlIG9mIGVhY2ggcGl4ZWwgd2lsbCByZWR1Y2UgaXRzIG9wYWNpdHkgdG8gc2ltdWxhdGUgdGhlIGJlaGF2aW91ciBvZiBtb3N0IHBoeXNpY2FsIG1hdGVyaWFscy5cclxuICAgICAqIElmIHRydWUsIG5vIGV4dHJhIGVmZmVjdHMgYXJlIGFwcGxpZWQgdG8gdHJhbnNwYXJlbnQgcGl4ZWxzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdHJhbnNwYXJlbmN5QXNDb3ZlcmFnZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgbG9hZGVyIHNob3VsZCB1c2UgcmFuZ2UgcmVxdWVzdHMgd2hlbiBsb2FkIGJpbmFyeSBnbFRGIGZpbGVzIGZyb20gSFRUUC5cclxuICAgICAqIEVuYWJsaW5nIHdpbGwgZGlzYWJsZSBvZmZsaW5lIHN1cHBvcnQgYW5kIGdsVEYgdmFsaWRhdG9yLlxyXG4gICAgICogRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1c2VSYW5nZVJlcXVlc3RzID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBsb2FkZXIgc2hvdWxkIGNyZWF0ZSBpbnN0YW5jZXMgd2hlbiBtdWx0aXBsZSBnbFRGIG5vZGVzIHBvaW50IHRvIHRoZSBzYW1lIGdsVEYgbWVzaC4gRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZUluc3RhbmNlcyA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBsb2FkZXIgc2hvdWxkIGFsd2F5cyBjb21wdXRlIHRoZSBib3VuZGluZyBib3hlcyBvZiBtZXNoZXMgYW5kIG5vdCB1c2UgdGhlIG1pbi9tYXggdmFsdWVzIGZyb20gdGhlIHBvc2l0aW9uIGFjY2Vzc29yLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFsd2F5c0NvbXB1dGVCb3VuZGluZ0JveCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdHJ1ZSwgbG9hZCBhbGwgbWF0ZXJpYWxzIGRlZmluZWQgaW4gdGhlIGZpbGUsIGV2ZW4gaWYgbm90IHVzZWQgYnkgYW55IG1lc2guIERlZmF1bHRzIHRvIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEFsbE1hdGVyaWFscyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdHJ1ZSwgbG9hZCBvbmx5IHRoZSBtYXRlcmlhbHMgZGVmaW5lZCBpbiB0aGUgZmlsZS4gRGVmYXVsdHMgdG8gZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkT25seU1hdGVyaWFscyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdHJ1ZSwgZG8gbm90IGxvYWQgYW55IG1hdGVyaWFscyBkZWZpbmVkIGluIHRoZSBmaWxlLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNraXBNYXRlcmlhbHMgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRydWUsIGxvYWQgdGhlIGNvbG9yIChnYW1tYSBlbmNvZGVkKSB0ZXh0dXJlcyBpbnRvIHNSR0IgYnVmZmVycyAoaWYgc3VwcG9ydGVkIGJ5IHRoZSBHUFUpLCB3aGljaCB3aWxsIHlpZWxkIG1vcmUgYWNjdXJhdGUgcmVzdWx0cyB3aGVuIHNhbXBsaW5nIHRoZSB0ZXh0dXJlLiBEZWZhdWx0cyB0byB0cnVlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXNlU1JHQkJ1ZmZlcnMgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hlbiBsb2FkaW5nIGdsVEYgYW5pbWF0aW9ucywgd2hpY2ggYXJlIGRlZmluZWQgaW4gc2Vjb25kcywgdGFyZ2V0IHRoZW0gdG8gdGhpcyBGUFMuIERlZmF1bHRzIHRvIDYwLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdGFyZ2V0RnBzID0gNjA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBsb2FkZXIgc2hvdWxkIGFsd2F5cyBjb21wdXRlIHRoZSBuZWFyZXN0IGNvbW1vbiBhbmNlc3RvciBvZiB0aGUgc2tlbGV0b24gam9pbnRzIGluc3RlYWQgb2YgdXNpbmcgYHNraW4uc2tlbGV0b25gLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqIFNldCB0aGlzIHRvIHRydWUgaWYgbG9hZGluZyBhc3NldHMgd2l0aCBpbnZhbGlkIGBza2luLnNrZWxldG9uYCB2YWx1ZXMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhbHdheXNDb21wdXRlU2tlbGV0b25Sb290Tm9kZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgdHJ1ZSwgdGhlIGxvYWRlciB3aWxsIGRlcml2ZSB0aGUgbmFtZSBmb3IgQmFieWxvbiB0ZXh0dXJlcyBmcm9tIHRoZSBnbFRGIHRleHR1cmUgbmFtZSwgaW1hZ2UgbmFtZSwgb3IgaW1hZ2UgdXJsLiBEZWZhdWx0cyB0byBmYWxzZS5cclxuICAgICAqIE5vdGUgdGhhdCBpdCBpcyBwb3NzaWJsZSBmb3IgbXVsdGlwbGUgQmFieWxvbiB0ZXh0dXJlcyB0byBzaGFyZSB0aGUgc2FtZSBuYW1lIHdoZW4gdGhlIEJhYnlsb24gdGV4dHVyZXMgbG9hZCBmcm9tIHRoZSBzYW1lIGdsVEYgdGV4dHVyZSBvciBpbWFnZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHVzZUdsdGZUZXh0dXJlTmFtZXMgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIGNhbGxlZCBiZWZvcmUgbG9hZGluZyBhIHVybCByZWZlcmVuY2VkIGJ5IHRoZSBhc3NldC5cclxuICAgICAqIEBwYXJhbSB1cmwgdXJsIHJlZmVyZW5jZWQgYnkgdGhlIGFzc2V0XHJcbiAgICAgKiBAcmV0dXJucyBBc3luYyB1cmwgdG8gbG9hZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJlcHJvY2Vzc1VybEFzeW5jID0gKHVybDogc3RyaW5nKSA9PiBQcm9taXNlLnJlc29sdmUodXJsKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIG5vZGUgdG8gdXNlIGFzIHRoZSByb290IG9mIHRoZSBoaWVyYXJjaHkgd2hlbiBsb2FkaW5nIHRoZSBzY2VuZSAoZGVmYXVsdDogdW5kZWZpbmVkKS4gSWYgbm90IGRlZmluZWQsIGEgcm9vdCBub2RlIHdpbGwgYmUgYXV0b21hdGljYWxseSBjcmVhdGVkLlxyXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgbnVsbCBpZiB5b3UgZG9uJ3Qgd2FudCBhIHJvb3Qgbm9kZSB0byBiZSBjcmVhdGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3VzdG9tUm9vdE5vZGU/OiBOdWxsYWJsZTxUcmFuc2Zvcm1Ob2RlPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCB3aGVuIHRoZSBsb2FkZXIgY3JlYXRlcyBhIG1lc2ggYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBtZXNoLlxyXG4gICAgICogTm90ZSB0aGF0IHRoZSBjYWxsYmFjayBpcyBjYWxsZWQgYXMgc29vbiBhcyB0aGUgbWVzaCBvYmplY3QgaXMgY3JlYXRlZCwgbWVhbmluZyBzb21lIGRhdGEgbWF5IG5vdCBoYXZlIGJlZW4gc2V0dXAgeWV0IGZvciB0aGlzIG1lc2ggKHZlcnRleCBkYXRhLCBtb3JwaCB0YXJnZXRzLCBtYXRlcmlhbCwgLi4uKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25NZXNoTG9hZGVkPzogKChtZXNoOiBBYnN0cmFjdE1lc2gpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgc2tpbiBhZnRlciBwYXJzaW5nIHRoZSBnbFRGIHByb3BlcnRpZXMgb2YgdGhlIHNraW4gbm9kZS5cclxuICAgICAqIEBzZWUgaHR0cHM6Ly9kb2MuYmFieWxvbmpzLmNvbS9mZWF0dXJlcy9mZWF0dXJlc0RlZXBEaXZlL2ltcG9ydGVycy9nbFRGL2dsVEZTa2lubmluZyNpZ25vcmluZy10aGUtdHJhbnNmb3JtLW9mLXRoZS1za2lubmVkLW1lc2hcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IG9uU2tpbkxvYWRlZD86ICgobm9kZTogVHJhbnNmb3JtTm9kZSwgc2tpbm5lZE5vZGU6IFRyYW5zZm9ybU5vZGUpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgdGV4dHVyZSBhZnRlciBwYXJzaW5nIHRoZSBnbFRGIHByb3BlcnRpZXMgb2YgdGhlIHRleHR1cmUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBvblRleHR1cmVMb2FkZWQ/OiAoKHRleHR1cmU6IEJhc2VUZXh0dXJlKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCB3aGVuIHRoZSBsb2FkZXIgY3JlYXRlcyBhIG1hdGVyaWFsIGFmdGVyIHBhcnNpbmcgdGhlIGdsVEYgcHJvcGVydGllcyBvZiB0aGUgbWF0ZXJpYWwuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbk1hdGVyaWFsTG9hZGVkPzogKChtYXRlcmlhbDogTWF0ZXJpYWwpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgY2FtZXJhIGFmdGVyIHBhcnNpbmcgdGhlIGdsVEYgcHJvcGVydGllcyBvZiB0aGUgY2FtZXJhLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25DYW1lcmFMb2FkZWQ/OiAoKGNhbWVyYTogQ2FtZXJhKSA9PiB2b2lkKSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgb3B0aW9ucyBmb3IgZ2xURiBleHRlbnNpb25zLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXh0ZW5zaW9uT3B0aW9uczoge1xyXG4gICAgICAgIC8vIE5PVEU6IFRoaXMgdHlwZSBpcyBkb2luZyB0d28gdGhpbmdzOlxyXG4gICAgICAgIC8vIDEuIEFkZGluZyBhbiBpbXBsaWNpdCAnZW5hYmxlZCcgcHJvcGVydHkgdG8gdGhlIG9wdGlvbnMgZm9yIGVhY2ggZXh0ZW5zaW9uLlxyXG4gICAgICAgIC8vIDIuIENyZWF0aW5nIGEgbWFwcGVkIHR5cGUgb2YgYWxsIHRoZSBvcHRpb25zIG9mIGFsbCB0aGUgZXh0ZW5zaW9ucyB0byBtYWtlIGl0IGp1c3QgbG9vayBsaWtlIGEgY29uc29saWRhdGVkIHBsYWluIG9iamVjdCBpbiBpbnRlbGxpc2Vuc2UgZm9yIHRoZSB1c2VyLlxyXG4gICAgICAgIFtFeHRlbnNpb24gaW4ga2V5b2YgR0xURkxvYWRlckV4dGVuc2lvbk9wdGlvbnNdPzoge1xyXG4gICAgICAgICAgICBbT3B0aW9uIGluIGtleW9mIERlZmF1bHRFeHRlbnNpb25PcHRpb25zPEdMVEZMb2FkZXJFeHRlbnNpb25PcHRpb25zW0V4dGVuc2lvbl0+XTogRGVmYXVsdEV4dGVuc2lvbk9wdGlvbnM8R0xURkxvYWRlckV4dGVuc2lvbk9wdGlvbnNbRXh0ZW5zaW9uXT5bT3B0aW9uXTtcclxuICAgICAgICB9O1xyXG4gICAgfSA9IHt9O1xyXG59XHJcblxyXG4vKipcclxuICogRmlsZSBsb2FkZXIgZm9yIGxvYWRpbmcgZ2xURiBmaWxlcyBpbnRvIGEgc2NlbmUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR0xURkZpbGVMb2FkZXIgZXh0ZW5kcyBHTFRGTG9hZGVyT3B0aW9ucyBpbXBsZW1lbnRzIElEaXNwb3NhYmxlLCBJU2NlbmVMb2FkZXJQbHVnaW5Bc3luYywgSVNjZW5lTG9hZGVyUGx1Z2luRmFjdG9yeSB7XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgc3RhdGljIF9DcmVhdGVHTFRGMUxvYWRlcjogKHBhcmVudDogR0xURkZpbGVMb2FkZXIpID0+IElHTFRGTG9hZGVyO1xyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgX0NyZWF0ZUdMVEYyTG9hZGVyOiAocGFyZW50OiBHTFRGRmlsZUxvYWRlcikgPT4gSUdMVEZMb2FkZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGdsVEYgZmlsZSBsb2FkZXIuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBmb3IgdGhlIGxvYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9ucz86IFBhcnRpYWw8UmVhZG9ubHk8R0xURkxvYWRlck9wdGlvbnM+Pikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5jb3B5RnJvbShvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gQmVnaW4gQ29tbW9uIG9wdGlvbnNcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZWQgd2hlbiB0aGUgYXNzZXQgaGFzIGJlZW4gcGFyc2VkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblBhcnNlZE9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxJR0xURkxvYWRlckRhdGE+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25QYXJzZWRPYnNlcnZlcjogTnVsbGFibGU8T2JzZXJ2ZXI8SUdMVEZMb2FkZXJEYXRhPj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYWlzZWQgd2hlbiB0aGUgYXNzZXQgaGFzIGJlZW4gcGFyc2VkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgb25QYXJzZWQoY2FsbGJhY2s6ICgobG9hZGVyRGF0YTogSUdMVEZMb2FkZXJEYXRhKSA9PiB2b2lkKSB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vblBhcnNlZE9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QYXJzZWRPYnNlcnZhYmxlLnJlbW92ZSh0aGlzLl9vblBhcnNlZE9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uUGFyc2VkT2JzZXJ2ZXIgPSB0aGlzLm9uUGFyc2VkT2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIEVuZCBDb21tb24gb3B0aW9uc1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gQmVnaW4gVjEgb3B0aW9uc1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoaXMgcHJvcGVydHkgdG8gZmFsc2UgdG8gZGlzYWJsZSBpbmNyZW1lbnRhbCBsb2FkaW5nIHdoaWNoIGRlbGF5cyB0aGUgbG9hZGVyIGZyb20gY2FsbGluZyB0aGUgc3VjY2VzcyBjYWxsYmFjayB1bnRpbCBhZnRlciBsb2FkaW5nIHRoZSBtZXNoZXMgYW5kIHNoYWRlcnMuXHJcbiAgICAgKiBUZXh0dXJlcyBhbHdheXMgbG9hZHMgYXN5bmNocm9ub3VzbHkuIEZvciBleGFtcGxlLCB0aGUgc3VjY2VzcyBjYWxsYmFjayBjYW4gY29tcHV0ZSB0aGUgYm91bmRpbmcgaW5mb3JtYXRpb24gb2YgdGhlIGxvYWRlZCBtZXNoZXMgd2hlbiBpbmNyZW1lbnRhbCBsb2FkaW5nIGlzIGRpc2FibGVkLlxyXG4gICAgICogRGVmYXVsdHMgdG8gdHJ1ZS5cclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEluY3JlbWVudGFsTG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhpcyBwcm9wZXJ0eSB0byB0cnVlIGluIG9yZGVyIHRvIHdvcmsgd2l0aCBob21vZ2VuZW91cyBjb29yZGluYXRlcywgYXZhaWxhYmxlIHdpdGggc29tZSBjb252ZXJ0ZXJzIGFuZCBleHBvcnRlcnMuXHJcbiAgICAgKiBEZWZhdWx0cyB0byBmYWxzZS4gU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0hvbW9nZW5lb3VzX2Nvb3JkaW5hdGVzLlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSG9tb2dlbmVvdXNDb29yZGluYXRlcyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBFbmQgVjEgb3B0aW9uc1xyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmFibGUgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgbWVzaCBhZnRlciBwYXJzaW5nIHRoZSBnbFRGIHByb3BlcnRpZXMgb2YgdGhlIG1lc2guXHJcbiAgICAgKiBOb3RlIHRoYXQgdGhlIG9ic2VydmFibGUgaXMgcmFpc2VkIGFzIHNvb24gYXMgdGhlIG1lc2ggb2JqZWN0IGlzIGNyZWF0ZWQsIG1lYW5pbmcgc29tZSBkYXRhIG1heSBub3QgaGF2ZSBiZWVuIHNldHVwIHlldCBmb3IgdGhpcyBtZXNoICh2ZXJ0ZXggZGF0YSwgbW9ycGggdGFyZ2V0cywgbWF0ZXJpYWwsIC4uLilcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9uTWVzaExvYWRlZE9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxBYnN0cmFjdE1lc2g+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25NZXNoTG9hZGVkT2JzZXJ2ZXI6IE51bGxhYmxlPE9ic2VydmVyPEFic3RyYWN0TWVzaD4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgbWVzaCBhZnRlciBwYXJzaW5nIHRoZSBnbFRGIHByb3BlcnRpZXMgb2YgdGhlIG1lc2guXHJcbiAgICAgKiBOb3RlIHRoYXQgdGhlIGNhbGxiYWNrIGlzIGNhbGxlZCBhcyBzb29uIGFzIHRoZSBtZXNoIG9iamVjdCBpcyBjcmVhdGVkLCBtZWFuaW5nIHNvbWUgZGF0YSBtYXkgbm90IGhhdmUgYmVlbiBzZXR1cCB5ZXQgZm9yIHRoaXMgbWVzaCAodmVydGV4IGRhdGEsIG1vcnBoIHRhcmdldHMsIG1hdGVyaWFsLCAuLi4pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgb25NZXNoTG9hZGVkKGNhbGxiYWNrOiAoKG1lc2g6IEFic3RyYWN0TWVzaCkgPT4gdm9pZCkgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodGhpcy5fb25NZXNoTG9hZGVkT2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk1lc2hMb2FkZWRPYnNlcnZhYmxlLnJlbW92ZSh0aGlzLl9vbk1lc2hMb2FkZWRPYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9vbk1lc2hMb2FkZWRPYnNlcnZlciA9IHRoaXMub25NZXNoTG9hZGVkT2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmFibGUgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgc2tpbiBhZnRlciBwYXJzaW5nIHRoZSBnbFRGIHByb3BlcnRpZXMgb2YgdGhlIHNraW4gbm9kZS5cclxuICAgICAqIEBzZWUgaHR0cHM6Ly9kb2MuYmFieWxvbmpzLmNvbS9mZWF0dXJlcy9mZWF0dXJlc0RlZXBEaXZlL2ltcG9ydGVycy9nbFRGL2dsVEZTa2lubmluZyNpZ25vcmluZy10aGUtdHJhbnNmb3JtLW9mLXRoZS1za2lubmVkLW1lc2hcclxuICAgICAqIEBwYXJhbSBub2RlIC0gdGhlIHRyYW5zZm9ybSBub2RlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIG9yaWdpbmFsIGdsVEYgc2tpbiBub2RlIHVzZWQgZm9yIGFuaW1hdGlvbnNcclxuICAgICAqIEBwYXJhbSBza2lubmVkTm9kZSAtIHRoZSB0cmFuc2Zvcm0gbm9kZSB0aGF0IGlzIHRoZSBza2lubmVkIG1lc2ggaXRzZWxmIG9yIHRoZSBwYXJlbnQgb2YgdGhlIHNraW5uZWQgbWVzaGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBvblNraW5Mb2FkZWRPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8eyBub2RlOiBUcmFuc2Zvcm1Ob2RlOyBza2lubmVkTm9kZTogVHJhbnNmb3JtTm9kZSB9PigpO1xyXG5cclxuICAgIHByaXZhdGUgX29uU2tpbkxvYWRlZE9ic2VydmVyOiBOdWxsYWJsZTxPYnNlcnZlcjx7IG5vZGU6IFRyYW5zZm9ybU5vZGU7IHNraW5uZWROb2RlOiBUcmFuc2Zvcm1Ob2RlIH0+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCB3aGVuIHRoZSBsb2FkZXIgY3JlYXRlcyBhIHNraW4gYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBza2luIG5vZGUuXHJcbiAgICAgKiBAc2VlIGh0dHBzOi8vZG9jLmJhYnlsb25qcy5jb20vZmVhdHVyZXMvZmVhdHVyZXNEZWVwRGl2ZS9pbXBvcnRlcnMvZ2xURi9nbFRGU2tpbm5pbmcjaWdub3JpbmctdGhlLXRyYW5zZm9ybS1vZi10aGUtc2tpbm5lZC1tZXNoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgb25Ta2luTG9hZGVkKGNhbGxiYWNrOiAoKG5vZGU6IFRyYW5zZm9ybU5vZGUsIHNraW5uZWROb2RlOiBUcmFuc2Zvcm1Ob2RlKSA9PiB2b2lkKSB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vblNraW5Mb2FkZWRPYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uU2tpbkxvYWRlZE9ic2VydmFibGUucmVtb3ZlKHRoaXMuX29uU2tpbkxvYWRlZE9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uU2tpbkxvYWRlZE9ic2VydmVyID0gdGhpcy5vblNraW5Mb2FkZWRPYnNlcnZhYmxlLmFkZCgoZGF0YSkgPT4gY2FsbGJhY2soZGF0YS5ub2RlLCBkYXRhLnNraW5uZWROb2RlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2YWJsZSByYWlzZWQgd2hlbiB0aGUgbG9hZGVyIGNyZWF0ZXMgYSB0ZXh0dXJlIGFmdGVyIHBhcnNpbmcgdGhlIGdsVEYgcHJvcGVydGllcyBvZiB0aGUgdGV4dHVyZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9uVGV4dHVyZUxvYWRlZE9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxCYXNlVGV4dHVyZT4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9vblRleHR1cmVMb2FkZWRPYnNlcnZlcjogTnVsbGFibGU8T2JzZXJ2ZXI8QmFzZVRleHR1cmU+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCB3aGVuIHRoZSBsb2FkZXIgY3JlYXRlcyBhIHRleHR1cmUgYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSB0ZXh0dXJlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG9uVGV4dHVyZUxvYWRlZChjYWxsYmFjazogKCh0ZXh0dXJlOiBCYXNlVGV4dHVyZSkgPT4gdm9pZCkgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodGhpcy5fb25UZXh0dXJlTG9hZGVkT2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vblRleHR1cmVMb2FkZWRPYnNlcnZhYmxlLnJlbW92ZSh0aGlzLl9vblRleHR1cmVMb2FkZWRPYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9vblRleHR1cmVMb2FkZWRPYnNlcnZlciA9IHRoaXMub25UZXh0dXJlTG9hZGVkT2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmFibGUgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgbWF0ZXJpYWwgYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBtYXRlcmlhbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9uTWF0ZXJpYWxMb2FkZWRPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8TWF0ZXJpYWw+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25NYXRlcmlhbExvYWRlZE9ic2VydmVyOiBOdWxsYWJsZTxPYnNlcnZlcjxNYXRlcmlhbD4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBjcmVhdGVzIGEgbWF0ZXJpYWwgYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBtYXRlcmlhbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBvbk1hdGVyaWFsTG9hZGVkKGNhbGxiYWNrOiAoKG1hdGVyaWFsOiBNYXRlcmlhbCkgPT4gdm9pZCkgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodGhpcy5fb25NYXRlcmlhbExvYWRlZE9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25NYXRlcmlhbExvYWRlZE9ic2VydmFibGUucmVtb3ZlKHRoaXMuX29uTWF0ZXJpYWxMb2FkZWRPYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9vbk1hdGVyaWFsTG9hZGVkT2JzZXJ2ZXIgPSB0aGlzLm9uTWF0ZXJpYWxMb2FkZWRPYnNlcnZhYmxlLmFkZChjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2YWJsZSByYWlzZWQgd2hlbiB0aGUgbG9hZGVyIGNyZWF0ZXMgYSBjYW1lcmEgYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBjYW1lcmEuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBvbkNhbWVyYUxvYWRlZE9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxDYW1lcmE+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25DYW1lcmFMb2FkZWRPYnNlcnZlcjogTnVsbGFibGU8T2JzZXJ2ZXI8Q2FtZXJhPj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayByYWlzZWQgd2hlbiB0aGUgbG9hZGVyIGNyZWF0ZXMgYSBjYW1lcmEgYWZ0ZXIgcGFyc2luZyB0aGUgZ2xURiBwcm9wZXJ0aWVzIG9mIHRoZSBjYW1lcmEuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgb25DYW1lcmFMb2FkZWQoY2FsbGJhY2s6ICgoY2FtZXJhOiBDYW1lcmEpID0+IHZvaWQpIHwgdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uQ2FtZXJhTG9hZGVkT2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNhbWVyYUxvYWRlZE9ic2VydmFibGUucmVtb3ZlKHRoaXMuX29uQ2FtZXJhTG9hZGVkT2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fb25DYW1lcmFMb2FkZWRPYnNlcnZlciA9IHRoaXMub25DYW1lcmFMb2FkZWRPYnNlcnZhYmxlLmFkZChjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JzZXJ2YWJsZSByYWlzZWQgd2hlbiB0aGUgYXNzZXQgaXMgY29tcGxldGVseSBsb2FkZWQsIGltbWVkaWF0ZWx5IGJlZm9yZSB0aGUgbG9hZGVyIGlzIGRpc3Bvc2VkLlxyXG4gICAgICogRm9yIGFzc2V0cyB3aXRoIExPRHMsIHJhaXNlZCB3aGVuIGFsbCBvZiB0aGUgTE9EcyBhcmUgY29tcGxldGUuXHJcbiAgICAgKiBGb3IgYXNzZXRzIHdpdGhvdXQgTE9EcywgcmFpc2VkIHdoZW4gdGhlIG1vZGVsIGlzIGNvbXBsZXRlLCBpbW1lZGlhdGVseSBhZnRlciB0aGUgbG9hZGVyIHJlc29sdmVzIHRoZSByZXR1cm5lZCBwcm9taXNlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgb25Db21wbGV0ZU9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTx2b2lkPigpO1xyXG5cclxuICAgIHByaXZhdGUgX29uQ29tcGxldGVPYnNlcnZlcjogTnVsbGFibGU8T2JzZXJ2ZXI8dm9pZD4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgcmFpc2VkIHdoZW4gdGhlIGFzc2V0IGlzIGNvbXBsZXRlbHkgbG9hZGVkLCBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIGxvYWRlciBpcyBkaXNwb3NlZC5cclxuICAgICAqIEZvciBhc3NldHMgd2l0aCBMT0RzLCByYWlzZWQgd2hlbiBhbGwgb2YgdGhlIExPRHMgYXJlIGNvbXBsZXRlLlxyXG4gICAgICogRm9yIGFzc2V0cyB3aXRob3V0IExPRHMsIHJhaXNlZCB3aGVuIHRoZSBtb2RlbCBpcyBjb21wbGV0ZSwgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlIGxvYWRlciByZXNvbHZlcyB0aGUgcmV0dXJuZWQgcHJvbWlzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldCBvbkNvbXBsZXRlKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uQ29tcGxldGVPYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29tcGxldGVPYnNlcnZhYmxlLnJlbW92ZSh0aGlzLl9vbkNvbXBsZXRlT2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vbkNvbXBsZXRlT2JzZXJ2ZXIgPSB0aGlzLm9uQ29tcGxldGVPYnNlcnZhYmxlLmFkZChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZhYmxlIHJhaXNlZCB3aGVuIGFuIGVycm9yIG9jY3Vycy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9uRXJyb3JPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8YW55PigpO1xyXG5cclxuICAgIHByaXZhdGUgX29uRXJyb3JPYnNlcnZlcjogTnVsbGFibGU8T2JzZXJ2ZXI8YW55Pj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayByYWlzZWQgd2hlbiBhbiBlcnJvciBvY2N1cnMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgb25FcnJvcihjYWxsYmFjazogKHJlYXNvbjogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uRXJyb3JPYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uRXJyb3JPYnNlcnZhYmxlLnJlbW92ZSh0aGlzLl9vbkVycm9yT2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vbkVycm9yT2JzZXJ2ZXIgPSB0aGlzLm9uRXJyb3JPYnNlcnZhYmxlLmFkZChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnNlcnZhYmxlIHJhaXNlZCBhZnRlciB0aGUgbG9hZGVyIGlzIGRpc3Bvc2VkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgb25EaXNwb3NlT2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlPHZvaWQ+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25EaXNwb3NlT2JzZXJ2ZXI6IE51bGxhYmxlPE9ic2VydmVyPHZvaWQ+PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHJhaXNlZCBhZnRlciB0aGUgbG9hZGVyIGlzIGRpc3Bvc2VkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG9uRGlzcG9zZShjYWxsYmFjazogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkRpc3Bvc2VPYnNlcnZlcikge1xyXG4gICAgICAgICAgICB0aGlzLm9uRGlzcG9zZU9ic2VydmFibGUucmVtb3ZlKHRoaXMuX29uRGlzcG9zZU9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb25EaXNwb3NlT2JzZXJ2ZXIgPSB0aGlzLm9uRGlzcG9zZU9ic2VydmFibGUuYWRkKGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmFibGUgcmFpc2VkIGFmdGVyIGEgbG9hZGVyIGV4dGVuc2lvbiBpcyBjcmVhdGVkLlxyXG4gICAgICogU2V0IGFkZGl0aW9uYWwgb3B0aW9ucyBmb3IgYSBsb2FkZXIgZXh0ZW5zaW9uIGluIHRoaXMgZXZlbnQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBvbkV4dGVuc2lvbkxvYWRlZE9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZTxJR0xURkxvYWRlckV4dGVuc2lvbj4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9vbkV4dGVuc2lvbkxvYWRlZE9ic2VydmVyOiBOdWxsYWJsZTxPYnNlcnZlcjxJR0xURkxvYWRlckV4dGVuc2lvbj4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgcmFpc2VkIGFmdGVyIGEgbG9hZGVyIGV4dGVuc2lvbiBpcyBjcmVhdGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG9uRXh0ZW5zaW9uTG9hZGVkKGNhbGxiYWNrOiAoZXh0ZW5zaW9uOiBJR0xURkxvYWRlckV4dGVuc2lvbikgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkV4dGVuc2lvbkxvYWRlZE9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25FeHRlbnNpb25Mb2FkZWRPYnNlcnZhYmxlLnJlbW92ZSh0aGlzLl9vbkV4dGVuc2lvbkxvYWRlZE9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb25FeHRlbnNpb25Mb2FkZWRPYnNlcnZlciA9IHRoaXMub25FeHRlbnNpb25Mb2FkZWRPYnNlcnZhYmxlLmFkZChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBsb2FkZXIgbG9nZ2luZyBpcyBlbmFibGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxvZ2dpbmdFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2dnaW5nRW5hYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGxvZ2dpbmdFbmFibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvZ2dpbmdFbmFibGVkID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sb2dnaW5nRW5hYmxlZCA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbG9nZ2luZ0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9nID0gdGhpcy5fbG9nRW5hYmxlZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2cgPSB0aGlzLl9sb2dEaXNhYmxlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGlmIHRoZSBsb2FkZXIgc2hvdWxkIGNhcHR1cmUgcGVyZm9ybWFuY2UgY291bnRlcnMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY2FwdHVyZVBlcmZvcm1hbmNlQ291bnRlcnMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhcHR1cmVQZXJmb3JtYW5jZUNvdW50ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY2FwdHVyZVBlcmZvcm1hbmNlQ291bnRlcnModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5fY2FwdHVyZVBlcmZvcm1hbmNlQ291bnRlcnMgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NhcHR1cmVQZXJmb3JtYW5jZUNvdW50ZXJzID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jYXB0dXJlUGVyZm9ybWFuY2VDb3VudGVycykge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydFBlcmZvcm1hbmNlQ291bnRlciA9IHRoaXMuX3N0YXJ0UGVyZm9ybWFuY2VDb3VudGVyRW5hYmxlZDtcclxuICAgICAgICAgICAgdGhpcy5fZW5kUGVyZm9ybWFuY2VDb3VudGVyID0gdGhpcy5fZW5kUGVyZm9ybWFuY2VDb3VudGVyRW5hYmxlZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydFBlcmZvcm1hbmNlQ291bnRlciA9IHRoaXMuX3N0YXJ0UGVyZm9ybWFuY2VDb3VudGVyRGlzYWJsZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZFBlcmZvcm1hbmNlQ291bnRlciA9IHRoaXMuX2VuZFBlcmZvcm1hbmNlQ291bnRlckRpc2FibGVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgaWYgdGhlIGxvYWRlciBzaG91bGQgdmFsaWRhdGUgdGhlIGFzc2V0LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmFibGUgcmFpc2VkIGFmdGVyIHZhbGlkYXRpb24gd2hlbiB2YWxpZGF0ZSBpcyBzZXQgdG8gdHJ1ZS4gVGhlIGV2ZW50IGRhdGEgaXMgdGhlIHJlc3VsdCBvZiB0aGUgdmFsaWRhdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IG9uVmFsaWRhdGVkT2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlPEdMVEYyLklHTFRGVmFsaWRhdGlvblJlc3VsdHM+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfb25WYWxpZGF0ZWRPYnNlcnZlcjogTnVsbGFibGU8T2JzZXJ2ZXI8R0xURjIuSUdMVEZWYWxpZGF0aW9uUmVzdWx0cz4+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgcmFpc2VkIGFmdGVyIGEgbG9hZGVyIGV4dGVuc2lvbiBpcyBjcmVhdGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IG9uVmFsaWRhdGVkKGNhbGxiYWNrOiAocmVzdWx0czogR0xURjIuSUdMVEZWYWxpZGF0aW9uUmVzdWx0cykgPT4gdm9pZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vblZhbGlkYXRlZE9ic2VydmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25WYWxpZGF0ZWRPYnNlcnZhYmxlLnJlbW92ZSh0aGlzLl9vblZhbGlkYXRlZE9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb25WYWxpZGF0ZWRPYnNlcnZlciA9IHRoaXMub25WYWxpZGF0ZWRPYnNlcnZhYmxlLmFkZChjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9hZGVyOiBOdWxsYWJsZTxJR0xURkxvYWRlcj4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc3RhdGU6IE51bGxhYmxlPEdMVEZMb2FkZXJTdGF0ZT4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfcHJvZ3Jlc3NDYWxsYmFjaz86IChldmVudDogSVNjZW5lTG9hZGVyUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX3JlcXVlc3RzID0gbmV3IEFycmF5PElGaWxlUmVxdWVzdEluZm8+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOYW1lIG9mIHRoZSBsb2FkZXIgKFwiZ2x0ZlwiKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IEdMVEZGaWxlTG9hZGVyTWV0YWRhdGEubmFtZTtcclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgZXh0ZW5zaW9ucyA9IEdMVEZGaWxlTG9hZGVyTWV0YWRhdGEuZXh0ZW5zaW9ucztcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc3Bvc2VzIHRoZSBsb2FkZXIsIHJlbGVhc2VzIHJlc291cmNlcyBkdXJpbmcgbG9hZCwgYW5kIGNhbmNlbHMgYW55IG91dHN0YW5kaW5nIHJlcXVlc3RzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbG9hZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHJlcXVlc3Qgb2YgdGhpcy5fcmVxdWVzdHMpIHtcclxuICAgICAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVxdWVzdHMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX3Byb2dyZXNzQ2FsbGJhY2s7XHJcblxyXG4gICAgICAgIHRoaXMucHJlcHJvY2Vzc1VybEFzeW5jID0gKHVybCkgPT4gUHJvbWlzZS5yZXNvbHZlKHVybCk7XHJcblxyXG4gICAgICAgIHRoaXMub25NZXNoTG9hZGVkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMub25Ta2luTG9hZGVkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMub25UZXh0dXJlTG9hZGVkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMub25NYXRlcmlhbExvYWRlZE9ic2VydmFibGUuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLm9uQ2FtZXJhTG9hZGVkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMub25Db21wbGV0ZU9ic2VydmFibGUuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLm9uRXh0ZW5zaW9uTG9hZGVkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG5cclxuICAgICAgICB0aGlzLm9uRGlzcG9zZU9ic2VydmFibGUubm90aWZ5T2JzZXJ2ZXJzKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgdGhpcy5vbkRpc3Bvc2VPYnNlcnZhYmxlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRGaWxlKFxyXG4gICAgICAgIHNjZW5lOiBTY2VuZSxcclxuICAgICAgICBmaWxlT3JVcmw6IEZpbGUgfCBzdHJpbmcgfCBBcnJheUJ1ZmZlclZpZXcsXHJcbiAgICAgICAgcm9vdFVybDogc3RyaW5nLFxyXG4gICAgICAgIG9uU3VjY2VzczogKGRhdGE6IHVua25vd24sIHJlc3BvbnNlVVJMPzogc3RyaW5nKSA9PiB2b2lkLFxyXG4gICAgICAgIG9uUHJvZ3Jlc3M/OiAoZXY6IElTY2VuZUxvYWRlclByb2dyZXNzRXZlbnQpID0+IHZvaWQsXHJcbiAgICAgICAgdXNlQXJyYXlCdWZmZXI/OiBib29sZWFuLFxyXG4gICAgICAgIG9uRXJyb3I/OiAocmVxdWVzdD86IFdlYlJlcXVlc3QsIGV4Y2VwdGlvbj86IExvYWRGaWxlRXJyb3IpID0+IHZvaWQsXHJcbiAgICAgICAgbmFtZT86IHN0cmluZ1xyXG4gICAgKTogTnVsbGFibGU8SUZpbGVSZXF1ZXN0PiB7XHJcbiAgICAgICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhmaWxlT3JVcmwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRCaW5hcnkoc2NlbmUsIGZpbGVPclVybCBhcyBBcnJheUJ1ZmZlclZpZXcsIHJvb3RVcmwsIG9uU3VjY2Vzcywgb25FcnJvciwgbmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZ3Jlc3NDYWxsYmFjayA9IG9uUHJvZ3Jlc3M7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gKGZpbGVPclVybCBhcyBGaWxlKS5uYW1lIHx8IFRvb2xzLkdldEZpbGVuYW1lKGZpbGVPclVybCBhcyBzdHJpbmcpO1xyXG5cclxuICAgICAgICBpZiAodXNlQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudXNlUmFuZ2VSZXF1ZXN0cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuV2FybihcImdsVEYgdmFsaWRhdGlvbiBpcyBub3Qgc3VwcG9ydGVkIHdoZW4gcmFuZ2UgcmVxdWVzdHMgYXJlIGVuYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZVJlcXVlc3Q6IElGaWxlUmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhYm9ydDogKCkgPT4ge30sXHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZU9ic2VydmFibGU6IG5ldyBPYnNlcnZhYmxlPElGaWxlUmVxdWVzdD4oKSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YUJ1ZmZlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkQXN5bmM6IChieXRlT2Zmc2V0OiBudW1iZXIsIGJ5dGVMZW5ndGg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8QXJyYXlCdWZmZXJWaWV3PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkRmlsZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlT3JVcmwgYXMgRmlsZSB8IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBVaW50OEFycmF5KGRhdGEgYXMgQXJyYXlCdWZmZXIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2ViUmVxdWVzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJSYW5nZVwiLCBgYnl0ZXM9JHtieXRlT2Zmc2V0fS0ke2J5dGVPZmZzZXQgKyBieXRlTGVuZ3RoIC0gMX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IDAsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3VucGFja0JpbmFyeUFzeW5jKG5ldyBEYXRhUmVhZGVyKGRhdGFCdWZmZXIpKS50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChsb2FkZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVSZXF1ZXN0Lm9uQ29tcGxldGVPYnNlcnZhYmxlLm5vdGlmeU9ic2VydmVycyhmaWxlUmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzcyhsb2FkZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IgPyAoZXJyb3IpID0+IG9uRXJyb3IodW5kZWZpbmVkLCBlcnJvcikgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVSZXF1ZXN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZEZpbGUoXHJcbiAgICAgICAgICAgICAgICBzY2VuZSxcclxuICAgICAgICAgICAgICAgIGZpbGVPclVybCBhcyBGaWxlIHwgc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWxpZGF0ZShzY2VuZSwgbmV3IFVpbnQ4QXJyYXkoZGF0YSBhcyBBcnJheUJ1ZmZlciwgMCwgKGRhdGEgYXMgQXJyYXlCdWZmZXIpLmJ5dGVMZW5ndGgpLCByb290VXJsLCBmaWxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW5wYWNrQmluYXJ5QXN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRhUmVhZGVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRBc3luYzogKGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpID0+IHJlYWRBc3luYyhkYXRhIGFzIEFycmF5QnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IChkYXRhIGFzIEFycmF5QnVmZmVyKS5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICkudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGxvYWRlckRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzcyhsb2FkZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvciA/IChlcnJvcikgPT4gb25FcnJvcih1bmRlZmluZWQsIGVycm9yKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9uRXJyb3JcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZEZpbGUoXHJcbiAgICAgICAgICAgICAgICBzY2VuZSxcclxuICAgICAgICAgICAgICAgIGZpbGVPclVybCxcclxuICAgICAgICAgICAgICAgIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsaWRhdGUoc2NlbmUsIGRhdGEgYXMgc3RyaW5nLCByb290VXJsLCBmaWxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzcyh7IGpzb246IHRoaXMuX3BhcnNlSnNvbihkYXRhIGFzIHN0cmluZykgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBvbkVycm9yXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvYWRCaW5hcnkoXHJcbiAgICAgICAgc2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIGRhdGE6IEFycmF5QnVmZmVyVmlldyxcclxuICAgICAgICByb290VXJsOiBzdHJpbmcsXHJcbiAgICAgICAgb25TdWNjZXNzOiAoZGF0YTogdW5rbm93biwgcmVzcG9uc2VVUkw/OiBzdHJpbmcpID0+IHZvaWQsXHJcbiAgICAgICAgb25FcnJvcj86IChyZXF1ZXN0PzogV2ViUmVxdWVzdCwgZXhjZXB0aW9uPzogTG9hZEZpbGVFcnJvcikgPT4gdm9pZCxcclxuICAgICAgICBmaWxlTmFtZT86IHN0cmluZ1xyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdmFsaWRhdGUoc2NlbmUsIG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGEuYnl0ZUxlbmd0aCksIHJvb3RVcmwsIGZpbGVOYW1lKTtcclxuICAgICAgICB0aGlzLl91bnBhY2tCaW5hcnlBc3luYyhcclxuICAgICAgICAgICAgbmV3IERhdGFSZWFkZXIoe1xyXG4gICAgICAgICAgICAgICAgcmVhZEFzeW5jOiAoYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkgPT4gcmVhZFZpZXdBc3luYyhkYXRhLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSxcclxuICAgICAgICAgICAgICAgIGJ5dGVMZW5ndGg6IGRhdGEuYnl0ZUxlbmd0aCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApLnRoZW4oXHJcbiAgICAgICAgICAgIChsb2FkZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3MobG9hZGVyRGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRXJyb3IgPyAoZXJyb3IpID0+IG9uRXJyb3IodW5kZWZpbmVkLCBlcnJvcikgOiB1bmRlZmluZWRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbXBvcnRNZXNoQXN5bmMoXHJcbiAgICAgICAgbWVzaGVzTmFtZXM6IHN0cmluZyB8IHJlYWRvbmx5IHN0cmluZ1tdIHwgbnVsbCB8IHVuZGVmaW5lZCxcclxuICAgICAgICBzY2VuZTogU2NlbmUsXHJcbiAgICAgICAgZGF0YTogSUdMVEZMb2FkZXJEYXRhLFxyXG4gICAgICAgIHJvb3RVcmw6IHN0cmluZyxcclxuICAgICAgICBvblByb2dyZXNzPzogKGV2ZW50OiBJU2NlbmVMb2FkZXJQcm9ncmVzc0V2ZW50KSA9PiB2b2lkLFxyXG4gICAgICAgIGZpbGVOYW1lPzogc3RyaW5nXHJcbiAgICApOiBQcm9taXNlPElTY2VuZUxvYWRlckFzeW5jUmVzdWx0PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uUGFyc2VkT2JzZXJ2YWJsZS5ub3RpZnlPYnNlcnZlcnMoZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMub25QYXJzZWRPYnNlcnZhYmxlLmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sb2coYExvYWRpbmcgJHtmaWxlTmFtZSB8fCBcIlwifWApO1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkZXIgPSB0aGlzLl9nZXRMb2FkZXIoZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkZXIuaW1wb3J0TWVzaEFzeW5jKG1lc2hlc05hbWVzLCBzY2VuZSwgbnVsbCwgZGF0YSwgcm9vdFVybCwgb25Qcm9ncmVzcywgZmlsZU5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQXN5bmMoc2NlbmU6IFNjZW5lLCBkYXRhOiBJR0xURkxvYWRlckRhdGEsIHJvb3RVcmw6IHN0cmluZywgb25Qcm9ncmVzcz86IChldmVudDogSVNjZW5lTG9hZGVyUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZCwgZmlsZU5hbWU/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25QYXJzZWRPYnNlcnZhYmxlLm5vdGlmeU9ic2VydmVycyhkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5vblBhcnNlZE9ic2VydmFibGUuY2xlYXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2xvZyhgTG9hZGluZyAke2ZpbGVOYW1lIHx8IFwiXCJ9YCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlciA9IHRoaXMuX2dldExvYWRlcihkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlci5sb2FkQXN5bmMoc2NlbmUsIGRhdGEsIHJvb3RVcmwsIG9uUHJvZ3Jlc3MsIGZpbGVOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEFzc2V0Q29udGFpbmVyQXN5bmMoXHJcbiAgICAgICAgc2NlbmU6IFNjZW5lLFxyXG4gICAgICAgIGRhdGE6IElHTFRGTG9hZGVyRGF0YSxcclxuICAgICAgICByb290VXJsOiBzdHJpbmcsXHJcbiAgICAgICAgb25Qcm9ncmVzcz86IChldmVudDogSVNjZW5lTG9hZGVyUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZCxcclxuICAgICAgICBmaWxlTmFtZT86IHN0cmluZ1xyXG4gICAgKTogUHJvbWlzZTxBc3NldENvbnRhaW5lcj4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblBhcnNlZE9ic2VydmFibGUubm90aWZ5T2JzZXJ2ZXJzKGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLm9uUGFyc2VkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbG9nKGBMb2FkaW5nICR7ZmlsZU5hbWUgfHwgXCJcIn1gKTtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZGVyID0gdGhpcy5fZ2V0TG9hZGVyKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgLy8gUHJlcGFyZSB0aGUgYXNzZXQgY29udGFpbmVyLlxyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBuZXcgQXNzZXRDb250YWluZXIoc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IG1hdGVyaWFscy90ZXh0dXJlcyB3aGVuIGxvYWRpbmcgdG8gYWRkIHRvIGNvbnRhaW5lclxyXG4gICAgICAgICAgICBjb25zdCBtYXRlcmlhbHM6IEFycmF5PE1hdGVyaWFsPiA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLm9uTWF0ZXJpYWxMb2FkZWRPYnNlcnZhYmxlLmFkZCgobWF0ZXJpYWwpID0+IHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFscy5wdXNoKG1hdGVyaWFsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmVzOiBBcnJheTxCYXNlVGV4dHVyZT4gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5vblRleHR1cmVMb2FkZWRPYnNlcnZhYmxlLmFkZCgodGV4dHVyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZXMucHVzaCh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbWVyYXM6IEFycmF5PENhbWVyYT4gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5vbkNhbWVyYUxvYWRlZE9ic2VydmFibGUuYWRkKChjYW1lcmEpID0+IHtcclxuICAgICAgICAgICAgICAgIGNhbWVyYXMucHVzaChjYW1lcmEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1vcnBoVGFyZ2V0TWFuYWdlcnM6IEFycmF5PE1vcnBoVGFyZ2V0TWFuYWdlcj4gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5vbk1lc2hMb2FkZWRPYnNlcnZhYmxlLmFkZCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc2gubW9ycGhUYXJnZXRNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhUYXJnZXRNYW5hZ2Vycy5wdXNoKG1lc2gubW9ycGhUYXJnZXRNYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVyLmltcG9ydE1lc2hBc3luYyhudWxsLCBzY2VuZSwgY29udGFpbmVyLCBkYXRhLCByb290VXJsLCBvblByb2dyZXNzLCBmaWxlTmFtZSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjb250YWluZXIuZ2VvbWV0cmllcywgcmVzdWx0Lmdlb21ldHJpZXMpO1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY29udGFpbmVyLm1lc2hlcywgcmVzdWx0Lm1lc2hlcyk7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjb250YWluZXIucGFydGljbGVTeXN0ZW1zLCByZXN1bHQucGFydGljbGVTeXN0ZW1zKTtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNvbnRhaW5lci5za2VsZXRvbnMsIHJlc3VsdC5za2VsZXRvbnMpO1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY29udGFpbmVyLmFuaW1hdGlvbkdyb3VwcywgcmVzdWx0LmFuaW1hdGlvbkdyb3Vwcyk7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjb250YWluZXIubWF0ZXJpYWxzLCBtYXRlcmlhbHMpO1xyXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY29udGFpbmVyLnRleHR1cmVzLCB0ZXh0dXJlcyk7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjb250YWluZXIubGlnaHRzLCByZXN1bHQubGlnaHRzKTtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNvbnRhaW5lci50cmFuc2Zvcm1Ob2RlcywgcmVzdWx0LnRyYW5zZm9ybU5vZGVzKTtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNvbnRhaW5lci5jYW1lcmFzLCBjYW1lcmFzKTtcclxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNvbnRhaW5lci5tb3JwaFRhcmdldE1hbmFnZXJzLCBtb3JwaFRhcmdldE1hbmFnZXJzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjYW5EaXJlY3RMb2FkKGRhdGE6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBHTFRGRmlsZUxvYWRlck1ldGFkYXRhLmNhbkRpcmVjdExvYWQoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpcmVjdExvYWQoc2NlbmU6IFNjZW5lLCBkYXRhOiBzdHJpbmcpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgZGF0YS5zdGFydHNXaXRoKFwiYmFzZTY0LFwiICsgR0xURk1hZ2ljQmFzZTY0RW5jb2RlZCkgfHwgLy8gdGhpcyBpcyB0ZWNobmljYWxseSBpbmNvcnJlY3QsIGJ1dCB3aWxsIGNvbnRpbnVlIHRvIHN1cHBvcnQgZm9yIGJhY2tjb21wYXQuXHJcbiAgICAgICAgICAgIGRhdGEuc3RhcnRzV2l0aChcIjtiYXNlNjQsXCIgKyBHTFRGTWFnaWNCYXNlNjRFbmNvZGVkKSB8fFxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0c1dpdGgoXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07YmFzZTY0LFwiICsgR0xURk1hZ2ljQmFzZTY0RW5jb2RlZCkgfHxcclxuICAgICAgICAgICAgZGF0YS5zdGFydHNXaXRoKFwibW9kZWwvZ2x0Zi1iaW5hcnk7YmFzZTY0LFwiICsgR0xURk1hZ2ljQmFzZTY0RW5jb2RlZClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSBEZWNvZGVCYXNlNjRVcmxUb0JpbmFyeShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlKHNjZW5lLCBuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlciwgMCwgYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdW5wYWNrQmluYXJ5QXN5bmMoXHJcbiAgICAgICAgICAgICAgICBuZXcgRGF0YVJlYWRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZEFzeW5jOiAoYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkgPT4gcmVhZEFzeW5jKGFycmF5QnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSxcclxuICAgICAgICAgICAgICAgICAgICBieXRlTGVuZ3RoOiBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlKHNjZW5lLCBkYXRhKTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsganNvbjogdGhpcy5fcGFyc2VKc29uKGRhdGEpIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNhbGxiYWNrIHRoYXQgYWxsb3dzIGN1c3RvbSBoYW5kbGluZyBvZiB0aGUgcm9vdCB1cmwgYmFzZWQgb24gdGhlIHJlc3BvbnNlIHVybC5cclxuICAgICAqIEBwYXJhbSByb290VXJsIHRoZSBvcmlnaW5hbCByb290IHVybFxyXG4gICAgICogQHBhcmFtIHJlc3BvbnNlVVJMIHRoZSByZXNwb25zZSB1cmwgaWYgYXZhaWxhYmxlXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgbmV3IHJvb3QgdXJsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXdyaXRlUm9vdFVSTD8ocm9vdFVybDogc3RyaW5nLCByZXNwb25zZVVSTD86IHN0cmluZyk6IHN0cmluZztcclxuXHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgY3JlYXRlUGx1Z2luKG9wdGlvbnM6IFNjZW5lTG9hZGVyUGx1Z2luT3B0aW9ucyk6IElTY2VuZUxvYWRlclBsdWdpbkFzeW5jIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdMVEZGaWxlTG9hZGVyKG9wdGlvbnNbR0xURkZpbGVMb2FkZXJNZXRhZGF0YS5uYW1lXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbG9hZGVyIHN0YXRlIG9yIG51bGwgaWYgdGhlIGxvYWRlciBpcyBub3QgYWN0aXZlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGxvYWRlclN0YXRlKCk6IE51bGxhYmxlPEdMVEZMb2FkZXJTdGF0ZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9ic2VydmFibGUgcmFpc2VkIHdoZW4gdGhlIGxvYWRlciBzdGF0ZSBjaGFuZ2VzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25Mb2FkZXJTdGF0ZUNoYW5nZWRPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGU8TnVsbGFibGU8R0xURkxvYWRlclN0YXRlPj4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYXNzZXQgaXMgY29tcGxldGVseSBsb2FkZWQuXHJcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhc3NldCBpcyBjb21wbGV0ZWx5IGxvYWRlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHdoZW5Db21wbGV0ZUFzeW5jKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZU9ic2VydmFibGUuYWRkT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm9uRXJyb3JPYnNlcnZhYmxlLmFkZE9uY2UoKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfc2V0U3RhdGUoc3RhdGU6IEdMVEZMb2FkZXJTdGF0ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gc3RhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLm9uTG9hZGVyU3RhdGVDaGFuZ2VkT2JzZXJ2YWJsZS5ub3RpZnlPYnNlcnZlcnModGhpcy5fc3RhdGUpO1xyXG4gICAgICAgIHRoaXMuX2xvZyhHTFRGTG9hZGVyU3RhdGVbdGhpcy5fc3RhdGVdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2xvYWRGaWxlKFxyXG4gICAgICAgIHNjZW5lOiBTY2VuZSxcclxuICAgICAgICBmaWxlT3JVcmw6IEZpbGUgfCBzdHJpbmcsXHJcbiAgICAgICAgb25TdWNjZXNzOiAoZGF0YTogc3RyaW5nIHwgQXJyYXlCdWZmZXIpID0+IHZvaWQsXHJcbiAgICAgICAgdXNlQXJyYXlCdWZmZXI/OiBib29sZWFuLFxyXG4gICAgICAgIG9uRXJyb3I/OiAocmVxdWVzdD86IFdlYlJlcXVlc3QpID0+IHZvaWQsXHJcbiAgICAgICAgb25PcGVuZWQ/OiAocmVxdWVzdDogV2ViUmVxdWVzdCkgPT4gdm9pZFxyXG4gICAgKTogSUZpbGVSZXF1ZXN0IHtcclxuICAgICAgICBjb25zdCByZXF1ZXN0ID0gc2NlbmUuX2xvYWRGaWxlKFxyXG4gICAgICAgICAgICBmaWxlT3JVcmwsXHJcbiAgICAgICAgICAgIG9uU3VjY2VzcyxcclxuICAgICAgICAgICAgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vblByb2dyZXNzKGV2ZW50LCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHJ1ZSxcclxuICAgICAgICAgICAgdXNlQXJyYXlCdWZmZXIsXHJcbiAgICAgICAgICAgIG9uRXJyb3IsXHJcbiAgICAgICAgICAgIG9uT3BlbmVkXHJcbiAgICAgICAgKSBhcyBJRmlsZVJlcXVlc3RJbmZvO1xyXG4gICAgICAgIHJlcXVlc3Qub25Db21wbGV0ZU9ic2VydmFibGUuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gRm9yY2UgdGhlIGxlbmd0aCBjb21wdXRhYmxlIHRvIGJlIHRydWUgc2luY2Ugd2UgY2FuIGd1YXJhbnRlZSB0aGUgZGF0YSBpcyBsb2FkZWQuXHJcbiAgICAgICAgICAgIHJlcXVlc3QuX2xlbmd0aENvbXB1dGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXF1ZXN0Ll90b3RhbCA9IHJlcXVlc3QuX2xvYWRlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9yZXF1ZXN0cy5wdXNoKHJlcXVlc3QpO1xyXG4gICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX29uUHJvZ3Jlc3MoZXZlbnQ6IFByb2dyZXNzRXZlbnQsIHJlcXVlc3Q6IElGaWxlUmVxdWVzdEluZm8pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3Byb2dyZXNzQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWVzdC5fbGVuZ3RoQ29tcHV0YWJsZSA9IGV2ZW50Lmxlbmd0aENvbXB1dGFibGU7XHJcbiAgICAgICAgcmVxdWVzdC5fbG9hZGVkID0gZXZlbnQubG9hZGVkO1xyXG4gICAgICAgIHJlcXVlc3QuX3RvdGFsID0gZXZlbnQudG90YWw7XHJcblxyXG4gICAgICAgIGxldCBsZW5ndGhDb21wdXRhYmxlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbG9hZGVkID0gMDtcclxuICAgICAgICBsZXQgdG90YWwgPSAwO1xyXG4gICAgICAgIGZvciAoY29uc3QgcmVxdWVzdCBvZiB0aGlzLl9yZXF1ZXN0cykge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5fbGVuZ3RoQ29tcHV0YWJsZSA9PT0gdW5kZWZpbmVkIHx8IHJlcXVlc3QuX2xvYWRlZCA9PT0gdW5kZWZpbmVkIHx8IHJlcXVlc3QuX3RvdGFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGVuZ3RoQ29tcHV0YWJsZSA9IGxlbmd0aENvbXB1dGFibGUgJiYgcmVxdWVzdC5fbGVuZ3RoQ29tcHV0YWJsZTtcclxuICAgICAgICAgICAgbG9hZGVkICs9IHJlcXVlc3QuX2xvYWRlZDtcclxuICAgICAgICAgICAgdG90YWwgKz0gcmVxdWVzdC5fdG90YWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9wcm9ncmVzc0NhbGxiYWNrKHtcclxuICAgICAgICAgICAgbGVuZ3RoQ29tcHV0YWJsZTogbGVuZ3RoQ29tcHV0YWJsZSxcclxuICAgICAgICAgICAgbG9hZGVkOiBsb2FkZWQsXHJcbiAgICAgICAgICAgIHRvdGFsOiBsZW5ndGhDb21wdXRhYmxlID8gdG90YWwgOiAwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3ZhbGlkYXRlKHNjZW5lOiBTY2VuZSwgZGF0YTogc3RyaW5nIHwgVWludDhBcnJheSwgcm9vdFVybCA9IFwiXCIsIGZpbGVOYW1lID0gXCJcIik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zdGFydFBlcmZvcm1hbmNlQ291bnRlcihcIlZhbGlkYXRlIEpTT05cIik7XHJcbiAgICAgICAgR0xURlZhbGlkYXRpb24uVmFsaWRhdGVBc3luYyhkYXRhLCByb290VXJsLCBmaWxlTmFtZSwgKHVyaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVwcm9jZXNzVXJsQXN5bmMocm9vdFVybCArIHVyaSkudGhlbigodXJsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2NlbmUuX2xvYWRGaWxlQXN5bmModXJsLCB1bmRlZmluZWQsIHRydWUsIHRydWUpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZGF0YSwgMCwgZGF0YS5ieXRlTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmRQZXJmb3JtYW5jZUNvdW50ZXIoXCJWYWxpZGF0ZSBKU09OXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblZhbGlkYXRlZE9ic2VydmFibGUubm90aWZ5T2JzZXJ2ZXJzKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVmFsaWRhdGVkT2JzZXJ2YWJsZS5jbGVhcigpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmRQZXJmb3JtYW5jZUNvdW50ZXIoXCJWYWxpZGF0ZSBKU09OXCIpO1xyXG4gICAgICAgICAgICAgICAgVG9vbHMuV2FybihgRmFpbGVkIHRvIHZhbGlkYXRlOiAke3JlYXNvbi5tZXNzYWdlfWApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblZhbGlkYXRlZE9ic2VydmFibGUuY2xlYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZ2V0TG9hZGVyKGxvYWRlckRhdGE6IElHTFRGTG9hZGVyRGF0YSk6IElHTFRGTG9hZGVyIHtcclxuICAgICAgICBjb25zdCBhc3NldCA9ICg8YW55PmxvYWRlckRhdGEuanNvbikuYXNzZXQgfHwge307XHJcblxyXG4gICAgICAgIHRoaXMuX2xvZyhgQXNzZXQgdmVyc2lvbjogJHthc3NldC52ZXJzaW9ufWApO1xyXG4gICAgICAgIGFzc2V0Lm1pblZlcnNpb24gJiYgdGhpcy5fbG9nKGBBc3NldCBtaW5pbXVtIHZlcnNpb246ICR7YXNzZXQubWluVmVyc2lvbn1gKTtcclxuICAgICAgICBhc3NldC5nZW5lcmF0b3IgJiYgdGhpcy5fbG9nKGBBc3NldCBnZW5lcmF0b3I6ICR7YXNzZXQuZ2VuZXJhdG9yfWApO1xyXG5cclxuICAgICAgICBjb25zdCB2ZXJzaW9uID0gR0xURkZpbGVMb2FkZXIuX3BhcnNlVmVyc2lvbihhc3NldC52ZXJzaW9uKTtcclxuICAgICAgICBpZiAoIXZlcnNpb24pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2ZXJzaW9uOiBcIiArIGFzc2V0LnZlcnNpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFzc2V0Lm1pblZlcnNpb24gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBtaW5WZXJzaW9uID0gR0xURkZpbGVMb2FkZXIuX3BhcnNlVmVyc2lvbihhc3NldC5taW5WZXJzaW9uKTtcclxuICAgICAgICAgICAgaWYgKCFtaW5WZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG1pbmltdW0gdmVyc2lvbjogXCIgKyBhc3NldC5taW5WZXJzaW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKEdMVEZGaWxlTG9hZGVyLl9jb21wYXJlVmVyc2lvbihtaW5WZXJzaW9uLCB7IG1ham9yOiAyLCBtaW5vcjogMCB9KSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluY29tcGF0aWJsZSBtaW5pbXVtIHZlcnNpb246IFwiICsgYXNzZXQubWluVmVyc2lvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUxvYWRlcnM6IHsgW2tleTogbnVtYmVyXTogKHBhcmVudDogR0xURkZpbGVMb2FkZXIpID0+IElHTFRGTG9hZGVyIH0gPSB7XHJcbiAgICAgICAgICAgIDE6IEdMVEZGaWxlTG9hZGVyLl9DcmVhdGVHTFRGMUxvYWRlcixcclxuICAgICAgICAgICAgMjogR0xURkZpbGVMb2FkZXIuX0NyZWF0ZUdMVEYyTG9hZGVyLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUxvYWRlciA9IGNyZWF0ZUxvYWRlcnNbdmVyc2lvbi5tYWpvcl07XHJcbiAgICAgICAgaWYgKCFjcmVhdGVMb2FkZXIpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgdmVyc2lvbjogXCIgKyBhc3NldC52ZXJzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjcmVhdGVMb2FkZXIodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcGFyc2VKc29uKGpzb246IHN0cmluZyk6IE9iamVjdCB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXIoXCJQYXJzZSBKU09OXCIpO1xyXG4gICAgICAgIHRoaXMuX2xvZyhgSlNPTiBsZW5ndGg6ICR7anNvbi5sZW5ndGh9YCk7XHJcbiAgICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShqc29uKTtcclxuICAgICAgICB0aGlzLl9lbmRQZXJmb3JtYW5jZUNvdW50ZXIoXCJQYXJzZSBKU09OXCIpO1xyXG4gICAgICAgIHJldHVybiBwYXJzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdW5wYWNrQmluYXJ5QXN5bmMoZGF0YVJlYWRlcjogRGF0YVJlYWRlcik6IFByb21pc2U8SUdMVEZMb2FkZXJEYXRhPiB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXIoXCJVbnBhY2sgQmluYXJ5XCIpO1xyXG5cclxuICAgICAgICAvLyBSZWFkIG1hZ2ljICsgdmVyc2lvbiArIGxlbmd0aCArIGpzb24gbGVuZ3RoICsganNvbiBmb3JtYXRcclxuICAgICAgICByZXR1cm4gZGF0YVJlYWRlci5sb2FkQXN5bmMoMjApLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBCaW5hcnkgPSB7XHJcbiAgICAgICAgICAgICAgICBNYWdpYzogMHg0NjU0NmM2NyxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1hZ2ljID0gZGF0YVJlYWRlci5yZWFkVWludDMyKCk7XHJcbiAgICAgICAgICAgIGlmIChtYWdpYyAhPT0gQmluYXJ5Lk1hZ2ljKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFwiVW5leHBlY3RlZCBtYWdpYzogXCIgKyBtYWdpYywgRXJyb3JDb2Rlcy5HTFRGTG9hZGVyVW5leHBlY3RlZE1hZ2ljRXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2ZXJzaW9uID0gZGF0YVJlYWRlci5yZWFkVWludDMyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dnaW5nRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nKGBCaW5hcnkgdmVyc2lvbjogJHt2ZXJzaW9ufWApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSBkYXRhUmVhZGVyLnJlYWRVaW50MzIoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnVzZVJhbmdlUmVxdWVzdHMgJiYgbGVuZ3RoICE9PSBkYXRhUmVhZGVyLmJ1ZmZlci5ieXRlTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuV2FybihgTGVuZ3RoIGluIGhlYWRlciBkb2VzIG5vdCBtYXRjaCBhY3R1YWwgZGF0YSBsZW5ndGg6ICR7bGVuZ3RofSAhPSAke2RhdGFSZWFkZXIuYnVmZmVyLmJ5dGVMZW5ndGh9YCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB1bnBhY2tlZDogUHJvbWlzZTxJR0xURkxvYWRlckRhdGE+O1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMToge1xyXG4gICAgICAgICAgICAgICAgICAgIHVucGFja2VkID0gdGhpcy5fdW5wYWNrQmluYXJ5VjFBc3luYyhkYXRhUmVhZGVyLCBsZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5wYWNrZWQgPSB0aGlzLl91bnBhY2tCaW5hcnlWMkFzeW5jKGRhdGFSZWFkZXIsIGxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgdmVyc2lvbjogXCIgKyB2ZXJzaW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fZW5kUGVyZm9ybWFuY2VDb3VudGVyKFwiVW5wYWNrIEJpbmFyeVwiKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB1bnBhY2tlZDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF91bnBhY2tCaW5hcnlWMUFzeW5jKGRhdGFSZWFkZXI6IERhdGFSZWFkZXIsIGxlbmd0aDogbnVtYmVyKTogUHJvbWlzZTxJR0xURkxvYWRlckRhdGE+IHtcclxuICAgICAgICBjb25zdCBDb250ZW50Rm9ybWF0ID0ge1xyXG4gICAgICAgICAgICBKU09OOiAwLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRlbnRMZW5ndGggPSBkYXRhUmVhZGVyLnJlYWRVaW50MzIoKTtcclxuICAgICAgICBjb25zdCBjb250ZW50Rm9ybWF0ID0gZGF0YVJlYWRlci5yZWFkVWludDMyKCk7XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50Rm9ybWF0ICE9PSBDb250ZW50Rm9ybWF0LkpTT04pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGNvbnRlbnQgZm9ybWF0OiAke2NvbnRlbnRGb3JtYXR9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBib2R5TGVuZ3RoID0gbGVuZ3RoIC0gZGF0YVJlYWRlci5ieXRlT2Zmc2V0O1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhOiBJR0xURkxvYWRlckRhdGEgPSB7IGpzb246IHRoaXMuX3BhcnNlSnNvbihkYXRhUmVhZGVyLnJlYWRTdHJpbmcoY29udGVudExlbmd0aCkpLCBiaW46IG51bGwgfTtcclxuICAgICAgICBpZiAoYm9keUxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydEJ5dGVPZmZzZXQgPSBkYXRhUmVhZGVyLmJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgICAgIGRhdGEuYmluID0ge1xyXG4gICAgICAgICAgICAgICAgcmVhZEFzeW5jOiAoYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkgPT4gZGF0YVJlYWRlci5idWZmZXIucmVhZEFzeW5jKHN0YXJ0Qnl0ZU9mZnNldCArIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpLFxyXG4gICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogYm9keUxlbmd0aCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdW5wYWNrQmluYXJ5VjJBc3luYyhkYXRhUmVhZGVyOiBEYXRhUmVhZGVyLCBsZW5ndGg6IG51bWJlcik6IFByb21pc2U8SUdMVEZMb2FkZXJEYXRhPiB7XHJcbiAgICAgICAgY29uc3QgQ2h1bmtGb3JtYXQgPSB7XHJcbiAgICAgICAgICAgIEpTT046IDB4NGU0ZjUzNGEsXHJcbiAgICAgICAgICAgIEJJTjogMHgwMDRlNDk0MixcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBSZWFkIHRoZSBKU09OIGNodW5rIGhlYWRlci5cclxuICAgICAgICBjb25zdCBjaHVua0xlbmd0aCA9IGRhdGFSZWFkZXIucmVhZFVpbnQzMigpO1xyXG4gICAgICAgIGNvbnN0IGNodW5rRm9ybWF0ID0gZGF0YVJlYWRlci5yZWFkVWludDMyKCk7XHJcbiAgICAgICAgaWYgKGNodW5rRm9ybWF0ICE9PSBDaHVua0Zvcm1hdC5KU09OKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZpcnN0IGNodW5rIGZvcm1hdCBpcyBub3QgSlNPTlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEJhaWwgaWYgdGhlcmUgYXJlIG5vIG90aGVyIGNodW5rcy5cclxuICAgICAgICBpZiAoZGF0YVJlYWRlci5ieXRlT2Zmc2V0ICsgY2h1bmtMZW5ndGggPT09IGxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVJlYWRlci5sb2FkQXN5bmMoY2h1bmtMZW5ndGgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsganNvbjogdGhpcy5fcGFyc2VKc29uKGRhdGFSZWFkZXIucmVhZFN0cmluZyhjaHVua0xlbmd0aCkpLCBiaW46IG51bGwgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZWFkIHRoZSBKU09OIGNodW5rIGFuZCB0aGUgbGVuZ3RoIGFuZCB0eXBlIG9mIHRoZSBuZXh0IGNodW5rLlxyXG4gICAgICAgIHJldHVybiBkYXRhUmVhZGVyLmxvYWRBc3luYyhjaHVua0xlbmd0aCArIDgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhOiBJR0xURkxvYWRlckRhdGEgPSB7IGpzb246IHRoaXMuX3BhcnNlSnNvbihkYXRhUmVhZGVyLnJlYWRTdHJpbmcoY2h1bmtMZW5ndGgpKSwgYmluOiBudWxsIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZWFkQXN5bmMgPSAoKTogUHJvbWlzZTxJR0xURkxvYWRlckRhdGE+ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNodW5rTGVuZ3RoID0gZGF0YVJlYWRlci5yZWFkVWludDMyKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaHVua0Zvcm1hdCA9IGRhdGFSZWFkZXIucmVhZFVpbnQzMigpO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2h1bmtGb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENodW5rRm9ybWF0LkpTT046IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCBKU09OIGNodW5rXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIENodW5rRm9ybWF0LkJJTjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFydEJ5dGVPZmZzZXQgPSBkYXRhUmVhZGVyLmJ5dGVPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYmluID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZEFzeW5jOiAoYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkgPT4gZGF0YVJlYWRlci5idWZmZXIucmVhZEFzeW5jKHN0YXJ0Qnl0ZU9mZnNldCArIGJ5dGVPZmZzZXQsIGJ5dGVMZW5ndGgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZUxlbmd0aDogY2h1bmtMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFSZWFkZXIuc2tpcEJ5dGVzKGNodW5rTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIHVucmVjb2duaXplZCBjaHVua0Zvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhUmVhZGVyLnNraXBCeXRlcyhjaHVua0xlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVJlYWRlci5ieXRlT2Zmc2V0ICE9PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVJlYWRlci5sb2FkQXN5bmMoOCkudGhlbihyZWFkQXN5bmMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVhZEFzeW5jKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX3BhcnNlVmVyc2lvbih2ZXJzaW9uOiBzdHJpbmcpOiBOdWxsYWJsZTx7IG1ham9yOiBudW1iZXI7IG1pbm9yOiBudW1iZXIgfT4ge1xyXG4gICAgICAgIGlmICh2ZXJzaW9uID09PSBcIjEuMFwiIHx8IHZlcnNpb24gPT09IFwiMS4wLjFcIikge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbWFqb3I6IDEsXHJcbiAgICAgICAgICAgICAgICBtaW5vcjogMCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gKHZlcnNpb24gKyBcIlwiKS5tYXRjaCgvXihcXGQrKVxcLihcXGQrKS8pO1xyXG4gICAgICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtYWpvcjogcGFyc2VJbnQobWF0Y2hbMV0pLFxyXG4gICAgICAgICAgICBtaW5vcjogcGFyc2VJbnQobWF0Y2hbMl0pLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2NvbXBhcmVWZXJzaW9uKGE6IHsgbWFqb3I6IG51bWJlcjsgbWlub3I6IG51bWJlciB9LCBiOiB7IG1ham9yOiBudW1iZXI7IG1pbm9yOiBudW1iZXIgfSk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKGEubWFqb3IgPiBiLm1ham9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYS5tYWpvciA8IGIubWFqb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYS5taW5vciA+IGIubWlub3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhLm1pbm9yIDwgYi5taW5vcikge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IF9sb2dTcGFjZXMgPSBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI7XHJcbiAgICBwcml2YXRlIF9sb2dJbmRlbnRMZXZlbCA9IDA7XHJcbiAgICBwcml2YXRlIF9sb2dnaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBfbG9nID0gdGhpcy5fbG9nRGlzYWJsZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9sb2dPcGVuKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2xvZyhtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLl9sb2dJbmRlbnRMZXZlbCsrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBfbG9nQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgLS10aGlzLl9sb2dJbmRlbnRMZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9sb2dFbmFibGVkKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNwYWNlcyA9IEdMVEZGaWxlTG9hZGVyLl9sb2dTcGFjZXMuc3Vic3RyaW5nKDAsIHRoaXMuX2xvZ0luZGVudExldmVsICogMik7XHJcbiAgICAgICAgTG9nZ2VyLkxvZyhgJHtzcGFjZXN9JHttZXNzYWdlfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2xvZ0Rpc2FibGVkKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge31cclxuXHJcbiAgICBwcml2YXRlIF9jYXB0dXJlUGVyZm9ybWFuY2VDb3VudGVycyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBfc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXIgPSB0aGlzLl9zdGFydFBlcmZvcm1hbmNlQ291bnRlckRpc2FibGVkO1xyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBfZW5kUGVyZm9ybWFuY2VDb3VudGVyID0gdGhpcy5fZW5kUGVyZm9ybWFuY2VDb3VudGVyRGlzYWJsZWQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXJFbmFibGVkKGNvdW50ZXJOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBUb29scy5TdGFydFBlcmZvcm1hbmNlQ291bnRlcihjb3VudGVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc3RhcnRQZXJmb3JtYW5jZUNvdW50ZXJEaXNhYmxlZChjb3VudGVyTmFtZTogc3RyaW5nKTogdm9pZCB7fVxyXG5cclxuICAgIHByaXZhdGUgX2VuZFBlcmZvcm1hbmNlQ291bnRlckVuYWJsZWQoY291bnRlck5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIFRvb2xzLkVuZFBlcmZvcm1hbmNlQ291bnRlcihjb3VudGVyTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZW5kUGVyZm9ybWFuY2VDb3VudGVyRGlzYWJsZWQoY291bnRlck5hbWU6IHN0cmluZyk6IHZvaWQge31cclxufVxyXG5cclxucmVnaXN0ZXJTY2VuZUxvYWRlclBsdWdpbihuZXcgR0xURkZpbGVMb2FkZXIoKSk7XHJcbiIsImltcG9ydCB0eXBlICogYXMgR0xURjIgZnJvbSBcImJhYnlsb25qcy1nbHRmMmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuZGVjbGFyZSBsZXQgR0xURlZhbGlkYXRvcjogR0xURjIuSUdMVEZWYWxpZGF0b3I7XHJcblxyXG4vLyBXb3JrZXJHbG9iYWxTY29wZVxyXG5kZWNsYXJlIGZ1bmN0aW9uIGltcG9ydFNjcmlwdHMoLi4udXJsczogc3RyaW5nW10pOiB2b2lkO1xyXG5kZWNsYXJlIGZ1bmN0aW9uIHBvc3RNZXNzYWdlKG1lc3NhZ2U6IGFueSwgdHJhbnNmZXI/OiBhbnlbXSk6IHZvaWQ7XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUFzeW5jKFxyXG4gICAgZGF0YTogc3RyaW5nIHwgVWludDhBcnJheSxcclxuICAgIHJvb3RVcmw6IHN0cmluZyxcclxuICAgIGZpbGVOYW1lOiBzdHJpbmcsXHJcbiAgICBnZXRFeHRlcm5hbFJlc291cmNlOiAodXJpOiBzdHJpbmcpID0+IFByb21pc2U8VWludDhBcnJheT5cclxuKTogUHJvbWlzZTxHTFRGMi5JR0xURlZhbGlkYXRpb25SZXN1bHRzPiB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBHTFRGMi5JR0xURlZhbGlkYXRpb25PcHRpb25zID0ge1xyXG4gICAgICAgIGV4dGVybmFsUmVzb3VyY2VGdW5jdGlvbjogZ2V0RXh0ZXJuYWxSZXNvdXJjZSxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGZpbGVOYW1lKSB7XHJcbiAgICAgICAgb3B0aW9ucy51cmkgPSByb290VXJsID09PSBcImZpbGU6XCIgPyBmaWxlTmFtZSA6IHJvb3RVcmwgKyBmaWxlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KGRhdGEpID8gR0xURlZhbGlkYXRvci52YWxpZGF0ZUJ5dGVzKGRhdGEsIG9wdGlvbnMpIDogR0xURlZhbGlkYXRvci52YWxpZGF0ZVN0cmluZyhkYXRhLCBvcHRpb25zKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSB3b3JrZXIgZnVuY3Rpb24gdGhhdCBnZXRzIGNvbnZlcnRlZCB0byBhIGJsb2IgdXJsIHRvIHBhc3MgaW50byBhIHdvcmtlci5cclxuICovXHJcbmZ1bmN0aW9uIHdvcmtlckZ1bmMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBwZW5kaW5nRXh0ZXJuYWxSZXNvdXJjZXM6IEFycmF5PHsgcmVzb2x2ZTogKGRhdGE6IGFueSkgPT4gdm9pZDsgcmVqZWN0OiAocmVhc29uOiBhbnkpID0+IHZvaWQgfT4gPSBbXTtcclxuXHJcbiAgICBvbm1lc3NhZ2UgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlLmRhdGE7XHJcbiAgICAgICAgc3dpdGNoIChkYXRhLmlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6IHtcclxuICAgICAgICAgICAgICAgIGltcG9ydFNjcmlwdHMoZGF0YS51cmwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcInZhbGlkYXRlXCI6IHtcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlQXN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEucm9vdFVybCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZpbGVOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICh1cmkpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGVuZGluZ0V4dGVybmFsUmVzb3VyY2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmdFeHRlcm5hbFJlc291cmNlcy5wdXNoKHsgcmVzb2x2ZSwgcmVqZWN0IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoeyBpZDogXCJnZXRFeHRlcm5hbFJlc291cmNlXCIsIGluZGV4OiBpbmRleCwgdXJpOiB1cmkgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgaWQ6IFwidmFsaWRhdGUucmVzb2x2ZVwiLCB2YWx1ZTogdmFsdWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHsgaWQ6IFwidmFsaWRhdGUucmVqZWN0XCIsIHJlYXNvbjogcmVhc29uIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiZ2V0RXh0ZXJuYWxSZXNvdXJjZS5yZXNvbHZlXCI6IHtcclxuICAgICAgICAgICAgICAgIHBlbmRpbmdFeHRlcm5hbFJlc291cmNlc1tkYXRhLmluZGV4XS5yZXNvbHZlKGRhdGEudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcImdldEV4dGVybmFsUmVzb3VyY2UucmVqZWN0XCI6IHtcclxuICAgICAgICAgICAgICAgIHBlbmRpbmdFeHRlcm5hbFJlc291cmNlc1tkYXRhLmluZGV4XS5yZWplY3QoZGF0YS5yZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBmb3IgZ2xURiB2YWxpZGF0aW9uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHTFRGVmFsaWRhdGlvbkNvbmZpZ3VyYXRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdXJsIG9mIHRoZSBnbFRGIHZhbGlkYXRvci5cclxuICAgICAqL1xyXG4gICAgdXJsOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBnbFRGIHZhbGlkYXRpb25cclxuICovXHJcbmV4cG9ydCBjbGFzcyBHTFRGVmFsaWRhdGlvbiB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25maWd1cmF0aW9uLiBEZWZhdWx0cyB0byBgeyB1cmw6IFwiaHR0cHM6Ly9jZG4uYmFieWxvbmpzLmNvbS9nbHRmX3ZhbGlkYXRvci5qc1wiIH1gLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENvbmZpZ3VyYXRpb246IElHTFRGVmFsaWRhdGlvbkNvbmZpZ3VyYXRpb24gPSB7XHJcbiAgICAgICAgdXJsOiBgJHtUb29scy5fRGVmYXVsdENkblVybH0vZ2x0Zl92YWxpZGF0b3IuanNgLFxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTG9hZFNjcmlwdFByb21pc2U6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSBhIGdsVEYgYXNzZXQgdXNpbmcgdGhlIGdsVEYtVmFsaWRhdG9yLlxyXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIEpTT04gb2YgYSBnbFRGIG9yIHRoZSBhcnJheSBidWZmZXIgb2YgYSBiaW5hcnkgZ2xURlxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgVGhlIHJvb3QgdXJsIGZvciB0aGUgZ2xURlxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIFRoZSBmaWxlIG5hbWUgZm9yIHRoZSBnbFRGXHJcbiAgICAgKiBAcGFyYW0gZ2V0RXh0ZXJuYWxSZXNvdXJjZSBUaGUgY2FsbGJhY2sgdG8gZ2V0IGV4dGVybmFsIHJlc291cmNlcyBmb3IgdGhlIGdsVEYgdmFsaWRhdG9yXHJcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBnbFRGIHZhbGlkYXRpb24gcmVzdWx0cyBvbmNlIGNvbXBsZXRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVmFsaWRhdGVBc3luYyhcclxuICAgICAgICBkYXRhOiBzdHJpbmcgfCBVaW50OEFycmF5LFxyXG4gICAgICAgIHJvb3RVcmw6IHN0cmluZyxcclxuICAgICAgICBmaWxlTmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGdldEV4dGVybmFsUmVzb3VyY2U6ICh1cmk6IHN0cmluZykgPT4gUHJvbWlzZTxVaW50OEFycmF5PlxyXG4gICAgKTogUHJvbWlzZTxHTFRGMi5JR0xURlZhbGlkYXRpb25SZXN1bHRzPiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBXb3JrZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyQ29udGVudCA9IGAke3ZhbGlkYXRlQXN5bmN9KCR7d29ya2VyRnVuY30pKClgO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd29ya2VyQmxvYlVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW3dvcmtlckNvbnRlbnRdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiIH0pKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBXb3JrZXIod29ya2VyQmxvYlVybCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb25FcnJvciA9IChlcnJvcjogRXJyb3JFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgb25FcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgb25NZXNzYWdlID0gKG1lc3NhZ2U6IE1lc3NhZ2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChkYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJnZXRFeHRlcm5hbFJlc291cmNlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEV4dGVybmFsUmVzb3VyY2UoZGF0YS51cmkpLnRoZW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkOiBcImdldEV4dGVybmFsUmVzb3VyY2UucmVzb2x2ZVwiLCBpbmRleDogZGF0YS5pbmRleCwgdmFsdWU6IHZhbHVlIH0sIFt2YWx1ZS5idWZmZXJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IFwiZ2V0RXh0ZXJuYWxSZXNvdXJjZS5yZWplY3RcIiwgaW5kZXg6IGRhdGEuaW5kZXgsIHJlYXNvbjogcmVhc29uIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidmFsaWRhdGUucmVzb2x2ZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIG9uRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnRlcm1pbmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInZhbGlkYXRlLnJlamVjdFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIG9uRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZGF0YS5yZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnRlcm1pbmF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIG9uRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IFwiaW5pdFwiLCB1cmw6IFRvb2xzLkdldEJhYnlsb25TY3JpcHRVUkwodGhpcy5Db25maWd1cmF0aW9uLnVybCkgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNsaWNlIHRoZSBkYXRhIHRvIGF2b2lkIGNvcHlpbmcgdGhlIHdob2xlIGFycmF5IGJ1ZmZlci5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGljZWREYXRhID0gZGF0YS5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkOiBcInZhbGlkYXRlXCIsIGRhdGE6IHNsaWNlZERhdGEsIHJvb3RVcmw6IHJvb3RVcmwsIGZpbGVOYW1lOiBmaWxlTmFtZSB9LCBbc2xpY2VkRGF0YS5idWZmZXJdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IFwidmFsaWRhdGVcIiwgZGF0YTogZGF0YSwgcm9vdFVybDogcm9vdFVybCwgZmlsZU5hbWU6IGZpbGVOYW1lIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX0xvYWRTY3JpcHRQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Mb2FkU2NyaXB0UHJvbWlzZSA9IFRvb2xzLkxvYWRCYWJ5bG9uU2NyaXB0QXN5bmModGhpcy5Db25maWd1cmF0aW9uLnVybCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9Mb2FkU2NyaXB0UHJvbWlzZS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZUFzeW5jKGRhdGEsIHJvb3RVcmwsIGZpbGVOYW1lLCBnZXRFeHRlcm5hbFJlc291cmNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAqIGFzIEZpbGVMb2FkZXIgZnJvbSBcImxvYWRlcnMvZ2xURi9nbFRGRmlsZUxvYWRlclwiO1xyXG5pbXBvcnQgKiBhcyBWYWxpZGF0aW9uIGZyb20gXCJsb2FkZXJzL2dsVEYvZ2xURlZhbGlkYXRpb25cIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIFVNRCBtb2R1bGUuXHJcbiAqIFRoZSBlbnRyeSBwb2ludCBmb3IgYSBmdXR1cmUgRVNNIHBhY2thZ2Ugc2hvdWxkIGJlIGluZGV4LnRzXHJcbiAqL1xyXG5jb25zdCBnbG9iYWxPYmplY3QgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcclxuaWYgKHR5cGVvZiBnbG9iYWxPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTiA9ICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTiB8fCB7fTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIEZpbGVMb2FkZXIpIHtcclxuICAgICAgICAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT05ba2V5XSA9ICg8YW55PkZpbGVMb2FkZXIpW2tleV07XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBWYWxpZGF0aW9uKSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0gPSAoPGFueT5WYWxpZGF0aW9uKVtrZXldO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgKiBmcm9tIFwibG9hZGVycy9nbFRGL2dsVEZGaWxlTG9hZGVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCJsb2FkZXJzL2dsVEYvZ2xURlZhbGlkYXRpb25cIjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgR0xURjEgZnJvbSBcImxvYWRlcnMvZ2xURi8xLjAvaW5kZXhcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIFVNRCBtb2R1bGUuXHJcbiAqIFRoZSBlbnRyeSBwb2ludCBmb3IgYSBmdXR1cmUgRVNNIHBhY2thZ2Ugc2hvdWxkIGJlIGluZGV4LnRzXHJcbiAqL1xyXG5jb25zdCBnbG9iYWxPYmplY3QgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcclxuaWYgKHR5cGVvZiBnbG9iYWxPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTiA9ICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTiB8fCB7fTtcclxuICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTi5HTFRGMSA9ICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTi5HTFRGMSB8fCB7fTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIEdMVEYxKSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OLkdMVEYxW2tleV0gPSAoPGFueT5HTFRGMSlba2V5XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgR0xURjEgfTtcclxuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9leHBvcnRcclxuZXhwb3J0ICogZnJvbSBcIi4vbGVnYWN5LWdsVEZcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbGVnYWN5LWdsVEYxXCI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWlzY190b29sc19fOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cblxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XG4gIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XG4gIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG5cbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcbiAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0O1xuICB9XG4gIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcbiAgdmFyIHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICB0W3BdID0gc1twXTtcbiAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcbiAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XG4gIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XG4gIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xuICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcbiAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xuICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcbiAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xuICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XG4gICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xuICAgICAgfVxuICB9XG4gIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcbiAgZG9uZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xuICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcbiAgfVxuICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xuICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIG9bazJdID0gbVtrXTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcbiAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xuICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgfVxuICB9O1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xuICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gIGlmICghbSkgcmV0dXJuIG87XG4gIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICB0cnkge1xuICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gIGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgIH1cbiAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICB9XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XG4gIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xuICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgcltrXSA9IGFbal07XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgfVxuICB9XG4gIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XG4gIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcbiAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcbiAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIGFyID0gW107XG4gICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcbiAgICByZXR1cm4gYXI7XG4gIH07XG4gIHJldHVybiBvd25LZXlzKG8pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xuICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xuICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XG4gIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xuICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcbiAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XG4gICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICB2YXIgciwgcyA9IDA7XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xuICAgICAgICBpZiAoci5kaXNwb3NlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xuICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBzIHw9IDE7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcbiAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XG4gICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcbiAgICAgIH0pO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19lc0RlY29yYXRlLFxuICBfX3J1bkluaXRpYWxpemVycyxcbiAgX19wcm9wS2V5LFxuICBfX3NldEZ1bmN0aW9uTmFtZSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG4gIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvZXhwb3J0XHJcbmltcG9ydCAqIGFzIGxvYWRlcnMgZnJvbSBcIkBsdHMvbG9hZGVycy9sZWdhY3kvbGVnYWN5LWdsVEYxRmlsZUxvYWRlclwiO1xyXG5leHBvcnQgeyBsb2FkZXJzIH07XHJcbmV4cG9ydCBkZWZhdWx0IGxvYWRlcnM7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==