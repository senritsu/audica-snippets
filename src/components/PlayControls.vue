<template lang="html">
  <div class="play-controls">
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
          this.interval = setInterval(() => {
            this.forward();
          }, 500);
        } else {
          clearInterval(this.interval);
        }
      }
    }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.play-controls {
  display: flex;
  align-items: center;
  margin: 1em;

  button {
    height: 30px;
    margin: 0 0.25em;
    border-radius: 3px;
    border: none;
    font: 1.2em sans-serif;
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
