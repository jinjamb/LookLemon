import { InputText } from "./inputText.js";
import { TextWrapper } from "./textWrapper.js";
/**
 * Class used to create a password control
 */
export declare class InputPassword extends InputText {
    protected _getTypeName(): string;
    protected _beforeRenderText(textWrapper: TextWrapper): TextWrapper;
}
