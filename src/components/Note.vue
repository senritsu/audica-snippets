<template lang="html">
  <svg
    class="note"
    :class="{ [hand]: true, [type]: true }"
    :x="position[0] - 0.5"
    :y="position[1] - 0.5"
    width="1"
    height="1"
    viewBox="-1 -1 2 2"
  >
    <circle v-if="type === 'n'" class="hit" cx="0" cy="0" r="0.2"></circle>
    <path v-if="type === 'h'" class="hit" d="M 0 0.2 L 0.2 0 L 0 -0.2 L -0.2 0 Z"></path>

    <circle v-if="type === 'n'" class="timer" cx="0" cy="0" r="0.2"></circle>
    <path v-if="type === 'h'" class="timer" d="M 0 0.2 L 0.2 0 L 0 -0.2 L -0.2 0 Z"></path>
  </svg>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    hand: {
      type: String,
      default: "right"
    },
    type: {
      type: String,
      default: "n"
    },
    position: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.timer {
  opacity: 0;
  fill: transparent;
  animation: 0.5s timer forwards;
}

.n .hit, .h .hit {
  opacity: 0;
  stroke-width: 0.1;
  fill-opacity: 0.5;
}

.n .hit {
  animation: 0.5s hit forwards;
  animation-delay: 0.5s;
}

.h .hit {
  animation: 0.25s hit infinite;
  animation-delay: 0.5s;
}

.R .hit,
.R .timer {
  stroke: rgb(236, 102, 17);
}
.R .hit {
  fill: rgb(236, 102, 17);
}
.L .hit,
.L .timer {
  stroke: rgb(21, 161, 221);
}
.L .hit {
  fill: rgb(21, 161, 221);
}

@keyframes timer {
  0% {
    opacity: 0;
    stroke-width: 0.01;
    transform: scale(5);
  }
  20% {
    opacity: 0.1;
  }
  99% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    stroke-width: 0.03;
    opacity: 0;
  }
}

@keyframes hit {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  5% {
    opacity: 1;
  }
  25% {
    transform: scale(1.3);
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}

@keyframes hold {
  0% {
    opacity: 0.75;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.75;
    transform: scale(1);
  }
}
</style>
