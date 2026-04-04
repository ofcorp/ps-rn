import BagIcon from '@/assets/icons/bag';
import HomeIcon from '@/assets/icons/home';
import { Colors } from '@/constants/theme';
import { usePathname } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TabLayout() {
  const pathname = usePathname();
  const isHomeActive = pathname === '/catalog' || pathname.startsWith('/catalog/');
  const isCartActive = ['/cart', '/address', '/success'].includes(pathname);
  const hideTabs = pathname === '/success'; // hide only where you really want

  return (
    <Tabs>
      <TabSlot />
      <TabList style={[styles.tabList, hideTabs && styles.tabListHidden]}>
        <TabTrigger name="catalog" href="/catalog" style={styles.tabTrigger}>
          <View style={styles.tabInner}>
            <View style={styles.img}>
              <HomeIcon color={isHomeActive ? Colors.main.button : Colors.main.tabImage} />
              {isHomeActive ? <View style={styles.activePill} /> : null}
            </View>
            <Text style={styles.tabText}>Главная</Text>
          </View>
        </TabTrigger>
        <TabTrigger name="cart" href="/cart" style={styles.tabTrigger}>
          <View style={styles.tabInner}>
            <View style={styles.img}>
              <BagIcon color={isCartActive ? Colors.main.button : Colors.main.tabImage} />
              {isCartActive ? <View style={styles.activePill} /> : null}
            </View>
            <Text style={styles.tabText}>Заказ</Text>
          </View>
        </TabTrigger>
        <TabTrigger name="address" href="/address" style={styles.hiddenTabTrigger}>
          <View />
        </TabTrigger>
        <TabTrigger name="success" href="/success" style={styles.hiddenTabTrigger}>
          <View />
        </TabTrigger>
        <View style={styles.centerDivider} pointerEvents="none" />
        <View style={styles.homeIndicator} pointerEvents="none" />
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    height: 99,
    backgroundColor: Colors.main.backgroundWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: Colors.main.shadowColor,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 14,
    position: 'relative',
    overflow: 'visible',
  },
  tabListHidden: {
    display: 'none',
  },
  tabTrigger: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 26,
  },
  hiddenTabTrigger: {
    display: 'none',
  },
  tabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabText: {
    color: Colors.main.cardDescriptionText,
    fontSize: 14,
    fontFamily: 'Sora',
  },
  activePill: {
    width: 10,
    height: 5,
    borderRadius: 18,
    marginTop: 4,
    backgroundColor: Colors.main.button,
  },
  centerDivider: {
    position: 'absolute',
    top: 14,
    bottom: 32,
    left: '50%',
    width: 1,
    marginLeft: -0.5,
    backgroundColor: Colors.main.divider,
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    width: 140,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
