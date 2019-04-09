<template lang="html">
  <div class="editor">
    <BeatPreview :beats="beats" :current-beat="currentBeat" :bpm="bpm" />

    <Chart :beats="beats" :current-beat="currentBeat" />

    <PlayControls v-model="currentBeat" :count="beats.length + 2" :bpm.sync="bpm" />

    <PatternInput v-model="patternInput" />

    <div class="help">
      <Examples @input="patternInput = $event" />

      <Explanation />
    </div>
  </div>
</template>

<script>
import parse from "@/parse";

import BeatPreview from "@/components/BeatPreview";
import Chart from "@/components/Chart";
import PlayControls from "@/components/PlayControls";
import PatternInput from "@/components/PatternInput";
import Examples from "@/components/Examples";
import Explanation from "@/components/Explanation";

export default {
  components: {
    BeatPreview,
    Chart,
    PlayControls,
    PatternInput,
    Examples,
    Explanation
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
      currentBeat: 0,
      bpm: 120
    };
  },
  computed: {
    beats() {
      return parse(this.patternInput);
    }
  },
  watch: {
    beats() {
      this.currentBeat = 0;
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

.help {
  display: flex;
  align-items: center;
}
</style>
