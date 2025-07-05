<script lang="ts">
  import ToolBar from "./ToolBar.svelte";
  import { cursorState, type State } from "./cursorState/cursorState.svelte";
  import { userMove } from "./move/userPositionState.svelte";
  import type { IObject } from "./object/IObject";
  import Square from "./object/Square.svelte";
  import { objectState } from "./objectState/objectState.svelte";

  let { children, objects } = $props<{
    children?: () => any;
    objects?: IObject[];
  }>();

  function handlePointerDown(event: PointerEvent) {
    if (cursorState.current === "hand") {
      userMove.handlePointerDown(event);
    }
    if (cursorState.current === "create") {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const newObject: IObject = {
        id: crypto.randomUUID(),
        name: "New Object",
        type: "rectangle",
        position: {
          x: (offsetX - userMove.state.translateX) / userMove.state.zoom,
          y: (offsetY - userMove.state.translateY) / userMove.state.zoom,
        },
        size: { width: 100, height: 100 },
      };

      console.log(userMove.state);

      objectState.addObject(newObject);
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

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Escape") {
      cursorState.current = "select";
    }
    if (event.key === "h") {
      cursorState.current = "hand";
    }
    if (event.key === "v") {
      cursorState.current = "select";
    }
    if (event.key === "r") {
      cursorState.current = "create";
    }
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
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <article
    onwheel={handleScroll}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerUp}
    onpointerleave={handlePointerUp}
    onkeypress={handleKeyPress}
    tabindex="0"
    class:grab={cursorState.current == "hand"}
    class:select={cursorState.current == "select"}
    class:create={cursorState.current == "create"}
    style={backgroundImageStyle}
    class:noTransition={userMove.state.isDragging}
  >
    <section
      style={userPositionStyle}
      class:noTransition={userMove.state.isDragging}
    >
      {#each objectState.objects as object (object.id)}
        <Square {object} />
      {/each}
      {#if children}
        {@render children()}
      {/if}
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
    overflow: hidden;
  }

  .noTransition {
    transition: none !important;
  }

  .grab {
    cursor: grab;
    user-select: none;
  }
  .grab.noTransition {
    cursor: grabbing;
  }
  .select {
    cursor: default;
  }
  .create {
    cursor: crosshair;
  }
</style>
