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

/**
 * This approach is a bit of a whiff. I wanted to have a dynamic icon, and it needed to be mapped
 * but the problem is properties need to be mapped, too. So we end up in this weird scenario where
 * we have to refer to an icon by its name and properties, only to then have to parse that reference
 * for props, e.g. requesting icon 'cost1' still needs value={1} passed as a prop.
 */

export type ICON_KEYS =
  | 'logo'
  | 'any'
  | 'battlefield'
  | 'calm'
  | 'calm_color'
  | 'calm_complex'
  | 'calm_complete'
  | 'champion'
  | 'chaos'
  | 'chaos_color'
  | 'chaos_complex'
  | 'chaos_complete'
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
  | 'fury_color'
  | 'fury_complex'
  | 'fury_complete'
  | 'gear'
  | 'legend'
  | 'mental'
  | 'mental_color'
  | 'mental_complex'
  | 'mental_complete'
  | 'might'
  | 'order'
  | 'order_color'
  | 'order_complex'
  | 'order_complete'
  | 'physical'
  | 'physical_color'
  | 'physical_complex'
  | 'physical_complete'
  | 'rune'
  | 'spell'
  | 'unit';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  complex?: string;
  colored?: string;
  value?: number;
}

interface ComponentIconProps {
  iconType: ICON_KEYS;
  iconProps?: IconProps;
}

const ComponentIconMap: { [key in ICON_KEYS]: React.ComponentType<IconProps> } =
  {
    logo: LogoIcon,
    any: AnyRuneIcon,
    battlefield: BattlefieldIcon,
    calm: CalmIcon,
    calm_color: CalmIcon,
    calm_complete: CalmIcon,
    calm_complex: CalmIcon,
    champion: ChampionIcon,
    chaos: ChaosIcon,
    chaos_color: ChaosIcon,
    chaos_complete: ChaosIcon,
    chaos_complex: ChaosIcon,
    cost0: CostIcon,
    cost1: CostIcon,
    cost10: CostIcon,
    cost11: CostIcon,
    cost2: CostIcon,
    cost3: CostIcon,
    cost4: CostIcon,
    cost5: CostIcon,
    cost6: CostIcon,
    cost7: CostIcon,
    cost8: CostIcon,
    cost9: CostIcon,
    exhaust: ExhaustIcon,
    fury: FuryIcon,
    fury_color: FuryIcon,
    fury_complete: FuryIcon,
    fury_complex: FuryIcon,
    gear: GearIcon,
    legend: LegendIcon,
    mental: MentalIcon,
    mental_color: MentalIcon,
    mental_complete: MentalIcon,
    mental_complex: MentalIcon,
    might: MightIcon,
    order: OrderIcon,
    order_color: OrderIcon,
    order_complete: OrderIcon,
    order_complex: OrderIcon,
    physical: PhysicalIcon,
    physical_color: PhysicalIcon,
    physical_complete: PhysicalIcon,
    physical_complex: PhysicalIcon,
    rune: RuneIcon,
    spell: SpellIcon,
    unit: UnitIcon,
  };

const Icon: React.FC<ComponentIconProps> = ({ iconType, iconProps }) => {
  const ComponentIcon = ComponentIconMap[iconType];

  if (!ComponentIcon) return <div>Icon Not Found</div>;
  return <ComponentIcon {...iconProps} />;
};

// Usage: <Icon iconType="cost" iconProps={{ value: 8 }} /> = $cost8$ = Cost "8" svg icon
// Usage: <Icon iconType="calm" iconProps={{ complex: 'true' }} /> = $calmComplex$ = complex calm svg icon
// Usage: <Icon iconType="unit" /> = $unit$ = unit card type svg icon
export default Icon;
