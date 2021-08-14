import { ModeCollection } from "./ModeCollection";

export const MaskMode: ModeCollection = {
  name: "Mask Mode",
  modes: [
    { name: "filtered", documentation: "Using a filtered setting" },
    { name: "masked", documentation: "Clones the area using a mask" },
    { name: "replace", documentation: "Replaces the specified block" },
  ],
};
