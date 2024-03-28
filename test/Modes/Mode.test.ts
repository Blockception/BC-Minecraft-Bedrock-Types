import { expect } from "chai";
import { Json } from "../../src/general/Json";
import { Modes } from "../../src/main";
import { Mode, ModeCollection } from "../../src/modes/ModeCollection";

describe("Mode", () => {
  let M = [
    Modes.CameraShake,
    Modes.Clone,
    Modes.Difficulty,
    Modes.Fill,
    Modes.Gamemode,
    Modes.LocateFeature,
    Modes.Mask,
    Modes.Mirror,
    Modes.MusicRepeat,
    Modes.OldBlock,
    Modes.Operation,
    Modes.Replace,
    Modes.RideFill,
    Modes.RideRules,
    Modes.Rotation,
    Modes.Save,
    Modes.SelectorAttribute,
    Modes.SelectorType,
    Modes.SlotType,
    Modes.StructureAnimation,
    Modes.TeleportRules,
  ];

  M.forEach((mode) => {
    describe(mode.name, () => {
      it("SanityCheck should pass", () => SanityCheckMode(mode));
      it("is should be true", () => expect(ModeCollection.is(mode), "ModeCollection failed").to.be.true);
      it("Values check", () => Values(mode));
    });
  });
});

function SanityCheckMode(mode: ModeCollection): void {
  expect(mode, "Mode is undefined").to.not.undefined;
  expect(mode.name, "Mode Name is undefined").to.not.undefined;
  expect(mode.modes, "Mode Items is undefined").to.not.undefined;
}

function Values(mode: ModeCollection): void {
  for (let I = 0; I < mode.modes.length; I++) {
    const value = mode.modes[I];

    expect(Mode.is(value), "Expect value to be mode: " + JSON.stringify(value)).to.be.true;
  }
}
