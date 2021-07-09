import { CameraShakeMode } from './CameraShake';
import { CloneMode } from './Clone';
import { DifficultyMode } from './Difficulty';
import { FillMode } from './FillMode';
import { LocateFeatureMode } from './LocateFeature';
import { MaskMode } from './MaskMode';
import { MirrorMode } from './MirrorMode';
import { ModeHandler } from './ModeHandler';
import { MusicRepeatMode } from './MusicRepeatMode';
import { OldBlockMode } from './OldBlockMode';
import { OperationMode } from './Operation';
import { ReplaceMode } from './ReplaceMode';
import { RideFillMode } from './RideFillMode';
import { RideRulesMode } from './RideRulesMode';
import { RotationMode } from './RotationMode';
import { SaveMode } from './SaveMode';
import { StructureAnimationMode } from './StructureAnimationMode';
import { TeleportRulesMode } from './TeleportRulesMode';

/**The collection of modes for minecraft */
export namespace Modes {
  /** The mode: CameraShake **/
  export const CameraShake = new ModeHandler(CameraShakeMode);
  /** The mode: Clone **/
  export const Clone = new ModeHandler(CloneMode);
  /** The mode: Difficulty **/
  export const Difficulty = new ModeHandler(DifficultyMode);
  /** The mode: Fill **/
  export const Fill = new ModeHandler(FillMode);
  /** The mode: LocateFeature **/
  export const LocateFeature = new ModeHandler(LocateFeatureMode);
  /** The mode: Mask **/
  export const Mask = new ModeHandler(MaskMode);
  /** The mode: Mirror **/
  export const Mirror = new ModeHandler(MirrorMode);
  /** The mode: MusicRepeat **/
  export const MusicRepeat = new ModeHandler(MusicRepeatMode);
  /** The mode: OldBlock **/
  export const OldBlock = new ModeHandler(OldBlockMode);
  /** The mode: Operation **/
  export const Operation = new ModeHandler(OperationMode);
  /** The mode: Replace **/
  export const Replace = new ModeHandler(ReplaceMode);
  /** The mode: RideFill **/
  export const RideFill = new ModeHandler(RideFillMode);
  /** The mode: RideRules **/
  export const RideRules = new ModeHandler(RideRulesMode);
  /** The mode: Rotation **/
  export const Rotation = new ModeHandler(RotationMode);
  /** The mode: Save **/
  export const Save = new ModeHandler(SaveMode);
  /** The mode: StructureAnimation **/
  export const StructureAnimation = new ModeHandler(StructureAnimationMode);
  /** The mode: TeleportRules **/
  export const TeleportRules = new ModeHandler(TeleportRulesMode);
}


