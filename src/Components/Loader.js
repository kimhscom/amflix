import React from "react";
import styled, { keyframes } from "styled-components";
import { device } from "./Device";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Lines = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-around;
  @media ${device.mobile} {
    width: 75px;
  }
`;

const lineAnimation = keyframes`
  0% {
    transform: none;
  }
  25% {
    transform: scaleY(2);
  }
  50% {
    transform: none;
  }
  100% {
    transform: none;
  }
`;

const Line = styled.div`
  width: 20px;
  height: 80px;
  background-color: white;
  animation: ${lineAnimation} 1s ease-in-out infinite;
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  &:nth-child(4) {
    animation-delay: 0.3s;
  }
  &:nth-child(5) {
    animation-delay: 0.4s;
  }
  @media ${device.mobile} {
    width: 10px;
    height: 40px;
  }
`;

export default () => (
  <Container>
    <Lines>
      <Line />
      <Line />
      <Line />
      <Line />
      <Line />
    </Lines>
  </Container>
);
