import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';

interface HeaderProps {
  table: string;
  onCancelOrder: () => void;
}

export function Header({ table, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {table ? (
        <Content>
          <OrderHeader>
            <Text size={24} weight="600">
              Pedido
            </Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text color="#D73035" weight="600" size={14}>
                cancelar pedido
              </Text>
            </TouchableOpacity>
          </OrderHeader>

          <Table>
            <Text color="#666">Mesa {table}</Text>
          </Table>
        </Content>
      ) : (
        <>
          <Text size={14} opacity={0.9}>
            Bem-vindo(a) ao
          </Text>
          <Text size={24} weight={700}>
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}
    </Container>
  );
}
