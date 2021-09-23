import { expect } from "chai";
import { Definition } from "../../src/Types/include";

describe("Definition", () => {
  it("getId", () => {
    const example: Definition = {
      walk: "animation.sheep.walk",
      default: "animation.sheep.default",
    };

    expect(Definition.count(example)).to.equal(2);
    expect(Definition.getId(example, 0)).to.equal("animation.sheep.walk");
    expect(Definition.getId(example, 1)).to.equal("animation.sheep.default");
  });

  it("getIds", () => {
    const example: Definition = {
      walk: "animation.sheep.walk",
      default: "animation.sheep.default",
    };

    const keys = Definition.getIds(example);
    expect(keys).to.have.members(["animation.sheep.walk", "animation.sheep.default"]);
  });

  it("getReference", () => {
    const example: Definition = {
      walk: "animation.sheep.walk",
      default: "animation.sheep.default",
    };

    expect(Definition.count(example)).to.equal(2);
    expect(Definition.getReference(example, 0)).to.equal("walk");
    expect(Definition.getReference(example, 1)).to.equal("default");
  });

  it("getReferences", () => {
    const example: Definition = {
      walk: "animation.sheep.walk",
      default: "animation.sheep.default",
    };

    const keys = Definition.getReferences(example);
    expect(keys).to.have.members(["walk", "default"]);
  });

  it("foreach", () => {
    const example: Definition = {
      walk: "animation.sheep.walk",
      default: "animation.sheep.default",
    };

    const ids: string[] = [];
    const references: string[] = [];

    Definition.forEach(example, (reference, id) => {
      ids.push(id);
      references.push(reference);
    });

    expect(ids).to.have.members(["animation.sheep.walk", "animation.sheep.default"]);
    expect(references).to.have.members(["walk", "default"]);
  });
});
