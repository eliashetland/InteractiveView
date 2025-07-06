<script lang="ts">
  import InteractiveView from "./lib/InteractiveView.svelte";
  import type { IObject } from "./lib/object/IObject";
  import { objectState } from "./lib/objectState/objectState.svelte";
  import Sidebar from "./lib/sidebar/Sidebar.svelte";
</script>

<main>
  <div>
    <InteractiveView />
    <aside>
      <Sidebar />
    </aside>
  </div>
</main>

<style>
  main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  div {
    width: 80%;
    height: 80%;
    gap: 20px;
    display: grid;
    grid-template-columns: 6fr 2fr;
  }

  aside {
    height: 100%;
  }
</style>
