import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function CatalogScreen() {
  return (
    <View>
      <Text>Каталог</Text>
      <Link href="/catalog/42">Перейти к позиции 42</Link>
    </View>
  );
}
