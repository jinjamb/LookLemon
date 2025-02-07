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

/***/ "../../../dev/materials/src/custom/customMaterial.ts":
/*!***********************************************************!*\
  !*** ../../../dev/materials/src/custom/customMaterial.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomMaterial: () => (/* binding */ CustomMaterial),
/* harmony export */   CustomShaderStructure: () => (/* binding */ CustomShaderStructure),
/* harmony export */   ShaderSpecialParts: () => (/* binding */ ShaderSpecialParts)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Shaders/default.fragment */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__);







/**
 * Structure of a custom shader
 */
var CustomShaderStructure = /** @class */ (function () {
    function CustomShaderStructure() {
    }
    return CustomShaderStructure;
}());

/**
 * Parts of a shader
 */
var ShaderSpecialParts = /** @class */ (function () {
    function ShaderSpecialParts() {
    }
    return ShaderSpecialParts;
}());

/**
 * Customized material
 */
var CustomMaterial = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(CustomMaterial, _super);
    function CustomMaterial(name, scene) {
        var _this = _super.call(this, name, scene, true) || this;
        _this.CustomParts = new ShaderSpecialParts();
        _this.customShaderNameResolve = _this.Builder;
        _this.FragmentShader = babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore["defaultPixelShader"];
        _this.VertexShader = babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore["defaultVertexShader"];
        CustomMaterial.ShaderIndexer++;
        _this._createdShaderName = "custom_" + CustomMaterial.ShaderIndexer;
        return _this;
    }
    /**
     * Runs after the material is bound to a mesh
     * @param mesh mesh bound
     * @param effect bound effect used to render
     */
    CustomMaterial.prototype.AttachAfterBind = function (mesh, effect) {
        if (this._newUniformInstances) {
            for (var el in this._newUniformInstances) {
                var ea = el.toString().split("-");
                if (ea[0] == "vec2") {
                    effect.setVector2(ea[1], this._newUniformInstances[el]);
                }
                else if (ea[0] == "vec3") {
                    if (this._newUniformInstances[el] instanceof babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Color3) {
                        effect.setColor3(ea[1], this._newUniformInstances[el]);
                    }
                    else {
                        effect.setVector3(ea[1], this._newUniformInstances[el]);
                    }
                }
                else if (ea[0] == "vec4") {
                    if (this._newUniformInstances[el] instanceof babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Color4) {
                        effect.setDirectColor4(ea[1], this._newUniformInstances[el]);
                    }
                    else {
                        effect.setVector4(ea[1], this._newUniformInstances[el]);
                    }
                    effect.setVector4(ea[1], this._newUniformInstances[el]);
                }
                else if (ea[0] == "mat4") {
                    effect.setMatrix(ea[1], this._newUniformInstances[el]);
                }
                else if (ea[0] == "float") {
                    effect.setFloat(ea[1], this._newUniformInstances[el]);
                }
            }
        }
        if (this._newSamplerInstances) {
            for (var el in this._newSamplerInstances) {
                var ea = el.toString().split("-");
                if (ea[0] == "sampler2D" && this._newSamplerInstances[el].isReady && this._newSamplerInstances[el].isReady()) {
                    effect.setTexture(ea[1], this._newSamplerInstances[el]);
                }
            }
        }
    };
    /**
     * @internal
     */
    CustomMaterial.prototype.ReviewUniform = function (name, arr) {
        if (name == "uniform" && this._newUniforms) {
            for (var ind = 0; ind < this._newUniforms.length; ind++) {
                if (this._customUniform[ind].indexOf("sampler") == -1) {
                    arr.push(this._newUniforms[ind].replace(/\[\d*\]/g, ""));
                }
            }
        }
        if (name == "sampler" && this._newUniforms) {
            for (var ind = 0; ind < this._newUniforms.length; ind++) {
                if (this._customUniform[ind].indexOf("sampler") != -1) {
                    arr.push(this._newUniforms[ind].replace(/\[\d*\]/g, ""));
                }
            }
        }
        return arr;
    };
    /**
     * Builds the material
     * @param shaderName name of the shader
     * @param uniforms list of uniforms
     * @param uniformBuffers list of uniform buffers
     * @param samplers list of samplers
     * @param defines list of defines
     * @param attributes list of attributes
     * @returns the shader name
     */
    CustomMaterial.prototype.Builder = function (shaderName, uniforms, uniformBuffers, samplers, defines, attributes) {
        if (attributes && this._customAttributes && this._customAttributes.length > 0) {
            attributes.push.apply(attributes, this._customAttributes);
        }
        this.ReviewUniform("uniform", uniforms);
        this.ReviewUniform("sampler", samplers);
        var name = this._createdShaderName;
        if (babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore[name + "VertexShader"] && babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore[name + "PixelShader"]) {
            return name;
        }
        babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore[name + "VertexShader"] = this._injectCustomCode(this.VertexShader, "vertex");
        babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore[name + "PixelShader"] = this._injectCustomCode(this.FragmentShader, "fragment");
        return name;
    };
    CustomMaterial.prototype._injectCustomCode = function (code, shaderType) {
        var customCode = this._getCustomCode(shaderType);
        for (var point in customCode) {
            var injectedCode = customCode[point];
            if (injectedCode && injectedCode.length > 0) {
                var fullPointName = "#define " + point;
                code = code.replace(fullPointName, "\n" + injectedCode + "\n" + fullPointName);
            }
        }
        return code;
    };
    CustomMaterial.prototype._getCustomCode = function (shaderType) {
        var _a, _b;
        if (shaderType === "vertex") {
            return {
                CUSTOM_VERTEX_BEGIN: this.CustomParts.Vertex_Begin,
                CUSTOM_VERTEX_DEFINITIONS: (((_a = this._customUniform) === null || _a === void 0 ? void 0 : _a.join("\n")) || "") + (this.CustomParts.Vertex_Definitions || ""),
                CUSTOM_VERTEX_MAIN_BEGIN: this.CustomParts.Vertex_MainBegin,
                CUSTOM_VERTEX_UPDATE_POSITION: this.CustomParts.Vertex_Before_PositionUpdated,
                CUSTOM_VERTEX_UPDATE_NORMAL: this.CustomParts.Vertex_Before_NormalUpdated,
                CUSTOM_VERTEX_MAIN_END: this.CustomParts.Vertex_MainEnd,
                CUSTOM_VERTEX_UPDATE_WORLDPOS: this.CustomParts.Vertex_After_WorldPosComputed,
            };
        }
        return {
            CUSTOM_FRAGMENT_BEGIN: this.CustomParts.Fragment_Begin,
            CUSTOM_FRAGMENT_DEFINITIONS: (((_b = this._customUniform) === null || _b === void 0 ? void 0 : _b.join("\n")) || "") + (this.CustomParts.Fragment_Definitions || ""),
            CUSTOM_FRAGMENT_MAIN_BEGIN: this.CustomParts.Fragment_MainBegin,
            CUSTOM_FRAGMENT_UPDATE_DIFFUSE: this.CustomParts.Fragment_Custom_Diffuse,
            CUSTOM_FRAGMENT_UPDATE_ALPHA: this.CustomParts.Fragment_Custom_Alpha,
            CUSTOM_FRAGMENT_BEFORE_LIGHTS: this.CustomParts.Fragment_Before_Lights,
            CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR: this.CustomParts.Fragment_Before_FragColor,
            CUSTOM_FRAGMENT_MAIN_END: this.CustomParts.Fragment_MainEnd,
            CUSTOM_FRAGMENT_BEFORE_FOG: this.CustomParts.Fragment_Before_Fog,
        };
    };
    CustomMaterial.prototype._afterBind = function (mesh, effect, subMesh) {
        if (effect === void 0) { effect = null; }
        if (!effect) {
            return;
        }
        this.AttachAfterBind(mesh, effect);
        try {
            _super.prototype._afterBind.call(this, mesh, effect, subMesh);
        }
        catch (e) { }
    };
    /**
     * Adds a new uniform to the shader
     * @param name the name of the uniform to add
     * @param kind the type of the uniform to add
     * @param param the value of the uniform to add
     * @returns the current material
     */
    CustomMaterial.prototype.AddUniform = function (name, kind, param) {
        if (!this._customUniform) {
            this._customUniform = new Array();
            this._newUniforms = new Array();
            this._newSamplerInstances = {};
            this._newUniformInstances = {};
        }
        if (param) {
            if (kind.indexOf("sampler") != -1) {
                this._newSamplerInstances[kind + "-" + name] = param;
            }
            else {
                this._newUniformInstances[kind + "-" + name] = param;
            }
        }
        this._customUniform.push("uniform " + kind + " " + name + ";");
        this._newUniforms.push(name);
        return this;
    };
    /**
     * Adds a custom attribute
     * @param name the name of the attribute
     * @returns the current material
     */
    CustomMaterial.prototype.AddAttribute = function (name) {
        if (!this._customAttributes) {
            this._customAttributes = [];
        }
        this._customAttributes.push(name);
        return this;
    };
    /**
     * Sets the code on Fragment_Begin portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Fragment_Begin = function (shaderPart) {
        this.CustomParts.Fragment_Begin = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Definitions portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Fragment_Definitions = function (shaderPart) {
        this.CustomParts.Fragment_Definitions = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_MainBegin portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Fragment_MainBegin = function (shaderPart) {
        this.CustomParts.Fragment_MainBegin = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_MainEnd portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Fragment_MainEnd = function (shaderPart) {
        this.CustomParts.Fragment_MainEnd = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Custom_Diffuse portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Fragment_Custom_Diffuse = function (shaderPart) {
        this.CustomParts.Fragment_Custom_Diffuse = shaderPart.replace("result", "diffuseColor");
        return this;
    };
    /**
     * Sets the code on Fragment_Custom_Alpha portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Fragment_Custom_Alpha = function (shaderPart) {
        this.CustomParts.Fragment_Custom_Alpha = shaderPart.replace("result", "alpha");
        return this;
    };
    /**
     * Sets the code on Fragment_Before_Lights portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Fragment_Before_Lights = function (shaderPart) {
        this.CustomParts.Fragment_Before_Lights = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Before_Fog portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Fragment_Before_Fog = function (shaderPart) {
        this.CustomParts.Fragment_Before_Fog = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Before_FragColor portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Fragment_Before_FragColor = function (shaderPart) {
        this.CustomParts.Fragment_Before_FragColor = shaderPart.replace("result", "color");
        return this;
    };
    /**
     * Sets the code on Vertex_Begin portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Vertex_Begin = function (shaderPart) {
        this.CustomParts.Vertex_Begin = shaderPart;
        return this;
    };
    /**
     * Sets the code on Vertex_Definitions portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Vertex_Definitions = function (shaderPart) {
        this.CustomParts.Vertex_Definitions = shaderPart;
        return this;
    };
    /**
     * Sets the code on Vertex_MainBegin portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Vertex_MainBegin = function (shaderPart) {
        this.CustomParts.Vertex_MainBegin = shaderPart;
        return this;
    };
    /**
     * Sets the code on Vertex_Before_PositionUpdated portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Vertex_Before_PositionUpdated = function (shaderPart) {
        this.CustomParts.Vertex_Before_PositionUpdated = shaderPart.replace("result", "positionUpdated");
        return this;
    };
    /**
     * Sets the code on Vertex_Before_NormalUpdated portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Vertex_Before_NormalUpdated = function (shaderPart) {
        this.CustomParts.Vertex_Before_NormalUpdated = shaderPart.replace("result", "normalUpdated");
        return this;
    };
    /**
     * Sets the code on Vertex_After_WorldPosComputed portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Vertex_After_WorldPosComputed = function (shaderPart) {
        this.CustomParts.Vertex_After_WorldPosComputed = shaderPart;
        return this;
    };
    /**
     * Sets the code on Vertex_MainEnd portion
     * @param shaderPart the code string
     * @returns the current material
     */
    CustomMaterial.prototype.Vertex_MainEnd = function (shaderPart) {
        this.CustomParts.Vertex_MainEnd = shaderPart;
        return this;
    };
    /**
     * Index for each created shader
     */
    CustomMaterial.ShaderIndexer = 1;
    return CustomMaterial;
}(babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial));

(0,babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.CustomMaterial", CustomMaterial);


/***/ }),

/***/ "../../../dev/materials/src/custom/index.ts":
/*!**************************************************!*\
  !*** ../../../dev/materials/src/custom/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomMaterial: () => (/* reexport safe */ _customMaterial__WEBPACK_IMPORTED_MODULE_0__.CustomMaterial),
/* harmony export */   CustomShaderStructure: () => (/* reexport safe */ _customMaterial__WEBPACK_IMPORTED_MODULE_0__.CustomShaderStructure),
/* harmony export */   PBRCustomMaterial: () => (/* reexport safe */ _pbrCustomMaterial__WEBPACK_IMPORTED_MODULE_1__.PBRCustomMaterial),
/* harmony export */   ShaderAlbedoParts: () => (/* reexport safe */ _pbrCustomMaterial__WEBPACK_IMPORTED_MODULE_1__.ShaderAlbedoParts),
/* harmony export */   ShaderAlebdoParts: () => (/* reexport safe */ _pbrCustomMaterial__WEBPACK_IMPORTED_MODULE_1__.ShaderAlebdoParts),
/* harmony export */   ShaderSpecialParts: () => (/* reexport safe */ _customMaterial__WEBPACK_IMPORTED_MODULE_0__.ShaderSpecialParts)
/* harmony export */ });
/* harmony import */ var _customMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customMaterial */ "../../../dev/materials/src/custom/customMaterial.ts");
/* harmony import */ var _pbrCustomMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pbrCustomMaterial */ "../../../dev/materials/src/custom/pbrCustomMaterial.ts");




/***/ }),

/***/ "../../../dev/materials/src/custom/pbrCustomMaterial.ts":
/*!**************************************************************!*\
  !*** ../../../dev/materials/src/custom/pbrCustomMaterial.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PBRCustomMaterial: () => (/* binding */ PBRCustomMaterial),
/* harmony export */   ShaderAlbedoParts: () => (/* binding */ ShaderAlbedoParts),
/* harmony export */   ShaderAlebdoParts: () => (/* binding */ ShaderAlebdoParts)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Shaders/pbr.fragment */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__);








/**
 * Albedo parts of the shader
 */
var ShaderAlbedoParts = /** @class */ (function () {
    function ShaderAlbedoParts() {
    }
    return ShaderAlbedoParts;
}());

/**
 * @deprecated use ShaderAlbedoParts instead.
 */
var ShaderAlebdoParts = ShaderAlbedoParts;
var PBRCustomMaterial = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(PBRCustomMaterial, _super);
    function PBRCustomMaterial(name, scene) {
        var _this = _super.call(this, name, scene, true) || this;
        _this.CustomParts = new ShaderAlbedoParts();
        _this.customShaderNameResolve = _this.Builder;
        _this.FragmentShader = babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore["pbrPixelShader"];
        _this.VertexShader = babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore["pbrVertexShader"];
        _this.FragmentShader = _this.FragmentShader.replace(/#include<pbrBlockAlbedoOpacity>/g, babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.IncludesShadersStore["pbrBlockAlbedoOpacity"]);
        _this.FragmentShader = _this.FragmentShader.replace(/#include<pbrBlockReflectivity>/g, babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.IncludesShadersStore["pbrBlockReflectivity"]);
        _this.FragmentShader = _this.FragmentShader.replace(/#include<pbrBlockFinalColorComposition>/g, babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.IncludesShadersStore["pbrBlockFinalColorComposition"]);
        PBRCustomMaterial.ShaderIndexer++;
        _this._createdShaderName = "custompbr_" + PBRCustomMaterial.ShaderIndexer;
        return _this;
    }
    /**
     * Runs after the material is bound to a mesh
     * @param mesh mesh bound
     * @param effect bound effect used to render
     */
    PBRCustomMaterial.prototype.AttachAfterBind = function (mesh, effect) {
        if (this._newUniformInstances) {
            for (var el in this._newUniformInstances) {
                var ea = el.toString().split("-");
                if (ea[0] == "vec2") {
                    effect.setVector2(ea[1], this._newUniformInstances[el]);
                }
                else if (ea[0] == "vec3") {
                    if (this._newUniformInstances[el] instanceof babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Color3) {
                        effect.setColor3(ea[1], this._newUniformInstances[el]);
                    }
                    else {
                        effect.setVector3(ea[1], this._newUniformInstances[el]);
                    }
                }
                else if (ea[0] == "vec4") {
                    if (this._newUniformInstances[el] instanceof babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Color4) {
                        effect.setDirectColor4(ea[1], this._newUniformInstances[el]);
                    }
                    else {
                        effect.setVector4(ea[1], this._newUniformInstances[el]);
                    }
                    effect.setVector4(ea[1], this._newUniformInstances[el]);
                }
                else if (ea[0] == "mat4") {
                    effect.setMatrix(ea[1], this._newUniformInstances[el]);
                }
                else if (ea[0] == "float") {
                    effect.setFloat(ea[1], this._newUniformInstances[el]);
                }
            }
        }
        if (this._newSamplerInstances) {
            for (var el in this._newSamplerInstances) {
                var ea = el.toString().split("-");
                if (ea[0] == "sampler2D" && this._newSamplerInstances[el].isReady && this._newSamplerInstances[el].isReady()) {
                    effect.setTexture(ea[1], this._newSamplerInstances[el]);
                }
            }
        }
    };
    /**
     * @internal
     */
    PBRCustomMaterial.prototype.ReviewUniform = function (name, arr) {
        if (name == "uniform" && this._newUniforms) {
            for (var ind = 0; ind < this._newUniforms.length; ind++) {
                if (this._customUniform[ind].indexOf("sampler") == -1) {
                    arr.push(this._newUniforms[ind].replace(/\[\d*\]/g, ""));
                }
            }
        }
        if (name == "sampler" && this._newUniforms) {
            for (var ind = 0; ind < this._newUniforms.length; ind++) {
                if (this._customUniform[ind].indexOf("sampler") != -1) {
                    arr.push(this._newUniforms[ind].replace(/\[\d*\]/g, ""));
                }
            }
        }
        return arr;
    };
    /**
     * Builds the material
     * @param shaderName name of the shader
     * @param uniforms list of uniforms
     * @param uniformBuffers list of uniform buffers
     * @param samplers list of samplers
     * @param defines list of defines
     * @param attributes list of attributes
     * @param options options to compile the shader
     * @returns the shader name
     */
    PBRCustomMaterial.prototype.Builder = function (shaderName, uniforms, uniformBuffers, samplers, defines, attributes, options) {
        if (options) {
            var currentProcessing_1 = options.processFinalCode;
            options.processFinalCode = function (type, code) {
                if (type === "vertex") {
                    return currentProcessing_1 ? currentProcessing_1(type, code) : code;
                }
                var sci = new babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.ShaderCodeInliner(code);
                sci.inlineToken = "#define pbr_inline";
                sci.processCode();
                return currentProcessing_1 ? currentProcessing_1(type, sci.code) : sci.code;
            };
        }
        if (attributes && this._customAttributes && this._customAttributes.length > 0) {
            attributes.push.apply(attributes, this._customAttributes);
        }
        this.ReviewUniform("uniform", uniforms);
        this.ReviewUniform("sampler", samplers);
        var name = this._createdShaderName;
        if (babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore[name + "VertexShader"] && babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore[name + "PixelShader"]) {
            return name;
        }
        babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore[name + "VertexShader"] = this._injectCustomCode(this.VertexShader, "vertex");
        babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.Effect.ShadersStore[name + "PixelShader"] = this._injectCustomCode(this.FragmentShader, "fragment");
        return name;
    };
    PBRCustomMaterial.prototype._injectCustomCode = function (code, shaderType) {
        var customCode = this._getCustomCode(shaderType);
        for (var point in customCode) {
            var injectedCode = customCode[point];
            if (injectedCode && injectedCode.length > 0) {
                var fullPointName = "#define " + point;
                code = code.replace(fullPointName, "\n" + injectedCode + "\n" + fullPointName);
            }
        }
        return code;
    };
    PBRCustomMaterial.prototype._getCustomCode = function (shaderType) {
        var _a, _b;
        if (shaderType === "vertex") {
            return {
                CUSTOM_VERTEX_BEGIN: this.CustomParts.Vertex_Begin,
                CUSTOM_VERTEX_DEFINITIONS: (((_a = this._customUniform) === null || _a === void 0 ? void 0 : _a.join("\n")) || "") + (this.CustomParts.Vertex_Definitions || ""),
                CUSTOM_VERTEX_MAIN_BEGIN: this.CustomParts.Vertex_MainBegin,
                CUSTOM_VERTEX_UPDATE_POSITION: this.CustomParts.Vertex_Before_PositionUpdated,
                CUSTOM_VERTEX_UPDATE_NORMAL: this.CustomParts.Vertex_Before_NormalUpdated,
                CUSTOM_VERTEX_MAIN_END: this.CustomParts.Vertex_MainEnd,
                CUSTOM_VERTEX_UPDATE_WORLDPOS: this.CustomParts.Vertex_After_WorldPosComputed,
            };
        }
        return {
            CUSTOM_FRAGMENT_BEGIN: this.CustomParts.Fragment_Begin,
            CUSTOM_FRAGMENT_MAIN_BEGIN: this.CustomParts.Fragment_MainBegin,
            CUSTOM_FRAGMENT_DEFINITIONS: (((_b = this._customUniform) === null || _b === void 0 ? void 0 : _b.join("\n")) || "") + (this.CustomParts.Fragment_Definitions || ""),
            CUSTOM_FRAGMENT_UPDATE_ALBEDO: this.CustomParts.Fragment_Custom_Albedo,
            CUSTOM_FRAGMENT_UPDATE_ALPHA: this.CustomParts.Fragment_Custom_Alpha,
            CUSTOM_FRAGMENT_BEFORE_LIGHTS: this.CustomParts.Fragment_Before_Lights,
            CUSTOM_FRAGMENT_UPDATE_METALLICROUGHNESS: this.CustomParts.Fragment_Custom_MetallicRoughness,
            CUSTOM_FRAGMENT_UPDATE_MICROSURFACE: this.CustomParts.Fragment_Custom_MicroSurface,
            CUSTOM_FRAGMENT_BEFORE_FINALCOLORCOMPOSITION: this.CustomParts.Fragment_Before_FinalColorComposition,
            CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR: this.CustomParts.Fragment_Before_FragColor,
            CUSTOM_FRAGMENT_MAIN_END: this.CustomParts.Fragment_MainEnd,
            CUSTOM_FRAGMENT_BEFORE_FOG: this.CustomParts.Fragment_Before_Fog,
        };
    };
    PBRCustomMaterial.prototype._afterBind = function (mesh, effect, subMesh) {
        if (effect === void 0) { effect = null; }
        if (!effect) {
            return;
        }
        this.AttachAfterBind(mesh, effect);
        try {
            _super.prototype._afterBind.call(this, mesh, effect, subMesh);
        }
        catch (e) { }
    };
    /**
     * Adds a new uniform to the shader
     * @param name the name of the uniform to add
     * @param kind the type of the uniform to add
     * @param param the value of the uniform to add
     * @returns the current material
     */
    PBRCustomMaterial.prototype.AddUniform = function (name, kind, param) {
        if (!this._customUniform) {
            this._customUniform = new Array();
            this._newUniforms = new Array();
            this._newSamplerInstances = {};
            this._newUniformInstances = {};
        }
        if (param) {
            if (kind.indexOf("sampler") != -1) {
                this._newSamplerInstances[kind + "-" + name] = param;
            }
            else {
                this._newUniformInstances[kind + "-" + name] = param;
            }
        }
        this._customUniform.push("uniform " + kind + " " + name + ";");
        this._newUniforms.push(name);
        return this;
    };
    /**
     * Adds a custom attribute
     * @param name the name of the attribute
     * @returns the current material
     */
    PBRCustomMaterial.prototype.AddAttribute = function (name) {
        if (!this._customAttributes) {
            this._customAttributes = [];
        }
        this._customAttributes.push(name);
        return this;
    };
    /**
     * Sets the code on Fragment_Begin portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_Begin = function (shaderPart) {
        this.CustomParts.Fragment_Begin = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Definitions portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_Definitions = function (shaderPart) {
        this.CustomParts.Fragment_Definitions = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_MainBegin portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_MainBegin = function (shaderPart) {
        this.CustomParts.Fragment_MainBegin = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Custom_Albedo portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_Custom_Albedo = function (shaderPart) {
        this.CustomParts.Fragment_Custom_Albedo = shaderPart.replace("result", "surfaceAlbedo");
        return this;
    };
    /**
     * Sets the code on Fragment_Custom_Alpha portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_Custom_Alpha = function (shaderPart) {
        this.CustomParts.Fragment_Custom_Alpha = shaderPart.replace("result", "alpha");
        return this;
    };
    /**
     * Sets the code on Fragment_Before_Lights portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_Before_Lights = function (shaderPart) {
        this.CustomParts.Fragment_Before_Lights = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Custom_MetallicRoughness portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_Custom_MetallicRoughness = function (shaderPart) {
        this.CustomParts.Fragment_Custom_MetallicRoughness = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Custom_MicroSurface portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_Custom_MicroSurface = function (shaderPart) {
        this.CustomParts.Fragment_Custom_MicroSurface = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Before_Fog portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_Before_Fog = function (shaderPart) {
        this.CustomParts.Fragment_Before_Fog = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Before_FinalColorComposition portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_Before_FinalColorComposition = function (shaderPart) {
        this.CustomParts.Fragment_Before_FinalColorComposition = shaderPart;
        return this;
    };
    /**
     * Sets the code on Fragment_Before_FragColor portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_Before_FragColor = function (shaderPart) {
        this.CustomParts.Fragment_Before_FragColor = shaderPart.replace("result", "color");
        return this;
    };
    /**
     * Sets the code on Fragment_MainEnd portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Fragment_MainEnd = function (shaderPart) {
        this.CustomParts.Fragment_MainEnd = shaderPart;
        return this;
    };
    /**
     * Sets the code on Vertex_Begin portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Vertex_Begin = function (shaderPart) {
        this.CustomParts.Vertex_Begin = shaderPart;
        return this;
    };
    /**
     * Sets the code on Vertex_Definitions portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Vertex_Definitions = function (shaderPart) {
        this.CustomParts.Vertex_Definitions = shaderPart;
        return this;
    };
    /**
     * Sets the code on Vertex_MainBegin portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Vertex_MainBegin = function (shaderPart) {
        this.CustomParts.Vertex_MainBegin = shaderPart;
        return this;
    };
    /**
     * Sets the code on Vertex_Before_PositionUpdated portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Vertex_Before_PositionUpdated = function (shaderPart) {
        this.CustomParts.Vertex_Before_PositionUpdated = shaderPart.replace("result", "positionUpdated");
        return this;
    };
    /**
     * Sets the code on Vertex_Before_NormalUpdated portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Vertex_Before_NormalUpdated = function (shaderPart) {
        this.CustomParts.Vertex_Before_NormalUpdated = shaderPart.replace("result", "normalUpdated");
        return this;
    };
    /**
     * Sets the code on Vertex_After_WorldPosComputed portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Vertex_After_WorldPosComputed = function (shaderPart) {
        this.CustomParts.Vertex_After_WorldPosComputed = shaderPart;
        return this;
    };
    /**
     * Sets the code on Vertex_MainEnd portion
     * @param shaderPart the code string
     * @returns the current material
     */
    PBRCustomMaterial.prototype.Vertex_MainEnd = function (shaderPart) {
        this.CustomParts.Vertex_MainEnd = shaderPart;
        return this;
    };
    /**
     * Index for each created shader
     */
    PBRCustomMaterial.ShaderIndexer = 1;
    return PBRCustomMaterial;
}(babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.PBRMaterial));

(0,babylonjs_Materials_effect__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.PBRCustomMaterial", PBRCustomMaterial);


/***/ }),

/***/ "../../../lts/materials/src/legacy/legacy-custom.ts":
/*!**********************************************************!*\
  !*** ../../../lts/materials/src/legacy/legacy-custom.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomMaterial: () => (/* reexport safe */ materials_custom_index__WEBPACK_IMPORTED_MODULE_0__.CustomMaterial),
/* harmony export */   CustomShaderStructure: () => (/* reexport safe */ materials_custom_index__WEBPACK_IMPORTED_MODULE_0__.CustomShaderStructure),
/* harmony export */   PBRCustomMaterial: () => (/* reexport safe */ materials_custom_index__WEBPACK_IMPORTED_MODULE_0__.PBRCustomMaterial),
/* harmony export */   ShaderAlbedoParts: () => (/* reexport safe */ materials_custom_index__WEBPACK_IMPORTED_MODULE_0__.ShaderAlbedoParts),
/* harmony export */   ShaderAlebdoParts: () => (/* reexport safe */ materials_custom_index__WEBPACK_IMPORTED_MODULE_0__.ShaderAlebdoParts),
/* harmony export */   ShaderSpecialParts: () => (/* reexport safe */ materials_custom_index__WEBPACK_IMPORTED_MODULE_0__.ShaderSpecialParts)
/* harmony export */ });
/* harmony import */ var materials_custom_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! materials/custom/index */ "../../../dev/materials/src/custom/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in materials_custom_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[key] = materials_custom_index__WEBPACK_IMPORTED_MODULE_0__[key];
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
/*!***********************!*\
  !*** ./src/custom.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   materials: () => (/* reexport module object */ _lts_materials_legacy_legacy_custom__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_materials_legacy_legacy_custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/materials/legacy/legacy-custom */ "../../../lts/materials/src/legacy/legacy-custom.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_materials_legacy_legacy_custom__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5jdXN0b21NYXRlcmlhbC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JBO0FBRUE7QUFHQTtBQUNBO0FBSUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFVQTtBQUFBO0FBQ0E7QUFBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQXVFQTtBQUFBOztBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQThLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBOztBQUNBO0FBN0lBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBY0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBM1lBOztBQUVBO0FBQ0E7QUF5WUE7QUFBQTtBQTdZQTtBQStZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlmQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDQTtBQUVBO0FBR0E7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBb0ZBO0FBQUE7O0FBRUE7O0FBRUE7QUFDQTtBQUVBO0FBQUE7QUF1TUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFDQTtBQTFLQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7O0FBVUE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFrQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdGNBOztBQUVBO0FBQ0E7QUFvY0E7QUFBQTtBQXhjQTtBQTBjQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMWpCQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FDZEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDaFpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL01BVEVSSUFMUy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uL2Rldi9tYXRlcmlhbHMvc3JjL2N1c3RvbS9jdXN0b21NYXRlcmlhbC50cyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi4vLi4vLi4vZGV2L21hdGVyaWFscy9zcmMvY3VzdG9tL2luZGV4LnRzIiwid2VicGFjazovL01BVEVSSUFMUy8uLi8uLi8uLi9kZXYvbWF0ZXJpYWxzL3NyYy9jdXN0b20vcGJyQ3VzdG9tTWF0ZXJpYWwudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uL2x0cy9tYXRlcmlhbHMvc3JjL2xlZ2FjeS9sZWdhY3ktY3VzdG9tLnRzIiwid2VicGFjazovL01BVEVSSUFMUy9leHRlcm5hbCB1bWQge1wicm9vdFwiOlwiQkFCWUxPTlwiLFwiY29tbW9uanNcIjpcImJhYnlsb25qc1wiLFwiY29tbW9uanMyXCI6XCJiYWJ5bG9uanNcIixcImFtZFwiOlwiYmFieWxvbmpzXCJ9Iiwid2VicGFjazovL01BVEVSSUFMUy8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2Lm1qcyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL01BVEVSSUFMUy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4vc3JjL2N1c3RvbS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYWJ5bG9uanMtbWF0ZXJpYWxzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtbWF0ZXJpYWxzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJNQVRFUklBTFNcIl0gPSBmYWN0b3J5KHJvb3RbXCJCQUJZTE9OXCJdKTtcbn0pKCh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyksIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NYXRlcmlhbHNfZWZmZWN0X18pID0+IHtcbnJldHVybiAiLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgRWZmZWN0IH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL2VmZmVjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1hdGVyaWFsRGVmaW5lcyB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbERlZmluZXNcIjtcclxuaW1wb3J0IHsgU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9tZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBSZWdpc3RlckNsYXNzIH0gZnJvbSBcImNvcmUvTWlzYy90eXBlU3RvcmVcIjtcclxuaW1wb3J0IHsgQ29sb3IzLCBDb2xvcjQgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IFN1Yk1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvc3ViTWVzaFwiO1xyXG5cclxuaW1wb3J0IFwiY29yZS9TaGFkZXJzL2RlZmF1bHQudmVydGV4XCI7XHJcbmltcG9ydCBcImNvcmUvU2hhZGVycy9kZWZhdWx0LmZyYWdtZW50XCI7XHJcblxyXG4vKipcclxuICogU3RydWN0dXJlIG9mIGEgY3VzdG9tIHNoYWRlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEN1c3RvbVNoYWRlclN0cnVjdHVyZSB7XHJcbiAgICAvKipcclxuICAgICAqIEZyYWdtZW50IHN0b3JlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudFN0b3JlOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIFZlcnRleCBzdG9yZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4U3RvcmU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJ0cyBvZiBhIHNoYWRlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNoYWRlclNwZWNpYWxQYXJ0cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCZWdpbm5pbmcgb2YgdGhlIGZyYWdtZW50IHNoYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQmVnaW46IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogVmFyaWFibGUgZGVmaW5pdGlvbnMgb2YgdGhlIGZyYWdtZW50IHNoYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfRGVmaW5pdGlvbnM6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogQmVnaW5uaW5nIG9mIHRoZSBmcmFnbWVudCBtYWluIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9NYWluQmVnaW46IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogRW5kIG9mIHRoZSBmcmFnbWVudCBtYWluIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9NYWluRW5kOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaWZmdXNlIGNvbG9yIGNhbGN1bGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9DdXN0b21fRGlmZnVzZTogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBCZWZvcmUgbGlnaHRuaW5nIGNvbXB1dGF0aW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQmVmb3JlX0xpZ2h0czogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBCZWZvcmUgZm9nIGNvbXB1dGF0aW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQmVmb3JlX0ZvZzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbHBoYSBjYWxjdWxhdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0N1c3RvbV9BbHBoYTogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBCZWZvcmUgZnJhZyBjb2xvciBpcyBhc3NpZ25lZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQmVmb3JlX0ZyYWdDb2xvcjogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBCZWdpbm5pbmcgb2YgdGhlIHZlcnRleCBzaGFkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFZlcnRleF9CZWdpbjogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBWYXJpYWJsZSBkZWZpbml0aW9ucyBvZiB0aGUgdmVydGV4IHNoYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X0RlZmluaXRpb25zOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IG9mIHRoZSBtYWluIGZ1bmN0aW9uIG9mIHRoZSB2ZXJ0ZXggc2hhZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBWZXJ0ZXhfTWFpbkJlZ2luOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCZWZvcmUgdGhlIHdvcmxkIHBvc2l0aW9uIGNvbXB1dGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBWZXJ0ZXhfQmVmb3JlX1Bvc2l0aW9uVXBkYXRlZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmVmb3JlIHRoZSBub3JtYWwgY29tcHV0YXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIFZlcnRleF9CZWZvcmVfTm9ybWFsVXBkYXRlZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWZ0ZXIgdGhlIHdvcmxkIHBvc2l0aW9uIGhhcyBiZWVuIGNvbXB1dGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBWZXJ0ZXhfQWZ0ZXJfV29ybGRQb3NDb21wdXRlZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbiBlbmQgb2YgdGhlIHZlcnRleCBzaGFkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIFZlcnRleF9NYWluRW5kOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDdXN0b21pemVkIG1hdGVyaWFsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3VzdG9tTWF0ZXJpYWwgZXh0ZW5kcyBTdGFuZGFyZE1hdGVyaWFsIHtcclxuICAgIC8qKlxyXG4gICAgICogSW5kZXggZm9yIGVhY2ggY3JlYXRlZCBzaGFkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTaGFkZXJJbmRleGVyID0gMTtcclxuICAgIC8qKlxyXG4gICAgICogQ3VzdG9tIHNoYWRlciBzdHJ1Y3R1cmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIEN1c3RvbVBhcnRzOiBTaGFkZXJTcGVjaWFsUGFydHM7XHJcbiAgICAvKipcclxuICAgICAqIE5hbWUgb2YgdGhlIHNoYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX2NyZWF0ZWRTaGFkZXJOYW1lOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgY3VzdG9tIHVuaWZvcm1zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfY3VzdG9tVW5pZm9ybTogc3RyaW5nW107XHJcbiAgICAvKipcclxuICAgICAqIE5hbWVzIG9mIHRoZSBuZXcgdW5pZm9ybXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9uZXdVbmlmb3Jtczogc3RyaW5nW107XHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbmNlcyBvZiB0aGUgbmV3IHVuaWZvcm0gb2JqZWN0c1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX25ld1VuaWZvcm1JbnN0YW5jZXM6IHsgW25hbWU6IHN0cmluZ106IGFueSB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW5jZXMgb2YgdGhlIG5ldyBzYW1wbGVyIG9iamVjdHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9uZXdTYW1wbGVySW5zdGFuY2VzOiB7IFtuYW1lOiBzdHJpbmddOiBUZXh0dXJlIH07XHJcbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgdGhlIGN1c3RvbSBhdHRyaWJ1dGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfY3VzdG9tQXR0cmlidXRlczogc3RyaW5nW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGcmFnbWVudCBzaGFkZXIgc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudFNoYWRlcjogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJ0ZXggc2hhZGVyIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4U2hhZGVyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSdW5zIGFmdGVyIHRoZSBtYXRlcmlhbCBpcyBib3VuZCB0byBhIG1lc2hcclxuICAgICAqIEBwYXJhbSBtZXNoIG1lc2ggYm91bmRcclxuICAgICAqIEBwYXJhbSBlZmZlY3QgYm91bmQgZWZmZWN0IHVzZWQgdG8gcmVuZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBdHRhY2hBZnRlckJpbmQobWVzaDogTWVzaCB8IHVuZGVmaW5lZCwgZWZmZWN0OiBFZmZlY3QpIHtcclxuICAgICAgICBpZiAodGhpcy5fbmV3VW5pZm9ybUluc3RhbmNlcykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVsIGluIHRoaXMuX25ld1VuaWZvcm1JbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVhID0gZWwudG9TdHJpbmcoKS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWFbMF0gPT0gXCJ2ZWMyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0VmVjdG9yMihlYVsxXSwgdGhpcy5fbmV3VW5pZm9ybUluc3RhbmNlc1tlbF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlYVswXSA9PSBcInZlYzNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uZXdVbmlmb3JtSW5zdGFuY2VzW2VsXSBpbnN0YW5jZW9mIENvbG9yMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0Q29sb3IzKGVhWzFdLCB0aGlzLl9uZXdVbmlmb3JtSW5zdGFuY2VzW2VsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWZmZWN0LnNldFZlY3RvcjMoZWFbMV0sIHRoaXMuX25ld1VuaWZvcm1JbnN0YW5jZXNbZWxdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVhWzBdID09IFwidmVjNFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25ld1VuaWZvcm1JbnN0YW5jZXNbZWxdIGluc3RhbmNlb2YgQ29sb3I0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdC5zZXREaXJlY3RDb2xvcjQoZWFbMV0sIHRoaXMuX25ld1VuaWZvcm1JbnN0YW5jZXNbZWxdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0VmVjdG9yNChlYVsxXSwgdGhpcy5fbmV3VW5pZm9ybUluc3RhbmNlc1tlbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0VmVjdG9yNChlYVsxXSwgdGhpcy5fbmV3VW5pZm9ybUluc3RhbmNlc1tlbF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlYVswXSA9PSBcIm1hdDRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdC5zZXRNYXRyaXgoZWFbMV0sIHRoaXMuX25ld1VuaWZvcm1JbnN0YW5jZXNbZWxdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWFbMF0gPT0gXCJmbG9hdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0LnNldEZsb2F0KGVhWzFdLCB0aGlzLl9uZXdVbmlmb3JtSW5zdGFuY2VzW2VsXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX25ld1NhbXBsZXJJbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBlbCBpbiB0aGlzLl9uZXdTYW1wbGVySW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlYSA9IGVsLnRvU3RyaW5nKCkuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVhWzBdID09IFwic2FtcGxlcjJEXCIgJiYgdGhpcy5fbmV3U2FtcGxlckluc3RhbmNlc1tlbF0uaXNSZWFkeSAmJiB0aGlzLl9uZXdTYW1wbGVySW5zdGFuY2VzW2VsXS5pc1JlYWR5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0VGV4dHVyZShlYVsxXSwgdGhpcy5fbmV3U2FtcGxlckluc3RhbmNlc1tlbF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBSZXZpZXdVbmlmb3JtKG5hbWU6IHN0cmluZywgYXJyOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcclxuICAgICAgICBpZiAobmFtZSA9PSBcInVuaWZvcm1cIiAmJiB0aGlzLl9uZXdVbmlmb3Jtcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmQgPSAwOyBpbmQgPCB0aGlzLl9uZXdVbmlmb3Jtcy5sZW5ndGg7IGluZCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tVW5pZm9ybVtpbmRdLmluZGV4T2YoXCJzYW1wbGVyXCIpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2godGhpcy5fbmV3VW5pZm9ybXNbaW5kXS5yZXBsYWNlKC9cXFtcXGQqXFxdL2csIFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSA9PSBcInNhbXBsZXJcIiAmJiB0aGlzLl9uZXdVbmlmb3Jtcykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmQgPSAwOyBpbmQgPCB0aGlzLl9uZXdVbmlmb3Jtcy5sZW5ndGg7IGluZCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tVW5pZm9ybVtpbmRdLmluZGV4T2YoXCJzYW1wbGVyXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2godGhpcy5fbmV3VW5pZm9ybXNbaW5kXS5yZXBsYWNlKC9cXFtcXGQqXFxdL2csIFwiXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVpbGRzIHRoZSBtYXRlcmlhbFxyXG4gICAgICogQHBhcmFtIHNoYWRlck5hbWUgbmFtZSBvZiB0aGUgc2hhZGVyXHJcbiAgICAgKiBAcGFyYW0gdW5pZm9ybXMgbGlzdCBvZiB1bmlmb3Jtc1xyXG4gICAgICogQHBhcmFtIHVuaWZvcm1CdWZmZXJzIGxpc3Qgb2YgdW5pZm9ybSBidWZmZXJzXHJcbiAgICAgKiBAcGFyYW0gc2FtcGxlcnMgbGlzdCBvZiBzYW1wbGVyc1xyXG4gICAgICogQHBhcmFtIGRlZmluZXMgbGlzdCBvZiBkZWZpbmVzXHJcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlcyBsaXN0IG9mIGF0dHJpYnV0ZXNcclxuICAgICAqIEByZXR1cm5zIHRoZSBzaGFkZXIgbmFtZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQnVpbGRlcihzaGFkZXJOYW1lOiBzdHJpbmcsIHVuaWZvcm1zOiBzdHJpbmdbXSwgdW5pZm9ybUJ1ZmZlcnM6IHN0cmluZ1tdLCBzYW1wbGVyczogc3RyaW5nW10sIGRlZmluZXM6IE1hdGVyaWFsRGVmaW5lcyB8IHN0cmluZ1tdLCBhdHRyaWJ1dGVzPzogc3RyaW5nW10pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzICYmIHRoaXMuX2N1c3RvbUF0dHJpYnV0ZXMgJiYgdGhpcy5fY3VzdG9tQXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaCguLi50aGlzLl9jdXN0b21BdHRyaWJ1dGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUmV2aWV3VW5pZm9ybShcInVuaWZvcm1cIiwgdW5pZm9ybXMpO1xyXG4gICAgICAgIHRoaXMuUmV2aWV3VW5pZm9ybShcInNhbXBsZXJcIiwgc2FtcGxlcnMpO1xyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fY3JlYXRlZFNoYWRlck5hbWU7XHJcblxyXG4gICAgICAgIGlmIChFZmZlY3QuU2hhZGVyc1N0b3JlW25hbWUgKyBcIlZlcnRleFNoYWRlclwiXSAmJiBFZmZlY3QuU2hhZGVyc1N0b3JlW25hbWUgKyBcIlBpeGVsU2hhZGVyXCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBFZmZlY3QuU2hhZGVyc1N0b3JlW25hbWUgKyBcIlZlcnRleFNoYWRlclwiXSA9IHRoaXMuX2luamVjdEN1c3RvbUNvZGUodGhpcy5WZXJ0ZXhTaGFkZXIsIFwidmVydGV4XCIpO1xyXG4gICAgICAgIEVmZmVjdC5TaGFkZXJzU3RvcmVbbmFtZSArIFwiUGl4ZWxTaGFkZXJcIl0gPSB0aGlzLl9pbmplY3RDdXN0b21Db2RlKHRoaXMuRnJhZ21lbnRTaGFkZXIsIFwiZnJhZ21lbnRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfaW5qZWN0Q3VzdG9tQ29kZShjb2RlOiBzdHJpbmcsIHNoYWRlclR5cGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tQ29kZSA9IHRoaXMuX2dldEN1c3RvbUNvZGUoc2hhZGVyVHlwZSk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcG9pbnQgaW4gY3VzdG9tQ29kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmplY3RlZENvZGUgPSBjdXN0b21Db2RlW3BvaW50XTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmplY3RlZENvZGUgJiYgaW5qZWN0ZWRDb2RlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZ1bGxQb2ludE5hbWUgPSBcIiNkZWZpbmUgXCIgKyBwb2ludDtcclxuICAgICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoZnVsbFBvaW50TmFtZSwgXCJcXG5cIiArIGluamVjdGVkQ29kZSArIFwiXFxuXCIgKyBmdWxsUG9pbnROYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9nZXRDdXN0b21Db2RlKHNoYWRlclR5cGU6IHN0cmluZyk6IHsgW3BvaW50TmFtZTogc3RyaW5nXTogc3RyaW5nIH0ge1xyXG4gICAgICAgIGlmIChzaGFkZXJUeXBlID09PSBcInZlcnRleFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBDVVNUT01fVkVSVEVYX0JFR0lOOiB0aGlzLkN1c3RvbVBhcnRzLlZlcnRleF9CZWdpbixcclxuICAgICAgICAgICAgICAgIENVU1RPTV9WRVJURVhfREVGSU5JVElPTlM6ICh0aGlzLl9jdXN0b21Vbmlmb3JtPy5qb2luKFwiXFxuXCIpIHx8IFwiXCIpICsgKHRoaXMuQ3VzdG9tUGFydHMuVmVydGV4X0RlZmluaXRpb25zIHx8IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgQ1VTVE9NX1ZFUlRFWF9NQUlOX0JFR0lOOiB0aGlzLkN1c3RvbVBhcnRzLlZlcnRleF9NYWluQmVnaW4sXHJcbiAgICAgICAgICAgICAgICBDVVNUT01fVkVSVEVYX1VQREFURV9QT1NJVElPTjogdGhpcy5DdXN0b21QYXJ0cy5WZXJ0ZXhfQmVmb3JlX1Bvc2l0aW9uVXBkYXRlZCxcclxuICAgICAgICAgICAgICAgIENVU1RPTV9WRVJURVhfVVBEQVRFX05PUk1BTDogdGhpcy5DdXN0b21QYXJ0cy5WZXJ0ZXhfQmVmb3JlX05vcm1hbFVwZGF0ZWQsXHJcbiAgICAgICAgICAgICAgICBDVVNUT01fVkVSVEVYX01BSU5fRU5EOiB0aGlzLkN1c3RvbVBhcnRzLlZlcnRleF9NYWluRW5kLFxyXG4gICAgICAgICAgICAgICAgQ1VTVE9NX1ZFUlRFWF9VUERBVEVfV09STERQT1M6IHRoaXMuQ3VzdG9tUGFydHMuVmVydGV4X0FmdGVyX1dvcmxkUG9zQ29tcHV0ZWQsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIENVU1RPTV9GUkFHTUVOVF9CRUdJTjogdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9CZWdpbixcclxuICAgICAgICAgICAgQ1VTVE9NX0ZSQUdNRU5UX0RFRklOSVRJT05TOiAodGhpcy5fY3VzdG9tVW5pZm9ybT8uam9pbihcIlxcblwiKSB8fCBcIlwiKSArICh0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0RlZmluaXRpb25zIHx8IFwiXCIpLFxyXG4gICAgICAgICAgICBDVVNUT01fRlJBR01FTlRfTUFJTl9CRUdJTjogdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9NYWluQmVnaW4sXHJcbiAgICAgICAgICAgIENVU1RPTV9GUkFHTUVOVF9VUERBVEVfRElGRlVTRTogdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9DdXN0b21fRGlmZnVzZSxcclxuICAgICAgICAgICAgQ1VTVE9NX0ZSQUdNRU5UX1VQREFURV9BTFBIQTogdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9DdXN0b21fQWxwaGEsXHJcbiAgICAgICAgICAgIENVU1RPTV9GUkFHTUVOVF9CRUZPUkVfTElHSFRTOiB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0JlZm9yZV9MaWdodHMsXHJcbiAgICAgICAgICAgIENVU1RPTV9GUkFHTUVOVF9CRUZPUkVfRlJBR0NPTE9SOiB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0JlZm9yZV9GcmFnQ29sb3IsXHJcbiAgICAgICAgICAgIENVU1RPTV9GUkFHTUVOVF9NQUlOX0VORDogdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9NYWluRW5kLFxyXG4gICAgICAgICAgICBDVVNUT01fRlJBR01FTlRfQkVGT1JFX0ZPRzogdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9CZWZvcmVfRm9nLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzY2VuZT86IFNjZW5lKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgc2NlbmUsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMgPSBuZXcgU2hhZGVyU3BlY2lhbFBhcnRzKCk7XHJcbiAgICAgICAgdGhpcy5jdXN0b21TaGFkZXJOYW1lUmVzb2x2ZSA9IHRoaXMuQnVpbGRlcjtcclxuXHJcbiAgICAgICAgdGhpcy5GcmFnbWVudFNoYWRlciA9IEVmZmVjdC5TaGFkZXJzU3RvcmVbXCJkZWZhdWx0UGl4ZWxTaGFkZXJcIl07XHJcbiAgICAgICAgdGhpcy5WZXJ0ZXhTaGFkZXIgPSBFZmZlY3QuU2hhZGVyc1N0b3JlW1wiZGVmYXVsdFZlcnRleFNoYWRlclwiXTtcclxuXHJcbiAgICAgICAgQ3VzdG9tTWF0ZXJpYWwuU2hhZGVySW5kZXhlcisrO1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZWRTaGFkZXJOYW1lID0gXCJjdXN0b21fXCIgKyBDdXN0b21NYXRlcmlhbC5TaGFkZXJJbmRleGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvdmVycmlkZSBfYWZ0ZXJCaW5kKG1lc2g/OiBNZXNoLCBlZmZlY3Q6IE51bGxhYmxlPEVmZmVjdD4gPSBudWxsLCBzdWJNZXNoPzogU3ViTWVzaCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghZWZmZWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5BdHRhY2hBZnRlckJpbmQobWVzaCwgZWZmZWN0KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzdXBlci5fYWZ0ZXJCaW5kKG1lc2gsIGVmZmVjdCwgc3ViTWVzaCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBuZXcgdW5pZm9ybSB0byB0aGUgc2hhZGVyXHJcbiAgICAgKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgdW5pZm9ybSB0byBhZGRcclxuICAgICAqIEBwYXJhbSBraW5kIHRoZSB0eXBlIG9mIHRoZSB1bmlmb3JtIHRvIGFkZFxyXG4gICAgICogQHBhcmFtIHBhcmFtIHRoZSB2YWx1ZSBvZiB0aGUgdW5pZm9ybSB0byBhZGRcclxuICAgICAqIEByZXR1cm5zIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRVbmlmb3JtKG5hbWU6IHN0cmluZywga2luZDogc3RyaW5nLCBwYXJhbTogYW55KTogQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIGlmICghdGhpcy5fY3VzdG9tVW5pZm9ybSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXN0b21Vbmlmb3JtID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX25ld1VuaWZvcm1zID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX25ld1NhbXBsZXJJbnN0YW5jZXMgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5fbmV3VW5pZm9ybUluc3RhbmNlcyA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyYW0pIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQuaW5kZXhPZihcInNhbXBsZXJcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICg8YW55PnRoaXMuX25ld1NhbXBsZXJJbnN0YW5jZXMpW2tpbmQgKyBcIi1cIiArIG5hbWVdID0gcGFyYW07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAoPGFueT50aGlzLl9uZXdVbmlmb3JtSW5zdGFuY2VzKVtraW5kICsgXCItXCIgKyBuYW1lXSA9IHBhcmFtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2N1c3RvbVVuaWZvcm0ucHVzaChcInVuaWZvcm0gXCIgKyBraW5kICsgXCIgXCIgKyBuYW1lICsgXCI7XCIpO1xyXG4gICAgICAgIHRoaXMuX25ld1VuaWZvcm1zLnB1c2gobmFtZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGN1c3RvbSBhdHRyaWJ1dGVcclxuICAgICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGVcclxuICAgICAqIEByZXR1cm5zIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBBZGRBdHRyaWJ1dGUobmFtZTogc3RyaW5nKTogQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIGlmICghdGhpcy5fY3VzdG9tQXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXN0b21BdHRyaWJ1dGVzID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXN0b21BdHRyaWJ1dGVzLnB1c2gobmFtZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBGcmFnbWVudF9CZWdpbiBwb3J0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2hhZGVyUGFydCB0aGUgY29kZSBzdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9CZWdpbihzaGFkZXJQYXJ0OiBzdHJpbmcpOiBDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9CZWdpbiA9IHNoYWRlclBhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIEZyYWdtZW50X0RlZmluaXRpb25zIHBvcnRpb25cclxuICAgICAqIEBwYXJhbSBzaGFkZXJQYXJ0IHRoZSBjb2RlIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0RlZmluaXRpb25zKHNoYWRlclBhcnQ6IHN0cmluZyk6IEN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0RlZmluaXRpb25zID0gc2hhZGVyUGFydDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gRnJhZ21lbnRfTWFpbkJlZ2luIHBvcnRpb25cclxuICAgICAqIEBwYXJhbSBzaGFkZXJQYXJ0IHRoZSBjb2RlIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X01haW5CZWdpbihzaGFkZXJQYXJ0OiBzdHJpbmcpOiBDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9NYWluQmVnaW4gPSBzaGFkZXJQYXJ0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBGcmFnbWVudF9NYWluRW5kIHBvcnRpb25cclxuICAgICAqIEBwYXJhbSBzaGFkZXJQYXJ0IHRoZSBjb2RlIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X01haW5FbmQoc2hhZGVyUGFydDogc3RyaW5nKTogQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMuRnJhZ21lbnRfTWFpbkVuZCA9IHNoYWRlclBhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIEZyYWdtZW50X0N1c3RvbV9EaWZmdXNlIHBvcnRpb25cclxuICAgICAqIEBwYXJhbSBzaGFkZXJQYXJ0IHRoZSBjb2RlIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0N1c3RvbV9EaWZmdXNlKHNoYWRlclBhcnQ6IHN0cmluZyk6IEN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0N1c3RvbV9EaWZmdXNlID0gc2hhZGVyUGFydC5yZXBsYWNlKFwicmVzdWx0XCIsIFwiZGlmZnVzZUNvbG9yXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBGcmFnbWVudF9DdXN0b21fQWxwaGEgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQ3VzdG9tX0FscGhhKHNoYWRlclBhcnQ6IHN0cmluZyk6IEN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0N1c3RvbV9BbHBoYSA9IHNoYWRlclBhcnQucmVwbGFjZShcInJlc3VsdFwiLCBcImFscGhhXCIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBGcmFnbWVudF9CZWZvcmVfTGlnaHRzIHBvcnRpb25cclxuICAgICAqIEBwYXJhbSBzaGFkZXJQYXJ0IHRoZSBjb2RlIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0JlZm9yZV9MaWdodHMoc2hhZGVyUGFydDogc3RyaW5nKTogQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMuRnJhZ21lbnRfQmVmb3JlX0xpZ2h0cyA9IHNoYWRlclBhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIEZyYWdtZW50X0JlZm9yZV9Gb2cgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQmVmb3JlX0ZvZyhzaGFkZXJQYXJ0OiBzdHJpbmcpOiBDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9CZWZvcmVfRm9nID0gc2hhZGVyUGFydDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gRnJhZ21lbnRfQmVmb3JlX0ZyYWdDb2xvciBwb3J0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2hhZGVyUGFydCB0aGUgY29kZSBzdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9CZWZvcmVfRnJhZ0NvbG9yKHNoYWRlclBhcnQ6IHN0cmluZyk6IEN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0JlZm9yZV9GcmFnQ29sb3IgPSBzaGFkZXJQYXJ0LnJlcGxhY2UoXCJyZXN1bHRcIiwgXCJjb2xvclwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gVmVydGV4X0JlZ2luIHBvcnRpb25cclxuICAgICAqIEBwYXJhbSBzaGFkZXJQYXJ0IHRoZSBjb2RlIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIFZlcnRleF9CZWdpbihzaGFkZXJQYXJ0OiBzdHJpbmcpOiBDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5WZXJ0ZXhfQmVnaW4gPSBzaGFkZXJQYXJ0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBWZXJ0ZXhfRGVmaW5pdGlvbnMgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X0RlZmluaXRpb25zKHNoYWRlclBhcnQ6IHN0cmluZyk6IEN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLlZlcnRleF9EZWZpbml0aW9ucyA9IHNoYWRlclBhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIFZlcnRleF9NYWluQmVnaW4gcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X01haW5CZWdpbihzaGFkZXJQYXJ0OiBzdHJpbmcpOiBDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5WZXJ0ZXhfTWFpbkJlZ2luID0gc2hhZGVyUGFydDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gVmVydGV4X0JlZm9yZV9Qb3NpdGlvblVwZGF0ZWQgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X0JlZm9yZV9Qb3NpdGlvblVwZGF0ZWQoc2hhZGVyUGFydDogc3RyaW5nKTogQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMuVmVydGV4X0JlZm9yZV9Qb3NpdGlvblVwZGF0ZWQgPSBzaGFkZXJQYXJ0LnJlcGxhY2UoXCJyZXN1bHRcIiwgXCJwb3NpdGlvblVwZGF0ZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIFZlcnRleF9CZWZvcmVfTm9ybWFsVXBkYXRlZCBwb3J0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2hhZGVyUGFydCB0aGUgY29kZSBzdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBWZXJ0ZXhfQmVmb3JlX05vcm1hbFVwZGF0ZWQoc2hhZGVyUGFydDogc3RyaW5nKTogQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMuVmVydGV4X0JlZm9yZV9Ob3JtYWxVcGRhdGVkID0gc2hhZGVyUGFydC5yZXBsYWNlKFwicmVzdWx0XCIsIFwibm9ybWFsVXBkYXRlZFwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gVmVydGV4X0FmdGVyX1dvcmxkUG9zQ29tcHV0ZWQgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X0FmdGVyX1dvcmxkUG9zQ29tcHV0ZWQoc2hhZGVyUGFydDogc3RyaW5nKTogQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMuVmVydGV4X0FmdGVyX1dvcmxkUG9zQ29tcHV0ZWQgPSBzaGFkZXJQYXJ0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBWZXJ0ZXhfTWFpbkVuZCBwb3J0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2hhZGVyUGFydCB0aGUgY29kZSBzdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBWZXJ0ZXhfTWFpbkVuZChzaGFkZXJQYXJ0OiBzdHJpbmcpOiBDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5WZXJ0ZXhfTWFpbkVuZCA9IHNoYWRlclBhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLkN1c3RvbU1hdGVyaWFsXCIsIEN1c3RvbU1hdGVyaWFsKTtcclxuIiwiZXhwb3J0ICogZnJvbSBcIi4vY3VzdG9tTWF0ZXJpYWxcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcGJyQ3VzdG9tTWF0ZXJpYWxcIjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uICovXHJcbmltcG9ydCB0eXBlIHsgVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy90ZXh0dXJlXCI7XHJcbmltcG9ydCB7IEVmZmVjdCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9lZmZlY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbERlZmluZXMgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxEZWZpbmVzXCI7XHJcbmltcG9ydCB7IFBCUk1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNYXRlcmlhbFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcbmltcG9ydCB7IFNoYWRlckNvZGVJbmxpbmVyIH0gZnJvbSBcImNvcmUvRW5naW5lcy9Qcm9jZXNzb3JzL3NoYWRlckNvZGVJbmxpbmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgSUN1c3RvbVNoYWRlck5hbWVSZXNvbHZlT3B0aW9ucyB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBDb2xvcjMsIENvbG9yNCB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB0eXBlIHsgU3ViTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9zdWJNZXNoXCI7XHJcblxyXG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvcGJyLnZlcnRleFwiO1xyXG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvcGJyLmZyYWdtZW50XCI7XHJcblxyXG4vKipcclxuICogQWxiZWRvIHBhcnRzIG9mIHRoZSBzaGFkZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTaGFkZXJBbGJlZG9QYXJ0cyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCZWdpbm5pbmcgb2YgdGhlIGZyYWdtZW50IHNoYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQmVnaW46IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogRnJhZ21lbnQgZGVmaW5pdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0RlZmluaXRpb25zOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIEJlZ2lubmluZyBvZiB0aGUgbWFpbiBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfTWFpbkJlZ2luOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIEVuZCBvZiBtYWluIGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9NYWluRW5kOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGJlZG8gY29sb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0N1c3RvbV9BbGJlZG86IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogTGlnaHRzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9CZWZvcmVfTGlnaHRzOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIE1ldGFsbGljIGFuZCByb3VnaG5lc3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0N1c3RvbV9NZXRhbGxpY1JvdWdobmVzczogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBNaWNyb3N1cmZhY2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0N1c3RvbV9NaWNyb1N1cmZhY2U6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogRm9nIGNvbXB1dGF0aW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQmVmb3JlX0ZvZzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBBbHBoYVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQ3VzdG9tX0FscGhhOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIENvbG9yIGNvbXBvc2l0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9CZWZvcmVfRmluYWxDb2xvckNvbXBvc2l0aW9uOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIEZyYWdtZW50IGNvbG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9CZWZvcmVfRnJhZ0NvbG9yOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCZWdpbm5pbmcgb2YgdmVydGV4IHNoYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X0JlZ2luOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIFZlcnRleCBkZWZpbml0aW9uc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X0RlZmluaXRpb25zOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIFZlcnRleCBtYWluIGJlZ2luXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBWZXJ0ZXhfTWFpbkJlZ2luOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJ0ZXggYmVmb3JlIHBvc2l0aW9uIHVwZGF0ZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIFZlcnRleF9CZWZvcmVfUG9zaXRpb25VcGRhdGVkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJ0ZXggYmVmb3JlIG5vcm1hbCB1cGRhdGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBWZXJ0ZXhfQmVmb3JlX05vcm1hbFVwZGF0ZWQ6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZlcnRleCBhZnRlciB3b3JsZCBwb3MgY29tcHV0ZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIFZlcnRleF9BZnRlcl9Xb3JsZFBvc0NvbXB1dGVkOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWZXJ0ZXggbWFpbiBlbmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIFZlcnRleF9NYWluRW5kOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZCB1c2UgU2hhZGVyQWxiZWRvUGFydHMgaW5zdGVhZC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBTaGFkZXJBbGViZG9QYXJ0cyA9IFNoYWRlckFsYmVkb1BhcnRzO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBCUkN1c3RvbU1hdGVyaWFsIGV4dGVuZHMgUEJSTWF0ZXJpYWwge1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRleCBmb3IgZWFjaCBjcmVhdGVkIHNoYWRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNoYWRlckluZGV4ZXIgPSAxO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDdXN0b20gc2hhZGVyIHN0cnVjdHVyZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3VzdG9tUGFydHM6IFNoYWRlckFsYmVkb1BhcnRzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBOYW1lIG9mIHRoZSBzaGFkZXJcclxuICAgICAqL1xyXG4gICAgX2NyZWF0ZWRTaGFkZXJOYW1lOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIExpc3Qgb2YgY3VzdG9tIHVuaWZvcm1zXHJcbiAgICAgKi9cclxuICAgIF9jdXN0b21Vbmlmb3JtOiBzdHJpbmdbXTtcclxuICAgIC8qKlxyXG4gICAgICogTmFtZXMgb2YgdGhlIG5ldyB1bmlmb3Jtc1xyXG4gICAgICovXHJcbiAgICBfbmV3VW5pZm9ybXM6IHN0cmluZ1tdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW5jZXMgb2YgdGhlIG5ldyB1bmlmb3JtIG9iamVjdHNcclxuICAgICAqL1xyXG4gICAgX25ld1VuaWZvcm1JbnN0YW5jZXM6IHsgW25hbWU6IHN0cmluZ106IGFueSB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW5jZXMgb2YgdGhlIG5ldyBzYW1wbGVyIG9iamVjdHNcclxuICAgICAqL1xyXG4gICAgX25ld1NhbXBsZXJJbnN0YW5jZXM6IHsgW25hbWU6IHN0cmluZ106IFRleHR1cmUgfTtcclxuICAgIC8qKlxyXG4gICAgICogTGlzdCBvZiB0aGUgY3VzdG9tIGF0dHJpYnV0ZXNcclxuICAgICAqL1xyXG4gICAgX2N1c3RvbUF0dHJpYnV0ZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnJhZ21lbnQgc2hhZGVyIHN0cmluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRTaGFkZXI6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogVmVydGV4IHNoYWRlciBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIFZlcnRleFNoYWRlcjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUnVucyBhZnRlciB0aGUgbWF0ZXJpYWwgaXMgYm91bmQgdG8gYSBtZXNoXHJcbiAgICAgKiBAcGFyYW0gbWVzaCBtZXNoIGJvdW5kXHJcbiAgICAgKiBAcGFyYW0gZWZmZWN0IGJvdW5kIGVmZmVjdCB1c2VkIHRvIHJlbmRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQXR0YWNoQWZ0ZXJCaW5kKG1lc2g6IE1lc2ggfCB1bmRlZmluZWQsIGVmZmVjdDogRWZmZWN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX25ld1VuaWZvcm1JbnN0YW5jZXMpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBlbCBpbiB0aGlzLl9uZXdVbmlmb3JtSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlYSA9IGVsLnRvU3RyaW5nKCkuc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVhWzBdID09IFwidmVjMlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0LnNldFZlY3RvcjIoZWFbMV0sIHRoaXMuX25ld1VuaWZvcm1JbnN0YW5jZXNbZWxdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWFbMF0gPT0gXCJ2ZWMzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmV3VW5pZm9ybUluc3RhbmNlc1tlbF0gaW5zdGFuY2VvZiBDb2xvcjMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWZmZWN0LnNldENvbG9yMyhlYVsxXSwgdGhpcy5fbmV3VW5pZm9ybUluc3RhbmNlc1tlbF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdC5zZXRWZWN0b3IzKGVhWzFdLCB0aGlzLl9uZXdVbmlmb3JtSW5zdGFuY2VzW2VsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlYVswXSA9PSBcInZlYzRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uZXdVbmlmb3JtSW5zdGFuY2VzW2VsXSBpbnN0YW5jZW9mIENvbG9yNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0RGlyZWN0Q29sb3I0KGVhWzFdLCB0aGlzLl9uZXdVbmlmb3JtSW5zdGFuY2VzW2VsXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWZmZWN0LnNldFZlY3RvcjQoZWFbMV0sIHRoaXMuX25ld1VuaWZvcm1JbnN0YW5jZXNbZWxdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0LnNldFZlY3RvcjQoZWFbMV0sIHRoaXMuX25ld1VuaWZvcm1JbnN0YW5jZXNbZWxdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWFbMF0gPT0gXCJtYXQ0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc2V0TWF0cml4KGVhWzFdLCB0aGlzLl9uZXdVbmlmb3JtSW5zdGFuY2VzW2VsXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVhWzBdID09IFwiZmxvYXRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdC5zZXRGbG9hdChlYVsxXSwgdGhpcy5fbmV3VW5pZm9ybUluc3RhbmNlc1tlbF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9uZXdTYW1wbGVySW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZWwgaW4gdGhpcy5fbmV3U2FtcGxlckluc3RhbmNlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWEgPSBlbC50b1N0cmluZygpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChlYVswXSA9PSBcInNhbXBsZXIyRFwiICYmIHRoaXMuX25ld1NhbXBsZXJJbnN0YW5jZXNbZWxdLmlzUmVhZHkgJiYgdGhpcy5fbmV3U2FtcGxlckluc3RhbmNlc1tlbF0uaXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0LnNldFRleHR1cmUoZWFbMV0sIHRoaXMuX25ld1NhbXBsZXJJbnN0YW5jZXNbZWxdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUmV2aWV3VW5pZm9ybShuYW1lOiBzdHJpbmcsIGFycjogc3RyaW5nW10pOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJ1bmlmb3JtXCIgJiYgdGhpcy5fbmV3VW5pZm9ybXMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kID0gMDsgaW5kIDwgdGhpcy5fbmV3VW5pZm9ybXMubGVuZ3RoOyBpbmQrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1c3RvbVVuaWZvcm1baW5kXS5pbmRleE9mKFwic2FtcGxlclwiKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHRoaXMuX25ld1VuaWZvcm1zW2luZF0ucmVwbGFjZSgvXFxbXFxkKlxcXS9nLCBcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJzYW1wbGVyXCIgJiYgdGhpcy5fbmV3VW5pZm9ybXMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kID0gMDsgaW5kIDwgdGhpcy5fbmV3VW5pZm9ybXMubGVuZ3RoOyBpbmQrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2N1c3RvbVVuaWZvcm1baW5kXS5pbmRleE9mKFwic2FtcGxlclwiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHRoaXMuX25ld1VuaWZvcm1zW2luZF0ucmVwbGFjZSgvXFxbXFxkKlxcXS9nLCBcIlwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkcyB0aGUgbWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBzaGFkZXJOYW1lIG5hbWUgb2YgdGhlIHNoYWRlclxyXG4gICAgICogQHBhcmFtIHVuaWZvcm1zIGxpc3Qgb2YgdW5pZm9ybXNcclxuICAgICAqIEBwYXJhbSB1bmlmb3JtQnVmZmVycyBsaXN0IG9mIHVuaWZvcm0gYnVmZmVyc1xyXG4gICAgICogQHBhcmFtIHNhbXBsZXJzIGxpc3Qgb2Ygc2FtcGxlcnNcclxuICAgICAqIEBwYXJhbSBkZWZpbmVzIGxpc3Qgb2YgZGVmaW5lc1xyXG4gICAgICogQHBhcmFtIGF0dHJpYnV0ZXMgbGlzdCBvZiBhdHRyaWJ1dGVzXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIHRvIGNvbXBpbGUgdGhlIHNoYWRlclxyXG4gICAgICogQHJldHVybnMgdGhlIHNoYWRlciBuYW1lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBCdWlsZGVyKFxyXG4gICAgICAgIHNoYWRlck5hbWU6IHN0cmluZyxcclxuICAgICAgICB1bmlmb3Jtczogc3RyaW5nW10sXHJcbiAgICAgICAgdW5pZm9ybUJ1ZmZlcnM6IHN0cmluZ1tdLFxyXG4gICAgICAgIHNhbXBsZXJzOiBzdHJpbmdbXSxcclxuICAgICAgICBkZWZpbmVzOiBNYXRlcmlhbERlZmluZXMgfCBzdHJpbmdbXSxcclxuICAgICAgICBhdHRyaWJ1dGVzPzogc3RyaW5nW10sXHJcbiAgICAgICAgb3B0aW9ucz86IElDdXN0b21TaGFkZXJOYW1lUmVzb2x2ZU9wdGlvbnNcclxuICAgICk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFByb2Nlc3NpbmcgPSBvcHRpb25zLnByb2Nlc3NGaW5hbENvZGU7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucHJvY2Vzc0ZpbmFsQ29kZSA9ICh0eXBlOiBzdHJpbmcsIGNvZGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwidmVydGV4XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFByb2Nlc3NpbmcgPyBjdXJyZW50UHJvY2Vzc2luZyh0eXBlLCBjb2RlKSA6IGNvZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY2kgPSBuZXcgU2hhZGVyQ29kZUlubGluZXIoY29kZSk7XHJcbiAgICAgICAgICAgICAgICBzY2kuaW5saW5lVG9rZW4gPSBcIiNkZWZpbmUgcGJyX2lubGluZVwiO1xyXG4gICAgICAgICAgICAgICAgc2NpLnByb2Nlc3NDb2RlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFByb2Nlc3NpbmcgPyBjdXJyZW50UHJvY2Vzc2luZyh0eXBlLCBzY2kuY29kZSkgOiBzY2kuY29kZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzICYmIHRoaXMuX2N1c3RvbUF0dHJpYnV0ZXMgJiYgdGhpcy5fY3VzdG9tQXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMucHVzaCguLi50aGlzLl9jdXN0b21BdHRyaWJ1dGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUmV2aWV3VW5pZm9ybShcInVuaWZvcm1cIiwgdW5pZm9ybXMpO1xyXG4gICAgICAgIHRoaXMuUmV2aWV3VW5pZm9ybShcInNhbXBsZXJcIiwgc2FtcGxlcnMpO1xyXG5cclxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5fY3JlYXRlZFNoYWRlck5hbWU7XHJcblxyXG4gICAgICAgIGlmIChFZmZlY3QuU2hhZGVyc1N0b3JlW25hbWUgKyBcIlZlcnRleFNoYWRlclwiXSAmJiBFZmZlY3QuU2hhZGVyc1N0b3JlW25hbWUgKyBcIlBpeGVsU2hhZGVyXCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBFZmZlY3QuU2hhZGVyc1N0b3JlW25hbWUgKyBcIlZlcnRleFNoYWRlclwiXSA9IHRoaXMuX2luamVjdEN1c3RvbUNvZGUodGhpcy5WZXJ0ZXhTaGFkZXIsIFwidmVydGV4XCIpO1xyXG4gICAgICAgIEVmZmVjdC5TaGFkZXJzU3RvcmVbbmFtZSArIFwiUGl4ZWxTaGFkZXJcIl0gPSB0aGlzLl9pbmplY3RDdXN0b21Db2RlKHRoaXMuRnJhZ21lbnRTaGFkZXIsIFwiZnJhZ21lbnRcIik7XHJcblxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfaW5qZWN0Q3VzdG9tQ29kZShjb2RlOiBzdHJpbmcsIHNoYWRlclR5cGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tQ29kZSA9IHRoaXMuX2dldEN1c3RvbUNvZGUoc2hhZGVyVHlwZSk7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcG9pbnQgaW4gY3VzdG9tQ29kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmplY3RlZENvZGUgPSBjdXN0b21Db2RlW3BvaW50XTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmplY3RlZENvZGUgJiYgaW5qZWN0ZWRDb2RlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZ1bGxQb2ludE5hbWUgPSBcIiNkZWZpbmUgXCIgKyBwb2ludDtcclxuICAgICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoZnVsbFBvaW50TmFtZSwgXCJcXG5cIiArIGluamVjdGVkQ29kZSArIFwiXFxuXCIgKyBmdWxsUG9pbnROYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9nZXRDdXN0b21Db2RlKHNoYWRlclR5cGU6IHN0cmluZyk6IHsgW3BvaW50TmFtZTogc3RyaW5nXTogc3RyaW5nIH0ge1xyXG4gICAgICAgIGlmIChzaGFkZXJUeXBlID09PSBcInZlcnRleFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBDVVNUT01fVkVSVEVYX0JFR0lOOiB0aGlzLkN1c3RvbVBhcnRzLlZlcnRleF9CZWdpbixcclxuICAgICAgICAgICAgICAgIENVU1RPTV9WRVJURVhfREVGSU5JVElPTlM6ICh0aGlzLl9jdXN0b21Vbmlmb3JtPy5qb2luKFwiXFxuXCIpIHx8IFwiXCIpICsgKHRoaXMuQ3VzdG9tUGFydHMuVmVydGV4X0RlZmluaXRpb25zIHx8IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgQ1VTVE9NX1ZFUlRFWF9NQUlOX0JFR0lOOiB0aGlzLkN1c3RvbVBhcnRzLlZlcnRleF9NYWluQmVnaW4sXHJcbiAgICAgICAgICAgICAgICBDVVNUT01fVkVSVEVYX1VQREFURV9QT1NJVElPTjogdGhpcy5DdXN0b21QYXJ0cy5WZXJ0ZXhfQmVmb3JlX1Bvc2l0aW9uVXBkYXRlZCxcclxuICAgICAgICAgICAgICAgIENVU1RPTV9WRVJURVhfVVBEQVRFX05PUk1BTDogdGhpcy5DdXN0b21QYXJ0cy5WZXJ0ZXhfQmVmb3JlX05vcm1hbFVwZGF0ZWQsXHJcbiAgICAgICAgICAgICAgICBDVVNUT01fVkVSVEVYX01BSU5fRU5EOiB0aGlzLkN1c3RvbVBhcnRzLlZlcnRleF9NYWluRW5kLFxyXG4gICAgICAgICAgICAgICAgQ1VTVE9NX1ZFUlRFWF9VUERBVEVfV09STERQT1M6IHRoaXMuQ3VzdG9tUGFydHMuVmVydGV4X0FmdGVyX1dvcmxkUG9zQ29tcHV0ZWQsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIENVU1RPTV9GUkFHTUVOVF9CRUdJTjogdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9CZWdpbixcclxuICAgICAgICAgICAgQ1VTVE9NX0ZSQUdNRU5UX01BSU5fQkVHSU46IHRoaXMuQ3VzdG9tUGFydHMuRnJhZ21lbnRfTWFpbkJlZ2luLFxyXG4gICAgICAgICAgICBDVVNUT01fRlJBR01FTlRfREVGSU5JVElPTlM6ICh0aGlzLl9jdXN0b21Vbmlmb3JtPy5qb2luKFwiXFxuXCIpIHx8IFwiXCIpICsgKHRoaXMuQ3VzdG9tUGFydHMuRnJhZ21lbnRfRGVmaW5pdGlvbnMgfHwgXCJcIiksXHJcbiAgICAgICAgICAgIENVU1RPTV9GUkFHTUVOVF9VUERBVEVfQUxCRURPOiB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0N1c3RvbV9BbGJlZG8sXHJcbiAgICAgICAgICAgIENVU1RPTV9GUkFHTUVOVF9VUERBVEVfQUxQSEE6IHRoaXMuQ3VzdG9tUGFydHMuRnJhZ21lbnRfQ3VzdG9tX0FscGhhLFxyXG4gICAgICAgICAgICBDVVNUT01fRlJBR01FTlRfQkVGT1JFX0xJR0hUUzogdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9CZWZvcmVfTGlnaHRzLFxyXG4gICAgICAgICAgICBDVVNUT01fRlJBR01FTlRfVVBEQVRFX01FVEFMTElDUk9VR0hORVNTOiB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0N1c3RvbV9NZXRhbGxpY1JvdWdobmVzcyxcclxuICAgICAgICAgICAgQ1VTVE9NX0ZSQUdNRU5UX1VQREFURV9NSUNST1NVUkZBQ0U6IHRoaXMuQ3VzdG9tUGFydHMuRnJhZ21lbnRfQ3VzdG9tX01pY3JvU3VyZmFjZSxcclxuICAgICAgICAgICAgQ1VTVE9NX0ZSQUdNRU5UX0JFRk9SRV9GSU5BTENPTE9SQ09NUE9TSVRJT046IHRoaXMuQ3VzdG9tUGFydHMuRnJhZ21lbnRfQmVmb3JlX0ZpbmFsQ29sb3JDb21wb3NpdGlvbixcclxuICAgICAgICAgICAgQ1VTVE9NX0ZSQUdNRU5UX0JFRk9SRV9GUkFHQ09MT1I6IHRoaXMuQ3VzdG9tUGFydHMuRnJhZ21lbnRfQmVmb3JlX0ZyYWdDb2xvcixcclxuICAgICAgICAgICAgQ1VTVE9NX0ZSQUdNRU5UX01BSU5fRU5EOiB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X01haW5FbmQsXHJcbiAgICAgICAgICAgIENVU1RPTV9GUkFHTUVOVF9CRUZPUkVfRk9HOiB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0JlZm9yZV9Gb2csXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNjZW5lPzogU2NlbmUpIHtcclxuICAgICAgICBzdXBlcihuYW1lLCBzY2VuZSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cyA9IG5ldyBTaGFkZXJBbGJlZG9QYXJ0cygpO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tU2hhZGVyTmFtZVJlc29sdmUgPSB0aGlzLkJ1aWxkZXI7XHJcblxyXG4gICAgICAgIHRoaXMuRnJhZ21lbnRTaGFkZXIgPSBFZmZlY3QuU2hhZGVyc1N0b3JlW1wicGJyUGl4ZWxTaGFkZXJcIl07XHJcbiAgICAgICAgdGhpcy5WZXJ0ZXhTaGFkZXIgPSBFZmZlY3QuU2hhZGVyc1N0b3JlW1wicGJyVmVydGV4U2hhZGVyXCJdO1xyXG5cclxuICAgICAgICB0aGlzLkZyYWdtZW50U2hhZGVyID0gdGhpcy5GcmFnbWVudFNoYWRlci5yZXBsYWNlKC8jaW5jbHVkZTxwYnJCbG9ja0FsYmVkb09wYWNpdHk+L2csIEVmZmVjdC5JbmNsdWRlc1NoYWRlcnNTdG9yZVtcInBickJsb2NrQWxiZWRvT3BhY2l0eVwiXSk7XHJcbiAgICAgICAgdGhpcy5GcmFnbWVudFNoYWRlciA9IHRoaXMuRnJhZ21lbnRTaGFkZXIucmVwbGFjZSgvI2luY2x1ZGU8cGJyQmxvY2tSZWZsZWN0aXZpdHk+L2csIEVmZmVjdC5JbmNsdWRlc1NoYWRlcnNTdG9yZVtcInBickJsb2NrUmVmbGVjdGl2aXR5XCJdKTtcclxuICAgICAgICB0aGlzLkZyYWdtZW50U2hhZGVyID0gdGhpcy5GcmFnbWVudFNoYWRlci5yZXBsYWNlKC8jaW5jbHVkZTxwYnJCbG9ja0ZpbmFsQ29sb3JDb21wb3NpdGlvbj4vZywgRWZmZWN0LkluY2x1ZGVzU2hhZGVyc1N0b3JlW1wicGJyQmxvY2tGaW5hbENvbG9yQ29tcG9zaXRpb25cIl0pO1xyXG5cclxuICAgICAgICBQQlJDdXN0b21NYXRlcmlhbC5TaGFkZXJJbmRleGVyKys7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlZFNoYWRlck5hbWUgPSBcImN1c3RvbXBicl9cIiArIFBCUkN1c3RvbU1hdGVyaWFsLlNoYWRlckluZGV4ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG92ZXJyaWRlIF9hZnRlckJpbmQobWVzaD86IE1lc2gsIGVmZmVjdDogTnVsbGFibGU8RWZmZWN0PiA9IG51bGwsIHN1Yk1lc2g/OiBTdWJNZXNoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFlZmZlY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkF0dGFjaEFmdGVyQmluZChtZXNoLCBlZmZlY3QpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHN1cGVyLl9hZnRlckJpbmQobWVzaCwgZWZmZWN0LCBzdWJNZXNoKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIG5ldyB1bmlmb3JtIHRvIHRoZSBzaGFkZXJcclxuICAgICAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSB1bmlmb3JtIHRvIGFkZFxyXG4gICAgICogQHBhcmFtIGtpbmQgdGhlIHR5cGUgb2YgdGhlIHVuaWZvcm0gdG8gYWRkXHJcbiAgICAgKiBAcGFyYW0gcGFyYW0gdGhlIHZhbHVlIG9mIHRoZSB1bmlmb3JtIHRvIGFkZFxyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZFVuaWZvcm0obmFtZTogc3RyaW5nLCBraW5kOiBzdHJpbmcsIHBhcmFtOiBhbnkpOiBQQlJDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jdXN0b21Vbmlmb3JtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbVVuaWZvcm0gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5fbmV3VW5pZm9ybXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5fbmV3U2FtcGxlckluc3RhbmNlcyA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLl9uZXdVbmlmb3JtSW5zdGFuY2VzID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZC5pbmRleE9mKFwic2FtcGxlclwiKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgKDxhbnk+dGhpcy5fbmV3U2FtcGxlckluc3RhbmNlcylba2luZCArIFwiLVwiICsgbmFtZV0gPSBwYXJhbTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICg8YW55PnRoaXMuX25ld1VuaWZvcm1JbnN0YW5jZXMpW2tpbmQgKyBcIi1cIiArIG5hbWVdID0gcGFyYW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY3VzdG9tVW5pZm9ybS5wdXNoKFwidW5pZm9ybSBcIiArIGtpbmQgKyBcIiBcIiArIG5hbWUgKyBcIjtcIik7XHJcbiAgICAgICAgdGhpcy5fbmV3VW5pZm9ybXMucHVzaChuYW1lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgY3VzdG9tIGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIG5hbWUgdGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZVxyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpOiBQQlJDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jdXN0b21BdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbUF0dHJpYnV0ZXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1c3RvbUF0dHJpYnV0ZXMucHVzaChuYW1lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIEZyYWdtZW50X0JlZ2luIHBvcnRpb25cclxuICAgICAqIEBwYXJhbSBzaGFkZXJQYXJ0IHRoZSBjb2RlIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0JlZ2luKHNoYWRlclBhcnQ6IHN0cmluZyk6IFBCUkN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0JlZ2luID0gc2hhZGVyUGFydDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gRnJhZ21lbnRfRGVmaW5pdGlvbnMgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfRGVmaW5pdGlvbnMoc2hhZGVyUGFydDogc3RyaW5nKTogUEJSQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMuRnJhZ21lbnRfRGVmaW5pdGlvbnMgPSBzaGFkZXJQYXJ0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBGcmFnbWVudF9NYWluQmVnaW4gcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfTWFpbkJlZ2luKHNoYWRlclBhcnQ6IHN0cmluZyk6IFBCUkN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X01haW5CZWdpbiA9IHNoYWRlclBhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIEZyYWdtZW50X0N1c3RvbV9BbGJlZG8gcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQ3VzdG9tX0FsYmVkbyhzaGFkZXJQYXJ0OiBzdHJpbmcpOiBQQlJDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9DdXN0b21fQWxiZWRvID0gc2hhZGVyUGFydC5yZXBsYWNlKFwicmVzdWx0XCIsIFwic3VyZmFjZUFsYmVkb1wiKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gRnJhZ21lbnRfQ3VzdG9tX0FscGhhIHBvcnRpb25cclxuICAgICAqIEBwYXJhbSBzaGFkZXJQYXJ0IHRoZSBjb2RlIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0N1c3RvbV9BbHBoYShzaGFkZXJQYXJ0OiBzdHJpbmcpOiBQQlJDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9DdXN0b21fQWxwaGEgPSBzaGFkZXJQYXJ0LnJlcGxhY2UoXCJyZXN1bHRcIiwgXCJhbHBoYVwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gRnJhZ21lbnRfQmVmb3JlX0xpZ2h0cyBwb3J0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2hhZGVyUGFydCB0aGUgY29kZSBzdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9CZWZvcmVfTGlnaHRzKHNoYWRlclBhcnQ6IHN0cmluZyk6IFBCUkN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0JlZm9yZV9MaWdodHMgPSBzaGFkZXJQYXJ0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBGcmFnbWVudF9DdXN0b21fTWV0YWxsaWNSb3VnaG5lc3MgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQ3VzdG9tX01ldGFsbGljUm91Z2huZXNzKHNoYWRlclBhcnQ6IHN0cmluZyk6IFBCUkN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0N1c3RvbV9NZXRhbGxpY1JvdWdobmVzcyA9IHNoYWRlclBhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIEZyYWdtZW50X0N1c3RvbV9NaWNyb1N1cmZhY2UgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQ3VzdG9tX01pY3JvU3VyZmFjZShzaGFkZXJQYXJ0OiBzdHJpbmcpOiBQQlJDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9DdXN0b21fTWljcm9TdXJmYWNlID0gc2hhZGVyUGFydDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gRnJhZ21lbnRfQmVmb3JlX0ZvZyBwb3J0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2hhZGVyUGFydCB0aGUgY29kZSBzdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGcmFnbWVudF9CZWZvcmVfRm9nKHNoYWRlclBhcnQ6IHN0cmluZyk6IFBCUkN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLkZyYWdtZW50X0JlZm9yZV9Gb2cgPSBzaGFkZXJQYXJ0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBGcmFnbWVudF9CZWZvcmVfRmluYWxDb2xvckNvbXBvc2l0aW9uIHBvcnRpb25cclxuICAgICAqIEBwYXJhbSBzaGFkZXJQYXJ0IHRoZSBjb2RlIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZyYWdtZW50X0JlZm9yZV9GaW5hbENvbG9yQ29tcG9zaXRpb24oc2hhZGVyUGFydDogc3RyaW5nKTogUEJSQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMuRnJhZ21lbnRfQmVmb3JlX0ZpbmFsQ29sb3JDb21wb3NpdGlvbiA9IHNoYWRlclBhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIEZyYWdtZW50X0JlZm9yZV9GcmFnQ29sb3IgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfQmVmb3JlX0ZyYWdDb2xvcihzaGFkZXJQYXJ0OiBzdHJpbmcpOiBQQlJDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9CZWZvcmVfRnJhZ0NvbG9yID0gc2hhZGVyUGFydC5yZXBsYWNlKFwicmVzdWx0XCIsIFwiY29sb3JcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIEZyYWdtZW50X01haW5FbmQgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRnJhZ21lbnRfTWFpbkVuZChzaGFkZXJQYXJ0OiBzdHJpbmcpOiBQQlJDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5GcmFnbWVudF9NYWluRW5kID0gc2hhZGVyUGFydDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gVmVydGV4X0JlZ2luIHBvcnRpb25cclxuICAgICAqIEBwYXJhbSBzaGFkZXJQYXJ0IHRoZSBjb2RlIHN0cmluZ1xyXG4gICAgICogQHJldHVybnMgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgICAqL1xyXG4gICAgcHVibGljIFZlcnRleF9CZWdpbihzaGFkZXJQYXJ0OiBzdHJpbmcpOiBQQlJDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5WZXJ0ZXhfQmVnaW4gPSBzaGFkZXJQYXJ0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBWZXJ0ZXhfRGVmaW5pdGlvbnMgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X0RlZmluaXRpb25zKHNoYWRlclBhcnQ6IHN0cmluZyk6IFBCUkN1c3RvbU1hdGVyaWFsIHtcclxuICAgICAgICB0aGlzLkN1c3RvbVBhcnRzLlZlcnRleF9EZWZpbml0aW9ucyA9IHNoYWRlclBhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIFZlcnRleF9NYWluQmVnaW4gcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X01haW5CZWdpbihzaGFkZXJQYXJ0OiBzdHJpbmcpOiBQQlJDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5WZXJ0ZXhfTWFpbkJlZ2luID0gc2hhZGVyUGFydDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gVmVydGV4X0JlZm9yZV9Qb3NpdGlvblVwZGF0ZWQgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X0JlZm9yZV9Qb3NpdGlvblVwZGF0ZWQoc2hhZGVyUGFydDogc3RyaW5nKTogUEJSQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMuVmVydGV4X0JlZm9yZV9Qb3NpdGlvblVwZGF0ZWQgPSBzaGFkZXJQYXJ0LnJlcGxhY2UoXCJyZXN1bHRcIiwgXCJwb3NpdGlvblVwZGF0ZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBjb2RlIG9uIFZlcnRleF9CZWZvcmVfTm9ybWFsVXBkYXRlZCBwb3J0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2hhZGVyUGFydCB0aGUgY29kZSBzdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBWZXJ0ZXhfQmVmb3JlX05vcm1hbFVwZGF0ZWQoc2hhZGVyUGFydDogc3RyaW5nKTogUEJSQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMuVmVydGV4X0JlZm9yZV9Ob3JtYWxVcGRhdGVkID0gc2hhZGVyUGFydC5yZXBsYWNlKFwicmVzdWx0XCIsIFwibm9ybWFsVXBkYXRlZFwiKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGNvZGUgb24gVmVydGV4X0FmdGVyX1dvcmxkUG9zQ29tcHV0ZWQgcG9ydGlvblxyXG4gICAgICogQHBhcmFtIHNoYWRlclBhcnQgdGhlIGNvZGUgc3RyaW5nXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3VycmVudCBtYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVmVydGV4X0FmdGVyX1dvcmxkUG9zQ29tcHV0ZWQoc2hhZGVyUGFydDogc3RyaW5nKTogUEJSQ3VzdG9tTWF0ZXJpYWwge1xyXG4gICAgICAgIHRoaXMuQ3VzdG9tUGFydHMuVmVydGV4X0FmdGVyX1dvcmxkUG9zQ29tcHV0ZWQgPSBzaGFkZXJQYXJ0O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgY29kZSBvbiBWZXJ0ZXhfTWFpbkVuZCBwb3J0aW9uXHJcbiAgICAgKiBAcGFyYW0gc2hhZGVyUGFydCB0aGUgY29kZSBzdHJpbmdcclxuICAgICAqIEByZXR1cm5zIHRoZSBjdXJyZW50IG1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBWZXJ0ZXhfTWFpbkVuZChzaGFkZXJQYXJ0OiBzdHJpbmcpOiBQQlJDdXN0b21NYXRlcmlhbCB7XHJcbiAgICAgICAgdGhpcy5DdXN0b21QYXJ0cy5WZXJ0ZXhfTWFpbkVuZCA9IHNoYWRlclBhcnQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLlBCUkN1c3RvbU1hdGVyaWFsXCIsIFBCUkN1c3RvbU1hdGVyaWFsKTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgTWF0TGliIGZyb20gXCJtYXRlcmlhbHMvY3VzdG9tL2luZGV4XCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBVTUQgbW9kdWxlLlxyXG4gKiBUaGUgZW50cnkgcG9pbnQgZm9yIGEgZnV0dXJlIEVTTSBwYWNrYWdlIHNob3VsZCBiZSBpbmRleC50c1xyXG4gKi9cclxuY29uc3QgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbmlmICh0eXBlb2YgZ2xvYmFsT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBNYXRMaWIpIHtcclxuICAgICAgICAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT05ba2V5XSA9ICg8YW55Pk1hdExpYilba2V5XTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcIm1hdGVyaWFscy9jdXN0b20vaW5kZXhcIjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NYXRlcmlhbHNfZWZmZWN0X187IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG5cblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1Jcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xuXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcbiAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcbiAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn1cblxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xuICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gIH1cbiAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgIHRbcF0gPSBzW3BdO1xuICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXNEZWNvcmF0ZShjdG9yLCBkZXNjcmlwdG9ySW4sIGRlY29yYXRvcnMsIGNvbnRleHRJbiwgaW5pdGlhbGl6ZXJzLCBleHRyYUluaXRpYWxpemVycykge1xuICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcbiAgdmFyIHRhcmdldCA9ICFkZXNjcmlwdG9ySW4gJiYgY3RvciA/IGNvbnRleHRJbltcInN0YXRpY1wiXSA/IGN0b3IgOiBjdG9yLnByb3RvdHlwZSA6IG51bGw7XG4gIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xuICB2YXIgXywgZG9uZSA9IGZhbHNlO1xuICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4uYWNjZXNzKSBjb250ZXh0LmFjY2Vzc1twXSA9IGNvbnRleHRJbi5hY2Nlc3NbcF07XG4gICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xuICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XG4gICAgICBpZiAoa2luZCA9PT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmdldCkpIGRlc2NyaXB0b3IuZ2V0ID0gXztcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnVuc2hpZnQoXyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcbiAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgICAgICBlbHNlIGRlc2NyaXB0b3Jba2V5XSA9IF87XG4gICAgICB9XG4gIH1cbiAgaWYgKHRhcmdldCkgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgY29udGV4dEluLm5hbWUsIGRlc2NyaXB0b3IpO1xuICBkb25lID0gdHJ1ZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XG4gIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGluaXRpYWxpemVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xuICB9XG4gIHJldHVybiB1c2VWYWx1ZSA/IHZhbHVlIDogdm9pZCAwO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcHJvcEtleSh4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGYsIFwibmFtZVwiLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHByZWZpeCA/IFwiXCIuY29uY2F0KHByZWZpeCwgXCIgXCIsIG5hbWUpIDogbmFtZSB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XG4gIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGcgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEl0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpO1xuICByZXR1cm4gZy5uZXh0ID0gdmVyYigwKSwgZ1tcInRocm93XCJdID0gdmVyYigxKSwgZ1tcInJldHVyblwiXSA9IHZlcmIoMiksIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XG4gICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgfVxufVxuXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgb1trMl0gPSBtW2tdO1xufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xuICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XG4gIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICB9XG4gIH07XG4gIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XG4gIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcbiAgaWYgKCFtKSByZXR1cm4gbztcbiAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gIHRyeSB7XG4gICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgfVxuICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cbiAgZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xuICAgICAgfVxuICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gIH1cbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcbiAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XG4gIHJldHVybiBhcjtcbn1cblxuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XG4gIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICByW2tdID0gYVtqXTtcbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XG4gIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICBhcltpXSA9IGZyb21baV07XG4gICAgICB9XG4gIH1cbiAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcbiAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xuICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cbiAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxuICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cbiAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxuICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xuICB2YXIgaSwgcDtcbiAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcbiAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xuICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xuICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XG4gIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcbiAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgcmV0dXJuIGNvb2tlZDtcbn07XG5cbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xufSkgOiBmdW5jdGlvbihvLCB2KSB7XG4gIG9bXCJkZWZhdWx0XCJdID0gdjtcbn07XG5cbnZhciBvd25LZXlzID0gZnVuY3Rpb24obykge1xuICBvd25LZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICB2YXIgYXIgPSBbXTtcbiAgICBmb3IgKHZhciBrIGluIG8pIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgaykpIGFyW2FyLmxlbmd0aF0gPSBrO1xuICAgIHJldHVybiBhcjtcbiAgfTtcbiAgcmV0dXJuIG93bktleXMobyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xuICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayA9IG93bktleXMobW9kKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSBpZiAoa1tpXSAhPT0gXCJkZWZhdWx0XCIpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwga1tpXSk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIHZhciByLCBzID0gMDtcbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XG4gICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XG4gICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHMgfD0gMTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcbiAgfVxuICByZXR1cm4gbmV4dCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xuICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcbiAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xuICAgICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX2VzRGVjb3JhdGUsXG4gIF9fcnVuSW5pdGlhbGl6ZXJzLFxuICBfX3Byb3BLZXksXG4gIF9fc2V0RnVuY3Rpb25OYW1lLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbiAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgbWF0ZXJpYWxzIGZyb20gXCJAbHRzL21hdGVyaWFscy9sZWdhY3kvbGVnYWN5LWN1c3RvbVwiO1xyXG5leHBvcnQgeyBtYXRlcmlhbHMgfTtcclxuZXhwb3J0IGRlZmF1bHQgbWF0ZXJpYWxzO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=