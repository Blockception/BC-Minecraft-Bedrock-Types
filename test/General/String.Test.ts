import { expect } from "chai";
import { String } from "../../src/General/String";

describe("String", () => {
  it("is", () => {
    expect(String.is("example")).to.be.true;
    expect(String.is("im not valid")).to.be.false;

    expect(String.is('"im valid now"')).to.be.true;
  });
});
