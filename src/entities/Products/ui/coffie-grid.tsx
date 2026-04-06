import { router } from 'expo-router';
import { useAtomValue } from 'jotai';
import { StyleSheet, Text, View } from 'react-native';
import { productAtom } from '../model/product.state';
import { CoffeeCard } from './coffie-card';

export default function CoffeeGrid() {
  const { products, isLoading, error } = useAtomValue(productAtom);

  if (error) {
    return <Text style={{ color: 'red' }}>Ошибка загрузки продуктов: {error}</Text>;
  }

  if (isLoading) {
    return <Text>Загрузка продуктов...</Text>;
  }

  if (!products || products.length === 0) {
    return <Text>Продукты не найдены.</Text>;
  }

  const rows = [];
  for (let i = 0; i < products.length; i += 2) {
    rows.push(
      <View key={`row-${i}`} style={styles.rowContainer}>
        <View style={styles.cardPlaceholder}>
          <CoffeeCard
            image={products[i].image}
            name={products[i].name}
            subTitle={products[i].subTitle}
            price={products[i].price}
            rating={products[i].rating}
            onAddPress={() => router.push(`/product/${products[i].id}`)}
          />
        </View>
        {i + 1 < products.length && (
          <View style={styles.cardPlaceholder}>
            <CoffeeCard
              image={products[i + 1].image}
              name={products[i + 1].name}
              subTitle={products[i + 1].subTitle}
              price={products[i + 1].price}
              rating={products[i + 1].rating}
              onAddPress={() => router.push(`/product/${products[i + 1].id}`)}
            />
          </View>
        )}
      </View>,
    );
  }
  return <View>{rows}</View>;
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  cardPlaceholder: {
    flex: 1,
  },
});
