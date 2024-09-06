import { String } from ".";

describe("String", () => {
  const valid = ["foo", "bar", '"im valid now"'];

  const invalid = ["im not valid"];

  valid.forEach((value) => {
    it(`is(${value}) should return true`, () => {
      expect(String.is(value)).toBeTruthy();
    });
  });

  invalid.forEach((value) => {
    it(`is(${value}) should return false`, () => {
      expect(String.is(value)).toBeFalsy();
    });
  });
});
