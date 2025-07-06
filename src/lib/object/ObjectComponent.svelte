<script lang="ts">
  import Circle from "./Circle.svelte";
  import type { IObject, ObjectType } from "./IObject";
  import Rectangle from "./Rectangle.svelte";

  export interface IObjectProps {
    object: IObject;
    creating?: boolean;
  }

  let { object, creating }: IObjectProps = $props();

  type objectComponents = {
    [key in ObjectType]: any;
  };

  const objects: objectComponents = {
    circle: Circle,
    rectangle: Rectangle, // Assuming you have a Rectangle component similar to Circle
  };

  const Component = objects[object.type];
</script>

{#if Component}
  <Component {object} {creating} />
{/if}
