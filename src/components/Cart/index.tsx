import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../@types/CartItemType';
import {
  Actions,
  Item,
  ProductContainer,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer,
} from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';
import { Product } from '../../@types/ProductType';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { useState } from 'react';
import { api } from '../../utils/api';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onRemove: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAdd,
  onRemove,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirmOrder() {
    setIsLoading(true);

    await api.post('/orders', {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    });

    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmedModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 160 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.103:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onRemove(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(
                  cartItems.reduce(
                    (acc, cartItem) =>
                      acc + cartItem.quantity * cartItem.product.price,
                    0
                  )
                )}
              </Text>
            </>
          ) : (
            <Text color="#666">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
