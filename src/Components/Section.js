import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

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

const Section = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <CarouselColumn>
      <Carousel
        arrows
        slidesPerScroll={10}
        slidesPerPage={10}
        breakpoints={{
          640: {
            slidesPerPage: 2,
            arrows: false,
          },
          800: {
            slidesPerScroll: 4,
            slidesPerPage: 4,
            arrows: true,
          },
          1200: {
            slidesPerScroll: 5,
            slidesPerPage: 5,
            arrows: true,
          },
        }}
      >
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
