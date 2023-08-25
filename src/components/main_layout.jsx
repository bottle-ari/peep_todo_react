import styled from 'styled-components';
import Sidebar from './sidebar_layout';

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const MainLayout = ({ children }) => {
  return (
    <Container>
      <Sidebar />
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default MainLayout;
