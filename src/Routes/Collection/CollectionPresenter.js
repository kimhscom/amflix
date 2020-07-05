import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { device } from "../../Components/Device";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  position: relative;
  padding: 50px;
  @media ${device.mobile} {
    padding: 20px;
  }
  @media (min-width: 700px) and (max-width: 1100px) {
    padding: 40px;
  }
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  @media ${device.laptop} {
    flex-direction: column;
    align-items: center;
  }
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  @media ${device.laptop} {
    display: none;
  }
`;

const Data = styled.div`
  width: 70%;
  padding: 0px 20px;
  overflow: scroll;
  @media ${device.laptop} {
    width: 100%;
    padding: 0px;
  }
`;

const Title = styled.h3`
  font-size: 32px;
  @media ${device.mobile} {
    font-size: 22px;
  }
`;

const Overview = styled.p`
  width: 100%;
  font-size: 18px;
  line-height: 1.5;
  opacity: 0.7;
  margin-top: 20px;
  @media ${device.mobile} {
    font-size: 12px;
  }
`;

const MoviesContainer = styled.div`
  margin-top: 20px;
`;

const SubTitle = styled.h4`
  font-size: 22px;
  margin-bottom: 10px;
  @media ${device.mobile} {
    font-size: 15px;
  }
`;

const CollectionPresenter = ({ collection, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Amflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message color="#e74c3c" text="Page does not exist" />
  ) : (
    <Container>
      <Helmet>
        <title>{collection.name} | Amflix</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${collection.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            collection.poster_path
              ? `https://image.tmdb.org/t/p/original${collection.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{collection.name}</Title>
          <Overview>{collection.overview}</Overview>
          <MoviesContainer>
            <SubTitle>Movies</SubTitle>
            {collection.parts && collection.parts.length > 0 && (
              <Carousel
                arrows
                slidesPerScroll={5}
                slidesPerPage={5}
                breakpoints={{
                  640: {
                    itemWidth: 115,
                    arrows: false,
                  },
                  900: {
                    itemWidth: 160,
                    arrows: false,
                  },
                }}
              >
                {collection.parts.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={
                      movie.release_date && movie.release_date.substring(0, 4)
                    }
                    isMovie={true}
                  />
                ))}
              </Carousel>
            )}
          </MoviesContainer>
        </Data>
      </Content>
    </Container>
  );

CollectionPresenter.propTypes = {
  collection: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default CollectionPresenter;
