<script lang="ts">
  import ToolBar from "./ToolBar.svelte";
  import { cursorState, type State } from "./cursorState/cursorState.svelte";
  import { userMove } from "./move/userPositionState.svelte";
  import ObjectComponent from "./object/ObjectComponent.svelte";
  import Square from "./object/ObjectComponent.svelte";
  import { objectState } from "./objectState/objectState.svelte";

  function handlePointerDown(event: PointerEvent) {
    if (cursorState.current === "hand") {
      userMove.handleMoveStart(event);
    }
    if (cursorState.current === "create") {
      userMove.handleCreateObjectStart(event);
    }
  }

  function handlePointerMove(event: PointerEvent) {
    if (cursorState.current === "hand") {
      userMove.handlePointerMove(event);
    }
    if (cursorState.current === "create") {
      userMove.handleCreateObjectMove(event);
    }
  }

  function handlePointerUp() {
    if (cursorState.current === "hand") {
      userMove.handleMoveEnd();
    }
    if (cursorState.current === "create") {
      userMove.handleCreateObjectEnd();
    }
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
        objectState.currentObjectType = "rectangle";
    }
    if (event.key === "c") {
        cursorState.current = "create";
        objectState.currentObjectType = "circle";
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
        <ObjectComponent {object} />
      {/each}

      {#if userMove.creatingObjectState.isCreating}
        <ObjectComponent
          creating
          object={{
            id: "-1",
            name: "",
            type: objectState.currentObjectType,
            position: {
              x: userMove.creatingObjectState.drawRectStartX,
              y: userMove.creatingObjectState.drawRectStartY,
            },

            size: {
              width: userMove.creatingObjectState.width,
              height: userMove.creatingObjectState.height,
            },
          }}
        />
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
touch-action: none;
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
    user-select: none;
  }
</style>
