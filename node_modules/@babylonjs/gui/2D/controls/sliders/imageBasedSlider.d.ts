import { BaseSlider } from "./baseSlider.js";
import { Image } from "../image.js";
import type { ICanvasRenderingContext } from "@babylonjs/core/Engines/ICanvas.js";
import type { AdvancedDynamicTexture } from "../../advancedDynamicTexture.js";
/**
 * Class used to create slider controls based on images
 */
export declare class ImageBasedSlider extends BaseSlider {
    name?: string | undefined;
    private _backgroundImage;
    private _thumbImage;
    private _valueBarImage;
    private _tempMeasure;
    get displayThumb(): boolean;
    set displayThumb(value: boolean);
    /**
     * Gets or sets the image used to render the background
     */
    get backgroundImage(): Image;
    set backgroundImage(value: Image);
    /**
     * Gets or sets the image used to render the value bar
     */
    get valueBarImage(): Image;
    set valueBarImage(value: Image);
    /**
     * Gets or sets the image used to render the thumb
     */
    get thumbImage(): Image;
    set thumbImage(value: Image);
    /**
     * Creates a new ImageBasedSlider
     * @param name defines the control name
     */
    constructor(name?: string | undefined);
    protected _getTypeName(): string;
    _draw(context: ICanvasRenderingContext): void;
    /**
     * Serializes the current control
     * @param serializationObject defined the JSON serialized object
     */
    serialize(serializationObject: any): void;
    /**
     * @internal
     */
    _parseFromContent(serializedObject: any, host: AdvancedDynamicTexture): void;
}
