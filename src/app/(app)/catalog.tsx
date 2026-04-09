import { CategoryFilter } from '@/components/category-filter';
import LocationHeader from '@/components/location-header';
import { SearchBar } from '@/components/search-bar';
import { Colors } from '@/constants/theme';
import { Categories } from '@/entities/Products/model/product.model';
import { loadProductsAtom } from '@/entities/Products/model/product.state';
import CoffeeGrid from '@/entities/Products/ui/coffie-grid';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CatalogScreen() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof Categories>('all');
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  const loadProducts = useSetAtom(loadProductsAtom);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText.trim());
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  useEffect(() => {
    loadProducts({
      type: selectedCategory === 'all' ? undefined : selectedCategory,
      text: debouncedSearchText || undefined,
    });
  }, [selectedCategory, debouncedSearchText, loadProducts]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerBackground}>
        <LocationHeader />

        <SearchBar placeholder="Найти кофе" value={searchText} onChangeText={setSearchText} />
      </View>
      <View style={styles.contentContainer}>
        <CategoryFilter
          categories={Object.keys(Categories) as (keyof typeof Categories)[]}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <View style={styles.gridContainer}>
          <CoffeeGrid />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.main.backgroundWhite,
  },
  headerBackground: {
    height: 170,
    backgroundColor: Colors.main.backgroundBlack,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  gridContainer: {
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 30,
    paddingTop: 16,
  },
});
