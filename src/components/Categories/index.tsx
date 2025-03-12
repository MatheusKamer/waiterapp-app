import { FlatList } from 'react-native';

import { Text } from '../Text';
import { Category, Icon } from './styles';
import { categories } from '../../mocks/categories';

export function Categories() {
  return (
    <FlatList
      horizontal
      data={categories}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category) => category._id}
      renderItem={({ item: category }) => (
        <Category>
          <Icon>
            <Text>{category._id}</Text>
          </Icon>
          <Text>{category.name}</Text>
        </Category>
      )}
    />
  );
}
