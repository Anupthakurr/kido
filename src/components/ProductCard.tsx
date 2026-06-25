import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCartStore } from '../store/useCartStore';
import { handleAction } from '../utils/actionDispatcher';
import { SDUINode } from '../types/schema';
import { useTheme } from '../context/ThemeContext';

interface ProductCardProps {
  node: SDUINode;
}

const ProductCard: React.FC<ProductCardProps> = ({ node }) => {
  const { data, action } = node;
  const { theme } = useTheme();
  
  // 🔥 ATOMIC STATE SUBSCRIPTION: Only re-renders if THIS product's cart count changes.
  // It completely bypasses React Context/Global tree re-renders.
  const cartQuantity = useCartStore((state) => state.cart[node.id] || 0);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <Image source={{ uri: data?.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {data?.title}
        </Text>
        <Text style={[styles.price, { color: theme.primary }]}>₹{data?.price}</Text>
      </View>
      
      <View style={styles.actions}>
        {cartQuantity > 0 ? (
          <View style={styles.quantityControl}>
            <TouchableOpacity 
              style={[styles.btnSmall, { backgroundColor: theme.primary }]}
              onPress={() => useCartStore.getState().decrement(node.id)}
            >
              <Text style={styles.btnText}>-</Text>
            </TouchableOpacity>
            <Text style={[styles.qtyText, { color: theme.text }]}>{cartQuantity}</Text>
            <TouchableOpacity 
              style={[styles.btnSmall, { backgroundColor: theme.primary }]}
              onPress={() => useCartStore.getState().increment(node.id)}
            >
              <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => handleAction(action)}
          >
            <Text style={styles.btnText}>ADD TO CART</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#eee',
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    padding: 12,
    paddingTop: 0,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});

// React.memo enforces structural boundary: only re-render if node props change
export default memo(ProductCard, (prevProps, nextProps) => prevProps.node.id === nextProps.node.id);
