import * as React from 'react';
import LogoIcon from './2RunesLogo';
import AnyRuneIcon from './AnyRuneIcon';
import BattlefieldIcon from './BattlefieldIcon';
import CalmIcon from './CalmIcon';
import ChampionIcon from './ChampionIcon';
import ChaosIcon from './ChaosIcon';
import CostIcon from './CostIcon';
import ExhaustIcon from './ExhaustIcon';
import FuryIcon from './FuryIcon';
import GearIcon from './GearIcon';
import LegendIcon from './LegendIcon';
import MentalIcon from './MentalIcon';
import MightIcon from './MightIcon';
import OrderIcon from './OrderIcon';
import PhysicalIcon from './PhysicalIcon';
import RuneIcon from './RuneIcon';
import SpellIcon from './SpellIcon';
import UnitIcon from './UnitIcon';

export type ICON_KEYS =
  | 'logo'
  | 'anyRune'
  | 'battlefield'
  | 'calm'
  | 'calmColor'
  | 'calmComplex'
  | 'calmComplete'
  | 'champion'
  | 'chaos'
  | 'chaosColor'
  | 'chaosComplex'
  | 'chaosComplete'
  | 'cost0'
  | 'cost1'
  | 'cost2'
  | 'cost3'
  | 'cost4'
  | 'cost5'
  | 'cost6'
  | 'cost7'
  | 'cost8'
  | 'cost9'
  | 'cost10'
  | 'cost11'
  | 'exhaust'
  | 'fury'
  | 'furyColor'
  | 'furyComplex'
  | 'furyComplete'
  | 'gear'
  | 'legend'
  | 'mental'
  | 'mentalColor'
  | 'mentalComplex'
  | 'mentalComplete'
  | 'might'
  | 'order'
  | 'orderColor'
  | 'orderComplex'
  | 'orderComplete'
  | 'physical'
  | 'physicalColor'
  | 'physicalComplex'
  | 'physicalComplete'
  | 'rune'
  | 'spell'
  | 'unit';

type Icon = React.ForwardRefRenderFunction<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>;

export const ICONS = new Map<ICON_KEYS, Icon>([
  ['logo', LogoIcon],
  ['anyRune', AnyRuneIcon],
  ['battlefield', BattlefieldIcon],
  ['calm', CalmIcon],
  ['calmColor', CalmIcon],
  ['calmComplex', CalmIcon],
  ['calmComplete', CalmIcon],
  ['champion', ChampionIcon],
  ['chaos', ChaosIcon],
  ['chaosColor', ChaosIcon],
  ['chaosComplex', ChaosIcon],
  ['chaosComplete', ChaosIcon],
  ['cost0', CostIcon],
  ['cost1', CostIcon],
  ['cost2', CostIcon],
  ['cost3', CostIcon],
  ['cost4', CostIcon],
  ['cost5', CostIcon],
  ['cost6', CostIcon],
  ['cost7', CostIcon],
  ['cost8', CostIcon],
  ['cost9', CostIcon],
  ['cost10', CostIcon],
  ['cost11', CostIcon],
  ['exhaust', ExhaustIcon],
  ['fury', FuryIcon],
  ['furyColor', FuryIcon],
  ['furyComplex', FuryIcon],
  ['furyComplete', FuryIcon],
  ['gear', GearIcon],
  ['legend', LegendIcon],
  ['mental', MentalIcon],
  ['mentalColor', MentalIcon],
  ['mentalComplex', MentalIcon],
  ['mentalComplete', MentalIcon],
  ['might', MightIcon],
  ['order', OrderIcon],
  ['orderColor', OrderIcon],
  ['orderComplex', OrderIcon],
  ['orderComplete', OrderIcon],
  ['physical', PhysicalIcon],
  ['physicalColor', PhysicalIcon],
  ['physicalComplex', PhysicalIcon],
  ['physicalComplete', PhysicalIcon],
  ['rune', RuneIcon],
  ['spell', SpellIcon],
  ['unit', UnitIcon],
]);
