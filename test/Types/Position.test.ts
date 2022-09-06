import { expect } from "chai";
import { Position } from "../../src/Types";

const jsonData = `{
  "format_version": "1.17.0",
  "minecraft:entity": {
    "description": {
      "identifier": "example:foo",
      "is_spawnable": true,
      "is_summonable": true
    },
    "component_groups": {},
    "components": {
      "minecraft:type_family": { "family": ["foo"] },
      "minecraft:health": { "value": 10, "max": 10 },
      "minecraft:damage_sensor": {
        "triggers": { "cause": "all", "deals_damage": false }
      }
    },
    "events": {}
  }
}
`;

const identifierKey = "identifier";
const identifierPos = Position.create(4, 7);
const identifierOffset = jsonData.indexOf(identifierKey);

describe("Position", () => {
  it("Const Check", () => {
    const p = jsonData.slice(identifierOffset, identifierKey.length + identifierOffset);

    expect(p).to.equal(p);
  });

  it("toPosition", () => {
    const P = Position.toPosition(identifierOffset, jsonData);

    expect(P).to.eql(identifierPos);
  });

  it("toOffset", () => {
    const offset = Position.toOffset(identifierPos, jsonData);

    expect(offset).to.eql(identifierOffset);
  });

  it("is", () => {
    expect(Position.is({ character: 0, line: 0 })).to.be.true;
    expect(Position.is({ character: -15, line: 135 })).to.be.true;

    expect(Position.is({ character: "false", line: 135 })).to.be.false;
    expect(Position.is({ character: -15, line: "135" })).to.be.false;

    expect(Position.is({ character: false, line: "135" })).to.be.false;
    expect(Position.is({ line: 135 })).to.be.false;
    expect(Position.is({ character: 0 })).to.be.false;
  });
});
