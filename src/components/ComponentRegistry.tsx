import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { SDUINode } from '../types/schema';
import BannerHero from './BannerHero';
import ProductGrid2x2 from './ProductGrid2x2';
import DynamicCollection from './DynamicCollection';

// Scalable Factory Pattern / Registry Hash Map
const ComponentMap: Record<string, React.FC<{ node: SDUINode }>> = {
  BANNER_HERO: BannerHero,
  PRODUCT_GRID_2X2: ProductGrid2x2,
  DYNAMIC_COLLECTION: DynamicCollection,
};

// Graceful degradation for unknown components
const UnknownComponent: React.FC<{ type: string }> = ({ type }) => {
  if (__DEV__) {
    console.warn(`[SDUI] Unsupported component type dropped safely: ${type}`);
  }
  // In production, we quietly fail and return null to preserve view tree stability.
  return null;
};

interface ComponentRegistryProps {
  node: SDUINode;
}

const ComponentRegistry: React.FC<ComponentRegistryProps> = ({ node }) => {
  const Component = ComponentMap[node.type];

  if (!Component) {
    return <UnknownComponent type={node.type} />;
  }

  return <Component node={node} />;
};

// We memoize the factory dispatcher as well
export default memo(ComponentRegistry, (prev, next) => prev.node.id === next.node.id);
