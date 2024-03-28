import { expect } from "chai";
import { Conditional } from "../../src/types";

describe("Conditional", () => {
  it("getId", () => {
    const example: Conditional = { example: 1 };

    expect(Conditional.getId(example)).to.equal("example");
  });

  it("getId2", () => {
    expect(Conditional.getId("example")).to.equal("example");
  });

  it("getCondition", () => {
    const example: Conditional = { example: 1 };

    expect(Conditional.getCondition(example)).to.equal(1);
  });

  it("getCondition2", () => {
    const example: Conditional = { example: "foo" };

    expect(Conditional.getCondition(example)).to.equal("foo");
  });

  it("forEach works as intented", () => {
    const example: (Conditional | string)[] = [{ example: "foo" }, "foo", { example2: 1 }];

    const values: (string | number)[] = [];
    const ids: string[] = [];

    Conditional.forEach(example, (id, value) => {
      console.log(`${id}: ${value}`);
      values.push(value);
      ids.push(id);
    });

    expect(ids).to.contain.members(["example", "foo", "example2"]);
    expect(values).to.contain.members(["foo", 1, "1.0"]);
  });
});
