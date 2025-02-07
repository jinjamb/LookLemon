
declare module INSPECTOR {
    export class Tools {
        static LookForItem(item: any, selectedEntity: any): boolean;
        private static _RecursiveRemoveHiddenMeshesAndHoistChildren;
        static GetNameString(obj: any): any;
        static SortAndFilter(parent: any, items: any[]): any[];
    }


    /**
     * Defines which channels of the texture to retrieve with {@link TextureHelper.GetTextureDataAsync}.
     */
    export interface TextureChannelsToDisplay {
        /**
         * True if the red channel should be included.
         */
        R: boolean;
        /**
         * True if the green channel should be included.
         */
        G: boolean;
        /**
         * True if the blue channel should be included.
         */
        B: boolean;
        /**
         * True if the alpha channel should be included.
         */
        A: boolean;
    }
    /**
     * Helper class for retrieving texture data.
     */
    export class TextureHelper {
        /**
         * Gets the data of the specified texture by rendering it to an intermediate RGBA texture and retrieving the bytes from it.
         * This is convienent to get 8-bit RGBA values for a texture in a GPU compressed format.
         * @param texture the source texture
         * @param width the width of the result, which does not have to match the source texture width
         * @param height the height of the result, which does not have to match the source texture height
         * @param face if the texture has multiple faces, the face index to use for the source
         * @param channels a filter for which of the RGBA channels to return in the result
         * @param globalState the global state to use for rendering the texture
         * @param lod if the texture has multiple LODs, the lod index to use for the source
         * @returns the 8-bit texture data
         */
        static GetTextureDataAsync(texture: BABYLON.BaseTexture, width: number, height: number, face: number, channels: TextureChannelsToDisplay, globalState?: GlobalState, lod?: number): Promise<Uint8Array>;
    }


    export interface IPersistentPopupConfiguration {
        props: IPopupComponentProps;
        children: React.ReactNode;
        closeWhenSceneExplorerCloses?: boolean;
        closeWhenActionTabsCloses?: boolean;
    }
    export class Inspector {
        private static _SceneExplorerHost;
        private static _ActionTabsHost;
        private static _EmbedHost;
        private static _NewCanvasContainer;
        private static _PersistentPopupHost;
        private static _SceneExplorerWindow;
        private static _ActionTabsWindow;
        private static _EmbedHostWindow;
        private static _Scene;
        private static _OpenedPane;
        private static _OnBeforeRenderObserver;
        private static _OnSceneExplorerClosedObserver;
        private static _OnActionTabsClosedObserver;
        static OnSelectionChangeObservable: BABYLON.Observable<any>;
        static OnPropertyChangedObservable: BABYLON.Observable<PropertyChangedEvent>;
        private static _GlobalState;
        static MarkLineContainerTitleForHighlighting(title: string): void;
        static MarkMultipleLineContainerTitlesForHighlighting(titles: string[]): void;
        private static _SceneExplorerOptions;
        private static _InspectorOptions;
        private static _EmbedOptions;
        static PopupEmbed(): void;
        static PopupSceneExplorer(): void;
        static PopupInspector(): void;
        private static _CreateSceneExplorer;
        private static _CreateActionTabs;
        private static _CreateEmbedHost;
        static get IsVisible(): boolean;
        static EarlyAttachToLoader(): void;
        static Show(scene: BABYLON.Scene, userOptions: Partial<BABYLON.IInspectorOptions>): void;
        static _SetNewScene(scene: BABYLON.Scene): void;
        static _CreateCanvasContainer(parentControl: HTMLElement): void;
        private static _DestroyCanvasContainer;
        private static _Cleanup;
        private static _RemoveElementFromDOM;
        static Hide(): void;
        static _CreatePersistentPopup(config: IPersistentPopupConfiguration, hostElement: HTMLElement): void;
        static _ClosePersistentPopup(): void;
    }




    export class ReplayRecorder {
        private _sceneRecorder;
        private _isRecording;
        get isRecording(): boolean;
        cancel(): void;
        trackScene(scene: BABYLON.Scene): void;
        applyDelta(json: any, scene: BABYLON.Scene): void;
        export(): void;
    }


    export class PropertyChangedEvent {
        object: any;
        property: string;
        value: any;
        initialValue: any;
        allowNullValue?: boolean;
    }


    export interface IPopupComponentProps {
        id: string;
        title: string;
        size: {
            width: number;
            height: number;
        };
        onOpen?: (window: Window) => void;
        onClose: (window: Window) => void;
        onResize?: (window: Window) => void;
        onKeyUp?: (evt: KeyboardEvent) => void;
        onKeyDown?: (evt: KeyboardEvent) => void;
    }
    export class PopupComponent extends React.Component<IPopupComponentProps, {
        isComponentMounted: boolean;
        blockedByBrowser: boolean;
    }> {
        private _container;
        private _window;
        private _host;
        constructor(props: IPopupComponentProps);
        componentDidMount(): void;
        onBeforeUnloadListener: () => void;
        openPopup(): void;
        componentWillUnmount(): void;
        getWindow(): Window | null;
        render(): React.ReactPortal | null;
    }


    export interface IHeaderComponentProps {
        title: string;
        handleBack?: boolean;
        noExpand?: boolean;
        noClose?: boolean;
        noCommands?: boolean;
        onPopup: () => void;
        onClose: () => void;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
    }
    export class HeaderComponent extends React.Component<IHeaderComponentProps, {
        isBackVisible: boolean;
    }> {
        private _backStack;
        private _onSelectionChangeObserver;
        constructor(props: IHeaderComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        goBack(): void;
        renderLogo(): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export class GlobalState {
        onSelectionChangedObservable: BABYLON.Observable<any>;
        onPropertyChangedObservable: BABYLON.Observable<PropertyChangedEvent>;
        onInspectorClosedObservable: BABYLON.Observable<BABYLON.Scene>;
        onTabChangedObservable: BABYLON.Observable<number>;
        onSelectionRenamedObservable: BABYLON.Observable<void>;
        onPluginActivatedObserver: BABYLON.Nullable<BABYLON.Observer<BABYLON.ISceneLoaderPlugin | BABYLON.ISceneLoaderPluginAsync>>;
        onNewSceneObservable: BABYLON.Observable<BABYLON.Scene>;
        sceneImportDefaults: {
            [key: string]: any;
        };
        validationResults: BABYLON.Nullable<BABYLON.GLTF2.IGLTFValidationResults>;
        onValidationResultsUpdatedObservable: BABYLON.Observable<BABYLON.Nullable<BABYLON.GLTF2.IGLTFValidationResults>>;
        onExtensionLoadedObservable: BABYLON.Observable<BABYLON.IGLTFLoaderExtension>;
        glTFLoaderOverrideExtensionsConfig: boolean;
        glTFLoaderExtensionDefaults: {
            [name: string]: {
                [key: string]: any;
            };
        };
        glTFLoaderOverrideConfig: boolean;
        glTFLoaderDefaults: {
            [key: string]: any;
        };
        glTFLoaderExtensions: {
            [key: string]: BABYLON.IGLTFLoaderExtension;
        };
        blockMutationUpdates: boolean;
        selectedLineContainerTitles: Array<string>;
        selectedLineContainerTitlesNoFocus: Array<string>;
        recorder: ReplayRecorder;
        private _onlyUseEulers;
        get onlyUseEulers(): boolean;
        set onlyUseEulers(value: boolean);
        private _ignoreBackfacesForPicking;
        get ignoreBackfacesForPicking(): boolean;
        set ignoreBackfacesForPicking(value: boolean);
        init(propertyChangedObservable: BABYLON.Observable<PropertyChangedEvent>): void;
        prepareGLTFPlugin(loader: BABYLON.GLTFFileLoader): void;
        resetGLTFValidationResults(): void;
        lightGizmos: Array<BABYLON.LightGizmo>;
        enableLightGizmo(light: BABYLON.Light, enable?: boolean, gizmoCamera?: BABYLON.Nullable<BABYLON.Camera>): void;
        cameraGizmos: Array<BABYLON.CameraGizmo>;
        enableCameraGizmo(camera: BABYLON.Camera, enable?: boolean, gizmoCamera?: BABYLON.Nullable<BABYLON.Camera>): void;
        onSceneExplorerClosedObservable: BABYLON.Observable<void>;
        onActionTabsClosedObservable: BABYLON.Observable<void>;
    }


    export function setDebugNode(node: any): void;


    interface ITreeItemSpecializedComponentProps {
        label: string;
        entity?: any;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        globalState: GlobalState;
        gizmoCamera?: BABYLON.Camera;
        onClick?: () => void;
    }
    export class TreeItemSpecializedComponent extends React.Component<ITreeItemSpecializedComponentProps> {
        constructor(props: ITreeItemSpecializedComponentProps);
        onClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface ITreeItemSelectableComponentProps {
        entity: any;
        selectedEntity?: any;
        mustExpand?: boolean;
        offset: number;
        globalState: GlobalState;
        gizmoCamera?: BABYLON.Camera;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        filter: BABYLON.Nullable<string>;
    }
    export class TreeItemSelectableComponent extends React.Component<ITreeItemSelectableComponentProps, {
        isExpanded: boolean;
        isSelected: boolean;
    }> {
        private _wasSelected;
        constructor(props: ITreeItemSelectableComponentProps);
        switchExpandedState(): void;
        shouldComponentUpdate(nextProps: ITreeItemSelectableComponentProps, nextState: {
            isExpanded: boolean;
            isSelected: boolean;
        }): boolean;
        scrollIntoView(): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        onSelect(): void;
        renderChildren(): import("react/jsx-runtime").JSX.Element[] | null;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface ITreeItemLabelComponentProps {
        label: string;
        onClick?: () => void;
        icon: any;
        color: string;
    }
    export class TreeItemLabelComponent extends React.Component<ITreeItemLabelComponentProps> {
        constructor(props: ITreeItemLabelComponentProps);
        onClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface ITreeItemComponentProps {
        items?: BABYLON.Nullable<any[]>;
        label: string;
        offset: number;
        filter: BABYLON.Nullable<string>;
        forceSubitems?: boolean;
        globalState: GlobalState;
        gizmoCamera?: BABYLON.Camera;
        entity?: any;
        selectedEntity: any;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        contextMenuItems?: BABYLON.IInspectorContextMenuItem[];
    }
    export class TreeItemComponent extends React.Component<ITreeItemComponentProps, {
        isExpanded: boolean;
        mustExpand: boolean;
    }> {
        static _ContextMenuUniqueIdGenerator: number;
        constructor(props: ITreeItemComponentProps);
        switchExpandedState(): void;
        shouldComponentUpdate(nextProps: ITreeItemComponentProps, nextState: {
            isExpanded: boolean;
        }): boolean;
        expandAll(expand: boolean): void;
        renderContextMenu(): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISceneExplorerFilterComponentProps {
        onFilter: (filter: string) => void;
    }
    export class SceneExplorerFilterComponent extends React.Component<ISceneExplorerFilterComponentProps> {
        constructor(props: ISceneExplorerFilterComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }
    interface ISceneExplorerComponentProps {
        scene: BABYLON.Scene;
        contextMenu?: BABYLON.IInspectorOptions["contextMenu"];
        contextMenuOverride?: BABYLON.IInspectorOptions["contextMenuOverride"];
        gizmoCamera?: BABYLON.Camera;
        noCommands?: boolean;
        noHeader?: boolean;
        noExpand?: boolean;
        noClose?: boolean;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        additionalNodes?: BABYLON.IExplorerAdditionalNode[];
        globalState: GlobalState;
        popupMode?: boolean;
        onPopup?: () => void;
        onClose?: () => void;
    }
    export class SceneExplorerComponent extends React.Component<ISceneExplorerComponentProps, {
        filter: BABYLON.Nullable<string>;
        selectedEntity: any;
        scene: BABYLON.Scene;
    }> {
        private _onSelectionChangeObserver;
        private _onSelectionRenamedObserver;
        private _onNewSceneAddedObserver;
        private _onNewSceneObserver;
        private _sceneExplorerRef;
        private _mutationTimeout;
        private _once;
        private _hooked;
        private _sceneMutationFunc;
        constructor(props: ISceneExplorerComponentProps);
        processMutation(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        filterContent(filter: string): void;
        findSiblings(parent: any, items: any[], target: any, goNext: boolean, data: {
            previousOne?: any;
            found?: boolean;
        }): boolean;
        processKeys(keyEvent: React.KeyboardEvent<HTMLDivElement>, allNodes: any[]): void;
        private _getPipelineContextMenus;
        private _getNodeContextMenus;
        private _getMaterialsContextMenus;
        private _getSpriteManagersContextMenus;
        private _getParticleSystemsContextMenus;
        renderContent(allNodes: any[]): import("react/jsx-runtime").JSX.Element | null;
        onClose(): void;
        onPopup(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IExtensionsComponentProps {
        target: any;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
    }
    export class ExtensionsComponent extends React.Component<IExtensionsComponentProps, {
        popupVisible: boolean;
    }> {
        private _popup;
        private _extensionRef;
        constructor(props: IExtensionsComponentProps);
        showPopup(): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface ITransformNodeItemComponentProps {
        transformNode: BABYLON.TransformNode;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class TransformNodeItemComponent extends React.Component<ITransformNodeItemComponentProps> {
        constructor(props: ITransformNodeItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ITextureTreeItemComponentProps {
        texture: BABYLON.Texture;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class TextureTreeItemComponent extends React.Component<ITextureTreeItemComponentProps> {
        constructor(props: ITextureTreeItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ITargetedAnimationItemComponentProps {
        targetedAnimation: BABYLON.TargetedAnimation;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class TargetedAnimationItemComponent extends React.Component<ITargetedAnimationItemComponentProps> {
        constructor(props: ITargetedAnimationItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISpriteTreeItemComponentProps {
        sprite: BABYLON.Sprite;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class SpriteTreeItemComponent extends React.Component<ISpriteTreeItemComponentProps> {
        constructor(props: ISpriteTreeItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISpriteManagerTreeItemComponentProps {
        spriteManager: BABYLON.SpriteManager;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class SpriteManagerTreeItemComponent extends React.Component<ISpriteManagerTreeItemComponentProps> {
        constructor(props: ISpriteManagerTreeItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISoundTreeItemComponentProps {
        sound: BABYLON.Sound;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class SoundTreeItemComponent extends React.Component<ISoundTreeItemComponentProps> {
        constructor(props: ISoundTreeItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISkeletonTreeItemComponentProps {
        skeleton: BABYLON.Skeleton;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class SkeletonTreeItemComponent extends React.Component<ISkeletonTreeItemComponentProps> {
        constructor(props: ISkeletonTreeItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISceneTreeItemComponentProps {
        scene: BABYLON.Scene;
        gizmoCamera?: BABYLON.Camera;
        onRefresh: () => void;
        selectedEntity?: any;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        globalState: GlobalState;
    }
    export class SceneTreeItemComponent extends React.Component<ISceneTreeItemComponentProps, {
        isSelected: boolean;
        isInPickingMode: boolean;
        gizmoMode: number;
        isInWorldCoodinatesMode: boolean;
    }> {
        private _gizmoLayerOnPointerObserver;
        private _onPointerObserver;
        private _onSelectionChangeObserver;
        private _selectedEntity;
        private _posDragEnd;
        private _scaleDragEnd;
        private _rotateDragEnd;
        constructor(props: ISceneTreeItemComponentProps);
        shouldComponentUpdate(nextProps: ISceneTreeItemComponentProps, nextState: {
            isSelected: boolean;
            isInPickingMode: boolean;
        }): boolean;
        updateGizmoAutoPicking(isInPickingMode: boolean): void;
        componentDidMount(): void;
        private _getMeshFromBone;
        componentWillUnmount(): void;
        onSelect(): void;
        onCoordinatesMode(): void;
        onPickingMode(): void;
        setGizmoMode(mode: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IRenderPipelineItemComponenttProps {
        renderPipeline: BABYLON.PostProcessRenderPipeline;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class RenderingPipelineItemComponent extends React.Component<IRenderPipelineItemComponenttProps> {
        constructor(props: IRenderPipelineItemComponenttProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPostProcessItemComponentProps {
        postProcess: BABYLON.PostProcess;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class PostProcessItemComponent extends React.Component<IPostProcessItemComponentProps> {
        constructor(props: IPostProcessItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IParticleSystemTreeItemComponentProps {
        system: BABYLON.IParticleSystem;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class ParticleSystemTreeItemComponent extends React.Component<IParticleSystemTreeItemComponentProps> {
        constructor(props: IParticleSystemTreeItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IMeshTreeItemComponentProps {
        mesh: BABYLON.AbstractMesh;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
        globalState: GlobalState;
    }
    export class MeshTreeItemComponent extends React.Component<IMeshTreeItemComponentProps, {
        isBoundingBoxEnabled: boolean;
        isVisible: boolean;
    }> {
        constructor(props: IMeshTreeItemComponentProps);
        showBoundingBox(): void;
        switchVisibility(): void;
        private _getNameForLabel;
        private _editGeometry;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IMaterialTreeItemComponentProps {
        material: BABYLON.Material | BABYLON.NodeMaterial;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class MaterialTreeItemComponent extends React.Component<IMaterialTreeItemComponentProps> {
        constructor(props: IMaterialTreeItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ILightTreeItemComponentProps {
        light: BABYLON.Light;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
        globalState: GlobalState;
        gizmoCamera?: BABYLON.Camera;
    }
    export class LightTreeItemComponent extends React.Component<ILightTreeItemComponentProps, {
        isEnabled: boolean;
        isGizmoEnabled: boolean;
    }> {
        constructor(props: ILightTreeItemComponentProps);
        switchIsEnabled(): void;
        toggleGizmo(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IEffectLayerItemComponenttProps {
        layer: BABYLON.EffectLayer;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class EffectLayerItemComponent extends React.Component<IEffectLayerItemComponenttProps> {
        constructor(props: IEffectLayerItemComponenttProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICameraTreeItemComponentProps {
        camera: BABYLON.Camera;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
        globalState: GlobalState;
        gizmoCamera?: BABYLON.Camera;
    }
    export class CameraTreeItemComponent extends React.Component<ICameraTreeItemComponentProps, {
        isActive: boolean;
        isGizmoEnabled: boolean;
    }> {
        private _onBeforeRenderObserver;
        constructor(props: ICameraTreeItemComponentProps);
        setActive(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        toggleGizmo(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IBoneTreeItemComponentProps {
        bone: BABYLON.Bone;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class BoneTreeItemComponent extends React.Component<IBoneTreeItemComponentProps> {
        constructor(props: IBoneTreeItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IAnimationGroupItemComponentProps {
        animationGroup: BABYLON.AnimationGroup;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class AnimationGroupItemComponent extends React.Component<IAnimationGroupItemComponentProps> {
        constructor(props: IAnimationGroupItemComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    /**
     * Used to pass in the gui-editor package.
     * @param guiEditorPackage
     */
    export function InjectGUIEditor(guiEditorPackage: any): void;
    /**
     * Change the URL that the GUI editor loads from
     * @param guiEditorURL
     */
    export function SetGUIEditorURL(guiEditorURL: string): void;
    /**
     * Opens an ADT in the GUI editor
     * if you are in an ES6 environment, you must first call InjectGUIEditor to provide the gui-editor package
     * If you are in a UMD environment, it will load the package from a URL
     * @param adt
     * @param embed defines whether editor is being opened from the Playground
     * @returns a promise that resolves when the editor is opened
     */
    export function EditAdvancedDynamicTexture(adt: BABYLON.GUI.AdvancedDynamicTexture, embed?: boolean): Promise<void>;


    interface IControlTreeItemComponentProps {
        control: BABYLON.GUI.Control;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onClick: () => void;
    }
    export class ControlTreeItemComponent extends React.Component<IControlTreeItemComponentProps, {
        isActive: boolean;
        isVisible: boolean;
    }> {
        constructor(props: IControlTreeItemComponentProps);
        highlight(): void;
        switchVisibility(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IAdvancedDynamicTextureTreeItemComponentProps {
        texture: BABYLON.GUI.AdvancedDynamicTexture;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onClick: () => void;
    }
    export class AdvancedDynamicTextureTreeItemComponent extends React.Component<IAdvancedDynamicTextureTreeItemComponentProps, {
        isInPickingMode: boolean;
    }> {
        private _onControlPickedObserver;
        constructor(props: IAdvancedDynamicTextureTreeItemComponentProps);
        componentWillUnmount(): void;
        onPickingMode(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    /**
     * Defines a structure to hold max, min and a optional current.
     */
    export interface IPerfMinMax {
        min: number;
        max: number;
        current?: number;
    }
    /**
     * Defines structure of the object which contains information related to panning.
     */
    export interface IPerfMousePanningPosition {
        xPos: number;
        delta: number;
    }
    /**
     * Defines structure of the object which contains information regarding the bounds of each dataset we want to consider.
     */
    export interface IPerfIndexBounds {
        start: number;
        end: number;
    }
    export interface IPerfLayoutSize {
        width: number;
        height: number;
    }
    /**
     * Defines the structure of the meta object for the tooltip that appears when hovering over a performance graph!
     */
    export interface IPerfTooltip {
        text: string;
        color: string;
    }
    /**
     * Defines the structure of a cache object used to store the result of measureText().
     */
    export interface IPerfTextMeasureCache {
        text: string;
        width: number;
    }
    /**
     * Defines a structure defining the available space in a drawable area.
     */
    export interface IGraphDrawableArea {
        top: number;
        left: number;
        bottom: number;
        right: number;
    }
    /**
     * Defines the structure representing necessary ticker information.
     */
    export interface IPerfTicker extends IPerfMinMax {
        id: string;
        text: string;
    }
    export interface IVisibleRangeChangedObservableProps {
        valueMap: Map<string, IPerfMinMax>;
    }
    /**
     * Defines what settings our canvas graphing service accepts
     */
    export interface ICanvasGraphServiceSettings {
        datasets: BABYLON.IPerfDatasets;
        onVisibleRangeChangedObservable?: BABYLON.Observable<IVisibleRangeChangedObservableProps>;
    }
    /**
     * Defines the structure representing the preprocessable tooltip information.
     */
    export interface ITooltipPreprocessedInformation {
        xForActualTimestamp: number;
        numberOfTooltipItems: number;
        longestText: string;
        focusedId: string;
    }
    export interface IPerfTooltipHoverPosition {
        xPos: number;
        yPos: number;
    }
    /**
     * Defines the supported timestamp units.
     */
    export enum TimestampUnit {
        Milliseconds = 0,
        Seconds = 1,
        Minutes = 2,
        Hours = 3
    }


    export class CanvasGraphService {
        private _ctx;
        private _width;
        private _height;
        private _sizeOfWindow;
        private _ticks;
        private _panPosition;
        private _position;
        private _datasetBounds;
        private _globalTimeMinMax;
        private _hoverPosition;
        private _drawableArea;
        private _axisHeight;
        private _tooltipItems;
        private _tooltipTextCache;
        private _tickerTextCache;
        private _tickerItems;
        private _preprocessedTooltipInfo;
        private _numberOfTickers;
        private _onVisibleRangeChangedObservable?;
        private readonly _addonFontLineHeight;
        private readonly _defaultLineHeight;
        readonly datasets: BABYLON.IPerfDatasets;
        metadata: Map<string, BABYLON.IPerfMetadata>;
        /**
         * Creates an instance of CanvasGraphService.
         *
         * @param canvas a pointer to the canvas dom element we would like to write to.
         * @param settings settings for our service.
         */
        constructor(canvas: HTMLCanvasElement, settings: ICanvasGraphServiceSettings);
        /**
         * This method lets the service know it should get ready to update what it is displaying.
         */
        update: (...args: any[]) => void;
        /**
         * Update the canvas graph service with the new height and width of the canvas.
         * @param size The new size of the canvas.
         */
        resize(size: IPerfLayoutSize): void;
        /**
         * Force resets the position in the data, effectively returning to the most current data.
         */
        resetDataPosition(): void;
        private _prevPointById;
        private _prevValueById;
        /**
         * This method draws the data and sets up the appropriate scales.
         */
        private _draw;
        private _drawTickers;
        /**
         * Returns the index of the closest time for the datasets.
         * Uses a modified binary search to get value.
         *
         * @param targetTime the time we want to get close to.
         * @returns index of the item with the closest time to the targetTime
         */
        private _getClosestPointToTimestamp;
        /**
         * This is a convenience method to get the number of collected slices.
         * @returns the total number of collected slices.
         */
        private _getNumberOfSlices;
        /**
         * Draws the time axis, adjusts the drawable area for the graph.
         *
         * @param timeMinMax the minimum and maximum for the time axis.
         * @param drawableArea the current allocated drawable area.
         */
        private _drawTimeAxis;
        /**
         * Given a timestamp (should be the maximum timestamp in view), this function returns the maximum unit the timestamp contains.
         * This information can be used for formatting purposes.
         * @param timestamp the maximum timestamp to find the maximum timestamp unit for.
         * @returns The maximum unit the timestamp has.
         */
        private _getTimestampUnit;
        /**
         * Given a timestamp and the interval unit, this function will parse the timestamp to the appropriate format.
         * @param timestamp The timestamp to parse
         * @param intervalUnit The maximum unit of the maximum timestamp in an interval.
         * @returns a string representing the parsed timestamp.
         */
        private _parseTimestamp;
        /**
         * Generates a list of ticks given the min and max of the axis, and the space available in the axis.
         *
         * @param minMax the minimum and maximum values of the axis
         * @param spaceAvailable the total amount of space we have allocated to our axis
         */
        private _generateTicks;
        /**
         * Nice number algorithm based on psueudo code defined in "Graphics Gems" by Andrew S. Glassner.
         * This will find a "nice" number approximately equal to num.
         *
         * @param num The number we want to get close to.
         * @param shouldRound if true we will round the number, otherwise we will get the ceiling.
         * @returns a "nice" number approximately equal to num.
         */
        private _niceNumber;
        /**
         * Gets the min and max as a single object from an array of numbers.
         * @param bounds
         * @param offset
         * @returns the min and max of the array.
         */
        private _getMinMax;
        /**
         * Converts a single number to a pixel coordinate in a single axis by normalizing the data to a [0, 1] scale using the minimum and maximum values.
         *
         * @param num the number we want to get the pixel coordinate for
         * @param minMax the min and max of the dataset in the axis we want the pixel coordinate for.
         * @param startingPixel the starting pixel coordinate (this means it takes account for any offset).
         * @param spaceAvailable the total space available in this axis.
         * @param shouldFlipValue if we should use a [1, 0] scale instead of a [0, 1] scale.
         * @returns the pixel coordinate of the value in a single axis.
         */
        private _getPixelForNumber;
        /**
         * Add in any necessary event listeners.
         *
         * @param canvas The canvas we want to attach listeners to.
         */
        private _attachEventListeners;
        /**
         * We remove all event listeners we added.
         *
         * @param canvas The canvas we want to remove listeners from.
         */
        private _removeEventListeners;
        /**
         * Handles what to do when we are hovering over the canvas and not panning.
         *
         * @param event A reference to the event to be handled.
         */
        private _handleDataHover;
        /**
         * Debounced processing and drawing of tooltip.
         */
        private _debouncedTooltip;
        /**
         * Handles what to do when we stop hovering over the canvas.
         */
        private _handleStopHover;
        /**
         * Given a line defined by P1: (x1, y1) and P2: (x2, y2) get the distance of P0 (x0, y0) from the line.
         * https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points
         * @param x1 x position of point P1
         * @param y1 y position of point P1
         * @param x2 x position of point P2
         * @param y2 y position of point P2
         * @param x0 x position of point P0
         * @param y0 y position of point P0
         * @returns distance of P0 from the line defined by P1 and P2
         */
        private _getDistanceFromLine;
        /**
         * This method does preprocessing calculations for the tooltip.
         * @param pos the position of our mouse.
         * @param drawableArea the remaining drawable area.
         */
        private _preprocessTooltip;
        /**
         * Draws the tooltip given the area it is allowed to draw in and the current pixel position.
         *
         * @param pos the position of the mouse cursor in pixels (x, y).
         * @param drawableArea  the available area we can draw in.
         */
        private _drawTooltip;
        /**
         * Gets the number from a pixel position given the minimum and maximum value in range, and the starting pixel and the ending pixel.
         *
         * @param pixel current pixel position we want to get the number for.
         * @param minMax the minimum and maximum number in the range.
         * @param startingPixel position of the starting pixel in range.
         * @param endingPixel position of ending pixel in range.
         * @param shouldFlip if we should use a [1, 0] scale instead of a [0, 1] scale.
         * @returns number corresponding to pixel position
         */
        private _getNumberFromPixel;
        /**
         * The handler for when we want to zoom in and out of the graph.
         *
         * @param event a mouse wheel event.
         */
        private _handleZoom;
        /**
         * Initializes the panning object and attaches appropriate listener.
         *
         * @param event the mouse event containing positional information.
         */
        private _handlePanStart;
        /**
         * While panning this event will keep track of the delta and update the "positions".
         *
         * @param event The mouse event that contains positional information.
         */
        private _handlePan;
        /**
         * Clears the panning object and removes the appropriate listener.
         */
        private _handlePanStop;
        /**
         * Method which returns true if the data should become realtime, false otherwise.
         *
         * @returns if the data should become realtime or not.
         */
        private _shouldBecomeRealtime;
        /**
         * Will generate a playhead with a futurebox that takes up (1-scalefactor)*100% of the canvas.
         *
         * @param drawableArea The remaining drawable area.
         * @param scaleFactor The Percentage between 0.0 and 1.0 of the canvas the data gets drawn on.
         */
        private _drawPlayheadRegion;
        /**
         *  Method to do cleanup when the object is done being used.
         *
         */
        destroy(): void;
        /**
         * This method clears the canvas
         */
        clear(): void;
    }


    interface ICanvasGraphComponentProps {
        id: string;
        scene: BABYLON.Scene;
        collector: BABYLON.PerformanceViewerCollector;
        layoutObservable?: BABYLON.Observable<IPerfLayoutSize>;
        returnToPlayheadObservable?: BABYLON.Observable<void>;
        onVisibleRangeChangedObservable?: BABYLON.Observable<IVisibleRangeChangedObservableProps>;
        initialGraphSize?: {
            width: number;
            height: number;
        };
    }
    export var CanvasGraphComponent: React.FC<ICanvasGraphComponentProps>;


    interface IEmbedHostComponentProps {
        scene: BABYLON.Scene;
        globalState: GlobalState;
        popupMode: boolean;
        noClose?: boolean;
        noExpand?: boolean;
        onClose: () => void;
        onPopup: () => void;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        additionalNodes?: BABYLON.IExplorerAdditionalNode[];
        initialTab?: BABYLON.DebugLayerTab;
    }
    export class EmbedHostComponent extends React.Component<IEmbedHostComponentProps> {
        private _once;
        private _splitRef;
        private _topPartRef;
        private _bottomPartRef;
        constructor(props: IEmbedHostComponentProps);
        componentDidMount(): void;
        renderContent(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ITabsComponentProps {
        children: any[];
        selectedIndex: number;
        onSelectedIndexChange: (value: number) => void;
    }
    export class TabsComponent extends React.Component<ITabsComponentProps> {
        constructor(props: ITabsComponentProps);
        onSelect(index: number): void;
        renderLabel(child: PaneComponent, index: number): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IPaneComponentProps {
        title: string;
        icon: any;
        scene: BABYLON.Scene;
        selectedEntity?: any;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        globalState: GlobalState;
    }
    export class PaneComponent extends React.Component<IPaneComponentProps, {
        tag: any;
    }> {
        constructor(props: IPaneComponentProps);
        render(): JSX.Element | null;
    }


    interface IActionTabsComponentProps {
        scene?: BABYLON.Scene;
        noCommands?: boolean;
        noHeader?: boolean;
        noExpand?: boolean;
        noClose?: boolean;
        popupMode?: boolean;
        onPopup?: () => void;
        onClose?: () => void;
        globalState?: GlobalState;
        initialTab?: BABYLON.DebugLayerTab;
    }
    export class ActionTabsComponent extends React.Component<IActionTabsComponentProps, {
        selectedEntity: any;
        selectedIndex: number;
    }> {
        private _onSelectionChangeObserver;
        private _onTabChangedObserver;
        private _once;
        constructor(props: IActionTabsComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        changeSelectedTab(index: number): void;
        renderContent(): import("react/jsx-runtime").JSX.Element | null;
        onClose(): void;
        onPopup(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export class ToolsTabComponent extends PaneComponent {
        private _lockObject;
        private _videoRecorder;
        private _screenShotSize;
        private _gifOptions;
        private _useWidthHeight;
        private _isExportingGltf;
        private _gltfExportOptions;
        private _gifWorkerBlob;
        private _gifRecorder;
        private _previousRenderingScale;
        private _crunchingGIF;
        private _reflectorHostname;
        private _reflectorPort;
        private _reflector;
        private _envOptions;
        constructor(props: IPaneComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        captureScreenshot(): void;
        captureEquirectangular(): void;
        captureRender(): void;
        recordVideo(): void;
        recordGIFInternal(): void;
        recordGIF(): void;
        importAnimations(event: any): void;
        exportGLTF(): void;
        exportBabylon(): void;
        createEnvTexture(): void;
        exportReplay(): void;
        startRecording(): void;
        applyDelta(file: File): void;
        connectReflector(): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    export class StatisticsTabComponent extends PaneComponent {
        private _sceneInstrumentation;
        private _engineInstrumentation;
        private _timerIntervalId;
        constructor(props: IPaneComponentProps);
        componentWillUnmount(): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    export class SettingsTabComponent extends PaneComponent {
        constructor(props: IPaneComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    /**
     *
     */
    export class PropertyGridTabComponent extends PaneComponent {
        private _timerIntervalId;
        private _lockObject;
        constructor(props: IPaneComponentProps);
        timerRefresh(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        renderContent(): import("react/jsx-runtime").JSX.Element | null;
        renderTags(): import("react/jsx-runtime").JSX.Element[];
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IPropertyComponentProps {
        globalState: GlobalState;
        block: BABYLON.NodeMaterialBlock;
    }


    interface IGradientStepComponentProps {
        globalState: GlobalState;
        step: BABYLON.GradientBlockColorStep;
        lineIndex: number;
        lockObject?: INSPECTOR.SharedUIComponents.LockObject;
        onDelete: () => void;
        onUpdateStep: () => void;
        onCheckForReOrder: () => void;
        onCopy?: () => void;
    }
    export class GradientStepComponent extends React.Component<IGradientStepComponentProps, {
        gradient: number;
    }> {
        constructor(props: IGradientStepComponentProps);
        updateColor(color: string): void;
        updateStep(gradient: number): void;
        onPointerUp(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export class GradientPropertyTabComponent extends React.Component<IPropertyComponentProps> {
        private _gradientBlock;
        constructor(props: IPropertyComponentProps);
        forceRebuild(): void;
        deleteStep(step: BABYLON.GradientBlockColorStep): void;
        copyStep(step: BABYLON.GradientBlockColorStep): void;
        addNewStep(): void;
        checkForReOrder(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export class DebugTabComponent extends PaneComponent {
        private _physicsViewersEnabled;
        constructor(props: IPaneComponentProps);
        switchPhysicsViewers(): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface IGLTFComponentProps {
        scene: BABYLON.Scene;
        globalState: GlobalState;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    interface IGLTFComponentState {
        showGLTFLoaderOptions: boolean;
        showGLTFExtensionOptions: boolean;
    }
    export class GLTFComponent extends React.Component<IGLTFComponentProps, IGLTFComponentState> {
        private _onValidationResultsUpdatedObserver;
        constructor(props: IGLTFComponentProps);
        openValidationDetails(): void;
        prepareText(singularForm: string, count: number): string;
        componentDidMount(): void;
        componentWillUnmount(): void;
        renderValidation(): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IVariantsPropertyGridComponentProps {
        globalState: GlobalState;
        host: any;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class VariantsPropertyGridComponent extends React.Component<IVariantsPropertyGridComponentProps> {
        constructor(props: IVariantsPropertyGridComponentProps);
        private _getVariantsExtension;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface IScenePropertyGridComponentProps {
        globalState: GlobalState;
        scene: BABYLON.Scene;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
    }
    export class ScenePropertyGridComponent extends React.Component<IScenePropertyGridComponentProps> {
        private _storedEnvironmentTexture;
        private _renderingModeGroupObservable;
        constructor(props: IScenePropertyGridComponentProps);
        setRenderingModes(point: boolean, wireframe: boolean): void;
        switchIBL(): void;
        updateEnvironmentTexture(file: File): void;
        updateGravity(newValue: BABYLON.Vector3): void;
        updateTimeStep(newValue: number): void;
        normalizeScene(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IRenderGridPropertyGridComponentProps {
        globalState: GlobalState;
        scene: BABYLON.Scene;
    }
    export class RenderGridPropertyGridComponent extends React.Component<IRenderGridPropertyGridComponentProps, {
        isEnabled: boolean;
    }> {
        private _gridMesh;
        constructor(props: IRenderGridPropertyGridComponentProps);
        componentDidMount(): void;
        addOrRemoveGrid(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IParentPropertyGridComponentProps {
        globalState: GlobalState;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        node: BABYLON.Node;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ParentPropertyGridComponent extends React.Component<IParentPropertyGridComponentProps> {
        constructor(props: IParentPropertyGridComponentProps);
        private _getNameForSortingAndDisplay;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IFogPropertyGridComponentProps {
        globalState: GlobalState;
        scene: BABYLON.Scene;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class FogPropertyGridComponent extends React.Component<IFogPropertyGridComponentProps, {
        mode: number;
    }> {
        constructor(props: IFogPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IEmptyPropertyGridComponentProps {
        globalState: GlobalState;
        item: {
            inspectableCustomProperties: any;
        };
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class EmptyPropertyGridComponent extends React.Component<IEmptyPropertyGridComponentProps> {
        constructor(props: IEmptyPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICustomPropertyGridComponentProps {
        globalState: GlobalState;
        target: any;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CustomPropertyGridComponent extends React.Component<ICustomPropertyGridComponentProps, {
        mode: number;
    }> {
        constructor(props: ICustomPropertyGridComponentProps);
        renderInspectable(inspectable: BABYLON.IInspectable): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface ICommonPropertyGridComponentProps {
        globalState: GlobalState;
        host: {
            metadata: any;
        };
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonPropertyGridComponent extends React.Component<ICommonPropertyGridComponentProps> {
        constructor(props: ICommonPropertyGridComponentProps);
        renderLevel(jsonObject: any): import("react/jsx-runtime").JSX.Element[];
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISpritePropertyGridComponentProps {
        globalState: GlobalState;
        sprite: BABYLON.Sprite;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
    }
    export class SpritePropertyGridComponent extends React.Component<ISpritePropertyGridComponentProps> {
        private _canvasRef;
        private _imageData;
        private _cachedCellIndex;
        constructor(props: ISpritePropertyGridComponentProps);
        onManagerLink(): void;
        switchPlayStopState(): void;
        disposeSprite(): void;
        componentDidMount(): void;
        componentDidUpdate(): void;
        shouldComponentUpdate(nextProps: ISpritePropertyGridComponentProps): boolean;
        updatePreview(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISpriteManagerPropertyGridComponentProps {
        globalState: GlobalState;
        spriteManager: BABYLON.SpriteManager;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SpriteManagerPropertyGridComponent extends React.Component<ISpriteManagerPropertyGridComponentProps> {
        private _snippetUrl;
        constructor(props: ISpriteManagerPropertyGridComponentProps);
        addNewSprite(): void;
        disposeManager(): void;
        saveToFile(): void;
        loadFromFile(file: File): void;
        loadFromSnippet(): void;
        saveToSnippet(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISoundPropertyGridComponentProps {
        globalState: GlobalState;
        sound: BABYLON.Sound;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SoundPropertyGridComponent extends React.Component<ISoundPropertyGridComponentProps> {
        constructor(props: ISoundPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISSRRenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.SSRRenderingPipeline;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SSRRenderingPipelinePropertyGridComponent extends React.Component<ISSRRenderingPipelinePropertyGridComponentProps> {
        constructor(props: ISSRRenderingPipelinePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISSAORenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.SSAORenderingPipeline;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SSAORenderingPipelinePropertyGridComponent extends React.Component<ISSAORenderingPipelinePropertyGridComponentProps> {
        constructor(props: ISSAORenderingPipelinePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISSAO2RenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.SSAO2RenderingPipeline;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SSAO2RenderingPipelinePropertyGridComponent extends React.Component<ISSAO2RenderingPipelinePropertyGridComponentProps> {
        constructor(props: ISSAO2RenderingPipelinePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IRenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.PostProcessRenderPipeline;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class RenderingPipelinePropertyGridComponent extends React.Component<IRenderingPipelinePropertyGridComponentProps> {
        constructor(props: IRenderingPipelinePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPostProcessPropertyGridComponentProps {
        globalState: GlobalState;
        postProcess: BABYLON.PostProcess;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PostProcessPropertyGridComponent extends React.Component<IPostProcessPropertyGridComponentProps> {
        constructor(props: IPostProcessPropertyGridComponentProps);
        edit(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ILenstRenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.LensRenderingPipeline;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class LensRenderingPipelinePropertyGridComponent extends React.Component<ILenstRenderingPipelinePropertyGridComponentProps> {
        constructor(props: ILenstRenderingPipelinePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IIblShadowsRenderPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.IblShadowsRenderPipeline;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class IblShadowsRenderPipelinePropertyGridComponent extends React.Component<IIblShadowsRenderPipelinePropertyGridComponentProps> {
        constructor(props: IIblShadowsRenderPipelinePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IDefaultRenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.DefaultRenderingPipeline;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class DefaultRenderingPipelinePropertyGridComponent extends React.Component<IDefaultRenderingPipelinePropertyGridComponentProps> {
        constructor(props: IDefaultRenderingPipelinePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICommonRenderingPipelinePropertyGridComponentProps {
        globalState: GlobalState;
        renderPipeline: BABYLON.PostProcessRenderPipeline;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonRenderingPipelinePropertyGridComponent extends React.Component<ICommonRenderingPipelinePropertyGridComponentProps> {
        constructor(props: ICommonRenderingPipelinePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICommonPostProcessPropertyGridComponentProps {
        globalState: GlobalState;
        postProcess: BABYLON.PostProcess;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonPostProcessPropertyGridComponent extends React.Component<ICommonPostProcessPropertyGridComponentProps> {
        constructor(props: ICommonPostProcessPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export enum GradientGridMode {
        Factor = 0,
        Color3 = 1,
        Color4 = 2
    }
    interface IValueGradientGridComponent {
        globalState: GlobalState;
        label: string;
        gradients: BABYLON.Nullable<Array<BABYLON.IValueGradient>>;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        docLink?: string;
        mode: GradientGridMode;
        host: BABYLON.IParticleSystem;
        codeRecorderPropertyName: string;
        onCreateRequired: () => void;
    }
    export class ValueGradientGridComponent extends React.Component<IValueGradientGridComponent> {
        constructor(props: IValueGradientGridComponent);
        deleteStep(step: BABYLON.IValueGradient): void;
        addNewStep(): void;
        checkForReOrder(): void;
        updateAndSync(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISphereEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.SphereParticleEmitter;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SphereEmitterGridComponent extends React.Component<ISphereEmitterGridComponentProps> {
        constructor(props: ISphereEmitterGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPointEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.PointParticleEmitter;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PointEmitterGridComponent extends React.Component<IPointEmitterGridComponentProps> {
        constructor(props: IPointEmitterGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IParticleSystemPropertyGridComponentProps {
        globalState: GlobalState;
        system: BABYLON.IParticleSystem;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ParticleSystemPropertyGridComponent extends React.Component<IParticleSystemPropertyGridComponentProps> {
        private _snippetUrl;
        constructor(props: IParticleSystemPropertyGridComponentProps);
        renderEmitter(): import("react/jsx-runtime").JSX.Element | null;
        raiseOnPropertyChanged(property: string, newValue: any, previousValue: any): void;
        renderControls(): import("react/jsx-runtime").JSX.Element;
        saveToFile(): void;
        loadFromFile(file: File): void;
        loadFromSnippet(): void;
        saveToSnippet(): void;
        updateTexture(file: File): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IMeshEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.MeshParticleEmitter;
        scene: BABYLON.Scene;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class MeshEmitterGridComponent extends React.Component<IMeshEmitterGridComponentProps> {
        constructor(props: IMeshEmitterGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IHemisphericEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.HemisphericParticleEmitter;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class HemisphericEmitterGridComponent extends React.Component<IHemisphericEmitterGridComponentProps> {
        constructor(props: IHemisphericEmitterGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IFactorGradientStepGridComponent {
        globalState: GlobalState;
        gradient: BABYLON.FactorGradient;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        lineIndex: number;
        onDelete: () => void;
        onUpdateGradient: () => void;
        onCheckForReOrder: () => void;
        host: BABYLON.IParticleSystem;
        codeRecorderPropertyName: string;
    }
    export class FactorGradientStepGridComponent extends React.Component<IFactorGradientStepGridComponent, {
        gradient: number;
        factor1: string;
        factor2?: string;
    }> {
        constructor(props: IFactorGradientStepGridComponent);
        shouldComponentUpdate(nextProps: IFactorGradientStepGridComponent, nextState: {
            gradient: number;
            factor1: string;
            factor2?: string;
        }): boolean;
        updateFactor1(valueString: string): void;
        updateFactor2(valueString: string): void;
        updateGradient(gradient: number): void;
        onPointerUp(): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICylinderEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.CylinderParticleEmitter;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CylinderEmitterGridComponent extends React.Component<ICylinderEmitterGridComponentProps> {
        constructor(props: ICylinderEmitterGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IConeEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.ConeParticleEmitter;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ConeEmitterGridComponent extends React.Component<IConeEmitterGridComponentProps> {
        constructor(props: IConeEmitterGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IColorGradientStepGridComponent {
        globalState: GlobalState;
        gradient: BABYLON.ColorGradient | BABYLON.Color3Gradient;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        lineIndex: number;
        isColor3: boolean;
        onDelete: () => void;
        onUpdateGradient: () => void;
        onCheckForReOrder: () => void;
        host: BABYLON.IParticleSystem;
        codeRecorderPropertyName: string;
    }
    export class ColorGradientStepGridComponent extends React.Component<IColorGradientStepGridComponent, {
        gradient: number;
    }> {
        constructor(props: IColorGradientStepGridComponent);
        updateColor1(color: string): void;
        updateColor2(color: string): void;
        updateGradient(gradient: number): void;
        onPointerUp(): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IBoxEmitterGridComponentProps {
        globalState: GlobalState;
        emitter: BABYLON.BoxParticleEmitter;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class BoxEmitterGridComponent extends React.Component<IBoxEmitterGridComponentProps> {
        constructor(props: IBoxEmitterGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IMetadataComponentProps {
        globalState: GlobalState;
        entity: any;
    }
    enum MetadataTypes {
        UNDEFINED = "undefined",
        NULL = "null",
        STRING = "string",
        OBJECT = "Object",
        JSON = "JSON"
    }
    /** Metadata Grid Component */
    export class MetadataGridComponent extends React.Component<IMetadataComponentProps, {
        selectedEntityMetadata: string;
        dirty: boolean;
        prettyJson: boolean;
        preventObjCorruption: boolean;
        metadataPropType: MetadataTypes;
        statusMessage: string | null;
        isValidJson: boolean;
    }> {
        private readonly _textAreaHost;
        /**
         * @param props - component props
         */
        constructor(props: IMetadataComponentProps);
        /** @ignorenaming */
        componentDidMount(): void;
        /**
         * @param prevProps - previous component props
         */
        componentDidUpdate(prevProps: Readonly<IMetadataComponentProps>): void;
        /** on entity refresh */
        refreshSelected(): void;
        /**
         * @param disabled - is disabled
         */
        setTextAreaDisabled(disabled: boolean): void;
        /**
         * @returns class name
         */
        getClassName(): string;
        /**
         * Determines the Metadata type
         * @param entity Picked entity
         * @returns MetadataTypes
         */
        getEntityType(entity: any): MetadataTypes;
        /**
         * @param input - any input
         * @returns is string
         */
        isString(input: any): boolean;
        /**
         * @param object - any object
         * @returns is parsable
         */
        parsableJson(object: Object): boolean;
        /**
         * @param string - any string
         * @returns parsable string
         */
        parsableString(string: string): JSON | null;
        /**
         * @param validJson - a valid json
         * @param metadata - any metadata
         * @returns parsed metadata
         */
        parseMetaObject(validJson: boolean, metadata: any): any;
        /**
         * Recurse through an object to check for any Functions, returns False if found at least one
         * @param o Any Object, String or number
         * @returns Boolean
         */
        objectCanSafelyStringify(o: Object | string | number): boolean;
        copyToClipboard(): void;
        /** Safely checks if valid JSON then appends necessary props without overwriting existing */
        populateGltfExtras(): void;
        /** render
         * @returns the component
         */
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ITransformNodePropertyGridComponentProps {
        globalState: GlobalState;
        transformNode: BABYLON.TransformNode;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class TransformNodePropertyGridComponent extends React.Component<ITransformNodePropertyGridComponentProps> {
        constructor(props: ITransformNodePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISkeletonPropertyGridComponentProps {
        globalState: GlobalState;
        skeleton: BABYLON.Skeleton;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class SkeletonPropertyGridComponent extends React.Component<ISkeletonPropertyGridComponentProps> {
        private _skeletonViewersEnabled;
        private _skeletonViewerDisplayOptions;
        private _skeletonViewers;
        constructor(props: ISkeletonPropertyGridComponentProps);
        switchSkeletonViewers(): void;
        checkSkeletonViewerState(props: ISkeletonPropertyGridComponentProps): void;
        changeDisplayMode(): void;
        changeDisplayOptions(option: string, value: number): void;
        shouldComponentUpdate(nextProps: ISkeletonPropertyGridComponentProps): boolean;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IMeshPropertyGridComponentProps {
        globalState: GlobalState;
        mesh: BABYLON.Mesh;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class MeshPropertyGridComponent extends React.Component<IMeshPropertyGridComponentProps, {
        displayNormals: boolean;
        displayVertexColors: boolean;
        displayBoneWeights: boolean;
        displayBoneIndex: number;
        displaySkeletonMap: boolean;
    }> {
        constructor(props: IMeshPropertyGridComponentProps);
        renderWireframeOver(): void;
        renderNormalVectors(): void;
        displayNormals(): void;
        displayVertexColors(): void;
        displayBoneWeights(): void;
        displaySkeletonMap(): void;
        onBoneDisplayIndexChange(value: number): void;
        onMaterialLink(): void;
        onSourceMeshLink(): void;
        onSkeletonLink(): void;
        convertPhysicsTypeToString(): string;
        private _getIdForDisplay;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IBonePropertyGridComponentProps {
        globalState: GlobalState;
        bone: BABYLON.Bone;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class BonePropertyGridComponent extends React.Component<IBonePropertyGridComponentProps> {
        constructor(props: IBonePropertyGridComponentProps);
        onTransformNodeLink(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    /**
     * Properties of the physics material grid component.
     */
    export interface IPhysicsMaterialGridComponentProps {
        /**
         * Lock object
         */
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        /**
         * Callback raised on the property changed event
         */
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        /**
         * Physics body to edit
         */
        body: BABYLON.PhysicsBody;
        /**
         * Global state
         */
        globalState: GlobalState;
    }
    /**
     * Component that displays the physic material properties of a physics body.
     * @param props the component props
     * @returns the component
     */
    export function PhysicsMaterialGridComponent(props: IPhysicsMaterialGridComponentProps): import("react/jsx-runtime").JSX.Element;


    /**
     * Properties of the physics mass properties grid component.
     */
    export interface IPhysicsMassPropertiesGridComponentProps {
        /**
         * Lock object
         */
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        /**
         * Callback raised on the property changed event
         */
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        /**
         * Physics body to edit
         */
        body: BABYLON.PhysicsBody;
        /**
         * Global state
         */
        globalState: GlobalState;
        /**
         * Index of the instance to edit
         */
        instanceIndex?: number;
    }
    /**
     * Component that displays the mass properties of a physics body.
     * @param props the component props
     * @returns the component
     */
    export function PhysicsMassPropertiesGridComponent(props: IPhysicsMassPropertiesGridComponentProps): import("react/jsx-runtime").JSX.Element;


    /**
     * Properties of the physics body grid component.
     */
    export interface IPhysicsBodyGridComponentProps {
        /**
         * Lock object
         */
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        /**
         * Callback raised on the property changed event
         */
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        /**
         * Physics body to edit
         */
        body: BABYLON.PhysicsBody;
        /**
         * Global state
         */
        globalState: GlobalState;
    }
    /**
     * Component that allows displaying and tweaking a physics body's properties.
     * @param props the component props
     * @returns the component
     */
    export function PhysicsBodyGridComponent(props: IPhysicsBodyGridComponentProps): import("react/jsx-runtime").JSX.Element;


    interface ITexturePropertyGridComponentProps {
        texture: BABYLON.BaseTexture;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        globalState: GlobalState;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    interface ITexturePropertyGridComponentState {
        isTextureEditorOpen: boolean;
        textureEditing: BABYLON.Nullable<BABYLON.BaseTexture>;
    }
    export class TexturePropertyGridComponent extends React.Component<ITexturePropertyGridComponentProps, ITexturePropertyGridComponentState> {
        private _adtInstrumentation;
        private _popoutWindowRef;
        private _textureLineRef;
        private _textureInspectorSize;
        constructor(props: ITexturePropertyGridComponentProps);
        componentWillUnmount(): void;
        updateTexture(file: File): void;
        openTextureEditor(): void;
        onOpenTextureEditor(): void;
        onCloseTextureEditor(callback?: {
            (): void;
        }): void;
        forceRefresh(): void;
        findTextureFormat(format: number): {
            label: string;
            normalizable: number;
            value: number;
            hideType?: undefined;
            compressed?: undefined;
        } | {
            label: string;
            normalizable: number;
            hideType: boolean;
            value: number;
            compressed?: undefined;
        } | {
            label: string;
            normalizable: number;
            compressed: boolean;
            value: number;
            hideType?: undefined;
        } | null;
        findTextureType(type: number): {
            label: string;
            normalizable: number;
            value: number;
        } | null;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IStandardMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.StandardMaterial;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class StandardMaterialPropertyGridComponent extends React.Component<IStandardMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: IStandardMaterialPropertyGridComponentProps);
        renderTextures(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISkyMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.SkyMaterial;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    /**
     * Property grid component for the BABYLON.SkyMaterial
     */
    export class SkyMaterialPropertyGridComponent extends React.Component<ISkyMaterialPropertyGridComponentProps> {
        constructor(props: ISkyMaterialPropertyGridComponentProps);
        renderSky(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPBRSpecularGlossinessMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.PBRSpecularGlossinessMaterial;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PBRSpecularGlossinessMaterialPropertyGridComponent extends React.Component<IPBRSpecularGlossinessMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: IPBRSpecularGlossinessMaterialPropertyGridComponentProps);
        renderTextures(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPBRMetallicRoughnessMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.PBRMetallicRoughnessMaterial;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PBRMetallicRoughnessMaterialPropertyGridComponent extends React.Component<IPBRMetallicRoughnessMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: IPBRMetallicRoughnessMaterialPropertyGridComponentProps);
        renderTextures(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPBRMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.PBRMaterial;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    /**
     * @internal
     */
    export class PBRMaterialPropertyGridComponent extends React.Component<IPBRMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: IPBRMaterialPropertyGridComponentProps);
        switchAmbientMode(state: boolean): void;
        renderTextures(onDebugSelectionChangeObservable: BABYLON.Observable<TextureLinkLineComponent>): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface INodeMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.NodeMaterial;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class NodeMaterialPropertyGridComponent extends React.Component<INodeMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: INodeMaterialPropertyGridComponentProps);
        edit(): void;
        renderTextures(): import("react/jsx-runtime").JSX.Element | null;
        renderInputBlock(block: BABYLON.InputBlock): import("react/jsx-runtime").JSX.Element | null;
        renderInputValues(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IMultiMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.MultiMaterial;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class MultiMaterialPropertyGridComponent extends React.Component<IMultiMaterialPropertyGridComponentProps> {
        constructor(props: IMultiMaterialPropertyGridComponentProps);
        onMaterialLink(mat: BABYLON.Material): void;
        renderChildMaterial(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.Material;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class MaterialPropertyGridComponent extends React.Component<IMaterialPropertyGridComponentProps> {
        constructor(props: IMaterialPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICommonMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.Material;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonMaterialPropertyGridComponent extends React.Component<ICommonMaterialPropertyGridComponentProps> {
        constructor(props: ICommonMaterialPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IBackgroundMaterialPropertyGridComponentProps {
        globalState: GlobalState;
        material: BABYLON.BackgroundMaterial;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class BackgroundMaterialPropertyGridComponent extends React.Component<IBackgroundMaterialPropertyGridComponentProps> {
        private _onDebugSelectionChangeObservable;
        constructor(props: IBackgroundMaterialPropertyGridComponentProps);
        renderTextures(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IToolSettingsProps {
        tool: ITool | undefined;
    }
    export class ToolSettings extends React.Component<IToolSettingsProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface ITool extends IToolData {
        instance: IToolType;
    }
    interface IToolBarProps {
        tools: ITool[];
        addTool(url: string): void;
        changeTool(toolIndex: number): void;
        activeToolIndex: number;
        metadata: IMetadata;
        setMetadata(data: any): void;
        pickerOpen: boolean;
        setPickerOpen(open: boolean): void;
        pickerRef: React.RefObject<HTMLDivElement>;
        hasAlpha: boolean;
    }
    interface IToolBarState {
        toolURL: string;
        addOpen: boolean;
    }
    export class ToolBar extends React.Component<IToolBarProps, IToolBarState> {
        private _lockObject;
        constructor(props: IToolBarProps);
        computeRGBAColor(): BABYLON.Color4;
        shouldComponentUpdate(nextProps: IToolBarProps): boolean;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ITextureEditorComponentProps {
        texture: BABYLON.BaseTexture;
        url: string;
        window: React.RefObject<PopupComponent>;
        onUpdate: () => void;
    }
    interface ITextureEditorComponentState {
        tools: ITool[];
        activeToolIndex: number;
        metadata: IMetadata;
        channels: IChannel[];
        pixelData: IPixelData;
        face: number;
        mipLevel: number;
        pickerOpen: boolean;
    }
    export interface IToolParameters {
        /** The visible scene in the editor. Useful for adding pointer and keyboard events. */
        scene: BABYLON.Scene;
        /** The 2D canvas which you can sample pixel data from. Tools should not paint directly on this canvas. */
        canvas2D: HTMLCanvasElement;
        /** The 3D scene which tools can add post processes to. */
        scene3D: BABYLON.Scene;
        /** The size of the texture. */
        size: BABYLON.ISize;
        /** Pushes the editor texture back to the original scene. This should be called every time a tool makes any modification to a texture. */
        updateTexture: () => void;
        /** The metadata object which is shared between all tools. Feel free to store any information here. Do not set this directly: instead call setMetadata. */
        metadata: IMetadata;
        /** Call this when you want to mutate the metadata. */
        setMetadata: (data: any) => void;
        /** Returns the texture coordinates under the cursor */
        getMouseCoordinates: (pointerInfo: BABYLON.PointerInfo) => BABYLON.Vector2;
        /** Provides a canvas that you can use the canvas API to paint on. */
        startPainting: () => Promise<CanvasRenderingContext2D>;
        /** After you have painted on your canvas, call this method to push the updates back to the texture. */
        updatePainting: () => void;
        /** Call this when you are finished painting. */
        stopPainting: () => void;
        /** Returns whether the tool should be allowed to interact */
        interactionEnabled: () => boolean;
    }
    export interface IToolGUIProps {
        instance: IToolType;
    }
    /** An interface representing the definition of a tool */
    export interface IToolData {
        /** Name to display on the toolbar */
        name: string;
        /** A class definition for the tool including setup and cleanup methods */
        type: IToolConstructable;
        /**  An SVG icon encoded in Base64 */
        icon: string;
        /** Whether the tool uses postprocesses */
        is3D?: boolean;
        cursor?: string;
        settingsComponent?: React.ComponentType<IToolGUIProps>;
    }
    export interface IToolType {
        /** Called when the tool is selected. */
        setup: () => void;
        /** Called when the tool is deselected. */
        cleanup: () => void;
        /** Optional. Called when the user resets the texture or uploads a new texture. Tools may want to reset their state when this happens. */
        onReset?: () => void;
    }
    /** For constructable types, TS requires that you define a separate interface which constructs your actual interface */
    interface IToolConstructable {
        new (getParameters: () => IToolParameters): IToolType;
    }
    export interface IMetadata {
        color: string;
        alpha: number;
        select: {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        };
        [key: string]: any;
    }
    export class TextureEditorComponent extends React.Component<ITextureEditorComponentProps, ITextureEditorComponentState> {
        private _textureCanvasManager;
        private _uiCanvas;
        private _2DCanvas;
        private _3DCanvas;
        private _pickerRef;
        private _timer;
        private static _PREVIEW_UPDATE_DELAY_MS;
        constructor(props: ITextureEditorComponentProps);
        componentDidMount(): void;
        componentDidUpdate(): void;
        componentWillUnmount(): void;
        textureDidUpdate(): void;
        loadToolFromURL(url: string): void;
        addTools(tools: IToolData[]): void;
        getToolParameters(): IToolParameters;
        changeTool(index: number): void;
        setMetadata(newMetadata: any): void;
        setPickerOpen(open: boolean): void;
        onPointerDown(evt: React.PointerEvent): void;
        saveTexture(): void;
        resetTexture(): void;
        resizeTexture(width: number, height: number): void;
        uploadTexture(file: File): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IPixelData {
        x?: number;
        y?: number;
        r?: number;
        g?: number;
        b?: number;
        a?: number;
    }
    export class TextureCanvasManager {
        private _engine;
        private _scene;
        private _camera;
        private _cameraPos;
        private _scale;
        private _isPanning;
        private _mouseX;
        private _mouseY;
        private _uiCanvas;
        private _size;
        /** The canvas we paint onto using the canvas API */
        private _2DCanvas;
        /** The canvas we apply post processes to */
        private _3DCanvas;
        /** The canvas which handles channel filtering */
        private _channelsTexture;
        private _3DEngine;
        private _3DPlane;
        private _3DCanvasTexture;
        private _3DScene;
        private _channels;
        private _face;
        private _mipLevel;
        /** The texture from the original engine that we invoked the editor on */
        private _originalTexture;
        /** This is a hidden texture which is only responsible for holding the actual texture memory in the original engine */
        private _target;
        private _originalTextureProperties;
        /** Keeps track of whether we have modified the texture */
        private _didEdit;
        private _plane;
        private _planeMaterial;
        /** Tracks which keys are currently pressed */
        private _keyMap;
        /** Tracks which mouse buttons are currently pressed */
        private _buttonsPressed;
        private readonly ZOOM_MOUSE_SPEED;
        private readonly ZOOM_KEYBOARD_SPEED;
        private readonly ZOOM_IN_KEY;
        private readonly ZOOM_OUT_KEY;
        private readonly PAN_SPEED;
        private readonly PAN_KEY;
        private readonly MIN_SCALE;
        private readonly GRID_SCALE;
        private readonly MAX_SCALE;
        private readonly SELECT_ALL_KEY;
        private readonly SAVE_KEY;
        private readonly RESET_KEY;
        private readonly DESELECT_KEY;
        /** The number of milliseconds between texture updates */
        private readonly PUSH_FREQUENCY;
        private _tool;
        private _setPixelData;
        private _setMipLevel;
        private _window;
        private _metadata;
        private _editing3D;
        private _onUpdate;
        private _setMetadata;
        private _imageData;
        private _canPush;
        private _shouldPush;
        private _paintCanvas;
        constructor(texture: BABYLON.BaseTexture, window: Window, canvasUI: HTMLCanvasElement, canvas2D: HTMLCanvasElement, canvas3D: HTMLCanvasElement, setPixelData: (pixelData: IPixelData) => void, metadata: IMetadata, onUpdate: () => void, setMetadata: (metadata: any) => void, setMipLevel: (level: number) => void);
        updateTexture(): Promise<void>;
        private pushTexture;
        startPainting(): Promise<CanvasRenderingContext2D>;
        updatePainting(): void;
        stopPainting(): void;
        private updateDisplay;
        set channels(channels: IChannel[]);
        paintPixelsOnCanvas(pixelData: Uint8Array, canvas: HTMLCanvasElement): void;
        grabOriginalTexture(): Promise<Uint8Array<ArrayBufferLike>>;
        getMouseCoordinates(pointerInfo: BABYLON.PointerInfo): BABYLON.Vector2;
        get scene(): BABYLON.Scene;
        get canvas2D(): HTMLCanvasElement;
        get size(): BABYLON.ISize;
        set tool(tool: BABYLON.Nullable<ITool>);
        get tool(): BABYLON.Nullable<ITool>;
        set face(face: number);
        set mipLevel(mipLevel: number);
        /** Returns the 3D scene used for postprocesses */
        get scene3D(): BABYLON.Scene;
        set metadata(metadata: IMetadata);
        private makePlane;
        reset(): void;
        resize(newSize: BABYLON.ISize): Promise<void>;
        setSize(size: BABYLON.ISize): void;
        upload(file: File): void;
        saveTexture(): void;
        toolInteractionEnabled(): boolean;
        dispose(): void;
    }


    interface ITextureCanvasComponentProps {
        canvasUI: React.RefObject<HTMLCanvasElement>;
        canvas2D: React.RefObject<HTMLCanvasElement>;
        canvas3D: React.RefObject<HTMLCanvasElement>;
        texture: BABYLON.BaseTexture;
    }
    export class TextureCanvasComponent extends React.Component<ITextureCanvasComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPropertiesBarProps {
        texture: BABYLON.BaseTexture;
        size: BABYLON.ISize;
        saveTexture(): void;
        pixelData: IPixelData;
        face: number;
        setFace(face: number): void;
        resetTexture(): void;
        resizeTexture(width: number, height: number): void;
        uploadTexture(file: File): void;
        mipLevel: number;
        setMipLevel: (mipLevel: number) => void;
    }
    interface IPropertiesBarState {
        width: number;
        height: number;
    }
    export class PropertiesBar extends React.PureComponent<IPropertiesBarProps, IPropertiesBarState> {
        private _faces;
        constructor(props: IPropertiesBarProps);
        private _pixelData;
        private _getNewDimension;
        componentWillUpdate(nextProps: IPropertiesBarProps): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IChannel {
        visible: boolean;
        editable: boolean;
        name: string;
        id: "R" | "G" | "B" | "A";
        icon: any;
    }
    interface IChannelsBarProps {
        channels: IChannel[];
        setChannels(channelState: IChannel[]): void;
    }
    export class ChannelsBar extends React.PureComponent<IChannelsBarProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export var canvasShader: {
        path: {
            vertexSource: string;
            fragmentSource: string;
        };
        options: {
            attributes: string[];
            uniforms: string[];
        };
    };


    interface IBottomBarProps {
        texture: BABYLON.BaseTexture;
        mipLevel: number;
    }
    export class BottomBar extends React.PureComponent<IBottomBarProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export var RectangleSelect: IToolData;


    export var Paintbrush: IToolData;


    export var Floodfill: IToolData;


    export var Eyedropper: IToolData;


    var _default: IToolData[];


    export var Contrast: IToolData;


    interface ISpotLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.SpotLight;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
    }
    export class SpotLightPropertyGridComponent extends React.Component<ISpotLightPropertyGridComponentProps> {
        constructor(props: ISpotLightPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IRectAreaLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.RectAreaLight;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
    }
    export class RectAreaLightPropertyGridComponent extends React.Component<IRectAreaLightPropertyGridComponentProps> {
        constructor(props: IRectAreaLightPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPointLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.PointLight;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class PointLightPropertyGridComponent extends React.Component<IPointLightPropertyGridComponentProps> {
        constructor(props: IPointLightPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IHemisphericLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.HemisphericLight;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class HemisphericLightPropertyGridComponent extends React.Component<IHemisphericLightPropertyGridComponentProps> {
        constructor(props: IHemisphericLightPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IDirectionalLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.DirectionalLight;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class DirectionalLightPropertyGridComponent extends React.Component<IDirectionalLightPropertyGridComponentProps> {
        constructor(props: IDirectionalLightPropertyGridComponentProps);
        displayFrustum(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICommonShadowLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.IShadowLight;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonShadowLightPropertyGridComponent extends React.Component<ICommonShadowLightPropertyGridComponentProps> {
        private _internals;
        constructor(props: ICommonShadowLightPropertyGridComponentProps);
        createShadowGenerator(): void;
        disposeShadowGenerator(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICommonLightPropertyGridComponentProps {
        globalState: GlobalState;
        light: BABYLON.Light;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonLightPropertyGridComponent extends React.Component<ICommonLightPropertyGridComponentProps> {
        constructor(props: ICommonLightPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ILayerPropertyGridComponentProps {
        globalState: GlobalState;
        layer: BABYLON.EffectLayer;
        extensibilityGroups?: BABYLON.IExplorerExtensibilityGroup[];
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class LayerPropertyGridComponent extends React.Component<ILayerPropertyGridComponentProps> {
        constructor(props: ILayerPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IFreeCameraPropertyGridComponentProps {
        globalState: GlobalState;
        camera: BABYLON.FreeCamera;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class FreeCameraPropertyGridComponent extends React.Component<IFreeCameraPropertyGridComponentProps> {
        constructor(props: IFreeCameraPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IFollowCameraPropertyGridComponentProps {
        globalState: GlobalState;
        camera: BABYLON.FollowCamera;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class FollowCameraPropertyGridComponent extends React.Component<IFollowCameraPropertyGridComponentProps> {
        constructor(props: IFollowCameraPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICommonCameraPropertyGridComponentProps {
        globalState: GlobalState;
        camera: BABYLON.Camera;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class CommonCameraPropertyGridComponent extends React.Component<ICommonCameraPropertyGridComponentProps, {
        mode: number;
    }> {
        constructor(props: ICommonCameraPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IArcRotateCameraPropertyGridComponentProps {
        globalState: GlobalState;
        camera: BABYLON.ArcRotateCamera;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class ArcRotateCameraPropertyGridComponent extends React.Component<IArcRotateCameraPropertyGridComponentProps> {
        constructor(props: IArcRotateCameraPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ITargetedAnimationGridComponentProps {
        globalState: GlobalState;
        targetedAnimation: BABYLON.TargetedAnimation;
        scene: BABYLON.Scene;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class TargetedAnimationGridComponent extends React.Component<ITargetedAnimationGridComponentProps> {
        private _animationGroup;
        private _animationCurveEditorContext;
        constructor(props: ITargetedAnimationGridComponentProps);
        findAnimationGroup: () => void;
        playOrPause: () => void;
        deleteAnimation: () => void;
        updateContextFromProps: () => void;
        componentDidMount(): void;
        componentDidUpdate(prevProps: Readonly<ITargetedAnimationGridComponentProps>, prevState: Readonly<{}>, snapshot?: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IAnimationGridComponentProps {
        globalState: GlobalState;
        animatable: BABYLON.IAnimatable;
        scene: BABYLON.Scene;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class AnimationGridComponent extends React.Component<IAnimationGridComponentProps, {
        currentFrame: number;
    }> {
        private _animations;
        private _ranges;
        private _mainAnimatable;
        private _onBeforeRenderObserver;
        private _isPlaying;
        private _timelineRef;
        private _animationCurveEditorContext;
        private _animationControl;
        constructor(props: IAnimationGridComponentProps);
        playOrPause(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        onCurrentFrameChange(value: number): void;
        onChangeFromOrTo(): void;
        componentDidUpdate(prevProps: IAnimationGridComponentProps): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IAnimationGroupGridComponentProps {
        globalState: GlobalState;
        animationGroup: BABYLON.AnimationGroup;
        scene: BABYLON.Scene;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class AnimationGroupGridComponent extends React.Component<IAnimationGroupGridComponentProps, {
        playButtonText: string;
        currentFrame: number;
    }> {
        private _onAnimationGroupPlayObserver;
        private _onAnimationGroupPauseObserver;
        private _onBeforeRenderObserver;
        private _timelineRef;
        private _animationCurveEditorContext;
        constructor(props: IAnimationGroupGridComponentProps);
        componentDidMount(): void;
        disconnect(animationGroup: BABYLON.AnimationGroup): void;
        connect(animationGroup: BABYLON.AnimationGroup): void;
        updateCurrentFrame(animationGroup: BABYLON.AnimationGroup): void;
        shouldComponentUpdate(nextProps: IAnimationGroupGridComponentProps): boolean;
        componentWillUnmount(): void;
        playOrPause(): void;
        onCurrentFrameChange(value: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ITopBarComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface ITopBarComponentState {
        keyFrameValue: string;
        keyValue: string;
        frameControlEnabled: boolean;
        valueControlEnabled: boolean;
    }
    export class TopBarComponent extends React.Component<ITopBarComponentProps, ITopBarComponentState> {
        private _onFrameSetObserver;
        private _onValueSetObserver;
        private _onActiveAnimationChangedObserver;
        private _onActiveKeyPointChanged;
        constructor(props: ITopBarComponentProps);
        componentWillUnmount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    export interface IActiveAnimationChangedOptions {
        evaluateKeys?: boolean;
        frame?: boolean;
        range?: boolean;
    }
    export class Context {
        title: string;
        animations: BABYLON.Nullable<BABYLON.Animation[] | BABYLON.TargetedAnimation[]>;
        scene: BABYLON.Scene;
        target: BABYLON.Nullable<BABYLON.IAnimatable>;
        rootAnimationGroup: BABYLON.Nullable<BABYLON.AnimationGroup>;
        activeAnimations: BABYLON.Animation[];
        activeChannels: {
            [key: number]: string;
        };
        activeKeyPoints: BABYLON.Nullable<KeyPointComponent[]>;
        mainKeyPoint: BABYLON.Nullable<KeyPointComponent>;
        snippetId: string;
        useTargetAnimations: boolean;
        activeFrame: number;
        fromKey: number;
        toKey: number;
        useExistingPlayRange: boolean;
        forwardAnimation: boolean;
        isPlaying: boolean;
        clipLength: number;
        referenceMinFrame: number;
        referenceMaxFrame: number;
        focusedInput: boolean;
        onActiveAnimationChanged: BABYLON.Observable<IActiveAnimationChangedOptions>;
        onActiveKeyPointChanged: BABYLON.Observable<void>;
        onHostWindowResized: BABYLON.Observable<void>;
        onSelectAllKeys: BABYLON.Observable<void>;
        onActiveKeyFrameChanged: BABYLON.Observable<number>;
        onFrameSet: BABYLON.Observable<number>;
        onFrameManuallyEntered: BABYLON.Observable<number>;
        onMainKeyPointSet: BABYLON.Observable<void>;
        onMainKeyPointMoved: BABYLON.Observable<void>;
        onValueSet: BABYLON.Observable<number>;
        onValueManuallyEntered: BABYLON.Observable<number>;
        onFrameRequired: BABYLON.Observable<void>;
        onCreateOrUpdateKeyPointRequired: BABYLON.Observable<void>;
        onFlattenTangentRequired: BABYLON.Observable<void>;
        onLinearTangentRequired: BABYLON.Observable<void>;
        onBreakTangentRequired: BABYLON.Observable<void>;
        onUnifyTangentRequired: BABYLON.Observable<void>;
        onStepTangentRequired: BABYLON.Observable<void>;
        onDeleteAnimation: BABYLON.Observable<BABYLON.Animation>;
        onGraphMoved: BABYLON.Observable<number>;
        onGraphScaled: BABYLON.Observable<number>;
        onRangeUpdated: BABYLON.Observable<void>;
        onMoveToFrameRequired: BABYLON.Observable<number>;
        onAnimationStateChanged: BABYLON.Observable<void>;
        onDeleteKeyActiveKeyPoints: BABYLON.Observable<void>;
        onSelectionRectangleMoved: BABYLON.Observable<DOMRect>;
        onAnimationsLoaded: BABYLON.Observable<void>;
        onEditAnimationRequired: BABYLON.Observable<BABYLON.Animation>;
        onEditAnimationUIClosed: BABYLON.Observable<void>;
        onClipLengthIncreased: BABYLON.Observable<number>;
        onClipLengthDecreased: BABYLON.Observable<number>;
        onInterpolationModeSet: BABYLON.Observable<{
            keyId: number;
            value: BABYLON.AnimationKeyInterpolation;
        }>;
        onSelectToActivated: BABYLON.Observable<{
            from: number;
            to: number;
        }>;
        onRangeFrameBarResized: BABYLON.Observable<number>;
        onPlayheadMoved: BABYLON.Observable<number>;
        lockLastFrameValue: boolean;
        lockLastFrameFrame: boolean;
        onActiveKeyDataChanged: BABYLON.Observable<number>;
        prepare(): void;
        play(forward: boolean): void;
        stop(): void;
        moveToFrame(frame: number): void;
        refreshTarget(): void;
        clearSelection(): void;
        enableChannel(animation: BABYLON.Animation, color: string): void;
        disableChannel(animation: BABYLON.Animation): void;
        isChannelEnabled(animation: BABYLON.Animation, color: string): boolean;
        getActiveChannel(animation: BABYLON.Animation): string;
        resetAllActiveChannels(): void;
        getAnimationSortIndex(animation: BABYLON.Animation): number;
        getPrevKey(): BABYLON.Nullable<number>;
        getNextKey(): BABYLON.Nullable<number>;
        /**
         * If any current active animation has a key at the received frameNumber,
         * return the index of the animation in the active animation array, and
         * the index of the frame on the animation.
         * @param frameNumber the frame number to look for
         * @returns null if no key was found, or an object with the animation index and key index
         */
        getKeyAtAnyFrameIndex(frameNumber: number): {
            animationIndex: number;
            keyIndex: number;
        } | null;
        /**
         * @returns true if any active animation has a quaternion animation
         */
        hasActiveQuaternionAnimationKeyPoints(): boolean;
    }


    interface IAnimationCurveEditorComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IAnimationCurveEditorComponentState {
        isOpen: boolean;
    }
    export class AnimationCurveEditorComponent extends React.Component<IAnimationCurveEditorComponentProps, IAnimationCurveEditorComponentState> {
        constructor(props: IAnimationCurveEditorComponentProps);
        onCloseAnimationCurveEditor(window: Window | null): void;
        shouldComponentUpdate(newProps: IAnimationCurveEditorComponentProps, newState: IAnimationCurveEditorComponentState): boolean;
        private _onKeyDown;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISideBarComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface ISideBarComponentState {
        mode: Mode;
    }
    enum Mode {
        Edit = 0,
        Add = 1,
        Load = 2,
        Save = 3
    }
    export class SideBarComponent extends React.Component<ISideBarComponentProps, ISideBarComponentState> {
        constructor(props: ISideBarComponentProps);
        private _onAddAnimation;
        private _onLoadAnimation;
        private _onSaveAnimation;
        private _onEditAnimation;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ISaveAnimationComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface ISaveAnimationComponentState {
    }
    export class SaveAnimationComponent extends React.Component<ISaveAnimationComponentProps, ISaveAnimationComponentState> {
        private _selectedAnimations;
        private _root;
        constructor(props: ISaveAnimationComponentProps);
        private _getJson;
        saveToSnippetServer(): void;
        saveToFile(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ILoadAnimationComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface ILoadAnimationComponentState {
    }
    export class LoadAnimationComponent extends React.Component<ILoadAnimationComponentProps, ILoadAnimationComponentState> {
        private _root;
        private _textInput;
        constructor(props: ILoadAnimationComponentProps);
        loadFromFile(evt: React.ChangeEvent<HTMLInputElement>): void;
        loadFromSnippetServer(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IEditAnimationComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IEditAnimationComponentState {
        isVisible: boolean;
        animation: BABYLON.Nullable<BABYLON.Animation>;
    }
    export class EditAnimationComponent extends React.Component<IEditAnimationComponentProps, IEditAnimationComponentState> {
        private _root;
        private _displayName;
        private _property;
        private _loopModeElement;
        private _onEditAnimationRequiredObserver;
        constructor(props: IEditAnimationComponentProps);
        componentWillUnmount(): void;
        close(): void;
        validate(): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface IAnimationSubEntryComponentProps {
        globalState: GlobalState;
        context: Context;
        animation: BABYLON.Animation;
        color: string;
        subName: string;
    }
    interface IAnimationSubEntryComponentState {
        isSelected: boolean;
    }
    export class AnimationSubEntryComponent extends React.Component<IAnimationSubEntryComponentProps, IAnimationSubEntryComponentState> {
        private _onActiveAnimationChangedObserver;
        private _onActiveKeyPointChangedObserver;
        constructor(props: IAnimationSubEntryComponentProps);
        componentWillUnmount(): void;
        private _activate;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IAnimationListComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IAnimationListComponentState {
        isVisible: boolean;
    }
    export class AnimationListComponent extends React.Component<IAnimationListComponentProps, IAnimationListComponentState> {
        private _onEditAnimationRequiredObserver;
        private _onEditAnimationUIClosedObserver;
        private _onDeleteAnimationObserver;
        constructor(props: IAnimationListComponentProps);
        componentWillUnmount(): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface IAnimationEntryComponentProps {
        globalState: GlobalState;
        context: Context;
        animation: BABYLON.Animation;
    }
    interface IAnimationEntryComponentState {
        isExpanded: boolean;
        isSelected: boolean;
    }
    export class AnimationEntryComponent extends React.Component<IAnimationEntryComponentProps, IAnimationEntryComponentState> {
        private _onActiveAnimationChangedObserver;
        private _onActiveKeyPointChangedObserver;
        private _onSelectToActivatedObserver;
        private _unmount;
        constructor(props: IAnimationEntryComponentProps);
        private _onGear;
        private _onDelete;
        componentWillUnmount(): void;
        private _activate;
        private _expandOrCollapse;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IAddAnimationComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IAddAnimationComponentState {
        customPropertyMode: boolean;
    }
    export class AddAnimationComponent extends React.Component<IAddAnimationComponentProps, IAddAnimationComponentState> {
        private _root;
        private _displayName;
        private _property;
        private _typeElement;
        private _propertylement;
        private _loopModeElement;
        constructor(props: IAddAnimationComponentProps);
        createNew(): void;
        getInferredType(activeProperty?: string): any;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IRangeFrameBarComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IRangeFrameBarComponentState {
    }
    export class RangeFrameBarComponent extends React.Component<IRangeFrameBarComponentProps, IRangeFrameBarComponentState> {
        private _svgHost;
        private _viewWidth;
        private _offsetX;
        private _isMounted;
        private _onActiveAnimationChangedObserver;
        private _onPlayheadMovedObserver;
        private _onFrameManuallyEnteredObserver;
        constructor(props: IRangeFrameBarComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        private _computeSizes;
        private _dropKeyFrames;
        private _buildActiveFrame;
        private _buildFrames;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPlayHeadComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IPlayHeadComponentState {
    }
    export class PlayHeadComponent extends React.Component<IPlayHeadComponentProps, IPlayHeadComponentState> {
        private readonly _graphAbsoluteWidth;
        private _playHead;
        private _playHeadCircle;
        private _onBeforeRenderObserver;
        private _onActiveAnimationChangedObserver;
        private _onRangeFrameBarResizedObserver;
        private _onMoveToFrameRequiredObserver;
        private _onGraphMovedObserver;
        private _onGraphScaledObserver;
        private _viewScale;
        private _offsetX;
        private _offsetRange;
        private _viewWidth;
        private readonly _rangeWidthToPlayheadWidth;
        private _pointerIsDown;
        constructor(props: IPlayHeadComponentProps);
        private _moveHead;
        private _frameToPixel;
        private _pixelToFrame;
        componentWillUnmount(): void;
        private _getPixelValues;
        private _onPointerDown;
        private _onPointerMove;
        private _onPointerUp;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface IKeyPointComponentProps {
        x: number;
        y: number;
        getPreviousX: () => BABYLON.Nullable<number>;
        getNextX: () => BABYLON.Nullable<number>;
        invertX: (x: number) => number;
        invertY: (y: number) => number;
        convertX: (x: number) => number;
        convertY: (y: number) => number;
        nextX?: number;
        scale: number;
        keyId: number;
        curve: Curve;
        context: Context;
        channel: string;
        onFrameValueChanged: (value: number) => void;
        onKeyValueChanged: (value: number) => void;
    }
    interface IKeyPointComponentState {
        selectedState: SelectionState;
        tangentSelectedIndex: number;
        x: number;
        y: number;
    }
    export enum SelectionState {
        None = 0,
        Selected = 1,
        Siblings = 2
    }
    export class KeyPointComponent extends React.Component<IKeyPointComponentProps, IKeyPointComponentState> {
        private _onActiveKeyPointChangedObserver;
        private _onActiveKeyFrameChangedObserver;
        private _onFrameManuallyEnteredObserver;
        private _onValueManuallyEnteredObserver;
        private _onMainKeyPointSetObserver;
        private _onMainKeyPointMovedObserver;
        private _onSelectionRectangleMovedObserver;
        private _onFlattenTangentRequiredObserver;
        private _onLinearTangentRequiredObserver;
        private _onBreakTangentRequiredObserver;
        private _onUnifyTangentRequiredObserver;
        private _onStepTangentRequiredObserver;
        private _onSelectAllKeysObserver;
        private _pointerIsDown;
        private _sourcePointerX;
        private _sourcePointerY;
        private _offsetXToMain;
        private _offsetYToMain;
        private _svgHost;
        private _keyPointSVG;
        private _controlMode;
        private _storedLengthIn;
        private _storedLengthOut;
        private _inVec;
        private _outVec;
        private _lockX;
        private _lockY;
        private _accumulatedX;
        private _accumulatedY;
        constructor(props: IKeyPointComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(newProps: IKeyPointComponentProps, newState: IKeyPointComponentState): boolean;
        private _breakTangent;
        private _unifyTangent;
        private _flattenTangent;
        private _linearTangent;
        private _stepTangent;
        private _select;
        private _onPointerDown;
        private _extractSlope;
        private _processTangentMove;
        private _onPointerMove;
        private _onPointerUp;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface IGraphComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IGraphComponentState {
    }
    export class GraphComponent extends React.Component<IGraphComponentProps, IGraphComponentState> {
        private readonly _minScale;
        private readonly _maxScale;
        private readonly _graphAbsoluteWidth;
        private readonly _graphAbsoluteHeight;
        private _viewWidth;
        private _viewCurveWidth;
        private _viewHeight;
        private _viewScale;
        private _offsetX;
        private _offsetY;
        private _inSelectionMode;
        private _graphOffsetX;
        private _minValue;
        private _maxValue;
        private _minFrame;
        private _maxFrame;
        private _svgHost;
        private _svgHost2;
        private _selectionRectangle;
        private _curves;
        private _pointerIsDown;
        private _sourcePointerX;
        private _sourcePointerY;
        private _selectionMade;
        private _selectionStartX;
        private _selectionStartY;
        private _onActiveAnimationChangedObserver;
        constructor(props: IGraphComponentProps);
        componentWillUnmount(): void;
        private _computeSizes;
        private _setDefaultInTangent;
        private _setDefaultOutTangent;
        private _evaluateKeys;
        private _extractValuesFromKeys;
        private _convertX;
        private _invertX;
        private _convertY;
        private _invertY;
        private _buildFrameIntervalAxis;
        private _buildYAxis;
        private _frameFromActiveKeys;
        private _dropKeyFrames;
        private _onPointerDown;
        private _onPointerMove;
        private _onPointerUp;
        private _onWheel;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IFrameBarComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IFrameBarComponentState {
    }
    export class FrameBarComponent extends React.Component<IFrameBarComponentProps, IFrameBarComponentState> {
        private readonly _graphAbsoluteWidth;
        private _svgHost;
        private _viewWidth;
        private _viewScale;
        private _offsetX;
        private _onActiveAnimationChangedObserver;
        constructor(props: IFrameBarComponentProps);
        componentWillUnmount(): void;
        private _computeSizes;
        private _buildFrames;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ICurveComponentProps {
        curve: Curve;
        convertX: (x: number) => number;
        convertY: (x: number) => number;
        context: Context;
    }
    interface ICurveComponentState {
        isSelected: boolean;
    }
    export class CurveComponent extends React.Component<ICurveComponentProps, ICurveComponentState> {
        private _onDataUpdatedObserver;
        private _onActiveAnimationChangedObserver;
        private _onInterpolationModeSetObserver;
        constructor(props: ICurveComponentProps);
        componentWillUnmount(): void;
        componentDidUpdate(): boolean;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    export interface KeyEntry {
        frame: number;
        value: number;
        inTangent?: number;
        outTangent?: number;
        lockedTangent: boolean;
        interpolation?: BABYLON.AnimationKeyInterpolation;
    }
    export class Curve {
        static readonly SampleRate = 50;
        keys: KeyEntry[];
        animation: BABYLON.Animation;
        color: string;
        onDataUpdatedObservable: BABYLON.Observable<void>;
        property?: string;
        tangentBuilder?: () => any;
        setDefaultInTangent?: (keyId: number) => any;
        setDefaultOutTangent?: (keyId: number) => any;
        static readonly TangentLength = 50;
        constructor(color: string, animation: BABYLON.Animation, property?: string, tangentBuilder?: () => any, setDefaultInTangent?: (keyId: number) => any, setDefaultOutTangent?: (keyId: number) => any);
        getPathData(convertX: (x: number) => number, convertY: (y: number) => number): string;
        updateLockedTangentMode(keyIndex: number, enabled: boolean): void;
        updateInterpolationMode(keyIndex: number, interpolationMode: BABYLON.AnimationKeyInterpolation): void;
        getInControlPoint(keyIndex: number): number | undefined;
        getOutControlPoint(keyIndex: number): number | undefined;
        hasDefinedOutTangent(keyIndex: number): boolean;
        evaluateOutTangent(keyIndex: number): number;
        hasDefinedInTangent(keyIndex: number): boolean;
        evaluateInTangent(keyIndex: number): number;
        storeDefaultInTangent(keyIndex: number): void;
        storeDefaultOutTangent(keyIndex: number): void;
        updateInTangentFromControlPoint(keyId: number, slope: number): void;
        updateOutTangentFromControlPoint(keyId: number, slope: number): void;
        updateKeyFrame(keyId: number, frame: number): void;
        updateKeyValue(keyId: number, value: number): void;
    }


    interface ICanvasComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface ICanvasComponentState {
    }
    export class CanvasComponent extends React.Component<ICanvasComponentProps, ICanvasComponentState> {
        private _onActiveAnimationChangedObserver;
        constructor(props: ICanvasComponentProps);
        componentWillUnmount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface ITextInputComponentProps {
        globalState: GlobalState;
        context: Context;
        id?: string;
        className?: string;
        tooltip?: string;
        value: string;
        isNumber?: boolean;
        complement?: string;
        onValueAsNumberChanged?: (value: number, isFocused: boolean) => void;
        disabled?: boolean;
    }
    interface ITextInputComponentState {
        value: string;
        isFocused: boolean;
    }
    export class TextInputComponent extends React.Component<ITextInputComponentProps, ITextInputComponentState> {
        private _lastKnownGoodValue;
        constructor(props: ITextInputComponentProps);
        private _onChange;
        private _onBlur;
        private _onFocus;
        shouldComponentUpdate(newProps: ITextInputComponentProps, newState: ITextInputComponentState): boolean;
        private _onKeyPress;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPushButtonComponentProps {
        globalState: GlobalState;
        context: Context;
        icon: string;
        id?: string;
        className?: string;
        isPushed?: boolean;
        onClick: (state: boolean) => void;
        tooltip?: string;
    }
    interface IPushButtonComponentState {
        isPushed: boolean;
    }
    export class PushButtonComponent extends React.Component<IPushButtonComponentProps, IPushButtonComponentState> {
        constructor(props: IPushButtonComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IControlButtonComponentProps {
        globalState: GlobalState;
        context: Context;
        icon: string;
        hoverIcon: string;
        id?: string;
        className?: string;
        onClick: () => void;
        tooltip?: string;
    }
    interface IControlButtonComponentState {
    }
    export class ControlButtonComponent extends React.Component<IControlButtonComponentProps, IControlButtonComponentState> {
        constructor(props: IControlButtonComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IActionButtonComponentProps {
        globalState: GlobalState;
        context: Context;
        icon: string;
        id?: string;
        className?: string;
        isActive?: boolean;
        onClick: () => void;
        tooltip?: string;
    }
    interface IActionButtonComponentState {
    }
    export class ActionButtonComponent extends React.Component<IActionButtonComponentProps, IActionButtonComponentState> {
        constructor(props: IActionButtonComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IRangeSelectorComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IRangeSelectorComponentState {
    }
    export class RangeSelectorComponent extends React.Component<IRangeSelectorComponentProps, IRangeSelectorComponentState> {
        private _rangeHost;
        private _rangeScrollbarHost;
        private _viewWidth;
        private _pointerIsDown;
        private _minFrame;
        private _maxFrame;
        private _leftHandleIsActive;
        private _bothHandleIsActive;
        private _currentOffset;
        private _currentFrom;
        private _currentTo;
        constructor(props: IRangeSelectorComponentProps);
        private _computeSizes;
        private _onPointerDown;
        private _onPointerMove;
        private _updateLimits;
        private _onPointerUp;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IMediaPlayerComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IMediaPlayerComponentState {
    }
    export class MediaPlayerComponent extends React.Component<IMediaPlayerComponentProps, IMediaPlayerComponentState> {
        private _isMounted;
        constructor(props: IMediaPlayerComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        private _onFirstKey;
        private _onPrevKey;
        private _onRewind;
        private _onForward;
        private _onPrevFrame;
        private _onNextFrame;
        private _onNextKey;
        private _onEndKey;
        private _onStop;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IBottomBarComponentProps {
        globalState: GlobalState;
        context: Context;
    }
    interface IBottomBarComponentState {
        clipLength: string;
    }
    export class BottomBarComponent extends React.Component<IBottomBarComponentProps, IBottomBarComponentState> {
        private _onAnimationsLoadedObserver;
        private _onActiveAnimationChangedObserver;
        private _onClipLengthIncreasedObserver;
        private _onClipLengthDecreasedObserver;
        constructor(props: IBottomBarComponentProps);
        private _changeClipLength;
        componentWillUnmount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IPerformanceViewerSidebarComponentProps {
        collector: BABYLON.PerformanceViewerCollector;
        onVisibleRangeChangedObservable?: BABYLON.Observable<IVisibleRangeChangedObservableProps>;
    }
    export const PerformanceViewerSidebarComponent: (props: IPerformanceViewerSidebarComponentProps) => import("react/jsx-runtime").JSX.Element;


    interface IPerformanceViewerPopupComponentProps {
        scene: BABYLON.Scene;
        layoutObservable: BABYLON.Observable<IPerfLayoutSize>;
        returnToLiveObservable: BABYLON.Observable<void>;
        performanceCollector: BABYLON.PerformanceViewerCollector;
        initialGraphSize?: {
            width: number;
            height: number;
        };
    }
    export var PerformanceViewerPopupComponent: React.FC<IPerformanceViewerPopupComponentProps>;


    interface IPerformanceViewerComponentProps {
        scene: BABYLON.Scene;
    }
    export enum IPerfMetadataCategory {
        Count = "Count",
        FrameSteps = "Frame Steps Duration"
    }
    export var PerformanceViewerComponent: React.FC<IPerformanceViewerComponentProps>;


    interface IPerformancePlayheadButtonProps {
        returnToPlayhead: BABYLON.Observable<void>;
    }
    export var PerformancePlayheadButtonComponent: React.FC<IPerformancePlayheadButtonProps>;


    export interface ITextureLinkLineComponentProps {
        label: string;
        texture: BABYLON.Nullable<BABYLON.BaseTexture>;
        material?: BABYLON.Material;
        texturedObject?: {
            getScene: () => BABYLON.Scene;
        };
        onSelectionChangedObservable?: BABYLON.Observable<any>;
        onDebugSelectionChangeObservable?: BABYLON.Observable<TextureLinkLineComponent>;
        propertyName?: string;
        onTextureCreated?: (texture: BABYLON.BaseTexture) => void;
        customDebugAction?: (state: boolean) => void;
        onTextureRemoved?: () => void;
        fileFormats?: string;
        cubeOnly?: boolean;
    }
    export class TextureLinkLineComponent extends React.Component<ITextureLinkLineComponentProps, {
        isDebugSelected: boolean;
    }> {
        private _onDebugSelectionChangeObserver;
        constructor(props: ITextureLinkLineComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        debugTexture(): void;
        onLink(): void;
        updateTexture(file: File): void;
        removeTexture(): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }


    interface ITextureLineComponentProps {
        texture: BABYLON.BaseTexture;
        width: number;
        height: number;
        globalState?: GlobalState;
        hideChannelSelect?: boolean;
    }
    export class TextureLineComponent extends React.Component<ITextureLineComponentProps, {
        channels: TextureChannelsToDisplay;
        face: number;
    }> {
        private _canvasRef;
        private static _TextureChannelStates;
        constructor(props: ITextureLineComponentProps);
        shouldComponentUpdate(nextProps: ITextureLineComponentProps, nextState: {
            channels: TextureChannelsToDisplay;
            face: number;
        }): boolean;
        componentDidMount(): void;
        componentDidUpdate(): void;
        updatePreview(): Promise<void>;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IQuaternionLineComponentProps {
        label: string;
        target: any;
        useEuler?: boolean;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class QuaternionLineComponent extends React.Component<IQuaternionLineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Quaternion;
        eulerValue: BABYLON.Vector3;
    }> {
        private _localChange;
        constructor(props: IQuaternionLineComponentProps);
        _checkRoundCircle(a: number, b: number): boolean;
        shouldComponentUpdate(nextProps: IQuaternionLineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Quaternion;
            eulerValue: BABYLON.Vector3;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(currentValue: BABYLON.Quaternion, previousValue: BABYLON.Quaternion): void;
        updateQuaternion(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        updateStateW(value: number): void;
        updateQuaternionFromEuler(): void;
        updateStateEulerX(value: number): void;
        updateStateEulerY(value: number): void;
        updateStateEulerZ(value: number): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }


    interface IMeshPickerComponentProps {
        globalState: GlobalState;
        target: any;
        property: string;
        scene: BABYLON.Scene;
        label: string;
        onPropertyChangedObservable?: BABYLON.Observable<PropertyChangedEvent>;
    }
    export class MeshPickerComponent extends React.Component<IMeshPickerComponentProps> {
        constructor(props: IMeshPickerComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Copy all styles from a document to another document or shadow root
     * @param source document to copy styles from
     * @param target document or shadow root to copy styles to
     */
    export function CopyStyles(source: Document, target: DocumentOrShadowRoot): void;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class StringTools {
        private static _SaveAs;
        private static _Click;
        /**
         * Download a string into a file that will be saved locally by the browser
         * @param document
         * @param content defines the string to download locally as a file
         * @param filename
         */
        static DownloadAsFile(document: HTMLDocument, content: string, filename: string): void;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class PropertyChangedEvent {
        object: any;
        property: string;
        value: any;
        initialValue: any;
        allowNullValue?: boolean;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Create a popup window
     * @param title default title for the popup
     * @param options options for the popup
     * @returns the parent control of the popup
     */
    export function CreatePopup(title: string, options: Partial<{
        onParentControlCreateCallback?: (parentControl: HTMLDivElement) => void;
        onWindowCreateCallback?: (newWindow: Window) => void;
        width?: number;
        height?: number;
    }>): HTMLDivElement | null;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Class handling undo / redo operations
     */
    export class HistoryStack implements BABYLON.IDisposable {
        private _historyStack;
        private _redoStack;
        private _activeData;
        private readonly _maxHistoryLength;
        private _locked;
        private _dataProvider;
        private _applyUpdate;
        /**
         * Gets or sets a boolean indicating if the stack is enabled
         */
        isEnabled: boolean;
        /**
         * Constructor
         * @param dataProvider defines the data provider function
         * @param applyUpdate defines the code to execute when undo/redo operation is required
         */
        constructor(dataProvider: () => any, applyUpdate: (data: any) => void);
        /**
         * Process key event to handle undo / redo
         * @param evt defines the keyboard event to process
         * @returns true if the event was processed
         */
        processKeyEvent(evt: KeyboardEvent): boolean;
        /**
         * Resets the stack
         */
        reset(): void;
        /**
         * Remove the n-1 element of the stack
         */
        collapseLastTwo(): void;
        private _generateJSONDiff;
        private _applyJSONDiff;
        private _copy;
        /**
         * Stores the current state
         */
        store(): void;
        /**
         * Undo the latest operation
         */
        undo(): void;
        /**
         * Redo the latest undo operation
         */
        redo(): void;
        /**
         * Disposes the stack
         */
        dispose(): void;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export function copyCommandToClipboard(strCommand: string): void;
    export function getClassNameWithNamespace(obj: any): {
        className: string;
        babylonNamespace: string;
    };



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Class used to provide lock mechanism
     */
    export class LockObject {
        /**
         * Gets or set if the lock is engaged
         */
        lock: boolean;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ITextBlockPropertyGridComponentProps {
        textBlock: BABYLON.GUI.TextBlock;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class TextBlockPropertyGridComponent extends React.Component<ITextBlockPropertyGridComponentProps> {
        constructor(props: ITextBlockPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IStackPanelPropertyGridComponentProps {
        stackPanel: BABYLON.GUI.StackPanel;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class StackPanelPropertyGridComponent extends React.Component<IStackPanelPropertyGridComponentProps> {
        constructor(props: IStackPanelPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ISliderPropertyGridComponentProps {
        slider: BABYLON.GUI.Slider;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class SliderPropertyGridComponent extends React.Component<ISliderPropertyGridComponentProps> {
        constructor(props: ISliderPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IScrollViewerPropertyGridComponentProps {
        scrollViewer: BABYLON.GUI.ScrollViewer;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ScrollViewerPropertyGridComponent extends React.Component<IScrollViewerPropertyGridComponentProps> {
        constructor(props: IScrollViewerPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IRectanglePropertyGridComponentProps {
        rectangle: BABYLON.GUI.Rectangle;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class RectanglePropertyGridComponent extends React.Component<IRectanglePropertyGridComponentProps> {
        constructor(props: IRectanglePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IRadioButtonPropertyGridComponentProps {
        radioButtons: BABYLON.GUI.RadioButton[];
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class RadioButtonPropertyGridComponent extends React.Component<IRadioButtonPropertyGridComponentProps> {
        constructor(props: IRadioButtonPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ILinePropertyGridComponentProps {
        line: BABYLON.GUI.Line;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class LinePropertyGridComponent extends React.Component<ILinePropertyGridComponentProps> {
        constructor(props: ILinePropertyGridComponentProps);
        onDashChange(value: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IInputTextPropertyGridComponentProps {
        inputText: BABYLON.GUI.InputText;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class InputTextPropertyGridComponent extends React.Component<IInputTextPropertyGridComponentProps> {
        constructor(props: IInputTextPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IImagePropertyGridComponentProps {
        image: BABYLON.GUI.Image;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ImagePropertyGridComponent extends React.Component<IImagePropertyGridComponentProps> {
        constructor(props: IImagePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IImageBasedSliderPropertyGridComponentProps {
        imageBasedSlider: BABYLON.GUI.ImageBasedSlider;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ImageBasedSliderPropertyGridComponent extends React.Component<IImageBasedSliderPropertyGridComponentProps> {
        constructor(props: IImageBasedSliderPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IGridPropertyGridComponentProps {
        grid: BABYLON.GUI.Grid;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class GridPropertyGridComponent extends React.Component<IGridPropertyGridComponentProps> {
        constructor(props: IGridPropertyGridComponentProps);
        renderRows(): import("react/jsx-runtime").JSX.Element[];
        renderColumns(): import("react/jsx-runtime").JSX.Element[];
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IEllipsePropertyGridComponentProps {
        ellipse: BABYLON.GUI.Ellipse;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class EllipsePropertyGridComponent extends React.Component<IEllipsePropertyGridComponentProps> {
        constructor(props: IEllipsePropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IControlPropertyGridComponentProps {
        control: BABYLON.GUI.Control;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ControlPropertyGridComponent extends React.Component<IControlPropertyGridComponentProps> {
        constructor(props: IControlPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ICommonControlPropertyGridComponentProps {
        controls?: BABYLON.GUI.Control[];
        control?: BABYLON.GUI.Control;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class CommonControlPropertyGridComponent extends React.Component<ICommonControlPropertyGridComponentProps> {
        constructor(props: ICommonControlPropertyGridComponentProps);
        renderGridInformation(control: BABYLON.GUI.Control): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element | undefined;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IColorPickerPropertyGridComponentProps {
        colorPicker: BABYLON.GUI.ColorPicker;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class ColorPickerPropertyGridComponent extends React.Component<IColorPickerPropertyGridComponentProps> {
        constructor(props: IColorPickerPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ICheckboxPropertyGridComponentProps {
        checkbox: BABYLON.GUI.Checkbox;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
    }
    export class CheckboxPropertyGridComponent extends React.Component<ICheckboxPropertyGridComponentProps> {
        constructor(props: ICheckboxPropertyGridComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Splitter component properties
     */
    export interface ISplitterProps {
        /**
         * Unique identifier
         */
        id?: string;
        /**
         * Splitter size
         */
        size: number;
        /**
         * Minimum size for the controlled element
         */
        minSize?: number;
        /**
         * Maximum size for the controlled element
         */
        maxSize?: number;
        /**
         * Initial size for the controlled element
         */
        initialSize?: number;
        /**
         * Defines the controlled side
         */
        controlledSide: INSPECTOR.SharedUIComponents.ControlledSize;
        /**
         * refObject to the splitter element
         */
        refObject?: React.RefObject<HTMLDivElement>;
    }
    /**
     * Creates a splitter component
     * @param props defines the splitter properties
     * @returns the splitter component
     */
    export var Splitter: React.FC<ISplitterProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export enum ControlledSize {
        First = 0,
        Second = 1
    }
    export enum SplitDirection {
        Horizontal = 0,
        Vertical = 1
    }
    /**
     * Context used to share data with splitters
     */
    export interface ISplitContext {
        /**
         * Split direction
         */
        direction: SplitDirection;
        /**
         * Function called by splitters to update the offset
         * @param offset new offet
         * @param source source element
         * @param controlledSide defined controlled element
         */
        drag: (offset: number, source: HTMLElement, controlledSide: ControlledSize) => void;
        /**
         * Function called by splitters to begin dragging
         */
        beginDrag: () => void;
        /**
         * Function called by splitters to end dragging
         */
        endDrag: () => void;
        /**
         * Sync sizes for the elements
         * @param source source element
         * @param controlledSide defined controlled element
         * @param size size of the controlled element
         * @param minSize minimum size for the controlled element
         * @param maxSize maximum size for the controlled element
         */
        sync: (source: HTMLElement, controlledSide: ControlledSize, size?: number, minSize?: number, maxSize?: number) => void;
    }
    export var SplitContext: import("react").Context<ISplitContext>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Split container properties
     */
    export interface ISplitContainerProps {
        /**
         * Unique identifier
         */
        id?: string;
        /**
         * Split direction
         */
        direction: INSPECTOR.SharedUIComponents.SplitDirection;
        /**
         * Minimum size for the floating elements
         */
        floatingMinSize?: number;
        /**
         * RefObject to the root div element
         */
        containerRef?: React.RefObject<HTMLDivElement>;
        /**
         * Optional class name
         */
        className?: string;
        /**
         * Pointer down
         * @param event pointer events
         */
        onPointerDown?: (event: React.PointerEvent) => void;
        /**
         * Pointer move
         * @param event pointer events
         */
        onPointerMove?: (event: React.PointerEvent) => void;
        /**
         * Pointer up
         * @param event pointer events
         */
        onPointerUp?: (event: React.PointerEvent) => void;
        /**
         * Drop
         * @param event drag events
         */
        onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
        /**
         * Drag over
         * @param event drag events
         */
        onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
    }
    /**
     * Creates a split container component
     * @param props defines the split container properties
     * @returns the split container component
     */
    export var SplitContainer: React.FC<ISplitContainerProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class TypeLedger {
        static PortDataBuilder: (port: INSPECTOR.SharedUIComponents.NodePort, nodeContainer: INSPECTOR.SharedUIComponents.INodeContainer) => INSPECTOR.SharedUIComponents.IPortData;
        static NodeDataBuilder: (data: any, nodeContainer: INSPECTOR.SharedUIComponents.INodeContainer) => INSPECTOR.SharedUIComponents.INodeData;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export const IsFramePortData: (variableToCheck: any) => variableToCheck is INSPECTOR.SharedUIComponents.FramePortData;
    export const RefreshNode: (node: INSPECTOR.SharedUIComponents.GraphNode, visitedNodes?: Set<INSPECTOR.SharedUIComponents.GraphNode>, visitedLinks?: Set<INSPECTOR.SharedUIComponents.NodeLink>, canvas?: INSPECTOR.SharedUIComponents.GraphCanvasComponent) => void;
    export const BuildFloatUI: (container: HTMLDivElement, document: Document, displayName: string, isInteger: boolean, source: any, propertyName: string, onChange: () => void, min?: number, max?: number, visualPropertiesRefresh?: Array<() => void>) => void;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class StateManager {
        data: any;
        hostDocument: Document;
        lockObject: any;
        modalIsDisplayed: boolean;
        historyStack: INSPECTOR.SharedUIComponents.HistoryStack;
        onSearchBoxRequiredObservable: BABYLON.Observable<{
            x: number;
            y: number;
        }>;
        onSelectionChangedObservable: BABYLON.Observable<BABYLON.Nullable<INSPECTOR.SharedUIComponents.ISelectionChangedOptions>>;
        onFrameCreatedObservable: BABYLON.Observable<INSPECTOR.SharedUIComponents.GraphFrame>;
        onUpdateRequiredObservable: BABYLON.Observable<any>;
        onGraphNodeRemovalObservable: BABYLON.Observable<INSPECTOR.SharedUIComponents.GraphNode>;
        onSelectionBoxMoved: BABYLON.Observable<ClientRect | DOMRect>;
        onCandidateLinkMoved: BABYLON.Observable<BABYLON.Nullable<BABYLON.Vector2>>;
        onCandidatePortSelectedObservable: BABYLON.Observable<BABYLON.Nullable<INSPECTOR.SharedUIComponents.FrameNodePort | INSPECTOR.SharedUIComponents.NodePort>>;
        onNewNodeCreatedObservable: BABYLON.Observable<INSPECTOR.SharedUIComponents.GraphNode>;
        onRebuildRequiredObservable: BABYLON.Observable<void>;
        onNodeMovedObservable: BABYLON.Observable<INSPECTOR.SharedUIComponents.GraphNode>;
        onErrorMessageDialogRequiredObservable: BABYLON.Observable<string>;
        onExposePortOnFrameObservable: BABYLON.Observable<INSPECTOR.SharedUIComponents.GraphNode>;
        onGridSizeChanged: BABYLON.Observable<void>;
        onNewBlockRequiredObservable: BABYLON.Observable<{
            type: string;
            targetX: number;
            targetY: number;
            needRepositioning?: boolean;
            smartAdd?: boolean;
        }>;
        onHighlightNodeObservable: BABYLON.Observable<{
            data: any;
            active: boolean;
        }>;
        onPreviewCommandActivated: BABYLON.Observable<boolean>;
        exportData: (data: any, frame?: BABYLON.Nullable<INSPECTOR.SharedUIComponents.GraphFrame>) => string;
        isElbowConnectionAllowed: (nodeA: INSPECTOR.SharedUIComponents.FrameNodePort | INSPECTOR.SharedUIComponents.NodePort, nodeB: INSPECTOR.SharedUIComponents.FrameNodePort | INSPECTOR.SharedUIComponents.NodePort) => boolean;
        isDebugConnectionAllowed: (nodeA: INSPECTOR.SharedUIComponents.FrameNodePort | INSPECTOR.SharedUIComponents.NodePort, nodeB: INSPECTOR.SharedUIComponents.FrameNodePort | INSPECTOR.SharedUIComponents.NodePort) => boolean;
        applyNodePortDesign: (data: INSPECTOR.SharedUIComponents.IPortData, element: HTMLElement, img: HTMLImageElement, pip: HTMLDivElement) => void;
        getPortColor: (portData: INSPECTOR.SharedUIComponents.IPortData) => string;
        storeEditorData: (serializationObject: any, frame?: BABYLON.Nullable<INSPECTOR.SharedUIComponents.GraphFrame>) => void;
        getEditorDataMap: () => {
            [key: number]: number;
        };
        getScene?: () => BABYLON.Scene;
        createDefaultInputData: (rootData: any, portData: INSPECTOR.SharedUIComponents.IPortData, nodeContainer: INSPECTOR.SharedUIComponents.INodeContainer) => BABYLON.Nullable<{
            data: INSPECTOR.SharedUIComponents.INodeData;
            name: string;
        }>;
        private _isRebuildQueued;
        queueRebuildCommand(): void;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface ISearchBoxComponentProps {
        stateManager: INSPECTOR.SharedUIComponents.StateManager;
    }
    /**
     * The search box component.
     */
    export class SearchBoxComponent extends React.Component<ISearchBoxComponentProps, {
        isVisible: boolean;
        filter: string;
        selectedIndex: number;
    }> {
        private _handleEscKey;
        private _targetX;
        private _targetY;
        private _nodes;
        constructor(props: ISearchBoxComponentProps);
        hide(): void;
        onFilterChange(evt: React.ChangeEvent<HTMLInputElement>): void;
        onNewNodeRequested(name: string): void;
        onKeyDown(evt: React.KeyboardEvent): void;
        render(): import("react/jsx-runtime").JSX.Element | null;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class PropertyLedger {
        static DefaultControl: React.ComponentClass<INSPECTOR.SharedUIComponents.IPropertyComponentProps>;
        static RegisteredControls: {
            [key: string]: React.ComponentClass<INSPECTOR.SharedUIComponents.IPropertyComponentProps>;
        };
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class NodePort {
        portData: IPortData;
        node: INSPECTOR.SharedUIComponents.GraphNode;
        protected _element: HTMLDivElement;
        protected _portContainer: HTMLElement;
        protected _img: HTMLImageElement;
        protected _pip: HTMLDivElement;
        protected _stateManager: INSPECTOR.SharedUIComponents.StateManager;
        protected _portLabelElement: Element;
        protected _onCandidateLinkMovedObserver: BABYLON.Nullable<BABYLON.Observer<BABYLON.Nullable<BABYLON.Vector2>>>;
        protected _onSelectionChangedObserver: BABYLON.Nullable<BABYLON.Observer<BABYLON.Nullable<INSPECTOR.SharedUIComponents.ISelectionChangedOptions>>>;
        protected _exposedOnFrame: boolean;
        protected _portUIcontainer?: HTMLDivElement;
        delegatedPort: BABYLON.Nullable<INSPECTOR.SharedUIComponents.FrameNodePort>;
        get element(): HTMLDivElement;
        get container(): HTMLElement;
        get portName(): string;
        set portName(newName: string);
        get disabled(): boolean;
        hasLabel(): boolean;
        get exposedOnFrame(): boolean;
        set exposedOnFrame(value: boolean);
        get exposedPortPosition(): number;
        set exposedPortPosition(value: number);
        private _isConnectedToNodeOutsideOfFrame;
        refresh(): void;
        constructor(portContainer: HTMLElement, portData: IPortData, node: INSPECTOR.SharedUIComponents.GraphNode, stateManager: INSPECTOR.SharedUIComponents.StateManager, portUIcontainer?: HTMLDivElement);
        dispose(): void;
        static CreatePortElement(portData: IPortData, node: INSPECTOR.SharedUIComponents.GraphNode, root: HTMLElement, displayManager: BABYLON.Nullable<INSPECTOR.SharedUIComponents.IDisplayManager>, stateManager: INSPECTOR.SharedUIComponents.StateManager): NodePort;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class NodeLink {
        private _graphCanvas;
        private _portA;
        private _portB?;
        private _nodeA;
        private _nodeB?;
        private _path;
        private _selectionPath;
        private _onSelectionChangedObserver;
        private _isVisible;
        private _isTargetCandidate;
        private _gradient;
        onDisposedObservable: BABYLON.Observable<NodeLink>;
        get isTargetCandidate(): boolean;
        set isTargetCandidate(value: boolean);
        get isVisible(): boolean;
        set isVisible(value: boolean);
        get portA(): INSPECTOR.SharedUIComponents.FrameNodePort | INSPECTOR.SharedUIComponents.NodePort;
        get portB(): INSPECTOR.SharedUIComponents.FrameNodePort | INSPECTOR.SharedUIComponents.NodePort | undefined;
        get nodeA(): INSPECTOR.SharedUIComponents.GraphNode;
        get nodeB(): INSPECTOR.SharedUIComponents.GraphNode | undefined;
        intersectsWith(rect: DOMRect): boolean;
        update(endX?: number, endY?: number, straight?: boolean): void;
        get path(): SVGPathElement;
        get selectionPath(): SVGPathElement;
        constructor(graphCanvas: INSPECTOR.SharedUIComponents.GraphCanvasComponent, portA: INSPECTOR.SharedUIComponents.NodePort, nodeA: INSPECTOR.SharedUIComponents.GraphNode, portB?: INSPECTOR.SharedUIComponents.NodePort, nodeB?: INSPECTOR.SharedUIComponents.GraphNode);
        onClick(evt: MouseEvent): void;
        dispose(notify?: boolean): void;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class NodeLedger {
        static RegisteredNodeNames: string[];
        static NameFormatter: (name: string) => string;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class GraphNode {
        content: INSPECTOR.SharedUIComponents.INodeData;
        private _visual;
        private _headerContainer;
        private _headerIcon;
        private _headerIconImg;
        private _headerCollapseImg;
        private _header;
        private _headerCollapse;
        private _connections;
        private _optionsContainer;
        private _inputsContainer;
        private _outputsContainer;
        private _content;
        private _comments;
        private _executionTime;
        private _selectionBorder;
        private _inputPorts;
        private _outputPorts;
        private _links;
        private _x;
        private _y;
        private _gridAlignedX;
        private _gridAlignedY;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _stateManager;
        private _onSelectionChangedObserver;
        private _onSelectionBoxMovedObserver;
        private _onFrameCreatedObserver;
        private _onUpdateRequiredObserver;
        private _onHighlightNodeObserver;
        private _ownerCanvas;
        private _isSelected;
        private _displayManager;
        private _isVisible;
        private _enclosingFrameId;
        private _visualPropertiesRefresh;
        addClassToVisual(className: string): void;
        removeClassFromVisual(className: string): void;
        get isCollapsed(): boolean;
        get isVisible(): boolean;
        set isVisible(value: boolean);
        private _upateNodePortNames;
        get outputPorts(): INSPECTOR.SharedUIComponents.NodePort[];
        get inputPorts(): INSPECTOR.SharedUIComponents.NodePort[];
        get links(): INSPECTOR.SharedUIComponents.NodeLink[];
        get gridAlignedX(): number;
        get gridAlignedY(): number;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get width(): number;
        get height(): number;
        get id(): number;
        get name(): string;
        get isSelected(): boolean;
        get enclosingFrameId(): number;
        set enclosingFrameId(value: number);
        set isSelected(value: boolean);
        setIsSelected(value: boolean, marqueeSelection: boolean): void;
        get rootElement(): HTMLDivElement;
        constructor(content: INSPECTOR.SharedUIComponents.INodeData, stateManager: INSPECTOR.SharedUIComponents.StateManager);
        isOverlappingFrame(frame: INSPECTOR.SharedUIComponents.GraphFrame): boolean;
        getPortForPortData(portData: INSPECTOR.SharedUIComponents.IPortData): INSPECTOR.SharedUIComponents.NodePort | null;
        getPortDataForPortDataContent(data: any): INSPECTOR.SharedUIComponents.IPortData | null;
        getLinksForPortDataContent(data: any): INSPECTOR.SharedUIComponents.NodeLink[];
        getLinksForPortData(portData: INSPECTOR.SharedUIComponents.IPortData): INSPECTOR.SharedUIComponents.NodeLink[];
        private _refreshFrames;
        _refreshLinks(): void;
        refresh(): void;
        private _onDown;
        cleanAccumulation(useCeil?: boolean): void;
        private _onUp;
        private _onMove;
        renderProperties(): BABYLON.Nullable<JSX.Element>;
        _forceRebuild(source: any, propertyName: string, notifiers?: BABYLON.IEditablePropertyOption["notifiers"]): void;
        private _isCollapsed;
        /**
         * Collapse the node
         */
        collapse(): void;
        /**
         * Expand the node
         */
        expand(): void;
        appendVisual(root: HTMLDivElement, owner: INSPECTOR.SharedUIComponents.GraphCanvasComponent): void;
        dispose(): void;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export enum FramePortPosition {
        Top = 0,
        Middle = 1,
        Bottom = 2
    }
    export class GraphFrame {
        private readonly _collapsedWidth;
        private static _FrameCounter;
        private static _FramePortCounter;
        private _name;
        private _color;
        private _x;
        private _y;
        private _gridAlignedX;
        private _gridAlignedY;
        private _width;
        private _height;
        element: HTMLDivElement;
        private _borderElement;
        private _headerElement;
        private _headerTextElement;
        private _headerCollapseElement;
        private _headerCloseElement;
        private _headerFocusElement;
        private _commentsElement;
        private _portContainer;
        private _outputPortContainer;
        private _inputPortContainer;
        private _nodes;
        private _ownerCanvas;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _onSelectionChangedObserver;
        private _onGraphNodeRemovalObserver;
        private _onExposePortOnFrameObserver;
        private _onNodeLinkDisposedObservers;
        private _isCollapsed;
        private _frameInPorts;
        private _frameOutPorts;
        private _controlledPorts;
        private _exposedInPorts;
        private _exposedOutPorts;
        private _id;
        private _comments;
        private _frameIsResizing;
        private _resizingDirection;
        private _minFrameHeight;
        private _minFrameWidth;
        private _mouseXLimit;
        onExpandStateChanged: BABYLON.Observable<GraphFrame>;
        private readonly _closeSVG;
        private readonly _expandSVG;
        private readonly _collapseSVG;
        private readonly _focusSVG;
        get id(): number;
        get isCollapsed(): boolean;
        private _createInputPort;
        private _markFramePortPositions;
        private _createFramePorts;
        private _removePortFromExposedWithNode;
        private _removePortFromExposedWithLink;
        private _createInputPorts;
        private _createOutputPorts;
        redrawFramePorts(): void;
        set isCollapsed(value: boolean);
        get nodes(): INSPECTOR.SharedUIComponents.GraphNode[];
        get ports(): INSPECTOR.SharedUIComponents.FrameNodePort[];
        get name(): string;
        set name(value: string);
        get color(): BABYLON.Color3;
        set color(value: BABYLON.Color3);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get comments(): string;
        set comments(comments: string);
        constructor(candidate: BABYLON.Nullable<HTMLDivElement>, canvas: INSPECTOR.SharedUIComponents.GraphCanvasComponent, doNotCaptureNodes?: boolean);
        private _isFocused;
        /**
         * Enter/leave focus mode
         */
        switchFocusMode(): void;
        refresh(): void;
        addNode(node: INSPECTOR.SharedUIComponents.GraphNode): void;
        removeNode(node: INSPECTOR.SharedUIComponents.GraphNode): void;
        syncNode(node: INSPECTOR.SharedUIComponents.GraphNode): void;
        cleanAccumulation(): void;
        private _onDown;
        move(newX: number, newY: number, align?: boolean): void;
        private _onUp;
        _moveFrame(offsetX: number, offsetY: number): void;
        private _onMove;
        moveFramePortUp(nodePort: INSPECTOR.SharedUIComponents.FrameNodePort): void;
        private _movePortUp;
        moveFramePortDown(nodePort: INSPECTOR.SharedUIComponents.FrameNodePort): void;
        private _movePortDown;
        private _initResizing;
        private _cleanUpResizing;
        private _updateMinHeightWithComments;
        private _isResizingTop;
        private _isResizingRight;
        private _isResizingBottom;
        private _isResizingLeft;
        private _onRightHandlePointerDown;
        private _onRightHandlePointerMove;
        private _moveRightHandle;
        private _onRightHandlePointerUp;
        private _onBottomHandlePointerDown;
        private _onBottomHandlePointerMove;
        private _moveBottomHandle;
        private _onBottomHandlePointerUp;
        private _onLeftHandlePointerDown;
        private _onLeftHandlePointerMove;
        private _moveLeftHandle;
        private _onLeftHandlePointerUp;
        private _onTopHandlePointerDown;
        private _onTopHandlePointerMove;
        private _moveTopHandle;
        private _onTopHandlePointerUp;
        private _onTopRightHandlePointerDown;
        private _onTopRightHandlePointerMove;
        private _moveTopRightHandle;
        private _onTopRightHandlePointerUp;
        private _onBottomRightHandlePointerDown;
        private _onBottomRightHandlePointerMove;
        private _moveBottomRightHandle;
        private _onBottomRightHandlePointerUp;
        private _onBottomLeftHandlePointerDown;
        private _onBottomLeftHandlePointerMove;
        private _moveBottomLeftHandle;
        private _onBottomLeftHandlePointerUp;
        private _onTopLeftHandlePointerDown;
        private _onTopLeftHandlePointerMove;
        private _moveTopLeftHandle;
        private _onTopLeftHandlePointerUp;
        private _expandLeft;
        private _expandTop;
        private _expandRight;
        private _expandBottom;
        dispose(): void;
        private _serializePortData;
        serialize(saveCollapsedState: boolean): INSPECTOR.SharedUIComponents.IFrameData;
        export(): void;
        adjustPorts(): void;
        static Parse(serializationData: INSPECTOR.SharedUIComponents.IFrameData, canvas: INSPECTOR.SharedUIComponents.GraphCanvasComponent, map?: {
            [key: number]: number;
        }): GraphFrame;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IGraphCanvasComponentProps {
        stateManager: INSPECTOR.SharedUIComponents.StateManager;
        onEmitNewNode: (nodeData: INSPECTOR.SharedUIComponents.INodeData) => INSPECTOR.SharedUIComponents.GraphNode;
    }
    export class GraphCanvasComponent extends React.Component<IGraphCanvasComponentProps> implements INSPECTOR.SharedUIComponents.INodeContainer {
        static readonly NodeWidth = 100;
        private readonly _minZoom;
        private readonly _maxZoom;
        private _hostCanvasRef;
        private _hostCanvas;
        private _graphCanvasRef;
        private _graphCanvas;
        private _selectionContainerRef;
        private _selectionContainer;
        private _frameContainerRef;
        private _frameContainer;
        private _svgCanvasRef;
        private _svgCanvas;
        private _rootContainerRef;
        private _rootContainer;
        private _nodes;
        private _links;
        private _mouseStartPointX;
        private _mouseStartPointY;
        private _dropPointX;
        private _dropPointY;
        private _selectionStartX;
        private _selectionStartY;
        private _candidateLinkedHasMoved;
        private _x;
        private _y;
        private _zoom;
        private _selectedNodes;
        private _selectedLink;
        private _selectedPort;
        private _candidateLink;
        private _candidatePort;
        private _gridSize;
        private _selectionBox;
        private _selectedFrames;
        private _frameCandidate;
        private _frames;
        private _nodeDataContentList;
        private _altKeyIsPressed;
        private _multiKeyIsPressed;
        private _oldY;
        _frameIsMoving: boolean;
        _isLoading: boolean;
        _targetLinkCandidate: BABYLON.Nullable<INSPECTOR.SharedUIComponents.NodeLink>;
        private _copiedNodes;
        private _copiedFrames;
        get gridSize(): number;
        set gridSize(value: number);
        get stateManager(): INSPECTOR.SharedUIComponents.StateManager;
        get nodes(): INSPECTOR.SharedUIComponents.GraphNode[];
        get links(): INSPECTOR.SharedUIComponents.NodeLink[];
        get frames(): INSPECTOR.SharedUIComponents.GraphFrame[];
        get zoom(): number;
        set zoom(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get selectedNodes(): INSPECTOR.SharedUIComponents.GraphNode[];
        get selectedLink(): BABYLON.Nullable<INSPECTOR.SharedUIComponents.NodeLink>;
        get selectedFrames(): INSPECTOR.SharedUIComponents.GraphFrame[];
        get selectedPort(): BABYLON.Nullable<INSPECTOR.SharedUIComponents.NodePort>;
        get canvasContainer(): HTMLDivElement;
        get hostCanvas(): HTMLDivElement;
        get svgCanvas(): HTMLElement;
        get selectionContainer(): HTMLDivElement;
        get frameContainer(): HTMLDivElement;
        private _selectedFrameAndNodesConflict;
        constructor(props: IGraphCanvasComponentProps);
        populateConnectedEntriesBeforeRemoval(item: INSPECTOR.SharedUIComponents.GraphNode, items: INSPECTOR.SharedUIComponents.GraphNode[], inputs: BABYLON.Nullable<INSPECTOR.SharedUIComponents.IPortData>[], outputs: BABYLON.Nullable<INSPECTOR.SharedUIComponents.IPortData>[]): void;
        automaticRewire(inputs: BABYLON.Nullable<INSPECTOR.SharedUIComponents.IPortData>[], outputs: BABYLON.Nullable<INSPECTOR.SharedUIComponents.IPortData>[], firstOnly?: boolean): void;
        smartAddOverLink(node: INSPECTOR.SharedUIComponents.GraphNode, link: INSPECTOR.SharedUIComponents.NodeLink): void;
        smartAddOverNode(node: INSPECTOR.SharedUIComponents.GraphNode, source: INSPECTOR.SharedUIComponents.GraphNode): void;
        deleteSelection(onRemove: (nodeData: INSPECTOR.SharedUIComponents.INodeData) => void, autoReconnect?: boolean): void;
        handleKeyDown(evt: KeyboardEvent, onRemove: (nodeData: INSPECTOR.SharedUIComponents.INodeData) => void, mouseLocationX: number, mouseLocationY: number, dataGenerator: (nodeData: INSPECTOR.SharedUIComponents.INodeData) => any, rootElement: HTMLDivElement): void;
        pasteSelection(copiedNodes: INSPECTOR.SharedUIComponents.GraphNode[], currentX: number, currentY: number, dataGenerator: (nodeData: INSPECTOR.SharedUIComponents.INodeData) => any, selectNew?: boolean): INSPECTOR.SharedUIComponents.GraphNode[];
        reconnectNewNodes(nodeIndex: number, newNodes: INSPECTOR.SharedUIComponents.GraphNode[], sourceNodes: INSPECTOR.SharedUIComponents.GraphNode[], done: boolean[]): void;
        getCachedData(): any[];
        removeDataFromCache(data: any): void;
        createNodeFromObject(nodeData: INSPECTOR.SharedUIComponents.INodeData, onNodeCreated: (data: any) => void, recursion?: boolean): INSPECTOR.SharedUIComponents.GraphNode;
        getGridPosition(position: number, useCeil?: boolean): number;
        getGridPositionCeil(position: number): number;
        updateTransform(): void;
        onKeyUp(): void;
        findNodeFromData(data: any): INSPECTOR.SharedUIComponents.GraphNode;
        reset(): void;
        connectPorts(pointA: INSPECTOR.SharedUIComponents.IPortData, pointB: INSPECTOR.SharedUIComponents.IPortData): void;
        removeLink(link: INSPECTOR.SharedUIComponents.NodeLink): void;
        appendNode(nodeData: INSPECTOR.SharedUIComponents.INodeData): INSPECTOR.SharedUIComponents.GraphNode;
        distributeGraph(): void;
        componentDidMount(): void;
        onMove(evt: React.PointerEvent): void;
        onDown(evt: React.PointerEvent<HTMLElement>): void;
        onUp(evt: React.PointerEvent): void;
        onWheel(evt: React.WheelEvent): void;
        zoomToFit(): void;
        processCandidatePort(): void;
        connectNodes(nodeA: INSPECTOR.SharedUIComponents.GraphNode, pointA: INSPECTOR.SharedUIComponents.IPortData, nodeB: INSPECTOR.SharedUIComponents.GraphNode, pointB: INSPECTOR.SharedUIComponents.IPortData): void;
        drop(newNode: INSPECTOR.SharedUIComponents.GraphNode, targetX: number, targetY: number, offsetX: number, offsetY: number): void;
        processEditorData(editorData: INSPECTOR.SharedUIComponents.IEditorData): void;
        reOrganize(editorData?: BABYLON.Nullable<INSPECTOR.SharedUIComponents.IEditorData>, isImportingAFrame?: boolean): void;
        addFrame(frameData: INSPECTOR.SharedUIComponents.IFrameData): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class FrameNodePort extends INSPECTOR.SharedUIComponents.NodePort {
        portData: INSPECTOR.SharedUIComponents.IPortData;
        node: INSPECTOR.SharedUIComponents.GraphNode;
        private _parentFrameId;
        private _isInput;
        private _framePortPosition;
        private _framePortId;
        private _onFramePortPositionChangedObservable;
        get parentFrameId(): number;
        get onFramePortPositionChangedObservable(): BABYLON.Observable<FrameNodePort>;
        get isInput(): boolean;
        get framePortId(): number;
        get framePortPosition(): INSPECTOR.SharedUIComponents.FramePortPosition;
        set framePortPosition(position: INSPECTOR.SharedUIComponents.FramePortPosition);
        constructor(portContainer: HTMLElement, portData: INSPECTOR.SharedUIComponents.IPortData, node: INSPECTOR.SharedUIComponents.GraphNode, stateManager: INSPECTOR.SharedUIComponents.StateManager, isInput: boolean, framePortId: number, parentFrameId: number);
        static CreateFrameNodePortElement(portData: INSPECTOR.SharedUIComponents.IPortData, node: INSPECTOR.SharedUIComponents.GraphNode, root: HTMLElement, displayManager: BABYLON.Nullable<INSPECTOR.SharedUIComponents.IDisplayManager>, stateManager: INSPECTOR.SharedUIComponents.StateManager, isInput: boolean, framePortId: number, parentFrameId: number): FrameNodePort;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export class DisplayLedger {
        static RegisteredControls: {
            [key: string]: any;
        };
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Function used to force a rebuild of the node system
     * @param source source object
     * @param stateManager defines the state manager to use
     * @param propertyName name of the property that has been changed
     * @param notifiers list of notifiers to use
     */
    export function ForceRebuild(source: any, stateManager: INSPECTOR.SharedUIComponents.StateManager, propertyName: string, notifiers?: BABYLON.IEditablePropertyOption["notifiers"]): void;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export type FramePortData = {
        frame: INSPECTOR.SharedUIComponents.GraphFrame;
        port: INSPECTOR.SharedUIComponents.FrameNodePort;
    };



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface ISelectionChangedOptions {
        selection: BABYLON.Nullable<INSPECTOR.SharedUIComponents.GraphNode | INSPECTOR.SharedUIComponents.NodeLink | INSPECTOR.SharedUIComponents.GraphFrame | INSPECTOR.SharedUIComponents.NodePort | INSPECTOR.SharedUIComponents.FramePortData>;
        forceKeepSelection?: boolean;
        marqueeSelection?: boolean;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IPropertyComponentProps {
        stateManager: INSPECTOR.SharedUIComponents.StateManager;
        nodeData: INSPECTOR.SharedUIComponents.INodeData;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export enum PortDataDirection {
        /** Input */
        Input = 0,
        /** Output */
        Output = 1
    }
    export enum PortDirectValueTypes {
        Float = 0,
        Int = 1
    }
    export interface IPortDirectValueDefinition {
        /**
         * Gets the source object
         */
        source: any;
        /**
         * Gets the property name used to store the value
         */
        propertyName: string;
        /**
         * Gets or sets the min value accepted for this point if nothing is connected
         */
        valueMin: BABYLON.Nullable<any>;
        /**
         * Gets or sets the max value accepted for this point if nothing is connected
         */
        valueMax: BABYLON.Nullable<any>;
        /**
         * Gets or sets the type of the value
         */
        valueType: PortDirectValueTypes;
    }
    export interface IPortData {
        data: any;
        name: string;
        internalName: string;
        isExposedOnFrame: boolean;
        exposedPortPosition: number;
        isConnected: boolean;
        direction: PortDataDirection;
        ownerData: any;
        connectedPort: BABYLON.Nullable<IPortData>;
        needDualDirectionValidation: boolean;
        hasEndpoints: boolean;
        endpoints: BABYLON.Nullable<IPortData[]>;
        directValueDefinition?: IPortDirectValueDefinition;
        updateDisplayName: (newName: string) => void;
        canConnectTo: (port: IPortData) => boolean;
        connectTo: (port: IPortData) => void;
        disconnectFrom: (port: IPortData) => void;
        checkCompatibilityState(port: IPortData): number;
        getCompatibilityIssueMessage(issue: number, targetNode: INSPECTOR.SharedUIComponents.GraphNode, targetPort: IPortData): string;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface INodeLocationInfo {
        blockId: number;
        x: number;
        y: number;
        isCollapsed: boolean;
    }
    export interface IFrameData {
        x: number;
        y: number;
        width: number;
        height: number;
        color: number[];
        name: string;
        isCollapsed: boolean;
        blocks: number[];
        comments: string;
    }
    export interface IEditorData {
        locations: INodeLocationInfo[];
        x: number;
        y: number;
        zoom: number;
        frames?: IFrameData[];
        map?: {
            [key: number]: number;
        };
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface INodeData {
        data: any;
        name: string;
        uniqueId: number;
        isInput: boolean;
        comments: string;
        executionTime?: number;
        refreshCallback?: () => void;
        prepareHeaderIcon: (iconDiv: HTMLDivElement, img: HTMLImageElement) => void;
        getClassName: () => string;
        dispose: () => void;
        getPortByName: (name: string) => BABYLON.Nullable<INSPECTOR.SharedUIComponents.IPortData>;
        inputs: INSPECTOR.SharedUIComponents.IPortData[];
        outputs: INSPECTOR.SharedUIComponents.IPortData[];
        invisibleEndpoints?: BABYLON.Nullable<any[]>;
        isConnectedToOutput?: () => boolean;
        isActive?: boolean;
        setIsActive?: (value: boolean) => void;
        canBeActivated?: boolean;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface INodeContainer {
        nodes: INSPECTOR.SharedUIComponents.GraphNode[];
        appendNode(data: INSPECTOR.SharedUIComponents.INodeData): INSPECTOR.SharedUIComponents.GraphNode;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface VisualContentDescription {
        [key: string]: HTMLElement;
    }
    export interface IDisplayManager {
        getHeaderClass(data: INSPECTOR.SharedUIComponents.INodeData): string;
        shouldDisplayPortLabels(data: INSPECTOR.SharedUIComponents.IPortData): boolean;
        updatePreviewContent(data: INSPECTOR.SharedUIComponents.INodeData, contentArea: HTMLDivElement): void;
        updateFullVisualContent?(data: INSPECTOR.SharedUIComponents.INodeData, visualContent: VisualContentDescription): void;
        getBackgroundColor(data: INSPECTOR.SharedUIComponents.INodeData): string;
        getHeaderText(data: INSPECTOR.SharedUIComponents.INodeData): string;
        onSelectionChanged?(data: INSPECTOR.SharedUIComponents.INodeData, selectedData: BABYLON.Nullable<INSPECTOR.SharedUIComponents.INodeData>, manager: INSPECTOR.SharedUIComponents.StateManager): void;
        onDispose?(nodeData: INSPECTOR.SharedUIComponents.INodeData, manager: INSPECTOR.SharedUIComponents.StateManager): void;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IVector4LineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector4) => void;
        useEuler?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        value?: BABYLON.Vector4;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class Vector4LineComponent extends React.Component<IVector4LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector4;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector4LineComponentProps);
        getCurrentValue(): any;
        shouldComponentUpdate(nextProps: IVector4LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector4;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector4): void;
        updateVector4(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        updateStateW(value: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IVector3LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector3) => void;
        useEuler?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        noSlider?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class Vector3LineComponent extends React.Component<IVector3LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector3;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector3LineComponentProps);
        getCurrentValue(): any;
        shouldComponentUpdate(nextProps: IVector3LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector3;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector3): void;
        updateVector3(): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        updateStateZ(value: number): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IVector2LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newvalue: BABYLON.Vector2) => void;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class Vector2LineComponent extends React.Component<IVector2LineComponentProps, {
        isExpanded: boolean;
        value: BABYLON.Vector2;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: IVector2LineComponentProps);
        shouldComponentUpdate(nextProps: IVector2LineComponentProps, nextState: {
            isExpanded: boolean;
            value: BABYLON.Vector2;
        }): boolean;
        switchExpandState(): void;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector2): void;
        updateStateX(value: number): void;
        updateStateY(value: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IValueLineComponentProps {
        label: string;
        value: number;
        color?: string;
        fractionDigits?: number;
        units?: string;
        icon?: string;
        iconLabel?: string;
    }
    export class ValueLineComponent extends React.Component<IValueLineComponentProps> {
        constructor(props: IValueLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IUnitButtonProps {
        unit: string;
        locked?: boolean;
        onClick?: (unit: string) => void;
    }
    export function UnitButton(props: IUnitButtonProps): import("react/jsx-runtime").JSX.Element;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ITextLineComponentProps {
        label?: string;
        value?: string;
        color?: string;
        underline?: boolean;
        onLink?: () => void;
        url?: string;
        ignoreValue?: boolean;
        additionalClass?: string;
        icon?: string;
        iconLabel?: string;
        tooltip?: string;
    }
    export class TextLineComponent extends React.Component<ITextLineComponentProps> {
        constructor(props: ITextLineComponentProps);
        onLink(): void;
        renderContent(): import("react/jsx-runtime").JSX.Element | null;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface ITextInputLineComponentProps {
        label?: string;
        lockObject?: INSPECTOR.SharedUIComponents.LockObject;
        target?: any;
        propertyName?: string;
        value?: string;
        onChange?: (value: string) => void;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        icon?: string;
        iconLabel?: string;
        noUnderline?: boolean;
        numbersOnly?: boolean;
        delayInput?: boolean;
        arrows?: boolean;
        arrowsIncrement?: (amount: number) => void;
        step?: number;
        numeric?: boolean;
        roundValues?: boolean;
        min?: number;
        max?: number;
        placeholder?: string;
        unit?: React.ReactNode;
        validator?: (value: string) => boolean;
        multilines?: boolean;
        throttlePropertyChangedNotification?: boolean;
        throttlePropertyChangedNotificationDelay?: number;
        disabled?: boolean;
    }
    export class TextInputLineComponent extends React.Component<ITextInputLineComponentProps, {
        value: string;
        dragging: boolean;
    }> {
        private _localChange;
        constructor(props: ITextInputLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: ITextInputLineComponentProps, nextState: {
            value: string;
            dragging: boolean;
        }): boolean;
        raiseOnPropertyChanged(newValue: string, previousValue: string): void;
        getCurrentNumericValue(value: string): number;
        updateValue(value: string, valueToValidate?: string): void;
        incrementValue(amount: number): void;
        onKeyDown(event: React.KeyboardEvent): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export const conflictingValuesPlaceholder = "\u2014";
    /**
     *
     * @param targets a list of selected targets
     * @param onPropertyChangedObservable
     * @param getProperty
     * @returns a proxy object that can be passed as a target into the input
     */
    export function makeTargetsProxy<Type>(targets: Type[], onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>, getProperty?: (target: Type, property: keyof Type) => any): any;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ISliderLineComponentProps {
        label: string;
        target?: any;
        propertyName?: string;
        minimum: number;
        maximum: number;
        step: number;
        directValue?: number;
        useEuler?: boolean;
        onChange?: (value: number) => void;
        onInput?: (value: number) => void;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        decimalCount?: number;
        margin?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        unit?: React.ReactNode;
        allowOverflow?: boolean;
    }
    export class SliderLineComponent extends React.Component<ISliderLineComponentProps, {
        value: number;
    }> {
        private _localChange;
        constructor(props: ISliderLineComponentProps);
        shouldComponentUpdate(nextProps: ISliderLineComponentProps, nextState: {
            value: number;
        }): boolean;
        onChange(newValueString: any): void;
        onInput(newValueString: any): void;
        prepareDataToRead(value: number): number;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IRadioButtonLineComponentProps {
        onSelectionChangedObservable: BABYLON.Observable<RadioButtonLineComponent>;
        label: string;
        isSelected: () => boolean;
        onSelect: () => void;
        icon?: string;
        iconLabel?: string;
    }
    export class RadioButtonLineComponent extends React.Component<IRadioButtonLineComponentProps, {
        isSelected: boolean;
    }> {
        private _onSelectionChangedObserver;
        constructor(props: IRadioButtonLineComponentProps);
        componentDidMount(): void;
        componentWillUnmount(): void;
        onChange(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export var Null_Value: number;
    export interface IOptionsLineProps {
        label: string;
        target: any;
        propertyName: string;
        options: BABYLON.IInspectableOptions[];
        noDirectUpdate?: boolean;
        onSelect?: (value: number | string) => void;
        extractValue?: (target: any) => number | string;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        allowNullValue?: boolean;
        icon?: string;
        iconLabel?: string;
        className?: string;
        valuesAreStrings?: boolean;
        defaultIfNull?: number;
    }
    export class OptionsLine extends React.Component<IOptionsLineProps, {
        value: number | string;
    }> {
        private _localChange;
        private _remapValueIn;
        private _remapValueOut;
        private _getValue;
        constructor(props: IOptionsLineProps);
        shouldComponentUpdate(nextProps: IOptionsLineProps, nextState: {
            value: number;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        setValue(value: string | number): void;
        updateValue(valueString: string): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface INumericInputProps {
        label: string;
        labelTooltip?: string;
        value: number;
        step?: number;
        onChange: (value: number) => void;
        precision?: number;
        icon?: string;
        iconLabel?: string;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class NumericInput extends React.Component<INumericInputProps, {
        value: string;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: INumericInputProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: INumericInputProps, nextState: {
            value: string;
        }): boolean;
        updateValue(valueString: string): void;
        onBlur(): void;
        incrementValue(amount: number): void;
        onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IMessageLineComponentProps {
        text: string;
        color?: string;
        icon?: any;
    }
    export class MessageLineComponent extends React.Component<IMessageLineComponentProps> {
        constructor(props: IMessageLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IMatrixLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        step?: number;
        onChange?: (newValue: BABYLON.Matrix) => void;
        onModeChange?: (mode: number) => void;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        mode?: number;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class MatrixLineComponent extends React.Component<IMatrixLineComponentProps, {
        value: BABYLON.Matrix;
        mode: number;
        angle: number;
    }> {
        private _localChange;
        constructor(props: IMatrixLineComponentProps);
        shouldComponentUpdate(nextProps: IMatrixLineComponentProps, nextState: {
            value: BABYLON.Matrix;
            mode: number;
            angle: number;
        }): boolean;
        raiseOnPropertyChanged(previousValue: BABYLON.Vector3): void;
        updateMatrix(): void;
        updateRow(value: BABYLON.Vector4, row: number): void;
        updateBasedOnMode(value: number): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ILinkButtonComponentProps {
        label: string;
        buttonLabel: string;
        url?: string;
        onClick: () => void;
        icon?: any;
        onIconClick?: () => void;
    }
    export class LinkButtonComponent extends React.Component<ILinkButtonComponentProps> {
        constructor(props: ILinkButtonComponentProps);
        onLink(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ILineWithFileButtonComponentProps {
        title: string;
        closed?: boolean;
        multiple?: boolean;
        label: string;
        iconImage: any;
        onIconClick: (file: File) => void;
        accept: string;
        uploadName?: string;
    }
    export class LineWithFileButtonComponent extends React.Component<ILineWithFileButtonComponentProps, {
        isExpanded: boolean;
    }> {
        private _uploadRef;
        constructor(props: ILineWithFileButtonComponentProps);
        onChange(evt: any): void;
        switchExpandedState(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ILineContainerComponentProps {
        selection?: INSPECTOR.SharedUIComponents.ISelectedLineContainer;
        title: string;
        children: any[] | any;
        closed?: boolean;
    }
    export class LineContainerComponent extends React.Component<ILineContainerComponentProps, {
        isExpanded: boolean;
        isHighlighted: boolean;
    }> {
        constructor(props: ILineContainerComponentProps);
        switchExpandedState(): void;
        renderHeader(): import("react/jsx-runtime").JSX.Element;
        componentDidMount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IInputArrowsComponentProps {
        incrementValue: (amount: number) => void;
        setDragging: (dragging: boolean) => void;
    }
    export class InputArrowsComponent extends React.Component<IInputArrowsComponentProps> {
        private _arrowsRef;
        private _drag;
        private _releaseListener;
        private _lockChangeListener;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IIndentedTextLineComponentProps {
        value?: string;
        color?: string;
        underline?: boolean;
        onLink?: () => void;
        url?: string;
        additionalClass?: string;
    }
    export class IndentedTextLineComponent extends React.Component<IIndentedTextLineComponentProps> {
        constructor(props: IIndentedTextLineComponentProps);
        onLink(): void;
        renderContent(): import("react/jsx-runtime").JSX.Element;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IIconComponentProps {
        icon: string;
        label?: string;
    }
    export class IconComponent extends React.Component<IIconComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IIconButtonLineComponentProps {
        icon: string;
        onClick: () => void;
        tooltip: string;
        active?: boolean;
    }
    export class IconButtonLineComponent extends React.Component<IIconButtonLineComponentProps> {
        constructor(props: IIconButtonLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface ISelectedLineContainer {
        selectedLineContainerTitles: Array<string>;
        selectedLineContainerTitlesNoFocus: Array<string>;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IHexLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        lockObject?: INSPECTOR.SharedUIComponents.LockObject;
        onChange?: (newValue: number) => void;
        isInteger?: boolean;
        replaySourceReplacement?: string;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        additionalClass?: string;
        step?: string;
        digits?: number;
        useEuler?: boolean;
        min?: number;
        icon?: string;
        iconLabel?: string;
    }
    export class HexLineComponent extends React.Component<IHexLineComponentProps, {
        value: string;
    }> {
        private _localChange;
        private _store;
        private _propertyChange;
        constructor(props: IHexLineComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: IHexLineComponentProps, nextState: {
            value: string;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        convertToHexString(valueString: string): string;
        updateValue(valueString: string, raisePropertyChanged: boolean): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IFloatLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        onChange?: (newValue: number) => void;
        isInteger?: boolean;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        additionalClass?: string;
        step?: string;
        digits?: number;
        useEuler?: boolean;
        min?: number;
        max?: number;
        smallUI?: boolean;
        onEnter?: (newValue: number) => void;
        icon?: string;
        iconLabel?: string;
        defaultValue?: number;
        arrows?: boolean;
        unit?: React.ReactNode;
        onDragStart?: (newValue: number) => void;
        onDragStop?: (newValue: number) => void;
        disabled?: boolean;
    }
    export class FloatLineComponent extends React.Component<IFloatLineComponentProps, {
        value: string;
        dragging: boolean;
    }> {
        private _localChange;
        private _store;
        constructor(props: IFloatLineComponentProps);
        componentWillUnmount(): void;
        getValueString(value: any, props: IFloatLineComponentProps): string;
        shouldComponentUpdate(nextProps: IFloatLineComponentProps, nextState: {
            value: string;
            dragging: boolean;
        }): boolean;
        raiseOnPropertyChanged(newValue: number, previousValue: number): void;
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        incrementValue(amount: number, processStep?: boolean): void;
        onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IFileMultipleButtonLineComponentProps {
        label: string;
        onClick: (event: any) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileMultipleButtonLineComponent extends React.Component<IFileMultipleButtonLineComponentProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileMultipleButtonLineComponentProps);
        onChange(evt: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface IFileButtonLineProps {
        label: string;
        onClick: (file: File) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileButtonLine extends React.Component<IFileButtonLineProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileButtonLineProps);
        onChange(evt: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IDraggableLineWithButtonComponent {
        format: string;
        data: string;
        tooltip: string;
        iconImage: any;
        onIconClick: (value: string) => void;
        iconTitle: string;
        lenSuffixToRemove?: number;
    }
    export class DraggableLineWithButtonComponent extends React.Component<IDraggableLineWithButtonComponent> {
        constructor(props: IDraggableLineWithButtonComponent);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IButtonLineComponentProps {
        format: string;
        data: string;
        tooltip: string;
    }
    export class DraggableLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IColorPickerLineProps {
        value: BABYLON.Color4 | BABYLON.Color3;
        linearHint?: boolean;
        onColorChanged: (newOne: string) => void;
        icon?: string;
        iconLabel?: string;
        shouldPopRight?: boolean;
        lockObject?: INSPECTOR.SharedUIComponents.LockObject;
    }
    interface IColorPickerComponentState {
        pickerEnabled: boolean;
        color: BABYLON.Color3 | BABYLON.Color4;
        hex: string;
    }
    export class ColorPickerLine extends React.Component<IColorPickerLineProps, IColorPickerComponentState> {
        private _floatRef;
        private _floatHostRef;
        constructor(props: IColorPickerLineProps);
        syncPositions(): void;
        shouldComponentUpdate(nextProps: IColorPickerLineProps, nextState: IColorPickerComponentState): boolean;
        getHexString(props?: Readonly<IColorPickerLineProps> & Readonly<{
            children?: React.ReactNode | undefined;
        }>): string;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IColorLineProps {
        label: string;
        target?: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        disableAlpha?: boolean;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    interface IColorLineComponentState {
        isExpanded: boolean;
        color: BABYLON.Color4;
    }
    export class ColorLine extends React.Component<IColorLineProps, IColorLineComponentState> {
        constructor(props: IColorLineProps);
        shouldComponentUpdate(nextProps: IColorLineProps, nextState: IColorLineComponentState): boolean;
        getValue(props?: Readonly<IColorLineProps> & Readonly<{
            children?: React.ReactNode | undefined;
        }>): BABYLON.Color4;
        setColorFromString(colorString: string): void;
        setColor(newColor: BABYLON.Color4): void;
        switchExpandState(): void;
        updateStateR(value: number): void;
        updateStateG(value: number): void;
        updateStateB(value: number): void;
        updateStateA(value: number): void;
        private _convertToColor;
        private _toColor3;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IColor4LineComponentProps {
        label: string;
        target?: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class Color4LineComponent extends React.Component<IColor4LineComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IColor3LineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        isLinear?: boolean;
        icon?: string;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        iconLabel?: string;
        onChange?: () => void;
    }
    export class Color3LineComponent extends React.Component<IColor3LineComponentProps> {
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface ICheckBoxLineComponentProps {
        label?: string;
        target?: any;
        propertyName?: string;
        isSelected?: () => boolean;
        onSelect?: (value: boolean) => void;
        onValueChanged?: () => void;
        onPropertyChangedObservable?: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        disabled?: boolean;
        icon?: string;
        iconLabel?: string;
        faIcons?: {
            enabled: any;
            disabled: any;
        };
        large?: boolean;
    }
    export class CheckBoxLineComponent extends React.Component<ICheckBoxLineComponentProps, {
        isSelected: boolean;
        isDisabled?: boolean;
        isConflict: boolean;
    }> {
        private _localChange;
        constructor(props: ICheckBoxLineComponentProps);
        shouldComponentUpdate(nextProps: ICheckBoxLineComponentProps, nextState: {
            isSelected: boolean;
            isDisabled: boolean;
            isConflict: boolean;
        }): boolean;
        onChange(): void;
        onCopyClick(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IButtonLineComponentProps {
        label: string;
        onClick: () => void;
        icon?: string;
        iconLabel?: string;
        isDisabled?: boolean;
    }
    export class ButtonLineComponent extends React.Component<IButtonLineComponentProps> {
        constructor(props: IButtonLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IBooleanLineComponentProps {
        label: string;
        value: boolean;
        icon?: string;
        iconLabel?: string;
    }
    export class BooleanLineComponent extends React.Component<IBooleanLineComponentProps> {
        constructor(props: IBooleanLineComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export function ClassNames(names: any, styleObject: any): string;
    export function JoinClassNames(styleObject: any, ...names: string[]): string;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export type ToggleProps = {
        toggled: "on" | "mixed" | "off";
        onToggle?: () => void;
        padded?: boolean;
        color?: "dark" | "light";
    };
    export var Toggle: React.FC<ToggleProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface ITextInputProps {
        label?: string;
        placeholder?: string;
        submitValue: (newValue: string) => void;
        validateValue?: (value: string) => boolean;
        cancelSubmit?: () => void;
    }
    /**
     * This component represents a text input that can be submitted or cancelled on buttons
     * @param props properties
     * @returns TextInputWithSubmit element
     */
    export const TextInputWithSubmit: (props: ITextInputProps) => import("react/jsx-runtime").JSX.Element;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface MessageDialogProps {
        message: string;
        isError: boolean;
        onClose?: () => void;
    }
    export var MessageDialog: React.FC<MessageDialogProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export type LabelProps = {
        text: string;
        children?: React.ReactChild;
        color?: "dark" | "light";
    };
    export var Label: React.FC<LabelProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export type IconProps = {
        color?: "dark" | "light";
        icon: string;
    };
    export var Icon: React.FC<IconProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export type ButtonProps = {
        disabled?: boolean;
        active?: boolean;
        onClick?: () => void;
        color: "light" | "dark";
        size: "default" | "small" | "wide" | "smaller";
        title?: string;
        backgroundColor?: string;
    };
    export var Button: React.FC<ButtonProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * utility hook to assist using the graph context
     * @returns
     */
    export const useGraphContext: () => IGraphContext;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export type IVisualRecordsType = Record<string, {
        x: number;
        y: number;
    }>;
    export type IConnectionType = {
        id: string;
        sourceId: string;
        targetId: string;
    };
    export type ICustomDataType = {
        type: string;
        value: any;
    };
    export type INodeType = {
        id: string;
        label: string;
        customData?: ICustomDataType;
    };
    /**
     * props for the node renderer
     */
    export interface INodeRendererProps {
        /**
         * array of connections between nodes
         */
        connections: IConnectionType[];
        /**
         * function called when a new connection is created
         */
        updateConnections: (sourceId: string, targetId: string) => void;
        /**
         * function called when a connection is deleted
         */
        deleteLine: (lineId: string) => void;
        /**
         * function called when a node is deleted
         */
        deleteNode: (nodeId: string) => void;
        /**
         * array of all nodes
         */
        nodes: INodeType[];
        /**
         * id of the node to highlight
         */
        highlightedNode?: BABYLON.Nullable<string>;
        /**
         * function to be called if a node is selected
         */
        selectNode?: (nodeId: BABYLON.Nullable<string>) => void;
        /**
         * id of this renderer
         */
        id: string;
        /**
         * optional list of custom components to be rendered inside nodes of
         * a certain type
         */
        customComponents?: Record<string, React.ComponentType<any>>;
    }
    /**
     * This component is a bridge between the app logic related to the graph, and the actual rendering
     * of it. It manages the nodes' positions and selection states.
     * @param props
     * @returns
     */
    export const NodeRenderer: (props: INodeRendererProps) => import("react/jsx-runtime").JSX.Element;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IGraphContainerProps {
        onNodeMoved: (id: string, x: number, y: number) => void;
        id: string;
    }
    /**
     * This component contains all the nodes and handles their dragging
     * @param props properties
     * @returns graph node container element
     */
    export var GraphNodesContainer: React.FC<IGraphContainerProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IGraphNodeProps {
        id: string;
        name: string;
        x: number;
        y: number;
        selected?: boolean;
        width?: number;
        height?: number;
        highlighted?: boolean;
        parentContainerId: string;
    }
    export var SingleGraphNode: React.FC<IGraphNodeProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * props for the GraphLineContainer
     */
    export interface IGraphLinesContainerProps {
        /**
         * id of the container
         */
        id: string;
    }
    /**
     * this component handles the dragging of new connections
     * @param props
     * @returns
     */
    export var GraphLinesContainer: React.FC<IGraphLinesContainerProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * props for the GraphLine component
     */
    export interface IGraphLineProps {
        /**
         * id of the line. temporary lines can have no id
         */
        id?: string;
        /**
         * starting x pos of the line
         */
        x1: number;
        /**
         * ending x pos of the line
         */
        x2: number;
        /**
         * starting y pos of the line
         */
        y1: number;
        /**
         * ending y pos of the line
         */
        y2: number;
        /**
         * is the line selected
         */
        selected?: boolean;
        /**
         * does the line have a direction
         */
        directional?: boolean;
    }
    export const MarkerArrowId = "arrow";
    /**
     * This component draws a SVG line between two points, with an optional marker
     * indicating direction
     * @param props properties
     * @returns graph line element
     */
    export var GraphLine: React.FC<IGraphLineProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * this context is used to pass callbacks to the graph nodes and connections
     */
    export interface IGraphContext {
        onNodesConnected?: (sourceId: string, targetId: string) => void;
        onLineSelected?: (lineId: string) => void;
        onNodeSelected?: (nodeId: string) => void;
    }
    export var GraphContextManager: import("react").Context<IGraphContext>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IGraphContainerProps {
    }
    /**
     * This component is just a simple container to keep the nodes and lines containers
     * together
     * @param props
     * @returns
     */
    export var GraphContainer: React.FC<IGraphContainerProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Props for the connector
     */
    export interface IGraphConnectorHandlerProps {
        /**
         * id of the parent node
         */
        parentId: string;
        /**
         * x position of the parent node
         */
        parentX: number;
        /**
         * y position of the parent node
         */
        parentY: number;
        /**
         * x position of the connector relative to the parent node
         */
        offsetX?: number;
        /**
         * y position of the connector relative to the parent node
         */
        offsetY?: number;
        /**
         * width of the parent node
         */
        parentWidth: number;
        /**
         * height of the parent node
         */
        parentHeight: number;
        /**
         * id of the container where its parent node is
         */
        parentContainerId: string;
    }
    /**
     * This component is used to initiate a connection between two nodes. Simply
     * drag the handle in a node and drop it in another node to create a connection.
     * @returns connector element
     */
    export var GraphConnectorHandler: React.FC<IGraphConnectorHandlerProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * This components represents an options menu with optional
     * customizable properties. Option IDs should be unique.
     */
    export interface IOption {
        label: string;
        value: string;
        id: string;
    }
    export interface IOptionsLineComponentProps {
        options: IOption[];
        addOptionPlaceholder?: string;
        onOptionAdded?: (newOption: IOption) => void;
        onOptionSelected: (selectedOptionValue: string) => void;
        selectedOptionValue: string;
        validateNewOptionValue?: (newOptionValue: string) => boolean;
        addOptionText?: string;
    }
    export const OptionsLineComponent: (props: IOptionsLineComponentProps) => import("react/jsx-runtime").JSX.Element;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface INumericInputComponentProps {
        label: string;
        labelTooltip?: string;
        value: number;
        step?: number;
        onChange: (value: number) => void;
        precision?: number;
        icon?: string;
        iconLabel?: string;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class NumericInputComponent extends React.Component<INumericInputComponentProps, {
        value: string;
    }> {
        static defaultProps: {
            step: number;
        };
        private _localChange;
        constructor(props: INumericInputComponentProps);
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: INumericInputComponentProps, nextState: {
            value: string;
        }): boolean;
        updateValue(valueString: string): void;
        onBlur(): void;
        incrementValue(amount: number): void;
        onKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IFileButtonLineComponentProps {
        label: string;
        onClick: (file: File) => void;
        accept: string;
        icon?: string;
        iconLabel?: string;
    }
    export class FileButtonLineComponent extends React.Component<IFileButtonLineComponentProps> {
        private static _IDGenerator;
        private _id;
        private _uploadInputRef;
        constructor(props: IFileButtonLineComponentProps);
        onChange(evt: any): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IColorPickerLineComponentProps {
        value: BABYLON.Color4 | BABYLON.Color3;
        linearHint?: boolean;
        onColorChanged: (newOne: string) => void;
        icon?: string;
        iconLabel?: string;
        shouldPopRight?: boolean;
        lockObject?: INSPECTOR.SharedUIComponents.LockObject;
        backgroundColor?: string;
    }
    interface IColorPickerComponentState {
        pickerEnabled: boolean;
        color: BABYLON.Color3 | BABYLON.Color4;
        hex: string;
    }
    export class ColorPickerLineComponent extends React.Component<IColorPickerLineComponentProps, IColorPickerComponentState> {
        private _floatRef;
        private _floatHostRef;
        private _coverRef;
        constructor(props: IColorPickerLineComponentProps);
        syncPositions(): void;
        shouldComponentUpdate(nextProps: IColorPickerLineComponentProps, nextState: IColorPickerComponentState): boolean;
        getHexString(props?: Readonly<IColorPickerLineComponentProps> & Readonly<{
            children?: React.ReactNode | undefined;
        }>): string;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IColorLineComponentProps {
        label: string;
        target: any;
        propertyName: string;
        onPropertyChangedObservable: BABYLON.Observable<INSPECTOR.SharedUIComponents.PropertyChangedEvent>;
        onChange?: () => void;
        isLinear?: boolean;
        icon?: string;
        iconLabel?: string;
        disableAlpha?: boolean;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    interface IColorLineComponentState {
        isExpanded: boolean;
        color: BABYLON.Color4;
    }
    export class ColorLineComponent extends React.Component<IColorLineComponentProps, IColorLineComponentState> {
        constructor(props: IColorLineComponentProps);
        shouldComponentUpdate(nextProps: IColorLineComponentProps, nextState: IColorLineComponentState): boolean;
        getValue(props?: Readonly<IColorLineComponentProps> & Readonly<{
            children?: React.ReactNode | undefined;
        }>): BABYLON.Color4;
        setColorFromString(colorString: string): void;
        setColor(newColor: BABYLON.Color4): void;
        switchExpandState(): void;
        updateStateR(value: number): void;
        updateStateG(value: number): void;
        updateStateB(value: number): void;
        updateStateA(value: number): void;
        copyToClipboard(): void;
        private _convertToColor;
        private _toColor3;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Given a column and row number in the layout, return the corresponding column/row
     * @param layout
     * @param column
     * @param row
     * @returns
     */
    export const getPosInLayout: (layout: INSPECTOR.SharedUIComponents.Layout, column: number, row?: number) => INSPECTOR.SharedUIComponents.LayoutColumn | INSPECTOR.SharedUIComponents.LayoutTabsRow;
    /**
     * Remove a row in position row, column from the layout, and redistribute heights of remaining rows
     * @param layout
     * @param column
     * @param row
     */
    export const removeLayoutRowAndRedistributePercentages: (layout: INSPECTOR.SharedUIComponents.Layout, column: number, row: number) => void;
    /**
     * Add a percentage string to a number
     * @param p1 the percentage string
     * @param p2 the number
     * @returns the sum of the percentage string and the number
     */
    export const addPercentageStringToNumber: (p1: string, p2: number) => number;
    /**
     * Parses a percentage string into a number
     * @param p the percentage string
     * @returns the parsed number
     */
    export const parsePercentage: (p: string) => number;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export type LayoutTab = {
        /**
         * Tab id
         */
        id: string;
        /**
         * React component rendered by tab
         */
        component: React.ReactElement;
        /**
         * Tab title
         */
        title: string;
    };
    export type LayoutTabsRow = {
        /**
         * row id
         */
        id: string;
        /**
         * row height in its containing column
         */
        height: string;
        /**
         * selected tab in row
         */
        selectedTab: string;
        /**
         * list of tabs contained in row
         */
        tabs: LayoutTab[];
    };
    export type LayoutColumn = {
        /**
         * column id
         */
        id: string;
        /**
         * column width in the grid
         */
        width: string;
        /**
         * column rows
         */
        rows: LayoutTabsRow[];
    };
    export type Layout = {
        /**
         * layout columns
         */
        columns?: LayoutColumn[];
    };
    export type TabDrag = {
        /**
         * row number of the tab being dragged
         */
        rowNumber: number;
        /**
         * column number of the tab being dragged
         */
        columnNumber: number;
        /**
         * the tabs being dragged
         */
        tabs: {
            /**
             * id of tab being dragged
             */
            id: string;
        }[];
    };
    export enum ElementTypes {
        RESIZE_BAR = "0",
        TAB = "1",
        TAB_GROUP = "2",
        NONE = "2"
    }
    export enum ResizeDirections {
        ROW = "row",
        COLUMN = "column"
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export var LayoutContext: import("react").Context<{
        /**
         * The layout object
         */
        layout: INSPECTOR.SharedUIComponents.Layout;
        /**
         * Function to set the layout object in the context
         */
        setLayout: (layout: INSPECTOR.SharedUIComponents.Layout) => void;
    }>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Arguments for the TabsContainer component.
     */
    export interface IFlexibleTabsContainerProps {
        /**
         * The tabs to display
         */
        tabs: INSPECTOR.SharedUIComponents.LayoutTab[];
        /**
         * Row index of component in layout
         */
        rowIndex: number;
        /**
         * Column index of component in layout
         */
        columnIndex: number;
        /**
         * Which tab is selected in the layout
         */
        selectedTab?: string;
    }
    /**
     * This component contains a set of tabs of which only one is visible at a time.
     * The tabs can also be dragged from and to different containers.
     * @param props properties
     * @returns tabs container element
     */
    export var FlexibleTabsContainer: React.FC<IFlexibleTabsContainerProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Arguments for the FlexibleTab component.
     */
    export interface IFlexibleTabProps {
        /**
         * The tab's title.
         */
        title: string;
        /**
         * If the tab is currently selected or not
         */
        selected: boolean;
        /**
         * What happens when the user clicks on the tab
         */
        onClick: () => void;
        /**
         * The object that will be sent to the drag event
         */
        item: INSPECTOR.SharedUIComponents.TabDrag;
        /**
         * What happens when the user drops another tab after this one
         */
        onTabDroppedAction: (item: INSPECTOR.SharedUIComponents.TabDrag) => void;
    }
    /**
     * A component that renders a tab that the user can click
     * to activate or drag to reorder. It also listens for
     * drop events if the user wants to drop another tab
     * after it.
     * @param props properties
     * @returns FlexibleTab element
     */
    export var FlexibleTab: React.FC<IFlexibleTabProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Arguments for the ResizeBar component.
     */
    export interface IFlexibleRowResizerProps {
        /**
         * Row number of the component that is being resized
         */
        rowNumber: number;
        /**
         * Column number of the component being resized
         */
        columnNumber: number;
        /**
         * If the resizing happens in row or column direction
         */
        direction: INSPECTOR.SharedUIComponents.ResizeDirections;
    }
    /**
     * The item that will be sent to the drag event
     */
    export type ResizeItem = {
        /**
         * If the resizing happens in row or column direction
         */
        direction: INSPECTOR.SharedUIComponents.ResizeDirections;
        /**
         * The row number of the component that is being resized
         */
        rowNumber: number;
        /**
         * the column number of the component being resized
         */
        columnNumber: number;
    };
    /**
     * A component that renders a bar that the user can drag to resize.
     * @param props properties
     * @returns resize bar element
     */
    export var FlexibleResizeBar: React.FC<IFlexibleRowResizerProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Arguments for the INSPECTOR.SharedUIComponents.Layout component.
     */
    export interface IFlexibleGridLayoutProps {
        /**
         * A definition of the layout which can be changed by the user
         */
        layoutDefinition: INSPECTOR.SharedUIComponents.Layout;
    }
    /**
     * This component represents a grid layout that can be resized and rearranged
     * by the user.
     * @param props properties
     * @returns layout element
     */
    export var FlexibleGridLayout: React.FC<IFlexibleGridLayoutProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Arguments for the GridContainer component.
     */
    export interface IFlexibleGridContainerProps {
    }
    /**
     * Component responsible for mapping the layout to the actual components
     * @returns GridContainer element
     */
    export var FlexibleGridContainer: React.FC<IFlexibleGridContainerProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Arguments for the FlexibleDropZone component.
     */
    export interface IFlexibleDropZoneProps {
        /**
         * The row number of the component in the layout
         */
        rowNumber: number;
        /**
         * The column number of the component in the layout
         */
        columnNumber: number;
    }
    /**
     * This component contains the drag and drop zone for the resize bars that
     * allow redefining width and height of layout elements
     * @param props properties
     * @returns drop zone element
     */
    export var FlexibleDropZone: React.FC<IFlexibleDropZoneProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Arguments for the DragHandler component.
     */
    export interface IFlexibleDragHandlerProps {
        /**
         * The size of the containing element. Used to calculate the percentage of
         * space occupied by the component
         */
        containerSize: {
            width: number;
            height: number;
        };
    }
    /**
     * This component receives the drop events and updates the layout accordingly
     * @param props properties
     * @returns DragHandler element
     */
    export var FlexibleDragHandler: React.FC<IFlexibleDragHandlerProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Arguments for the Column component.
     */
    export interface IFlexibleColumnProps {
        /**
         * Width of column
         */
        width: string;
    }
    /**
     * This component represents a single column in the layout. It receives a width
     * that it occupies and the content to display
     * @param props
     * @returns
     */
    export var FlexibleColumn: React.FC<IFlexibleColumnProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Arguments for the DraggableIcon component.
     */
    export interface IDraggableIconProps {
        /**
         * Icon source
         */
        src: string;
        /**
         * Object that will be passed to the drag event
         */
        item: INSPECTOR.SharedUIComponents.TabDrag;
        /**
         * Type of drag event
         */
        type: INSPECTOR.SharedUIComponents.ElementTypes;
    }
    /**
     * An icon that can be dragged by the user
     * @param props properties
     * @returns draggable icon element
     */
    export var DraggableIcon: React.FC<IDraggableIconProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IHexColorProps {
        value: string;
        expectedLength: number;
        onChange: (value: string) => void;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class HexColorComponent extends React.Component<IHexColorProps, {
        hex: string;
    }> {
        constructor(props: IHexColorProps);
        shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
            hex: string;
        }): boolean;
        lock(): void;
        unlock(): void;
        updateHexValue(valueString: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerComponentProps {
        color: BABYLON.Color3 | BABYLON.Color4;
        linearhint?: boolean;
        debugMode?: boolean;
        onColorChanged?: (color: BABYLON.Color3 | BABYLON.Color4) => void;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
        backgroundColor?: string;
    }
    /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerState {
        color: BABYLON.Color3;
        alpha: number;
    }
    /**
     * Class used to create a color picker
     */
    export class ColorPickerComponent extends React.Component<IColorPickerComponentProps, IColorPickerState> {
        private _saturationRef;
        private _hueRef;
        private _isSaturationPointerDown;
        private _isHuePointerDown;
        constructor(props: IColorPickerComponentProps);
        shouldComponentUpdate(nextProps: IColorPickerComponentProps, nextState: IColorPickerState): boolean;
        onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        private _evaluateSaturation;
        private _evaluateHue;
        componentDidUpdate(): void;
        raiseOnColorChanged(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IColorComponentEntryProps {
        value: number;
        label: string;
        max?: number;
        min?: number;
        onChange: (value: number) => void;
        disabled?: boolean;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class ColorComponentComponentEntry extends React.Component<IColorComponentEntryProps> {
        constructor(props: IColorComponentEntryProps);
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        interface ICommandDropdownComponentProps {
        icon?: string;
        tooltip: string;
        defaultValue?: string;
        items: {
            label: string;
            icon?: string;
            fileButton?: boolean;
            onClick?: () => void;
            onCheck?: (value: boolean) => void;
            storeKey?: string;
            isActive?: boolean;
            defaultValue?: boolean | string;
            subItems?: string[];
        }[];
        toRight?: boolean;
    }
    export class CommandDropdownComponent extends React.Component<ICommandDropdownComponentProps, {
        isExpanded: boolean;
        activeState: string;
    }> {
        constructor(props: ICommandDropdownComponentProps);
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface ICommandButtonComponentProps {
        tooltip: string;
        shortcut?: string;
        icon: string;
        iconLabel?: string;
        isActive: boolean;
        onClick: () => void;
        disabled?: boolean;
    }
    export var CommandButtonComponent: React.FC<ICommandButtonComponentProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface ICommandBarComponentProps {
        onSaveButtonClicked?: () => void;
        onSaveToSnippetButtonClicked?: () => void;
        onLoadFromSnippetButtonClicked?: () => void;
        onHelpButtonClicked?: () => void;
        onGiveFeedbackButtonClicked?: () => void;
        onSelectButtonClicked?: () => void;
        onPanButtonClicked?: () => void;
        onZoomButtonClicked?: () => void;
        onFitButtonClicked?: () => void;
        onArtboardColorChanged?: (newColor: string) => void;
        artboardColor?: string;
        artboardColorPickerColor?: string;
    }
    export var CommandBarComponent: React.FC<ICommandBarComponentProps>;



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IHexColorProps {
        value: string;
        expectedLength: number;
        onChange: (value: string) => void;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class HexColor extends React.Component<IHexColorProps, {
        hex: string;
    }> {
        constructor(props: IHexColorProps);
        shouldComponentUpdate(nextProps: IHexColorProps, nextState: {
            hex: string;
        }): boolean;
        lock(): void;
        unlock(): void;
        updateHexValue(valueString: string): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerProps {
        color: BABYLON.Color3 | BABYLON.Color4;
        linearhint?: boolean;
        debugMode?: boolean;
        onColorChanged?: (color: BABYLON.Color3 | BABYLON.Color4) => void;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    /**
     * Interface used to specify creation options for color picker
     */
    export interface IColorPickerState {
        color: BABYLON.Color3;
        alpha: number;
    }
    /**
     * Class used to create a color picker
     */
    export class ColorPicker extends React.Component<IColorPickerProps, IColorPickerState> {
        private _saturationRef;
        private _hueRef;
        private _isSaturationPointerDown;
        private _isHuePointerDown;
        constructor(props: IColorPickerProps);
        shouldComponentUpdate(nextProps: IColorPickerProps, nextState: IColorPickerState): boolean;
        onSaturationPointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onSaturationPointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerDown(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerUp(evt: React.PointerEvent<HTMLDivElement>): void;
        onHuePointerMove(evt: React.PointerEvent<HTMLDivElement>): void;
        private _evaluateSaturation;
        private _evaluateHue;
        componentDidUpdate(): void;
        raiseOnColorChanged(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}
declare module INSPECTOR.SharedUIComponents {
        export interface IColorComponentEntryProps {
        value: number;
        label: string;
        max?: number;
        min?: number;
        onChange: (value: number) => void;
        disabled?: boolean;
        lockObject: INSPECTOR.SharedUIComponents.LockObject;
    }
    export class ColorComponentEntry extends React.Component<IColorComponentEntryProps> {
        constructor(props: IColorComponentEntryProps);
        updateValue(valueString: string): void;
        lock(): void;
        unlock(): void;
        render(): import("react/jsx-runtime").JSX.Element;
    }



}
declare module INSPECTOR {


}


                