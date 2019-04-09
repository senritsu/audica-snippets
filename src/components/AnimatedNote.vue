<template lang="html">
  <transition
    appear
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
  >
    <svg
      v-if="show"
      :key="id"
      class="note"
      :class="{ [hand]: true, [type]: true }"
      :x="position[0] - 0.5"
      :y="position[1] - 0.5"
      width="1"
      height="1"
      viewBox="-1 -1 2 2"
    >
      <circle v-if="type === 'n'" cx="0" cy="0" r="0.2" class="symbol"></circle>
      <path v-if="type === 'h'" class="symbol" :d="diamondPath"></path>
    </svg>
  </transition>
</template>

<script>
import { diamond } from "@/geometry";

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
    },
    bpm: {
      type: Number,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      stage: "enter"
    };
  },
  computed: {
    diamondPath() {
      return diamond([0, 0], 0.2);
    },
    durations() {
      return {
        enter: (2 * 60) / this.bpm,
        hold: 60 / this.bpm,
        leave: 60 / this.bpm
      };
    },
    animationDuration() {
      switch (this.stage) {
        case "enter":
          return `${this.durations.enter}s`;
        case "hold":
          return `${this.durations.hold}s`;
        case "leave":
          return `${this.durations.leave}s`;
      }
      throw new Error("invalid stage");
    }
  },
  beforeDestroy() {
    clearTimeout(this.enterTimeout);
    clearTimeout(this.leaveTimeout);
  },
  methods: {
    onBeforeEnter(el) {
      this.stage = "enter";
      el.classList.add("v-enter-active");
      el.querySelector(
        ".symbol"
      ).style.animationDuration = this.animationDuration;
    },
    onEnter(el, done) {
      this.enterTimeout = setTimeout(() => done(), 1000 * this.durations.enter);
    },
    onAfterEnter(el) {
      this.stage = "hold";
      el.classList.remove("v-enter-active");
      el.querySelector(
        ".symbol"
      ).style.animationDuration = this.animationDuration;
    },
    onBeforeLeave(el) {
      this.stage = "leave";
      el.classList.add("v-leave-active");
      el.querySelector(
        ".symbol"
      ).style.animationDuration = this.animationDuration;
    },
    onLeave(el, done) {
      this.leaveTimeout = setTimeout(() => done(), 1000 * this.durations.leave);
    }
  }
};
</script>

<style lang="scss" scoped>
.symbol {
  stroke-width: 0.1;
  fill-opacity: 0.5;
}

.R .symbol {
  stroke: rgb(236, 102, 17);
  fill: rgb(236, 102, 17);
}

.L .symbol {
  stroke: rgb(21, 161, 221);
  fill: rgb(21, 161, 221);
}

// .v-enter .symbol, .v-leave-to .symbol {
//   opacity: 0;
// }
//
// .v-enter-to .symbol, .v-leave .symbol {
//   opacity: 1;
// }

.v-enter-active .symbol {
  fill: transparent;
  animation-name: timer;
}

.v-leave-active .symbol {
  animation-name: hit;
  animation-fill-mode: forwards;
}

.h:not(.v-enter-active):not(.v-leave-active) .symbol {
  animation-name: hold;
  animation-iteration-count: infinite;
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
  }
  100% {
    stroke-width: 0.03;
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes hit {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  5% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

@keyframes hold {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  20% {
    opacity: 0.75;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
