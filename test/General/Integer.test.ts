import { expect } from "chai";
import { Integer } from "../../src/General/Integer";

describe("Integer", () => {
  it("is", () => {
    expect(Integer.is("-123456")).be.true;
    expect(Integer.is("123456")).be.true;

    expect(Integer.is("foo")).be.false;
  });
});
