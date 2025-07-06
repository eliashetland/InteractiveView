<script lang="ts">
  import { objectState } from "../objectState/objectState.svelte";
  import ObjectComponent from "../object/ObjectComponent.svelte";
  import { userMove } from "../move/userPositionState.svelte";
  import { cursorState } from "../cursorState/cursorState.svelte";

  const object = $derived(
    objectState.objects.find((obj) => obj.id === objectState.currentSelected)
  );
</script>

<div>
  <h2>Object</h2>
  {#if object}
    <input type="text" bind:value={object.name} placeholder="Object Name" />

    <button
      onclick={() => {
        objectState.removeObject(object.id);
        objectState.currentSelected = null;
      }}
    >
      Delete Object
    </button>

    <ul>
      <!-- <li>ID: {object.id}</li> -->
      <li>Type: {object.type}</li>
      <li>Position: ({object.position.x}, {object.position.y})</li>
      <li>Size: ({object.size.width}, {object.size.height})</li>
    </ul>
  {:else}
    <p>No object selected</p>
  {/if}
</div>

<style>
  div {
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    background-color: var(--color-background, #70c5c6);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  h2 {
    margin: 0;
    font-size: 1.5em;
    color: var(--color-text, #333);
  }
</style>
