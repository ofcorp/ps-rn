import { Colors, FontFamily, FontSizes, Radius } from '@/constants/theme';
import { Text, View, StyleSheet } from 'react-native';

export default function HeaderText({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 315,
    paddingVertical: 21,
    borderRadius: Radius.r16,
  },
  text: {
    width: 315,
    height: 129,
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.f34,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 34,
    letterSpacing: 1,
    textAlign: 'center',
    color: Colors.main.textWhite,
  },
});
