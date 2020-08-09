import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Carousel from "@brainhubeu/react-carousel";
import "react-tabs/style/react-tabs.css";
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

const Imdb = styled.a`
  background-color: #f5c518;
  color: #000000;
  font-size: 32px;
  font-weight: 700;
  padding: 0px 20px;
  border-radius: 25px;
  margin-left: 10px;
  @media ${device.mobile} {
    font-size: 22px;
  }
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 18px;
  @media ${device.mobile} {
    font-size: 12px;
  }
`;

const Stars = styled.span`
  color: #ffe228;
  margin-right: 5px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  width: 100%;
  font-size: 18px;
  line-height: 1.5;
  opacity: 0.7;
  @media ${device.mobile} {
    font-size: 12px;
  }
`;

const TabContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const VideoContainer = styled.div`
  width: 800px;
  @media ${device.mobile} {
    width: 280px;
  }
  @media (min-width: 700px) and (max-width: 1100px) {
    width: 680px;
  }
`;

const Iframe = styled.iframe`
  @media ${device.mobile} {
    width: 240px;
    height: 135px;
  }
`;

const CompanyList = styled.ul`
  line-height: 1.5;
  padding: 0 10px;
`;

const CompanyName = styled.li`
  font-size: 22px;
  @media ${device.mobile} {
    font-size: 12px;
  }
`;

const CountryList = styled.ul`
  line-height: 1.5;
  padding: 0 10px;
`;

const CountryName = styled.li`
  font-size: 22px;
  @media ${device.mobile} {
    font-size: 12px;
  }
`;

const CollectionContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const CollectionCover = styled.img`
  width: 100%;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  margin-top: 10px;
  @media ${device.mobile} {
    width: 105px;
  }
`;

const CollectionTitle = styled.h4`
  font-size: 22px;
  @media ${device.mobile} {
    font-size: 15px;
  }
`;

const CollectionName = styled.span`
  font-size: 12px;
  margin-top: 10px;
  @media ${device.mobile} {
    display: none;
  }
`;

const SectionContainer = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h4`
  font-size: 22px;
  margin-bottom: 10px;
  @media ${device.mobile} {
    font-size: 15px;
  }
`;

const SectiionItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionCover = styled.img`
  width: 150px;
  height: 225px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  @media ${device.mobile} {
    width: 105px;
    height: 158px;
  }
`;

const SectionName = styled.span`
  width: 150px;
  font-size: 12px;
  margin-top: 10px;
  @media ${device.mobile} {
    width: 105px;
    font-size: 8px;
  }
`;

const DetailPresenter = ({ result, external, credits, loading, error }) =>
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
        <title>{result.title ? result.title : result.name} | Amflix</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.title ? result.title : result.name}
            {
              <Imdb
                href={`https://www.imdb.com/title/${external.imdb_id}`}
                target="_blank"
              >
                IMDB
              </Imdb>
            }
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date
                ? result.first_air_date.substring(0, 4)
                : "TBD"}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime && result.runtime > 0
                ? result.runtime
                : result.runtime === 0
                ? "0"
                : result.episode_run_time && result.episode_run_time > 0
                ? result.episode_run_time[0]
                : "0"}{" "}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>
              {
                <Stars role="img" aria-label="rating">
                  {result.vote_average >= 0 &&
                    result.vote_average < 2 &&
                    "★☆☆☆☆"}
                  {result.vote_average >= 2 &&
                    result.vote_average < 5 &&
                    "★★☆☆☆"}
                  {result.vote_average >= 5 &&
                    result.vote_average < 7 &&
                    "★★★☆☆"}
                  {result.vote_average >= 7 &&
                    result.vote_average < 9 &&
                    "★★★★☆"}
                  {result.vote_average >= 9 &&
                    result.vote_average <= 10 &&
                    "★★★★★"}
                </Stars>
              }
              {result.vote_average}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <SectionContainer>
            <SectionTitle>Videos</SectionTitle>
            <VideoContainer>
              <Carousel arrows slidesPerPage={1}>
                {result.videos.results &&
                  result.videos.results.map((video, index) => (
                    <Iframe
                      key={index}
                      width="640"
                      height="360"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      frameborder="0"
                    ></Iframe>
                  ))}
              </Carousel>
            </VideoContainer>
          </SectionContainer>
          {result.belongs_to_collection ? (
            <CollectionContainer>
              <CollectionTitle>Collection</CollectionTitle>
              <Link to={`/collection/${result.belongs_to_collection.id}`}>
                <CollectionCover
                  src={
                    result.belongs_to_collection.poster_path
                      ? `https://image.tmdb.org/t/p/original${result.belongs_to_collection.poster_path}`
                      : require("../../assets/noPosterSmall.png")
                  }
                />
                <CollectionName>
                  {result.belongs_to_collection.name}
                </CollectionName>
              </Link>
            </CollectionContainer>
          ) : null}
          {result.seasons ? (
            <SectionContainer>
              <SectionTitle>Seasons</SectionTitle>
              <>
                {result.seasons && result.seasons.length > 0 && (
                  <Carousel
                    arrows
                    slidesPerScroll={6}
                    slidesPerPage={6}
                    breakpoints={{
                      640: {
                        itemWidth: 115,
                        arrows: false,
                      },
                      900: {
                        itemWidth: 160,
                        arrows: false,
                      },
                      1400: {
                        slidesPerScroll: 4,
                        slidesPerPage: 4,
                      },
                    }}
                  >
                    {result.seasons.map((tv) => (
                      <SectiionItem>
                        <SectionCover
                          src={
                            tv.poster_path
                              ? `https://image.tmdb.org/t/p/original${tv.poster_path}`
                              : require("../../assets/noPosterSmall.png")
                          }
                        />
                        <SectionName>{tv.name}</SectionName>
                      </SectiionItem>
                    ))}
                  </Carousel>
                )}
              </>
            </SectionContainer>
          ) : null}
          <SectionContainer>
            <SectionTitle>Cast</SectionTitle>
            <>
              {credits.cast && credits.cast.length > 0 && (
                <Carousel
                  arrows
                  slidesPerScroll={6}
                  slidesPerPage={6}
                  breakpoints={{
                    640: {
                      itemWidth: 115,
                      arrows: false,
                    },
                    900: {
                      itemWidth: 160,
                      arrows: false,
                    },
                    1400: {
                      slidesPerScroll: 4,
                      slidesPerPage: 4,
                    },
                  }}
                >
                  {credits.cast.map((people) => (
                    <SectiionItem>
                      <SectionCover
                        src={
                          people.profile_path
                            ? `https://image.tmdb.org/t/p/original${people.profile_path}`
                            : require("../../assets/noPosterSmall.png")
                        }
                      />
                      <SectionName>Character: {people.character}</SectionName>
                      <SectionName>Name: {people.name}</SectionName>
                    </SectiionItem>
                  ))}
                </Carousel>
              )}
            </>
          </SectionContainer>
          <TabContainer>
            <Tabs>
              <TabList>
                <Tab>Companies</Tab>
                <Tab>Countries</Tab>
              </TabList>
              <TabPanel>
                <CompanyList>
                  {result.production_companies.map((company, index) => (
                    <CompanyName key={index}>• {company.name}</CompanyName>
                  ))}
                </CompanyList>
              </TabPanel>
              <TabPanel>
                <CountryList>
                  {result.production_countries
                    ? result.production_countries.map((country, index) => (
                        <CountryName key={index}>• {country.name}</CountryName>
                      ))
                    : result.origin_country.map((country, index) => (
                        <CountryName key={index}>• {country}</CountryName>
                      ))}
                </CountryList>
              </TabPanel>
            </Tabs>
          </TabContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  external: PropTypes.object,
  credits: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
