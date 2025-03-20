import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
} from './styles';

import { Menu } from '../components/Menu';
import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { useState } from 'react';
import { Cart } from '../components/Cart';
import { CartItem } from '../@types/CartItemType';
import { Product } from '../@types/ProductType';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
        <MenuContainer>
          <Menu onAddToCard={handleAddToCart} />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={handleOpenTableModal}>Novo Pedido</Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onRemove={handleRemoveFromCart}
              onConfirmOrder={handleResetOrder}
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
