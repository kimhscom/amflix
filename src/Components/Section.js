import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const CarouselColumn = styled.div`
  margin-top: 20px;
`;

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 5, itemsToScroll: 5 },
  { width: 1150, itemsToShow: 10, itemsToScroll: 10 },
];

const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <CarouselColumn>
      <Carousel breakPoints={breakPoints} pagination={false}>
        {children}
      </Carousel>
    </CarouselColumn>
  </Container>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
