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

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  position: relative;
  padding: 50px;
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
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  padding: 0px 20px;
  overflow: scroll;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const Imdb = styled.a`
  background-color: #f5c518;
  color: #000000;
  font-size: 32px;
  font-weight: 700;
  padding: 0px 20px;
  border-radius: 25px;
  margin-left: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 18px;
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
`;

const TabContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const VideoContainer = styled.div`
  width: 800px;
`;

const Iframe = styled.iframe``;

const CompanyList = styled.ul`
  line-height: 1.5;
  padding: 0 10px;
`;

const CompanyName = styled.li`
  font-size: 22px;
`;

const CountryList = styled.ul`
  line-height: 1.5;
  padding: 0 10px;
`;

const CountryName = styled.li`
  font-size: 22px;
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
`;

const CollectionTitle = styled.h4`
  font-size: 22px;
`;

const CollectionName = styled.span`
  font-size: 12px;
  margin-top: 10px;
`;

const SectionContainer = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h4`
  font-size: 22px;
  margin-bottom: 10px;
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
`;

const SectionName = styled.span`
  width: 150px;
  font-size: 12px;
  margin-top: 10px;
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
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
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
          <TabContainer>
            <Tabs>
              <TabList>
                <Tab>Videos</Tab>
                <Tab>Companies</Tab>
                <Tab>Countries</Tab>
              </TabList>
              <TabPanel>
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
              </TabPanel>
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
                  <Carousel arrows slidesPerScroll={6} slidesPerPage={6}>
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
                <Carousel arrows slidesPerScroll={6} slidesPerPage={6}>
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
