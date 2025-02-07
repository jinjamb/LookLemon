(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-serializers", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-serializers"] = factory(require("babylonjs"));
	else
		root["SERIALIZERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_tools__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/serializers/src/USDZ/index.ts":
/*!**************************************************!*\
  !*** ../../../dev/serializers/src/USDZ/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   USDZExportAsync: () => (/* reexport safe */ _usdzExporter__WEBPACK_IMPORTED_MODULE_0__.USDZExportAsync)
/* harmony export */ });
/* harmony import */ var _usdzExporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./usdzExporter */ "../../../dev/serializers/src/USDZ/usdzExporter.ts");
/* eslint-disable import/no-internal-modules */



/***/ }),

/***/ "../../../dev/serializers/src/USDZ/usdzExporter.ts":
/*!*********************************************************!*\
  !*** ../../../dev/serializers/src/USDZ/usdzExporter.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   USDZExportAsync: () => (/* binding */ USDZExportAsync)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/tools */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__);

/* eslint-disable @typescript-eslint/naming-convention */






function BuildHeader() {
    return "#usda 1.0\n    (\n        customLayerData = {\n            string creator = \"Babylon.js USDZExportAsync\"\n        }\n        defaultPrim = \"Root\"\n        metersPerUnit = 1\n        upAxis = \"Y\"\n    )";
}
function BuildSceneStart(options) {
    var alignment = options.includeAnchoringProperties === true
        ? "\n\t\ttoken preliminary:anchoring:type = \"".concat(options.anchoringType, "\"\n\t\ttoken preliminary:planeAnchoring:alignment = \"").concat(options.planeAnchoringAlignment, "\"")
        : "";
    return "def Xform \"Root\"\n    {\n        def Scope \"Scenes\" (\n            kind = \"sceneLibrary\"\n        )\n        {\n            def Xform \"Scene\" (\n                customData = {\n                    bool preliminary_collidesWithEnvironment = 0\n                    string sceneName = \"Scene\"\n                }\n                sceneName = \"Scene\"\n            )\n            {".concat(alignment, "\n            ");
}
function BuildSceneEnd() {
    return "\n            }\n        }\n    }";
}
function BuildMeshVertexCount(geometry) {
    var _a;
    var count = ((_a = geometry.getIndices()) === null || _a === void 0 ? void 0 : _a.length) ? geometry.getTotalIndices() : geometry.getTotalVertices();
    return Array(count / 3)
        .fill(3)
        .join(", ");
}
function BuildMeshVertexIndices(geometry) {
    var index = geometry.getIndices();
    var array = [];
    if (index !== null) {
        for (var i = 0; i < index.length; i++) {
            array.push(index[i]);
        }
    }
    else {
        var length_1 = geometry.getTotalVertices();
        for (var i = 0; i < length_1; i++) {
            array.push(i);
        }
    }
    return array.join(", ");
}
function BuildVector3Array(attribute, options, stride) {
    if (stride === void 0) { stride = 3; }
    var array = [];
    for (var i = 0; i < attribute.length / stride; i++) {
        var x = attribute[i * stride];
        var y = attribute[i * stride + 1];
        var z = attribute[i * stride + 2];
        array.push("(".concat(x.toPrecision(options.precision), ", ").concat(y.toPrecision(options.precision), ", ").concat(z.toPrecision(options.precision), ")"));
    }
    return array.join(", ");
}
function BuildVector2Array(attribute, options) {
    var array = [];
    for (var i = 0; i < attribute.length / 2; i++) {
        var x = attribute[i * 2];
        var y = attribute[i * 2 + 1];
        array.push("(".concat(x.toPrecision(options.precision), ", ").concat((1 - y).toPrecision(options.precision), ")"));
    }
    return array.join(", ");
}
function BuildAdditionalAttributes(geometry, options) {
    var string = "";
    for (var i = 0; i < 4; i++) {
        var id = i > 0 ? i : "";
        var uvAttribute = geometry.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind + (id ? id : ""));
        if (uvAttribute) {
            string += "\n\t\ttexCoord2f[] primvars:st".concat(id, " = [").concat(BuildVector2Array(uvAttribute, options), "] (\n\t\t\tinterpolation = \"vertex\"\n\t\t)");
        }
    }
    // vertex colors
    var colorAttribute = geometry.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.ColorKind);
    if (colorAttribute) {
        string += "\n\tcolor3f[] primvars:displayColor = [".concat(BuildVector3Array(colorAttribute, options, 4), "] (\n\t\tinterpolation = \"vertex\"\n\t\t)");
    }
    return string;
}
function BuildMesh(geometry, options) {
    var name = "Geometry";
    var position = geometry.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
    var normal = geometry.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
    if (!position || !normal) {
        return;
    }
    return "\n\tdef Mesh \"".concat(name, "\"\n\t{\n\t\tint[] faceVertexCounts = [").concat(BuildMeshVertexCount(geometry), "]\n\t\tint[] faceVertexIndices = [").concat(BuildMeshVertexIndices(geometry), "]\n\t\tnormal3f[] normals = [").concat(BuildVector3Array(normal, options), "] (\n\t\t\tinterpolation = \"vertex\"\n\t\t)\n\t\tpoint3f[] points = [").concat(BuildVector3Array(position, options), "]\n        ").concat(BuildAdditionalAttributes(geometry, options), "\n\t\tuniform token subdivisionScheme = \"none\"\n\t}\n");
}
function BuildMeshObject(geometry, options) {
    var mesh = BuildMesh(geometry, options);
    return "\n        def \"Geometry\"\n        {\n        ".concat(mesh, "\n        }\n        ");
}
function BuildUSDFileAsString(dataToInsert) {
    var output = BuildHeader();
    output += dataToInsert;
    return fflate.strToU8(output);
}
function BuildMatrix(matrix) {
    var array = matrix.m;
    return "( ".concat(BuildMatrixRow(array, 0), ", ").concat(BuildMatrixRow(array, 4), ", ").concat(BuildMatrixRow(array, 8), ", ").concat(BuildMatrixRow(array, 12), " )");
}
function BuildMatrixRow(array, offset) {
    return "(".concat(array[offset + 0], ", ").concat(array[offset + 1], ", ").concat(array[offset + 2], ", ").concat(array[offset + 3], ")");
}
function BuildXform(mesh) {
    var name = "Object_" + mesh.uniqueId;
    var matrix = mesh.getWorldMatrix().clone();
    if (matrix.determinant() < 0) {
        matrix.multiplyToRef(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Matrix.Scaling(-1, 1, 1), matrix);
    }
    var transform = BuildMatrix(matrix);
    return "def Xform \"".concat(name, "\" (\n\tprepend references = @./geometries/Geometry_").concat(mesh.geometry.uniqueId, ".usda@</Geometry>\n\tprepend apiSchemas = [\"MaterialBindingAPI\"]\n)\n{\n\tmatrix4d xformOp:transform = ").concat(transform, "\n\tuniform token[] xformOpOrder = [\"xformOp:transform\"]\t\n\n    rel material:binding = </Materials/Material_").concat(mesh.material.uniqueId, ">\n}\n\n");
}
function BuildMaterials(materials, textureToExports, options) {
    var array = [];
    for (var uuid in materials) {
        var material = materials[uuid];
        array.push(BuildMaterial(material, textureToExports, options));
    }
    return "\n    def \"Materials\"\n{\n".concat(array.join(""), "\n}\n\n");
}
function BuildWrapping(wrapping) {
    switch (wrapping) {
        case babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURE_CLAMP_ADDRESSMODE:
            return "clamp";
        case babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURE_MIRROR_ADDRESSMODE:
            return "mirror";
        case babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Constants.TEXTURE_WRAP_ADDRESSMODE:
        default:
            return "repeat";
    }
}
function BuildColor4(color) {
    return "(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ", 1.0)");
}
function BuildVector2(vector) {
    return "(".concat(vector.x, ", ").concat(vector.y, ")");
}
function BuildColor(color) {
    return "(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ")");
}
function BuildTexture(texture, material, mapType, color, textureToExports, options) {
    var id = texture.getInternalTexture().uniqueId + "_" + texture.invertY;
    textureToExports[id] = texture;
    var uv = texture.coordinatesIndex > 0 ? "st" + texture.coordinatesIndex : "st";
    var repeat = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2(texture.uScale, texture.vScale);
    var offset = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2(texture.uOffset, texture.vOffset);
    var rotation = texture.wAng;
    // rotation is around the wrong point. after rotation we need to shift offset again so that we're rotating around the right spot
    var xRotationOffset = Math.sin(rotation);
    var yRotationOffset = Math.cos(rotation);
    // texture coordinates start in the opposite corner, need to correct
    offset.y = 1 - offset.y - repeat.y;
    offset.x += xRotationOffset * repeat.x;
    offset.y += (1 - yRotationOffset) * repeat.y;
    return "\n    def Shader \"PrimvarReader_".concat(mapType, "\"\n    {\n        uniform token info:id = \"UsdPrimvarReader_float2\"\n        float2 inputs:fallback = (0.0, 0.0)\n        token inputs:varname = \"").concat(uv, "\"\n        float2 outputs:result\n    }\n\n    def Shader \"Transform2d_").concat(mapType, "\"\n    {\n        uniform token info:id = \"UsdTransform2d\"\n        token inputs:in.connect = </Materials/Material_").concat(material.uniqueId, "/PrimvarReader_").concat(mapType, ".outputs:result>\n        float inputs:rotation = ").concat((rotation * (180 / Math.PI)).toFixed(options.precision), "\n        float2 inputs:scale = ").concat(BuildVector2(repeat), "\n        float2 inputs:translation = ").concat(BuildVector2(offset), "\n        float2 outputs:result\n    }\n\n    def Shader \"Texture_").concat(texture.uniqueId, "_").concat(mapType, "\"\n    {\n        uniform token info:id = \"UsdUVTexture\"\n        asset inputs:file = @textures/Texture_").concat(id, ".png@\n        float2 inputs:st.connect = </Materials/Material_").concat(material.uniqueId, "/Transform2d_").concat(mapType, ".outputs:result>\n        ").concat(color ? "float4 inputs:scale = " + BuildColor4(color) : "", "\n        token inputs:sourceColorSpace = \"").concat(texture.gammaSpace ? "raw" : "sRGB", "\"\n        token inputs:wrapS = \"").concat(BuildWrapping(texture.wrapU), "\"\n        token inputs:wrapT = \"").concat(BuildWrapping(texture.wrapV), "\"\n        float outputs:r\n        float outputs:g\n        float outputs:b\n        float3 outputs:rgb\n        ").concat(material.needAlphaBlending() ? "float outputs:a" : "", "\n    }");
}
function ExtractTextureInformations(material) {
    var className = material.getClassName();
    switch (className) {
        case "StandardMaterial":
            return {
                diffuseMap: material.diffuseTexture,
                diffuse: material.diffuseColor,
                alphaCutOff: material.alphaCutOff,
                emissiveMap: material.emissiveTexture,
                emissive: material.emissiveColor,
                roughnessMap: null,
                normalMap: null,
                metalnessMap: null,
                roughness: 1,
                metalness: 0,
                aoMap: null,
                aoMapIntensity: 0,
                alphaMap: material.opacityTexture,
                ior: 1,
            };
        case "PBRMaterial":
            return {
                diffuseMap: material.albedoTexture,
                diffuse: material.albedoColor,
                alphaCutOff: material.alphaCutOff,
                emissiveMap: material.emissiveTexture,
                emissive: material.emissiveColor,
                normalMap: material.bumpTexture,
                roughnessMap: material.metallicTexture,
                roughnessChannel: material.useRoughnessFromMetallicTextureAlpha ? "a" : "g",
                roughness: material.roughness || 1,
                metalnessMap: material.metallicTexture,
                metalnessChannel: material.useMetallnessFromMetallicTextureBlue ? "b" : "r",
                metalness: material.metallic || 0,
                aoMap: material.ambientTexture,
                aoMapChannel: material.useAmbientInGrayScale ? "r" : "rgb",
                aoMapIntensity: material.ambientTextureStrength,
                alphaMap: material.opacityTexture,
                ior: material.indexOfRefraction,
            };
        case "PBRMetallicRoughnessMaterial":
            return {
                diffuseMap: material.baseTexture,
                diffuse: material.baseColor,
                alphaCutOff: material.alphaCutOff,
                emissiveMap: material.emissiveTexture,
                emissive: material.emissiveColor,
                normalMap: material.normalTexture,
                roughnessMap: material.metallicTexture,
                roughnessChannel: material.useRoughnessFromMetallicTextureAlpha ? "a" : "g",
                roughness: material.roughness || 1,
                metalnessMap: material.metallicTexture,
                metalnessChannel: material.useMetallnessFromMetallicTextureBlue ? "b" : "r",
                metalness: material.metallic || 0,
                aoMap: material.ambientTexture,
                aoMapChannel: material.useAmbientInGrayScale ? "r" : "rgb",
                aoMapIntensity: material.ambientTextureStrength,
                alphaMap: material.opacityTexture,
                ior: material.indexOfRefraction,
            };
        default:
            return {
                diffuseMap: null,
                diffuse: null,
                emissiveMap: null,
                emissemissiveiveColor: null,
                normalMap: null,
                roughnessMap: null,
                metalnessMap: null,
                alphaCutOff: 0,
                roughness: 0,
                metalness: 0,
                aoMap: null,
                aoMapIntensity: 0,
                alphaMap: null,
                ior: 1,
            };
    }
}
function BuildMaterial(material, textureToExports, options) {
    // https://graphics.pixar.com/usd/docs/UsdPreviewSurface-Proposal.html
    var pad = "			";
    var inputs = [];
    var samplers = [];
    var _a = ExtractTextureInformations(material), diffuseMap = _a.diffuseMap, diffuse = _a.diffuse, alphaCutOff = _a.alphaCutOff, emissiveMap = _a.emissiveMap, emissive = _a.emissive, normalMap = _a.normalMap, roughnessMap = _a.roughnessMap, roughnessChannel = _a.roughnessChannel, roughness = _a.roughness, metalnessMap = _a.metalnessMap, metalnessChannel = _a.metalnessChannel, metalness = _a.metalness, aoMap = _a.aoMap, aoMapChannel = _a.aoMapChannel, aoMapIntensity = _a.aoMapIntensity, alphaMap = _a.alphaMap, ior = _a.ior;
    if (diffuseMap !== null) {
        inputs.push("".concat(pad, "color3f inputs:diffuseColor.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(diffuseMap.uniqueId, "_diffuse.outputs:rgb>"));
        if (material.needAlphaBlending()) {
            inputs.push("".concat(pad, "float inputs:opacity.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(diffuseMap.uniqueId, "_diffuse.outputs:a>"));
        }
        else if (material.needAlphaTesting()) {
            inputs.push("".concat(pad, "float inputs:opacity.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(diffuseMap.uniqueId, "_diffuse.outputs:a>"));
            inputs.push("".concat(pad, "float inputs:opacityThreshold = ").concat(alphaCutOff));
        }
        samplers.push(BuildTexture(diffuseMap, material, "diffuse", diffuse, textureToExports, options));
    }
    else {
        inputs.push("".concat(pad, "color3f inputs:diffuseColor = ").concat(BuildColor(diffuse || babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3.White())));
    }
    if (emissiveMap !== null) {
        inputs.push("".concat(pad, "color3f inputs:emissiveColor.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(emissiveMap.uniqueId, "_emissive.outputs:rgb>"));
        samplers.push(BuildTexture(emissiveMap, material, "emissive", emissive, textureToExports, options));
    }
    else if (emissive && emissive.toLuminance() > 0) {
        inputs.push("".concat(pad, "color3f inputs:emissiveColor = ").concat(BuildColor(emissive)));
    }
    if (normalMap !== null) {
        inputs.push("".concat(pad, "normal3f inputs:normal.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(normalMap.uniqueId, "_normal.outputs:rgb>"));
        samplers.push(BuildTexture(normalMap, material, "normal", null, textureToExports, options));
    }
    if (aoMap !== null) {
        inputs.push("".concat(pad, "float inputs:occlusion.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(aoMap.uniqueId, "_occlusion.outputs:").concat(aoMapChannel, ">"));
        samplers.push(BuildTexture(aoMap, material, "occlusion", new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3(aoMapIntensity, aoMapIntensity, aoMapIntensity), textureToExports, options));
    }
    if (roughnessMap !== null) {
        inputs.push("".concat(pad, "float inputs:roughness.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(roughnessMap.uniqueId, "_roughness.outputs:").concat(roughnessChannel, ">"));
        samplers.push(BuildTexture(roughnessMap, material, "roughness", new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3(roughness, roughness, roughness), textureToExports, options));
    }
    else {
        inputs.push("".concat(pad, "float inputs:roughness = ").concat(roughness));
    }
    if (metalnessMap !== null) {
        inputs.push("".concat(pad, "float inputs:metallic.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(metalnessMap.uniqueId, "_metallic.outputs:").concat(metalnessChannel, ">"));
        samplers.push(BuildTexture(metalnessMap, material, "metallic", new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3(metalness, metalness, metalness), textureToExports, options));
    }
    else {
        inputs.push("".concat(pad, "float inputs:metallic = ").concat(metalness));
    }
    if (alphaMap !== null) {
        inputs.push("".concat(pad, "float inputs:opacity.connect = </Materials/Material_").concat(material.uniqueId, "/Texture_").concat(alphaMap.uniqueId, "_opacity.outputs:r>"));
        inputs.push("".concat(pad, "float inputs:opacityThreshold = 0.0001"));
        samplers.push(BuildTexture(alphaMap, material, "opacity", null, textureToExports, options));
    }
    else {
        inputs.push("".concat(pad, "float inputs:opacity = ").concat(material.alpha));
    }
    inputs.push("".concat(pad, "float inputs:ior = ").concat(ior));
    return "\n\tdef Material \"Material_".concat(material.uniqueId, "\"\n\t{\n\t\tdef Shader \"PreviewSurface\"\n\t\t{\n\t\t\tuniform token info:id = \"UsdPreviewSurface\"\n").concat(inputs.join("\n"), "\n\t\t\tint inputs:useSpecularWorkflow = 0\n\t\t\ttoken outputs:surface\n\t\t}\n\n\t\ttoken outputs:surface.connect = </Materials/Material_").concat(material.uniqueId, "/PreviewSurface.outputs:surface>\n\n").concat(samplers.join("\n"), "\n\n\t}\n");
}
function BuildCamera(camera, options) {
    var name = "Camera_" + camera.uniqueId;
    var matrix = babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Matrix.RotationY(Math.PI).multiply(camera.getWorldMatrix()); // work towards positive z
    var transform = BuildMatrix(matrix);
    if (camera.mode === babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Constants.ORTHOGRAPHIC_CAMERA) {
        return "def Camera \"".concat(name, "\"\n\t\t{\n\t\t\tmatrix4d xformOp:transform = ").concat(transform, "\n\t\t\tuniform token[] xformOpOrder = [\"xformOp:transform\"]\n\n\t\t\tfloat2 clippingRange = (").concat(camera.minZ.toPrecision(options.precision), ", ").concat(camera.maxZ.toPrecision(options.precision), ")\n\t\t\tfloat horizontalAperture = ").concat(((Math.abs(camera.orthoLeft || 1) + Math.abs(camera.orthoRight || 1)) * 10).toPrecision(options.precision), "\n\t\t\tfloat verticalAperture = ").concat(((Math.abs(camera.orthoTop || 1) + Math.abs(camera.orthoBottom || 1)) * 10).toPrecision(options.precision), "\n\t\t\ttoken projection = \"orthographic\"\n\t\t}\n\t\n\t");
    }
    else {
        var aspect = camera.getEngine().getAspectRatio(camera);
        var sensorwidth = options.cameraSensorWidth || 35;
        return "def Camera \"".concat(name, "\"\n\t\t{\n\t\t\tmatrix4d xformOp:transform = ").concat(transform, "\n\t\t\tuniform token[] xformOpOrder = [\"xformOp:transform\"]\n\n\t\t\tfloat2 clippingRange = (").concat(camera.minZ.toPrecision(options.precision), ", ").concat(camera.maxZ.toPrecision(options.precision), ")\n\t\t\tfloat focalLength = ").concat((sensorwidth / (2 * Math.tan(camera.fov * 0.5))).toPrecision(options.precision), "\n            token projection = \"perspective\"\n\t\t\tfloat horizontalAperture = ").concat((sensorwidth * aspect).toPrecision(options.precision), "\n\t\t\tfloat verticalAperture = ").concat((sensorwidth / aspect).toPrecision(options.precision), "            \n\t\t}\n\t\n\t");
    }
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
function USDZExportAsync(scene, options, meshPredicate) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function () {
        var localOptions, files, output, materialToExports, _i, _a, abstractMesh, mesh, geometry, material, supportedMaterials, geometryFileName, meshObject, textureToExports, _b, _c, _d, _e, id, texture, size, textureData, fileContent, offset, filename, file, headerSize, offsetMod64, padLength, padding;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__generator)(this, function (_f) {
            switch (_f.label) {
                case 0:
                    localOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({ fflateUrl: "https://unpkg.com/fflate@0.8.2", includeAnchoringProperties: true, anchoringType: "plane", planeAnchoringAlignment: "horizontal", modelFileName: "model.usda", precision: 5, exportCamera: false, cameraSensorWidth: 35 }, options);
                    if (!(typeof fflate === "undefined")) return [3 /*break*/, 2];
                    return [4 /*yield*/, babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Tools.LoadScriptAsync(localOptions.fflateUrl)];
                case 1:
                    _f.sent();
                    _f.label = 2;
                case 2:
                    files = {};
                    // model file should be first in USDZ archive so we init it here
                    files[localOptions.modelFileName] = null;
                    output = BuildHeader();
                    output += BuildSceneStart(localOptions);
                    materialToExports = {};
                    // Meshes
                    for (_i = 0, _a = scene.meshes; _i < _a.length; _i++) {
                        abstractMesh = _a[_i];
                        if (abstractMesh.getTotalVertices() === 0) {
                            continue;
                        }
                        mesh = abstractMesh;
                        geometry = mesh.geometry;
                        material = mesh.material;
                        if (!material || !geometry || (meshPredicate && !meshPredicate(mesh))) {
                            continue;
                        }
                        supportedMaterials = ["StandardMaterial", "PBRMaterial", "PBRMetallicRoughnessMaterial"];
                        if (supportedMaterials.indexOf(material.getClassName()) !== -1) {
                            geometryFileName = "geometries/Geometry_" + geometry.uniqueId + ".usda";
                            if (!(geometryFileName in files)) {
                                meshObject = BuildMeshObject(geometry, localOptions);
                                files[geometryFileName] = BuildUSDFileAsString(meshObject);
                            }
                            if (!(material.uniqueId in materialToExports)) {
                                materialToExports[material.uniqueId] = material;
                            }
                            output += BuildXform(mesh);
                        }
                        else {
                            babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("USDZExportAsync does not support this material type: " + material.getClassName());
                        }
                    }
                    // Camera
                    if (scene.activeCamera && localOptions.exportCamera) {
                        output += BuildCamera(scene.activeCamera, localOptions);
                    }
                    // Close scene
                    output += BuildSceneEnd();
                    textureToExports = {};
                    output += BuildMaterials(materialToExports, textureToExports, localOptions);
                    // Compress
                    files[localOptions.modelFileName] = fflate.strToU8(output);
                    _b = textureToExports;
                    _c = [];
                    for (_d in _b)
                        _c.push(_d);
                    _e = 0;
                    _f.label = 3;
                case 3:
                    if (!(_e < _c.length)) return [3 /*break*/, 7];
                    _d = _c[_e];
                    if (!(_d in _b)) return [3 /*break*/, 6];
                    id = _d;
                    texture = textureToExports[id];
                    size = texture.getSize();
                    return [4 /*yield*/, texture.readPixels()];
                case 4:
                    textureData = _f.sent();
                    if (!textureData) {
                        throw new Error("Texture data is not available");
                    }
                    return [4 /*yield*/, babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.DumpTools.DumpDataAsync(size.width, size.height, textureData, "image/png", undefined, false, true)];
                case 5:
                    fileContent = _f.sent();
                    files["textures/Texture_".concat(id, ".png")] = new Uint8Array(fileContent).slice(); // This is to avoid getting a link and not a copy
                    _f.label = 6;
                case 6:
                    _e++;
                    return [3 /*break*/, 3];
                case 7:
                    offset = 0;
                    for (filename in files) {
                        file = files[filename];
                        if (!file) {
                            continue;
                        }
                        headerSize = 34 + filename.length;
                        offset += headerSize;
                        offsetMod64 = offset & 63;
                        if (offsetMod64 !== 4) {
                            padLength = 64 - offsetMod64;
                            padding = new Uint8Array(padLength);
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            files[filename] = [file, { extra: { 12345: padding } }];
                        }
                        offset = file.length;
                    }
                    return [2 /*return*/, fflate.zipSync(files, { level: 0 })];
            }
        });
    });
}


/***/ }),

/***/ "../../../lts/serializers/src/legacy/legacy-usdzSerializer.ts":
/*!********************************************************************!*\
  !*** ../../../lts/serializers/src/legacy/legacy-usdzSerializer.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   USDZExportAsync: () => (/* reexport safe */ serializers_USDZ_index__WEBPACK_IMPORTED_MODULE_0__.USDZExportAsync)
/* harmony export */ });
/* harmony import */ var serializers_USDZ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serializers/USDZ/index */ "../../../dev/serializers/src/USDZ/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var serializer in serializers_USDZ_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[serializer] = serializers_USDZ_index__WEBPACK_IMPORTED_MODULE_0__[serializer];
    }
}



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
/*!*********************!*\
  !*** ./src/USDZ.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   serializers: () => (/* reexport module object */ _lts_serializers_legacy_legacy_usdzSerializer__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_serializers_legacy_legacy_usdzSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/serializers/legacy/legacy-usdzSerializer */ "../../../lts/serializers/src/legacy/legacy-usdzSerializer.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_serializers_legacy_legacy_usdzSerializer__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi51c2R6U2VyaWFsaXplci5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUVBO0FBT0E7QUFDQTtBQUdBO0FBQ0E7QUFrREE7QUFDQTtBQVNBO0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQWVBO0FBRUE7QUFDQTtBQUlBO0FBRUE7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQWFBO0FBRUE7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBWUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBUUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQWtDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBb0JBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFpQkE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFZQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBYUE7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBOzs7Ozs7QUFDQTtBQWFBO0FBQ0E7O0FBQUE7OztBQUlBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTs7Ozs7Ozs7Ozs7QUFDQTtBQUVBO0FBQ0E7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7QUFBQTtBQUVBOzs7Ozs7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3h0QkE7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQ2RBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2haQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vZGV2L3NlcmlhbGl6ZXJzL3NyYy9VU0RaL2luZGV4LnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2Rldi9zZXJpYWxpemVycy9zcmMvVVNEWi91c2R6RXhwb3J0ZXIudHMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vbHRzL3NlcmlhbGl6ZXJzL3NyYy9sZWdhY3kvbGVnYWN5LXVzZHpTZXJpYWxpemVyLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5tanMiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1NFUklBTElaRVJTLy4vc3JjL1VTRFoudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiYmFieWxvbmpzLXNlcmlhbGl6ZXJzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtc2VyaWFsaXplcnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNFUklBTElaRVJTXCJdID0gZmFjdG9yeShyb290W1wiQkFCWUxPTlwiXSk7XG59KSgodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHRoaXMpLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9iYWJ5bG9uanNfTWlzY190b29sc19fKSA9PiB7XG5yZXR1cm4gIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuZXhwb3J0ICogZnJvbSBcIi4vdXNkekV4cG9ydGVyXCI7XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvbiAqL1xyXG5pbXBvcnQgeyBWZXJ0ZXhCdWZmZXIgfSBmcm9tIFwiY29yZS9CdWZmZXJzL2J1ZmZlclwiO1xyXG5pbXBvcnQgdHlwZSB7IENhbWVyYSB9IGZyb20gXCJjb3JlL0NhbWVyYXMvY2FtZXJhXCI7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gXCJjb3JlL0VuZ2luZXMvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0ZXJpYWwgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBQQlJNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9QQlIvcGJyTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBQQlJNZXRhbGxpY1JvdWdobmVzc01hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1BCUi9wYnJNZXRhbGxpY1JvdWdobmVzc01hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgU3RhbmRhcmRNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9zdGFuZGFyZE1hdGVyaWFsXCI7XHJcbmltcG9ydCB0eXBlIHsgQmFzZVRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvYmFzZVRleHR1cmVcIjtcclxuaW1wb3J0IHR5cGUgeyBUZXh0dXJlIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL1RleHR1cmVzL3RleHR1cmVcIjtcclxuaW1wb3J0IHsgQ29sb3IzIH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC5jb2xvclwiO1xyXG5pbXBvcnQgeyBNYXRyaXgsIFZlY3RvcjIgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgdHlwZSB7IEdlb21ldHJ5IH0gZnJvbSBcImNvcmUvTWVzaGVzL2dlb21ldHJ5XCI7XHJcbmltcG9ydCB0eXBlIHsgTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9tZXNoXCI7XHJcbmltcG9ydCB7IER1bXBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvZHVtcFRvb2xzXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcImNvcmUvTWlzYy90b29sc1wiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHR5cGUgeyBGbG9hdEFycmF5LCBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcblxyXG4vKipcclxuICogUG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21yZG9vYi90aHJlZS5qcy9ibG9iL21hc3Rlci9leGFtcGxlcy9qc20vZXhwb3J0ZXJzL1VTRFpFeHBvcnRlci5qc1xyXG4gKiBUaGFua3MgYSBsb3QgdG8gdGhlIHRocmVlLmpzIHRlYW0gZm9yIHRoZWlyIGFtYXppbmcgd29yayFcclxuICovXHJcblxyXG4vLyBGRmxhdGUgYWNjZXNzXHJcbmRlY2xhcmUgY29uc3QgZmZsYXRlOiBhbnk7XHJcblxyXG4vKipcclxuICogT3B0aW9ucyBmb3IgdGhlIFVTRFogZXhwb3J0XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElVU0RaRXhwb3J0T3B0aW9ucyB7XHJcbiAgICAvKipcclxuICAgICAqIFVSTCB0byBsb2FkIHRoZSBmZmxhdGUgbGlicmFyeSBmcm9tXHJcbiAgICAgKi9cclxuICAgIGZmbGF0ZVVybD86IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogSW5jbHVkZSBhbmNob3JpbmcgcHJvcGVydGllcyBpbiB0aGUgVVNEWiBmaWxlXHJcbiAgICAgKi9cclxuICAgIGluY2x1ZGVBbmNob3JpbmdQcm9wZXJ0aWVzPzogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogQW5jaG9yaW5nIHR5cGUgKHBsYW5lIGJ5IGRlZmF1bHQpXHJcbiAgICAgKi9cclxuICAgIGFuY2hvcmluZ1R5cGU/OiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIFBsYW5lIGFuY2hvcmluZyBhbGlnbm1lbnQgKGhvcml6b250YWwgYnkgZGVmYXVsdClcclxuICAgICAqL1xyXG4gICAgcGxhbmVBbmNob3JpbmdBbGlnbm1lbnQ/OiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIE1vZGVsIGZpbGUgbmFtZSAobW9kZWwudXNkYSBieSBkZWZhdWx0KVxyXG4gICAgICovXHJcbiAgICBtb2RlbEZpbGVOYW1lPzogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcmVjaXNpb24gdG8gdXNlIGZvciBudW1iZXIgKDUgYnkgZGVmYXVsdClcclxuICAgICAqL1xyXG4gICAgcHJlY2lzaW9uPzogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnQgdGhlIGNhbWVyYSAoZmFsc2UgYnkgZGVmYXVsdClcclxuICAgICAqL1xyXG4gICAgZXhwb3J0Q2FtZXJhPzogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogQ2FtZXJhIHNlbnNvciB3aWR0aCAoMzUgYnkgZGVmYXVsdClcclxuICAgICAqL1xyXG4gICAgY2FtZXJhU2Vuc29yV2lkdGg/OiBudW1iZXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkSGVhZGVyKCkge1xyXG4gICAgcmV0dXJuIGAjdXNkYSAxLjBcclxuICAgIChcclxuICAgICAgICBjdXN0b21MYXllckRhdGEgPSB7XHJcbiAgICAgICAgICAgIHN0cmluZyBjcmVhdG9yID0gXCJCYWJ5bG9uLmpzIFVTRFpFeHBvcnRBc3luY1wiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHRQcmltID0gXCJSb290XCJcclxuICAgICAgICBtZXRlcnNQZXJVbml0ID0gMVxyXG4gICAgICAgIHVwQXhpcyA9IFwiWVwiXHJcbiAgICApYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRTY2VuZVN0YXJ0KG9wdGlvbnM6IElVU0RaRXhwb3J0T3B0aW9ucykge1xyXG4gICAgY29uc3QgYWxpZ25tZW50ID1cclxuICAgICAgICBvcHRpb25zLmluY2x1ZGVBbmNob3JpbmdQcm9wZXJ0aWVzID09PSB0cnVlXHJcbiAgICAgICAgICAgID8gYFxyXG5cdFx0dG9rZW4gcHJlbGltaW5hcnk6YW5jaG9yaW5nOnR5cGUgPSBcIiR7b3B0aW9ucy5hbmNob3JpbmdUeXBlfVwiXHJcblx0XHR0b2tlbiBwcmVsaW1pbmFyeTpwbGFuZUFuY2hvcmluZzphbGlnbm1lbnQgPSBcIiR7b3B0aW9ucy5wbGFuZUFuY2hvcmluZ0FsaWdubWVudH1cImBcclxuICAgICAgICAgICAgOiBcIlwiO1xyXG4gICAgcmV0dXJuIGBkZWYgWGZvcm0gXCJSb290XCJcclxuICAgIHtcclxuICAgICAgICBkZWYgU2NvcGUgXCJTY2VuZXNcIiAoXHJcbiAgICAgICAgICAgIGtpbmQgPSBcInNjZW5lTGlicmFyeVwiXHJcbiAgICAgICAgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGVmIFhmb3JtIFwiU2NlbmVcIiAoXHJcbiAgICAgICAgICAgICAgICBjdXN0b21EYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgcHJlbGltaW5hcnlfY29sbGlkZXNXaXRoRW52aXJvbm1lbnQgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIHNjZW5lTmFtZSA9IFwiU2NlbmVcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2NlbmVOYW1lID0gXCJTY2VuZVwiXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgeyR7YWxpZ25tZW50fVxyXG4gICAgICAgICAgICBgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZFNjZW5lRW5kKCkge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZE1lc2hWZXJ0ZXhDb3VudChnZW9tZXRyeTogR2VvbWV0cnkpIHtcclxuICAgIGNvbnN0IGNvdW50ID0gZ2VvbWV0cnkuZ2V0SW5kaWNlcygpPy5sZW5ndGggPyBnZW9tZXRyeS5nZXRUb3RhbEluZGljZXMoKSA6IGdlb21ldHJ5LmdldFRvdGFsVmVydGljZXMoKTtcclxuXHJcbiAgICByZXR1cm4gQXJyYXkoY291bnQgLyAzKVxyXG4gICAgICAgIC5maWxsKDMpXHJcbiAgICAgICAgLmpvaW4oXCIsIFwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRNZXNoVmVydGV4SW5kaWNlcyhnZW9tZXRyeTogR2VvbWV0cnkpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gZ2VvbWV0cnkuZ2V0SW5kaWNlcygpO1xyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuXHJcbiAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goaW5kZXhbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gZ2VvbWV0cnkuZ2V0VG90YWxWZXJ0aWNlcygpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcnJheS5qb2luKFwiLCBcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkVmVjdG9yM0FycmF5KGF0dHJpYnV0ZTogRmxvYXRBcnJheSwgb3B0aW9uczogSVVTRFpFeHBvcnRPcHRpb25zLCBzdHJpZGUgPSAzKSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cmlidXRlLmxlbmd0aCAvIHN0cmlkZTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGF0dHJpYnV0ZVtpICogc3RyaWRlXTtcclxuICAgICAgICBjb25zdCB5ID0gYXR0cmlidXRlW2kgKiBzdHJpZGUgKyAxXTtcclxuICAgICAgICBjb25zdCB6ID0gYXR0cmlidXRlW2kgKiBzdHJpZGUgKyAyXTtcclxuXHJcbiAgICAgICAgYXJyYXkucHVzaChgKCR7eC50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9LCAke3kudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSwgJHt6LnRvUHJlY2lzaW9uKG9wdGlvbnMucHJlY2lzaW9uKX0pYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFycmF5LmpvaW4oXCIsIFwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRWZWN0b3IyQXJyYXkoYXR0cmlidXRlOiBGbG9hdEFycmF5LCBvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGUubGVuZ3RoIC8gMjsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGF0dHJpYnV0ZVtpICogMl07XHJcbiAgICAgICAgY29uc3QgeSA9IGF0dHJpYnV0ZVtpICogMiArIDFdO1xyXG5cclxuICAgICAgICBhcnJheS5wdXNoKGAoJHt4LnRvUHJlY2lzaW9uKG9wdGlvbnMucHJlY2lzaW9uKX0sICR7KDEgLSB5KS50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9KWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcnJheS5qb2luKFwiLCBcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkQWRkaXRpb25hbEF0dHJpYnV0ZXMoZ2VvbWV0cnk6IEdlb21ldHJ5LCBvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnMpIHtcclxuICAgIGxldCBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBpID4gMCA/IGkgOiBcIlwiO1xyXG4gICAgICAgIGNvbnN0IHV2QXR0cmlidXRlID0gZ2VvbWV0cnkuZ2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5VVktpbmQgKyAoaWQgPyBpZCA6IFwiXCIpKTtcclxuXHJcbiAgICAgICAgaWYgKHV2QXR0cmlidXRlKSB7XHJcbiAgICAgICAgICAgIHN0cmluZyArPSBgXHJcblx0XHR0ZXhDb29yZDJmW10gcHJpbXZhcnM6c3Qke2lkfSA9IFske0J1aWxkVmVjdG9yMkFycmF5KHV2QXR0cmlidXRlLCBvcHRpb25zKX1dIChcclxuXHRcdFx0aW50ZXJwb2xhdGlvbiA9IFwidmVydGV4XCJcclxuXHRcdClgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB2ZXJ0ZXggY29sb3JzXHJcblxyXG4gICAgY29uc3QgY29sb3JBdHRyaWJ1dGUgPSBnZW9tZXRyeS5nZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLkNvbG9yS2luZCk7XHJcblxyXG4gICAgaWYgKGNvbG9yQXR0cmlidXRlKSB7XHJcbiAgICAgICAgc3RyaW5nICs9IGBcclxuXHRjb2xvcjNmW10gcHJpbXZhcnM6ZGlzcGxheUNvbG9yID0gWyR7QnVpbGRWZWN0b3IzQXJyYXkoY29sb3JBdHRyaWJ1dGUsIG9wdGlvbnMsIDQpfV0gKFxyXG5cdFx0aW50ZXJwb2xhdGlvbiA9IFwidmVydGV4XCJcclxuXHRcdClgO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdHJpbmc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkTWVzaChnZW9tZXRyeTogR2VvbWV0cnksIG9wdGlvbnM6IElVU0RaRXhwb3J0T3B0aW9ucykge1xyXG4gICAgY29uc3QgbmFtZSA9IFwiR2VvbWV0cnlcIjtcclxuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2VvbWV0cnkuZ2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQpO1xyXG4gICAgY29uc3Qgbm9ybWFsID0gZ2VvbWV0cnkuZ2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQpO1xyXG5cclxuICAgIGlmICghcG9zaXRpb24gfHwgIW5vcm1hbCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYFxyXG5cdGRlZiBNZXNoIFwiJHtuYW1lfVwiXHJcblx0e1xyXG5cdFx0aW50W10gZmFjZVZlcnRleENvdW50cyA9IFske0J1aWxkTWVzaFZlcnRleENvdW50KGdlb21ldHJ5KX1dXHJcblx0XHRpbnRbXSBmYWNlVmVydGV4SW5kaWNlcyA9IFske0J1aWxkTWVzaFZlcnRleEluZGljZXMoZ2VvbWV0cnkpfV1cclxuXHRcdG5vcm1hbDNmW10gbm9ybWFscyA9IFske0J1aWxkVmVjdG9yM0FycmF5KG5vcm1hbCwgb3B0aW9ucyl9XSAoXHJcblx0XHRcdGludGVycG9sYXRpb24gPSBcInZlcnRleFwiXHJcblx0XHQpXHJcblx0XHRwb2ludDNmW10gcG9pbnRzID0gWyR7QnVpbGRWZWN0b3IzQXJyYXkocG9zaXRpb24sIG9wdGlvbnMpfV1cclxuICAgICAgICAke0J1aWxkQWRkaXRpb25hbEF0dHJpYnV0ZXMoZ2VvbWV0cnksIG9wdGlvbnMpfVxyXG5cdFx0dW5pZm9ybSB0b2tlbiBzdWJkaXZpc2lvblNjaGVtZSA9IFwibm9uZVwiXHJcblx0fVxyXG5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZE1lc2hPYmplY3QoZ2VvbWV0cnk6IEdlb21ldHJ5LCBvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG1lc2ggPSBCdWlsZE1lc2goZ2VvbWV0cnksIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICBkZWYgXCJHZW9tZXRyeVwiXHJcbiAgICAgICAge1xyXG4gICAgICAgICR7bWVzaH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRVU0RGaWxlQXNTdHJpbmcoZGF0YVRvSW5zZXJ0OiBzdHJpbmcpIHtcclxuICAgIGxldCBvdXRwdXQgPSBCdWlsZEhlYWRlcigpO1xyXG4gICAgb3V0cHV0ICs9IGRhdGFUb0luc2VydDtcclxuICAgIHJldHVybiBmZmxhdGUuc3RyVG9VOChvdXRwdXQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZE1hdHJpeChtYXRyaXg6IE1hdHJpeCkge1xyXG4gICAgY29uc3QgYXJyYXkgPSBtYXRyaXgubSBhcyBudW1iZXJbXTtcclxuXHJcbiAgICByZXR1cm4gYCggJHtCdWlsZE1hdHJpeFJvdyhhcnJheSwgMCl9LCAke0J1aWxkTWF0cml4Um93KGFycmF5LCA0KX0sICR7QnVpbGRNYXRyaXhSb3coYXJyYXksIDgpfSwgJHtCdWlsZE1hdHJpeFJvdyhhcnJheSwgMTIpfSApYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRNYXRyaXhSb3coYXJyYXk6IG51bWJlcltdLCBvZmZzZXQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGAoJHthcnJheVtvZmZzZXQgKyAwXX0sICR7YXJyYXlbb2Zmc2V0ICsgMV19LCAke2FycmF5W29mZnNldCArIDJdfSwgJHthcnJheVtvZmZzZXQgKyAzXX0pYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRYZm9ybShtZXNoOiBNZXNoKSB7XHJcbiAgICBjb25zdCBuYW1lID0gXCJPYmplY3RfXCIgKyBtZXNoLnVuaXF1ZUlkO1xyXG4gICAgY29uc3QgbWF0cml4ID0gbWVzaC5nZXRXb3JsZE1hdHJpeCgpLmNsb25lKCk7XHJcblxyXG4gICAgaWYgKG1hdHJpeC5kZXRlcm1pbmFudCgpIDwgMCkge1xyXG4gICAgICAgIG1hdHJpeC5tdWx0aXBseVRvUmVmKE1hdHJpeC5TY2FsaW5nKC0xLCAxLCAxKSwgbWF0cml4KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRyYW5zZm9ybSA9IEJ1aWxkTWF0cml4KG1hdHJpeCk7XHJcblxyXG4gICAgcmV0dXJuIGBkZWYgWGZvcm0gXCIke25hbWV9XCIgKFxyXG5cdHByZXBlbmQgcmVmZXJlbmNlcyA9IEAuL2dlb21ldHJpZXMvR2VvbWV0cnlfJHttZXNoLmdlb21ldHJ5IS51bmlxdWVJZH0udXNkYUA8L0dlb21ldHJ5PlxyXG5cdHByZXBlbmQgYXBpU2NoZW1hcyA9IFtcIk1hdGVyaWFsQmluZGluZ0FQSVwiXVxyXG4pXHJcbntcclxuXHRtYXRyaXg0ZCB4Zm9ybU9wOnRyYW5zZm9ybSA9ICR7dHJhbnNmb3JtfVxyXG5cdHVuaWZvcm0gdG9rZW5bXSB4Zm9ybU9wT3JkZXIgPSBbXCJ4Zm9ybU9wOnRyYW5zZm9ybVwiXVx0XHJcblxyXG4gICAgcmVsIG1hdGVyaWFsOmJpbmRpbmcgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21lc2gubWF0ZXJpYWwhLnVuaXF1ZUlkfT5cclxufVxyXG5cclxuYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRNYXRlcmlhbHMobWF0ZXJpYWxzOiB7IFtrZXk6IHN0cmluZ106IE1hdGVyaWFsIH0sIHRleHR1cmVUb0V4cG9ydHM6IHsgW2tleTogc3RyaW5nXTogQmFzZVRleHR1cmUgfSwgb3B0aW9uczogSVVTRFpFeHBvcnRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgdXVpZCBpbiBtYXRlcmlhbHMpIHtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG1hdGVyaWFsc1t1dWlkXTtcclxuXHJcbiAgICAgICAgYXJyYXkucHVzaChCdWlsZE1hdGVyaWFsKG1hdGVyaWFsLCB0ZXh0dXJlVG9FeHBvcnRzLCBvcHRpb25zKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgIGRlZiBcIk1hdGVyaWFsc1wiXHJcbntcclxuJHthcnJheS5qb2luKFwiXCIpfVxyXG59XHJcblxyXG5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZFdyYXBwaW5nKHdyYXBwaW5nOiBudW1iZXIpIHtcclxuICAgIHN3aXRjaCAod3JhcHBpbmcpIHtcclxuICAgICAgICBjYXNlIENvbnN0YW50cy5URVhUVVJFX0NMQU1QX0FERFJFU1NNT0RFOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJjbGFtcFwiO1xyXG4gICAgICAgIGNhc2UgQ29uc3RhbnRzLlRFWFRVUkVfTUlSUk9SX0FERFJFU1NNT0RFOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJtaXJyb3JcIjtcclxuICAgICAgICBjYXNlIENvbnN0YW50cy5URVhUVVJFX1dSQVBfQUREUkVTU01PREU6XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIFwicmVwZWF0XCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkQ29sb3I0KGNvbG9yOiBDb2xvcjMpIHtcclxuICAgIHJldHVybiBgKCR7Y29sb3Iucn0sICR7Y29sb3IuZ30sICR7Y29sb3IuYn0sIDEuMClgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCdWlsZFZlY3RvcjIodmVjdG9yOiBWZWN0b3IyKSB7XHJcbiAgICByZXR1cm4gYCgke3ZlY3Rvci54fSwgJHt2ZWN0b3IueX0pYDtcclxufVxyXG5cclxuZnVuY3Rpb24gQnVpbGRDb2xvcihjb2xvcjogQ29sb3IzKSB7XHJcbiAgICByZXR1cm4gYCgke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkVGV4dHVyZShcclxuICAgIHRleHR1cmU6IFRleHR1cmUsXHJcbiAgICBtYXRlcmlhbDogTWF0ZXJpYWwsXHJcbiAgICBtYXBUeXBlOiBzdHJpbmcsXHJcbiAgICBjb2xvcjogTnVsbGFibGU8Q29sb3IzPixcclxuICAgIHRleHR1cmVUb0V4cG9ydHM6IHsgW2tleTogc3RyaW5nXTogQmFzZVRleHR1cmUgfSxcclxuICAgIG9wdGlvbnM6IElVU0RaRXhwb3J0T3B0aW9uc1xyXG4pIHtcclxuICAgIGNvbnN0IGlkID0gdGV4dHVyZS5nZXRJbnRlcm5hbFRleHR1cmUoKSEudW5pcXVlSWQgKyBcIl9cIiArIHRleHR1cmUuaW52ZXJ0WTtcclxuXHJcbiAgICB0ZXh0dXJlVG9FeHBvcnRzW2lkXSA9IHRleHR1cmU7XHJcblxyXG4gICAgY29uc3QgdXYgPSB0ZXh0dXJlLmNvb3JkaW5hdGVzSW5kZXggPiAwID8gXCJzdFwiICsgdGV4dHVyZS5jb29yZGluYXRlc0luZGV4IDogXCJzdFwiO1xyXG4gICAgY29uc3QgcmVwZWF0ID0gbmV3IFZlY3RvcjIodGV4dHVyZS51U2NhbGUsIHRleHR1cmUudlNjYWxlKTtcclxuICAgIGNvbnN0IG9mZnNldCA9IG5ldyBWZWN0b3IyKHRleHR1cmUudU9mZnNldCwgdGV4dHVyZS52T2Zmc2V0KTtcclxuICAgIGNvbnN0IHJvdGF0aW9uID0gdGV4dHVyZS53QW5nO1xyXG5cclxuICAgIC8vIHJvdGF0aW9uIGlzIGFyb3VuZCB0aGUgd3JvbmcgcG9pbnQuIGFmdGVyIHJvdGF0aW9uIHdlIG5lZWQgdG8gc2hpZnQgb2Zmc2V0IGFnYWluIHNvIHRoYXQgd2UncmUgcm90YXRpbmcgYXJvdW5kIHRoZSByaWdodCBzcG90XHJcbiAgICBjb25zdCB4Um90YXRpb25PZmZzZXQgPSBNYXRoLnNpbihyb3RhdGlvbik7XHJcbiAgICBjb25zdCB5Um90YXRpb25PZmZzZXQgPSBNYXRoLmNvcyhyb3RhdGlvbik7XHJcblxyXG4gICAgLy8gdGV4dHVyZSBjb29yZGluYXRlcyBzdGFydCBpbiB0aGUgb3Bwb3NpdGUgY29ybmVyLCBuZWVkIHRvIGNvcnJlY3RcclxuICAgIG9mZnNldC55ID0gMSAtIG9mZnNldC55IC0gcmVwZWF0Lnk7XHJcblxyXG4gICAgb2Zmc2V0LnggKz0geFJvdGF0aW9uT2Zmc2V0ICogcmVwZWF0Lng7XHJcbiAgICBvZmZzZXQueSArPSAoMSAtIHlSb3RhdGlvbk9mZnNldCkgKiByZXBlYXQueTtcclxuXHJcbiAgICByZXR1cm4gYFxyXG4gICAgZGVmIFNoYWRlciBcIlByaW12YXJSZWFkZXJfJHttYXBUeXBlfVwiXHJcbiAgICB7XHJcbiAgICAgICAgdW5pZm9ybSB0b2tlbiBpbmZvOmlkID0gXCJVc2RQcmltdmFyUmVhZGVyX2Zsb2F0MlwiXHJcbiAgICAgICAgZmxvYXQyIGlucHV0czpmYWxsYmFjayA9ICgwLjAsIDAuMClcclxuICAgICAgICB0b2tlbiBpbnB1dHM6dmFybmFtZSA9IFwiJHt1dn1cIlxyXG4gICAgICAgIGZsb2F0MiBvdXRwdXRzOnJlc3VsdFxyXG4gICAgfVxyXG5cclxuICAgIGRlZiBTaGFkZXIgXCJUcmFuc2Zvcm0yZF8ke21hcFR5cGV9XCJcclxuICAgIHtcclxuICAgICAgICB1bmlmb3JtIHRva2VuIGluZm86aWQgPSBcIlVzZFRyYW5zZm9ybTJkXCJcclxuICAgICAgICB0b2tlbiBpbnB1dHM6aW4uY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1ByaW12YXJSZWFkZXJfJHttYXBUeXBlfS5vdXRwdXRzOnJlc3VsdD5cclxuICAgICAgICBmbG9hdCBpbnB1dHM6cm90YXRpb24gPSAkeyhyb3RhdGlvbiAqICgxODAgLyBNYXRoLlBJKSkudG9GaXhlZChvcHRpb25zLnByZWNpc2lvbil9XHJcbiAgICAgICAgZmxvYXQyIGlucHV0czpzY2FsZSA9ICR7QnVpbGRWZWN0b3IyKHJlcGVhdCl9XHJcbiAgICAgICAgZmxvYXQyIGlucHV0czp0cmFuc2xhdGlvbiA9ICR7QnVpbGRWZWN0b3IyKG9mZnNldCl9XHJcbiAgICAgICAgZmxvYXQyIG91dHB1dHM6cmVzdWx0XHJcbiAgICB9XHJcblxyXG4gICAgZGVmIFNoYWRlciBcIlRleHR1cmVfJHt0ZXh0dXJlLnVuaXF1ZUlkfV8ke21hcFR5cGV9XCJcclxuICAgIHtcclxuICAgICAgICB1bmlmb3JtIHRva2VuIGluZm86aWQgPSBcIlVzZFVWVGV4dHVyZVwiXHJcbiAgICAgICAgYXNzZXQgaW5wdXRzOmZpbGUgPSBAdGV4dHVyZXMvVGV4dHVyZV8ke2lkfS5wbmdAXHJcbiAgICAgICAgZmxvYXQyIGlucHV0czpzdC5jb25uZWN0ID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttYXRlcmlhbC51bmlxdWVJZH0vVHJhbnNmb3JtMmRfJHttYXBUeXBlfS5vdXRwdXRzOnJlc3VsdD5cclxuICAgICAgICAke2NvbG9yID8gXCJmbG9hdDQgaW5wdXRzOnNjYWxlID0gXCIgKyBCdWlsZENvbG9yNChjb2xvcikgOiBcIlwifVxyXG4gICAgICAgIHRva2VuIGlucHV0czpzb3VyY2VDb2xvclNwYWNlID0gXCIke3RleHR1cmUuZ2FtbWFTcGFjZSA/IFwicmF3XCIgOiBcInNSR0JcIn1cIlxyXG4gICAgICAgIHRva2VuIGlucHV0czp3cmFwUyA9IFwiJHtCdWlsZFdyYXBwaW5nKHRleHR1cmUud3JhcFUpfVwiXHJcbiAgICAgICAgdG9rZW4gaW5wdXRzOndyYXBUID0gXCIke0J1aWxkV3JhcHBpbmcodGV4dHVyZS53cmFwVil9XCJcclxuICAgICAgICBmbG9hdCBvdXRwdXRzOnJcclxuICAgICAgICBmbG9hdCBvdXRwdXRzOmdcclxuICAgICAgICBmbG9hdCBvdXRwdXRzOmJcclxuICAgICAgICBmbG9hdDMgb3V0cHV0czpyZ2JcclxuICAgICAgICAke21hdGVyaWFsLm5lZWRBbHBoYUJsZW5kaW5nKCkgPyBcImZsb2F0IG91dHB1dHM6YVwiIDogXCJcIn1cclxuICAgIH1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBFeHRyYWN0VGV4dHVyZUluZm9ybWF0aW9ucyhtYXRlcmlhbDogTWF0ZXJpYWwpIHtcclxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IG1hdGVyaWFsLmdldENsYXNzTmFtZSgpO1xyXG5cclxuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgY2FzZSBcIlN0YW5kYXJkTWF0ZXJpYWxcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGRpZmZ1c2VNYXA6IChtYXRlcmlhbCBhcyBTdGFuZGFyZE1hdGVyaWFsKS5kaWZmdXNlVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGRpZmZ1c2U6IChtYXRlcmlhbCBhcyBTdGFuZGFyZE1hdGVyaWFsKS5kaWZmdXNlQ29sb3IsXHJcbiAgICAgICAgICAgICAgICBhbHBoYUN1dE9mZjogKG1hdGVyaWFsIGFzIFN0YW5kYXJkTWF0ZXJpYWwpLmFscGhhQ3V0T2ZmLFxyXG4gICAgICAgICAgICAgICAgZW1pc3NpdmVNYXA6IChtYXRlcmlhbCBhcyBTdGFuZGFyZE1hdGVyaWFsKS5lbWlzc2l2ZVRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBlbWlzc2l2ZTogKG1hdGVyaWFsIGFzIFN0YW5kYXJkTWF0ZXJpYWwpLmVtaXNzaXZlQ29sb3IsXHJcbiAgICAgICAgICAgICAgICByb3VnaG5lc3NNYXA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBub3JtYWxNYXA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3NNYXA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICByb3VnaG5lc3M6IDEsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3M6IDAsXHJcbiAgICAgICAgICAgICAgICBhb01hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGFvTWFwSW50ZW5zaXR5OiAwLFxyXG4gICAgICAgICAgICAgICAgYWxwaGFNYXA6IChtYXRlcmlhbCBhcyBTdGFuZGFyZE1hdGVyaWFsKS5vcGFjaXR5VGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGlvcjogMSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICBjYXNlIFwiUEJSTWF0ZXJpYWxcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGRpZmZ1c2VNYXA6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkuYWxiZWRvVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGRpZmZ1c2U6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkuYWxiZWRvQ29sb3IsXHJcbiAgICAgICAgICAgICAgICBhbHBoYUN1dE9mZjogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5hbHBoYUN1dE9mZixcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmVtaXNzaXZlVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmVtaXNzaXZlQ29sb3IsXHJcbiAgICAgICAgICAgICAgICBub3JtYWxNYXA6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkuYnVtcFRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICByb3VnaG5lc3NNYXA6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkubWV0YWxsaWNUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzQ2hhbm5lbDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS51c2VSb3VnaG5lc3NGcm9tTWV0YWxsaWNUZXh0dXJlQWxwaGEgPyBcImFcIiA6IFwiZ1wiLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLnJvdWdobmVzcyB8fCAxLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLm1ldGFsbGljVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIG1ldGFsbmVzc0NoYW5uZWw6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkudXNlTWV0YWxsbmVzc0Zyb21NZXRhbGxpY1RleHR1cmVCbHVlID8gXCJiXCIgOiBcInJcIixcclxuICAgICAgICAgICAgICAgIG1ldGFsbmVzczogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5tZXRhbGxpYyB8fCAwLFxyXG4gICAgICAgICAgICAgICAgYW9NYXA6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkuYW1iaWVudFRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBhb01hcENoYW5uZWw6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkudXNlQW1iaWVudEluR3JheVNjYWxlID8gXCJyXCIgOiBcInJnYlwiLFxyXG4gICAgICAgICAgICAgICAgYW9NYXBJbnRlbnNpdHk6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkuYW1iaWVudFRleHR1cmVTdHJlbmd0aCxcclxuICAgICAgICAgICAgICAgIGFscGhhTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLm9wYWNpdHlUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgaW9yOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmluZGV4T2ZSZWZyYWN0aW9uLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIGNhc2UgXCJQQlJNZXRhbGxpY1JvdWdobmVzc01hdGVyaWFsXCI6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkuYmFzZVRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkuYmFzZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgYWxwaGFDdXRPZmY6IChtYXRlcmlhbCBhcyBQQlJNZXRhbGxpY1JvdWdobmVzc01hdGVyaWFsKS5hbHBoYUN1dE9mZixcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkuZW1pc3NpdmVUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgZW1pc3NpdmU6IChtYXRlcmlhbCBhcyBQQlJNZXRhbGxpY1JvdWdobmVzc01hdGVyaWFsKS5lbWlzc2l2ZUNvbG9yLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbCkubm9ybWFsVGV4dHVyZSxcclxuICAgICAgICAgICAgICAgIHJvdWdobmVzc01hcDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5tZXRhbGxpY1RleHR1cmUsXHJcbiAgICAgICAgICAgICAgICByb3VnaG5lc3NDaGFubmVsOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLnVzZVJvdWdobmVzc0Zyb21NZXRhbGxpY1RleHR1cmVBbHBoYSA/IFwiYVwiIDogXCJnXCIsXHJcbiAgICAgICAgICAgICAgICByb3VnaG5lc3M6IChtYXRlcmlhbCBhcyBQQlJNZXRhbGxpY1JvdWdobmVzc01hdGVyaWFsKS5yb3VnaG5lc3MgfHwgMSxcclxuICAgICAgICAgICAgICAgIG1ldGFsbmVzc01hcDogKG1hdGVyaWFsIGFzIFBCUk1hdGVyaWFsKS5tZXRhbGxpY1RleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3NDaGFubmVsOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLnVzZU1ldGFsbG5lc3NGcm9tTWV0YWxsaWNUZXh0dXJlQmx1ZSA/IFwiYlwiIDogXCJyXCIsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3M6IChtYXRlcmlhbCBhcyBQQlJNZXRhbGxpY1JvdWdobmVzc01hdGVyaWFsKS5tZXRhbGxpYyB8fCAwLFxyXG4gICAgICAgICAgICAgICAgYW9NYXA6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkuYW1iaWVudFRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICBhb01hcENoYW5uZWw6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkudXNlQW1iaWVudEluR3JheVNjYWxlID8gXCJyXCIgOiBcInJnYlwiLFxyXG4gICAgICAgICAgICAgICAgYW9NYXBJbnRlbnNpdHk6IChtYXRlcmlhbCBhcyBQQlJNYXRlcmlhbCkuYW1iaWVudFRleHR1cmVTdHJlbmd0aCxcclxuICAgICAgICAgICAgICAgIGFscGhhTWFwOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLm9wYWNpdHlUZXh0dXJlLFxyXG4gICAgICAgICAgICAgICAgaW9yOiAobWF0ZXJpYWwgYXMgUEJSTWF0ZXJpYWwpLmluZGV4T2ZSZWZyYWN0aW9uLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBkaWZmdXNlTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZGlmZnVzZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGVtaXNzaXZlTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZW1pc3NlbWlzc2l2ZWl2ZUNvbG9yOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcm91Z2huZXNzTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbWV0YWxuZXNzTWFwOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgYWxwaGFDdXRPZmY6IDAsXHJcbiAgICAgICAgICAgICAgICByb3VnaG5lc3M6IDAsXHJcbiAgICAgICAgICAgICAgICBtZXRhbG5lc3M6IDAsXHJcbiAgICAgICAgICAgICAgICBhb01hcDogbnVsbCxcclxuICAgICAgICAgICAgICAgIGFvTWFwSW50ZW5zaXR5OiAwLFxyXG4gICAgICAgICAgICAgICAgYWxwaGFNYXA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBpb3I6IDEsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkTWF0ZXJpYWwobWF0ZXJpYWw6IE1hdGVyaWFsLCB0ZXh0dXJlVG9FeHBvcnRzOiB7IFtrZXk6IHN0cmluZ106IEJhc2VUZXh0dXJlIH0sIG9wdGlvbnM6IElVU0RaRXhwb3J0T3B0aW9ucykge1xyXG4gICAgLy8gaHR0cHM6Ly9ncmFwaGljcy5waXhhci5jb20vdXNkL2RvY3MvVXNkUHJldmlld1N1cmZhY2UtUHJvcG9zYWwuaHRtbFxyXG5cclxuICAgIGNvbnN0IHBhZCA9IFwiXHRcdFx0XCI7XHJcbiAgICBjb25zdCBpbnB1dHMgPSBbXTtcclxuICAgIGNvbnN0IHNhbXBsZXJzID0gW107XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICAgIGRpZmZ1c2VNYXAsXHJcbiAgICAgICAgZGlmZnVzZSxcclxuICAgICAgICBhbHBoYUN1dE9mZixcclxuICAgICAgICBlbWlzc2l2ZU1hcCxcclxuICAgICAgICBlbWlzc2l2ZSxcclxuICAgICAgICBub3JtYWxNYXAsXHJcbiAgICAgICAgcm91Z2huZXNzTWFwLFxyXG4gICAgICAgIHJvdWdobmVzc0NoYW5uZWwsXHJcbiAgICAgICAgcm91Z2huZXNzLFxyXG4gICAgICAgIG1ldGFsbmVzc01hcCxcclxuICAgICAgICBtZXRhbG5lc3NDaGFubmVsLFxyXG4gICAgICAgIG1ldGFsbmVzcyxcclxuICAgICAgICBhb01hcCxcclxuICAgICAgICBhb01hcENoYW5uZWwsXHJcbiAgICAgICAgYW9NYXBJbnRlbnNpdHksXHJcbiAgICAgICAgYWxwaGFNYXAsXHJcbiAgICAgICAgaW9yLFxyXG4gICAgfSA9IEV4dHJhY3RUZXh0dXJlSW5mb3JtYXRpb25zKG1hdGVyaWFsKTtcclxuXHJcbiAgICBpZiAoZGlmZnVzZU1hcCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1jb2xvcjNmIGlucHV0czpkaWZmdXNlQ29sb3IuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RleHR1cmVfJHtkaWZmdXNlTWFwLnVuaXF1ZUlkfV9kaWZmdXNlLm91dHB1dHM6cmdiPmApO1xyXG5cclxuICAgICAgICBpZiAobWF0ZXJpYWwubmVlZEFscGhhQmxlbmRpbmcoKSkge1xyXG4gICAgICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9ZmxvYXQgaW5wdXRzOm9wYWNpdHkuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RleHR1cmVfJHtkaWZmdXNlTWFwLnVuaXF1ZUlkfV9kaWZmdXNlLm91dHB1dHM6YT5gKTtcclxuICAgICAgICB9IGVsc2UgaWYgKG1hdGVyaWFsLm5lZWRBbHBoYVRlc3RpbmcoKSkge1xyXG4gICAgICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9ZmxvYXQgaW5wdXRzOm9wYWNpdHkuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RleHR1cmVfJHtkaWZmdXNlTWFwLnVuaXF1ZUlkfV9kaWZmdXNlLm91dHB1dHM6YT5gKTtcclxuICAgICAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czpvcGFjaXR5VGhyZXNob2xkID0gJHthbHBoYUN1dE9mZn1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNhbXBsZXJzLnB1c2goQnVpbGRUZXh0dXJlKGRpZmZ1c2VNYXAgYXMgVGV4dHVyZSwgbWF0ZXJpYWwsIFwiZGlmZnVzZVwiLCBkaWZmdXNlLCB0ZXh0dXJlVG9FeHBvcnRzLCBvcHRpb25zKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1jb2xvcjNmIGlucHV0czpkaWZmdXNlQ29sb3IgPSAke0J1aWxkQ29sb3IoZGlmZnVzZSB8fCBDb2xvcjMuV2hpdGUoKSl9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVtaXNzaXZlTWFwICE9PSBudWxsKSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWNvbG9yM2YgaW5wdXRzOmVtaXNzaXZlQ29sb3IuY29ubmVjdCA9IDwvTWF0ZXJpYWxzL01hdGVyaWFsXyR7bWF0ZXJpYWwudW5pcXVlSWR9L1RleHR1cmVfJHtlbWlzc2l2ZU1hcC51bmlxdWVJZH1fZW1pc3NpdmUub3V0cHV0czpyZ2I+YCk7XHJcblxyXG4gICAgICAgIHNhbXBsZXJzLnB1c2goQnVpbGRUZXh0dXJlKGVtaXNzaXZlTWFwIGFzIFRleHR1cmUsIG1hdGVyaWFsLCBcImVtaXNzaXZlXCIsIGVtaXNzaXZlLCB0ZXh0dXJlVG9FeHBvcnRzLCBvcHRpb25zKSk7XHJcbiAgICB9IGVsc2UgaWYgKGVtaXNzaXZlICYmIGVtaXNzaXZlLnRvTHVtaW5hbmNlKCkgPiAwKSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWNvbG9yM2YgaW5wdXRzOmVtaXNzaXZlQ29sb3IgPSAke0J1aWxkQ29sb3IoZW1pc3NpdmUpfWApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChub3JtYWxNYXAgIT09IG51bGwpIHtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9bm9ybWFsM2YgaW5wdXRzOm5vcm1hbC5jb25uZWN0ID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttYXRlcmlhbC51bmlxdWVJZH0vVGV4dHVyZV8ke25vcm1hbE1hcC51bmlxdWVJZH1fbm9ybWFsLm91dHB1dHM6cmdiPmApO1xyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKEJ1aWxkVGV4dHVyZShub3JtYWxNYXAgYXMgVGV4dHVyZSwgbWF0ZXJpYWwsIFwibm9ybWFsXCIsIG51bGwsIHRleHR1cmVUb0V4cG9ydHMsIG9wdGlvbnMpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYW9NYXAgIT09IG51bGwpIHtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9ZmxvYXQgaW5wdXRzOm9jY2x1c2lvbi5jb25uZWN0ID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttYXRlcmlhbC51bmlxdWVJZH0vVGV4dHVyZV8ke2FvTWFwLnVuaXF1ZUlkfV9vY2NsdXNpb24ub3V0cHV0czoke2FvTWFwQ2hhbm5lbH0+YCk7XHJcblxyXG4gICAgICAgIHNhbXBsZXJzLnB1c2goQnVpbGRUZXh0dXJlKGFvTWFwIGFzIFRleHR1cmUsIG1hdGVyaWFsLCBcIm9jY2x1c2lvblwiLCBuZXcgQ29sb3IzKGFvTWFwSW50ZW5zaXR5LCBhb01hcEludGVuc2l0eSwgYW9NYXBJbnRlbnNpdHkpLCB0ZXh0dXJlVG9FeHBvcnRzLCBvcHRpb25zKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJvdWdobmVzc01hcCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6cm91Z2huZXNzLmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9UZXh0dXJlXyR7cm91Z2huZXNzTWFwLnVuaXF1ZUlkfV9yb3VnaG5lc3Mub3V0cHV0czoke3JvdWdobmVzc0NoYW5uZWx9PmApO1xyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKEJ1aWxkVGV4dHVyZShyb3VnaG5lc3NNYXAgYXMgVGV4dHVyZSwgbWF0ZXJpYWwsIFwicm91Z2huZXNzXCIsIG5ldyBDb2xvcjMocm91Z2huZXNzLCByb3VnaG5lc3MsIHJvdWdobmVzcyksIHRleHR1cmVUb0V4cG9ydHMsIG9wdGlvbnMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czpyb3VnaG5lc3MgPSAke3JvdWdobmVzc31gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWV0YWxuZXNzTWFwICE9PSBudWxsKSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czptZXRhbGxpYy5jb25uZWN0ID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttYXRlcmlhbC51bmlxdWVJZH0vVGV4dHVyZV8ke21ldGFsbmVzc01hcC51bmlxdWVJZH1fbWV0YWxsaWMub3V0cHV0czoke21ldGFsbmVzc0NoYW5uZWx9PmApO1xyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKEJ1aWxkVGV4dHVyZShtZXRhbG5lc3NNYXAgYXMgVGV4dHVyZSwgbWF0ZXJpYWwsIFwibWV0YWxsaWNcIiwgbmV3IENvbG9yMyhtZXRhbG5lc3MsIG1ldGFsbmVzcywgbWV0YWxuZXNzKSwgdGV4dHVyZVRvRXhwb3J0cywgb3B0aW9ucykpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpbnB1dHMucHVzaChgJHtwYWR9ZmxvYXQgaW5wdXRzOm1ldGFsbGljID0gJHttZXRhbG5lc3N9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGFscGhhTWFwICE9PSBudWxsKSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czpvcGFjaXR5LmNvbm5lY3QgPSA8L01hdGVyaWFscy9NYXRlcmlhbF8ke21hdGVyaWFsLnVuaXF1ZUlkfS9UZXh0dXJlXyR7YWxwaGFNYXAudW5pcXVlSWR9X29wYWNpdHkub3V0cHV0czpyPmApO1xyXG4gICAgICAgIGlucHV0cy5wdXNoKGAke3BhZH1mbG9hdCBpbnB1dHM6b3BhY2l0eVRocmVzaG9sZCA9IDAuMDAwMWApO1xyXG5cclxuICAgICAgICBzYW1wbGVycy5wdXNoKEJ1aWxkVGV4dHVyZShhbHBoYU1hcCBhcyBUZXh0dXJlLCBtYXRlcmlhbCwgXCJvcGFjaXR5XCIsIG51bGwsIHRleHR1cmVUb0V4cG9ydHMsIG9wdGlvbnMpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5wdXRzLnB1c2goYCR7cGFkfWZsb2F0IGlucHV0czpvcGFjaXR5ID0gJHttYXRlcmlhbC5hbHBoYX1gKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dHMucHVzaChgJHtwYWR9ZmxvYXQgaW5wdXRzOmlvciA9ICR7aW9yfWApO1xyXG5cclxuICAgIHJldHVybiBgXHJcblx0ZGVmIE1hdGVyaWFsIFwiTWF0ZXJpYWxfJHttYXRlcmlhbC51bmlxdWVJZH1cIlxyXG5cdHtcclxuXHRcdGRlZiBTaGFkZXIgXCJQcmV2aWV3U3VyZmFjZVwiXHJcblx0XHR7XHJcblx0XHRcdHVuaWZvcm0gdG9rZW4gaW5mbzppZCA9IFwiVXNkUHJldmlld1N1cmZhY2VcIlxyXG4ke2lucHV0cy5qb2luKFwiXFxuXCIpfVxyXG5cdFx0XHRpbnQgaW5wdXRzOnVzZVNwZWN1bGFyV29ya2Zsb3cgPSAwXHJcblx0XHRcdHRva2VuIG91dHB1dHM6c3VyZmFjZVxyXG5cdFx0fVxyXG5cclxuXHRcdHRva2VuIG91dHB1dHM6c3VyZmFjZS5jb25uZWN0ID0gPC9NYXRlcmlhbHMvTWF0ZXJpYWxfJHttYXRlcmlhbC51bmlxdWVJZH0vUHJldmlld1N1cmZhY2Uub3V0cHV0czpzdXJmYWNlPlxyXG5cclxuJHtzYW1wbGVycy5qb2luKFwiXFxuXCIpfVxyXG5cclxuXHR9XHJcbmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEJ1aWxkQ2FtZXJhKGNhbWVyYTogQ2FtZXJhLCBvcHRpb25zOiBJVVNEWkV4cG9ydE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IG5hbWUgPSBcIkNhbWVyYV9cIiArIGNhbWVyYS51bmlxdWVJZDtcclxuICAgIGNvbnN0IG1hdHJpeCA9IE1hdHJpeC5Sb3RhdGlvblkoTWF0aC5QSSkubXVsdGlwbHkoY2FtZXJhLmdldFdvcmxkTWF0cml4KCkpOyAvLyB3b3JrIHRvd2FyZHMgcG9zaXRpdmUgelxyXG5cclxuICAgIGNvbnN0IHRyYW5zZm9ybSA9IEJ1aWxkTWF0cml4KG1hdHJpeCk7XHJcblxyXG4gICAgaWYgKGNhbWVyYS5tb2RlID09PSBDb25zdGFudHMuT1JUSE9HUkFQSElDX0NBTUVSQSkge1xyXG4gICAgICAgIHJldHVybiBgZGVmIENhbWVyYSBcIiR7bmFtZX1cIlxyXG5cdFx0e1xyXG5cdFx0XHRtYXRyaXg0ZCB4Zm9ybU9wOnRyYW5zZm9ybSA9ICR7dHJhbnNmb3JtfVxyXG5cdFx0XHR1bmlmb3JtIHRva2VuW10geGZvcm1PcE9yZGVyID0gW1wieGZvcm1PcDp0cmFuc2Zvcm1cIl1cclxuXHJcblx0XHRcdGZsb2F0MiBjbGlwcGluZ1JhbmdlID0gKCR7Y2FtZXJhLm1pbloudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSwgJHtjYW1lcmEubWF4Wi50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9KVxyXG5cdFx0XHRmbG9hdCBob3Jpem9udGFsQXBlcnR1cmUgPSAkeygoTWF0aC5hYnMoY2FtZXJhLm9ydGhvTGVmdCB8fCAxKSArIE1hdGguYWJzKGNhbWVyYS5vcnRob1JpZ2h0IHx8IDEpKSAqIDEwKS50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9XHJcblx0XHRcdGZsb2F0IHZlcnRpY2FsQXBlcnR1cmUgPSAkeygoTWF0aC5hYnMoY2FtZXJhLm9ydGhvVG9wIHx8IDEpICsgTWF0aC5hYnMoY2FtZXJhLm9ydGhvQm90dG9tIHx8IDEpKSAqIDEwKS50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9XHJcblx0XHRcdHRva2VuIHByb2plY3Rpb24gPSBcIm9ydGhvZ3JhcGhpY1wiXHJcblx0XHR9XHJcblx0XHJcblx0YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgYXNwZWN0ID0gY2FtZXJhLmdldEVuZ2luZSgpLmdldEFzcGVjdFJhdGlvKGNhbWVyYSk7XHJcbiAgICAgICAgY29uc3Qgc2Vuc29yd2lkdGggPSBvcHRpb25zLmNhbWVyYVNlbnNvcldpZHRoIHx8IDM1O1xyXG5cclxuICAgICAgICByZXR1cm4gYGRlZiBDYW1lcmEgXCIke25hbWV9XCJcclxuXHRcdHtcclxuXHRcdFx0bWF0cml4NGQgeGZvcm1PcDp0cmFuc2Zvcm0gPSAke3RyYW5zZm9ybX1cclxuXHRcdFx0dW5pZm9ybSB0b2tlbltdIHhmb3JtT3BPcmRlciA9IFtcInhmb3JtT3A6dHJhbnNmb3JtXCJdXHJcblxyXG5cdFx0XHRmbG9hdDIgY2xpcHBpbmdSYW5nZSA9ICgke2NhbWVyYS5taW5aLnRvUHJlY2lzaW9uKG9wdGlvbnMucHJlY2lzaW9uKX0sICR7Y2FtZXJhLm1heFoudG9QcmVjaXNpb24ob3B0aW9ucy5wcmVjaXNpb24pfSlcclxuXHRcdFx0ZmxvYXQgZm9jYWxMZW5ndGggPSAkeyhzZW5zb3J3aWR0aCAvICgyICogTWF0aC50YW4oY2FtZXJhLmZvdiAqIDAuNSkpKS50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9XHJcbiAgICAgICAgICAgIHRva2VuIHByb2plY3Rpb24gPSBcInBlcnNwZWN0aXZlXCJcclxuXHRcdFx0ZmxvYXQgaG9yaXpvbnRhbEFwZXJ0dXJlID0gJHsoc2Vuc29yd2lkdGggKiBhc3BlY3QpLnRvUHJlY2lzaW9uKG9wdGlvbnMucHJlY2lzaW9uKX1cclxuXHRcdFx0ZmxvYXQgdmVydGljYWxBcGVydHVyZSA9ICR7KHNlbnNvcndpZHRoIC8gYXNwZWN0KS50b1ByZWNpc2lvbihvcHRpb25zLnByZWNpc2lvbil9ICAgICAgICAgICAgXHJcblx0XHR9XHJcblx0XHJcblx0YDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBzY2VuZSBzY2VuZSB0byBleHBvcnRcclxuICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyB0byBjb25maWd1cmUgdGhlIGV4cG9ydFxyXG4gKiBAcGFyYW0gbWVzaFByZWRpY2F0ZSBwcmVkaWNhdGUgdG8gZmlsdGVyIHRoZSBtZXNoZXMgdG8gZXhwb3J0XHJcbiAqIEByZXR1cm5zIGEgdWludDggYXJyYXkgY29udGFpbmluZyB0aGUgVVNEWiBmaWxlXHJcbiAqICNIMkc1WFcjNiAtIFNpbXBsZSBzcGhlcmVcclxuICogI0gyRzVYVyM3IC0gUmVkIHNwaGVyZVxyXG4gKiAjNU4zUldLIzUgLSBCb29tYm94XHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gVVNEWkV4cG9ydEFzeW5jKHNjZW5lOiBTY2VuZSwgb3B0aW9uczogUGFydGlhbDxJVVNEWkV4cG9ydE9wdGlvbnM+LCBtZXNoUHJlZGljYXRlPzogKG06IE1lc2gpID0+IGJvb2xlYW4pOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcclxuICAgIGNvbnN0IGxvY2FsT3B0aW9ucyA9IHtcclxuICAgICAgICBmZmxhdGVVcmw6IFwiaHR0cHM6Ly91bnBrZy5jb20vZmZsYXRlQDAuOC4yXCIsXHJcbiAgICAgICAgaW5jbHVkZUFuY2hvcmluZ1Byb3BlcnRpZXM6IHRydWUsXHJcbiAgICAgICAgYW5jaG9yaW5nVHlwZTogXCJwbGFuZVwiLFxyXG4gICAgICAgIHBsYW5lQW5jaG9yaW5nQWxpZ25tZW50OiBcImhvcml6b250YWxcIixcclxuICAgICAgICBtb2RlbEZpbGVOYW1lOiBcIm1vZGVsLnVzZGFcIixcclxuICAgICAgICBwcmVjaXNpb246IDUsXHJcbiAgICAgICAgZXhwb3J0Q2FtZXJhOiBmYWxzZSxcclxuICAgICAgICBjYW1lcmFTZW5zb3JXaWR0aDogMzUsXHJcbiAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgIH07XHJcblxyXG4gICAgLy8gR2V0IHRoZSBmZmxhdGUgbGlicmFyeVxyXG4gICAgaWYgKHR5cGVvZiBmZmxhdGUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBhd2FpdCBUb29scy5Mb2FkU2NyaXB0QXN5bmMobG9jYWxPcHRpb25zLmZmbGF0ZVVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhcnQgdGhlIGV4cG9ydFxyXG4gICAgY29uc3QgZmlsZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcclxuXHJcbiAgICAvLyBtb2RlbCBmaWxlIHNob3VsZCBiZSBmaXJzdCBpbiBVU0RaIGFyY2hpdmUgc28gd2UgaW5pdCBpdCBoZXJlXHJcbiAgICBmaWxlc1tsb2NhbE9wdGlvbnMubW9kZWxGaWxlTmFtZV0gPSBudWxsO1xyXG5cclxuICAgIGxldCBvdXRwdXQgPSBCdWlsZEhlYWRlcigpO1xyXG4gICAgb3V0cHV0ICs9IEJ1aWxkU2NlbmVTdGFydChsb2NhbE9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IG1hdGVyaWFsVG9FeHBvcnRzOiB7IFtrZXk6IHN0cmluZ106IE1hdGVyaWFsIH0gPSB7fTtcclxuXHJcbiAgICAvLyBNZXNoZXNcclxuICAgIGZvciAoY29uc3QgYWJzdHJhY3RNZXNoIG9mIHNjZW5lLm1lc2hlcykge1xyXG4gICAgICAgIGlmIChhYnN0cmFjdE1lc2guZ2V0VG90YWxWZXJ0aWNlcygpID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtZXNoID0gYWJzdHJhY3RNZXNoIGFzIE1lc2g7XHJcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBtZXNoLmdlb21ldHJ5O1xyXG4gICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbWVzaC5tYXRlcmlhbDtcclxuXHJcbiAgICAgICAgaWYgKCFtYXRlcmlhbCB8fCAhZ2VvbWV0cnkgfHwgKG1lc2hQcmVkaWNhdGUgJiYgIW1lc2hQcmVkaWNhdGUobWVzaCkpKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkTWF0ZXJpYWxzID0gW1wiU3RhbmRhcmRNYXRlcmlhbFwiLCBcIlBCUk1hdGVyaWFsXCIsIFwiUEJSTWV0YWxsaWNSb3VnaG5lc3NNYXRlcmlhbFwiXTtcclxuXHJcbiAgICAgICAgaWYgKHN1cHBvcnRlZE1hdGVyaWFscy5pbmRleE9mKG1hdGVyaWFsLmdldENsYXNzTmFtZSgpKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgZ2VvbWV0cnlGaWxlTmFtZSA9IFwiZ2VvbWV0cmllcy9HZW9tZXRyeV9cIiArIGdlb21ldHJ5LnVuaXF1ZUlkICsgXCIudXNkYVwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEoZ2VvbWV0cnlGaWxlTmFtZSBpbiBmaWxlcykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc2hPYmplY3QgPSBCdWlsZE1lc2hPYmplY3QoZ2VvbWV0cnksIGxvY2FsT3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBmaWxlc1tnZW9tZXRyeUZpbGVOYW1lXSA9IEJ1aWxkVVNERmlsZUFzU3RyaW5nKG1lc2hPYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIShtYXRlcmlhbC51bmlxdWVJZCBpbiBtYXRlcmlhbFRvRXhwb3J0cykpIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsVG9FeHBvcnRzW21hdGVyaWFsLnVuaXF1ZUlkXSA9IG1hdGVyaWFsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvdXRwdXQgKz0gQnVpbGRYZm9ybShtZXNoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBUb29scy5XYXJuKFwiVVNEWkV4cG9ydEFzeW5jIGRvZXMgbm90IHN1cHBvcnQgdGhpcyBtYXRlcmlhbCB0eXBlOiBcIiArIG1hdGVyaWFsLmdldENsYXNzTmFtZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FtZXJhXHJcbiAgICBpZiAoc2NlbmUuYWN0aXZlQ2FtZXJhICYmIGxvY2FsT3B0aW9ucy5leHBvcnRDYW1lcmEpIHtcclxuICAgICAgICBvdXRwdXQgKz0gQnVpbGRDYW1lcmEoc2NlbmUuYWN0aXZlQ2FtZXJhLCBsb2NhbE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENsb3NlIHNjZW5lXHJcbiAgICBvdXRwdXQgKz0gQnVpbGRTY2VuZUVuZCgpO1xyXG5cclxuICAgIC8vIE1hdGVyaWFsc1xyXG4gICAgY29uc3QgdGV4dHVyZVRvRXhwb3J0czogeyBba2V5OiBzdHJpbmddOiBCYXNlVGV4dHVyZSB9ID0ge307XHJcbiAgICBvdXRwdXQgKz0gQnVpbGRNYXRlcmlhbHMobWF0ZXJpYWxUb0V4cG9ydHMsIHRleHR1cmVUb0V4cG9ydHMsIGxvY2FsT3B0aW9ucyk7XHJcblxyXG4gICAgLy8gQ29tcHJlc3NcclxuICAgIGZpbGVzW2xvY2FsT3B0aW9ucy5tb2RlbEZpbGVOYW1lXSA9IGZmbGF0ZS5zdHJUb1U4KG91dHB1dCk7XHJcblxyXG4gICAgLy8gVGV4dHVyZXNcclxuICAgIGZvciAoY29uc3QgaWQgaW4gdGV4dHVyZVRvRXhwb3J0cykge1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmUgPSB0ZXh0dXJlVG9FeHBvcnRzW2lkXTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRleHR1cmUuZ2V0U2l6ZSgpO1xyXG4gICAgICAgIGNvbnN0IHRleHR1cmVEYXRhID0gYXdhaXQgdGV4dHVyZS5yZWFkUGl4ZWxzKCk7XHJcblxyXG4gICAgICAgIGlmICghdGV4dHVyZURhdGEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGV4dHVyZSBkYXRhIGlzIG5vdCBhdmFpbGFibGVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmaWxlQ29udGVudCA9IGF3YWl0IER1bXBUb29scy5EdW1wRGF0YUFzeW5jKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0LCB0ZXh0dXJlRGF0YSwgXCJpbWFnZS9wbmdcIiwgdW5kZWZpbmVkLCBmYWxzZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGZpbGVzW2B0ZXh0dXJlcy9UZXh0dXJlXyR7aWR9LnBuZ2BdID0gbmV3IFVpbnQ4QXJyYXkoZmlsZUNvbnRlbnQgYXMgQXJyYXlCdWZmZXIpLnNsaWNlKCk7IC8vIFRoaXMgaXMgdG8gYXZvaWQgZ2V0dGluZyBhIGxpbmsgYW5kIG5vdCBhIGNvcHlcclxuICAgIH1cclxuXHJcbiAgICAvLyA2NCBieXRlIGFsaWdubWVudFxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tLzEwMWFycm93ei9mZmxhdGUvaXNzdWVzLzM5I2lzc3VlY29tbWVudC03NzcyNjMxMDlcclxuXHJcbiAgICBsZXQgb2Zmc2V0ID0gMDtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIGluIGZpbGVzKSB7XHJcbiAgICAgICAgY29uc3QgZmlsZSA9IGZpbGVzW2ZpbGVuYW1lXTtcclxuICAgICAgICBpZiAoIWZpbGUpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhlYWRlclNpemUgPSAzNCArIGZpbGVuYW1lLmxlbmd0aDtcclxuXHJcbiAgICAgICAgb2Zmc2V0ICs9IGhlYWRlclNpemU7XHJcblxyXG4gICAgICAgIGNvbnN0IG9mZnNldE1vZDY0ID0gb2Zmc2V0ICYgNjM7XHJcblxyXG4gICAgICAgIGlmIChvZmZzZXRNb2Q2NCAhPT0gNCkge1xyXG4gICAgICAgICAgICBjb25zdCBwYWRMZW5ndGggPSA2NCAtIG9mZnNldE1vZDY0O1xyXG4gICAgICAgICAgICBjb25zdCBwYWRkaW5nID0gbmV3IFVpbnQ4QXJyYXkocGFkTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cclxuICAgICAgICAgICAgZmlsZXNbZmlsZW5hbWVdID0gW2ZpbGUsIHsgZXh0cmE6IHsgMTIzNDU6IHBhZGRpbmcgfSB9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9mZnNldCA9IGZpbGUubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmZmxhdGUuemlwU3luYyhmaWxlcywgeyBsZXZlbDogMCB9KTtcclxufVxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlcyAqL1xyXG5pbXBvcnQgKiBhcyBTZXJpYWxpemVycyBmcm9tIFwic2VyaWFsaXplcnMvVVNEWi9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZm9yIChjb25zdCBzZXJpYWxpemVyIGluIFNlcmlhbGl6ZXJzKSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW3NlcmlhbGl6ZXJdID0gKDxhbnk+U2VyaWFsaXplcnMpW3NlcmlhbGl6ZXJdO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgKiBmcm9tIFwic2VyaWFsaXplcnMvVVNEWi9pbmRleFwiO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2NfdG9vbHNfXzsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxudmFyIG93bktleXMgPSBmdW5jdGlvbihvKSB7XG4gIG93bktleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiAobykge1xuICAgIHZhciBhciA9IFtdO1xuICAgIGZvciAodmFyIGsgaW4gbykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSkgYXJbYXIubGVuZ3RoXSA9IGs7XG4gICAgcmV0dXJuIGFyO1xuICB9O1xuICByZXR1cm4gb3duS2V5cyhvKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XG4gIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrID0gb3duS2V5cyhtb2QpLCBpID0gMDsgaSA8IGsubGVuZ3RoOyBpKyspIGlmIChrW2ldICE9PSBcImRlZmF1bHRcIikgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrW2ldKTtcbiAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcbiAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcbiAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcbiAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XG4gIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xuICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcbiAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYWRkRGlzcG9zYWJsZVJlc291cmNlKGVudiwgdmFsdWUsIGFzeW5jKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZC5cIik7XG4gICAgdmFyIGRpc3Bvc2UsIGlubmVyO1xuICAgIGlmIChhc3luYykge1xuICAgICAgaWYgKCFTeW1ib2wuYXN5bmNEaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jRGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmFzeW5jRGlzcG9zZV07XG4gICAgfVxuICAgIGlmIChkaXNwb3NlID09PSB2b2lkIDApIHtcbiAgICAgIGlmICghU3ltYm9sLmRpc3Bvc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuZGlzcG9zZSBpcyBub3QgZGVmaW5lZC5cIik7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbU3ltYm9sLmRpc3Bvc2VdO1xuICAgICAgaWYgKGFzeW5jKSBpbm5lciA9IGRpc3Bvc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGlzcG9zZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IG5vdCBkaXNwb3NhYmxlLlwiKTtcbiAgICBpZiAoaW5uZXIpIGRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgdHJ5IHsgaW5uZXIuY2FsbCh0aGlzKTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7IH0gfTtcbiAgICBlbnYuc3RhY2sucHVzaCh7IHZhbHVlOiB2YWx1ZSwgZGlzcG9zZTogZGlzcG9zZSwgYXN5bmM6IGFzeW5jIH0pO1xuICB9XG4gIGVsc2UgaWYgKGFzeW5jKSB7XG4gICAgZW52LnN0YWNrLnB1c2goeyBhc3luYzogdHJ1ZSB9KTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbnZhciBfU3VwcHJlc3NlZEVycm9yID0gdHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGlzcG9zZVJlc291cmNlcyhlbnYpIHtcbiAgZnVuY3Rpb24gZmFpbChlKSB7XG4gICAgZW52LmVycm9yID0gZW52Lmhhc0Vycm9yID8gbmV3IF9TdXBwcmVzc2VkRXJyb3IoZSwgZW52LmVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbC5cIikgOiBlO1xuICAgIGVudi5oYXNFcnJvciA9IHRydWU7XG4gIH1cbiAgdmFyIHIsIHMgPSAwO1xuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIHdoaWxlIChyID0gZW52LnN0YWNrLnBvcCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIXIuYXN5bmMgJiYgcyA9PT0gMSkgcmV0dXJuIHMgPSAwLCBlbnYuc3RhY2sucHVzaChyKSwgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihuZXh0KTtcbiAgICAgICAgaWYgKHIuZGlzcG9zZSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSByLmRpc3Bvc2UuY2FsbChyLnZhbHVlKTtcbiAgICAgICAgICBpZiAoci5hc3luYykgcmV0dXJuIHMgfD0gMiwgUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCkudGhlbihuZXh0LCBmdW5jdGlvbihlKSB7IGZhaWwoZSk7IHJldHVybiBuZXh0KCk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgcyB8PSAxO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHMgPT09IDEpIHJldHVybiBlbnYuaGFzRXJyb3IgPyBQcm9taXNlLnJlamVjdChlbnYuZXJyb3IpIDogUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgaWYgKGVudi5oYXNFcnJvcikgdGhyb3cgZW52LmVycm9yO1xuICB9XG4gIHJldHVybiBuZXh0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbihwYXRoLCBwcmVzZXJ2ZUpzeCkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIgJiYgL15cXC5cXC4/XFwvLy50ZXN0KHBhdGgpKSB7XG4gICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9cXC4odHN4KSR8KCg/OlxcLmQpPykoKD86XFwuW14uL10rPyk/KVxcLihbY21dPyl0cyQvaSwgZnVuY3Rpb24gKG0sIHRzeCwgZCwgZXh0LCBjbSkge1xuICAgICAgICAgIHJldHVybiB0c3ggPyBwcmVzZXJ2ZUpzeCA/IFwiLmpzeFwiIDogXCIuanNcIiA6IGQgJiYgKCFleHQgfHwgIWNtKSA/IG0gOiAoZCArIGV4dCArIFwiLlwiICsgY20udG9Mb3dlckNhc2UoKSArIFwianNcIik7XG4gICAgICB9KTtcbiAgfVxuICByZXR1cm4gcGF0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBfX2V4dGVuZHMsXG4gIF9fYXNzaWduLFxuICBfX3Jlc3QsXG4gIF9fZGVjb3JhdGUsXG4gIF9fcGFyYW0sXG4gIF9fZXNEZWNvcmF0ZSxcbiAgX19ydW5Jbml0aWFsaXplcnMsXG4gIF9fcHJvcEtleSxcbiAgX19zZXRGdW5jdGlvbk5hbWUsXG4gIF9fbWV0YWRhdGEsXG4gIF9fYXdhaXRlcixcbiAgX19nZW5lcmF0b3IsXG4gIF9fY3JlYXRlQmluZGluZyxcbiAgX19leHBvcnRTdGFyLFxuICBfX3ZhbHVlcyxcbiAgX19yZWFkLFxuICBfX3NwcmVhZCxcbiAgX19zcHJlYWRBcnJheXMsXG4gIF9fc3ByZWFkQXJyYXksXG4gIF9fYXdhaXQsXG4gIF9fYXN5bmNHZW5lcmF0b3IsXG4gIF9fYXN5bmNEZWxlZ2F0b3IsXG4gIF9fYXN5bmNWYWx1ZXMsXG4gIF9fbWFrZVRlbXBsYXRlT2JqZWN0LFxuICBfX2ltcG9ydFN0YXIsXG4gIF9faW1wb3J0RGVmYXVsdCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEdldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZFNldCxcbiAgX19jbGFzc1ByaXZhdGVGaWVsZEluLFxuICBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZSxcbiAgX19kaXNwb3NlUmVzb3VyY2VzLFxuICBfX3Jld3JpdGVSZWxhdGl2ZUltcG9ydEV4dGVuc2lvbixcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBzZXJpYWxpemVycyBmcm9tIFwiQGx0cy9zZXJpYWxpemVycy9sZWdhY3kvbGVnYWN5LXVzZHpTZXJpYWxpemVyXCI7XG5leHBvcnQgeyBzZXJpYWxpemVycyB9O1xuZXhwb3J0IGRlZmF1bHQgc2VyaWFsaXplcnM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=