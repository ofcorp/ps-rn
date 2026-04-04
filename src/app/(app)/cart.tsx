import EditIcon from '@/assets/icons/edit';
import Button from '@/components/button';
import { BottomTabInset, Colors, FontFamily, FontSizes, Radius, Spacing } from '@/constants/theme';
import { productAtom } from '@/entities/Products/model/product.state';
import { userAtom } from '@/entities/User/model/user.state';
import { router } from 'expo-router';
import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEFAULT_PRODUCT = {
  id: 0,
  name: 'Капучино',
  subTitle: 'с шоколадом / M',
  type: 'cappuccino',
  price: 270,
  image: '',
  description: '',
  rating: 4.8,
};

const DELIVERY_PRICE = 100;

export default function CartScreen() {
  const { products } = useAtomValue(productAtom);
  const { user } = useAtomValue(userAtom);
  const [quantity, setQuantity] = useState(1);

  const cartProduct = useMemo(() => {
    return (
      products.find(product => product.type?.toLowerCase() === 'cappuccino') ??
      products[0] ??
      DEFAULT_PRODUCT
    );
  }, [products]);

  const deliveryAddress = user?.address?.trim() || 'Не задан';
  const deliveryComment = user?.comment?.trim() || 'Комментарий к доставке';
  const itemsPrice = cartProduct.price * quantity;
  const totalPrice = itemsPrice + DELIVERY_PRICE;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Вернуться в каталог"
            accessibilityRole="button"
            hitSlop={12}
            onPress={() => router.push('/(app)/catalog')}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.title}>Заказ</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <View>
            <Text style={styles.sectionTitle}>Адрес доставки</Text>

            <View style={styles.addressBlock}>
              <Text style={styles.addressText}>{deliveryAddress}</Text>
              <Text style={styles.addressComment}>{deliveryComment}</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/(app)/address')}
              style={styles.editAddressButton}
            >
              <EditIcon />
              <Text style={styles.editAddressText}>Редактировать адрес</Text>
            </Pressable>
          </View>

          <View style={styles.line} />

          <View style={styles.itemRow}>
            <View style={styles.itemInfo}>
              {cartProduct.image ? (
                <Image source={{ uri: cartProduct.image }} style={styles.productImage} />
              ) : (
                <View style={[styles.productImage, styles.productImageFallback]}>
                  <Text style={styles.productImageFallbackText}>☕️</Text>
                </View>
              )}

              <View style={styles.itemTextBlock}>
                <Text style={styles.itemName}>{cartProduct.name}</Text>
                <Text style={styles.itemSubtitle}>{cartProduct.subTitle}</Text>
              </View>
            </View>

            <View style={styles.counterWrap}>
              <Pressable
                accessibilityLabel="Уменьшить количество"
                accessibilityRole="button"
                disabled={quantity === 1}
                onPress={() => setQuantity(current => Math.max(1, current - 1))}
                style={[styles.counterButton, quantity === 1 && styles.counterButtonDisabled]}
              >
                <Text
                  style={[styles.counterSymbol, quantity === 1 && styles.counterSymbolDisabled]}
                >
                  −
                </Text>
              </Pressable>

              <Text style={styles.counterValue}>{quantity}</Text>

              <Pressable
                accessibilityLabel="Увеличить количество"
                accessibilityRole="button"
                onPress={() => setQuantity(current => current + 1)}
                style={styles.counterButton}
              >
                <Text style={styles.counterSymbol}>+</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryBlock}>
            <Text style={styles.sectionTitle}>Итог</Text>

            <View style={styles.summaryList}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Цена</Text>
                <Text style={styles.summaryValue}>{itemsPrice} ₽</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Доставка</Text>
                <Text style={styles.summaryValue}>{DELIVERY_PRICE} ₽</Text>
              </View>
            </View>

            <View style={styles.line} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Итого к оплате</Text>
              <Text style={styles.totalValue}>{totalPrice} ₽</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Button onPress={() => router.push('/(app)/success')} text="Заказать" />
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
    paddingBottom: Spacing.four,
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
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    color: Colors.main.textBlack,
    fontSize: 28,
    lineHeight: 28,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f18,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
    gap: 20,
  },
  sectionTitle: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f16,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
    marginBottom: 16,
  },
  addressBlock: {
    gap: 8,
    marginBottom: 16,
  },
  addressText: {
    color: '#303336',
    fontSize: FontSizes.f14,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  addressComment: {
    color: '#808080',
    fontSize: FontSizes.f12,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
  },
  editAddressButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: Colors.main.backgroundWhite,
  },
  editAddressText: {
    color: '#303336',
    fontSize: FontSizes.f12,
    fontFamily: FontFamily.regular,
  },
  line: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productImage: {
    width: 54,
    height: 54,
    borderRadius: Radius.r12,
    backgroundColor: '#EDEDED',
  },
  productImageFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImageFallbackText: {
    fontSize: 20,
  },
  itemTextBlock: {
    flexShrink: 1,
    gap: 4,
  },
  itemName: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f16,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  itemSubtitle: {
    color: Colors.main.cardDescriptionText,
    fontSize: FontSizes.f12,
    fontFamily: FontFamily.regular,
  },
  counterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 96,
  },
  counterButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: Colors.main.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonDisabled: {
    opacity: 0.6,
  },
  counterSymbol: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f18,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
  },
  counterSymbolDisabled: {
    color: Colors.main.textGray,
  },
  counterValue: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f14,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 4,
    marginHorizontal: -30,
    backgroundColor: '#F0F0F0',
  },
  summaryBlock: {
    gap: 16,
  },
  summaryList: {
    gap: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  summaryLabel: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f14,
    fontFamily: FontFamily.regular,
  },
  summaryValue: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f14,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  totalLabel: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f14,
    fontFamily: FontFamily.regular,
  },
  totalValue: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f16,
    fontFamily: FontFamily.regular,
    fontWeight: '700',
  },
  footer: {
    paddingTop: 24,
    paddingBottom: BottomTabInset,
    alignItems: 'center',
  },
});
