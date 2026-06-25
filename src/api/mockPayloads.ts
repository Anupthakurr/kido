import { SDUIPayload } from '../types/schema';

// Helper to generate mock products
const generateProducts = (count: number, prefix: string) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `prod_${prefix}_${i}`,
    type: 'PRODUCT_CARD',
    data: {
      title: `${prefix} Product ${i + 1}`,
      price: Math.floor(Math.random() * 500) + 50,
      image_url: `https://picsum.photos/seed/${prefix}${i}/200`,
    },
    action: {
      type: 'ADD_TO_CART',
      payload: { id: `prod_${prefix}_${i}` },
    },
  }));
};

export const backToSchoolPayload: SDUIPayload = {
  campaign: 'Back to School Mega-Sale',
  theme: {
    primary: '#FFD700', // bright yellow
    background: '#003366', // primary blue
    text: '#FFFFFF',
    surface: '#004080',
  },
  overlay: {
    type: 'FULL_SCREEN_OVERLAY',
    animation_url: 'https://assets2.lottiefiles.com/packages/lf20_1idqjwxa.json', // Paper airplane / confetti mockup
  },
  nodes: [
    {
      id: 'bts_hero',
      type: 'BANNER_HERO',
      data: {
        image_url: 'https://picsum.photos/seed/bts_hero/800/400',
        title: 'Back to School Essentials',
        subtitle: 'Up to 50% Off on Bags & Stationery',
      },
    },
    {
      id: 'bts_dynamic_1',
      type: 'DYNAMIC_COLLECTION',
      data: { title: 'Lunchboxes & Bags' },
      children: generateProducts(8, 'bts_lunchbox'),
    },
    {
      id: 'bts_grid_1',
      type: 'PRODUCT_GRID_2X2',
      data: { title: 'Stationery Kits' },
      children: generateProducts(4, 'bts_stat'),
    },
    // Adding an unsupported component to test resilience
    {
      id: 'unknown_node_1',
      type: 'NEW_COMPONENT_V2',
      data: { some: 'data' },
    },
    {
      id: 'bts_grid_2',
      type: 'PRODUCT_GRID_2X2',
      data: { title: 'More for You' },
      children: generateProducts(8, 'bts_more'),
    }
  ],
};

export const summerPlayhousePayload: SDUIPayload = {
  campaign: 'Summer Playhouse Festival',
  theme: {
    primary: '#00BFFF', // ocean blue
    background: '#E0FFFF', // light cyan
    text: '#003366',
    surface: '#FFFFFF',
  },
  overlay: {
    type: 'FULL_SCREEN_OVERLAY',
    animation_url: 'https://assets5.lottiefiles.com/packages/lf20_x62chj8l.json', // Water splash mockup
  },
  nodes: [
    {
      id: 'summer_hero',
      type: 'BANNER_HERO',
      data: {
        image_url: 'https://picsum.photos/seed/summer_hero/800/400',
        title: 'Summer Playhouse',
        subtitle: 'Coolest Toys & Activities',
      },
      action: {
        type: 'DEEP_LINK',
        payload: { url: '/category/summer' }
      }
    },
    {
      id: 'summer_dynamic_1',
      type: 'DYNAMIC_COLLECTION',
      data: { title: 'Petting Zoo Tickets & Events' },
      children: generateProducts(6, 'summer_zoo'),
    },
    {
      id: 'summer_grid_1',
      type: 'PRODUCT_GRID_2X2',
      data: { title: 'Water Toys' },
      children: generateProducts(8, 'summer_water'),
    },
  ],
};

export const mysteryGiftPayload: SDUIPayload = {
  campaign: 'Mystery Gift Carnival',
  theme: {
    primary: '#FF4500', // carnival red
    background: '#FFF0F5', 
    text: '#333333',
    surface: '#FFFFFF',
  },
  overlay: {
    type: 'FULL_SCREEN_OVERLAY',
    animation_url: 'https://assets9.lottiefiles.com/packages/lf20_rovf9gzu.json', // Confetti popping mockup
  },
  nodes: [
    {
      id: 'mystery_hero',
      type: 'BANNER_HERO',
      data: {
        image_url: 'https://picsum.photos/seed/mystery_hero/800/400',
        title: 'Mystery Gift Carnival',
        subtitle: 'Tap items to unlock surprises!',
      },
    },
    {
      id: 'mystery_dynamic_1',
      type: 'DYNAMIC_COLLECTION',
      data: { title: 'Mystery Boxes' },
      children: Array.from({ length: 6 }).map((_, i) => ({
        id: `mystery_box_${i}`,
        type: 'PRODUCT_CARD',
        data: {
          title: `Mystery Box ${i + 1}`,
          price: 99,
          image_url: `https://picsum.photos/seed/mystery${i}/200`,
        },
        action: {
          type: 'APPLY_MYSTERY_GIFT_COUPON',
          payload: { id: `mystery_box_${i}`, code: `GIFT${i}` },
        },
      })),
    },
    {
      id: 'mystery_grid_1',
      type: 'PRODUCT_GRID_2X2',
      data: { title: 'Carnival Snacks' },
      children: generateProducts(4, 'carnival_snack'),
    },
  ],
};
