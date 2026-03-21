import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { Colors, FontFamily, Fonts, FontSizes, Radius } from '@/constants/theme';
import { Categories } from '@/entities/Products/model/product.model';

interface CategoryFilterProps {
  categories: (keyof typeof Categories)[];
  selectedCategory: keyof typeof Categories;
  onSelectCategory: (category: keyof typeof Categories) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map(category => {
          const isSelected = category === selectedCategory;
          return (
            <Pressable
              key={category}
              style={[
                styles.categoryButton,
                isSelected ? styles.categoryButtonActive : styles.categoryButtonInactive,
              ]}
              onPress={() => onSelectCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected ? styles.categoryTextActive : styles.categoryTextInactive,
                ]}
              >
                {Categories[category]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContainer: {
    paddingHorizontal: 30,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: Radius.r16,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: Colors.main.button,
  },
  categoryButtonInactive: {
    backgroundColor: Colors.main.backgroundWhite,
  },
  categoryText: {
    fontSize: FontSizes.f14,
    fontWeight: '400',
    fontFamily: FontFamily.regular,
  },
  categoryTextActive: {
    color: Colors.main.textWhite,
    fontWeight: '600',
    fontFamily: FontFamily.regular,
  },
  categoryTextInactive: {
    color: Colors.main.categoryTextInactive,
  },
});
