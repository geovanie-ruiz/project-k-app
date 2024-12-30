'use client';

import AnyRuneIcon from '@/components/icons/AnyRuneIcon';
import BattlefieldIcon from '@/components/icons/BattlefieldIcon';
import CalmIcon from '@/components/icons/CalmIcon';
import ChampionIcon from '@/components/icons/ChampionIcon';
import ChaosIcon from '@/components/icons/ChaosIcon';
import CostIcon from '@/components/icons/CostIcon';
import ExhaustIcon from '@/components/icons/ExhaustIcon';
import FuryIcon from '@/components/icons/FuryIcon';
import GearIcon from '@/components/icons/GearIcon';
import LegendIcon from '@/components/icons/LegendIcon';
import MentalIcon from '@/components/icons/MentalIcon';
import MightIcon from '@/components/icons/MightIcon';
import OrderIcon from '@/components/icons/OrderIcon';
import PhysicalIcon from '@/components/icons/PhysicalIcon';
import RuneIcon from '@/components/icons/RuneIcon';
import SpellIcon from '@/components/icons/SpellIcon';
import UnitIcon from '@/components/icons/UnitIcon';

export default function IconTest() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-8 p-4 gap-4">
        <BattlefieldIcon className="text-4xl" />
        <CalmIcon className="text-4xl" />
        <CalmIcon isColored className="text-4xl" />
        <CalmIcon isComplex className="text-4xl" />
        <CalmIcon isComplex isColored className="text-4xl" />
        <ChampionIcon className="text-4xl" />
        <ChaosIcon className="text-4xl" />
        <ChaosIcon isColored className="text-4xl" />
        <ChaosIcon isComplex className="text-4xl" />
        <ChaosIcon isComplex isColored className="text-4xl" />
        <CostIcon value={0} className="text-4xl" />
        <CostIcon value={1} className="text-4xl" />
        <CostIcon value={2} className="text-4xl" />
        <CostIcon value={3} className="text-4xl" />
        <CostIcon value={4} className="text-4xl" />
        <CostIcon value={5} className="text-4xl" />
        <CostIcon value={6} className="text-4xl" />
        <CostIcon value={7} className="text-4xl" />
        <CostIcon value={8} className="text-4xl" />
        <CostIcon value={9} className="text-4xl" />
        <CostIcon value={10} className="text-4xl" />
        <CostIcon value={11} className="text-4xl" />
        <ExhaustIcon className="text-4xl" />
        <FuryIcon className="text-4xl" />
        <FuryIcon isColored className="text-4xl" />
        <FuryIcon isComplex className="text-4xl" />
        <FuryIcon isComplex isColored className="text-4xl" />
        <GearIcon className="text-4xl" />
        <LegendIcon className="text-4xl" />
        <MentalIcon className="text-4xl" />
        <MentalIcon isColored className="text-4xl" />
        <MentalIcon isComplex className="text-4xl" />
        <MentalIcon isComplex isColored className="text-4xl" />
        <MightIcon className="text-4xl" />
        <OrderIcon className="text-4xl" />
        <OrderIcon isColored className="text-4xl" />
        <OrderIcon isComplex className="text-4xl" />
        <OrderIcon isComplex isColored className="text-4xl" />
        <PhysicalIcon className="text-4xl" />
        <PhysicalIcon isColored className="text-4xl" />
        <PhysicalIcon isComplex className="text-4xl" />
        <PhysicalIcon isComplex isColored className="text-4xl" />
        <RuneIcon className="text-4xl" />
        <AnyRuneIcon className="text-4xl" />
        <SpellIcon className="text-4xl" />
        <UnitIcon className="text-4xl" />
      </div>
    </div>
  );
}
