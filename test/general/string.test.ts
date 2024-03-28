import { expect } from "chai";
import { String } from "../../src/general";

describe("String", () => {
  const valid = ["foo", "bar", '"im valid now"'];

  const invalid = ["im not valid"];

  valid.forEach((value) => {
    it(`is(${value}) should return true`, () => {
      expect(String.is(value)).to.be.true;
    });
  });

  invalid.forEach((value) => {
    it(`is(${value}) should return false`, () => {
      expect(String.is(value)).to.be.false;
    });
  });
});
