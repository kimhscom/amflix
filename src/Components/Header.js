import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import "./Fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  padding: 0px 10px;
`;

const Logo = styled.img`
  width: 200px;
  height: 50px;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid
    ${(props) => (props.current ? "#e74c3c" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <SLink to="/">
      <Logo src={logo} />
    </SLink>
    <List>
      <Item current={pathname === "/"}>
        <FontAwesomeIcon icon="film" size="2x" />
        <SLink to="/">Movies</SLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <FontAwesomeIcon icon="tv" size="2x" />
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <FontAwesomeIcon icon="search" size="2x" />
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
));
