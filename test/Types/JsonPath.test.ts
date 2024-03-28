import { expect } from "chai";
import { JsonPath } from "../../src/types/JsonPath";

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

const jsonWrapper = {
  getText(): string {
    return jsonData;
  },
};

describe("Json", () => {
  it("Json Path - Resolve", () => {
    const offset = JsonPath.resolve(jsonData, "minecraft:entity/description/identifier");

    expect(offset).to.be.equal(jsonData.indexOf("identifier"));
  });

  it("Json Path - Resolve2", () => {
    const offset = JsonPath.resolve(jsonData, "example:foo");

    expect(offset).to.be.equal(jsonData.indexOf("example:foo"));
  });

  it("Json Path - Resolve3", () => {
    const offset = JsonPath.resolve(jsonData, "minecraft:damage_sensor");

    expect(offset).to.be.equal(jsonData.indexOf("minecraft:damage_sensor"));
  });

  it("Json Path - Resolve4", () => {
    const offset = JsonPath.resolve(jsonData, "minecraft:entity/components/minecraft:damage_sensor");

    expect(offset).to.be.equal(jsonData.indexOf("minecraft:damage_sensor"));
  });

  it("Json Path - Resolve Wrapper", () => {
    const offset = JsonPath.resolve(jsonWrapper, "minecraft:entity/description/identifier");

    expect(offset).to.be.equal(jsonData.indexOf("identifier"));
  });
});
