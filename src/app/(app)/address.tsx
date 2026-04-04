import GeoIcon from '@/assets/icons/geo';
import PathIcon from '@/assets/icons/path';
import Button from '@/components/button';
import { Colors, FontFamily, FontSizes, Radius } from '@/constants/theme';
import { updateUserAtom, userAtom } from '@/entities/User/model/user.state';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddressScreen() {
  const savedUser = useAtomValue(userAtom);
  const saveUser = useSetAtom(updateUserAtom);
  const [address, setAddress] = useState(savedUser.user?.address ?? 'Не задан');
  const [comment, setComment] = useState(savedUser.user?.comment ?? 'Комментарий к доставке');
  const addressInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (savedUser.user?.address) {
      setAddress(savedUser.user.address);
    }
  }, [savedUser.user?.address]);

  useEffect(() => {
    if (savedUser.user?.comment) {
      setComment(savedUser.user.comment);
    }
  }, [savedUser.user?.comment]);

  const handleSave = async () => {
    const trimmedAddress = address.trim();
    const trimmedComment = comment.trim();
    if (!trimmedAddress) {
      return;
    }

    await saveUser({ address: trimmedAddress, comment: trimmedComment });
    router.push('/(app)/catalog');
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      if (!location) {
        return null;
      }
      const { latitude, longitude } = location.coords;
      return await locationToAddress(latitude, longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  };

  const locationToAddress = async (latitude: number, longitude: number) => {
    try {
      const [result] = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (result) {
        const { street, city, region, postalCode } = result;
        return `${street}, ${city}, ${region}, ${postalCode}`;
      }
    } catch (error) {
      console.error('Error converting location to address:', error);
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Вернуться назад"
            accessibilityRole="button"
            hitSlop={12}
            onPress={() => router.push('/(app)/catalog')}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.title}>Изменить адрес</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <View style={styles.addressCard}>
            <PathIcon />
            <TextInput
              ref={addressInputRef}
              onChangeText={setAddress}
              placeholder="Введите адрес"
              placeholderTextColor="#9B9B9B"
              style={styles.addressInput}
              value={address}
            />

            <Pressable
              accessibilityRole="button"
              onPress={async () => {
                const newAddress = await getLocation();
                if (newAddress) {
                  setAddress(newAddress);
                }
              }}
              style={styles.editButton}
            >
              <GeoIcon />
            </Pressable>
          </View>

          <View style={styles.noteCard}>
            <View style={styles.noteIconWrap}>
              <Text style={styles.noteIcon}>≡</Text>
            </View>

            <TextInput
              multiline
              onChangeText={setComment}
              placeholder="Комментарий к доставке"
              placeholderTextColor="#9B9B9B"
              style={styles.noteInput}
              textAlignVertical="top"
              value={comment}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button onPress={handleSave} text="Сохранить" />
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
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 30,
    paddingTop: 8,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: Colors.main.textBlack,
    lineHeight: 28,
  },
  headerSpacer: {
    width: 32,
    height: 32,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSizes.f20,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
    color: '#313131',
  },
  content: {
    gap: 16,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    borderRadius: Radius.r16,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    backgroundColor: Colors.main.backgroundWhite,
    paddingLeft: 14,
    paddingRight: 10,
    gap: 12,
  },
  addressInput: {
    flex: 1,
    fontSize: FontSizes.f16,
    lineHeight: 20,
    fontFamily: FontFamily.regular,
    color: '#313131',
    paddingVertical: 0,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.main.button,
  },
  noteCard: {
    minHeight: 140,
    borderRadius: Radius.r16,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    backgroundColor: Colors.main.backgroundWhite,
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  noteIconWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.main.button,
    marginTop: 2,
  },
  noteIcon: {
    color: Colors.main.textWhite,
    fontSize: 12,
    lineHeight: 12,
  },
  noteInput: {
    flex: 1,
    minHeight: 96,
    fontSize: FontSizes.f16,
    lineHeight: 24,
    fontFamily: FontFamily.regular,
    color: '#4F4F4F',
    paddingVertical: 0,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
