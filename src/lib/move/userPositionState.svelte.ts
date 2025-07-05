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
    minZoom: 0.1,
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

export const userMove = {
    state: userPositionState,

    handlePointerDown(event: PointerEvent) {
        userPositionState.isDragging = true;
        userPositionState.initialX = userPositionState.translateX;
        userPositionState.initialY = userPositionState.translateY;
        userPositionState.dragStartX = event.clientX;
        userPositionState.dragStartY = event.clientY;
    },

    handlePointerMove(event: PointerEvent) {
        if (!userPositionState.isDragging) return;
        const dx = event.clientX - userPositionState.dragStartX;
        const dy = event.clientY - userPositionState.dragStartY;
        userPositionState.translateX = userPositionState.initialX + dx;
        userPositionState.translateY = userPositionState.initialY + dy;
    },

    handlePointerUp() {
        userPositionState.isDragging = false;
    },

    handleScroll(event: WheelEvent) {
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
}