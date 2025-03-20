import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';

import { Container, OkButton } from './styles';

interface OrderConfirmedModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function OrderConfirmedModal({
  isVisible,
  onClose,
}: OrderConfirmedModalProps) {
  return (
    <Modal visible={isVisible} animationType="fade">
      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 8 }}>
          O pedido já entrou na fila de produção!
        </Text>

        <OkButton onPress={onClose}>
          <Text color="#d73035" weight="600">
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
