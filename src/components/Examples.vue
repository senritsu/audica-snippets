<template lang="html">
  <div class="examples">
    <button @click="$emit('input', 'xR Lx xx LR')">Example 1 (basics)</button>
    <button @click="$emit('input', 'L26R22 L36R32 R83x R86x')">
      Example 2 (positions)
    </button>
    <button @click="$emit('input', 'xRh5 Lx Lx Lh2x')">
      Example 3 (holds)
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.examples {
  display: flex;
  flex-direction: column;
  width: 200px;

  button {
    height: 25px;
    margin: 0.25em;
    border-radius: 2px;
    border: none;
    font: 1em sans-serif;
    font-weight: 100;
    color: whitesmoke;
    box-shadow: rgb(43, 43, 43) 1px 2px 3px 1px;
    background-color: rgb(190, 82, 22);
    cursor: pointer;

    transition: background-color 0.2s;

    &:hover {
      background-color: rgb(230, 98, 25);
    }
  }
}
</style>
