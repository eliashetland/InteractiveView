<script lang="ts">
  import InteractiveView from "./lib/InteractiveView.svelte";
</script>

<main>
  <div>
    <InteractiveView>
      <h1 >Welcome to the Interactive View!</h1>
      <p>This is a simple interactive component built with Svelte.</p>
    </InteractiveView>
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
  h1 {
    font-size: 2rem;
    color: #333;
    background-color: cadetblue;
  }
</style>
