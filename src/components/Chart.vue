<template lang="html">
  <div class="chart">
    <svg class="beat prelude" :class="{ highlight: currentBeat === 0 }"></svg>
    <svg class="beat prelude" :class="{ highlight: currentBeat === 1 }"></svg>
    <svg
      v-for="(beat, i) in beats"
      :key="i"
      class="beat"
      :class="{ highlight: currentBeat === i + 2 }"
      viewBox="-1 -1 2 2"
    >
      <text x="0" y="0" dy="0.1">{{ i + 1 }}</text>
      <template v-for="note in beat">
        <circle
          v-if="note.type === 'n'"
          :key="note.id"
          :class="{ [note.hand]: true }"
          :cx="note.position[0]"
          :cy="note.position[1]"
          r="0.2"
        ></circle>
        <path
          v-if="note.type === 'h' && i < note.end"
          :key="note.id"
          :class="{ [note.hand]: true }"
          :d="diamond(note.position, 0.2)"
        ></path>
      </template>
    </svg>
  </div>
</template>

<script>
import { diamond } from "@/geometry";

export default {
  props: {
    beats: {
      type: Array,
      required: true
    },
    currentBeat: {
      type: Number,
      default: null
    }
  },
  methods: {
    diamond
  }
};
</script>

<style lang="scss" scoped>
.chart {
  margin: 0.25em;
}
.beat {
  width: 50px;
  height: 50px;
  background-color: rgb(222, 221, 228);
  margin: 0.25em;

  box-shadow: rgb(43, 43, 43) 1px 1px 3px 1px;

  text {
    text-anchor: middle;
    alignment-baseline: middle;
    font: bold 1px "Roboto", sans-serif;
    fill: rgb(188, 188, 198);
  }

  &.prelude {
    opacity: 0.25;
  }

  &.highlight {
    transform: translate(-1px, -2px);
    box-shadow: rgb(43, 43, 43) 2px 3px 5px 2px;

    text {
      fill: rgb(164, 164, 219);
    }
  }

  &:not(:first-child) {
    border-left: none;
  }
}
.R {
  fill: rgb(236, 102, 17);
}
.L {
  fill: rgb(21, 161, 221);
}
</style>
