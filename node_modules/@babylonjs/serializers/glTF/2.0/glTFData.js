import { GetMimeType } from "@babylonjs/core/Misc/fileTools.js";
import { Tools } from "@babylonjs/core/Misc/tools.js";
/**
 * Class for holding and downloading glTF file data
 */
export class GLTFData {
    constructor() {
        /**
         * Object which contains the file name as the key and its data as the value
         */
        this.files = {};
    }
    /**
     * @deprecated Use files instead
     */
    get glTFFiles() {
        return this.files;
    }
    /**
     * Downloads the glTF data as files based on their names and data
     */
    downloadFiles() {
        for (const key in this.files) {
            const value = this.files[key];
            const blob = new Blob([value], { type: GetMimeType(key) });
            Tools.Download(blob, key);
        }
    }
}
//# sourceMappingURL=glTFData.js.map