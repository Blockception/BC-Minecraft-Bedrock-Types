import { expect } from "chai";
import { Boolean } from "../../src/general";

describe("Boolean", () => {
  it("is", () => {
    expect(Boolean.is("true")).to.equal(true);
    expect(Boolean.is("True")).to.equal(true);
    expect(Boolean.is("false")).to.equal(true);
    expect(Boolean.is("False")).to.equal(true);

    expect(Boolean.is("foo")).to.equal(false);
    expect(Boolean.is("1")).to.equal(false);
    expect(Boolean.is("0")).to.equal(false);
  });

  it("parse", () => {
    expect(Boolean.parse("true")).to.equal(true);
    expect(Boolean.parse("True")).to.equal(true);
    expect(Boolean.parse("false")).to.equal(false);
    expect(Boolean.parse("False")).to.equal(false);

    expect(Boolean.parse("foo")).to.equal(false);
    expect(Boolean.parse("1")).to.equal(true);
    expect(Boolean.parse("0")).to.equal(false);
  });
});
