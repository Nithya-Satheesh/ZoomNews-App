import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `ZoomNews - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async componentDidMount() {
    this.setState({ loading: true });
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=db6a8a37f2ab4b5a8ff422027dc0a574&page=${this.state.page}&pageSize=${this.props.pageSize}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          articles: data.articles,
          totalResults: data.totalResults,
          loading: false,
        });
      });
  }

  handlePreviousClick = () => {
    this.setState({ loading: true });
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=db6a8a37f2ab4b5a8ff422027dc0a574&page=${
        this.state.page - 1
      }&pageSize=${this.props.pageSize}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          page: this.state.page - 1,
          articles: data.articles,
          loading: false,
        });
      });
  };

  handleNextClick = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      this.setState({ loading: true });

      fetch(
        `https://newsapi.org/v2/top-headlines?country=${
          this.props.country
        }&category=${
          this.props.category
        }&apiKey=db6a8a37f2ab4b5a8ff422027dc0a574&page=${
          this.state.page + 1
        }&pageSize=${this.props.pageSize}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            page: this.state.page + 1,
            articles: data.articles,
            loading: false,
          });
        });
    }
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "90px 0 35px 0" }}>
          Daily News - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading
            ? this.state.articles
              ? this.state.articles.map((element) => {
                  return (
                    <div className="col md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 48) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 82)
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })
              : null
            : null}
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
