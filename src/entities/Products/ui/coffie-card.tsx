import React from 'react';
import { View, Image, Text, Pressable, StyleSheet, ImageSourcePropType } from 'react-native';
import { Colors, FontFamily, FontSizes, Radius } from '@/constants/theme';
import { router } from 'expo-router';
import { IProduct } from '../model/product.model';

export function CoffeeCard({ id, image, rating, name, subTitle, price }: IProduct) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.image} />

        <View style={styles.ratingBadge}>
          <Text style={[styles.ratingText, { marginRight: 2 }]}>⭐</Text>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.descriptionText}>{subTitle}</Text>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.priceText}>{price} ₽</Text>
          <Pressable
            style={styles.addButton}
            onPress={() => router.push(`/product/${id}`)}
            hitSlop={8}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 149,
    height: 249,
    backgroundColor: Colors.main.backgroundWhite,
    borderRadius: Radius.r16,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 141,
    height: 132,
    borderRadius: Radius.r16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    borderRadius: Radius.r8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 2,
  },
  ratingText: {
    color: Colors.main.textWhite,
    fontSize: FontSizes.f12,
    fontWeight: '600',
    fontFamily: FontFamily.regular,
  },
  addButtonText: {
    color: Colors.main.textWhite,
    fontSize: FontSizes.f20,
    fontWeight: '600',
    fontFamily: FontFamily.regular,
  },

  contentContainer: {
    padding: 12,
    gap: 8,
  },
  titleText: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f16,
    fontWeight: '600',
    fontFamily: FontFamily.regular,
  },
  descriptionText: {
    color: Colors.main.cardDescriptionText,
    fontSize: FontSizes.f12,
    fontFamily: FontFamily.regular,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    color: Colors.main.cardPriceText,
    fontSize: FontSizes.f18,
    fontWeight: '600',
    fontFamily: FontFamily.regular,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.r10,
    backgroundColor: Colors.main.addButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 16,
    height: 16,
  },
});
