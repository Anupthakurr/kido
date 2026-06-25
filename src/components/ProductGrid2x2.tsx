import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SDUINode } from '../types/schema';
import ProductCard from './ProductCard';
import { useTheme } from '../context/ThemeContext';

interface ProductGridProps {
  node: SDUINode;
}

const ProductGrid2x2: React.FC<ProductGridProps> = ({ node }) => {
  const { data, children } = node;
  const { theme } = useTheme();

  if (!children || children.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: theme.text }]}>{data?.title}</Text>
      <View style={styles.grid}>
        {children.map((childNode) => (
          <View key={childNode.id} style={styles.cell}>
            <ProductCard node={childNode} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    marginVertical: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '50%', // 2x2 grid
  }
});

export default memo(ProductGrid2x2, (prev, next) => prev.node.id === next.node.id);
