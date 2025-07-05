
export type State = "move" | "select" | "grab";

interface ICursorState {
    current: State;
}

export const cursorState: ICursorState = $state(
    {
        current: "select",

    }
) 