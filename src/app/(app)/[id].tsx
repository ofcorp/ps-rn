import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function CatalogItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Позиция в каталоге: {id}</Text>
    </View>
  );
}
