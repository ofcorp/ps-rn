import { Colors, FontFamily, FontSizes, Radius } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

export function SearchBar({
  placeholder = 'Найти кофе',
  onChangeText,
  value,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.main.textDarkGray}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.main.backgroundGray,
    borderRadius: Radius.r16,
    paddingHorizontal: 16,
    height: 52,
    marginHorizontal: 30,
    marginTop: 16,
    marginBottom: 16
  },
  icon: {
    fontSize: FontSizes.f20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.f14,
    color: Colors.main.textGray,
    fontFamily: FontFamily.regular,
  },
});
