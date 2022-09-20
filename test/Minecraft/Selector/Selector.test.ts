import { expect } from "chai";
import { Selector } from "../../../src/Minecraft/Selector";

describe("Selector", () => {
  const validTypes = ["@a", "@s", "@c", "@v", "@e", "@p", "@r", "@initiator"];
  const invalidType = ["@x"];

  validTypes.forEach((type) => {
    it(`Type: ${type} should be valid`, () => {
      expect(Selector.isValidType(type)).to.be.true;
    });
  });

  invalidType.forEach((type) => {
    it(`Type: ${type} should be invalid`, () => {
      expect(Selector.isValidType(type)).to.be.false;
    });
  });
});
