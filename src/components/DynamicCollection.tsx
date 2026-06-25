import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SDUINode } from '../types/schema';
import ProductCard from './ProductCard';
import { useTheme } from '../context/ThemeContext';

interface DynamicCollectionProps {
  node: SDUINode;
}

const DynamicCollection: React.FC<DynamicCollectionProps> = ({ node }) => {
  const { data, children } = node;
  const { theme } = useTheme();

  // Optimized render item for FlatList to avoid inline functions
  const renderItem = useCallback(({ item }: { item: SDUINode }) => {
    return (
      <View style={styles.cardWrapper}>
        <ProductCard node={item} />
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: SDUINode) => item.id, []);

  if (!children || children.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: theme.text }]}>{data?.title}</Text>
      
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={children}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // Critical for nested virtualization performance
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        // Allows horizontal drag without interrupting vertical scroll lock
        directionalLockEnabled
        snapToInterval={180} // Width of card + margins
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 8,
  },
  cardWrapper: {
    width: 180, // Fixed width for horizontal items
  }
});

export default memo(DynamicCollection, (prev, next) => prev.node.id === next.node.id);
