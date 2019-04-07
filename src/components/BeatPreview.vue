<template lang="html">
  <div class="preview" :class="{ flash }">
    <svg viewBox="-1 -1 2 2" width="400px" height="400px">
      <transition-group :duration="{ enter: 1000, leave: 0 }" tag="g">
        <Note v-for="note in currentNotes" :key="note.id" v-bind="note" />
      </transition-group>
    </svg>
    <!-- <code>
      <pre>{{ JSON.stringify(paddedBeats) }}</pre>
    </code>
    <code>
      <pre>{{ JSON.stringify(currentNotes) }}</pre>
    </code> -->
  </div>
</template>

<script>
import Note from "@/components/Note";

export default {
  components: {
    Note
  },
  props: {
    beats: {
      type: Array,
      required: true
    },
    currentBeat: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      flash: false
    };
  },
  computed: {
    paddedBeats() {
      return [[], []].concat(this.beats);
    },
    currentNotes() {
      return this.paddedBeats
        .slice(this.currentBeat, this.currentBeat + 2)
        .reduce((all, notes) => all.concat(notes), [])
        .filter(
          (x, i, array) => array.findIndex(other => x.id === other.id) === i
        );
    }
  },
  watch: {
    currentBeat(currentBeat) {
      this.flash = false;
      if (currentBeat >= 2) {
        this.$nextTick().then(() => {
          this.flash = true;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgb(81, 85, 93);
  box-shadow: inset rgb(37, 37, 37) 1px 2px 5px 3px;
  margin: 0.25em;

  &.flash {
    animation: 0.5s flash;
  }
}

@keyframes flash {
  0% {
    box-shadow: inset #83799d 1px 2px 18px 15px;
  }
  10% {
    box-shadow: inset #5f6175 1px 2px 12px 10px;
  }
  40% {
    box-shadow: inset #3e3e3e 1px 2px 8px 5px;
  }
  100% {
    box-shadow: inset #252525 1px 2px 5px 3px;
  }
}
</style>
