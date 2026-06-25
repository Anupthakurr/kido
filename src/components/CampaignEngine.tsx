import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { OverlayConfig } from '../types/schema';

interface CampaignEngineProps {
  overlay?: OverlayConfig;
}

const CampaignEngine: React.FC<CampaignEngineProps> = ({ overlay }) => {
  if (!overlay || overlay.type !== 'FULL_SCREEN_OVERLAY' || !overlay.animation_url) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LottieView
        source={{ uri: overlay.animation_url }}
        autoPlay
        loop
        style={styles.lottie}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: '100%',
    height: '100%',
  }
});

export default memo(CampaignEngine);
