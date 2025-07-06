import type { ObjectType } from "../object/IObject";

export type State = "hand" | "select" | "create";

interface ICursorState {
    current: State;
    currentObject: ObjectType;
}



export const cursorState: ICursorState = $state(
    {
        current: "select",
        currentObject: "rectangle",

    }
) 