import React from 'react';
import type {Node} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Banner,
  Interstitial,
  PublisherBanner,
  NativeAdsManager,
} from 'react-native-ad-manager'

const App: () => Node = () => {

  return (
    <SafeAreaProvider>
      <View>
        <Text style={StyleSheet.banners}>Advertisement</</Text>
        </View>
        <ScrollView style={StyleSheet.sectionContainer}>
          <View>
            <Button title="Press me"></Button>
          </View>
        </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  banners: {
textAlign: "center",
paddingTop: 40,
paddingBottom: 40,
backgroundColor: "#BFFF00",
color: "blue",
  }
});

export default App;
