import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      external: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let external = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
        ({ data: external } = await moviesApi.external(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({ data: external } = await tvApi.external(parsedId));
      }
    } catch (error) {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, external });
    }
  }

  render() {
    const { result, external, error, loading } = this.state;
    return (
      <DetailPresenter
        result={result}
        external={external}
        loading={loading}
        error={error}
      />
    );
  }
}
