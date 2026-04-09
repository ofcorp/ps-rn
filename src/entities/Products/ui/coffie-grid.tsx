import { Colors } from '@/constants/theme';
import { useAtomValue } from 'jotai';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { IProduct } from '../model/product.model';
import { productAtom } from '../model/product.state';
import { CoffeeCard } from './coffie-card';

export default function CoffeeGrid() {
  const { products, isLoading, error } = useAtomValue(productAtom);

  if (error) {
    return <Text style={{ color: 'red' }}>Ошибка загрузки продуктов: {error}</Text>;
  }

  if (!products || products.length === 0) {
    return <Text>Продукты не найдены.</Text>;
  }

  const renderCard = ({ item }: { item: IProduct }) => {
    return (
      <View style={styles.cardPlaceholder}>
        <CoffeeCard {...item} />
      </View>
    );
  };

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl
            tintColor={Colors.main.button}
            titleColor={Colors.main.button}
            refreshing={isLoading}
          />
        }
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCard}
        numColumns={2}
        columnWrapperStyle={styles.rowContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    marginBottom: 16,
  },
  cardPlaceholder: {
    flex: 1,
  },
  content: {
    paddingBottom: 110,
  },
  activity: {},
});
