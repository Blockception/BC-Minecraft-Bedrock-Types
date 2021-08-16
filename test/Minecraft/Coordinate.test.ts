import { expect } from "chai";
import { Coordinate } from "../../src/Minecraft/Coordinate";

describe("Coordinates", () => {
  it("is", () => {
    //Positive integers
    expect_coordinate("^+5", true);
    expect_coordinate("~+5", true);
    expect_coordinate("^5", true);
    expect_coordinate("~5", true);

    //Positive floats
    expect_coordinate("^+5.2", true);
    expect_coordinate("~+5.3", true);
    expect_coordinate("~+0.5", true);
    expect_coordinate("~+.5", true);
    expect_coordinate("^5.2", true);
    expect_coordinate("~5.3", true);
    expect_coordinate("~.5", true);
    expect_coordinate("~0.5", true);

    //Negative integers
    expect_coordinate("^-5", true);
    expect_coordinate("~-5", true);
    expect_coordinate("~-.5", true);

    //Negative floats
    expect_coordinate("^-5.2", true);
    expect_coordinate("~-5.3", true);

    //Other
    expect_coordinate("^", true);
    expect_coordinate("~", true);
    expect_coordinate("^0", true);
    expect_coordinate("~0", true);

    expect_coordinate("&16", false);
    expect_coordinate("*4341", false);
    expect_coordinate("x", false);
    expect_coordinate("y", false);
  });
});

function expect_coordinate(coordinate: string, correct: boolean = true) {
  expect(Coordinate.is(coordinate)).to.equal(correct, `${coordinate} was expected to be ${correct ? "correct" : "incorrect"}`);
}
