import { expect } from "chai";
import { BlockState, Block } from "../../src/Minecraft/Block";
import { Location } from "../../src/Types/Location";

const blockDescription: string = "minecraft:log[direction=west,stripped=true,half=top]";
const blockID = "minecraft:log";
const blockStates: BlockState[] = [
  { property: "direction", value: "west" },
  { property: "stripped", value: "true" },
  { property: "half", value: "top" },
];

describe("Block", () => {
  it("get id", () => {
    const id = Block.getId(blockDescription);

    expect(id).to.equal(blockID);
  });

  it("get states", () => {
    const states = Block.getStates(blockDescription);

    expect(states).to.have.deep.members(blockStates, "Block states do not match");
  });

  it("parse", () => {
    const block = Block.fromBlockDescriptor(blockDescription, Location.create("", 0));

    expect(block.id).to.equal(blockID);
    expect(block.states).to.have.deep.members(blockStates, "Block states do not match");
  });
});
