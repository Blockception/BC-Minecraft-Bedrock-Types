import { expect } from "chai";
import { Float } from "../../src/General/Float";

describe("Float", () => {
  it("s", () => {
    expect(Float.is("0.2")).be.true;
    expect(Float.is("-0.2")).be.true;

    expect(Float.is("-.2")).be.true;
    expect(Float.is(".2")).be.true;

    expect(Float.is("123456.987654")).be.true;
    expect(Float.is("-123456.987654")).be.true;

    expect(Float.is("-.987654")).be.true;
    expect(Float.is(".987654")).be.true;

    expect(Float.is("foo")).be.false;
  });
});
