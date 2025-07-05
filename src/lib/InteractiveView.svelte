<script lang="ts">
  import ToolBar from "./ToolBar.svelte";

  let { children } = $props<{
    children: () => any;
  }>();

  import { cursorState, type State } from "./cursorState/cursorState.svelte";
  import { userMove } from "./move/userPositionState.svelte";

  function handlePointerDown(event: PointerEvent) {
    if (cursorState.current === "hand") {
      userMove.handlePointerDown(event);
    }
  }

  function handlePointerMove(event: PointerEvent) {
    if (cursorState.current === "hand") {
      userMove.handlePointerMove(event);
    }
  }

  function handlePointerUp() {
    userMove.handlePointerUp();
  }

  function handleScroll(event: WheelEvent) {
    userMove.handleScroll(event);
  }

  let backgroundImageStyle = $derived(
    `
  background-size: ${userMove.state.zoom * 40}px ${userMove.state.zoom * 40}px;
  background-position: ${userMove.state.translateX}px ${userMove.state.translateY}px;
  background-repeat: repeat;
  `
  );

  let userPositionStyle = $derived(
    `transform: 
    translate(${userMove.state.translateX}px, ${userMove.state.translateY}px) 
    scale(${userMove.state.zoom});
    
    
    `
  );
</script>

<div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <article
    onwheel={handleScroll}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerUp}
    onpointerleave={handlePointerUp}
    tabindex="0"
    class:grab={cursorState.current == "hand"}
    class:select={cursorState.current == "select"}
    style={backgroundImageStyle}
    class:noTransition={userMove.state.isDragging}
  >
    <section
      style={userPositionStyle}
      class:noTransition={userMove.state.isDragging}
    >
      {@render children()}
    </section>
  </article>

  <ToolBar />
</div>

<style>
  div {
    border: 2px solid rgb(208, 205, 205);
    border-radius: 10px;
    background-color: white;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr auto;
  }

  section {
    transform-origin: 0 0;
    transition: transform 0.15s ease-in-out;
  }

  article {
    transition: background 0.15s ease-in-out;
    background: radial-gradient(#a1a1a1 1px, transparent 1px);
    padding: 20px;
    overflow: hidden;
    overflow: hidden;
  }

  .noTransition {
    transition: none !important;
  }

  .grab {
    cursor: grab;
    user-select: none;
  }
  .select {
    cursor: default;
  }
</style>
