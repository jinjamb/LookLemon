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

/***/ "../../../dev/materials/src/gradient/gradient.fragment.ts":
/*!****************************************************************!*\
  !*** ../../../dev/materials/src/gradient/gradient.fragment.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gradientPixelShader: () => (/* binding */ gradientPixelShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Shaders/ShadersInclude/imageProcessingCompatibility */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.















var name = "gradientPixelShader";
var shader = "precision highp float;uniform vec4 vEyePosition;uniform vec4 topColor;uniform vec4 bottomColor;uniform float offset;uniform float scale;uniform float smoothness;varying vec3 vPositionW;varying vec3 vPosition;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<helperFunctions>\n#include<__decl__lightFragment>[0]\n#include<__decl__lightFragment>[1]\n#include<__decl__lightFragment>[2]\n#include<__decl__lightFragment>[3]\n#include<lightsFragmentFunctions>\n#include<shadowsFragmentFunctions>\n#include<clipPlaneFragmentDeclaration>\n#ifdef LOGARITHMICDEPTH\n#extension GL_EXT_frag_depth : enable\n#endif\n#include<logDepthDeclaration>\n#include<fogFragmentDeclaration>\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\n#include<clipPlaneFragment>\nvec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);float h=vPosition.y*scale+offset;float mysmoothness=clamp(smoothness,0.01,max(smoothness,10.));vec4 baseColor=mix(bottomColor,topColor,max(pow(max(h,0.0),mysmoothness),0.0));vec3 diffuseColor=baseColor.rgb;float alpha=baseColor.a;\n#ifdef ALPHATEST\nif (baseColor.a<0.4)\ndiscard;\n#endif\n#include<depthPrePass>\n#ifdef VERTEXCOLOR\nbaseColor.rgb*=vColor.rgb;\n#endif\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW);\n#else\nvec3 normalW=vec3(1.0,1.0,1.0);\n#endif\n#ifdef EMISSIVE\nvec3 diffuseBase=baseColor.rgb;\n#else\nvec3 diffuseBase=vec3(0.,0.,0.);\n#endif\nlightingInfo info;float shadow=1.;float glossiness=0.;float aggShadow=0.;float numLights=0.;\n#include<lightFragment>[0..maxSimultaneousLights]\n#if defined(VERTEXALPHA) || defined(INSTANCESCOLOR) && defined(INSTANCES)\nalpha*=vColor.a;\n#endif\nvec3 finalDiffuse=clamp(diffuseBase*diffuseColor,0.0,1.0)*baseColor.rgb;vec4 color=vec4(finalDiffuse,alpha);\n#include<logDepthFragment>\n#include<fogFragment>\ngl_FragColor=color;\n#include<imageProcessingCompatibility>\n#define CUSTOM_FRAGMENT_MAIN_END\n}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var gradientPixelShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/materials/src/gradient/gradient.vertex.ts":
/*!**************************************************************!*\
  !*** ../../../dev/materials/src/gradient/gradient.vertex.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gradientVertexShader: () => (/* binding */ gradientVertexShader)
/* harmony export */ });
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Shaders/ShadersInclude/vertexColorMixing */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
// Do not edit.

















var name = "gradientVertexShader";
var shader = "precision highp float;attribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n#include<bonesDeclaration>\n#include<bakedVertexAnimationDeclaration>\n#include<instancesDeclaration>\nuniform mat4 view;uniform mat4 viewProjection;\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\nvarying vec3 vPositionW;varying vec3 vPosition;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<logDepthDeclaration>\n#include<fogVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#define CUSTOM_VERTEX_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_VERTEX_MAIN_BEGIN\n#include<instancesVertex>\n#include<bonesVertex>\n#include<bakedVertexAnimation>\nvec4 worldPos=finalWorld*vec4(position,1.0);gl_Position=viewProjection*worldPos;vPositionW=vec3(worldPos);vPosition=position;\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#include<clipPlaneVertex>\n#include<logDepthVertex>\n#include<fogVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n#include<vertexColorMixing>\n#if defined(POINTSIZE) && !defined(WEBGPU)\ngl_PointSize=pointSize;\n#endif\n#define CUSTOM_VERTEX_MAIN_END\n}\n";
// Sideeffect
babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
/** @internal */
var gradientVertexShader = { name: name, shader: shader };


/***/ }),

/***/ "../../../dev/materials/src/gradient/gradientMaterial.ts":
/*!***************************************************************!*\
  !*** ../../../dev/materials/src/gradient/gradientMaterial.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GradientMaterial: () => (/* binding */ GradientMaterial)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/materialHelper.functions */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gradient_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gradient.fragment */ "../../../dev/materials/src/gradient/gradient.fragment.ts");
/* harmony import */ var _gradient_vertex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gradient.vertex */ "../../../dev/materials/src/gradient/gradient.vertex.ts");














var GradientMaterialDefines = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(GradientMaterialDefines, _super);
    function GradientMaterialDefines() {
        var _this = _super.call(this) || this;
        _this.EMISSIVE = false;
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
        _this.NORMAL = false;
        _this.UV1 = false;
        _this.UV2 = false;
        _this.VERTEXCOLOR = false;
        _this.VERTEXALPHA = false;
        _this.NUM_BONE_INFLUENCERS = 0;
        _this.BonesPerMesh = 0;
        _this.INSTANCES = false;
        _this.INSTANCESCOLOR = false;
        _this.IMAGEPROCESSINGPOSTPROCESS = false;
        _this.SKIPFINALCOLORCLAMP = false;
        _this.LOGARITHMICDEPTH = false;
        _this.AREALIGHTSUPPORTED = true;
        _this.AREALIGHTNOROUGHTNESS = true;
        _this.rebuild();
        return _this;
    }
    return GradientMaterialDefines;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialDefines));
var GradientMaterial = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(GradientMaterial, _super);
    function GradientMaterial(name, scene) {
        var _this = _super.call(this, name, scene) || this;
        _this._maxSimultaneousLights = 4;
        // The gradient top color, red by default
        _this.topColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(1, 0, 0);
        _this.topColorAlpha = 1.0;
        // The gradient top color, blue by default
        _this.bottomColor = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3(0, 0, 1);
        _this.bottomColorAlpha = 1.0;
        // Gradient offset
        _this.offset = 0;
        _this.scale = 1.0;
        _this.smoothness = 1.0;
        _this._disableLighting = false;
        return _this;
    }
    GradientMaterial.prototype.needAlphaBlending = function () {
        return this.alpha < 1.0 || this.topColorAlpha < 1.0 || this.bottomColorAlpha < 1.0;
    };
    GradientMaterial.prototype.needAlphaTesting = function () {
        return true;
    };
    GradientMaterial.prototype.getAlphaTestTexture = function () {
        return null;
    };
    // Methods
    GradientMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
        var drawWrapper = subMesh._drawWrapper;
        if (this.isFrozen) {
            if (drawWrapper.effect && drawWrapper._wasPreviouslyReady && drawWrapper._wasPreviouslyUsingInstances === useInstances) {
                return true;
            }
        }
        if (!subMesh.materialDefines) {
            subMesh.materialDefines = new GradientMaterialDefines();
        }
        var defines = subMesh.materialDefines;
        var scene = this.getScene();
        if (this._isReadyForSubMesh(subMesh)) {
            return true;
        }
        var engine = scene.getEngine();
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForFrameBoundValues)(scene, engine, this, defines, useInstances ? true : false);
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForMisc)(mesh, scene, this._useLogarithmicDepth, this.pointsCloud, this.fogEnabled, this.needAlphaTestingForMesh(mesh), defines);
        defines._needNormals = (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForLights)(scene, mesh, defines, false, this._maxSimultaneousLights, this._disableLighting);
        defines.EMISSIVE = this._disableLighting;
        // Attribs
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForAttributes)(mesh, defines, false, true);
        // Get correct effect
        if (defines.isDirty) {
            defines.markAsProcessed();
            scene.resetCachedMaterial();
            // Fallbacks
            var fallbacks = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.EffectFallbacks();
            if (defines.FOG) {
                fallbacks.addFallback(1, "FOG");
            }
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.HandleFallbacksForShadows)(defines, fallbacks);
            if (defines.NUM_BONE_INFLUENCERS > 0) {
                fallbacks.addCPUSkinningFallback(0, mesh);
            }
            defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
            //Attributes
            var attribs = [babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind];
            if (defines.NORMAL) {
                attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
            }
            if (defines.UV1) {
                attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind);
            }
            if (defines.UV2) {
                attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind);
            }
            if (defines.VERTEXCOLOR) {
                attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind);
            }
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareAttributesForBones)(attribs, mesh, defines, fallbacks);
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareAttributesForInstances)(attribs, defines);
            // Legacy browser patch
            var shaderName = "gradient";
            var join = defines.toString();
            var uniforms = [
                "world",
                "view",
                "viewProjection",
                "vEyePosition",
                "vLightsType",
                "vFogInfos",
                "vFogColor",
                "pointSize",
                "mBones",
                "logarithmicDepthConstant",
                "topColor",
                "bottomColor",
                "offset",
                "smoothness",
                "scale",
            ];
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.addClipPlaneUniforms)(uniforms);
            var samplers = ["areaLightsLTC1Sampler", "areaLightsLTC2Sampler"];
            var uniformBuffers = [];
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareUniformsAndSamplersList)({
                uniformsNames: uniforms,
                uniformBuffersNames: uniformBuffers,
                samplers: samplers,
                defines: defines,
                maxSimultaneousLights: 4,
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
                indexParameters: { maxSimultaneousLights: 4 },
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
    GradientMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
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
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BindBonesParameters)(mesh, effect);
        if (this._mustRebind(scene, effect, subMesh)) {
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
        if (scene.lightsEnabled && !this.disableLighting) {
            (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BindLights)(scene, mesh, this._activeEffect, defines, this.maxSimultaneousLights);
        }
        // View
        if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Scene.FOGMODE_NONE) {
            this._activeEffect.setMatrix("view", scene.getViewMatrix());
        }
        // Fog
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BindFogParameters)(scene, mesh, this._activeEffect);
        this._activeEffect.setColor4("topColor", this.topColor, this.topColorAlpha);
        this._activeEffect.setColor4("bottomColor", this.bottomColor, this.bottomColorAlpha);
        this._activeEffect.setFloat("offset", this.offset);
        this._activeEffect.setFloat("scale", this.scale);
        this._activeEffect.setFloat("smoothness", this.smoothness);
        this._afterBind(mesh, this._activeEffect, subMesh);
    };
    GradientMaterial.prototype.getAnimatables = function () {
        return [];
    };
    GradientMaterial.prototype.dispose = function (forceDisposeEffect) {
        _super.prototype.dispose.call(this, forceDisposeEffect);
    };
    GradientMaterial.prototype.clone = function (name) {
        var _this = this;
        return babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Clone(function () { return new GradientMaterial(name, _this.getScene()); }, this);
    };
    GradientMaterial.prototype.serialize = function () {
        var serializationObject = _super.prototype.serialize.call(this);
        serializationObject.customType = "BABYLON.GradientMaterial";
        return serializationObject;
    };
    GradientMaterial.prototype.getClassName = function () {
        return "GradientMaterial";
    };
    // Statics
    GradientMaterial.Parse = function (source, scene, rootUrl) {
        return babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new GradientMaterial(source.name, scene); }, source, scene, rootUrl);
    };
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("maxSimultaneousLights")
    ], GradientMaterial.prototype, "_maxSimultaneousLights", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsLightsDirty")
    ], GradientMaterial.prototype, "maxSimultaneousLights", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], GradientMaterial.prototype, "topColor", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], GradientMaterial.prototype, "topColorAlpha", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
    ], GradientMaterial.prototype, "bottomColor", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], GradientMaterial.prototype, "bottomColorAlpha", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], GradientMaterial.prototype, "offset", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], GradientMaterial.prototype, "scale", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
    ], GradientMaterial.prototype, "smoothness", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)("disableLighting")
    ], GradientMaterial.prototype, "_disableLighting", void 0);
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
        (0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsLightsDirty")
    ], GradientMaterial.prototype, "disableLighting", void 0);
    return GradientMaterial;
}(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PushMaterial));

(0,babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.GradientMaterial", GradientMaterial);


/***/ }),

/***/ "../../../dev/materials/src/gradient/index.ts":
/*!****************************************************!*\
  !*** ../../../dev/materials/src/gradient/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GradientMaterial: () => (/* reexport safe */ _gradientMaterial__WEBPACK_IMPORTED_MODULE_0__.GradientMaterial)
/* harmony export */ });
/* harmony import */ var _gradientMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gradientMaterial */ "../../../dev/materials/src/gradient/gradientMaterial.ts");



/***/ }),

/***/ "../../../lts/materials/src/legacy/legacy-gradient.ts":
/*!************************************************************!*\
  !*** ../../../lts/materials/src/legacy/legacy-gradient.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GradientMaterial: () => (/* reexport safe */ materials_gradient_index__WEBPACK_IMPORTED_MODULE_0__.GradientMaterial)
/* harmony export */ });
/* harmony import */ var materials_gradient_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! materials/gradient/index */ "../../../dev/materials/src/gradient/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in materials_gradient_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[key] = materials_gradient_index__WEBPACK_IMPORTED_MODULE_0__[key];
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
/*!*************************!*\
  !*** ./src/gradient.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   materials: () => (/* reexport module object */ _lts_materials_legacy_legacy_gradient__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_materials_legacy_legacy_gradient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/materials/legacy/legacy-gradient */ "../../../lts/materials/src/legacy/legacy-gradient.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_materials_legacy_legacy_gradient__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5ncmFkaWVudE1hdGVyaWFsLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUF3REE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUEwREE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9FQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWVBO0FBQUE7QUEyQkE7QUFDQTtBQTNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBOztBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFtQ0E7QUFDQTtBQWxDQTtBQUlBO0FBRUE7QUFHQTtBQUVBO0FBRUE7QUFHQTtBQUVBO0FBRUE7QUFHQTtBQUdBO0FBR0E7O0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQTVSQTtBQURBO0FBQ0E7QUFFQTtBQURBO0FBQ0E7QUFJQTtBQURBO0FBQ0E7QUFHQTtBQURBO0FBQ0E7QUFJQTtBQURBO0FBQ0E7QUFHQTtBQURBO0FBQ0E7QUFJQTtBQURBO0FBQ0E7QUFHQTtBQURBO0FBQ0E7QUFHQTtBQURBO0FBQ0E7QUFHQTtBQURBO0FBQ0E7QUFFQTtBQURBO0FBQ0E7QUE4UEE7QUFBQTtBQS9SQTtBQWlTQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZXQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUNkQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNoWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTUFURVJJQUxTL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi4vLi4vLi4vZGV2L21hdGVyaWFscy9zcmMvZ3JhZGllbnQvZ3JhZGllbnQuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uL2Rldi9tYXRlcmlhbHMvc3JjL2dyYWRpZW50L2dyYWRpZW50LnZlcnRleC50cyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi4vLi4vLi4vZGV2L21hdGVyaWFscy9zcmMvZ3JhZGllbnQvZ3JhZGllbnRNYXRlcmlhbC50cyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi4vLi4vLi4vZGV2L21hdGVyaWFscy9zcmMvZ3JhZGllbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uL2x0cy9tYXRlcmlhbHMvc3JjL2xlZ2FjeS9sZWdhY3ktZ3JhZGllbnQudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIiwid2VicGFjazovL01BVEVSSUFMUy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi9zcmMvZ3JhZGllbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYmFieWxvbmpzLW1hdGVyaWFsc1wiLCBbXCJiYWJ5bG9uanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmFieWxvbmpzLW1hdGVyaWFsc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiTUFURVJJQUxTXCJdID0gZmFjdG9yeShyb290W1wiQkFCWUxPTlwiXSk7XG59KSgodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMpLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWF0ZXJpYWxzX2VmZmVjdF9fKSA9PiB7XG5yZXR1cm4gIiwiLy8gRG8gbm90IGVkaXQuXG5pbXBvcnQgeyBTaGFkZXJTdG9yZSB9IGZyb20gXCJjb3JlL0VuZ2luZXMvc2hhZGVyU3RvcmVcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9oZWxwZXJGdW5jdGlvbnNcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9saWdodEZyYWdtZW50RGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9saWdodFVib0RlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbGlnaHRzRnJhZ21lbnRGdW5jdGlvbnNcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9zaGFkb3dzRnJhZ21lbnRGdW5jdGlvbnNcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9jbGlwUGxhbmVGcmFnbWVudERlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbG9nRGVwdGhEZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2ZvZ0ZyYWdtZW50RGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9jbGlwUGxhbmVGcmFnbWVudFwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2RlcHRoUHJlUGFzc1wiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2xpZ2h0RnJhZ21lbnRcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9sb2dEZXB0aEZyYWdtZW50XCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvZm9nRnJhZ21lbnRcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9pbWFnZVByb2Nlc3NpbmdDb21wYXRpYmlsaXR5XCI7XG5cbmNvbnN0IG5hbWUgPSBcImdyYWRpZW50UGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7dW5pZm9ybSB2ZWM0IHZFeWVQb3NpdGlvbjt1bmlmb3JtIHZlYzQgdG9wQ29sb3I7dW5pZm9ybSB2ZWM0IGJvdHRvbUNvbG9yO3VuaWZvcm0gZmxvYXQgb2Zmc2V0O3VuaWZvcm0gZmxvYXQgc2NhbGU7dW5pZm9ybSBmbG9hdCBzbW9vdGhuZXNzO3ZhcnlpbmcgdmVjMyB2UG9zaXRpb25XO3ZhcnlpbmcgdmVjMyB2UG9zaXRpb247XG4jaWZkZWYgTk9STUFMXG52YXJ5aW5nIHZlYzMgdk5vcm1hbFc7XG4jZW5kaWZcbiNpZmRlZiBWRVJURVhDT0xPUlxudmFyeWluZyB2ZWM0IHZDb2xvcjtcbiNlbmRpZlxuI2luY2x1ZGU8aGVscGVyRnVuY3Rpb25zPlxuI2luY2x1ZGU8X19kZWNsX19saWdodEZyYWdtZW50PlswXVxuI2luY2x1ZGU8X19kZWNsX19saWdodEZyYWdtZW50PlsxXVxuI2luY2x1ZGU8X19kZWNsX19saWdodEZyYWdtZW50PlsyXVxuI2luY2x1ZGU8X19kZWNsX19saWdodEZyYWdtZW50PlszXVxuI2luY2x1ZGU8bGlnaHRzRnJhZ21lbnRGdW5jdGlvbnM+XG4jaW5jbHVkZTxzaGFkb3dzRnJhZ21lbnRGdW5jdGlvbnM+XG4jaW5jbHVkZTxjbGlwUGxhbmVGcmFnbWVudERlY2xhcmF0aW9uPlxuI2lmZGVmIExPR0FSSVRITUlDREVQVEhcbiNleHRlbnNpb24gR0xfRVhUX2ZyYWdfZGVwdGggOiBlbmFibGVcbiNlbmRpZlxuI2luY2x1ZGU8bG9nRGVwdGhEZWNsYXJhdGlvbj5cbiNpbmNsdWRlPGZvZ0ZyYWdtZW50RGVjbGFyYXRpb24+XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9ERUZJTklUSU9OU1xudm9pZCBtYWluKHZvaWQpIHtcbiNkZWZpbmUgQ1VTVE9NX0ZSQUdNRU5UX01BSU5fQkVHSU5cbiNpbmNsdWRlPGNsaXBQbGFuZUZyYWdtZW50PlxudmVjMyB2aWV3RGlyZWN0aW9uVz1ub3JtYWxpemUodkV5ZVBvc2l0aW9uLnh5ei12UG9zaXRpb25XKTtmbG9hdCBoPXZQb3NpdGlvbi55KnNjYWxlK29mZnNldDtmbG9hdCBteXNtb290aG5lc3M9Y2xhbXAoc21vb3RobmVzcywwLjAxLG1heChzbW9vdGhuZXNzLDEwLikpO3ZlYzQgYmFzZUNvbG9yPW1peChib3R0b21Db2xvcix0b3BDb2xvcixtYXgocG93KG1heChoLDAuMCksbXlzbW9vdGhuZXNzKSwwLjApKTt2ZWMzIGRpZmZ1c2VDb2xvcj1iYXNlQ29sb3IucmdiO2Zsb2F0IGFscGhhPWJhc2VDb2xvci5hO1xuI2lmZGVmIEFMUEhBVEVTVFxuaWYgKGJhc2VDb2xvci5hPDAuNClcbmRpc2NhcmQ7XG4jZW5kaWZcbiNpbmNsdWRlPGRlcHRoUHJlUGFzcz5cbiNpZmRlZiBWRVJURVhDT0xPUlxuYmFzZUNvbG9yLnJnYio9dkNvbG9yLnJnYjtcbiNlbmRpZlxuI2lmZGVmIE5PUk1BTFxudmVjMyBub3JtYWxXPW5vcm1hbGl6ZSh2Tm9ybWFsVyk7XG4jZWxzZVxudmVjMyBub3JtYWxXPXZlYzMoMS4wLDEuMCwxLjApO1xuI2VuZGlmXG4jaWZkZWYgRU1JU1NJVkVcbnZlYzMgZGlmZnVzZUJhc2U9YmFzZUNvbG9yLnJnYjtcbiNlbHNlXG52ZWMzIGRpZmZ1c2VCYXNlPXZlYzMoMC4sMC4sMC4pO1xuI2VuZGlmXG5saWdodGluZ0luZm8gaW5mbztmbG9hdCBzaGFkb3c9MS47ZmxvYXQgZ2xvc3NpbmVzcz0wLjtmbG9hdCBhZ2dTaGFkb3c9MC47ZmxvYXQgbnVtTGlnaHRzPTAuO1xuI2luY2x1ZGU8bGlnaHRGcmFnbWVudD5bMC4ubWF4U2ltdWx0YW5lb3VzTGlnaHRzXVxuI2lmIGRlZmluZWQoVkVSVEVYQUxQSEEpIHx8IGRlZmluZWQoSU5TVEFOQ0VTQ09MT1IpICYmIGRlZmluZWQoSU5TVEFOQ0VTKVxuYWxwaGEqPXZDb2xvci5hO1xuI2VuZGlmXG52ZWMzIGZpbmFsRGlmZnVzZT1jbGFtcChkaWZmdXNlQmFzZSpkaWZmdXNlQ29sb3IsMC4wLDEuMCkqYmFzZUNvbG9yLnJnYjt2ZWM0IGNvbG9yPXZlYzQoZmluYWxEaWZmdXNlLGFscGhhKTtcbiNpbmNsdWRlPGxvZ0RlcHRoRnJhZ21lbnQ+XG4jaW5jbHVkZTxmb2dGcmFnbWVudD5cbmdsX0ZyYWdDb2xvcj1jb2xvcjtcbiNpbmNsdWRlPGltYWdlUHJvY2Vzc2luZ0NvbXBhdGliaWxpdHk+XG4jZGVmaW5lIENVU1RPTV9GUkFHTUVOVF9NQUlOX0VORFxufVxuYDtcbi8vIFNpZGVlZmZlY3RcblNoYWRlclN0b3JlLlNoYWRlcnNTdG9yZVtuYW1lXSA9IHNoYWRlcjtcbi8qKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBjb25zdCBncmFkaWVudFBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvYm9uZXNEZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2Jha2VkVmVydGV4QW5pbWF0aW9uRGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9pbnN0YW5jZXNEZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2NsaXBQbGFuZVZlcnRleERlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbG9nRGVwdGhEZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2ZvZ1ZlcnRleERlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbGlnaHRGcmFnbWVudERlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvbGlnaHRVYm9EZWNsYXJhdGlvblwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2luc3RhbmNlc1ZlcnRleFwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2JvbmVzVmVydGV4XCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvYmFrZWRWZXJ0ZXhBbmltYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9jbGlwUGxhbmVWZXJ0ZXhcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9sb2dEZXB0aFZlcnRleFwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2ZvZ1ZlcnRleFwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL3NoYWRvd3NWZXJ0ZXhcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS92ZXJ0ZXhDb2xvck1peGluZ1wiO1xuXG5jb25zdCBuYW1lID0gXCJncmFkaWVudFZlcnRleFNoYWRlclwiO1xuY29uc3Qgc2hhZGVyID0gYHByZWNpc2lvbiBoaWdocCBmbG9hdDthdHRyaWJ1dGUgdmVjMyBwb3NpdGlvbjtcbiNpZmRlZiBOT1JNQUxcbmF0dHJpYnV0ZSB2ZWMzIG5vcm1hbDtcbiNlbmRpZlxuI2lmZGVmIFVWMVxuYXR0cmlidXRlIHZlYzIgdXY7XG4jZW5kaWZcbiNpZmRlZiBVVjJcbmF0dHJpYnV0ZSB2ZWMyIHV2MjtcbiNlbmRpZlxuI2lmZGVmIFZFUlRFWENPTE9SXG5hdHRyaWJ1dGUgdmVjNCBjb2xvcjtcbiNlbmRpZlxuI2luY2x1ZGU8Ym9uZXNEZWNsYXJhdGlvbj5cbiNpbmNsdWRlPGJha2VkVmVydGV4QW5pbWF0aW9uRGVjbGFyYXRpb24+XG4jaW5jbHVkZTxpbnN0YW5jZXNEZWNsYXJhdGlvbj5cbnVuaWZvcm0gbWF0NCB2aWV3O3VuaWZvcm0gbWF0NCB2aWV3UHJvamVjdGlvbjtcbiNpZmRlZiBQT0lOVFNJWkVcbnVuaWZvcm0gZmxvYXQgcG9pbnRTaXplO1xuI2VuZGlmXG52YXJ5aW5nIHZlYzMgdlBvc2l0aW9uVzt2YXJ5aW5nIHZlYzMgdlBvc2l0aW9uO1xuI2lmZGVmIE5PUk1BTFxudmFyeWluZyB2ZWMzIHZOb3JtYWxXO1xuI2VuZGlmXG4jaWZkZWYgVkVSVEVYQ09MT1JcbnZhcnlpbmcgdmVjNCB2Q29sb3I7XG4jZW5kaWZcbiNpbmNsdWRlPGNsaXBQbGFuZVZlcnRleERlY2xhcmF0aW9uPlxuI2luY2x1ZGU8bG9nRGVwdGhEZWNsYXJhdGlvbj5cbiNpbmNsdWRlPGZvZ1ZlcnRleERlY2xhcmF0aW9uPlxuI2luY2x1ZGU8X19kZWNsX19saWdodEZyYWdtZW50PlswLi5tYXhTaW11bHRhbmVvdXNMaWdodHNdXG4jZGVmaW5lIENVU1RPTV9WRVJURVhfREVGSU5JVElPTlNcbnZvaWQgbWFpbih2b2lkKSB7XG4jZGVmaW5lIENVU1RPTV9WRVJURVhfTUFJTl9CRUdJTlxuI2luY2x1ZGU8aW5zdGFuY2VzVmVydGV4PlxuI2luY2x1ZGU8Ym9uZXNWZXJ0ZXg+XG4jaW5jbHVkZTxiYWtlZFZlcnRleEFuaW1hdGlvbj5cbnZlYzQgd29ybGRQb3M9ZmluYWxXb3JsZCp2ZWM0KHBvc2l0aW9uLDEuMCk7Z2xfUG9zaXRpb249dmlld1Byb2plY3Rpb24qd29ybGRQb3M7dlBvc2l0aW9uVz12ZWMzKHdvcmxkUG9zKTt2UG9zaXRpb249cG9zaXRpb247XG4jaWZkZWYgTk9STUFMXG52Tm9ybWFsVz1ub3JtYWxpemUodmVjMyhmaW5hbFdvcmxkKnZlYzQobm9ybWFsLDAuMCkpKTtcbiNlbmRpZlxuI2lmbmRlZiBVVjFcbnZlYzIgdXY9dmVjMigwLiwwLik7XG4jZW5kaWZcbiNpZm5kZWYgVVYyXG52ZWMyIHV2Mj12ZWMyKDAuLDAuKTtcbiNlbmRpZlxuI2luY2x1ZGU8Y2xpcFBsYW5lVmVydGV4PlxuI2luY2x1ZGU8bG9nRGVwdGhWZXJ0ZXg+XG4jaW5jbHVkZTxmb2dWZXJ0ZXg+XG4jaW5jbHVkZTxzaGFkb3dzVmVydGV4PlswLi5tYXhTaW11bHRhbmVvdXNMaWdodHNdXG4jaW5jbHVkZTx2ZXJ0ZXhDb2xvck1peGluZz5cbiNpZiBkZWZpbmVkKFBPSU5UU0laRSkgJiYgIWRlZmluZWQoV0VCR1BVKVxuZ2xfUG9pbnRTaXplPXBvaW50U2l6ZTtcbiNlbmRpZlxuI2RlZmluZSBDVVNUT01fVkVSVEVYX01BSU5fRU5EXG59XG5gO1xuLy8gU2lkZWVmZmVjdFxuU2hhZGVyU3RvcmUuU2hhZGVyc1N0b3JlW25hbWVdID0gc2hhZGVyO1xuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGNvbnN0IGdyYWRpZW50VmVydGV4U2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xyXG5pbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgc2VyaWFsaXplLCBleHBhbmRUb1Byb3BlcnR5LCBzZXJpYWxpemVBc0NvbG9yMyB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQgeyBTZXJpYWxpemF0aW9uSGVscGVyIH0gZnJvbSBcImNvcmUvTWlzYy9kZWNvcmF0b3JzLnNlcmlhbGl6YXRpb25cIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRyaXggfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgSUFuaW1hdGFibGUgfSBmcm9tIFwiY29yZS9BbmltYXRpb25zL2FuaW1hdGFibGUuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxEZWZpbmVzIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsRGVmaW5lc1wiO1xyXG5pbXBvcnQgdHlwZSB7IElFZmZlY3RDcmVhdGlvbk9wdGlvbnMgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvZWZmZWN0XCI7XHJcbmltcG9ydCB7IFB1c2hNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9wdXNoTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgVmVydGV4QnVmZmVyIH0gZnJvbSBcImNvcmUvQnVmZmVycy9idWZmZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBBYnN0cmFjdE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvYWJzdHJhY3RNZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgU3ViTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9zdWJNZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9tZXNoXCI7XHJcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcblxyXG5pbXBvcnQgXCIuL2dyYWRpZW50LmZyYWdtZW50XCI7XHJcbmltcG9ydCBcIi4vZ3JhZGllbnQudmVydGV4XCI7XHJcbmltcG9ydCB7IEVmZmVjdEZhbGxiYWNrcyB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9lZmZlY3RGYWxsYmFja3NcIjtcclxuaW1wb3J0IHsgYWRkQ2xpcFBsYW5lVW5pZm9ybXMsIGJpbmRDbGlwUGxhbmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvY2xpcFBsYW5lTWF0ZXJpYWxIZWxwZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIEJpbmRCb25lc1BhcmFtZXRlcnMsXHJcbiAgICBCaW5kRm9nUGFyYW1ldGVycyxcclxuICAgIEJpbmRMaWdodHMsXHJcbiAgICBCaW5kTG9nRGVwdGgsXHJcbiAgICBIYW5kbGVGYWxsYmFja3NGb3JTaGFkb3dzLFxyXG4gICAgUHJlcGFyZUF0dHJpYnV0ZXNGb3JCb25lcyxcclxuICAgIFByZXBhcmVBdHRyaWJ1dGVzRm9ySW5zdGFuY2VzLFxyXG4gICAgUHJlcGFyZURlZmluZXNGb3JBdHRyaWJ1dGVzLFxyXG4gICAgUHJlcGFyZURlZmluZXNGb3JGcmFtZUJvdW5kVmFsdWVzLFxyXG4gICAgUHJlcGFyZURlZmluZXNGb3JMaWdodHMsXHJcbiAgICBQcmVwYXJlRGVmaW5lc0Zvck1pc2MsXHJcbiAgICBQcmVwYXJlVW5pZm9ybXNBbmRTYW1wbGVyc0xpc3QsXHJcbn0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL21hdGVyaWFsSGVscGVyLmZ1bmN0aW9uc1wiO1xyXG5cclxuY2xhc3MgR3JhZGllbnRNYXRlcmlhbERlZmluZXMgZXh0ZW5kcyBNYXRlcmlhbERlZmluZXMge1xyXG4gICAgcHVibGljIEVNSVNTSVZFID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQ0xJUFBMQU5FID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQ0xJUFBMQU5FMiA9IGZhbHNlO1xyXG4gICAgcHVibGljIENMSVBQTEFORTMgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBDTElQUExBTkU0ID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQ0xJUFBMQU5FNSA9IGZhbHNlO1xyXG4gICAgcHVibGljIENMSVBQTEFORTYgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBBTFBIQVRFU1QgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBERVBUSFBSRVBBU1MgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBQT0lOVFNJWkUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBGT0cgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBOT1JNQUwgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBVVjEgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBVVjIgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBWRVJURVhDT0xPUiA9IGZhbHNlO1xyXG4gICAgcHVibGljIFZFUlRFWEFMUEhBID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgTlVNX0JPTkVfSU5GTFVFTkNFUlMgPSAwO1xyXG4gICAgcHVibGljIEJvbmVzUGVyTWVzaCA9IDA7XHJcbiAgICBwdWJsaWMgSU5TVEFOQ0VTID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgSU5TVEFOQ0VTQ09MT1IgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBJTUFHRVBST0NFU1NJTkdQT1NUUFJPQ0VTUyA9IGZhbHNlO1xyXG4gICAgcHVibGljIFNLSVBGSU5BTENPTE9SQ0xBTVAgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBMT0dBUklUSE1JQ0RFUFRIID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQVJFQUxJR0hUU1VQUE9SVEVEID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBBUkVBTElHSFROT1JPVUdIVE5FU1MgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5yZWJ1aWxkKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHcmFkaWVudE1hdGVyaWFsIGV4dGVuZHMgUHVzaE1hdGVyaWFsIHtcclxuICAgIEBzZXJpYWxpemUoXCJtYXhTaW11bHRhbmVvdXNMaWdodHNcIilcclxuICAgIHByaXZhdGUgX21heFNpbXVsdGFuZW91c0xpZ2h0cyA9IDQ7XHJcbiAgICBAZXhwYW5kVG9Qcm9wZXJ0eShcIl9tYXJrQWxsU3ViTWVzaGVzQXNMaWdodHNEaXJ0eVwiKVxyXG4gICAgcHVibGljIG1heFNpbXVsdGFuZW91c0xpZ2h0czogbnVtYmVyO1xyXG5cclxuICAgIC8vIFRoZSBncmFkaWVudCB0b3AgY29sb3IsIHJlZCBieSBkZWZhdWx0XHJcbiAgICBAc2VyaWFsaXplQXNDb2xvcjMoKVxyXG4gICAgcHVibGljIHRvcENvbG9yID0gbmV3IENvbG9yMygxLCAwLCAwKTtcclxuXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyB0b3BDb2xvckFscGhhID0gMS4wO1xyXG5cclxuICAgIC8vIFRoZSBncmFkaWVudCB0b3AgY29sb3IsIGJsdWUgYnkgZGVmYXVsdFxyXG4gICAgQHNlcmlhbGl6ZUFzQ29sb3IzKClcclxuICAgIHB1YmxpYyBib3R0b21Db2xvciA9IG5ldyBDb2xvcjMoMCwgMCwgMSk7XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgYm90dG9tQ29sb3JBbHBoYSA9IDEuMDtcclxuXHJcbiAgICAvLyBHcmFkaWVudCBvZmZzZXRcclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIG9mZnNldCA9IDA7XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgc2NhbGUgPSAxLjA7XHJcblxyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgc21vb3RobmVzcyA9IDEuMDtcclxuXHJcbiAgICBAc2VyaWFsaXplKFwiZGlzYWJsZUxpZ2h0aW5nXCIpXHJcbiAgICBwcml2YXRlIF9kaXNhYmxlTGlnaHRpbmcgPSBmYWxzZTtcclxuICAgIEBleHBhbmRUb1Byb3BlcnR5KFwiX21hcmtBbGxTdWJNZXNoZXNBc0xpZ2h0c0RpcnR5XCIpXHJcbiAgICBwdWJsaWMgZGlzYWJsZUxpZ2h0aW5nOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2NlbmU/OiBTY2VuZSkge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgbmVlZEFscGhhQmxlbmRpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxwaGEgPCAxLjAgfHwgdGhpcy50b3BDb2xvckFscGhhIDwgMS4wIHx8IHRoaXMuYm90dG9tQ29sb3JBbHBoYSA8IDEuMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgbmVlZEFscGhhVGVzdGluZygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgZ2V0QWxwaGFUZXN0VGV4dHVyZSgpOiBOdWxsYWJsZTxCYXNlVGV4dHVyZT4ge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1ldGhvZHNcclxuICAgIHB1YmxpYyBvdmVycmlkZSBpc1JlYWR5Rm9yU3ViTWVzaChtZXNoOiBBYnN0cmFjdE1lc2gsIHN1Yk1lc2g6IFN1Yk1lc2gsIHVzZUluc3RhbmNlcz86IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBkcmF3V3JhcHBlciA9IHN1Yk1lc2guX2RyYXdXcmFwcGVyO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0Zyb3plbikge1xyXG4gICAgICAgICAgICBpZiAoZHJhd1dyYXBwZXIuZWZmZWN0ICYmIGRyYXdXcmFwcGVyLl93YXNQcmV2aW91c2x5UmVhZHkgJiYgZHJhd1dyYXBwZXIuX3dhc1ByZXZpb3VzbHlVc2luZ0luc3RhbmNlcyA9PT0gdXNlSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzdWJNZXNoLm1hdGVyaWFsRGVmaW5lcykge1xyXG4gICAgICAgICAgICBzdWJNZXNoLm1hdGVyaWFsRGVmaW5lcyA9IG5ldyBHcmFkaWVudE1hdGVyaWFsRGVmaW5lcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGVmaW5lcyA9IDxHcmFkaWVudE1hdGVyaWFsRGVmaW5lcz5zdWJNZXNoLm1hdGVyaWFsRGVmaW5lcztcclxuICAgICAgICBjb25zdCBzY2VuZSA9IHRoaXMuZ2V0U2NlbmUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVhZHlGb3JTdWJNZXNoKHN1Yk1lc2gpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZW5naW5lID0gc2NlbmUuZ2V0RW5naW5lKCk7XHJcblxyXG4gICAgICAgIFByZXBhcmVEZWZpbmVzRm9yRnJhbWVCb3VuZFZhbHVlcyhzY2VuZSwgZW5naW5lLCB0aGlzLCBkZWZpbmVzLCB1c2VJbnN0YW5jZXMgPyB0cnVlIDogZmFsc2UpO1xyXG5cclxuICAgICAgICBQcmVwYXJlRGVmaW5lc0Zvck1pc2MobWVzaCwgc2NlbmUsIHRoaXMuX3VzZUxvZ2FyaXRobWljRGVwdGgsIHRoaXMucG9pbnRzQ2xvdWQsIHRoaXMuZm9nRW5hYmxlZCwgdGhpcy5uZWVkQWxwaGFUZXN0aW5nRm9yTWVzaChtZXNoKSwgZGVmaW5lcyk7XHJcblxyXG4gICAgICAgIGRlZmluZXMuX25lZWROb3JtYWxzID0gUHJlcGFyZURlZmluZXNGb3JMaWdodHMoc2NlbmUsIG1lc2gsIGRlZmluZXMsIGZhbHNlLCB0aGlzLl9tYXhTaW11bHRhbmVvdXNMaWdodHMsIHRoaXMuX2Rpc2FibGVMaWdodGluZyk7XHJcblxyXG4gICAgICAgIGRlZmluZXMuRU1JU1NJVkUgPSB0aGlzLl9kaXNhYmxlTGlnaHRpbmc7XHJcblxyXG4gICAgICAgIC8vIEF0dHJpYnNcclxuICAgICAgICBQcmVwYXJlRGVmaW5lc0ZvckF0dHJpYnV0ZXMobWVzaCwgZGVmaW5lcywgZmFsc2UsIHRydWUpO1xyXG5cclxuICAgICAgICAvLyBHZXQgY29ycmVjdCBlZmZlY3RcclxuICAgICAgICBpZiAoZGVmaW5lcy5pc0RpcnR5KSB7XHJcbiAgICAgICAgICAgIGRlZmluZXMubWFya0FzUHJvY2Vzc2VkKCk7XHJcblxyXG4gICAgICAgICAgICBzY2VuZS5yZXNldENhY2hlZE1hdGVyaWFsKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBGYWxsYmFja3NcclxuICAgICAgICAgICAgY29uc3QgZmFsbGJhY2tzID0gbmV3IEVmZmVjdEZhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBpZiAoZGVmaW5lcy5GT0cpIHtcclxuICAgICAgICAgICAgICAgIGZhbGxiYWNrcy5hZGRGYWxsYmFjaygxLCBcIkZPR1wiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgSGFuZGxlRmFsbGJhY2tzRm9yU2hhZG93cyhkZWZpbmVzLCBmYWxsYmFja3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRlZmluZXMuTlVNX0JPTkVfSU5GTFVFTkNFUlMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmYWxsYmFja3MuYWRkQ1BVU2tpbm5pbmdGYWxsYmFjaygwLCBtZXNoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGVmaW5lcy5JTUFHRVBST0NFU1NJTkdQT1NUUFJPQ0VTUyA9IHNjZW5lLmltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24uYXBwbHlCeVBvc3RQcm9jZXNzO1xyXG5cclxuICAgICAgICAgICAgLy9BdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnMgPSBbVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZF07XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmaW5lcy5OT1JNQUwpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnMucHVzaChWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLlVWMSkge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlicy5wdXNoKFZlcnRleEJ1ZmZlci5VVktpbmQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmaW5lcy5VVjIpIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnMucHVzaChWZXJ0ZXhCdWZmZXIuVVYyS2luZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLlZFUlRFWENPTE9SKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJzLnB1c2goVmVydGV4QnVmZmVyLkNvbG9yS2luZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFByZXBhcmVBdHRyaWJ1dGVzRm9yQm9uZXMoYXR0cmlicywgbWVzaCwgZGVmaW5lcywgZmFsbGJhY2tzKTtcclxuICAgICAgICAgICAgUHJlcGFyZUF0dHJpYnV0ZXNGb3JJbnN0YW5jZXMoYXR0cmlicywgZGVmaW5lcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZWdhY3kgYnJvd3NlciBwYXRjaFxyXG4gICAgICAgICAgICBjb25zdCBzaGFkZXJOYW1lID0gXCJncmFkaWVudFwiO1xyXG4gICAgICAgICAgICBjb25zdCBqb2luID0gZGVmaW5lcy50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdW5pZm9ybXMgPSBbXHJcbiAgICAgICAgICAgICAgICBcIndvcmxkXCIsXHJcbiAgICAgICAgICAgICAgICBcInZpZXdcIixcclxuICAgICAgICAgICAgICAgIFwidmlld1Byb2plY3Rpb25cIixcclxuICAgICAgICAgICAgICAgIFwidkV5ZVBvc2l0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcInZMaWdodHNUeXBlXCIsXHJcbiAgICAgICAgICAgICAgICBcInZGb2dJbmZvc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ2Rm9nQ29sb3JcIixcclxuICAgICAgICAgICAgICAgIFwicG9pbnRTaXplXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1Cb25lc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2dhcml0aG1pY0RlcHRoQ29uc3RhbnRcIixcclxuICAgICAgICAgICAgICAgIFwidG9wQ29sb3JcIixcclxuICAgICAgICAgICAgICAgIFwiYm90dG9tQ29sb3JcIixcclxuICAgICAgICAgICAgICAgIFwib2Zmc2V0XCIsXHJcbiAgICAgICAgICAgICAgICBcInNtb290aG5lc3NcIixcclxuICAgICAgICAgICAgICAgIFwic2NhbGVcIixcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgYWRkQ2xpcFBsYW5lVW5pZm9ybXModW5pZm9ybXMpO1xyXG4gICAgICAgICAgICBjb25zdCBzYW1wbGVyczogc3RyaW5nW10gPSBbXCJhcmVhTGlnaHRzTFRDMVNhbXBsZXJcIiwgXCJhcmVhTGlnaHRzTFRDMlNhbXBsZXJcIl07XHJcbiAgICAgICAgICAgIGNvbnN0IHVuaWZvcm1CdWZmZXJzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgUHJlcGFyZVVuaWZvcm1zQW5kU2FtcGxlcnNMaXN0KDxJRWZmZWN0Q3JlYXRpb25PcHRpb25zPntcclxuICAgICAgICAgICAgICAgIHVuaWZvcm1zTmFtZXM6IHVuaWZvcm1zLFxyXG4gICAgICAgICAgICAgICAgdW5pZm9ybUJ1ZmZlcnNOYW1lczogdW5pZm9ybUJ1ZmZlcnMsXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVyczogc2FtcGxlcnMsXHJcbiAgICAgICAgICAgICAgICBkZWZpbmVzOiBkZWZpbmVzLFxyXG4gICAgICAgICAgICAgICAgbWF4U2ltdWx0YW5lb3VzTGlnaHRzOiA0LFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHN1Yk1lc2guc2V0RWZmZWN0KFxyXG4gICAgICAgICAgICAgICAgc2NlbmUuZ2V0RW5naW5lKCkuY3JlYXRlRWZmZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgIHNoYWRlck5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgPElFZmZlY3RDcmVhdGlvbk9wdGlvbnM+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmlmb3Jtc05hbWVzOiB1bmlmb3JtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pZm9ybUJ1ZmZlcnNOYW1lczogdW5pZm9ybUJ1ZmZlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZXJzOiBzYW1wbGVycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lczogam9pbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2tzOiBmYWxsYmFja3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGlsZWQ6IHRoaXMub25Db21waWxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvcjogdGhpcy5vbkVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFBhcmFtZXRlcnM6IHsgbWF4U2ltdWx0YW5lb3VzTGlnaHRzOiA0IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmdpbmVcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICBkZWZpbmVzLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxDb250ZXh0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBBcmVhIExpZ2h0cyBoYXZlIExUQyB0ZXh0dXJlLlxyXG4gICAgICAgIGlmIChkZWZpbmVzW1wiQVJFQUxJR0hUVVNFRFwiXSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbWVzaC5saWdodFNvdXJjZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1lc2gubGlnaHRTb3VyY2VzW2luZGV4XS5faXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXN1Yk1lc2guZWZmZWN0IHx8ICFzdWJNZXNoLmVmZmVjdC5pc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVmaW5lcy5fcmVuZGVySWQgPSBzY2VuZS5nZXRSZW5kZXJJZCgpO1xyXG4gICAgICAgIGRyYXdXcmFwcGVyLl93YXNQcmV2aW91c2x5UmVhZHkgPSB0cnVlO1xyXG4gICAgICAgIGRyYXdXcmFwcGVyLl93YXNQcmV2aW91c2x5VXNpbmdJbnN0YW5jZXMgPSAhIXVzZUluc3RhbmNlcztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGJpbmRGb3JTdWJNZXNoKHdvcmxkOiBNYXRyaXgsIG1lc2g6IE1lc2gsIHN1Yk1lc2g6IFN1Yk1lc2gpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzY2VuZSA9IHRoaXMuZ2V0U2NlbmUoKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVmaW5lcyA9IDxHcmFkaWVudE1hdGVyaWFsRGVmaW5lcz5zdWJNZXNoLm1hdGVyaWFsRGVmaW5lcztcclxuICAgICAgICBpZiAoIWRlZmluZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZWZmZWN0ID0gc3ViTWVzaC5lZmZlY3Q7XHJcbiAgICAgICAgaWYgKCFlZmZlY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0ID0gZWZmZWN0O1xyXG5cclxuICAgICAgICAvLyBNYXRyaWNlc1xyXG4gICAgICAgIHRoaXMuYmluZE9ubHlXb3JsZE1hdHJpeCh3b3JsZCk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldE1hdHJpeChcInZpZXdQcm9qZWN0aW9uXCIsIHNjZW5lLmdldFRyYW5zZm9ybU1hdHJpeCgpKTtcclxuXHJcbiAgICAgICAgLy8gQm9uZXNcclxuICAgICAgICBCaW5kQm9uZXNQYXJhbWV0ZXJzKG1lc2gsIGVmZmVjdCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tdXN0UmViaW5kKHNjZW5lLCBlZmZlY3QsIHN1Yk1lc2gpKSB7XHJcbiAgICAgICAgICAgIC8vIENsaXAgcGxhbmVcclxuICAgICAgICAgICAgYmluZENsaXBQbGFuZShlZmZlY3QsIHRoaXMsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBvaW50IHNpemVcclxuICAgICAgICAgICAgaWYgKHRoaXMucG9pbnRzQ2xvdWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRGbG9hdChcInBvaW50U2l6ZVwiLCB0aGlzLnBvaW50U2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvZy4gZGVwdGhcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZUxvZ2FyaXRobWljRGVwdGgpIHtcclxuICAgICAgICAgICAgICAgIEJpbmRMb2dEZXB0aChkZWZpbmVzLCBlZmZlY3QsIHNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2NlbmUuYmluZEV5ZVBvc2l0aW9uKGVmZmVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2NlbmUubGlnaHRzRW5hYmxlZCAmJiAhdGhpcy5kaXNhYmxlTGlnaHRpbmcpIHtcclxuICAgICAgICAgICAgQmluZExpZ2h0cyhzY2VuZSwgbWVzaCwgdGhpcy5fYWN0aXZlRWZmZWN0LCBkZWZpbmVzLCB0aGlzLm1heFNpbXVsdGFuZW91c0xpZ2h0cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBWaWV3XHJcbiAgICAgICAgaWYgKHNjZW5lLmZvZ0VuYWJsZWQgJiYgbWVzaC5hcHBseUZvZyAmJiBzY2VuZS5mb2dNb2RlICE9PSBTY2VuZS5GT0dNT0RFX05PTkUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldE1hdHJpeChcInZpZXdcIiwgc2NlbmUuZ2V0Vmlld01hdHJpeCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZvZ1xyXG4gICAgICAgIEJpbmRGb2dQYXJhbWV0ZXJzKHNjZW5lLCBtZXNoLCB0aGlzLl9hY3RpdmVFZmZlY3QpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0Q29sb3I0KFwidG9wQ29sb3JcIiwgdGhpcy50b3BDb2xvciwgdGhpcy50b3BDb2xvckFscGhhKTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0Q29sb3I0KFwiYm90dG9tQ29sb3JcIiwgdGhpcy5ib3R0b21Db2xvciwgdGhpcy5ib3R0b21Db2xvckFscGhhKTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0RmxvYXQoXCJvZmZzZXRcIiwgdGhpcy5vZmZzZXQpO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRGbG9hdChcInNjYWxlXCIsIHRoaXMuc2NhbGUpO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRGbG9hdChcInNtb290aG5lc3NcIiwgdGhpcy5zbW9vdGhuZXNzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWZ0ZXJCaW5kKG1lc2gsIHRoaXMuX2FjdGl2ZUVmZmVjdCwgc3ViTWVzaCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGdldEFuaW1hdGFibGVzKCk6IElBbmltYXRhYmxlW10ge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgZGlzcG9zZShmb3JjZURpc3Bvc2VFZmZlY3Q/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZGlzcG9zZShmb3JjZURpc3Bvc2VFZmZlY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBjbG9uZShuYW1lOiBzdHJpbmcpOiBHcmFkaWVudE1hdGVyaWFsIHtcclxuICAgICAgICByZXR1cm4gU2VyaWFsaXphdGlvbkhlbHBlci5DbG9uZSgoKSA9PiBuZXcgR3JhZGllbnRNYXRlcmlhbChuYW1lLCB0aGlzLmdldFNjZW5lKCkpLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgc2VyaWFsaXplKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXphdGlvbk9iamVjdCA9IHN1cGVyLnNlcmlhbGl6ZSgpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5HcmFkaWVudE1hdGVyaWFsXCI7XHJcbiAgICAgICAgcmV0dXJuIHNlcmlhbGl6YXRpb25PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkdyYWRpZW50TWF0ZXJpYWxcIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdGF0aWNzXHJcbiAgICBwdWJsaWMgc3RhdGljIG92ZXJyaWRlIFBhcnNlKHNvdXJjZTogYW55LCBzY2VuZTogU2NlbmUsIHJvb3RVcmw6IHN0cmluZyk6IEdyYWRpZW50TWF0ZXJpYWwge1xyXG4gICAgICAgIHJldHVybiBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKCgpID0+IG5ldyBHcmFkaWVudE1hdGVyaWFsKHNvdXJjZS5uYW1lLCBzY2VuZSksIHNvdXJjZSwgc2NlbmUsIHJvb3RVcmwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWdpc3RlckNsYXNzKFwiQkFCWUxPTi5HcmFkaWVudE1hdGVyaWFsXCIsIEdyYWRpZW50TWF0ZXJpYWwpO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9ncmFkaWVudE1hdGVyaWFsXCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmltcG9ydCAqIGFzIE1hdExpYiBmcm9tIFwibWF0ZXJpYWxzL2dyYWRpZW50L2luZGV4XCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBVTUQgbW9kdWxlLlxyXG4gKiBUaGUgZW50cnkgcG9pbnQgZm9yIGEgZnV0dXJlIEVTTSBwYWNrYWdlIHNob3VsZCBiZSBpbmRleC50c1xyXG4gKi9cclxuY29uc3QgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbmlmICh0eXBlb2YgZ2xvYmFsT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBNYXRMaWIpIHtcclxuICAgICAgICAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT05ba2V5XSA9ICg8YW55Pk1hdExpYilba2V5XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcIm1hdGVyaWFscy9ncmFkaWVudC9pbmRleFwiO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01hdGVyaWFsc19lZmZlY3RfXzsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XG4gIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBhciA9IFtdO1xuICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XG4gICAgcmV0dXJuIGFyO1xuICB9O1xuICByZXR1cm4gb3duS2V5cyhvKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XG4gIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xuICAgIGlmIChhc3luYykge1xuICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xuICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcbiAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcbiAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xuICB9XG4gIGVsc2UgaWYgKGFzeW5jKSB7XG4gICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcbiAgZnVuY3Rpb24gZmFpbChlKSB7XG4gICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xuICAgIGVudi5oYXNFcnJvciA9IHRydWU7XG4gIH1cbiAgdmFyIHIsIHMgPSAwO1xuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcbiAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcbiAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgcyB8PSAxO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XG4gICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xuICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XG4gICAgICB9KTtcbiAgfVxuICByZXR1cm4gcGF0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBfX2V4dGVuZHMsXG4gIF9fYXNzaWduLFxuICBfX3Jlc3QsXG4gIF9fZGVjb3JhdGUsXG4gIF9fcGFyYW0sXG4gIF9fZXNEZWNvcmF0ZSxcbiAgX19ydW5Jbml0aWFsaXplcnMsXG4gIF9fcHJvcEtleSxcbiAgX19zZXRGdW5jdGlvbk5hbWUsXG4gIF9fbWV0YWRhdGEsXG4gIF9fYXdhaXRlcixcbiAgX19nZW5lcmF0b3IsXG4gIF9fY3JlYXRlQmluZGluZyxcbiAgX19leHBvcnRTdGFyLFxuICBfX3ZhbHVlcyxcbiAgX19yZWFkLFxuICBfX3NwcmVhZCxcbiAgX19zcHJlYWRBcnJheXMsXG4gIF9fc3ByZWFkQXJyYXksXG4gIF9fYXdhaXQsXG4gIF9fYXN5bmNHZW5lcmF0b3IsXG4gIF9fYXN5bmNEZWxlZ2F0b3IsXG4gIF9fYXN5bmNWYWx1ZXMsXG4gIF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxuICBfX2ltcG9ydFN0YXIsXG4gIF9faW1wb3J0RGVmYXVsdCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEluLFxuICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcbiAgX19kaXNwb3NlUmVzb3VyY2VzLFxuICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBtYXRlcmlhbHMgZnJvbSBcIkBsdHMvbWF0ZXJpYWxzL2xlZ2FjeS9sZWdhY3ktZ3JhZGllbnRcIjtcclxuZXhwb3J0IHsgbWF0ZXJpYWxzIH07XHJcbmV4cG9ydCBkZWZhdWx0IG1hdGVyaWFscztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9