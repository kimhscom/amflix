import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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
  width: 35%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 65%;
  margin-left: 10px;
  overflow: scroll;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const Imdb = styled.a`
  width: 60px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5c518;
  color: #000000;
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  margin-left: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 18px;
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
  display: flex;
  overflow: auto;
  margin-top: 10px;
`;

const Iframe = styled.iframe`
  width: 300px;
  height: 169px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

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

const DetailPresenter = ({ result, external, loading, error }) =>
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
          <TitleContainer>
            <Title>{result.title ? result.title : result.name}</Title>
            <Imdb
              href={`https://www.imdb.com/title/${external.imdb_id}`}
              target="_blank"
            >
              IMDB
            </Imdb>
          </TitleContainer>
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
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <TabContainer>
            <Tabs>
              <TabList>
                <Tab>Vidoes</Tab>
                <Tab>Companies</Tab>
                <Tab>Countries</Tab>
              </TabList>
              <TabPanel>
                <VideoContainer>
                  {result.videos.results &&
                    result.videos.results.map((video, index) => (
                      <Iframe
                        key={index}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        frameborder="0"
                      ></Iframe>
                    ))}
                </VideoContainer>
              </TabPanel>
              <TabPanel>
                <CompanyList>
                  {result.production_companies.map((company) => (
                    <CompanyName>• {company.name}</CompanyName>
                  ))}
                </CompanyList>
              </TabPanel>
              <TabPanel>
                <CountryList>
                  {result.production_countries
                    ? result.production_countries.map((country) => (
                        <CountryName>• {country.name}</CountryName>
                      ))
                    : result.origin_country.map((country) => (
                        <CountryName>• {country}</CountryName>
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
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
