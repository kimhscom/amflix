import React from "react";
import { moviesApi } from "../../api";
import CollectionPresenter from "./CollectionPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      collection: null,
      error: null,
      loading: true,
      isCollection: pathname.includes("/collection/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isCollection } = this.state;
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let collection = null;
    try {
      if (isCollection) {
        ({ data: collection } = await moviesApi.collection(parsedId));
      }
    } catch (error) {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, collection });
    }
  }

  render() {
    const { collection, error, loading } = this.state;
    return (
      <CollectionPresenter
        collection={collection}
        error={error}
        loading={loading}
      />
    );
  }
}
