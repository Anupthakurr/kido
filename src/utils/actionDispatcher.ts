import { Alert, Linking } from 'react-native';
import { Action } from '../types/schema';
import { useCartStore } from '../store/useCartStore';

export const handleAction = (action?: Action) => {
  if (!action) return;

  switch (action.type) {
    case 'ADD_TO_CART':
      if (action.payload?.id) {
        useCartStore.getState().increment(action.payload.id);
        // Alert.alert('Added to Cart', `Product ${action.payload.id} added.`);
      }
      break;

    case 'DEEP_LINK':
      if (action.payload?.url) {
        // In a real app, this would use React Navigation linking
        // Linking.openURL(action.payload.url);
        Alert.alert('Navigating', `Deep linking to: ${action.payload.url}`);
      }
      break;

    case 'APPLY_MYSTERY_GIFT_COUPON':
      if (action.payload?.code) {
        Alert.alert('Coupon Applied! 🎉', `Code ${action.payload.code} applied for product ${action.payload.id}`);
      }
      break;

    default:
      console.warn(`[ActionDispatcher] Unhandled action type: ${action.type}`);
  }
};
