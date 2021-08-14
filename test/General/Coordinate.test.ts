import { expect } from "chai";
import { Coordinate } from "../../src/General/Coordinate";

describe("Coordinates", () => {
  it("is", () => {
    //Positive integers
    expect(Coordinate.is("^+5")).to.true;
    expect(Coordinate.is("~+5")).to.true;
    expect(Coordinate.is("^5")).to.true;
    expect(Coordinate.is("~5")).to.true;

    //Positive floats
    expect(Coordinate.is("^+5.2")).to.true;
    expect(Coordinate.is("~+5.3")).to.true;
    expect(Coordinate.is("~+0.5")).to.true;
    expect(Coordinate.is("~+.5")).to.true;
    expect(Coordinate.is("^5.2")).to.true;
    expect(Coordinate.is("~5.3")).to.true;
    expect(Coordinate.is("~.5")).to.true;
    expect(Coordinate.is("~0.5")).to.true;

    //Negative integers
    expect(Coordinate.is("^-5")).to.true;
    expect(Coordinate.is("~-5")).to.true;
    expect(Coordinate.is("~-.5")).to.true;

    //Negative floats
    expect(Coordinate.is("^-5.2")).to.true;
    expect(Coordinate.is("~-5.3")).to.true;

    //Other
    expect(Coordinate.is("^")).to.true;
    expect(Coordinate.is("~")).to.true;
    expect(Coordinate.is("^0")).to.true;
    expect(Coordinate.is("~0")).to.true;
  });
});
