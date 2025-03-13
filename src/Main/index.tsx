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

export function Main() {
  return (
    <>
      <Container>
        <Header />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          <Button onPress={() => alert('Novo pedido')} disabled={true}>
            Novo Pedido
          </Button>
        </FooterContainer>
      </Footer>
    </>
  );
}
