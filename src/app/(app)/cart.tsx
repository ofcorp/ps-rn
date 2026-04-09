import EditIcon from '@/assets/icons/edit';
import Button from '@/components/button';
import { BottomTabInset, Colors, FontFamily, FontSizes, Radius, Spacing } from '@/constants/theme';
import { productAtom } from '@/entities/Products/model/product.state';
import { updateUserAtom, userAtom } from '@/entities/User/model/user.state';
import { router } from 'expo-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DELIVERY_PRICE = 100;

export default function CartScreen() {
  const { products } = useAtomValue(productAtom);
  const { user } = useAtomValue(userAtom);
  const saveUser = useSetAtom(updateUserAtom);

  const cartItems = user?.cart ?? [];
  const deliveryAddress = user?.address?.trim() || 'Не задан';
  const deliveryComment = user?.comment?.trim() || 'Комментарий к доставке';
  const itemsPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryPrice = cartItems.length ? DELIVERY_PRICE : 0;
  const totalPrice = itemsPrice + deliveryPrice;

  const handleQuantityChange = async (productId: number, size: string, delta: number) => {
    if (!user) {
      return;
    }

    const updatedCart = user.cart
      .map(item =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity + delta }
          : item,
      )
      .filter(item => item.quantity > 0);

    await saveUser({
      address: user.address,
      comment: user.comment,
      cart: updatedCart,
    });
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

          {cartItems.length ? (
            <View style={styles.cartList}>
              {cartItems.map((cartItem, index) => {
                const productImage = products.find(
                  product => product.id === cartItem.productId,
                )?.image;
                const itemSubtitle = [cartItem.subTitle, cartItem.size].filter(Boolean).join(' / ');

                return (
                  <View key={`${cartItem.productId}-${cartItem.size}`} style={styles.cartItemBlock}>
                    <View style={styles.itemRow}>
                      <View style={styles.itemInfo}>
                        {productImage ? (
                          <Image source={{ uri: productImage }} style={styles.productImage} />
                        ) : (
                          <View style={[styles.productImage, styles.productImageFallback]}>
                            <Text style={styles.productImageFallbackText}>☕️</Text>
                          </View>
                        )}

                        <View style={styles.itemTextBlock}>
                          <Text style={styles.itemName}>{cartItem.name}</Text>
                          <Text style={styles.itemSubtitle}>{itemSubtitle}</Text>
                        </View>
                      </View>

                      <View style={styles.counterWrap}>
                        <Pressable
                          accessibilityLabel={
                            cartItem.quantity === 1
                              ? 'Удалить товар из корзины'
                              : 'Уменьшить количество'
                          }
                          accessibilityRole="button"
                          onPress={() =>
                            void handleQuantityChange(cartItem.productId, cartItem.size, -1)
                          }
                          style={styles.counterButton}
                        >
                          <Text style={styles.counterSymbol}>−</Text>
                        </Pressable>

                        <Text style={styles.counterValue}>{cartItem.quantity}</Text>

                        <Pressable
                          accessibilityLabel="Увеличить количество"
                          accessibilityRole="button"
                          onPress={() =>
                            void handleQuantityChange(cartItem.productId, cartItem.size, 1)
                          }
                          style={styles.counterButton}
                        >
                          <Text style={styles.counterSymbol}>+</Text>
                        </Pressable>
                      </View>
                    </View>

                    {index < cartItems.length - 1 ? <View style={styles.line} /> : null}
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartTitle}>Корзина пуста</Text>
              <Text style={styles.emptyCartText}>
                Добавьте напитки из каталога, чтобы оформить заказ.
              </Text>
            </View>
          )}

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
                <Text style={styles.summaryValue}>{deliveryPrice} ₽</Text>
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
          <Button
            onPress={() => router.push(cartItems.length ? '/(app)/success' : '/(app)/catalog')}
            text={cartItems.length ? 'Заказать' : 'Перейти в каталог'}
          />
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
  cartList: {
    gap: 16,
  },
  cartItemBlock: {
    gap: 16,
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  emptyCartTitle: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f16,
    fontFamily: FontFamily.regular,
    fontWeight: '600',
  },
  emptyCartText: {
    color: Colors.main.cardDescriptionText,
    fontSize: FontSizes.f12,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
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
  counterSymbol: {
    color: Colors.main.cardNameText,
    fontSize: FontSizes.f18,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
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
