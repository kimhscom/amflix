import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "./Device";

const Container = styled.div`
  font-size: 12px;
  @media ${device.mobile} {
    font-size: 8px;
  }
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: 150px;
  height: 225px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
  @media ${device.mobile} {
    width: 105px;
    height: 158px;
  }
`;

const Rating = styled.span`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 5px;
  padding: 0px 5px;
  opacity: 0;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  width: 150px;
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
  @media ${device.mobile} {
    width: 105px;
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const Stars = styled.span`
  color: #ffe228;
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Rating>
          <Stars role="img" aria-label="rating">
            {rating >= 0 && rating < 2 && "★☆☆☆☆"}
            {rating >= 2 && rating < 5 && "★★☆☆☆"}
            {rating >= 5 && rating < 7 && "★★★☆☆"}
            {rating >= 7 && rating < 9 && "★★★★☆"}
            {rating >= 9 && rating <= 10 && "★★★★★"}
          </Stars>{" "}
          {rating}
        </Rating>
      </ImageContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;
