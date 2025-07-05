<script lang="ts">
  import InteractiveView from "./lib/InteractiveView.svelte";
  import type { IObject } from "./lib/object/IObject";
  import { objectState } from "./lib/objectState/objectState.svelte";
</script>

<main>
  <div>
    <InteractiveView />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  div {
    width: 80%;
    height: 80%;
    max-width: 800px;
  }
</style>
