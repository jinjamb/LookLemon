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

/***/ "../../../dev/loaders/src/STL/index.ts":
/*!*********************************************!*\
  !*** ../../../dev/loaders/src/STL/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoader: () => (/* reexport safe */ _stlFileLoader__WEBPACK_IMPORTED_MODULE_0__.STLFileLoader)
/* harmony export */ });
/* harmony import */ var _stlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stlFileLoader */ "../../../dev/loaders/src/STL/stlFileLoader.ts");



/***/ }),

/***/ "../../../dev/loaders/src/STL/stlFileLoader.metadata.ts":
/*!**************************************************************!*\
  !*** ../../../dev/loaders/src/STL/stlFileLoader.metadata.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoaderMetadata: () => (/* binding */ STLFileLoaderMetadata)
/* harmony export */ });
var STLFileLoaderMetadata = {
    name: "stl",
    extensions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ".stl": { isBinary: true },
    },
};


/***/ }),

/***/ "../../../dev/loaders/src/STL/stlFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/STL/stlFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoader: () => (/* binding */ STLFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/standardMaterial */ "babylonjs/Misc/tools");
/* harmony import */ var babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stlFileLoader_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stlFileLoader.metadata */ "../../../dev/loaders/src/STL/stlFileLoader.metadata.ts");







/**
 * STL file type loader.
 * This is a babylon scene loader plugin.
 */
var STLFileLoader = /** @class */ (function () {
    function STLFileLoader() {
        /** @internal */
        this.solidPattern = /solid (\S*)([\S\s]*?)endsolid[ ]*(\S*)/g;
        /** @internal */
        this.facetsPattern = /facet([\s\S]*?)endfacet/g;
        /** @internal */
        this.normalPattern = /normal[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g;
        /** @internal */
        this.vertexPattern = /vertex[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g;
        /**
         * Defines the name of the plugin.
         */
        this.name = _stlFileLoader_metadata__WEBPACK_IMPORTED_MODULE_1__.STLFileLoaderMetadata.name;
        /**
         * Defines the extensions the stl loader is able to load.
         * force data to come in as an ArrayBuffer
         * we'll convert to string if it looks like it's an ASCII .stl
         */
        this.extensions = _stlFileLoader_metadata__WEBPACK_IMPORTED_MODULE_1__.STLFileLoaderMetadata.extensions;
    }
    /**
     * Import meshes into a scene.
     * @param meshesNames An array of mesh names, a single mesh name, or empty string for all meshes that filter what meshes are imported
     * @param scene The scene to import into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @param meshes The meshes array to import into
     * @returns True if successful or false otherwise
     */
    STLFileLoader.prototype.importMesh = function (meshesNames, scene, data, rootUrl, meshes) {
        var matches;
        if (typeof data !== "string") {
            if (this._isBinary(data)) {
                // binary .stl
                var babylonMesh = new babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Mesh("stlmesh", scene);
                this._parseBinary(babylonMesh, data);
                if (meshes) {
                    meshes.push(babylonMesh);
                }
                return true;
            }
            // ASCII .stl
            // convert to string
            data = new TextDecoder().decode(new Uint8Array(data));
        }
        //if arrived here, data is a string, containing the STLA data.
        while ((matches = this.solidPattern.exec(data))) {
            var meshName = matches[1];
            var meshNameFromEnd = matches[3];
            if (meshNameFromEnd && meshName != meshNameFromEnd) {
                babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Tools.Error("Error in STL, solid name != endsolid name");
                return false;
            }
            // check meshesNames
            if (meshesNames && meshName) {
                if (meshesNames instanceof Array) {
                    if (!meshesNames.indexOf(meshName)) {
                        continue;
                    }
                }
                else {
                    if (meshName !== meshesNames) {
                        continue;
                    }
                }
            }
            // stl mesh name can be empty as well
            meshName = meshName || "stlmesh";
            var babylonMesh = new babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.Mesh(meshName, scene);
            this._parseASCII(babylonMesh, matches[2]);
            if (meshes) {
                meshes.push(babylonMesh);
            }
        }
        return true;
    };
    /**
     * Load into a scene.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns true if successful or false otherwise
     */
    STLFileLoader.prototype.load = function (scene, data, rootUrl) {
        var result = this.importMesh(null, scene, data, rootUrl, null);
        return result;
    };
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    STLFileLoader.prototype.loadAssetContainer = function (scene, data, rootUrl) {
        var container = new babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
        scene._blockEntityCollection = true;
        this.importMesh(null, scene, data, rootUrl, container.meshes);
        scene._blockEntityCollection = false;
        return container;
    };
    STLFileLoader.prototype._isBinary = function (data) {
        // check if file size is correct for binary stl
        var reader = new DataView(data);
        // A Binary STL header is 80 bytes, if the data size is not great than
        // that then it's not a binary STL.
        if (reader.byteLength <= 80) {
            return false;
        }
        var faceSize = (32 / 8) * 3 + (32 / 8) * 3 * 3 + 16 / 8;
        var nFaces = reader.getUint32(80, true);
        if (80 + 32 / 8 + nFaces * faceSize === reader.byteLength) {
            return true;
        }
        // US-ASCII begin with 's', 'o', 'l', 'i', 'd'
        var ascii = [115, 111, 108, 105, 100];
        for (var off = 0; off < 5; off++) {
            if (reader.getUint8(off) !== ascii[off]) {
                return true;
            }
        }
        return false;
    };
    STLFileLoader.prototype._parseBinary = function (mesh, data) {
        var reader = new DataView(data);
        var faces = reader.getUint32(80, true);
        var dataOffset = 84;
        var faceLength = 12 * 4 + 2;
        var offset = 0;
        var positions = new Float32Array(faces * 3 * 3);
        var normals = new Float32Array(faces * 3 * 3);
        var indices = new Uint32Array(faces * 3);
        var indicesCount = 0;
        for (var face = 0; face < faces; face++) {
            var start = dataOffset + face * faceLength;
            var normalX = reader.getFloat32(start, true);
            var normalY = reader.getFloat32(start + 4, true);
            var normalZ = reader.getFloat32(start + 8, true);
            for (var i = 1; i <= 3; i++) {
                var vertexstart = start + i * 12;
                // ordering is intentional to match ascii import
                positions[offset] = reader.getFloat32(vertexstart, true);
                normals[offset] = normalX;
                if (!STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                    positions[offset + 2] = reader.getFloat32(vertexstart + 4, true);
                    positions[offset + 1] = reader.getFloat32(vertexstart + 8, true);
                    normals[offset + 2] = normalY;
                    normals[offset + 1] = normalZ;
                }
                else {
                    positions[offset + 1] = reader.getFloat32(vertexstart + 4, true);
                    positions[offset + 2] = reader.getFloat32(vertexstart + 8, true);
                    normals[offset + 1] = normalY;
                    normals[offset + 2] = normalZ;
                }
                offset += 3;
            }
            if (STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                indices[indicesCount] = indicesCount;
                indices[indicesCount + 1] = indicesCount + 2;
                indices[indicesCount + 2] = indicesCount + 1;
                indicesCount += 3;
            }
            else {
                indices[indicesCount] = indicesCount++;
                indices[indicesCount] = indicesCount++;
                indices[indicesCount] = indicesCount++;
            }
        }
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, positions);
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
        mesh.setIndices(indices);
        mesh.computeWorldMatrix(true);
    };
    STLFileLoader.prototype._parseASCII = function (mesh, solidData) {
        var positions = [];
        var normals = [];
        var indices = [];
        var indicesCount = 0;
        //load facets, ignoring loop as the standard doesn't define it can contain more than vertices
        var matches;
        while ((matches = this.facetsPattern.exec(solidData))) {
            var facet = matches[1];
            //one normal per face
            var normalMatches = this.normalPattern.exec(facet);
            this.normalPattern.lastIndex = 0;
            if (!normalMatches) {
                continue;
            }
            var normal = [Number(normalMatches[1]), Number(normalMatches[5]), Number(normalMatches[3])];
            var vertexMatch = void 0;
            while ((vertexMatch = this.vertexPattern.exec(facet))) {
                if (!STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                    positions.push(Number(vertexMatch[1]), Number(vertexMatch[5]), Number(vertexMatch[3]));
                    normals.push(normal[0], normal[1], normal[2]);
                }
                else {
                    positions.push(Number(vertexMatch[1]), Number(vertexMatch[3]), Number(vertexMatch[5]));
                    // Flipping the second and third component because inverted
                    // when normal was declared.
                    normals.push(normal[0], normal[2], normal[1]);
                }
            }
            if (STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES) {
                indices.push(indicesCount, indicesCount + 2, indicesCount + 1);
                indicesCount += 3;
            }
            else {
                indices.push(indicesCount++, indicesCount++, indicesCount++);
            }
            this.vertexPattern.lastIndex = 0;
        }
        this.facetsPattern.lastIndex = 0;
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, positions);
        mesh.setVerticesData(babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
        mesh.setIndices(indices);
        mesh.computeWorldMatrix(true);
    };
    /**
     * Defines if Y and Z axes are swapped or not when loading an STL file.
     * The default is false to maintain backward compatibility. When set to
     * true, coordinates from the STL file are used without change.
     */
    STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES = false;
    return STLFileLoader;
}());

(0,babylonjs_Misc_tools__WEBPACK_IMPORTED_MODULE_0__.registerSceneLoaderPlugin)(new STLFileLoader());


/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-stlFileLoader.ts":
/*!***************************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-stlFileLoader.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STLFileLoader: () => (/* reexport safe */ loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__.STLFileLoader)
/* harmony export */ });
/* harmony import */ var loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/STL/index */ "../../../dev/loaders/src/STL/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__) {
        if (!globalObject.BABYLON[key]) {
            globalObject.BABYLON[key] = loaders_STL_index__WEBPACK_IMPORTED_MODULE_0__[key];
        }
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
/*!******************************!*\
  !*** ./src/stlFileLoader.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loaders: () => (/* reexport module object */ _lts_loaders_legacy_legacy_stlFileLoader__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_loaders_legacy_legacy_stlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/loaders/legacy/legacy-stlFileLoader */ "../../../lts/loaders/src/legacy/legacy-stlFileLoader.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_loaders_legacy_legacy_stlFileLoader__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5zdGxGaWxlTG9hZGVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7Ozs7Ozs7Ozs7QUNHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFZQTs7O0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTs7OztBQUlBO0FBQ0E7QUE2T0E7QUFwT0E7Ozs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFPQTs7OztBQUlBO0FBQ0E7QUFzT0E7QUFBQTtBQWxRQTtBQW9RQTs7Ozs7Ozs7Ozs7Ozs7OztBQy9SQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQ2hCQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9kZXYvbG9hZGVycy9zcmMvU1RML2luZGV4LnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL1NUTC9zdGxGaWxlTG9hZGVyLm1ldGFkYXRhLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL1NUTC9zdGxGaWxlTG9hZGVyLnRzIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vbHRzL2xvYWRlcnMvc3JjL2xlZ2FjeS9sZWdhY3ktc3RsRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0xPQURFUlMvLi9zcmMvc3RsRmlsZUxvYWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYWJ5bG9uanMtbG9hZGVyc1wiLCBbXCJiYWJ5bG9uanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYmFieWxvbmpzLWxvYWRlcnNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkxPQURFUlNcIl0gPSBmYWN0b3J5KHJvb3RbXCJCQUJZTE9OXCJdKTtcbn0pKCh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyksIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NaXNjX3Rvb2xzX18pID0+IHtcbnJldHVybiAiLCJleHBvcnQgKiBmcm9tIFwiLi9zdGxGaWxlTG9hZGVyXCI7XHJcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8taW50ZXJuYWwtbW9kdWxlc1xyXG5pbXBvcnQgdHlwZSB7IElTY2VuZUxvYWRlclBsdWdpbkV4dGVuc2lvbnMsIElTY2VuZUxvYWRlclBsdWdpbk1ldGFkYXRhIH0gZnJvbSBcImNvcmUvaW5kZXhcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBTVExGaWxlTG9hZGVyTWV0YWRhdGEgPSB7XHJcbiAgICBuYW1lOiBcInN0bFwiLFxyXG5cclxuICAgIGV4dGVuc2lvbnM6IHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICAgICAgXCIuc3RsXCI6IHsgaXNCaW5hcnk6IHRydWUgfSxcclxuICAgIH0gYXMgY29uc3Qgc2F0aXNmaWVzIElTY2VuZUxvYWRlclBsdWdpbkV4dGVuc2lvbnMsXHJcbn0gYXMgY29uc3Qgc2F0aXNmaWVzIElTY2VuZUxvYWRlclBsdWdpbk1ldGFkYXRhO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0IHR5cGUgeyBOdWxsYWJsZSB9IGZyb20gXCJjb3JlL3R5cGVzXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcImNvcmUvTWlzYy90b29sc1wiO1xyXG5pbXBvcnQgeyBWZXJ0ZXhCdWZmZXIgfSBmcm9tIFwiY29yZS9CdWZmZXJzL2J1ZmZlclwiO1xyXG5pbXBvcnQgdHlwZSB7IEFic3RyYWN0TWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9hYnN0cmFjdE1lc2hcIjtcclxuaW1wb3J0IHsgTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9tZXNoXCI7XHJcbmltcG9ydCB0eXBlIHsgSVNjZW5lTG9hZGVyUGx1Z2luIH0gZnJvbSBcImNvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xyXG5pbXBvcnQgeyByZWdpc3RlclNjZW5lTG9hZGVyUGx1Z2luIH0gZnJvbSBcImNvcmUvTG9hZGluZy9zY2VuZUxvYWRlclwiO1xyXG5pbXBvcnQgeyBBc3NldENvbnRhaW5lciB9IGZyb20gXCJjb3JlL2Fzc2V0Q29udGFpbmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgeyBTVExGaWxlTG9hZGVyTWV0YWRhdGEgfSBmcm9tIFwiLi9zdGxGaWxlTG9hZGVyLm1ldGFkYXRhXCI7XHJcbmltcG9ydCBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuXHJcbmRlY2xhcmUgbW9kdWxlIFwiY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCIge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzZG9jL3JlcXVpcmUtanNkb2NcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgU2NlbmVMb2FkZXJQbHVnaW5PcHRpb25zIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmVzIG9wdGlvbnMgZm9yIHRoZSBzdGwgbG9hZGVyLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFtTVExGaWxlTG9hZGVyTWV0YWRhdGEubmFtZV06IHt9O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogU1RMIGZpbGUgdHlwZSBsb2FkZXIuXHJcbiAqIFRoaXMgaXMgYSBiYWJ5bG9uIHNjZW5lIGxvYWRlciBwbHVnaW4uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU1RMRmlsZUxvYWRlciBpbXBsZW1lbnRzIElTY2VuZUxvYWRlclBsdWdpbiB7XHJcbiAgICAvKiogQGludGVybmFsICovXHJcbiAgICBwdWJsaWMgc29saWRQYXR0ZXJuID0gL3NvbGlkIChcXFMqKShbXFxTXFxzXSo/KWVuZHNvbGlkWyBdKihcXFMqKS9nO1xyXG5cclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBmYWNldHNQYXR0ZXJuID0gL2ZhY2V0KFtcXHNcXFNdKj8pZW5kZmFjZXQvZztcclxuICAgIC8qKiBAaW50ZXJuYWwgKi9cclxuICAgIHB1YmxpYyBub3JtYWxQYXR0ZXJuID0gL25vcm1hbFtcXHNdKyhbLStdP1swLTldK1xcLj9bMC05XSooW2VFXVstK10/WzAtOV0rKT8pK1tcXHNdKyhbLStdP1swLTldKlxcLj9bMC05XSsoW2VFXVstK10/WzAtOV0rKT8pK1tcXHNdKyhbLStdP1swLTldKlxcLj9bMC05XSsoW2VFXVstK10/WzAtOV0rKT8pKy9nO1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgcHVibGljIHZlcnRleFBhdHRlcm4gPSAvdmVydGV4W1xcc10rKFstK10/WzAtOV0rXFwuP1swLTldKihbZUVdWy0rXT9bMC05XSspPykrW1xcc10rKFstK10/WzAtOV0qXFwuP1swLTldKyhbZUVdWy0rXT9bMC05XSspPykrW1xcc10rKFstK10/WzAtOV0qXFwuP1swLTldKyhbZUVdWy0rXT9bMC05XSspPykrL2c7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBuYW1lIG9mIHRoZSBwbHVnaW4uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lID0gU1RMRmlsZUxvYWRlck1ldGFkYXRhLm5hbWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBleHRlbnNpb25zIHRoZSBzdGwgbG9hZGVyIGlzIGFibGUgdG8gbG9hZC5cclxuICAgICAqIGZvcmNlIGRhdGEgdG8gY29tZSBpbiBhcyBhbiBBcnJheUJ1ZmZlclxyXG4gICAgICogd2UnbGwgY29udmVydCB0byBzdHJpbmcgaWYgaXQgbG9va3MgbGlrZSBpdCdzIGFuIEFTQ0lJIC5zdGxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGV4dGVuc2lvbnMgPSBTVExGaWxlTG9hZGVyTWV0YWRhdGEuZXh0ZW5zaW9ucztcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgaWYgWSBhbmQgWiBheGVzIGFyZSBzd2FwcGVkIG9yIG5vdCB3aGVuIGxvYWRpbmcgYW4gU1RMIGZpbGUuXHJcbiAgICAgKiBUaGUgZGVmYXVsdCBpcyBmYWxzZSB0byBtYWludGFpbiBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LiBXaGVuIHNldCB0b1xyXG4gICAgICogdHJ1ZSwgY29vcmRpbmF0ZXMgZnJvbSB0aGUgU1RMIGZpbGUgYXJlIHVzZWQgd2l0aG91dCBjaGFuZ2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRE9fTk9UX0FMVEVSX0ZJTEVfQ09PUkRJTkFURVMgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcG9ydCBtZXNoZXMgaW50byBhIHNjZW5lLlxyXG4gICAgICogQHBhcmFtIG1lc2hlc05hbWVzIEFuIGFycmF5IG9mIG1lc2ggbmFtZXMsIGEgc2luZ2xlIG1lc2ggbmFtZSwgb3IgZW1wdHkgc3RyaW5nIGZvciBhbGwgbWVzaGVzIHRoYXQgZmlsdGVyIHdoYXQgbWVzaGVzIGFyZSBpbXBvcnRlZFxyXG4gICAgICogQHBhcmFtIHNjZW5lIFRoZSBzY2VuZSB0byBpbXBvcnQgaW50b1xyXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gaW1wb3J0XHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBUaGUgcm9vdCB1cmwgZm9yIHNjZW5lIGFuZCByZXNvdXJjZXNcclxuICAgICAqIEBwYXJhbSBtZXNoZXMgVGhlIG1lc2hlcyBhcnJheSB0byBpbXBvcnQgaW50b1xyXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiBzdWNjZXNzZnVsIG9yIGZhbHNlIG90aGVyd2lzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW1wb3J0TWVzaChtZXNoZXNOYW1lczogYW55LCBzY2VuZTogU2NlbmUsIGRhdGE6IGFueSwgcm9vdFVybDogc3RyaW5nLCBtZXNoZXM6IE51bGxhYmxlPEFic3RyYWN0TWVzaFtdPik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBtYXRjaGVzO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQmluYXJ5KGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBiaW5hcnkgLnN0bFxyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFieWxvbk1lc2ggPSBuZXcgTWVzaChcInN0bG1lc2hcIiwgc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyc2VCaW5hcnkoYmFieWxvbk1lc2gsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc2hlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc2hlcy5wdXNoKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBU0NJSSAuc3RsXHJcblxyXG4gICAgICAgICAgICAvLyBjb252ZXJ0IHRvIHN0cmluZ1xyXG4gICAgICAgICAgICBkYXRhID0gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKG5ldyBVaW50OEFycmF5KGRhdGEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaWYgYXJyaXZlZCBoZXJlLCBkYXRhIGlzIGEgc3RyaW5nLCBjb250YWluaW5nIHRoZSBTVExBIGRhdGEuXHJcblxyXG4gICAgICAgIHdoaWxlICgobWF0Y2hlcyA9IHRoaXMuc29saWRQYXR0ZXJuLmV4ZWMoZGF0YSkpKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXNoTmFtZSA9IG1hdGNoZXNbMV07XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc2hOYW1lRnJvbUVuZCA9IG1hdGNoZXNbM107XHJcbiAgICAgICAgICAgIGlmIChtZXNoTmFtZUZyb21FbmQgJiYgbWVzaE5hbWUgIT0gbWVzaE5hbWVGcm9tRW5kKSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5FcnJvcihcIkVycm9yIGluIFNUTCwgc29saWQgbmFtZSAhPSBlbmRzb2xpZCBuYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBtZXNoZXNOYW1lc1xyXG4gICAgICAgICAgICBpZiAobWVzaGVzTmFtZXMgJiYgbWVzaE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXNoZXNOYW1lcyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtZXNoZXNOYW1lcy5pbmRleE9mKG1lc2hOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNoTmFtZSAhPT0gbWVzaGVzTmFtZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzdGwgbWVzaCBuYW1lIGNhbiBiZSBlbXB0eSBhcyB3ZWxsXHJcbiAgICAgICAgICAgIG1lc2hOYW1lID0gbWVzaE5hbWUgfHwgXCJzdGxtZXNoXCI7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBiYWJ5bG9uTWVzaCA9IG5ldyBNZXNoKG1lc2hOYW1lLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcnNlQVNDSUkoYmFieWxvbk1lc2gsIG1hdGNoZXNbMl0pO1xyXG4gICAgICAgICAgICBpZiAobWVzaGVzKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNoZXMucHVzaChiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBpbnRvIGEgc2NlbmUuXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgVGhlIHNjZW5lIHRvIGxvYWQgaW50b1xyXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gaW1wb3J0XHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBUaGUgcm9vdCB1cmwgZm9yIHNjZW5lIGFuZCByZXNvdXJjZXNcclxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgc3VjY2Vzc2Z1bCBvciBmYWxzZSBvdGhlcndpc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWQoc2NlbmU6IFNjZW5lLCBkYXRhOiBhbnksIHJvb3RVcmw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuaW1wb3J0TWVzaChudWxsLCBzY2VuZSwgZGF0YSwgcm9vdFVybCwgbnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgaW50byBhbiBhc3NldCBjb250YWluZXIuXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgVGhlIHNjZW5lIHRvIGxvYWQgaW50b1xyXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gaW1wb3J0XHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBUaGUgcm9vdCB1cmwgZm9yIHNjZW5lIGFuZCByZXNvdXJjZXNcclxuICAgICAqIEByZXR1cm5zIFRoZSBsb2FkZWQgYXNzZXQgY29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQXNzZXRDb250YWluZXIoc2NlbmU6IFNjZW5lLCBkYXRhOiBzdHJpbmcsIHJvb3RVcmw6IHN0cmluZyk6IEFzc2V0Q29udGFpbmVyIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBuZXcgQXNzZXRDb250YWluZXIoc2NlbmUpO1xyXG4gICAgICAgIHNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaW1wb3J0TWVzaChudWxsLCBzY2VuZSwgZGF0YSwgcm9vdFVybCwgY29udGFpbmVyLm1lc2hlcyk7XHJcbiAgICAgICAgc2NlbmUuX2Jsb2NrRW50aXR5Q29sbGVjdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNCaW5hcnkoZGF0YTogYW55KSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZmlsZSBzaXplIGlzIGNvcnJlY3QgZm9yIGJpbmFyeSBzdGxcclxuICAgICAgICBjb25zdCByZWFkZXIgPSBuZXcgRGF0YVZpZXcoZGF0YSk7XHJcblxyXG4gICAgICAgIC8vIEEgQmluYXJ5IFNUTCBoZWFkZXIgaXMgODAgYnl0ZXMsIGlmIHRoZSBkYXRhIHNpemUgaXMgbm90IGdyZWF0IHRoYW5cclxuICAgICAgICAvLyB0aGF0IHRoZW4gaXQncyBub3QgYSBiaW5hcnkgU1RMLlxyXG4gICAgICAgIGlmIChyZWFkZXIuYnl0ZUxlbmd0aCA8PSA4MCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmYWNlU2l6ZSA9ICgzMiAvIDgpICogMyArICgzMiAvIDgpICogMyAqIDMgKyAxNiAvIDg7XHJcbiAgICAgICAgY29uc3QgbkZhY2VzID0gcmVhZGVyLmdldFVpbnQzMig4MCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICg4MCArIDMyIC8gOCArIG5GYWNlcyAqIGZhY2VTaXplID09PSByZWFkZXIuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVTLUFTQ0lJIGJlZ2luIHdpdGggJ3MnLCAnbycsICdsJywgJ2knLCAnZCdcclxuICAgICAgICBjb25zdCBhc2NpaSA9IFsxMTUsIDExMSwgMTA4LCAxMDUsIDEwMF07XHJcbiAgICAgICAgZm9yIChsZXQgb2ZmID0gMDsgb2ZmIDwgNTsgb2ZmKyspIHtcclxuICAgICAgICAgICAgaWYgKHJlYWRlci5nZXRVaW50OChvZmYpICE9PSBhc2NpaVtvZmZdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3BhcnNlQmluYXJ5KG1lc2g6IE1lc2gsIGRhdGE6IEFycmF5QnVmZmVyKSB7XHJcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IERhdGFWaWV3KGRhdGEpO1xyXG4gICAgICAgIGNvbnN0IGZhY2VzID0gcmVhZGVyLmdldFVpbnQzMig4MCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRhdGFPZmZzZXQgPSA4NDtcclxuICAgICAgICBjb25zdCBmYWNlTGVuZ3RoID0gMTIgKiA0ICsgMjtcclxuXHJcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkoZmFjZXMgKiAzICogMyk7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkoZmFjZXMgKiAzICogMyk7XHJcbiAgICAgICAgY29uc3QgaW5kaWNlcyA9IG5ldyBVaW50MzJBcnJheShmYWNlcyAqIDMpO1xyXG4gICAgICAgIGxldCBpbmRpY2VzQ291bnQgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBmYWNlID0gMDsgZmFjZSA8IGZhY2VzOyBmYWNlKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBkYXRhT2Zmc2V0ICsgZmFjZSAqIGZhY2VMZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbFggPSByZWFkZXIuZ2V0RmxvYXQzMihzdGFydCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbFkgPSByZWFkZXIuZ2V0RmxvYXQzMihzdGFydCArIDQsIHRydWUpO1xyXG4gICAgICAgICAgICBjb25zdCBub3JtYWxaID0gcmVhZGVyLmdldEZsb2F0MzIoc3RhcnQgKyA4LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmVydGV4c3RhcnQgPSBzdGFydCArIGkgKiAxMjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvcmRlcmluZyBpcyBpbnRlbnRpb25hbCB0byBtYXRjaCBhc2NpaSBpbXBvcnRcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tvZmZzZXRdID0gcmVhZGVyLmdldEZsb2F0MzIodmVydGV4c3RhcnQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsc1tvZmZzZXRdID0gbm9ybWFsWDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIVNUTEZpbGVMb2FkZXIuRE9fTk9UX0FMVEVSX0ZJTEVfQ09PUkRJTkFURVMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnNbb2Zmc2V0ICsgMl0gPSByZWFkZXIuZ2V0RmxvYXQzMih2ZXJ0ZXhzdGFydCArIDQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tvZmZzZXQgKyAxXSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0ICsgOCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbHNbb2Zmc2V0ICsgMl0gPSBub3JtYWxZO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbHNbb2Zmc2V0ICsgMV0gPSBub3JtYWxaO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnNbb2Zmc2V0ICsgMV0gPSByZWFkZXIuZ2V0RmxvYXQzMih2ZXJ0ZXhzdGFydCArIDQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uc1tvZmZzZXQgKyAyXSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0ICsgOCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbHNbb2Zmc2V0ICsgMV0gPSBub3JtYWxZO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbHNbb2Zmc2V0ICsgMl0gPSBub3JtYWxaO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9mZnNldCArPSAzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoU1RMRmlsZUxvYWRlci5ET19OT1RfQUxURVJfRklMRV9DT09SRElOQVRFUykge1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlc1tpbmRpY2VzQ291bnRdID0gaW5kaWNlc0NvdW50O1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlc1tpbmRpY2VzQ291bnQgKyAxXSA9IGluZGljZXNDb3VudCArIDI7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzW2luZGljZXNDb3VudCArIDJdID0gaW5kaWNlc0NvdW50ICsgMTtcclxuICAgICAgICAgICAgICAgIGluZGljZXNDb3VudCArPSAzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlc1tpbmRpY2VzQ291bnRdID0gaW5kaWNlc0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzW2luZGljZXNDb3VudF0gPSBpbmRpY2VzQ291bnQrKztcclxuICAgICAgICAgICAgICAgIGluZGljZXNbaW5kaWNlc0NvdW50XSA9IGluZGljZXNDb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXNoLnNldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuUG9zaXRpb25LaW5kLCBwb3NpdGlvbnMpO1xyXG4gICAgICAgIG1lc2guc2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kLCBub3JtYWxzKTtcclxuICAgICAgICBtZXNoLnNldEluZGljZXMoaW5kaWNlcyk7XHJcbiAgICAgICAgbWVzaC5jb21wdXRlV29ybGRNYXRyaXgodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcGFyc2VBU0NJSShtZXNoOiBNZXNoLCBzb2xpZERhdGE6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IG5vcm1hbHMgPSBbXTtcclxuICAgICAgICBjb25zdCBpbmRpY2VzID0gW107XHJcbiAgICAgICAgbGV0IGluZGljZXNDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIC8vbG9hZCBmYWNldHMsIGlnbm9yaW5nIGxvb3AgYXMgdGhlIHN0YW5kYXJkIGRvZXNuJ3QgZGVmaW5lIGl0IGNhbiBjb250YWluIG1vcmUgdGhhbiB2ZXJ0aWNlc1xyXG4gICAgICAgIGxldCBtYXRjaGVzO1xyXG4gICAgICAgIHdoaWxlICgobWF0Y2hlcyA9IHRoaXMuZmFjZXRzUGF0dGVybi5leGVjKHNvbGlkRGF0YSkpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY2V0ID0gbWF0Y2hlc1sxXTtcclxuICAgICAgICAgICAgLy9vbmUgbm9ybWFsIHBlciBmYWNlXHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbE1hdGNoZXMgPSB0aGlzLm5vcm1hbFBhdHRlcm4uZXhlYyhmYWNldCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9ybWFsUGF0dGVybi5sYXN0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICBpZiAoIW5vcm1hbE1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbCA9IFtOdW1iZXIobm9ybWFsTWF0Y2hlc1sxXSksIE51bWJlcihub3JtYWxNYXRjaGVzWzVdKSwgTnVtYmVyKG5vcm1hbE1hdGNoZXNbM10pXTtcclxuXHJcbiAgICAgICAgICAgIGxldCB2ZXJ0ZXhNYXRjaDtcclxuICAgICAgICAgICAgd2hpbGUgKCh2ZXJ0ZXhNYXRjaCA9IHRoaXMudmVydGV4UGF0dGVybi5leGVjKGZhY2V0KSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghU1RMRmlsZUxvYWRlci5ET19OT1RfQUxURVJfRklMRV9DT09SRElOQVRFUykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKE51bWJlcih2ZXJ0ZXhNYXRjaFsxXSksIE51bWJlcih2ZXJ0ZXhNYXRjaFs1XSksIE51bWJlcih2ZXJ0ZXhNYXRjaFszXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaChub3JtYWxbMF0sIG5vcm1hbFsxXSwgbm9ybWFsWzJdKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zLnB1c2goTnVtYmVyKHZlcnRleE1hdGNoWzFdKSwgTnVtYmVyKHZlcnRleE1hdGNoWzNdKSwgTnVtYmVyKHZlcnRleE1hdGNoWzVdKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZsaXBwaW5nIHRoZSBzZWNvbmQgYW5kIHRoaXJkIGNvbXBvbmVudCBiZWNhdXNlIGludmVydGVkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hlbiBub3JtYWwgd2FzIGRlY2xhcmVkLlxyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbHMucHVzaChub3JtYWxbMF0sIG5vcm1hbFsyXSwgbm9ybWFsWzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoU1RMRmlsZUxvYWRlci5ET19OT1RfQUxURVJfRklMRV9DT09SRElOQVRFUykge1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlcy5wdXNoKGluZGljZXNDb3VudCwgaW5kaWNlc0NvdW50ICsgMiwgaW5kaWNlc0NvdW50ICsgMSk7XHJcbiAgICAgICAgICAgICAgICBpbmRpY2VzQ291bnQgKz0gMztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluZGljZXMucHVzaChpbmRpY2VzQ291bnQrKywgaW5kaWNlc0NvdW50KyssIGluZGljZXNDb3VudCsrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnZlcnRleFBhdHRlcm4ubGFzdEluZGV4ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZmFjZXRzUGF0dGVybi5sYXN0SW5kZXggPSAwO1xyXG4gICAgICAgIG1lc2guc2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQsIHBvc2l0aW9ucyk7XHJcbiAgICAgICAgbWVzaC5zZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLk5vcm1hbEtpbmQsIG5vcm1hbHMpO1xyXG4gICAgICAgIG1lc2guc2V0SW5kaWNlcyhpbmRpY2VzKTtcclxuICAgICAgICBtZXNoLmNvbXB1dGVXb3JsZE1hdHJpeCh0cnVlKTtcclxuICAgIH1cclxufVxyXG5cclxucmVnaXN0ZXJTY2VuZUxvYWRlclBsdWdpbihuZXcgU1RMRmlsZUxvYWRlcigpKTtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgTG9hZGVycyBmcm9tIFwibG9hZGVycy9TVEwvaW5kZXhcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBlbnRyeSBwb2ludCBmb3IgdGhlIFVNRCBtb2R1bGUuXHJcbiAqIFRoZSBlbnRyeSBwb2ludCBmb3IgYSBmdXR1cmUgRVNNIHBhY2thZ2Ugc2hvdWxkIGJlIGluZGV4LnRzXHJcbiAqL1xyXG5jb25zdCBnbG9iYWxPYmplY3QgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHVuZGVmaW5lZDtcclxuaWYgKHR5cGVvZiBnbG9iYWxPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIExvYWRlcnMpIHtcclxuICAgICAgICBpZiAoISg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTltrZXldKSB7XHJcbiAgICAgICAgICAgICg8YW55Pmdsb2JhbE9iamVjdCkuQkFCWUxPTltrZXldID0gKDxhbnk+TG9hZGVycylba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJsb2FkZXJzL1NUTC9pbmRleFwiO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2NfdG9vbHNfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBsb2FkZXJzIGZyb20gXCJAbHRzL2xvYWRlcnMvbGVnYWN5L2xlZ2FjeS1zdGxGaWxlTG9hZGVyXCI7XHJcbmV4cG9ydCB7IGxvYWRlcnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgbG9hZGVycztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9