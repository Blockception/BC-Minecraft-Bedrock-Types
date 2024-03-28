import { ModeCollection } from "./ModeCollection";

/** */
export const ScanMode: ModeCollection = {
  name: "Scan",
  modes: [
    { name: "all", documentation: "Scans all blocks" },
    { name: "masked", documentation: "Scans all blocks that match the mask" },
  ],
};
