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

/***/ "../../../dev/serializers/src/OBJ/index.ts":
/*!*************************************************!*\
  !*** ../../../dev/serializers/src/OBJ/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJExport: () => (/* reexport safe */ _objSerializer__WEBPACK_IMPORTED_MODULE_0__.OBJExport)
/* harmony export */ });
/* harmony import */ var _objSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objSerializer */ "../../../dev/serializers/src/OBJ/objSerializer.ts");



/***/ }),

/***/ "../../../dev/serializers/src/OBJ/objSerializer.ts":
/*!*********************************************************!*\
  !*** ../../../dev/serializers/src/OBJ/objSerializer.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJExport: () => (/* binding */ OBJExport)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/material */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);



/**
 * Class for generating OBJ data from a Babylon scene.
 */
var OBJExport = /** @class */ (function () {
    function OBJExport() {
    }
    /**
     * Exports the geometry of a Mesh array in .OBJ file format (text)
     * @param meshes defines the list of meshes to serialize
     * @param materials defines if materials should be exported
     * @param matlibname defines the name of the associated mtl file
     * @param globalposition defines if the exported positions are globals or local to the exported mesh
     * @returns the OBJ content
     */
    OBJExport.OBJ = function (meshes, materials, matlibname, globalposition) {
        var output = [];
        var v = 1;
        // keep track of uv index in case mixed meshes are passed in
        var textureV = 1;
        if (materials) {
            if (!matlibname) {
                matlibname = "mat";
            }
            output.push("mtllib " + matlibname + ".mtl");
        }
        for (var j = 0; j < meshes.length; j++) {
            var mesh = meshes[j];
            var objectName = mesh.name || "mesh".concat(j, "}");
            output.push("o ".concat(objectName));
            //Uses the position of the item in the scene, to the file (this back to normal in the end)
            var inverseTransform = null;
            if (globalposition) {
                var transform = mesh.computeWorldMatrix(true);
                inverseTransform = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Matrix();
                transform.invertToRef(inverseTransform);
                mesh.bakeTransformIntoVertices(transform);
            }
            //TODO: submeshes (groups)
            //TODO: smoothing groups (s 1, s off);
            if (materials) {
                var mat = mesh.material;
                if (mat) {
                    output.push("usemtl " + mat.id);
                }
            }
            var g = mesh.geometry;
            if (!g) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("No geometry is present on the mesh");
                continue;
            }
            var trunkVerts = g.getVerticesData("position");
            var trunkNormals = g.getVerticesData("normal");
            var trunkUV = g.getVerticesData("uv");
            var trunkFaces = g.getIndices();
            var currentV = 0;
            var currentTextureV = 0;
            if (!trunkVerts || !trunkFaces) {
                babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("There are no position vertices or indices on the mesh!");
                continue;
            }
            var useRightHandedSystem = meshes[0].getScene().useRightHandedSystem;
            var handednessSign = useRightHandedSystem ? 1 : -1;
            for (var i = 0; i < trunkVerts.length; i += 3) {
                output.push("v " + trunkVerts[i] * handednessSign + " " + trunkVerts[i + 1] + " " + trunkVerts[i + 2]);
                currentV++;
            }
            if (trunkNormals != null) {
                for (var i = 0; i < trunkNormals.length; i += 3) {
                    output.push("vn " + trunkNormals[i] * handednessSign + " " + trunkNormals[i + 1] + " " + trunkNormals[i + 2]);
                }
            }
            if (trunkUV != null) {
                for (var i = 0; i < trunkUV.length; i += 2) {
                    output.push("vt " + trunkUV[i] + " " + trunkUV[i + 1]);
                    currentTextureV++;
                }
            }
            var blanks = ["", "", ""];
            var material = mesh.material || mesh.getScene().defaultMaterial;
            var sideOrientation = material._getEffectiveOrientation(mesh);
            var _a = sideOrientation === babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Material.ClockWiseSideOrientation ? [2, 1] : [1, 2], offset1 = _a[0], offset2 = _a[1];
            for (var i = 0; i < trunkFaces.length; i += 3) {
                var indices = [String(trunkFaces[i] + v), String(trunkFaces[i + offset1] + v), String(trunkFaces[i + offset2] + v)];
                var textureIndices = [String(trunkFaces[i] + textureV), String(trunkFaces[i + offset1] + textureV), String(trunkFaces[i + offset2] + textureV)];
                var facePositions = indices;
                var faceUVs = trunkUV != null ? textureIndices : blanks;
                var faceNormals = trunkNormals != null ? indices : blanks;
                output.push("f " +
                    facePositions[0] +
                    "/" +
                    faceUVs[0] +
                    "/" +
                    faceNormals[0] +
                    " " +
                    facePositions[1] +
                    "/" +
                    faceUVs[1] +
                    "/" +
                    faceNormals[1] +
                    " " +
                    facePositions[2] +
                    "/" +
                    faceUVs[2] +
                    "/" +
                    faceNormals[2]);
            }
            //back de previous matrix, to not change the original mesh in the scene
            if (globalposition && inverseTransform) {
                mesh.bakeTransformIntoVertices(inverseTransform);
            }
            v += currentV;
            textureV += currentTextureV;
        }
        var text = output.join("\n");
        return text;
    };
    /**
     * Exports the material(s) of a mesh in .MTL file format (text)
     * @param mesh defines the mesh to extract the material from
     * @returns the mtl content
     */
    //TODO: Export the materials of mesh array
    OBJExport.MTL = function (mesh) {
        var output = [];
        var m = mesh.material;
        output.push("newmtl mat1");
        output.push("  Ns " + m.specularPower.toFixed(4));
        output.push("  Ni 1.5000");
        output.push("  d " + m.alpha.toFixed(4));
        output.push("  Tr 0.0000");
        output.push("  Tf 1.0000 1.0000 1.0000");
        output.push("  illum 2");
        output.push("  Ka " + m.ambientColor.r.toFixed(4) + " " + m.ambientColor.g.toFixed(4) + " " + m.ambientColor.b.toFixed(4));
        output.push("  Kd " + m.diffuseColor.r.toFixed(4) + " " + m.diffuseColor.g.toFixed(4) + " " + m.diffuseColor.b.toFixed(4));
        output.push("  Ks " + m.specularColor.r.toFixed(4) + " " + m.specularColor.g.toFixed(4) + " " + m.specularColor.b.toFixed(4));
        output.push("  Ke " + m.emissiveColor.r.toFixed(4) + " " + m.emissiveColor.g.toFixed(4) + " " + m.emissiveColor.b.toFixed(4));
        //TODO: uv scale, offset, wrap
        //TODO: UV mirrored in Blender? second UV channel? lightMap? reflection textures?
        var uvscale = "";
        if (m.ambientTexture) {
            output.push("  map_Ka " + uvscale + m.ambientTexture.name);
        }
        if (m.diffuseTexture) {
            output.push("  map_Kd " + uvscale + m.diffuseTexture.name);
            //TODO: alpha testing, opacity in diffuse texture alpha channel (diffuseTexture.hasAlpha -> map_d)
        }
        if (m.specularTexture) {
            output.push("  map_Ks " + uvscale + m.specularTexture.name);
            /* TODO: glossiness = specular highlight component is in alpha channel of specularTexture. (???)
            if (m.useGlossinessFromSpecularMapAlpha)  {
                output.push("  map_Ns "+uvscale + m.specularTexture.name);
            }
            */
        }
        /* TODO: emissive texture not in .MAT format (???)
        if (m.emissiveTexture) {
            output.push("  map_d "+uvscale+m.emissiveTexture.name);
        }
        */
        if (m.bumpTexture) {
            output.push("  map_bump -imfchan z " + uvscale + m.bumpTexture.name);
        }
        if (m.opacityTexture) {
            output.push("  map_d " + uvscale + m.opacityTexture.name);
        }
        var text = output.join("\n");
        return text;
    };
    return OBJExport;
}());



/***/ }),

/***/ "../../../lts/serializers/src/legacy/legacy-objSerializer.ts":
/*!*******************************************************************!*\
  !*** ../../../lts/serializers/src/legacy/legacy-objSerializer.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJExport: () => (/* reexport safe */ serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.OBJExport)
/* harmony export */ });
/* harmony import */ var serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serializers/OBJ/index */ "../../../dev/serializers/src/OBJ/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var serializer in serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__) {
        globalObject.BABYLON[serializer] = serializers_OBJ_index__WEBPACK_IMPORTED_MODULE_0__[serializer];
    }
}



/***/ }),

/***/ "babylonjs/Misc/tools":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_tools__;

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
/*!********************!*\
  !*** ./src/obj.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   serializers: () => (/* reexport module object */ _lts_serializers_legacy_legacy_objSerializer__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_serializers_legacy_legacy_objSerializer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/serializers/legacy/legacy-objSerializer */ "../../../lts/serializers/src/legacy/legacy-objSerializer.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_serializers_legacy_legacy_objSerializer__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5vYmpTZXJpYWxpemVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBO0FBQ0E7QUFJQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQThMQTtBQTdMQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUVBOzs7O0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pNQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7O0FDZEE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL09CSi9pbmRleC50cyIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy8uLi8uLi8uLi9kZXYvc2VyaWFsaXplcnMvc3JjL09CSi9vYmpTZXJpYWxpemVyLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTLy4uLy4uLy4uL2x0cy9zZXJpYWxpemVycy9zcmMvbGVnYWN5L2xlZ2FjeS1vYmpTZXJpYWxpemVyLnRzIiwid2VicGFjazovL1NFUklBTElaRVJTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1NFUklBTElaRVJTL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vU0VSSUFMSVpFUlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9TRVJJQUxJWkVSUy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1NFUklBTElaRVJTLy4vc3JjL29iai50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYWJ5bG9uanMtc2VyaWFsaXplcnNcIiwgW1wiYmFieWxvbmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJhYnlsb25qcy1zZXJpYWxpemVyc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiU0VSSUFMSVpFUlNcIl0gPSBmYWN0b3J5KHJvb3RbXCJCQUJZTE9OXCJdKTtcbn0pKCh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyksIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NaXNjX3Rvb2xzX18pID0+IHtcbnJldHVybiAiLCJleHBvcnQgKiBmcm9tIFwiLi9vYmpTZXJpYWxpemVyXCI7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBNYXRyaXggfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCJjb3JlL01pc2MvdG9vbHNcIjtcclxuaW1wb3J0IHR5cGUgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHR5cGUgeyBHZW9tZXRyeSB9IGZyb20gXCJjb3JlL01lc2hlcy9nZW9tZXRyeVwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGZvciBnZW5lcmF0aW5nIE9CSiBkYXRhIGZyb20gYSBCYWJ5bG9uIHNjZW5lLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9CSkV4cG9ydCB7XHJcbiAgICAvKipcclxuICAgICAqIEV4cG9ydHMgdGhlIGdlb21ldHJ5IG9mIGEgTWVzaCBhcnJheSBpbiAuT0JKIGZpbGUgZm9ybWF0ICh0ZXh0KVxyXG4gICAgICogQHBhcmFtIG1lc2hlcyBkZWZpbmVzIHRoZSBsaXN0IG9mIG1lc2hlcyB0byBzZXJpYWxpemVcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbHMgZGVmaW5lcyBpZiBtYXRlcmlhbHMgc2hvdWxkIGJlIGV4cG9ydGVkXHJcbiAgICAgKiBAcGFyYW0gbWF0bGlibmFtZSBkZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBhc3NvY2lhdGVkIG10bCBmaWxlXHJcbiAgICAgKiBAcGFyYW0gZ2xvYmFscG9zaXRpb24gZGVmaW5lcyBpZiB0aGUgZXhwb3J0ZWQgcG9zaXRpb25zIGFyZSBnbG9iYWxzIG9yIGxvY2FsIHRvIHRoZSBleHBvcnRlZCBtZXNoXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgT0JKIGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBPQkoobWVzaGVzOiBNZXNoW10sIG1hdGVyaWFscz86IGJvb2xlYW4sIG1hdGxpYm5hbWU/OiBzdHJpbmcsIGdsb2JhbHBvc2l0aW9uPzogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGxldCB2ID0gMTtcclxuICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHV2IGluZGV4IGluIGNhc2UgbWl4ZWQgbWVzaGVzIGFyZSBwYXNzZWQgaW5cclxuICAgICAgICBsZXQgdGV4dHVyZVYgPSAxO1xyXG5cclxuICAgICAgICBpZiAobWF0ZXJpYWxzKSB7XHJcbiAgICAgICAgICAgIGlmICghbWF0bGlibmFtZSkge1xyXG4gICAgICAgICAgICAgICAgbWF0bGlibmFtZSA9IFwibWF0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJtdGxsaWIgXCIgKyBtYXRsaWJuYW1lICsgXCIubXRsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1lc2hlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNoID0gbWVzaGVzW2pdO1xyXG4gICAgICAgICAgICBjb25zdCBvYmplY3ROYW1lID0gbWVzaC5uYW1lIHx8IGBtZXNoJHtqfX1gO1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChgbyAke29iamVjdE5hbWV9YCk7XHJcblxyXG4gICAgICAgICAgICAvL1VzZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIGluIHRoZSBzY2VuZSwgdG8gdGhlIGZpbGUgKHRoaXMgYmFjayB0byBub3JtYWwgaW4gdGhlIGVuZClcclxuICAgICAgICAgICAgbGV0IGludmVyc2VUcmFuc2Zvcm06IE51bGxhYmxlPE1hdHJpeD4gPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoZ2xvYmFscG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IG1lc2guY29tcHV0ZVdvcmxkTWF0cml4KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaW52ZXJzZVRyYW5zZm9ybSA9IG5ldyBNYXRyaXgoKTtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5pbnZlcnRUb1JlZihpbnZlcnNlVHJhbnNmb3JtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtZXNoLmJha2VUcmFuc2Zvcm1JbnRvVmVydGljZXModHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9UT0RPOiBzdWJtZXNoZXMgKGdyb3VwcylcclxuICAgICAgICAgICAgLy9UT0RPOiBzbW9vdGhpbmcgZ3JvdXBzIChzIDEsIHMgb2ZmKTtcclxuICAgICAgICAgICAgaWYgKG1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0ID0gbWVzaC5tYXRlcmlhbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJ1c2VtdGwgXCIgKyBtYXQuaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGc6IE51bGxhYmxlPEdlb21ldHJ5PiA9IG1lc2guZ2VvbWV0cnk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWcpIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oXCJObyBnZW9tZXRyeSBpcyBwcmVzZW50IG9uIHRoZSBtZXNoXCIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRydW5rVmVydHMgPSBnLmdldFZlcnRpY2VzRGF0YShcInBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0cnVua05vcm1hbHMgPSBnLmdldFZlcnRpY2VzRGF0YShcIm5vcm1hbFwiKTtcclxuICAgICAgICAgICAgY29uc3QgdHJ1bmtVViA9IGcuZ2V0VmVydGljZXNEYXRhKFwidXZcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRydW5rRmFjZXMgPSBnLmdldEluZGljZXMoKTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRWID0gMDtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRUZXh0dXJlViA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRydW5rVmVydHMgfHwgIXRydW5rRmFjZXMpIHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLldhcm4oXCJUaGVyZSBhcmUgbm8gcG9zaXRpb24gdmVydGljZXMgb3IgaW5kaWNlcyBvbiB0aGUgbWVzaCFcIik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdXNlUmlnaHRIYW5kZWRTeXN0ZW0gPSBtZXNoZXNbMF0uZ2V0U2NlbmUoKS51c2VSaWdodEhhbmRlZFN5c3RlbTtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGVkbmVzc1NpZ24gPSB1c2VSaWdodEhhbmRlZFN5c3RlbSA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJ1bmtWZXJ0cy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJ2IFwiICsgdHJ1bmtWZXJ0c1tpXSAqIGhhbmRlZG5lc3NTaWduICsgXCIgXCIgKyB0cnVua1ZlcnRzW2kgKyAxXSArIFwiIFwiICsgdHJ1bmtWZXJ0c1tpICsgMl0pO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFYrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRydW5rTm9ybWFscyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRydW5rTm9ybWFscy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFwidm4gXCIgKyB0cnVua05vcm1hbHNbaV0gKiBoYW5kZWRuZXNzU2lnbiArIFwiIFwiICsgdHJ1bmtOb3JtYWxzW2kgKyAxXSArIFwiIFwiICsgdHJ1bmtOb3JtYWxzW2kgKyAyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRydW5rVVYgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cnVua1VWLmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXCJ2dCBcIiArIHRydW5rVVZbaV0gKyBcIiBcIiArIHRydW5rVVZbaSArIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV4dHVyZVYrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYmxhbmtzOiBzdHJpbmdbXSA9IFtcIlwiLCBcIlwiLCBcIlwiXTtcclxuICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBtZXNoLm1hdGVyaWFsIHx8IG1lc2guZ2V0U2NlbmUoKS5kZWZhdWx0TWF0ZXJpYWw7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzaWRlT3JpZW50YXRpb24gPSBtYXRlcmlhbC5fZ2V0RWZmZWN0aXZlT3JpZW50YXRpb24obWVzaCk7XHJcbiAgICAgICAgICAgIGNvbnN0IFtvZmZzZXQxLCBvZmZzZXQyXSA9IHNpZGVPcmllbnRhdGlvbiA9PT0gTWF0ZXJpYWwuQ2xvY2tXaXNlU2lkZU9yaWVudGF0aW9uID8gWzIsIDFdIDogWzEsIDJdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cnVua0ZhY2VzLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRpY2VzID0gW1N0cmluZyh0cnVua0ZhY2VzW2ldICsgdiksIFN0cmluZyh0cnVua0ZhY2VzW2kgKyBvZmZzZXQxXSArIHYpLCBTdHJpbmcodHJ1bmtGYWNlc1tpICsgb2Zmc2V0Ml0gKyB2KV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0dXJlSW5kaWNlcyA9IFtTdHJpbmcodHJ1bmtGYWNlc1tpXSArIHRleHR1cmVWKSwgU3RyaW5nKHRydW5rRmFjZXNbaSArIG9mZnNldDFdICsgdGV4dHVyZVYpLCBTdHJpbmcodHJ1bmtGYWNlc1tpICsgb2Zmc2V0Ml0gKyB0ZXh0dXJlVildO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZhY2VQb3NpdGlvbnMgPSBpbmRpY2VzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjZVVWcyA9IHRydW5rVVYgIT0gbnVsbCA/IHRleHR1cmVJbmRpY2VzIDogYmxhbmtzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjZU5vcm1hbHMgPSB0cnVua05vcm1hbHMgIT0gbnVsbCA/IGluZGljZXMgOiBibGFua3M7XHJcblxyXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgXCJmIFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZVBvc2l0aW9uc1swXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZVVWc1swXSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFjZU5vcm1hbHNbMF0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VQb3NpdGlvbnNbMV0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VVVnNbMV0gK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIi9cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VOb3JtYWxzWzFdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlUG9zaXRpb25zWzJdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIvXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlVVZzWzJdICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCIvXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlTm9ybWFsc1syXVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2JhY2sgZGUgcHJldmlvdXMgbWF0cml4LCB0byBub3QgY2hhbmdlIHRoZSBvcmlnaW5hbCBtZXNoIGluIHRoZSBzY2VuZVxyXG4gICAgICAgICAgICBpZiAoZ2xvYmFscG9zaXRpb24gJiYgaW52ZXJzZVRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgbWVzaC5iYWtlVHJhbnNmb3JtSW50b1ZlcnRpY2VzKGludmVyc2VUcmFuc2Zvcm0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHYgKz0gY3VycmVudFY7XHJcbiAgICAgICAgICAgIHRleHR1cmVWICs9IGN1cnJlbnRUZXh0dXJlVjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gb3V0cHV0LmpvaW4oXCJcXG5cIik7XHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBvcnRzIHRoZSBtYXRlcmlhbChzKSBvZiBhIG1lc2ggaW4gLk1UTCBmaWxlIGZvcm1hdCAodGV4dClcclxuICAgICAqIEBwYXJhbSBtZXNoIGRlZmluZXMgdGhlIG1lc2ggdG8gZXh0cmFjdCB0aGUgbWF0ZXJpYWwgZnJvbVxyXG4gICAgICogQHJldHVybnMgdGhlIG10bCBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIC8vVE9ETzogRXhwb3J0IHRoZSBtYXRlcmlhbHMgb2YgbWVzaCBhcnJheVxyXG4gICAgcHVibGljIHN0YXRpYyBNVEwobWVzaDogTWVzaCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gW107XHJcbiAgICAgICAgY29uc3QgbSA9IDxTdGFuZGFyZE1hdGVyaWFsPm1lc2gubWF0ZXJpYWw7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCJuZXdtdGwgbWF0MVwiKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgTnMgXCIgKyBtLnNwZWN1bGFyUG93ZXIudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIE5pIDEuNTAwMFwiKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgZCBcIiArIG0uYWxwaGEudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIFRyIDAuMDAwMFwiKTtcclxuICAgICAgICBvdXRwdXQucHVzaChcIiAgVGYgMS4wMDAwIDEuMDAwMCAxLjAwMDBcIik7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIGlsbHVtIDJcIik7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIEthIFwiICsgbS5hbWJpZW50Q29sb3Iuci50b0ZpeGVkKDQpICsgXCIgXCIgKyBtLmFtYmllbnRDb2xvci5nLnRvRml4ZWQoNCkgKyBcIiBcIiArIG0uYW1iaWVudENvbG9yLmIudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIEtkIFwiICsgbS5kaWZmdXNlQ29sb3Iuci50b0ZpeGVkKDQpICsgXCIgXCIgKyBtLmRpZmZ1c2VDb2xvci5nLnRvRml4ZWQoNCkgKyBcIiBcIiArIG0uZGlmZnVzZUNvbG9yLmIudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIEtzIFwiICsgbS5zcGVjdWxhckNvbG9yLnIudG9GaXhlZCg0KSArIFwiIFwiICsgbS5zcGVjdWxhckNvbG9yLmcudG9GaXhlZCg0KSArIFwiIFwiICsgbS5zcGVjdWxhckNvbG9yLmIudG9GaXhlZCg0KSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goXCIgIEtlIFwiICsgbS5lbWlzc2l2ZUNvbG9yLnIudG9GaXhlZCg0KSArIFwiIFwiICsgbS5lbWlzc2l2ZUNvbG9yLmcudG9GaXhlZCg0KSArIFwiIFwiICsgbS5lbWlzc2l2ZUNvbG9yLmIudG9GaXhlZCg0KSk7XHJcblxyXG4gICAgICAgIC8vVE9ETzogdXYgc2NhbGUsIG9mZnNldCwgd3JhcFxyXG4gICAgICAgIC8vVE9ETzogVVYgbWlycm9yZWQgaW4gQmxlbmRlcj8gc2Vjb25kIFVWIGNoYW5uZWw/IGxpZ2h0TWFwPyByZWZsZWN0aW9uIHRleHR1cmVzP1xyXG4gICAgICAgIGNvbnN0IHV2c2NhbGUgPSBcIlwiO1xyXG5cclxuICAgICAgICBpZiAobS5hbWJpZW50VGV4dHVyZSkge1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChcIiAgbWFwX0thIFwiICsgdXZzY2FsZSArIG0uYW1iaWVudFRleHR1cmUubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobS5kaWZmdXNlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChcIiAgbWFwX0tkIFwiICsgdXZzY2FsZSArIG0uZGlmZnVzZVRleHR1cmUubmFtZSk7XHJcbiAgICAgICAgICAgIC8vVE9ETzogYWxwaGEgdGVzdGluZywgb3BhY2l0eSBpbiBkaWZmdXNlIHRleHR1cmUgYWxwaGEgY2hhbm5lbCAoZGlmZnVzZVRleHR1cmUuaGFzQWxwaGEgLT4gbWFwX2QpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobS5zcGVjdWxhclRleHR1cmUpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCIgIG1hcF9LcyBcIiArIHV2c2NhbGUgKyBtLnNwZWN1bGFyVGV4dHVyZS5uYW1lKTtcclxuICAgICAgICAgICAgLyogVE9ETzogZ2xvc3NpbmVzcyA9IHNwZWN1bGFyIGhpZ2hsaWdodCBjb21wb25lbnQgaXMgaW4gYWxwaGEgY2hhbm5lbCBvZiBzcGVjdWxhclRleHR1cmUuICg/Pz8pXHJcbiAgICAgICAgICAgIGlmIChtLnVzZUdsb3NzaW5lc3NGcm9tU3BlY3VsYXJNYXBBbHBoYSkgIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKFwiICBtYXBfTnMgXCIrdXZzY2FsZSArIG0uc3BlY3VsYXJUZXh0dXJlLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiBUT0RPOiBlbWlzc2l2ZSB0ZXh0dXJlIG5vdCBpbiAuTUFUIGZvcm1hdCAoPz8/KVxyXG4gICAgICAgIGlmIChtLmVtaXNzaXZlVGV4dHVyZSkge1xyXG4gICAgICAgICAgICBvdXRwdXQucHVzaChcIiAgbWFwX2QgXCIrdXZzY2FsZSttLmVtaXNzaXZlVGV4dHVyZS5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICAgaWYgKG0uYnVtcFRleHR1cmUpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnB1c2goXCIgIG1hcF9idW1wIC1pbWZjaGFuIHogXCIgKyB1dnNjYWxlICsgbS5idW1wVGV4dHVyZS5uYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtLm9wYWNpdHlUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKFwiICBtYXBfZCBcIiArIHV2c2NhbGUgKyBtLm9wYWNpdHlUZXh0dXJlLm5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGV4dCA9IG91dHB1dC5qb2luKFwiXFxuXCIpO1xyXG4gICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgfVxyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmltcG9ydCAqIGFzIFNlcmlhbGl6ZXJzIGZyb20gXCJzZXJpYWxpemVycy9PQkovaW5kZXhcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIFVNRCBtb2R1bGUuXHJcbiAqIFRoZSBlbnRyeSBwb2ludCBmb3IgYSBmdXR1cmUgRVNNIHBhY2thZ2Ugc2hvdWxkIGJlIGluZGV4LnRzXHJcbiAqL1xyXG5jb25zdCBnbG9iYWxPYmplY3QgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcclxuaWYgKHR5cGVvZiBnbG9iYWxPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGZvciAoY29uc3Qgc2VyaWFsaXplciBpbiBTZXJpYWxpemVycykge1xyXG4gICAgICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTltzZXJpYWxpemVyXSA9ICg8YW55PlNlcmlhbGl6ZXJzKVtzZXJpYWxpemVyXTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSBcInNlcmlhbGl6ZXJzL09CSi9pbmRleFwiO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2NfdG9vbHNfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBzZXJpYWxpemVycyBmcm9tIFwiQGx0cy9zZXJpYWxpemVycy9sZWdhY3kvbGVnYWN5LW9ialNlcmlhbGl6ZXJcIjtcclxuZXhwb3J0IHsgc2VyaWFsaXplcnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgc2VyaWFsaXplcnM7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==