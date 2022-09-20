import { expect } from "chai";
import { Coordinate } from "../../src/Minecraft/Coordinate";

describe("Coordinates", () => {
  const valid = [
    //Positive integers
    "^+5",
    "~+5",
    "^5",
    "~5",

    //Positive floats
    "^+5.2",
    "~+5.3",
    "~+0.5",
    "~+.5",
    "^5.2",
    "~5.3",
    "~.5",
    "~0.5",

    //Negative integers
    "^-5",
    "~-5",
    "~-.5",

    //Negative floats
    "^-5.2",
    "~-5.3",

    //Other
    "^",
    "~",
    "^0",
    "~0",
  ];

  const invalid = ["&16", "*4341", "x", "y"];

  valid.forEach((value) => {
    it(`is(${value}) should return true`, () => {
      expect_coordinate(value, true);
    });
  });

  invalid.forEach((value) => {
    it(`is(${value}) should return false`, () => {
      expect_coordinate(value, true);
    });
  });
});

function expect_coordinate(coordinate: string, correct: boolean = true) {
  expect(Coordinate.is(coordinate)).to.equal(correct, `${coordinate} was expected to be ${correct ? "correct" : "incorrect"}`);
}
