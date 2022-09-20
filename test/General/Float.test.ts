import { expect } from "chai";
import { Float } from "../../src/General/Float";

describe("Float", () => {
  const valid = ["0.2", "-0.2", "-.2", ".2", "123456.987654", "-123456.987654", "-.987654", ".987654"];

  const invalid = ["foo"];

  valid.forEach((value) => {
    it(`is(${value}) should return true`, () => {
      expect(Float.is(value)).to.be.true;
    });
  });
  
  invalid.forEach((value) => {
    it(`is(${value}) should return false`, () => {
      expect(Float.is(value)).to.be.false;
    });
  });
});
