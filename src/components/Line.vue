<template lang="html">
  <svg :viewBox="viewBox">
    <g></g>
  </svg>
</template>

<script>
export default {
  props: {
    leftPosition: {
      type: Array,
      required: true
    },
    rightPosition: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
