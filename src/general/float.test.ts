import { Float } from ".";

describe("Float", () => {
  const valid = ["0.2", "-0.2", "-.2", ".2", "123456.987654", "-123456.987654", "-.987654", ".987654"];

  const invalid = ["foo"];

  valid.forEach((value) => {
    it(`is(${value}) should return true`, () => {
      expect(Float.is(value)).toBeTruthy();
    });
  });
  
  invalid.forEach((value) => {
    it(`is(${value}) should return false`, () => {
      expect(Float.is(value)).toBeFalsy();
    });
  });
});
