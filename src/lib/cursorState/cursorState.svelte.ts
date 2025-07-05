
export type State = "hand" | "select" | "create";

interface ICursorState {
    current: State;
}

export const cursorState: ICursorState = $state(
    {
        current: "select",

    }
) 