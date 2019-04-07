<template lang="html">
  <div class="explanation">
    <p>2 notes or placeholders make a beat</p>
    <p>
      <span>notes are defined as: </span>
      <strong class="token">hand</strong>
      <strong class="optional">[</strong>
      <strong class="token">position</strong>
      <strong class="optional">]</strong>
      <strong class="optional">[</strong>
      <strong class="token">type</strong>+<strong class="token">duration</strong>
      <strong class="optional">]</strong>
    </p>
    <p>
      <em>where (with anything inside <strong class="optional">[ ]</strong> being optional)</em>
    </p>
    <div>
      <strong class="token">hand</strong> =
      <strong class="token-content">L</strong>,
      <strong class="token-content">R</strong>, or
      <strong class="token-content">x</strong> (placeholder, no note in that timeslot)
    </div>
    <div>
      <strong class="token">position</strong> =
      <strong class="token-content">2 digits</strong> signifying row and column
      between 0 and 9, random position if omitted
    </div>
    <div>
      <strong class="token">type</strong> =
      <strong class="token-content">h</strong> (hold) or
      <strong class="token-content">c</strong> (chain, not supported yet),
      standard note if omitted
    </div>
    <div>
      <strong class="token">duration</strong> =
      <strong class="token-content">number</strong> of beats the note should
      stay
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.explanation {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2em;
  color: gray;

  p {
    margin: 0.5em 0;
  }

  .token {
    display: inline;
    color: rgb(121, 162, 176);
  }

  .optional {
    color: rgb(200, 127, 17);
  }

  .token-content {
    color: lightgray;
  }
}
</style>
