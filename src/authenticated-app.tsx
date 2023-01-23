/**
 * @Description	：authenticated-app.tsx
 * @Author     	: sagit_zhx
 * @Date       	: 2023-01-20 星期五 02:20:15
 * @FilePath	: jira/src/authenticated-app.tsx
 */
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components";
import { ProjectList } from "screens/project-list";
import { ReactComponent as Logo } from "logo.svg";
import { Button, Dropdown, MenuProps } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();

  const dropdownItems: MenuProps["items"] = [
    {
      key: "logout",
      label: (
        <Button type={"link"} onClick={logout}>
          登出
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Header as={"header"} between={true}>
        <HeaderLeft gap={true}>
          <Logo width={"8rem"} color={"rgb(38, 132, 255)"}></Logo>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>

        <HeaderRight>
          <Dropdown menu={{ items: dropdownItems }}>
            <Button type={"link"}>hi, {user?.name}!</Button>
          </Dropdown>
        </HeaderRight>
      </Header>

      {/*<Nav>nav</Nav>*/}

      <Main>
        <ProjectList></ProjectList>
      </Main>

      {/*<Aside>aside</Aside>*/}

      {/*<Footer>footer</Footer>*/}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 6rem 1fr;
  grid-template-columns: 1fr;
  grid-gap: 5rem;
  grid-template-areas:
    "header"
    "main";
  //grid-template-areas:
  //  "header header header"
  //  "nav main aside"
  //  "footer footer footer";
`;

// grid-area 用来给grid子元素起名字
const [Header, Main, Nav, Aside, Footer] = [
  styled(Row)`
    grid-area: header;
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
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
