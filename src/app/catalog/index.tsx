import { CategoryFilter } from '@/components/category-filter';
import LocationHeader from '@/components/location-header';
import { SearchBar } from '@/components/search-bar';
import { Colors } from '@/constants/theme';
import { Categories } from '@/entities/Products/model/product.model';
import { loadProductsAtom, productAtom } from '@/entities/Products/model/product.state';
import CoffeeGrid from '@/entities/Products/ui/coffie-grid';
import { Link } from 'expo-router';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet } from 'react-native';

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
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBackground} />

        <View style={styles.contentContainer}>
          <LocationHeader />

          <SearchBar placeholder="Найти кофе" value={searchText} onChangeText={setSearchText} />

          <CategoryFilter
            categories={Object.keys(Categories) as (keyof typeof Categories)[]}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <View style={styles.gridContainer}>
            <CoffeeGrid />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.main.backgroundWhite,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.main.backgroundWhite,
  },
  headerBackground: {
    height: 150,
    backgroundColor: Colors.main.backgroundBlack,
  },
  contentContainer: {
    paddingVertical: 16,
  },
  gridContainer: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    gap: 16,
  },
});
