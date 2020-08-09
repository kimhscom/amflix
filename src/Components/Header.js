import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import "./Fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { device } from "./Device";

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
  @media ${device.mobile} {
    width: 100px;
    height: 25px;
  }
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 100px;
  height: 50px;
  border-bottom: 5px solid
    ${(props) => (props.current ? "#e74c3c" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
  @media ${device.mobile} {
    width: 65px;
    border-bottom: 2px solid
      ${(props) => (props.current ? "#e74c3c" : "transparent")};
  }
`;

const SLink = styled(Link)`
  height: 100%;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.mobile} {
    font-size: 12px;
  }
`;

const TabName = styled.span`
  margin-left: 10px;
  @media ${device.mobile} {
    margin-left: 5px;
  }
`;

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <SLink to="/">
      <Logo src={logo} />
    </SLink>
    <List>
      <Item
        current={
          pathname === "/" ||
          pathname.includes("/movie") ||
          pathname.includes("/collection")
        }
      >
        <SLink to="/">
          <FontAwesomeIcon icon="film" />
          <TabName>Movies</TabName>
        </SLink>
      </Item>
      <Item current={pathname === "/tv" || pathname.includes("/show")}>
        <SLink to="/tv">
          <FontAwesomeIcon icon="tv" />
          <TabName>TV</TabName>
        </SLink>
      </Item>
      <Item current={pathname === "/search"}>
        <SLink to="/search">
          <FontAwesomeIcon icon="search" />
          <TabName>Search</TabName>
        </SLink>
      </Item>
    </List>
  </Header>
));
