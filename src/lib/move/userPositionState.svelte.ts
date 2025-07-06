import type { IObject } from "../object/IObject";
import { objectState } from "../objectState/objectState.svelte";
import { Utils } from "../utils/utils";

export interface IUserPositionState {
    minZoom: number;
    maxZoom: number;
    translateX: number;
    translateY: number;
    zoom: number;
    zoomStep: number;
    isDragging: boolean;
    dragStartX: number;
    dragStartY: number;
    initialX: number;
    initialY: number;
}

const userPositionState: IUserPositionState = $state({
    minZoom: 0.3,
    maxZoom: 5,
    translateX: 0,
    translateY: 0,
    zoom: 1,
    zoomStep: 0.15,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    initialX: 0,
    initialY: 0,
});

const creatingObjectState = $state({
    dragStartX: 0,
    dragStartY: 0,
    width: 0,
    height: 0,
    isCreating: false,
});

const clearObjectState = () => {
    creatingObjectState.dragStartX = 0;
    creatingObjectState.dragStartY = 0;
    creatingObjectState.width = 0;
    creatingObjectState.height = 0;
    creatingObjectState.isCreating = false;
};



export const userMove = {
    state: userPositionState,
    creatingObjectState: creatingObjectState,

    handleMoveStart(event: PointerEvent) {
        if (event.button !== 0) return; // Only handle left mouse button
        userPositionState.isDragging = true;
        userPositionState.initialX = userPositionState.translateX;
        userPositionState.initialY = userPositionState.translateY;
        userPositionState.dragStartX = event.clientX;
        userPositionState.dragStartY = event.clientY;
    },

    handleCreateObjectStart(event: PointerEvent, objectType: string = "rectangle") {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        creatingObjectState.dragStartX = (offsetX - userMove.state.translateX) / userMove.state.zoom;
        creatingObjectState.dragStartY = (offsetY - userMove.state.translateY) / userMove.state.zoom;
        creatingObjectState.isCreating = true;
    },

    handleCreateObjectMove(event: PointerEvent) {
        if (!creatingObjectState.isCreating) return;
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        const x = (offsetX - userMove.state.translateX) / userMove.state.zoom;
        const y = (offsetY - userMove.state.translateY) / userMove.state.zoom;

        creatingObjectState.width = x - creatingObjectState.dragStartX;
        creatingObjectState.height = y - creatingObjectState.dragStartY;
    },

    handlePointerMove(event: PointerEvent) {
        if (!userPositionState.isDragging) return;
        const dx = event.clientX - userPositionState.dragStartX;
        const dy = event.clientY - userPositionState.dragStartY;
        userPositionState.translateX = userPositionState.initialX + dx;
        userPositionState.translateY = userPositionState.initialY + dy;
    },

    handleMoveEnd() {
        userPositionState.isDragging = false;
    },

    handleCreateObjectEnd() {
        if (!creatingObjectState.isCreating) return;

        const newObject: IObject = {
            id: crypto.randomUUID(),
            name: "New Object",
            type: "rectangle",
            position: {
                x: creatingObjectState.dragStartX,
                y: creatingObjectState.dragStartY,
            },
            size: {
                width: creatingObjectState.width,
                height: creatingObjectState.height,
            },
        };

        objectState.addObject(newObject);
        clearObjectState();
    },

    handleZoom(event: WheelEvent) {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const prevZoom = userPositionState.zoom;

        if (event.deltaY < 0) {
            userPositionState.zoom = Utils.clip(
                userPositionState.minZoom,
                userPositionState.maxZoom,
                userPositionState.zoom * (1 + userPositionState.zoomStep)
            );
        } else {
            userPositionState.zoom = Utils.clip(
                userPositionState.minZoom,
                userPositionState.maxZoom,
                userPositionState.zoom * (1 - userPositionState.zoomStep)
            );
        }

        const zoomFactor = userPositionState.zoom / prevZoom;
        userPositionState.translateX =
            offsetX - (offsetX - userPositionState.translateX) * zoomFactor;
        userPositionState.translateY =
            offsetY - (offsetY - userPositionState.translateY) * zoomFactor;
    },

    handleScroll(event: WheelEvent) {
        event.preventDefault();
        if (event.ctrlKey || event.metaKey) {
            this.handleZoom(event);
            return;
        }
        if (event.shiftKey) {
            userPositionState.translateX -= event.deltaY;
            return
        }

        userPositionState.translateY -= event.deltaY;


    },
}