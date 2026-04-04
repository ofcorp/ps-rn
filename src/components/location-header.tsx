import EditIcon from '@/assets/icons/edit';
import { Colors, FontFamily, FontSizes } from '@/constants/theme';
import { userAtom } from '@/entities/User/model/user.state';
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LocationHeader() {
  const router = useRouter();
  const { address } = useAtom(userAtom)[0].user || { address: 'Не задан' };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Адрес</Text>
      <Pressable onPress={() => router.push('/(app)/address')} hitSlop={8} style={styles.adddress}>
        <Text style={styles.text}>{address}</Text>
        <EditIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginTop: 39,
    flexDirection: 'column',
  },
  label: {
    color: Colors.main.textLabel,
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.f12,
  },
  adddress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    color: Colors.main.textWhite,
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.f14,
  },
});
