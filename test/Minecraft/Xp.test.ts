import { expect } from "chai";
import { XP } from "../../src/Minecraft/Xp";

describe("XP", () => {
  const valid = ["13", "1000", "-1000", "13L", "1000L", "-1000L"];

  const invalid = ["13.64", "1000.74", "-1000.26", "13.15376L", "1000.546L", "-1000.123L", "asdb", "xpL", "-aL"];

  valid.forEach((value) => {
    it(`is(${value}) should return true`, () => {
      expect(XP.is(value)).to.be.true;
    });

    if (value.endsWith("L") || value.endsWith("l")) {
      const integer = parseInt(value.slice(0, -1));

      it(`isLevel(${value}) should return true`, () => {
        expect(XP.isLevel(value)).to.be.true;
      });

      it(`parse(${value}) should return ${integer}`, () => {
        expect(XP.parse(value)).to.equal(integer);
      });
    } else {
      it(`isLevel(${value}) should return false`, () => {
        expect(XP.isLevel(value)).to.be.false;
      });

      const integer = parseInt(value);

      it(`parse(${value}) should return ${integer}`, () => {
        expect(XP.parse(value)).to.equal(integer);
      });
    }
  });

  invalid.forEach((value) => {
    it(`is(${value}) should return false`, () => {
      expect(XP.is(value)).to.be.false;
    });

    it(`isLevel(${value}) should return false`, () => {
      expect(XP.isLevel(value)).to.be.false;
    });
  });
});
