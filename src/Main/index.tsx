import { ActivityIndicator } from 'react-native';

import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer,
} from './styles';

import { Menu } from '../components/Menu';
import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { useEffect, useState } from 'react';
import { Cart } from '../components/Cart';
import { CartItem } from '../@types/CartItemType';
import { Product } from '../@types/ProductType';

import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../@types/CategoryType';

import { api } from '../utils/api';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([api.get('/categories'), api.get('/products')]).then(
      ([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      }
    );
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = categoryId
      ? `/categories/${categoryId}/products`
      : '/products';

    setIsLoadingProducts(true);

    const { data } = await api.get(route);

    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleOpenTableModal() {
    setIsTableModalVisible(true);
  }

  function handleCloseTableModal() {
    setIsTableModalVisible(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    handleCloseTableModal();
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const productIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (productIndex !== -1) {
        prevState[productIndex].quantity += 1;
        return [...prevState];
      }

      return [
        ...prevState,
        {
          quantity: 1,
          product,
        },
      ];
    });
  }

  function handleRemoveFromCart(product: Product) {
    setCartItems((prevState) => {
      const productIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[productIndex];

      if (item.quantity === 1) {
        const newCartItems = [...prevState];
        newCartItems.splice(productIndex, 1);

        return newCartItems;
      }

      item.quantity -= 1;
      return [...prevState];
    });
  }

  return (
    <>
      <Container>
        <Header table={selectedTable} onCancelOrder={handleResetOrder} />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#D73035" size="large" />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#D73035" size="large" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu onAddToCard={handleAddToCart} products={products} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666" size={24}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={handleOpenTableModal} disabled={isLoading}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onRemove={handleRemoveFromCart}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={handleCloseTableModal}
        onSave={handleSaveTable}
      />
    </>
  );
}
