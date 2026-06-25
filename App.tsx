import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { ThemeProvider } from './src/context/ThemeContext';
import HomeScreen from './src/screens/HomeScreen';
import CampaignEngine from './src/components/CampaignEngine';
import { backToSchoolPayload } from './src/api/mockPayloads';
import { SDUIPayload } from './src/types/schema';

export default function App() {
  const [payload, setPayload] = useState<SDUIPayload>(backToSchoolPayload);

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={payload.theme.primary} />
        
        {/* Core SDUI Engine */}
        <HomeScreen payload={payload} setPayload={setPayload} />
        
        {/* Overlay Context (pointerEvents='none' inside) */}
        <CampaignEngine overlay={payload.overlay} />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
