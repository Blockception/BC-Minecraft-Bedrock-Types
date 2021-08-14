import { expect } from "chai";
import { Json } from "../../src/General/Json";

describe("Json", () => {
  it("isObject", () => {
    expect(Json.isObject('{"rawtext":[{"text":"example"}]}')).be.true;

    expect(Json.isObject('{"rawtext":[{"text":"example}]')).be.false;
  });

  it("isArray", () => {
    expect(Json.isArray("[foo:1]")).be.true;

    expect(Json.isArray("[example:something,hello:1]")).be.true;

    expect(Json.isArray("[foo:1")).be.false;

    expect(Json.isArray("example:something,hello:1")).be.false;
  });
});
