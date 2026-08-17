import React from 'react';
import { Bike, Tent, Dumbbell, Waves, Snowflake, Trophy, Package } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Cycling: Bike,
  Camping: Tent,
  Fitness: Dumbbell,
  'Water Sports': Waves,
  'Winter Sports': Snowflake,
  'Team Sports': Trophy,
};

interface CategoryIconProps {
  name?: string;
  size?: number;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, size = 24, className = '' }) => {
  const Icon = (name && CATEGORY_ICONS[name]) || Package;
  return <Icon size={size} className={className} />;
};