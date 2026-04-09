import { Colors, FontFamily, FontSizes, Radius } from '@/constants/theme';
import { loadProductByIdAtom, productDetailsAtom } from '@/entities/Products/model/product.state';
import { addToCartAtom, userAtom } from '@/entities/User/model/user.state';
import { router, useLocalSearchParams } from 'expo-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SIZE_OPTIONS = ['S', 'M', 'L'] as const;

type CupSize = (typeof SIZE_OPTIONS)[number];

export default function CatalogItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const loadProductById = useSetAtom(loadProductByIdAtom);
  const { product, isLoading, error } = useAtomValue(productDetailsAtom);
  const { user } = useAtomValue(userAtom);
  const [selectedSize, setSelectedSize] = useState<CupSize>('M');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const addToCart = useSetAtom(addToCartAtom);

  useEffect(() => {
    if (id) {
      void loadProductById(id);
    }
  }, [id, loadProductById]);

  if (!product) {
    return <Text style={styles.errorMessageText}>Не удалось загрузить данные о продукте!</Text>;
  }

  const currentProduct = product;
  const description = currentProduct.description?.trim();
  const shouldCollapseDescription = description.length > 120;

  const handleAddToCart = async () => {
    let quantity = 1;
    const isAlreadyInCart = user?.cart?.some(item => item.productId === currentProduct.id) ?? false;

    if (isAlreadyInCart) {
      quantity += 1;
    }

    await addToCart({
      productId: currentProduct.id,
      name: currentProduct.name,
      subTitle: currentProduct.subTitle,
      price: currentProduct.price,
      size: selectedSize,
      quantity,
    });
    router.push('/(app)/cart');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Вернуться в каталог"
            accessibilityRole="button"
            hitSlop={12}
            onPress={() => router.back()}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Описание</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {isLoading ? (
            <View style={styles.infoMessage}>
              <ActivityIndicator color={Colors.main.button} size="small" />
              <Text style={styles.infoMessageText}>Загружаем напиток…</Text>
            </View>
          ) : null}

          {error ? (
            <View style={styles.errorMessage}>
              <Text style={styles.errorMessageText}>Не удалось загрузить данные: {error}</Text>
            </View>
          ) : null}

          <View style={styles.imageCard}>
            {currentProduct.image ? (
              <Image source={{ uri: currentProduct.image }} style={styles.image} />
            ) : (
              <View style={styles.imageFallback}>
                <Text style={styles.imageFallbackIcon}>☕️</Text>
              </View>
            )}
          </View>

          <View style={styles.mainInfoBlock}>
            <View style={styles.titleRow}>
              <View style={styles.titleWrap}>
                <Text style={styles.productTitle}>{currentProduct.name}</Text>
                <Text style={styles.productSubtitle}>{currentProduct.subTitle}</Text>
              </View>

              <View style={styles.ratingCard}>
                <Text style={styles.ratingStar}>★</Text>
                <View>
                  <Text style={styles.ratingValue}>{currentProduct.rating.toFixed(1)}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Описание</Text>
            <Text style={styles.descriptionText}>
              {isDescriptionExpanded || !shouldCollapseDescription
                ? description
                : `${description.slice(0, 120).trim()}... `}
              {shouldCollapseDescription ? (
                <Text
                  onPress={() => setIsDescriptionExpanded(prev => !prev)}
                  style={styles.readMoreText}
                >
                  {isDescriptionExpanded ? ' Скрыть' : ' Читать далее'}
                </Text>
              ) : null}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Размер порции</Text>
            <View style={styles.sizeRow}>
              {SIZE_OPTIONS.map(size => (
                <Pressable
                  key={size}
                  accessibilityRole="button"
                  onPress={() => setSelectedSize(size)}
                  style={[styles.sizeButton, selectedSize === size && styles.sizeButtonActive]}
                >
                  <Text
                    style={[
                      styles.sizeButtonText,
                      selectedSize === size && styles.sizeButtonTextActive,
                    ]}
                  >
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View>
            <Text style={styles.footerLabel}>Цена</Text>
            <Text style={styles.footerPrice}>{currentProduct.price} ₽</Text>
          </View>

          <Pressable onPress={handleAddToCart} style={styles.buyButton}>
            <Text style={styles.buyButtonText}>В корзину</Text>
          </Pressable>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 8,
    marginBottom: 20,
  },
  headerButton: {
    width: 32,
    height: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerButtonText: {
    color: Colors.main.textBlack,
    fontSize: 28,
    lineHeight: 28,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#313131',
    fontSize: FontSizes.f18,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.main.backgroundWhite,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  favoriteButtonText: {
    color: Colors.main.button,
    fontSize: 18,
    lineHeight: 18,
  },
  favoriteButtonActive: {
    borderColor: Colors.main.button,
    backgroundColor: '#FFF5EE',
  },
  favoriteButtonTextActive: {
    color: Colors.main.button,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingBottom: 24,
    gap: 20,
  },
  infoMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoMessageText: {
    color: '#7C7C7C',
    fontSize: FontSizes.f12,
    fontFamily: FontFamily.regular,
  },
  errorMessage: {
    borderRadius: Radius.r12,
    backgroundColor: '#FFF2F0',
    padding: 12,
  },
  errorMessageText: {
    color: '#B33A3A',
    fontSize: FontSizes.f12,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
  },
  imageCard: {
    height: 226,
    borderRadius: Radius.r16,
    overflow: 'hidden',
    backgroundColor: '#EDEDED',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFallbackIcon: {
    fontSize: 42,
  },
  mainInfoBlock: {
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleWrap: {
    flex: 1,
    gap: 4,
  },
  productTitle: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f20,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  productSubtitle: {
    color: Colors.main.cardDescriptionText,
    fontSize: FontSizes.f12,
    fontFamily: FontFamily.regular,
  },
  productCode: {
    color: '#B7B7B7',
    fontSize: FontSizes.f12,
    fontFamily: FontFamily.regular,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  ratingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingStar: {
    color: '#FBBE21',
    fontSize: FontSizes.f20,
  },
  ratingValue: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f16,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  ratingLabel: {
    color: Colors.main.cardDescriptionText,
    fontSize: FontSizes.f12,
    fontFamily: FontFamily.regular,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    flexShrink: 1,
  },
  infoChip: {
    minWidth: 72,
    borderRadius: Radius.r12,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  infoChipIcon: {
    fontSize: 14,
  },
  infoChipText: {
    color: '#4F4F4F',
    fontSize: 10,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f18,
    fontFamily: FontFamily.regular,
  },
  descriptionText: {
    color: '#6B6B6B',
    fontSize: FontSizes.f14,
    lineHeight: 22,
    fontFamily: FontFamily.regular,
  },
  readMoreText: {
    color: Colors.main.button,
    fontWeight: '600',
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    borderRadius: Radius.r12,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    backgroundColor: Colors.main.backgroundWhite,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonActive: {
    borderColor: Colors.main.button,
    backgroundColor: '#FFF5EE',
  },
  sizeButtonText: {
    color: '#2F2D2C',
    fontSize: FontSizes.f14,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  sizeButtonTextActive: {
    color: Colors.main.button,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: Colors.main.backgroundWhite,
    paddingHorizontal: 30,
    paddingTop: 16,
    paddingBottom: 20,
  },
  footerLabel: {
    color: '#9B9B9B',
    fontSize: FontSizes.f12,
    fontFamily: FontFamily.regular,
    marginBottom: 4,
  },
  footerPrice: {
    color: Colors.main.button,
    fontSize: FontSizes.f18,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  buyButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.r16,
    backgroundColor: Colors.main.button,
    paddingVertical: 17,
  },
  buyButtonText: {
    color: Colors.main.textWhite,
    fontSize: FontSizes.f16,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
});
