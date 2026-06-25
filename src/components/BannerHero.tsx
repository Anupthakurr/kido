import React, { memo } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { SDUINode } from '../types/schema';
import { handleAction } from '../utils/actionDispatcher';

interface BannerHeroProps {
  node: SDUINode;
}

const BannerHero: React.FC<BannerHeroProps> = ({ node }) => {
  const { data, action } = node;

  return (
    <TouchableOpacity 
      activeOpacity={action ? 0.8 : 1}
      onPress={() => handleAction(action)}
    >
      <ImageBackground 
        source={{ uri: data?.image_url }} 
        style={styles.banner}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{data?.title}</Text>
          <Text style={styles.subtitle}>{data?.subtitle}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 200,
    margin: 16,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#eee',
    fontSize: 14,
    marginTop: 4,
  }
});

export default memo(BannerHero, (prev, next) => prev.node.id === next.node.id);
