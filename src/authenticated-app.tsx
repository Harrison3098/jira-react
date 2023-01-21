/**
 * @Description	：authenticated-app.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:20:15
 * @FilePath	: jira/src/authenticated-app.tsx
 */
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header as={"header"} between={true}>
        <HeaderLeft gap={true}>
          <h3>LOGO</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>

        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>

      <Nav>nav</Nav>

      <Main>已登录</Main>

      <Aside>aside</Aside>

      <Footer>footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-gap: 5rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
`;

// grid-area 用来给grid子元素起名字
const [Header, Main, Nav, Aside, Footer] = [
  styled(Row)`
    grid-area: header;
  `,
  styled.main`
    grid-area: main;
  `,
  styled.nav`
    grid-area: nav;
  `,
  styled.aside`
    grid-area: aside;
  `,
  styled.footer`
    grid-area: footer;
  `,
];

const [HeaderLeft, HeaderRight] = [styled(Row)``, styled.div``];
