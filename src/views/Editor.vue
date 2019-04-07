<template lang="html">
  <div class="editor">
    <div class="preview">
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

    <Chart :beats="beats" :current-beat="currentBeat - 2" />

    <div class="play-controls">
      <button
        v-if="!autoplay"
        class="back"
        @click="currentBeat = (currentBeat - 1 + paddedBeats.length) % paddedBeats.length"
      >
        ◀
      </button>
      <button class="play" @click="autoplay = !autoplay">
        {{ autoplay ? "Pause" : "Play" }}
      </button>
      <button
        v-if="!autoplay"
        class="forward"
        @click="currentBeat = (currentBeat + 1) % paddedBeats.length"
      >
        ▶
      </button>
    </div>

    <div class="pattern-input">
      <input v-model="patternInput" type="textarea" />
      <button @click="copyToClipboard">
        <span>Copy </span>
        <span class="icon" :class="{copied}">📋</span>
      </button>
    </div>

    <div class="help">
      <Examples @input="patternInput = $event" />

      <Explanation />
    </div>
  </div>
</template>

<script>
import parse from "@/parse";
import Note from "@/components/Note";
import Chart from "@/components/Chart";
import Explanation from "@/components/Explanation";
import Examples from "@/components/Examples";

export default {
  components: {
    Note,
    Chart,
    Explanation,
    Examples
  },
  props: {
    pattern: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      patternInput: decodeURIComponent(this.pattern),
      autoplay: true,
      currentBeat: 0,
      copied: false
    };
  },
  computed: {
    currentNotes() {
      return this.paddedBeats
        .slice(this.currentBeat, this.currentBeat + 2)
        .reduce((all, notes) => all.concat(notes), [])
        .filter(
          (x, i, array) => array.findIndex(other => x.id === other.id) === i
        );
    },
    beats() {
      return parse(this.patternInput);
    },
    paddedBeats() {
      return [[], []].concat(this.beats);
    }
  },
  watch: {
    patternInput: {
      immediate: true,
      handler() {
        this.copied = false;
        this.$router.replace(`/${encodeURIComponent(this.patternInput)}`);
      }
    },
    paddedBeats() {
      this.currentBeat = 0;
    },
    autoplay: {
      immediate: true,
      handler(value) {
        if (value) {
          this.interval = setInterval(() => {
            this.currentBeat = (this.currentBeat + 1) % this.paddedBeats.length;
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
    copyToClipboard() {
      const el = document.createElement("textarea");
      el.value = `${location.origin}/${encodeURIComponent(this.patternInput)}`;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      this.copied = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.preview {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgb(81, 85, 93);
  box-shadow: inset rgb(37, 37, 37) 1px 2px 5px 3px;
  margin: 0.25em;
}
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

  .forward, .back {
    width: 30px;
    height: 30px;
  }
}

.pattern-input {
  input {
    width: 600px;
    padding: 0.4em;
    font: 1.3em sans-serif;
    color: rgb(58, 65, 75);
    border: 1px solid rgb(38, 38, 38);
    box-shadow: inset #444444 1px 1px 3px 0px;
  }

  button {
    width: 100px;
    text-align: left;
    cursor: pointer;
    margin-left: 0.25em;
    padding: 0.4em;
    font: 1.3em sans-serif;
    color: whitesmoke;
    background-color: rgb(11, 166, 252);
    border: none;
    box-shadow: rgb(43, 43, 43) 1px 2px 3px 1px;

    transition: background-color 0.2s;

    .icon {
      font-size: 0.85em;

      &:not(.copied) {
        opacity: 0.25;
      }
    }

    &:hover {
      background-color: rgb(65, 187, 255);
    }
  }
}

.help {
  display: flex;
  align-items: center;
}
</style>
