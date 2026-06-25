export type ActionType = 'ADD_TO_CART' | 'DEEP_LINK' | 'APPLY_MYSTERY_GIFT_COUPON' | string;

export interface Action {
  type: ActionType;
  payload?: any;
}

export interface Theme {
  primary: string;
  background: string;
  text?: string;
  surface?: string;
}

export interface OverlayConfig {
  type: 'FULL_SCREEN_OVERLAY' | string;
  animation_url: string;
}

export type ComponentType = 
  | 'BANNER_HERO'
  | 'PRODUCT_GRID_2X2'
  | 'DYNAMIC_COLLECTION'
  | string; // allow strings for graceful failure of unknown components

export interface SDUINode {
  id: string;
  type: ComponentType;
  data?: any;
  action?: Action;
  children?: SDUINode[];
}

export interface SDUIPayload {
  campaign: string;
  theme: Theme;
  overlay?: OverlayConfig;
  nodes: SDUINode[];
}
