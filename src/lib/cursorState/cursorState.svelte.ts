
export type State = "hand" | "select";

interface ICursorState {
    current: State;
}

export const cursorState: ICursorState = $state(
    {
        current: "select",

    }
) 