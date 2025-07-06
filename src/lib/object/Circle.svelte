<script lang="ts">
  import type { IObject } from "./IObject";
  import { objectState } from "../objectState/objectState.svelte";
  import type { IObjectProps } from "./ObjectComponent.svelte";
  import { cursorState } from "../cursorState/cursorState.svelte";

  let { object, creating }: IObjectProps = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="square"
  class:creating
  class:selected={object.id === objectState.currentSelected}
  onclick={() => {
    if (cursorState.current !== "select") return;
    objectState.currentSelected = object.id;
  }}
  style="left: {object.position.x}px; top: {object.position.y}px; width: {object
    .size.width}px; height: {object.size.height}px;"
>
  <span class="name">{object.name}</span>
  <span class="type">{object.type}</span>
</div>

<style>
  .square {
    position: absolute;
    border: 2px solid var(--color-border, #787878);
    background-color: var(--color-background, #f9f9f9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  .square.selected {
    background-color: var(--color-selected-background, #e0f7fa);
    border-color: var(--color-selected-border, #00bcd4);
  }

  .name,
  .type {
    margin: 0;
    padding: 2px;
    font-size: 14px;
    color: var(--color-text, #333);
  }

  .creating {
    border: 2px dashed #2f73b7;
    background-color: rgba(105, 190, 205, 0.375);
  }
</style>
