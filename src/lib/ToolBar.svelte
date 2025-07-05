<script lang="ts">
  import { Hand, MousePointer2, Move } from "@lucide/svelte";
  import { cursorState, type State } from "./cursorState/cursorState.svelte";

    let current: State = cursorState.current;
</script>

<nav>
  <p>
    Current Tool: <strong>{cursorState.current}</strong>
  </p>
  <button
    class="button"
    onclick={() => (cursorState.current = "select")}
    aria-current={cursorState.current === "select" ? "true" : "false"}
  >
    <MousePointer2 />
  </button>
  <button
    class="button"
    onclick={() => (cursorState.current = "hand")}
    aria-current={cursorState.current === "hand" ? "true" : "false"}
  >
    <Hand />
  </button>
</nav>

<style>
  nav {
    background-color: rebeccapurple;
    display: flex;
    gap: 10px;
    padding: 10px;
    justify-content: end;
  }

  button {
    background-color: white;
    color: rebeccapurple;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button[aria-current="true"] {
    background-color: hotpink;
    color: white;
  }

  p {
    color: white;
    margin: 0;
    font-size: 1.2em;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
  }
</style>
