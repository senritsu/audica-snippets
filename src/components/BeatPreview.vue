<template lang="html">
  <div class="preview" :class="{ flash: flash && flashFlip, flash2: flash && !flashFlip }">
    <svg viewBox="-1 -1 2 2" width="400px" height="400px">
      <AnimatedNote
        v-for="note in notes"
        :key="note.id"
        :show="currentBeat >= note.start && currentBeat < note.end + 2"
        v-bind="note"
        :bpm="bpm"
      />
    </svg>
  </div>
</template>

<script>
import AnimatedNote from "@/components/AnimatedNote";

export default {
  components: {
    AnimatedNote
  },
  props: {
    beats: {
      type: Array,
      required: true
    },
    currentBeat: {
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
      flash: false,
      flashFlip: false
    };
  },
  computed: {
    paddedBeats() {
      return [[], []].concat(this.beats);
    },
    notes() {
      return this.beats.reduce((notes, beat) => {
        return notes.concat(
          beat.filter(note => !notes.find(x => x.id === note.id))
        );
      }, []);
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
        // this.$nextTick().then(() => {
        this.flash = true;
        this.flashFlip = !this.flashFlip;
        // });
      }
    },
    bpm: {
      immediate: true,
      handler(bpm) {
        if (!this.$el) {
          this.$nextTick(() => {
            this.$el.style.animationDuration = `${(0.5 * 60) / bpm}s`;
          });
        } else {
          this.$el.style.animationDuration = `${(0.5 * 60) / bpm}s`;
        }
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
    animation-name: flash;
  }
  &.flash2 {
    animation-name: flash2;
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
@keyframes flash2 {
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
