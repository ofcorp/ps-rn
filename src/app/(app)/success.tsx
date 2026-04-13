import Button from '@/components/button';
import { Colors, FontFamily, FontSizes } from '@/constants/theme';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SuccessScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <Text style={styles.title}>Заказ оформлен!</Text>

        <View style={styles.illustrationWrap}>
          <Image source={require('@/assets/images/cup.png')} style={styles.cup} />
        </View>

        <View style={styles.buttonWrap}>
          <Button onPress={() => router.push('/(app)/catalog')} text="На главную" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingTop: 12,
    paddingBottom: 28,
  },
  title: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f18,
    lineHeight: 23,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
    textAlign: 'center',
  },
  illustrationWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cup: {
    width: 214,
    height: 214,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lid: {
    width: 174,
    height: 22,
    borderRadius: 8,
    backgroundColor: '#AA633D',
    zIndex: 2,
    transform: [{ translateY: 22 }],
  },
  cupBody: {
    width: 120,
    height: 168,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#AD6840',
    overflow: 'hidden',
  },
  band: {
    position: 'absolute',
    top: 38,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: '#ECECF6',
  },
  bean: {
    position: 'absolute',
    top: 94,
    left: 35,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8F3828',
    transform: [{ rotate: '-32deg' }],
  },
  beanHalf: {
    position: 'absolute',
    top: 113,
    left: 53,
    width: 2,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#5E1F17',
    transform: [{ rotate: '32deg' }],
  },
  buttonWrap: {
    marginBottom: 8,
  },
});
