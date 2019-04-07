<template lang="html">
  <div class="pattern-input">
    <input v-model="modelProxy" type="text" />
    <button @click="copyToClipboard">
      <span>Copy </span>
      <span class="icon" :class="{ copied }">📋</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      copied: false
    };
  },
  computed: {
    modelProxy: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.copied = false;
        this.$router.replace(`/${encodeURIComponent(this.value)}`);
      }
    }
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
</style>
