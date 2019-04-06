import parse from "@/parse";

describe("parse", () => {
  test("parses correct beat count", () => {
    expect(parse("RRR").length).toBe(3);
    expect(parse("RLR").length).toBe(2);
    expect(parse("RLL").length).toBe(2);
    expect(parse("RL").length).toBe(1);
  });

  test("parses blank notes", () => {
    expect(parse("RxL").length).toBe(2);
    expect(parse("Rx").length).toBe(1);
    expect(parse("xxRL").length).toBe(2);
    expect(parse("xxRLx").length).toBe(3);
  });

  test("parses hold notes", () => {
    expect(parse("Rh3").length).toBe(3);
    expect(parse("Rh5").length).toBe(5);
    expect(parse("Rh3").every(x => x.length === 1)).toBeTruthy();
    expect(parse("Rh3")[0][0].type).toBe("h");
    expect(parse("Rh3xLh2x").length).toBe(3);
  });

  test("parses hold notes mixed with other notes", () => {
    expect(parse("Rh5L").length).toBe(5);
    expect(parse("Rh5L")[0].length).toBe(2);
    expect(
      parse("Rh5L")
        .slice(1)
        .every(x => x.length === 1)
    ).toBeTruthy();

    expect(parse("Rh5LLL").filter(x => x.length).length).toBe(5);
    expect(parse("Rh5LLL")[1].length).toBe(2);
  });

  test("parses chain notes", () => {
    expect(parse("Rc3").length).toBe(3);
    expect(parse("Rc3").every(x => x.length === 1)).toBeTruthy();
  });

  test("parses pauses", () => {
    expect(parse("RP3R").length).toBe(5);
  });

  test("parses positions", () => {
    expect(parse("R13")[0][0].position).toEqual([
      -0.75 + (1.5 * 1) / 9,
      -0.75 + (1.5 * 3) / 9
    ]);
    expect(parse("R09")[0][0].position).toEqual([-0.75, 0.75]);
    expect(parse("R09h3")[0][0].position).toEqual([-0.75, 0.75]);
    expect(parse("R09h3")[0][0].end).toEqual(2);
  });

  test("hold pause interaction", () => {
    expect(parse("Rh3xLh2xP2").length).toBe(5);
  });
});
