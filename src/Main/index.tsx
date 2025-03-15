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

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');

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

  function handleCancelOrder() {
    setSelectedTable('');
  }

  return (
    <>
      <Container>
        <Header table={selectedTable} onCancelOrder={handleCancelOrder} />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {selectedTable ? (
            <Button onPress={handleOpenTableModal}>Alterar mesa</Button>
          ) : (
            <Button onPress={handleOpenTableModal}>Novo Pedido</Button>
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
