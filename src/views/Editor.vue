<template lang="html">
  <div class="editor">
    <div class="preview">
      <svg viewBox="-1 -1 2 2" width="400px" height="400px">
        <transition-group :duration="{ enter: 1000, leave: 0 }" tag="g">
          <Note v-for="note in currentNotes" :key="note.id" v-bind="note" />
        </transition-group>
      </svg>
      <input
        v-model.number="currentBeat"
        type="range"
        min="0"
        :max="parsedPattern.length - 1"
      />
      <button @click="copyToClipboard">Copy</button>
      <!-- <code>
        <pre>{{ JSON.stringify(parsedPattern) }}</pre>
      </code>
      <code>
        <pre>{{ JSON.stringify(currentNotes) }}</pre>
      </code> -->
    </div>
    <div class="pattern-input">
      <input v-model="patternInput" type="textarea" />
    </div>
  </div>
</template>

<script>
import parse from "@/parse";
import Note from "@/components/Note";

export default {
  components: {
    Note
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
      currentBeat: 0
    };
  },
  computed: {
    currentNotes() {
      return this.parsedPattern
        .slice(this.currentBeat, this.currentBeat + 2)
        .reduce((all, notes) => all.concat(notes), [])
        .filter(
          (x, i, array) => array.findIndex(other => x.id === other.id) === i
        );
    },
    parsedPattern() {
      return [[], [], ...parse(this.patternInput)];
    }
  },
  watch: {
    parsedPattern() {
      this.currentBeat = 0;
    }
  },
  created() {
    this.interval = setInterval(() => {
      this.currentBeat = (this.currentBeat + 1) % this.parsedPattern.length;
    }, 500);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
