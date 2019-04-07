<template lang="html">
  <div class="chart">
    <svg
      v-for="(beat, i) in beats"
      :key="i"
      class="beat"
      :class="{ highlight: currentBeat === i }"
      viewBox="-1 -1 2 2"
    >
      <template v-for="note in beat">
        <circle
          v-if="note.type === 'n'"
          :key="note.id"
          :class="{[note.hand]: true}"
          :cx="note.position[0]"
          :cy="note.position[1]"
          r="0.2"
        ></circle>
        <path
          v-if="note.type === 'h'"
          :key="note.id"
          :class="{[note.hand]: true}"
          :d="diamond(note.position, 0.2)"
        ></path>
      </template>
    </svg>
  </div>
</template>

<script>
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
    diamond(center, radius) {
      const [cx, cy] = center;
      const r = radius;
      return `M ${cx} ${cy + r} L ${cx + r} ${cy} L ${cx} ${cy - r} L ${cx -
        r} ${cy} Z`;
    }
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

  &.highlight {
    transform: translate(-1px, -2px);
    box-shadow: rgb(43, 43, 43) 2px 3px 5px 2px;
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
