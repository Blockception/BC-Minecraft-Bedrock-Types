import { Boolean } from ".";

describe("Boolean", () => {
  it("is", () => {
    expect(Boolean.is("true")).toBeTruthy();
    expect(Boolean.is("True")).toBeTruthy();
    expect(Boolean.is("false")).toBeTruthy();
    expect(Boolean.is("False")).toBeTruthy();

    expect(Boolean.is("foo")).toBeFalsy();
    expect(Boolean.is("1")).toBeFalsy();
    expect(Boolean.is("0")).toBeFalsy();
  });

  it("parse", () => {
    expect(Boolean.parse("true")).toBeTruthy();
    expect(Boolean.parse("True")).toBeTruthy();
    expect(Boolean.parse("false")).toBeFalsy();
    expect(Boolean.parse("False")).toBeFalsy();

    expect(Boolean.parse("foo")).toBeFalsy();
    expect(Boolean.parse("1")).toBeTruthy();
    expect(Boolean.parse("0")).toBeFalsy();
  });
});
