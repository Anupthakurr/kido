import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ComponentRegistry from '../components/ComponentRegistry';
import { SDUINode, SDUIPayload } from '../types/schema';
import { useTheme } from '../context/ThemeContext';
import { backToSchoolPayload, summerPlayhousePayload, mysteryGiftPayload } from '../api/mockPayloads';

interface HomeScreenProps {
  payload: SDUIPayload;
  setPayload: (payload: SDUIPayload) => void;
}

export default function HomeScreen({ payload, setPayload }: HomeScreenProps) {
  const { theme, setTheme } = useTheme();

  // Inject OTA Theming whenever the payload changes
  useEffect(() => {
    setTheme(payload.theme);
  }, [payload.theme, setTheme]);

  // FlashList requires an estimated item size for optimal performance
  // We provide a rough average for vertical feed items
  const ESTIMATED_ITEM_SIZE = 250;

  const renderItem = useCallback(({ item }: { item: SDUINode }) => {
    return <ComponentRegistry node={item} />;
  }, []);

  const keyExtractor = useCallback((item: SDUINode) => item.id, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Dev Navigation to switch campaigns instantly */}
      <View style={styles.devNav}>
        <Text style={[styles.devTitle, { color: theme.text }]}>Switch Campaign (OTA Test)</Text>
        <View style={styles.navRow}>
          <TouchableOpacity onPress={() => setPayload(backToSchoolPayload)} style={styles.navBtn}>
            <Text style={styles.navBtnText}>School</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPayload(summerPlayhousePayload)} style={styles.navBtn}>
            <Text style={styles.navBtnText}>Summer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPayload(mysteryGiftPayload)} style={styles.navBtn}>
            <Text style={styles.navBtnText}>Carnival</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={payload.nodes}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          // @ts-expect-error React 19 type mismatch
          estimatedItemSize={ESTIMATED_ITEM_SIZE}
          showsVerticalScrollIndicator={false}
          // Optimization configurations
          removeClippedSubviews={true}
          drawDistance={250}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  devNav: {
    padding: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  devTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    opacity: 0.6,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  navBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  }
});
