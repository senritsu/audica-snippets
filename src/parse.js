let idCounter = 0;

export default s => {
  const notes = [];
  let currentBeat = 0;
  let maxBeat = 0;
  let beatNotes = [];

  const notePattern = /(?<pause>P)(?<pauseDuration>\d+)|(?<hand>[RLx_])(?<position>\d{2,4})?(?:(?<type>[hc])(?<duration>\d+))?/g;
  let match;

  while ((match = notePattern.exec(s))) {
    if (beatNotes.length === 2) {
      currentBeat++;
      maxBeat = Math.max(maxBeat, currentBeat);
      beatNotes = [];
    }

    if (match.groups.pause) {
      if (beatNotes.length) {
        currentBeat++;
      }
      const duration = parseInt(match.groups.pauseDuration || "1");
      maxBeat = Math.max(maxBeat, currentBeat + duration);
      currentBeat = maxBeat;
      beatNotes = [];
    } else if (!["L", "R"].includes(match.groups.hand)) {
      beatNotes.push(null);
    } else {
      const { hand, type = "n", position } = match.groups;
      const duration = parseInt(match.groups.duration || "1");

      if (beatNotes.indexOf(hand) > -1) {
        currentBeat++;
        beatNotes = [];
      }

      const note = {
        id: `note-${idCounter++}`,
        hand,
        type,
        start: currentBeat,
        end: currentBeat + duration - 1,
        position: position
          ? [
              -0.75 + (1.5 * parseInt(position[0])) / 9,
              -0.75 + (1.5 * parseInt(position[1])) / 9
            ]
          : [
              (hand === "L" ? -1 : 1) * (0.5 + 0.25 * Math.random()),
              -0.75 + 1.5 * Math.random()
            ]
      };

      maxBeat = Math.max(maxBeat, note.end);
      notes.push(note);
      beatNotes.push(hand);
    }
  }

  return new Array(maxBeat + 1)
    .fill(null)
    .map((_, i) => notes.filter(note => i >= note.start && i <= note.end));
};
