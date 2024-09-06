import { Integer } from ".";

describe("Integer", () => {
  const valid = ["-123456", "123456"];

  const invalid = ["foo"];

  valid.forEach((value) => {
    it(`is(${value}) should return true`, () => {
      expect(Integer.is(value)).toBeTruthy();
    });
  });

  invalid.forEach((value) => {
    it(`is(${value}) should return false`, () => {
      expect(Integer.is(value)).toBeFalsy();
    });
  });
});
