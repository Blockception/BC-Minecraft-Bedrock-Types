import { ModeCollection } from "./ModeCollection";

export const ReplaceMode: ModeCollection = {
  name: "Fill mode",
  modes: [
    { name: "destroy", documentation: "Destroy the old" },
    { name: "keep", documentation: "Keeps the old if there is any" },
  ],
};
