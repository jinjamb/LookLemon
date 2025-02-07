(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-materials", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-materials"] = factory(require("babylonjs"));
	else
		root["MATERIALS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Materials_effect__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/materials/src/triPlanar/index.ts":
/*!*****************************************************!*\
  !*** ../../../dev/materials/src/triPlanar/index.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TriPlanarMaterial: () => (/* reexport safe */ _triPlanarMaterial__WEBPACK_IMPORTED_MODULE_0__.TriPlanarMaterial)
/* harmony export */ });
/* harmony import */ var _triPlanarMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triPlanarMaterial */ "../../../dev/materials/src/triPlanar/triPlanarMaterial.ts");



/***/ }),

/***/ "../../../dev/materials/src/triPlanar/triPlanarMaterial.ts":
/*!*****************************************************************!*\
  !*** ../../../dev/materials/src/triPlanar/triPlanarMaterial.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TriPlanarMaterial: () => (/* binding */ TriPlanarMaterial)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/materialHelper.functions */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _triplanar_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./triplanar.fragment */ "../../../dev/materials/src/triPlanar/triplanar.fragment.ts");
/* harmony import */ var _triplanar_vertex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./triplanar.vertex */ "../../../dev/materials/src/triPlanar/triplanar.vertex.ts");















var TriPlanarMaterialDefines = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(TriPlanarMaterialDefines, _super);
    function TriPlanarMaterialDefines() {
        var _this = _super.call(this) || this;
        _this.DIFFUSEX = false;
        _this.DIFFUSEY = false;
        _this.DIFFUSEZ = false;
        _this.BUMPX = false;
        _this.BUMPY = false;
        _this.BUMPZ = false;
        _this.CLIPPLANE = false;
        _this.CLIPPLANE2 = false;
        _this.CLIPPLANE3 = false;
        _this.CLIPPLANE4 = false;
        _this.CLIPPLANE5 = false;
        _this.CLIPPLANE6 = false;
        _this.ALPHATEST = false;
        _this.DEPTHPREPASS = false;
        _this.POINTSIZE = false;
        _this.FOG = false;
        _this.SPECULARTERM = false;
        _this.NORMAL = false;
        _this.VERTEXCOLOR = false;
        _this.VERTEXALPHA = false;
        _this.NUM_BONE_INFLUENCERS = 0;
        _this.BonesPerMesh = 0;
        _this.INSTANCES = false;
        _this.INSTANCESCOLOR = false;
        _this.IMAGEPROCESSINGPOSTPROCESS = false;
        _this.SKIPFINALCOLORCLAMP = false;
        _this.NONUNIFORMSCALING = false;
        _this.LOGARITHMICDEPTH = false;
        _this.AREALIGHTSUPPORTED = true;
        _this.AREALIGHTNOROUGHTNESS = true;
        _this.rebuild();
        return _this;
    }
    return TriPlanarMaterialDefines;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialDefines));
var TriPlanarMaterial = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(TriPlanarMaterial, _super);
    function TriPlanarMaterial(name, scene) {
        var _this = _super.call(this, name, scene) || this;
        _this.tileSize = 1;
        _this.diffuseColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(1, 1, 1);
        _this.specularColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0.2, 0.2, 0.2);
        _this.specularPower = 64;
        _this._disableLighting = false;
        _this._maxSimultaneousLights = 4;
        return _this;
    }
    TriPlanarMaterial.prototype.needAlphaBlending = function () {
        return this.alpha < 1.0;
    };
    TriPlanarMaterial.prototype.needAlphaTesting = function () {
        return false;
    };
    TriPlanarMaterial.prototype.getAlphaTestTexture = function () {
        return null;
    };
    // Methods
    TriPlanarMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
        var drawWrapper = subMesh._drawWrapper;
        if (this.isFrozen) {
            if (drawWrapper.effect && drawWrapper._wasPreviouslyReady && drawWrapper._wasPreviouslyUsingInstances === useInstances) {
                return true;
            }
        }
        if (!subMesh.materialDefines) {
            subMesh.materialDefines = new TriPlanarMaterialDefines();
        }
        var defines = subMesh.materialDefines;
        var scene = this.getScene();
        if (this._isReadyForSubMesh(subMesh)) {
            return true;
        }
        var engine = scene.getEngine();
        // Textures
        if (defines._areTexturesDirty) {
            if (scene.texturesEnabled) {
                if (babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialFlags.DiffuseTextureEnabled) {
                    var textures = [this.diffuseTextureX, this.diffuseTextureY, this.diffuseTextureZ];
                    var textureDefines = ["DIFFUSEX", "DIFFUSEY", "DIFFUSEZ"];
                    for (var i = 0; i < textures.length; i++) {
                        if (textures[i]) {
                            if (!textures[i].isReady()) {
                                return false;
                            }
                            else {
                                defines[textureDefines[i]] = true;
                            }
                        }
                    }
                }
                if (babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialFlags.BumpTextureEnabled) {
                    var textures = [this.normalTextureX, this.normalTextureY, this.normalTextureZ];
                    var textureDefines = ["BUMPX", "BUMPY", "BUMPZ"];
                    for (var i = 0; i < textures.length; i++) {
                        if (textures[i]) {
                            if (!textures[i].isReady()) {
                                return false;
                            }
                            else {
                                defines[textureDefines[i]] = true;
                            }
                        }
                    }
                }
            }
        }
        // Misc.
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForMisc)(mesh, scene, this._useLogarithmicDepth, this.pointsCloud, this.fogEnabled, this.needAlphaTestingForMesh(mesh), defines);
        // Lights
        defines._needNormals = (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForLights)(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting);
        // Values that need to be evaluated on every frame
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForFrameBoundValues)(scene, engine, this, defines, useInstances ? true : false);
        // Attribs
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForAttributes)(mesh, defines, true, true);
        // Get correct effect
        if (defines.isDirty) {
            defines.markAsProcessed();
            scene.resetCachedMaterial();
            // Fallbacks
            var fallbacks = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.EffectFallbacks();
            if (defines.FOG) {
                fallbacks.addFallback(1, "FOG");
            }
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.HandleFallbacksForShadows)(defines, fallbacks, this.maxSimultaneousLights);
            if (defines.NUM_BONE_INFLUENCERS > 0) {
                fallbacks.addCPUSkinningFallback(0, mesh);
            }
            defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
            //Attributes
            var attribs = [babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind];
            if (defines.NORMAL) {
                attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
            }
            if (defines.VERTEXCOLOR) {
                attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind);
            }
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareAttributesForBones)(attribs, mesh, defines, fallbacks);
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareAttributesForInstances)(attribs, defines);
            // Legacy browser patch
            var shaderName = "triplanar";
            var join = defines.toString();
            var uniforms = [
                "world",
                "view",
                "viewProjection",
                "vEyePosition",
                "vLightsType",
                "vDiffuseColor",
                "vSpecularColor",
                "vFogInfos",
                "vFogColor",
                "pointSize",
                "mBones",
                "tileSize",
            ];
            var samplers = [
                "diffuseSamplerX",
                "diffuseSamplerY",
                "diffuseSamplerZ",
                "normalSamplerX",
                "normalSamplerY",
                "normalSamplerZ",
                "logarithmicDepthConstant",
                "areaLightsLTC1Sampler",
                "areaLightsLTC2Sampler",
            ];
            var uniformBuffers = [];
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.addClipPlaneUniforms)(uniforms);
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareUniformsAndSamplersList)({
                uniformsNames: uniforms,
                uniformBuffersNames: uniformBuffers,
                samplers: samplers,
                defines: defines,
                maxSimultaneousLights: this.maxSimultaneousLights,
            });
            subMesh.setEffect(scene.getEngine().createEffect(shaderName, {
                attributes: attribs,
                uniformsNames: uniforms,
                uniformBuffersNames: uniformBuffers,
                samplers: samplers,
                defines: join,
                fallbacks: fallbacks,
                onCompiled: this.onCompiled,
                onError: this.onError,
                indexParameters: { maxSimultaneousLights: this.maxSimultaneousLights },
            }, engine), defines, this._materialContext);
        }
        // Check if Area Lights have LTC texture.
        if (defines["AREALIGHTUSED"]) {
            for (var index = 0; index < mesh.lightSources.length; index++) {
                if (!mesh.lightSources[index]._isReady()) {
                    return false;
                }
            }
        }
        if (!subMesh.effect || !subMesh.effect.isReady()) {
            return false;
        }
        defines._renderId = scene.getRenderId();
        drawWrapper._wasPreviouslyReady = true;
        drawWrapper._wasPreviouslyUsingInstances = !!useInstances;
        return true;
    };
    TriPlanarMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
        var scene = this.getScene();
        var defines = subMesh.materialDefines;
        if (!defines) {
            return;
        }
        var effect = subMesh.effect;
        if (!effect) {
            return;
        }
        this._activeEffect = effect;
        // Matrices
        this.bindOnlyWorldMatrix(world);
        this._activeEffect.setMatrix("viewProjection", scene.getTransformMatrix());
        // Bones
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BindBonesParameters)(mesh, this._activeEffect);
        this._activeEffect.setFloat("tileSize", this.tileSize);
        if (this._mustRebind(scene, effect, subMesh)) {
            // Textures
            if (this.diffuseTextureX) {
                this._activeEffect.setTexture("diffuseSamplerX", this.diffuseTextureX);
            }
            if (this.diffuseTextureY) {
                this._activeEffect.setTexture("diffuseSamplerY", this.diffuseTextureY);
            }
            if (this.diffuseTextureZ) {
                this._activeEffect.setTexture("diffuseSamplerZ", this.diffuseTextureZ);
            }
            if (this.normalTextureX) {
                this._activeEffect.setTexture("normalSamplerX", this.normalTextureX);
            }
            if (this.normalTextureY) {
                this._activeEffect.setTexture("normalSamplerY", this.normalTextureY);
            }
            if (this.normalTextureZ) {
                this._activeEffect.setTexture("normalSamplerZ", this.normalTextureZ);
            }
            // Clip plane
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.bindClipPlane)(effect, this, scene);
            // Point size
            if (this.pointsCloud) {
                this._activeEffect.setFloat("pointSize", this.pointSize);
            }
            // Log. depth
            if (this._useLogarithmicDepth) {
                (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BindLogDepth)(defines, effect, scene);
            }
            scene.bindEyePosition(effect);
        }
        this._activeEffect.setColor4("vDiffuseColor", this.diffuseColor, this.alpha * mesh.visibility);
        if (defines.SPECULARTERM) {
            this._activeEffect.setColor4("vSpecularColor", this.specularColor, this.specularPower);
        }
        if (scene.lightsEnabled && !this.disableLighting) {
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BindLights)(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
        }
        // View
        if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Scene.FOGMODE_NONE) {
            this._activeEffect.setMatrix("view", scene.getViewMatrix());
        }
        // Fog
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BindFogParameters)(scene, mesh, this._activeEffect);
        this._afterBind(mesh, this._activeEffect, subMesh);
    };
    TriPlanarMaterial.prototype.getAnimatables = function () {
        var results = [];
        if (this.mixTexture && this.mixTexture.animations && this.mixTexture.animations.length > 0) {
            results.push(this.mixTexture);
        }
        return results;
    };
    TriPlanarMaterial.prototype.getActiveTextures = function () {
        var activeTextures = _super.prototype.getActiveTextures.call(this);
        if (this._diffuseTextureX) {
            activeTextures.push(this._diffuseTextureX);
        }
        if (this._diffuseTextureY) {
            activeTextures.push(this._diffuseTextureY);
        }
        if (this._diffuseTextureZ) {
            activeTextures.push(this._diffuseTextureZ);
        }
        if (this._normalTextureX) {
            activeTextures.push(this._normalTextureX);
        }
        if (this._normalTextureY) {
            activeTextures.push(this._normalTextureY);
        }
        if (this._normalTextureZ) {
            activeTextures.push(this._normalTextureZ);
        }
        return activeTextures;
    };
    TriPlanarMaterial.prototype.hasTexture = function (texture) {
        if (_super.prototype.hasTexture.call(this, texture)) {
            return true;
        }
        if (this._diffuseTextureX === texture) {
            return true;
        }
        if (this._diffuseTextureY === texture) {
            return true;
        }
        if (this._diffuseTextureZ === texture) {
            return true;
        }
        if (this._normalTextureX === texture) {
            return true;
        }
        if (this._normalTextureY === texture) {
            return true;
        }
        if (this._normalTextureZ === texture) {
            return true;
        }
        return false;
    };
    TriPlanarMaterial.prototype.dispose = function (forceDisposeEffect) {
        if (this.mixTexture) {
            this.mixTexture.dispose();
        }
        _super.prototype.dispose.call(this, forceDisposeEffect);
    };
    TriPlanarMaterial.prototype.clone = function (name) {
        var _this = this;
        return babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Clone(function () { return new TriPlanarMaterial(name, _this.getScene()); }, this);
    };
    TriPlanarMaterial.prototype.serialize = function () {
        var serializationObject = _super.prototype.serialize.call(this);
        serializationObject.customType = "BABYLON.TriPlanarMaterial";
        return serializationObject;
    };
    TriPlanarMaterial.prototype.getClassName = function () {
        return "TriPlanarMaterial";
    };
    // Statics
    TriPlanarMaterial.Parse = function (source, scene, rootUrl) {
        return babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new TriPlanarMaterial(source.name, scene); }, source, scene, rootUrl);
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)()
    ], TriPlanarMaterial.prototype, "mixTexture", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)("diffuseTextureX")
    ], TriPlanarMaterial.prototype, "_diffuseTextureX", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsTexturesDirty")
    ], TriPlanarMaterial.prototype, "diffuseTextureX", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)("diffuseTexturY")
    ], TriPlanarMaterial.prototype, "_diffuseTextureY", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsTexturesDirty")
    ], TriPlanarMaterial.prototype, "diffuseTextureY", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)("diffuseTextureZ")
    ], TriPlanarMaterial.prototype, "_diffuseTextureZ", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsTexturesDirty")
    ], TriPlanarMaterial.prototype, "diffuseTextureZ", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)("normalTextureX")
    ], TriPlanarMaterial.prototype, "_normalTextureX", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsTexturesDirty")
    ], TriPlanarMaterial.prototype, "normalTextureX", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)("normalTextureY")
    ], TriPlanarMaterial.prototype, "_normalTextureY", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsTexturesDirty")
    ], TriPlanarMaterial.prototype, "normalTextureY", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)("normalTextureZ")
    ], TriPlanarMaterial.prototype, "_normalTextureZ", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsTexturesDirty")
    ], TriPlanarMaterial.prototype, "normalTextureZ", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], TriPlanarMaterial.prototype, "tileSize", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], TriPlanarMaterial.prototype, "diffuseColor", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], TriPlanarMaterial.prototype, "specularColor", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], TriPlanarMaterial.prototype, "specularPower", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("disableLighting")
    ], TriPlanarMaterial.prototype, "_disableLighting", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsLightsDirty")
    ], TriPlanarMaterial.prototype, "disableLighting", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("maxSimultaneousLights")
    ], TriPlanarMaterial.prototype, "_maxSimultaneousLights", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsLightsDirty")
    ], TriPlanarMaterial.prototype, "maxSimultaneousLights", void 0);
    return TriPlanarMaterial;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PushMaterial));

(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.TriPlanarMaterial", TriPlanarMaterial);


/***/ }),

/***/ "../../../dev/materials/src/triPlanar/triplanar.fragment.ts":
/*!******************************************************************!*\
  !*** ../../../dev/materials/src/triPlanar/triplanar.fragment.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   triplanarPixelShader: () => (/* binding */ triplanarPixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Shaders/ShadersInclude/imageProcessingCompatibility */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.















var name = "triplanarPixelShader";
var shader = "precision highp float;uniform vec4 vEyePosition;uniform vec4 vDiffuseColor;\n#ifdef SPECULARTERM\nuniform vec4 vSpecularColor;\n#endif\nvarying vec3 vPositionW;\n#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)\nvarying vec4 vColor;\n#endif\n#include<helperFunctions>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#ifdef DIFFUSEX\nvarying vec2 vTextureUVX;uniform sampler2D diffuseSamplerX;\n#ifdef BUMPX\nuniform sampler2D normalSamplerX;\n#endif\n#endif\n#ifdef DIFFUSEY\nvarying vec2 vTextureUVY;uniform sampler2D diffuseSamplerY;\n#ifdef BUMPY\nuniform sampler2D normalSamplerY;\n#endif\n#endif\n#ifdef DIFFUSEZ\nvarying vec2 vTextureUVZ;uniform sampler2D diffuseSamplerZ;\n#ifdef BUMPZ\nuniform sampler2D normalSamplerZ;\n#endif\n#endif\n#ifdef NORMAL\nvarying mat3 tangentSpace;\n#endif\n#ifdef LOGARITHMICDEPTH\n#extension GL_EXT_frag_depth : enable\n#endif\n#include<logDepthDeclaration>\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n#include<fogFragmentDeclaration>\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);vec4 baseColor=vec4(0.,0.,0.,1.);vec3 diffuseColor=vDiffuseColor.rgb;float alpha=vDiffuseColor.a;\n#ifdef NORMAL\nvec3 normalW=tangentSpace[2];\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\nvec4 baseNormal=vec4(0.0,0.0,0.0,1.0);normalW*=normalW;\n#ifdef DIFFUSEX\nbaseColor+=texture2D(diffuseSamplerX,vTextureUVX)*normalW.x;\n#ifdef BUMPX\nbaseNormal+=texture2D(normalSamplerX,vTextureUVX)*normalW.x;\n#endif\n#endif\n#ifdef DIFFUSEY\nbaseColor+=texture2D(diffuseSamplerY,vTextureUVY)*normalW.y;\n#ifdef BUMPY\nbaseNormal+=texture2D(normalSamplerY,vTextureUVY)*normalW.y;\n#endif\n#endif\n#ifdef DIFFUSEZ\nbaseColor+=texture2D(diffuseSamplerZ,vTextureUVZ)*normalW.z;\n#ifdef BUMPZ\nbaseNormal+=texture2D(normalSamplerZ,vTextureUVZ)*normalW.z;\n#endif\n#endif\n#ifdef NORMAL\nnormalW=normalize((2.0*baseNormal.xyz-1.0)*tangentSpace);\n#endif\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\n#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)\nbaseColor.rgb*=vColor.rgb;\n#endif\nvec3 diffuseBase=vec3(0.,0.,0.);lightingInfo info;float shadow=1.;float aggShadow=0.;float numLights=0.;\n#ifdef SPECULARTERM\nfloat glossiness=vSpecularColor.a;vec3 specularBase=vec3(0.,0.,0.);vec3 specularColor=vSpecularColor.rgb;\n#else\nfloat glossiness=0.;\n#endif\n#include<lightFragment>[0..maxSimultaneousLights]\n#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)\nalpha*=vColor.a;\n#endif\n#ifdef SPECULARTERM\nvec3 finalSpecular=specularBase*specularColor;\n#else\nvec3 finalSpecular=vec3(0.0);\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;vec4 color=vec4(finalDiffuse+finalSpecular,alpha);\n#include<logDepthFragment>\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n#define CUSTOM_FRAGMENT_MAIN_END\n}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var triplanarPixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/materials/src/triPlanar/triplanar.vertex.ts":
/*!****************************************************************!*\
  !*** ../../../dev/materials/src/triPlanar/triplanar.vertex.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   triplanarVertexShader: () => (/* binding */ triplanarVertexShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Shaders/ShadersInclude/vertexColorMixing */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.


















var name = "triplanarVertexShader";
var shader = "precision highp float;attribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<helperFunctions>\n#include<bonesDeclaration>\n#include<bakedVertexAnimationDeclaration>\n#include<instancesDeclaration>\nuniform mat4 view;uniform mat4 viewProjection;\n#ifdef DIFFUSEX\nvarying vec2 vTextureUVX;\n#endif\n#ifdef DIFFUSEY\nvarying vec2 vTextureUVY;\n#endif\n#ifdef DIFFUSEZ\nvarying vec2 vTextureUVZ;\n#endif\nuniform float tileSize;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying mat3 tangentSpace;\n#endif\n#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<logDepthDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#define CUSTOM_VERTEX_DEFINITIONS\nvoid main(void)\n{\n#define CUSTOM_VERTEX_MAIN_BEGIN\n#include<instancesVertex>\n#include<bonesVertex>\n#include<bakedVertexAnimation>\nvec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);\n#ifdef DIFFUSEX\nvTextureUVX=worldPos.zy/tileSize;\n#endif\n#ifdef DIFFUSEY\nvTextureUVY=worldPos.xz/tileSize;\n#endif\n#ifdef DIFFUSEZ\nvTextureUVZ=worldPos.xy/tileSize;\n#endif\n#ifdef NORMAL\nvec3 xtan=vec3(0,0,1);vec3 xbin=vec3(0,1,0);vec3 ytan=vec3(1,0,0);vec3 ybin=vec3(0,0,1);vec3 ztan=vec3(1,0,0);vec3 zbin=vec3(0,1,0);vec3 normalizedNormal=normalize(normal);normalizedNormal*=normalizedNormal;vec3 worldBinormal=normalize(xbin*normalizedNormal.x+ybin*normalizedNormal.y+zbin*normalizedNormal.z);vec3 worldTangent=normalize(xtan*normalizedNormal.x+ytan*normalizedNormal.y+ztan*normalizedNormal.z);mat3 normalWorld=mat3(finalWorld);\n#ifdef NONUNIFORMSCALING\nnormalWorld=transposeMat3(inverseMat3(normalWorld));\n#endif\nworldTangent=normalize((normalWorld*worldTangent).xyz);worldBinormal=normalize((normalWorld*worldBinormal).xyz);vec3 worldNormal=normalize((normalWorld*normalize(normal)).xyz);tangentSpace[0]=worldTangent;tangentSpace[1]=worldBinormal;tangentSpace[2]=worldNormal;\n#endif\n#include<clipPlaneVertex>\n#include<logDepthVertex>\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n#include<vertexColorMixing>\n#if defined(POINTSIZE) && !defined(WEBGPU)\ngl_PointSize=pointSize;\n#endif\n#define CUSTOM_VERTEX_MAIN_END\n}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var triplanarVertexShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../lts/materials/src/legacy/legacy-triPlanar.ts":
/*!*************************************************************!*\
  !*** ../../../lts/materials/src/legacy/legacy-triPlanar.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TriPlanarMaterial: () => (/* reexport safe */ materials_triPlanar_index__WEBPACK_IMPORTED_MODULE_0__.TriPlanarMaterial)
/* harmony export */ });
/* harmony import */ var materials_triPlanar_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! materials/triPlanar/index */ "../../../dev/materials/src/triPlanar/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in materials_triPlanar_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[key] = materials_triPlanar_index__WEBPACK_IMPORTED_MODULE_0__[key];
    }
}



/***/ }),

/***/ "babylonjs/Materials/effect":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Materials_effect__;

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
/*!**************************!*\
  !*** ./src/triPlanar.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   materials: () => (/* reexport module object */ _lts_materials_legacy_legacy_triPlanar__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_materials_legacy_legacy_triPlanar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/materials/legacy/legacy-triPlanar */ "../../../lts/materials/src/legacy/legacy-triPlanar.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_materials_legacy_legacy_triPlanar__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi50cmlQbGFuYXJNYXRlcmlhbC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNWQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRUE7QUFDQTtBQUVBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWVBO0FBQUE7QUFrQ0E7QUFDQTtBQWxDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTs7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBd0RBO0FBQ0E7QUF0QkE7QUFHQTtBQUdBO0FBR0E7QUFHQTtBQUtBOztBQU1BO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUE5YUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBR0E7QUFEQTtBQUNBO0FBRUE7QUFEQTtBQUNBO0FBMlhBO0FBQUE7QUFqYkE7QUFtYkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbGdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFzR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQXVFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQy9GQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FDZEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaFpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL01BVEVSSUFMUy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uL2Rldi9tYXRlcmlhbHMvc3JjL3RyaVBsYW5hci9pbmRleC50cyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi4vLi4vLi4vZGV2L21hdGVyaWFscy9zcmMvdHJpUGxhbmFyL3RyaVBsYW5hck1hdGVyaWFsLnRzIiwid2VicGFjazovL01BVEVSSUFMUy8uLi8uLi8uLi9kZXYvbWF0ZXJpYWxzL3NyYy90cmlQbGFuYXIvdHJpcGxhbmFyLmZyYWdtZW50LnRzIiwid2VicGFjazovL01BVEVSSUFMUy8uLi8uLi8uLi9kZXYvbWF0ZXJpYWxzL3NyYy90cmlQbGFuYXIvdHJpcGxhbmFyLnZlcnRleC50cyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi4vLi4vLi4vbHRzL21hdGVyaWFscy9zcmMvbGVnYWN5L2xlZ2FjeS10cmlQbGFuYXIudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIiwid2VicGFjazovL01BVEVSSUFMUy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi9zcmMvdHJpUGxhbmFyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1tYXRlcmlhbHNcIiwgW1wiYmFieWxvbmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJhYnlsb25qcy1tYXRlcmlhbHNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk1BVEVSSUFMU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01hdGVyaWFsc19lZmZlY3RfXykgPT4ge1xucmV0dXJuICIsImV4cG9ydCAqIGZyb20gXCIuL3RyaVBsYW5hck1hdGVyaWFsXCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgc2VyaWFsaXplQXNUZXh0dXJlLCBzZXJpYWxpemUsIGV4cGFuZFRvUHJvcGVydHksIHNlcmlhbGl6ZUFzQ29sb3IzIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7IFNlcmlhbGl6YXRpb25IZWxwZXIgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnMuc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdHJpeCB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgSUFuaW1hdGFibGUgfSBmcm9tIFwiY29yZS9BbmltYXRpb25zL2FuaW1hdGFibGUuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBJRWZmZWN0Q3JlYXRpb25PcHRpb25zIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL2VmZmVjdFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbERlZmluZXMgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxEZWZpbmVzXCI7XHJcbmltcG9ydCB7IFB1c2hNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9wdXNoTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxGbGFncyB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbEZsYWdzXCI7XHJcbmltcG9ydCB7IFZlcnRleEJ1ZmZlciB9IGZyb20gXCJjb3JlL0J1ZmZlcnMvYnVmZmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgQWJzdHJhY3RNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2Fic3RyYWN0TWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IFN1Yk1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvc3ViTWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyQ2xhc3MgfSBmcm9tIFwiY29yZS9NaXNjL3R5cGVTdG9yZVwiO1xyXG5cclxuaW1wb3J0IFwiLi90cmlwbGFuYXIuZnJhZ21lbnRcIjtcclxuaW1wb3J0IFwiLi90cmlwbGFuYXIudmVydGV4XCI7XHJcbmltcG9ydCB7IEVmZmVjdEZhbGxiYWNrcyB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9lZmZlY3RGYWxsYmFja3NcIjtcclxuaW1wb3J0IHsgYWRkQ2xpcFBsYW5lVW5pZm9ybXMsIGJpbmRDbGlwUGxhbmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvY2xpcFBsYW5lTWF0ZXJpYWxIZWxwZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIEJpbmRCb25lc1BhcmFtZXRlcnMsXHJcbiAgICBCaW5kRm9nUGFyYW1ldGVycyxcclxuICAgIEJpbmRMaWdodHMsXHJcbiAgICBCaW5kTG9nRGVwdGgsXHJcbiAgICBIYW5kbGVGYWxsYmFja3NGb3JTaGFkb3dzLFxyXG4gICAgUHJlcGFyZUF0dHJpYnV0ZXNGb3JCb25lcyxcclxuICAgIFByZXBhcmVBdHRyaWJ1dGVzRm9ySW5zdGFuY2VzLFxyXG4gICAgUHJlcGFyZURlZmluZXNGb3JBdHRyaWJ1dGVzLFxyXG4gICAgUHJlcGFyZURlZmluZXNGb3JGcmFtZUJvdW5kVmFsdWVzLFxyXG4gICAgUHJlcGFyZURlZmluZXNGb3JMaWdodHMsXHJcbiAgICBQcmVwYXJlRGVmaW5lc0Zvck1pc2MsXHJcbiAgICBQcmVwYXJlVW5pZm9ybXNBbmRTYW1wbGVyc0xpc3QsXHJcbn0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsSGVscGVyLmZ1bmN0aW9uc1wiO1xyXG5cclxuY2xhc3MgVHJpUGxhbmFyTWF0ZXJpYWxEZWZpbmVzIGV4dGVuZHMgTWF0ZXJpYWxEZWZpbmVzIHtcclxuICAgIHB1YmxpYyBESUZGVVNFWCA9IGZhbHNlO1xyXG4gICAgcHVibGljIERJRkZVU0VZID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgRElGRlVTRVogPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgQlVNUFggPSBmYWxzZTtcclxuICAgIHB1YmxpYyBCVU1QWSA9IGZhbHNlO1xyXG4gICAgcHVibGljIEJVTVBaID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIENMSVBQTEFORSA9IGZhbHNlO1xyXG4gICAgcHVibGljIENMSVBQTEFORTIgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBDTElQUExBTkUzID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQ0xJUFBMQU5FNCA9IGZhbHNlO1xyXG4gICAgcHVibGljIENMSVBQTEFORTUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBDTElQUExBTkU2ID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQUxQSEFURVNUID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgREVQVEhQUkVQQVNTID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgUE9JTlRTSVpFID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgRk9HID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgU1BFQ1VMQVJURVJNID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgTk9STUFMID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVkVSVEVYQ09MT1IgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBWRVJURVhBTFBIQSA9IGZhbHNlO1xyXG4gICAgcHVibGljIE5VTV9CT05FX0lORkxVRU5DRVJTID0gMDtcclxuICAgIHB1YmxpYyBCb25lc1Blck1lc2ggPSAwO1xyXG4gICAgcHVibGljIElOU1RBTkNFUyA9IGZhbHNlO1xyXG4gICAgcHVibGljIElOU1RBTkNFU0NPTE9SID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgSU1BR0VQUk9DRVNTSU5HUE9TVFBST0NFU1MgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBTS0lQRklOQUxDT0xPUkNMQU1QID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgTk9OVU5JRk9STVNDQUxJTkcgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBMT0dBUklUSE1JQ0RFUFRIID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQVJFQUxJR0hUU1VQUE9SVEVEID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBBUkVBTElHSFROT1JPVUdIVE5FU1MgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5yZWJ1aWxkKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmlQbGFuYXJNYXRlcmlhbCBleHRlbmRzIFB1c2hNYXRlcmlhbCB7XHJcbiAgICBAc2VyaWFsaXplQXNUZXh0dXJlKClcclxuICAgIHB1YmxpYyBtaXhUZXh0dXJlOiBCYXNlVGV4dHVyZTtcclxuXHJcbiAgICBAc2VyaWFsaXplQXNUZXh0dXJlKFwiZGlmZnVzZVRleHR1cmVYXCIpXHJcbiAgICBwcml2YXRlIF9kaWZmdXNlVGV4dHVyZVg6IEJhc2VUZXh0dXJlO1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoXCJfbWFya0FsbFN1Yk1lc2hlc0FzVGV4dHVyZXNEaXJ0eVwiKVxyXG4gICAgcHVibGljIGRpZmZ1c2VUZXh0dXJlWDogQmFzZVRleHR1cmU7XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzVGV4dHVyZShcImRpZmZ1c2VUZXh0dXJZXCIpXHJcbiAgICBwcml2YXRlIF9kaWZmdXNlVGV4dHVyZVk6IEJhc2VUZXh0dXJlO1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoXCJfbWFya0FsbFN1Yk1lc2hlc0FzVGV4dHVyZXNEaXJ0eVwiKVxyXG4gICAgcHVibGljIGRpZmZ1c2VUZXh0dXJlWTogQmFzZVRleHR1cmU7XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzVGV4dHVyZShcImRpZmZ1c2VUZXh0dXJlWlwiKVxyXG4gICAgcHJpdmF0ZSBfZGlmZnVzZVRleHR1cmVaOiBCYXNlVGV4dHVyZTtcclxuICAgIEBleHBhbmRUb1Byb3BlcnR5KFwiX21hcmtBbGxTdWJNZXNoZXNBc1RleHR1cmVzRGlydHlcIilcclxuICAgIHB1YmxpYyBkaWZmdXNlVGV4dHVyZVo6IEJhc2VUZXh0dXJlO1xyXG5cclxuICAgIEBzZXJpYWxpemVBc1RleHR1cmUoXCJub3JtYWxUZXh0dXJlWFwiKVxyXG4gICAgcHJpdmF0ZSBfbm9ybWFsVGV4dHVyZVg6IEJhc2VUZXh0dXJlO1xyXG4gICAgQGV4cGFuZFRvUHJvcGVydHkoXCJfbWFya0FsbFN1Yk1lc2hlc0FzVGV4dHVyZXNEaXJ0eVwiKVxyXG4gICAgcHVibGljIG5vcm1hbFRleHR1cmVYOiBCYXNlVGV4dHVyZTtcclxuXHJcbiAgICBAc2VyaWFsaXplQXNUZXh0dXJlKFwibm9ybWFsVGV4dHVyZVlcIilcclxuICAgIHByaXZhdGUgX25vcm1hbFRleHR1cmVZOiBCYXNlVGV4dHVyZTtcclxuICAgIEBleHBhbmRUb1Byb3BlcnR5KFwiX21hcmtBbGxTdWJNZXNoZXNBc1RleHR1cmVzRGlydHlcIilcclxuICAgIHB1YmxpYyBub3JtYWxUZXh0dXJlWTogQmFzZVRleHR1cmU7XHJcblxyXG4gICAgQHNlcmlhbGl6ZUFzVGV4dHVyZShcIm5vcm1hbFRleHR1cmVaXCIpXHJcbiAgICBwcml2YXRlIF9ub3JtYWxUZXh0dXJlWjogQmFzZVRleHR1cmU7XHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eShcIl9tYXJrQWxsU3ViTWVzaGVzQXNUZXh0dXJlc0RpcnR5XCIpXHJcbiAgICBwdWJsaWMgbm9ybWFsVGV4dHVyZVo6IEJhc2VUZXh0dXJlO1xyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIHRpbGVTaXplOiBudW1iZXIgPSAxO1xyXG5cclxuICAgIEBzZXJpYWxpemVBc0NvbG9yMygpXHJcbiAgICBwdWJsaWMgZGlmZnVzZUNvbG9yID0gbmV3IENvbG9yMygxLCAxLCAxKTtcclxuXHJcbiAgICBAc2VyaWFsaXplQXNDb2xvcjMoKVxyXG4gICAgcHVibGljIHNwZWN1bGFyQ29sb3IgPSBuZXcgQ29sb3IzKDAuMiwgMC4yLCAwLjIpO1xyXG5cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIHNwZWN1bGFyUG93ZXIgPSA2NDtcclxuXHJcbiAgICBAc2VyaWFsaXplKFwiZGlzYWJsZUxpZ2h0aW5nXCIpXHJcbiAgICBwcml2YXRlIF9kaXNhYmxlTGlnaHRpbmcgPSBmYWxzZTtcclxuICAgIEBleHBhbmRUb1Byb3BlcnR5KFwiX21hcmtBbGxTdWJNZXNoZXNBc0xpZ2h0c0RpcnR5XCIpXHJcbiAgICBwdWJsaWMgZGlzYWJsZUxpZ2h0aW5nOiBib29sZWFuO1xyXG5cclxuICAgIEBzZXJpYWxpemUoXCJtYXhTaW11bHRhbmVvdXNMaWdodHNcIilcclxuICAgIHByaXZhdGUgX21heFNpbXVsdGFuZW91c0xpZ2h0cyA9IDQ7XHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eShcIl9tYXJrQWxsU3ViTWVzaGVzQXNMaWdodHNEaXJ0eVwiKVxyXG4gICAgcHVibGljIG1heFNpbXVsdGFuZW91c0xpZ2h0czogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2NlbmU/OiBTY2VuZSkge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgbmVlZEFscGhhQmxlbmRpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxwaGEgPCAxLjA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIG5lZWRBbHBoYVRlc3RpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBnZXRBbHBoYVRlc3RUZXh0dXJlKCk6IE51bGxhYmxlPEJhc2VUZXh0dXJlPiB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWV0aG9kc1xyXG4gICAgcHVibGljIG92ZXJyaWRlIGlzUmVhZHlGb3JTdWJNZXNoKG1lc2g6IEFic3RyYWN0TWVzaCwgc3ViTWVzaDogU3ViTWVzaCwgdXNlSW5zdGFuY2VzPzogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGRyYXdXcmFwcGVyID0gc3ViTWVzaC5fZHJhd1dyYXBwZXI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRnJvemVuKSB7XHJcbiAgICAgICAgICAgIGlmIChkcmF3V3JhcHBlci5lZmZlY3QgJiYgZHJhd1dyYXBwZXIuX3dhc1ByZXZpb3VzbHlSZWFkeSAmJiBkcmF3V3JhcHBlci5fd2FzUHJldmlvdXNseVVzaW5nSW5zdGFuY2VzID09PSB1c2VJbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXN1Yk1lc2gubWF0ZXJpYWxEZWZpbmVzKSB7XHJcbiAgICAgICAgICAgIHN1Yk1lc2gubWF0ZXJpYWxEZWZpbmVzID0gbmV3IFRyaVBsYW5hck1hdGVyaWFsRGVmaW5lcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVmaW5lcyA9IDxUcmlQbGFuYXJNYXRlcmlhbERlZmluZXM+c3ViTWVzaC5tYXRlcmlhbERlZmluZXM7XHJcbiAgICAgICAgY29uc3Qgc2NlbmUgPSB0aGlzLmdldFNjZW5lKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pc1JlYWR5Rm9yU3ViTWVzaChzdWJNZXNoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVuZ2luZSA9IHNjZW5lLmdldEVuZ2luZSgpO1xyXG5cclxuICAgICAgICAvLyBUZXh0dXJlc1xyXG4gICAgICAgIGlmIChkZWZpbmVzLl9hcmVUZXh0dXJlc0RpcnR5KSB7XHJcbiAgICAgICAgICAgIGlmIChzY2VuZS50ZXh0dXJlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChNYXRlcmlhbEZsYWdzLkRpZmZ1c2VUZXh0dXJlRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHR1cmVzID0gW3RoaXMuZGlmZnVzZVRleHR1cmVYLCB0aGlzLmRpZmZ1c2VUZXh0dXJlWSwgdGhpcy5kaWZmdXNlVGV4dHVyZVpdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHR1cmVEZWZpbmVzID0gW1wiRElGRlVTRVhcIiwgXCJESUZGVVNFWVwiLCBcIkRJRkZVU0VaXCJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZXh0dXJlc1tpXS5pc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8YW55PmRlZmluZXMpW3RleHR1cmVEZWZpbmVzW2ldXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0ZXJpYWxGbGFncy5CdW1wVGV4dHVyZUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0dXJlcyA9IFt0aGlzLm5vcm1hbFRleHR1cmVYLCB0aGlzLm5vcm1hbFRleHR1cmVZLCB0aGlzLm5vcm1hbFRleHR1cmVaXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0dXJlRGVmaW5lcyA9IFtcIkJVTVBYXCIsIFwiQlVNUFlcIiwgXCJCVU1QWlwiXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dHVyZXNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGV4dHVyZXNbaV0uaXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPGFueT5kZWZpbmVzKVt0ZXh0dXJlRGVmaW5lc1tpXV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNaXNjLlxyXG4gICAgICAgIFByZXBhcmVEZWZpbmVzRm9yTWlzYyhtZXNoLCBzY2VuZSwgdGhpcy5fdXNlTG9nYXJpdGhtaWNEZXB0aCwgdGhpcy5wb2ludHNDbG91ZCwgdGhpcy5mb2dFbmFibGVkLCB0aGlzLm5lZWRBbHBoYVRlc3RpbmdGb3JNZXNoKG1lc2gpLCBkZWZpbmVzKTtcclxuXHJcbiAgICAgICAgLy8gTGlnaHRzXHJcbiAgICAgICAgZGVmaW5lcy5fbmVlZE5vcm1hbHMgPSBQcmVwYXJlRGVmaW5lc0ZvckxpZ2h0cyhzY2VuZSwgbWVzaCwgZGVmaW5lcywgZmFsc2UsIHRoaXMuX21heFNpbXVsdGFuZW91c0xpZ2h0cywgdGhpcy5fZGlzYWJsZUxpZ2h0aW5nKTtcclxuXHJcbiAgICAgICAgLy8gVmFsdWVzIHRoYXQgbmVlZCB0byBiZSBldmFsdWF0ZWQgb24gZXZlcnkgZnJhbWVcclxuICAgICAgICBQcmVwYXJlRGVmaW5lc0ZvckZyYW1lQm91bmRWYWx1ZXMoc2NlbmUsIGVuZ2luZSwgdGhpcywgZGVmaW5lcywgdXNlSW5zdGFuY2VzID8gdHJ1ZSA6IGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gQXR0cmlic1xyXG4gICAgICAgIFByZXBhcmVEZWZpbmVzRm9yQXR0cmlidXRlcyhtZXNoLCBkZWZpbmVzLCB0cnVlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGNvcnJlY3QgZWZmZWN0XHJcbiAgICAgICAgaWYgKGRlZmluZXMuaXNEaXJ0eSkge1xyXG4gICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1Byb2Nlc3NlZCgpO1xyXG4gICAgICAgICAgICBzY2VuZS5yZXNldENhY2hlZE1hdGVyaWFsKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBGYWxsYmFja3NcclxuICAgICAgICAgICAgY29uc3QgZmFsbGJhY2tzID0gbmV3IEVmZmVjdEZhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBpZiAoZGVmaW5lcy5GT0cpIHtcclxuICAgICAgICAgICAgICAgIGZhbGxiYWNrcy5hZGRGYWxsYmFjaygxLCBcIkZPR1wiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgSGFuZGxlRmFsbGJhY2tzRm9yU2hhZG93cyhkZWZpbmVzLCBmYWxsYmFja3MsIHRoaXMubWF4U2ltdWx0YW5lb3VzTGlnaHRzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLk5VTV9CT05FX0lORkxVRU5DRVJTID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZmFsbGJhY2tzLmFkZENQVVNraW5uaW5nRmFsbGJhY2soMCwgbWVzaCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlZmluZXMuSU1BR0VQUk9DRVNTSU5HUE9TVFBST0NFU1MgPSBzY2VuZS5pbWFnZVByb2Nlc3NpbmdDb25maWd1cmF0aW9uLmFwcGx5QnlQb3N0UHJvY2VzcztcclxuXHJcbiAgICAgICAgICAgIC8vQXR0cmlidXRlc1xyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJzID0gW1ZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRlZmluZXMuTk9STUFMKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJzLnB1c2goVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmaW5lcy5WRVJURVhDT0xPUikge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlicy5wdXNoKFZlcnRleEJ1ZmZlci5Db2xvcktpbmQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBQcmVwYXJlQXR0cmlidXRlc0ZvckJvbmVzKGF0dHJpYnMsIG1lc2gsIGRlZmluZXMsIGZhbGxiYWNrcyk7XHJcbiAgICAgICAgICAgIFByZXBhcmVBdHRyaWJ1dGVzRm9ySW5zdGFuY2VzKGF0dHJpYnMsIGRlZmluZXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gTGVnYWN5IGJyb3dzZXIgcGF0Y2hcclxuICAgICAgICAgICAgY29uc3Qgc2hhZGVyTmFtZSA9IFwidHJpcGxhbmFyXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IGpvaW4gPSBkZWZpbmVzLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVuaWZvcm1zID0gW1xyXG4gICAgICAgICAgICAgICAgXCJ3b3JsZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2aWV3XCIsXHJcbiAgICAgICAgICAgICAgICBcInZpZXdQcm9qZWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcInZFeWVQb3NpdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2TGlnaHRzVHlwZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2RGlmZnVzZUNvbG9yXCIsXHJcbiAgICAgICAgICAgICAgICBcInZTcGVjdWxhckNvbG9yXCIsXHJcbiAgICAgICAgICAgICAgICBcInZGb2dJbmZvc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ2Rm9nQ29sb3JcIixcclxuICAgICAgICAgICAgICAgIFwicG9pbnRTaXplXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1Cb25lc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0aWxlU2l6ZVwiLFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBjb25zdCBzYW1wbGVycyA9IFtcclxuICAgICAgICAgICAgICAgIFwiZGlmZnVzZVNhbXBsZXJYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpZmZ1c2VTYW1wbGVyWVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaWZmdXNlU2FtcGxlclpcIixcclxuICAgICAgICAgICAgICAgIFwibm9ybWFsU2FtcGxlclhcIixcclxuICAgICAgICAgICAgICAgIFwibm9ybWFsU2FtcGxlcllcIixcclxuICAgICAgICAgICAgICAgIFwibm9ybWFsU2FtcGxlclpcIixcclxuICAgICAgICAgICAgICAgIFwibG9nYXJpdGhtaWNEZXB0aENvbnN0YW50XCIsXHJcbiAgICAgICAgICAgICAgICBcImFyZWFMaWdodHNMVEMxU2FtcGxlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJhcmVhTGlnaHRzTFRDMlNhbXBsZXJcIixcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVuaWZvcm1CdWZmZXJzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgYWRkQ2xpcFBsYW5lVW5pZm9ybXModW5pZm9ybXMpO1xyXG5cclxuICAgICAgICAgICAgUHJlcGFyZVVuaWZvcm1zQW5kU2FtcGxlcnNMaXN0KDxJRWZmZWN0Q3JlYXRpb25PcHRpb25zPntcclxuICAgICAgICAgICAgICAgIHVuaWZvcm1zTmFtZXM6IHVuaWZvcm1zLFxyXG4gICAgICAgICAgICAgICAgdW5pZm9ybUJ1ZmZlcnNOYW1lczogdW5pZm9ybUJ1ZmZlcnMsXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyczogc2FtcGxlcnMsXHJcbiAgICAgICAgICAgICAgICBkZWZpbmVzOiBkZWZpbmVzLFxyXG4gICAgICAgICAgICAgICAgbWF4U2ltdWx0YW5lb3VzTGlnaHRzOiB0aGlzLm1heFNpbXVsdGFuZW91c0xpZ2h0cyxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzdWJNZXNoLnNldEVmZmVjdChcclxuICAgICAgICAgICAgICAgIHNjZW5lLmdldEVuZ2luZSgpLmNyZWF0ZUVmZmVjdChcclxuICAgICAgICAgICAgICAgICAgICBzaGFkZXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIDxJRWZmZWN0Q3JlYXRpb25PcHRpb25zPntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogYXR0cmlicyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pZm9ybXNOYW1lczogdW5pZm9ybXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaWZvcm1CdWZmZXJzTmFtZXM6IHVuaWZvcm1CdWZmZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYW1wbGVyczogc2FtcGxlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluZXM6IGpvaW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrczogZmFsbGJhY2tzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBpbGVkOiB0aGlzLm9uQ29tcGlsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3I6IHRoaXMub25FcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhQYXJhbWV0ZXJzOiB7IG1heFNpbXVsdGFuZW91c0xpZ2h0czogdGhpcy5tYXhTaW11bHRhbmVvdXNMaWdodHMgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZ2luZVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGRlZmluZXMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbENvbnRleHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIEFyZWEgTGlnaHRzIGhhdmUgTFRDIHRleHR1cmUuXHJcbiAgICAgICAgaWYgKGRlZmluZXNbXCJBUkVBTElHSFRVU0VEXCJdKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBtZXNoLmxpZ2h0U291cmNlcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghbWVzaC5saWdodFNvdXJjZXNbaW5kZXhdLl9pc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc3ViTWVzaC5lZmZlY3QgfHwgIXN1Yk1lc2guZWZmZWN0LmlzUmVhZHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWZpbmVzLl9yZW5kZXJJZCA9IHNjZW5lLmdldFJlbmRlcklkKCk7XHJcbiAgICAgICAgZHJhd1dyYXBwZXIuX3dhc1ByZXZpb3VzbHlSZWFkeSA9IHRydWU7XHJcbiAgICAgICAgZHJhd1dyYXBwZXIuX3dhc1ByZXZpb3VzbHlVc2luZ0luc3RhbmNlcyA9ICEhdXNlSW5zdGFuY2VzO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgYmluZEZvclN1Yk1lc2god29ybGQ6IE1hdHJpeCwgbWVzaDogTWVzaCwgc3ViTWVzaDogU3ViTWVzaCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNjZW5lID0gdGhpcy5nZXRTY2VuZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBkZWZpbmVzID0gPFRyaVBsYW5hck1hdGVyaWFsRGVmaW5lcz5zdWJNZXNoLm1hdGVyaWFsRGVmaW5lcztcclxuICAgICAgICBpZiAoIWRlZmluZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZWZmZWN0ID0gc3ViTWVzaC5lZmZlY3Q7XHJcbiAgICAgICAgaWYgKCFlZmZlY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3QgPSBlZmZlY3Q7XHJcblxyXG4gICAgICAgIC8vIE1hdHJpY2VzXHJcbiAgICAgICAgdGhpcy5iaW5kT25seVdvcmxkTWF0cml4KHdvcmxkKTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0TWF0cml4KFwidmlld1Byb2plY3Rpb25cIiwgc2NlbmUuZ2V0VHJhbnNmb3JtTWF0cml4KCkpO1xyXG5cclxuICAgICAgICAvLyBCb25lc1xyXG4gICAgICAgIEJpbmRCb25lc1BhcmFtZXRlcnMobWVzaCwgdGhpcy5fYWN0aXZlRWZmZWN0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldEZsb2F0KFwidGlsZVNpemVcIiwgdGhpcy50aWxlU2l6ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tdXN0UmViaW5kKHNjZW5lLCBlZmZlY3QsIHN1Yk1lc2gpKSB7XHJcbiAgICAgICAgICAgIC8vIFRleHR1cmVzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpZmZ1c2VUZXh0dXJlWCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldFRleHR1cmUoXCJkaWZmdXNlU2FtcGxlclhcIiwgdGhpcy5kaWZmdXNlVGV4dHVyZVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpZmZ1c2VUZXh0dXJlWSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldFRleHR1cmUoXCJkaWZmdXNlU2FtcGxlcllcIiwgdGhpcy5kaWZmdXNlVGV4dHVyZVkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpZmZ1c2VUZXh0dXJlWikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldFRleHR1cmUoXCJkaWZmdXNlU2FtcGxlclpcIiwgdGhpcy5kaWZmdXNlVGV4dHVyZVopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vcm1hbFRleHR1cmVYKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0VGV4dHVyZShcIm5vcm1hbFNhbXBsZXJYXCIsIHRoaXMubm9ybWFsVGV4dHVyZVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vcm1hbFRleHR1cmVZKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0VGV4dHVyZShcIm5vcm1hbFNhbXBsZXJZXCIsIHRoaXMubm9ybWFsVGV4dHVyZVkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vcm1hbFRleHR1cmVaKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0VGV4dHVyZShcIm5vcm1hbFNhbXBsZXJaXCIsIHRoaXMubm9ybWFsVGV4dHVyZVopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIENsaXAgcGxhbmVcclxuICAgICAgICAgICAgYmluZENsaXBQbGFuZShlZmZlY3QsIHRoaXMsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBvaW50IHNpemVcclxuICAgICAgICAgICAgaWYgKHRoaXMucG9pbnRzQ2xvdWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRGbG9hdChcInBvaW50U2l6ZVwiLCB0aGlzLnBvaW50U2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvZy4gZGVwdGhcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZUxvZ2FyaXRobWljRGVwdGgpIHtcclxuICAgICAgICAgICAgICAgIEJpbmRMb2dEZXB0aChkZWZpbmVzLCBlZmZlY3QsIHNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NlbmUuYmluZEV5ZVBvc2l0aW9uKGVmZmVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0Q29sb3I0KFwidkRpZmZ1c2VDb2xvclwiLCB0aGlzLmRpZmZ1c2VDb2xvciwgdGhpcy5hbHBoYSAqIG1lc2gudmlzaWJpbGl0eSk7XHJcblxyXG4gICAgICAgIGlmIChkZWZpbmVzLlNQRUNVTEFSVEVSTSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0Q29sb3I0KFwidlNwZWN1bGFyQ29sb3JcIiwgdGhpcy5zcGVjdWxhckNvbG9yLCB0aGlzLnNwZWN1bGFyUG93ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNjZW5lLmxpZ2h0c0VuYWJsZWQgJiYgIXRoaXMuZGlzYWJsZUxpZ2h0aW5nKSB7XHJcbiAgICAgICAgICAgIEJpbmRMaWdodHMoc2NlbmUsIG1lc2gsIHRoaXMuX2FjdGl2ZUVmZmVjdCwgZGVmaW5lcywgdGhpcy5tYXhTaW11bHRhbmVvdXNMaWdodHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVmlld1xyXG4gICAgICAgIGlmIChzY2VuZS5mb2dFbmFibGVkICYmIG1lc2guYXBwbHlGb2cgJiYgc2NlbmUuZm9nTW9kZSAhPT0gU2NlbmUuRk9HTU9ERV9OT05FKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRNYXRyaXgoXCJ2aWV3XCIsIHNjZW5lLmdldFZpZXdNYXRyaXgoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGb2dcclxuICAgICAgICBCaW5kRm9nUGFyYW1ldGVycyhzY2VuZSwgbWVzaCwgdGhpcy5fYWN0aXZlRWZmZWN0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWZ0ZXJCaW5kKG1lc2gsIHRoaXMuX2FjdGl2ZUVmZmVjdCwgc3ViTWVzaCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGdldEFuaW1hdGFibGVzKCk6IElBbmltYXRhYmxlW10ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWl4VGV4dHVyZSAmJiB0aGlzLm1peFRleHR1cmUuYW5pbWF0aW9ucyAmJiB0aGlzLm1peFRleHR1cmUuYW5pbWF0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLm1peFRleHR1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGdldEFjdGl2ZVRleHR1cmVzKCk6IEJhc2VUZXh0dXJlW10ge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVRleHR1cmVzID0gc3VwZXIuZ2V0QWN0aXZlVGV4dHVyZXMoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2RpZmZ1c2VUZXh0dXJlWCkge1xyXG4gICAgICAgICAgICBhY3RpdmVUZXh0dXJlcy5wdXNoKHRoaXMuX2RpZmZ1c2VUZXh0dXJlWCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGlmZnVzZVRleHR1cmVZKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZVRleHR1cmVzLnB1c2godGhpcy5fZGlmZnVzZVRleHR1cmVZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9kaWZmdXNlVGV4dHVyZVopIHtcclxuICAgICAgICAgICAgYWN0aXZlVGV4dHVyZXMucHVzaCh0aGlzLl9kaWZmdXNlVGV4dHVyZVopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX25vcm1hbFRleHR1cmVYKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZVRleHR1cmVzLnB1c2godGhpcy5fbm9ybWFsVGV4dHVyZVgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX25vcm1hbFRleHR1cmVZKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZVRleHR1cmVzLnB1c2godGhpcy5fbm9ybWFsVGV4dHVyZVkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX25vcm1hbFRleHR1cmVaKSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZVRleHR1cmVzLnB1c2godGhpcy5fbm9ybWFsVGV4dHVyZVopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFjdGl2ZVRleHR1cmVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBoYXNUZXh0dXJlKHRleHR1cmU6IEJhc2VUZXh0dXJlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHN1cGVyLmhhc1RleHR1cmUodGV4dHVyZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGlmZnVzZVRleHR1cmVYID09PSB0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2RpZmZ1c2VUZXh0dXJlWSA9PT0gdGV4dHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9kaWZmdXNlVGV4dHVyZVogPT09IHRleHR1cmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbm9ybWFsVGV4dHVyZVggPT09IHRleHR1cmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbm9ybWFsVGV4dHVyZVkgPT09IHRleHR1cmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fbm9ybWFsVGV4dHVyZVogPT09IHRleHR1cmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgZGlzcG9zZShmb3JjZURpc3Bvc2VFZmZlY3Q/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubWl4VGV4dHVyZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1peFRleHR1cmUuZGlzcG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZShmb3JjZURpc3Bvc2VFZmZlY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBjbG9uZShuYW1lOiBzdHJpbmcpOiBUcmlQbGFuYXJNYXRlcmlhbCB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6YXRpb25IZWxwZXIuQ2xvbmUoKCkgPT4gbmV3IFRyaVBsYW5hck1hdGVyaWFsKG5hbWUsIHRoaXMuZ2V0U2NlbmUoKSksIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBzZXJpYWxpemUoKTogYW55IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemF0aW9uT2JqZWN0ID0gc3VwZXIuc2VyaWFsaXplKCk7XHJcbiAgICAgICAgc2VyaWFsaXphdGlvbk9iamVjdC5jdXN0b21UeXBlID0gXCJCQUJZTE9OLlRyaVBsYW5hck1hdGVyaWFsXCI7XHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlRyaVBsYW5hck1hdGVyaWFsXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhdGljc1xyXG4gICAgcHVibGljIHN0YXRpYyBvdmVycmlkZSBQYXJzZShzb3VyY2U6IGFueSwgc2NlbmU6IFNjZW5lLCByb290VXJsOiBzdHJpbmcpOiBUcmlQbGFuYXJNYXRlcmlhbCB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6YXRpb25IZWxwZXIuUGFyc2UoKCkgPT4gbmV3IFRyaVBsYW5hck1hdGVyaWFsKHNvdXJjZS5uYW1lLCBzY2VuZSksIHNvdXJjZSwgc2NlbmUsIHJvb3RVcmwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWdpc3RlckNsYXNzKFwiQkFCWUxPTi5UcmlQbGFuYXJNYXRlcmlhbFwiLCBUcmlQbGFuYXJNYXRlcmlhbCk7XHJcbiIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvaGVscGVyRnVuY3Rpb25zXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbGlnaHRGcmFnbWVudERlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbGlnaHRVYm9EZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2xvZ0RlcHRoRGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9saWdodHNGcmFnbWVudEZ1bmN0aW9uc1wiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL3NoYWRvd3NGcmFnbWVudEZ1bmN0aW9uc1wiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2NsaXBQbGFuZUZyYWdtZW50RGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9mb2dGcmFnbWVudERlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvY2xpcFBsYW5lRnJhZ21lbnRcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9kZXB0aFByZVBhc3NcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9saWdodEZyYWdtZW50XCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbG9nRGVwdGhGcmFnbWVudFwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2ZvZ0ZyYWdtZW50XCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvaW1hZ2VQcm9jZXNzaW5nQ29tcGF0aWJpbGl0eVwiO1xuXG5jb25zdCBuYW1lID0gXCJ0cmlwbGFuYXJQaXhlbFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHByZWNpc2lvbiBoaWdocCBmbG9hdDt1bmlmb3JtIHZlYzQgdkV5ZVBvc2l0aW9uO3VuaWZvcm0gdmVjNCB2RGlmZnVzZUNvbG9yO1xuI2lmZGVmIFNQRUNVTEFSVEVSTVxudW5pZm9ybSB2ZWM0IHZTcGVjdWxhckNvbG9yO1xuI2VuZGlmXG52YXJ5aW5nIHZlYzMgdlBvc2l0aW9uVztcbiNpZiBkZWZpbmVkKFZFUlRFWENPTE9SKSB8fCBkZWZpbmVkKElOU1RBTkNFU0NPTE9SKSAmJiBkZWZpbmVkKElOU1RBTkNFUylcbnZhcnlpbmcgdmVjNCB2Q29sb3I7XG4jZW5kaWZcbiNpbmNsdWRlPGhlbHBlckZ1bmN0aW9ucz5cbiNpbmNsdWRlPF9fZGVjbF9fbGlnaHRGcmFnbWVudD5bMC4ubWF4U2ltdWx0YW5lb3VzTGlnaHRzXVxuI2lmZGVmIERJRkZVU0VYXG52YXJ5aW5nIHZlYzIgdlRleHR1cmVVVlg7dW5pZm9ybSBzYW1wbGVyMkQgZGlmZnVzZVNhbXBsZXJYO1xuI2lmZGVmIEJVTVBYXG51bmlmb3JtIHNhbXBsZXIyRCBub3JtYWxTYW1wbGVyWDtcbiNlbmRpZlxuI2VuZGlmXG4jaWZkZWYgRElGRlVTRVlcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZVVWWTt1bmlmb3JtIHNhbXBsZXIyRCBkaWZmdXNlU2FtcGxlclk7XG4jaWZkZWYgQlVNUFlcbnVuaWZvcm0gc2FtcGxlcjJEIG5vcm1hbFNhbXBsZXJZO1xuI2VuZGlmXG4jZW5kaWZcbiNpZmRlZiBESUZGVVNFWlxudmFyeWluZyB2ZWMyIHZUZXh0dXJlVVZaO3VuaWZvcm0gc2FtcGxlcjJEIGRpZmZ1c2VTYW1wbGVyWjtcbiNpZmRlZiBCVU1QWlxudW5pZm9ybSBzYW1wbGVyMkQgbm9ybWFsU2FtcGxlclo7XG4jZW5kaWZcbiNlbmRpZlxuI2lmZGVmIE5PUk1BTFxudmFyeWluZyBtYXQzIHRhbmdlbnRTcGFjZTtcbiNlbmRpZlxuI2lmZGVmIExPR0FSSVRITUlDREVQVEhcbiNleHRlbnNpb24gR0xfRVhUX2ZyYWdfZGVwdGggOiBlbmFibGVcbiNlbmRpZlxuI2luY2x1ZGU8bG9nRGVwdGhEZWNsYXJhdGlvbj5cbiNpbmNsdWRlPGxpZ2h0c0ZyYWdtZW50RnVuY3Rpb25zPlxuI2luY2x1ZGU8c2hhZG93c0ZyYWdtZW50RnVuY3Rpb25zPlxuI2luY2x1ZGU8Y2xpcFBsYW5lRnJhZ21lbnREZWNsYXJhdGlvbj5cbiNpbmNsdWRlPGZvZ0ZyYWdtZW50RGVjbGFyYXRpb24+XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9ERUZJTklUSU9OU1xudm9pZCBtYWluKHZvaWQpIHtcbiNkZWZpbmUgQ1VTVE9NX0ZSQUdNRU5UX01BSU5fQkVHSU5cbiNpbmNsdWRlPGNsaXBQbGFuZUZyYWdtZW50PlxudmVjMyB2aWV3RGlyZWN0aW9uVz1ub3JtYWxpemUodkV5ZVBvc2l0aW9uLnh5ei12UG9zaXRpb25XKTt2ZWM0IGJhc2VDb2xvcj12ZWM0KDAuLDAuLDAuLDEuKTt2ZWMzIGRpZmZ1c2VDb2xvcj12RGlmZnVzZUNvbG9yLnJnYjtmbG9hdCBhbHBoYT12RGlmZnVzZUNvbG9yLmE7XG4jaWZkZWYgTk9STUFMXG52ZWMzIG5vcm1hbFc9dGFuZ2VudFNwYWNlWzJdO1xuI2Vsc2VcbnZlYzMgbm9ybWFsVz12ZWMzKDEuMCwxLjAsMS4wKTtcbiNlbmRpZlxudmVjNCBiYXNlTm9ybWFsPXZlYzQoMC4wLDAuMCwwLjAsMS4wKTtub3JtYWxXKj1ub3JtYWxXO1xuI2lmZGVmIERJRkZVU0VYXG5iYXNlQ29sb3IrPXRleHR1cmUyRChkaWZmdXNlU2FtcGxlclgsdlRleHR1cmVVVlgpKm5vcm1hbFcueDtcbiNpZmRlZiBCVU1QWFxuYmFzZU5vcm1hbCs9dGV4dHVyZTJEKG5vcm1hbFNhbXBsZXJYLHZUZXh0dXJlVVZYKSpub3JtYWxXLng7XG4jZW5kaWZcbiNlbmRpZlxuI2lmZGVmIERJRkZVU0VZXG5iYXNlQ29sb3IrPXRleHR1cmUyRChkaWZmdXNlU2FtcGxlclksdlRleHR1cmVVVlkpKm5vcm1hbFcueTtcbiNpZmRlZiBCVU1QWVxuYmFzZU5vcm1hbCs9dGV4dHVyZTJEKG5vcm1hbFNhbXBsZXJZLHZUZXh0dXJlVVZZKSpub3JtYWxXLnk7XG4jZW5kaWZcbiNlbmRpZlxuI2lmZGVmIERJRkZVU0VaXG5iYXNlQ29sb3IrPXRleHR1cmUyRChkaWZmdXNlU2FtcGxlclosdlRleHR1cmVVVlopKm5vcm1hbFcuejtcbiNpZmRlZiBCVU1QWlxuYmFzZU5vcm1hbCs9dGV4dHVyZTJEKG5vcm1hbFNhbXBsZXJaLHZUZXh0dXJlVVZaKSpub3JtYWxXLno7XG4jZW5kaWZcbiNlbmRpZlxuI2lmZGVmIE5PUk1BTFxubm9ybWFsVz1ub3JtYWxpemUoKDIuMCpiYXNlTm9ybWFsLnh5ei0xLjApKnRhbmdlbnRTcGFjZSk7XG4jZW5kaWZcbiNpZmRlZiBBTFBIQVRFU1RcbmlmIChiYXNlQ29sb3IuYTwwLjQpXG5kaXNjYXJkO1xuI2VuZGlmXG4jaW5jbHVkZTxkZXB0aFByZVBhc3M+XG4jaWYgZGVmaW5lZChWRVJURVhDT0xPUikgfHwgZGVmaW5lZChJTlNUQU5DRVNDT0xPUikgJiYgZGVmaW5lZChJTlNUQU5DRVMpXG5iYXNlQ29sb3IucmdiKj12Q29sb3IucmdiO1xuI2VuZGlmXG52ZWMzIGRpZmZ1c2VCYXNlPXZlYzMoMC4sMC4sMC4pO2xpZ2h0aW5nSW5mbyBpbmZvO2Zsb2F0IHNoYWRvdz0xLjtmbG9hdCBhZ2dTaGFkb3c9MC47ZmxvYXQgbnVtTGlnaHRzPTAuO1xuI2lmZGVmIFNQRUNVTEFSVEVSTVxuZmxvYXQgZ2xvc3NpbmVzcz12U3BlY3VsYXJDb2xvci5hO3ZlYzMgc3BlY3VsYXJCYXNlPXZlYzMoMC4sMC4sMC4pO3ZlYzMgc3BlY3VsYXJDb2xvcj12U3BlY3VsYXJDb2xvci5yZ2I7XG4jZWxzZVxuZmxvYXQgZ2xvc3NpbmVzcz0wLjtcbiNlbmRpZlxuI2luY2x1ZGU8bGlnaHRGcmFnbWVudD5bMC4ubWF4U2ltdWx0YW5lb3VzTGlnaHRzXVxuI2lmIGRlZmluZWQoVkVSVEVYQUxQSEEpIHx8IGRlZmluZWQoSU5TVEFOQ0VTQ09MT1IpICYmIGRlZmluZWQoSU5TVEFOQ0VTKVxuYWxwaGEqPXZDb2xvci5hO1xuI2VuZGlmXG4jaWZkZWYgU1BFQ1VMQVJURVJNXG52ZWMzIGZpbmFsU3BlY3VsYXI9c3BlY3VsYXJCYXNlKnNwZWN1bGFyQ29sb3I7XG4jZWxzZVxudmVjMyBmaW5hbFNwZWN1bGFyPXZlYzMoMC4wKTtcbiNlbmRpZlxudmVjMyBmaW5hbERpZmZ1c2U9Y2xhbXAoZGlmZnVzZUJhc2UqZGlmZnVzZUNvbG9yLDAuMCwxLjApKmJhc2VDb2xvci5yZ2I7dmVjNCBjb2xvcj12ZWM0KGZpbmFsRGlmZnVzZStmaW5hbFNwZWN1bGFyLGFscGhhKTtcbiNpbmNsdWRlPGxvZ0RlcHRoRnJhZ21lbnQ+XG4jaW5jbHVkZTxmb2dGcmFnbWVudD5cbmdsX0ZyYWdDb2xvcj1jb2xvcjtcbiNpbmNsdWRlPGltYWdlUHJvY2Vzc2luZ0NvbXBhdGliaWxpdHk+XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9NQUlOX0VORFxufVxuYDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCB0cmlwbGFuYXJQaXhlbFNoYWRlciA9IHsgbmFtZSwgc2hhZGVyIH07XG4iLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2hlbHBlckZ1bmN0aW9uc1wiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2JvbmVzRGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9iYWtlZFZlcnRleEFuaW1hdGlvbkRlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvaW5zdGFuY2VzRGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9jbGlwUGxhbmVWZXJ0ZXhEZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2xvZ0RlcHRoRGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9mb2dWZXJ0ZXhEZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2xpZ2h0RnJhZ21lbnREZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2xpZ2h0VWJvRGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9pbnN0YW5jZXNWZXJ0ZXhcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9ib25lc1ZlcnRleFwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2Jha2VkVmVydGV4QW5pbWF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvY2xpcFBsYW5lVmVydGV4XCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbG9nRGVwdGhWZXJ0ZXhcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9mb2dWZXJ0ZXhcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9zaGFkb3dzVmVydGV4XCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvdmVydGV4Q29sb3JNaXhpbmdcIjtcblxuY29uc3QgbmFtZSA9IFwidHJpcGxhbmFyVmVydGV4U2hhZGVyXCI7XG5jb25zdCBzaGFkZXIgPSBgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O2F0dHJpYnV0ZSB2ZWMzIHBvc2l0aW9uO1xuI2lmZGVmIE5PUk1BTFxuYXR0cmlidXRlIHZlYzMgbm9ybWFsO1xuI2VuZGlmXG4jaWZkZWYgVkVSVEVYQ09MT1JcbmF0dHJpYnV0ZSB2ZWM0IGNvbG9yO1xuI2VuZGlmXG4jaW5jbHVkZTxoZWxwZXJGdW5jdGlvbnM+XG4jaW5jbHVkZTxib25lc0RlY2xhcmF0aW9uPlxuI2luY2x1ZGU8YmFrZWRWZXJ0ZXhBbmltYXRpb25EZWNsYXJhdGlvbj5cbiNpbmNsdWRlPGluc3RhbmNlc0RlY2xhcmF0aW9uPlxudW5pZm9ybSBtYXQ0IHZpZXc7dW5pZm9ybSBtYXQ0IHZpZXdQcm9qZWN0aW9uO1xuI2lmZGVmIERJRkZVU0VYXG52YXJ5aW5nIHZlYzIgdlRleHR1cmVVVlg7XG4jZW5kaWZcbiNpZmRlZiBESUZGVVNFWVxudmFyeWluZyB2ZWMyIHZUZXh0dXJlVVZZO1xuI2VuZGlmXG4jaWZkZWYgRElGRlVTRVpcbnZhcnlpbmcgdmVjMiB2VGV4dHVyZVVWWjtcbiNlbmRpZlxudW5pZm9ybSBmbG9hdCB0aWxlU2l6ZTtcbiNpZmRlZiBQT0lOVFNJWkVcbnVuaWZvcm0gZmxvYXQgcG9pbnRTaXplO1xuI2VuZGlmXG52YXJ5aW5nIHZlYzMgdlBvc2l0aW9uVztcbiNpZmRlZiBOT1JNQUxcbnZhcnlpbmcgbWF0MyB0YW5nZW50U3BhY2U7XG4jZW5kaWZcbiNpZiBkZWZpbmVkKFZFUlRFWENPTE9SKSB8fCBkZWZpbmVkKElOU1RBTkNFU0NPTE9SKSAmJiBkZWZpbmVkKElOU1RBTkNFUylcbnZhcnlpbmcgdmVjNCB2Q29sb3I7XG4jZW5kaWZcbiNpbmNsdWRlPGNsaXBQbGFuZVZlcnRleERlY2xhcmF0aW9uPlxuI2luY2x1ZGU8bG9nRGVwdGhEZWNsYXJhdGlvbj5cbiNpbmNsdWRlPGZvZ1ZlcnRleERlY2xhcmF0aW9uPlxuI2luY2x1ZGU8X19kZWNsX19saWdodEZyYWdtZW50PlswLi5tYXhTaW11bHRhbmVvdXNMaWdodHNdXG4jZGVmaW5lIENVU1RPTV9WRVJURVhfREVGSU5JVElPTlNcbnZvaWQgbWFpbih2b2lkKVxue1xuI2RlZmluZSBDVVNUT01fVkVSVEVYX01BSU5fQkVHSU5cbiNpbmNsdWRlPGluc3RhbmNlc1ZlcnRleD5cbiNpbmNsdWRlPGJvbmVzVmVydGV4PlxuI2luY2x1ZGU8YmFrZWRWZXJ0ZXhBbmltYXRpb24+XG52ZWM0IHdvcmxkUG9zPWZpbmFsV29ybGQqdmVjNChwb3NpdGlvbiwxLjApO2dsX1Bvc2l0aW9uPXZpZXdQcm9qZWN0aW9uKndvcmxkUG9zO3ZQb3NpdGlvblc9dmVjMyh3b3JsZFBvcyk7XG4jaWZkZWYgRElGRlVTRVhcbnZUZXh0dXJlVVZYPXdvcmxkUG9zLnp5L3RpbGVTaXplO1xuI2VuZGlmXG4jaWZkZWYgRElGRlVTRVlcbnZUZXh0dXJlVVZZPXdvcmxkUG9zLnh6L3RpbGVTaXplO1xuI2VuZGlmXG4jaWZkZWYgRElGRlVTRVpcbnZUZXh0dXJlVVZaPXdvcmxkUG9zLnh5L3RpbGVTaXplO1xuI2VuZGlmXG4jaWZkZWYgTk9STUFMXG52ZWMzIHh0YW49dmVjMygwLDAsMSk7dmVjMyB4YmluPXZlYzMoMCwxLDApO3ZlYzMgeXRhbj12ZWMzKDEsMCwwKTt2ZWMzIHliaW49dmVjMygwLDAsMSk7dmVjMyB6dGFuPXZlYzMoMSwwLDApO3ZlYzMgemJpbj12ZWMzKDAsMSwwKTt2ZWMzIG5vcm1hbGl6ZWROb3JtYWw9bm9ybWFsaXplKG5vcm1hbCk7bm9ybWFsaXplZE5vcm1hbCo9bm9ybWFsaXplZE5vcm1hbDt2ZWMzIHdvcmxkQmlub3JtYWw9bm9ybWFsaXplKHhiaW4qbm9ybWFsaXplZE5vcm1hbC54K3liaW4qbm9ybWFsaXplZE5vcm1hbC55K3piaW4qbm9ybWFsaXplZE5vcm1hbC56KTt2ZWMzIHdvcmxkVGFuZ2VudD1ub3JtYWxpemUoeHRhbipub3JtYWxpemVkTm9ybWFsLngreXRhbipub3JtYWxpemVkTm9ybWFsLnkrenRhbipub3JtYWxpemVkTm9ybWFsLnopO21hdDMgbm9ybWFsV29ybGQ9bWF0MyhmaW5hbFdvcmxkKTtcbiNpZmRlZiBOT05VTklGT1JNU0NBTElOR1xubm9ybWFsV29ybGQ9dHJhbnNwb3NlTWF0MyhpbnZlcnNlTWF0Myhub3JtYWxXb3JsZCkpO1xuI2VuZGlmXG53b3JsZFRhbmdlbnQ9bm9ybWFsaXplKChub3JtYWxXb3JsZCp3b3JsZFRhbmdlbnQpLnh5eik7d29ybGRCaW5vcm1hbD1ub3JtYWxpemUoKG5vcm1hbFdvcmxkKndvcmxkQmlub3JtYWwpLnh5eik7dmVjMyB3b3JsZE5vcm1hbD1ub3JtYWxpemUoKG5vcm1hbFdvcmxkKm5vcm1hbGl6ZShub3JtYWwpKS54eXopO3RhbmdlbnRTcGFjZVswXT13b3JsZFRhbmdlbnQ7dGFuZ2VudFNwYWNlWzFdPXdvcmxkQmlub3JtYWw7dGFuZ2VudFNwYWNlWzJdPXdvcmxkTm9ybWFsO1xuI2VuZGlmXG4jaW5jbHVkZTxjbGlwUGxhbmVWZXJ0ZXg+XG4jaW5jbHVkZTxsb2dEZXB0aFZlcnRleD5cbiNpbmNsdWRlPGZvZ1ZlcnRleD5cbiNpbmNsdWRlPHNoYWRvd3NWZXJ0ZXg+WzAuLm1heFNpbXVsdGFuZW91c0xpZ2h0c11cbiNpbmNsdWRlPHZlcnRleENvbG9yTWl4aW5nPlxuI2lmIGRlZmluZWQoUE9JTlRTSVpFKSAmJiAhZGVmaW5lZChXRUJHUFUpXG5nbF9Qb2ludFNpemU9cG9pbnRTaXplO1xuI2VuZGlmXG4jZGVmaW5lIENVU1RPTV9WRVJURVhfTUFJTl9FTkRcbn1cbmA7XG4vLyBTaWRlZWZmZWN0XG5TaGFkZXJTdG9yZS5TaGFkZXJzU3RvcmVbbmFtZV0gPSBzaGFkZXI7XG4vKiogQGludGVybmFsICovXG5leHBvcnQgY29uc3QgdHJpcGxhbmFyVmVydGV4U2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmltcG9ydCAqIGFzIE1hdExpYiBmcm9tIFwibWF0ZXJpYWxzL3RyaVBsYW5hci9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gTWF0TGliKSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0gPSAoPGFueT5NYXRMaWIpW2tleV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJtYXRlcmlhbHMvdHJpUGxhbmFyL2luZGV4XCI7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWF0ZXJpYWxzX2VmZmVjdF9fOyIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cblxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XG4gIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XG4gIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59XG5cbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcbiAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcbiAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0O1xuICB9XG4gIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcbiAgdmFyIHQgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICB0W3BdID0gc1twXTtcbiAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICB9XG4gIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcbiAgZnVuY3Rpb24gYWNjZXB0KGYpIHsgaWYgKGYgIT09IHZvaWQgMCAmJiB0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24gZXhwZWN0ZWRcIik7IHJldHVybiBmOyB9XG4gIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XG4gIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xuICB2YXIgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JJbiB8fCAodGFyZ2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGNvbnRleHRJbi5uYW1lKSA6IHt9KTtcbiAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcbiAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xuICAgICAgY29udGV4dC5hZGRJbml0aWFsaXplciA9IGZ1bmN0aW9uIChmKSB7IGlmIChkb25lKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGFkZCBpbml0aWFsaXplcnMgYWZ0ZXIgZGVjb3JhdGlvbiBoYXMgY29tcGxldGVkXCIpOyBleHRyYUluaXRpYWxpemVycy5wdXNoKGFjY2VwdChmIHx8IG51bGwpKTsgfTtcbiAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xuICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCkgY29udGludWU7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LnNldCkpIGRlc2NyaXB0b3Iuc2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXyA9IGFjY2VwdChyZXN1bHQpKSB7XG4gICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xuICAgICAgfVxuICB9XG4gIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcbiAgZG9uZSA9IHRydWU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19ydW5Jbml0aWFsaXplcnModGhpc0FyZywgaW5pdGlhbGl6ZXJzLCB2YWx1ZSkge1xuICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlID0gdXNlVmFsdWUgPyBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnLCB2YWx1ZSkgOiBpbml0aWFsaXplcnNbaV0uY2FsbCh0aGlzQXJnKTtcbiAgfVxuICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCIgPyB4IDogXCJcIi5jb25jYXQoeCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19zZXRGdW5jdGlvbk5hbWUoZiwgbmFtZSwgcHJlZml4KSB7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xuICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xuICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEl0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKTtcbiAgcmV0dXJuIGcubmV4dCA9IHZlcmIoMCksIGdbXCJ0aHJvd1wiXSA9IHZlcmIoMSksIGdbXCJyZXR1cm5cIl0gPSB2ZXJiKDIpLCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gIH1cbn1cblxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gIG9bazJdID0gbVtrXTtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcbiAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xuICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgfVxuICB9O1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xuICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gIGlmICghbSkgcmV0dXJuIG87XG4gIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xuICB0cnkge1xuICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gIH1cbiAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gIGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgIH1cbiAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxuICB9XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XG4gIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xuICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgcltrXSA9IGFbal07XG4gIHJldHVybiByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xuICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XG4gICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgfVxuICB9XG4gIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XG4gIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcbiAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XG4gIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cbiAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XG4gIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcbiAgdmFyIGksIHA7XG4gIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcbiAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcbiAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XG4gIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XG4gIHJldHVybiBjb29rZWQ7XG59O1xuXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59O1xuXG52YXIgb3duS2V5cyA9IGZ1bmN0aW9uKG8pIHtcbiAgb3duS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIChvKSB7XG4gICAgdmFyIGFyID0gW107XG4gICAgZm9yICh2YXIgayBpbiBvKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspKSBhclthci5sZW5ndGhdID0gaztcbiAgICByZXR1cm4gYXI7XG4gIH07XG4gIHJldHVybiBvd25LZXlzKG8pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgPSBvd25LZXlzKG1vZCksIGkgPSAwOyBpIDwgay5sZW5ndGg7IGkrKykgaWYgKGtbaV0gIT09IFwiZGVmYXVsdFwiKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGtbaV0pO1xuICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xuICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcbiAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XG4gIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xuICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hZGREaXNwb3NhYmxlUmVzb3VyY2UoZW52LCB2YWx1ZSwgYXN5bmMpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkLlwiKTtcbiAgICB2YXIgZGlzcG9zZSwgaW5uZXI7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBpZiAoIVN5bWJvbC5hc3luY0Rpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNEaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuYXN5bmNEaXNwb3NlXTtcbiAgICB9XG4gICAgaWYgKGRpc3Bvc2UgPT09IHZvaWQgMCkge1xuICAgICAgaWYgKCFTeW1ib2wuZGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5kaXNwb3NlIGlzIG5vdCBkZWZpbmVkLlwiKTtcbiAgICAgIGRpc3Bvc2UgPSB2YWx1ZVtTeW1ib2wuZGlzcG9zZV07XG4gICAgICBpZiAoYXN5bmMpIGlubmVyID0gZGlzcG9zZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkaXNwb3NlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGUuXCIpO1xuICAgIGlmIChpbm5lcikgZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB0cnkgeyBpbm5lci5jYWxsKHRoaXMpOyB9IGNhdGNoIChlKSB7IHJldHVybiBQcm9taXNlLnJlamVjdChlKTsgfSB9O1xuICAgIGVudi5zdGFjay5wdXNoKHsgdmFsdWU6IHZhbHVlLCBkaXNwb3NlOiBkaXNwb3NlLCBhc3luYzogYXN5bmMgfSk7XG4gIH1cbiAgZWxzZSBpZiAoYXN5bmMpIHtcbiAgICBlbnYuc3RhY2sucHVzaCh7IGFzeW5jOiB0cnVlIH0pO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxudmFyIF9TdXBwcmVzc2VkRXJyb3IgPSB0eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19kaXNwb3NlUmVzb3VyY2VzKGVudikge1xuICBmdW5jdGlvbiBmYWlsKGUpIHtcbiAgICBlbnYuZXJyb3IgPSBlbnYuaGFzRXJyb3IgPyBuZXcgX1N1cHByZXNzZWRFcnJvcihlLCBlbnYuZXJyb3IsIFwiQW4gZXJyb3Igd2FzIHN1cHByZXNzZWQgZHVyaW5nIGRpc3Bvc2FsLlwiKSA6IGU7XG4gICAgZW52Lmhhc0Vycm9yID0gdHJ1ZTtcbiAgfVxuICB2YXIgciwgcyA9IDA7XG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgd2hpbGUgKHIgPSBlbnYuc3RhY2sucG9wKCkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghci5hc3luYyAmJiBzID09PSAxKSByZXR1cm4gcyA9IDAsIGVudi5zdGFjay5wdXNoKHIpLCBQcm9taXNlLnJlc29sdmUoKS50aGVuKG5leHQpO1xuICAgICAgICBpZiAoci5kaXNwb3NlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHIuZGlzcG9zZS5jYWxsKHIudmFsdWUpO1xuICAgICAgICAgIGlmIChyLmFzeW5jKSByZXR1cm4gcyB8PSAyLCBQcm9taXNlLnJlc29sdmUocmVzdWx0KS50aGVuKG5leHQsIGZ1bmN0aW9uKGUpIHsgZmFpbChlKTsgcmV0dXJuIG5leHQoKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBzIHw9IDE7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBmYWlsKGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocyA9PT0gMSkgcmV0dXJuIGVudi5oYXNFcnJvciA/IFByb21pc2UucmVqZWN0KGVudi5lcnJvcikgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBpZiAoZW52Lmhhc0Vycm9yKSB0aHJvdyBlbnYuZXJyb3I7XG4gIH1cbiAgcmV0dXJuIG5leHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uKHBhdGgsIHByZXNlcnZlSnN4KSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcLlxcLj9cXC8vLnRlc3QocGF0aCkpIHtcbiAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLih0c3gpJHwoKD86XFwuZCk/KSgoPzpcXC5bXi4vXSs/KT8pXFwuKFtjbV0/KXRzJC9pLCBmdW5jdGlvbiAobSwgdHN4LCBkLCBleHQsIGNtKSB7XG4gICAgICAgICAgcmV0dXJuIHRzeCA/IHByZXNlcnZlSnN4ID8gXCIuanN4XCIgOiBcIi5qc1wiIDogZCAmJiAoIWV4dCB8fCAhY20pID8gbSA6IChkICsgZXh0ICsgXCIuXCIgKyBjbS50b0xvd2VyQ2FzZSgpICsgXCJqc1wiKTtcbiAgICAgIH0pO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIF9fZXh0ZW5kcyxcbiAgX19hc3NpZ24sXG4gIF9fcmVzdCxcbiAgX19kZWNvcmF0ZSxcbiAgX19wYXJhbSxcbiAgX19lc0RlY29yYXRlLFxuICBfX3J1bkluaXRpYWxpemVycyxcbiAgX19wcm9wS2V5LFxuICBfX3NldEZ1bmN0aW9uTmFtZSxcbiAgX19tZXRhZGF0YSxcbiAgX19hd2FpdGVyLFxuICBfX2dlbmVyYXRvcixcbiAgX19jcmVhdGVCaW5kaW5nLFxuICBfX2V4cG9ydFN0YXIsXG4gIF9fdmFsdWVzLFxuICBfX3JlYWQsXG4gIF9fc3ByZWFkLFxuICBfX3NwcmVhZEFycmF5cyxcbiAgX19zcHJlYWRBcnJheSxcbiAgX19hd2FpdCxcbiAgX19hc3luY0dlbmVyYXRvcixcbiAgX19hc3luY0RlbGVnYXRvcixcbiAgX19hc3luY1ZhbHVlcyxcbiAgX19tYWtlVGVtcGxhdGVPYmplY3QsXG4gIF9faW1wb3J0U3RhcixcbiAgX19pbXBvcnREZWZhdWx0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0LFxuICBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4sXG4gIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlLFxuICBfX2Rpc3Bvc2VSZXNvdXJjZXMsXG4gIF9fcmV3cml0ZVJlbGF0aXZlSW1wb3J0RXh0ZW5zaW9uLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIG1hdGVyaWFscyBmcm9tIFwiQGx0cy9tYXRlcmlhbHMvbGVnYWN5L2xlZ2FjeS10cmlQbGFuYXJcIjtcclxuZXhwb3J0IHsgbWF0ZXJpYWxzIH07XHJcbmV4cG9ydCBkZWZhdWx0IG1hdGVyaWFscztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9