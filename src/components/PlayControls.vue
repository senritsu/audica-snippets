<template lang="html">
  <div class="play-controls">
    <div class="buttons">
      <button class="slower" @click="$emit('update:bpm', bpm - 10)">
        ◀
      </button>
      <div class="bpm">{{ bpm }} bpm</div>
      <button class="faster" @click="$emit('update:bpm', bpm + 10)">
        ▶
      </button>
    </div>
    <div class="buttons">
      <button v-if="!autoplay" class="back" @click="back">
        ◀
      </button>
      <button class="play" @click="autoplay = !autoplay">
        {{ autoplay ? "Pause" : "Play" }}
      </button>
      <button v-if="!autoplay" class="forward" @click="forward">
        ▶
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    bpm: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      autoplay: true
    };
  },
  watch: {
    autoplay: {
      immediate: true,
      handler(value) {
        if (value) {
          this.updateInterval();
        } else {
          clearInterval(this.interval);
        }
      }
    },
    bpm: "updateInterval"
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    forward() {
      this.$emit("input", (this.value + 1) % this.count);
    },
    back() {
      this.$emit("input", (this.value - 1 + this.count) % this.count);
    },
    updateInterval() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.forward();
      }, (1000 * 60) / this.bpm);
    }
  }
};
</script>

<style lang="scss" scoped>
.play-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;

  .buttons {
    display: flex;
    align-items: center;
    margin: 0.25em 0;
  }

  button,
  .bpm {
    height: 30px;
    margin: 0 0.25em;
    border-radius: 3px;
    border: none;
    font: 1.2em sans-serif;
    font-weight: 100;
    color: whitesmoke;
    box-shadow: rgb(43, 43, 43) 1px 2px 3px 1px;
  }

  button {
    cursor: pointer;

    transition: background-color 0.2s;

    background-color: rgb(190, 82, 22);

    &:hover {
      background-color: rgb(230, 98, 25);
    }
  }

  .bpm {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 120px;
    background-color: #787982;
  }

  .play {
    width: 100px;
  }

  .forward,
  .back {
    width: 30px;
    height: 30px;
  }
}
</style>
