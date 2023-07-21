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

  static PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    fetch(
      `https://newsapi.org/v2/top-headlines?country = ${this.props.country}&category = ${this.props.category}&apiKey=db6a8a37f2ab4b5a8ff422027dc0a574&page=1&pageSize=${this.props.pageSize}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          articles: data.articles,
          totalResults: data.totalResults,
          loading: false,
        });
      });
    // let url = "https://newsapi.org/v2/top-headlines?country = ${this.props.country}&category = ${this.props.category}&apiKey=db6a8a37f2ab4b5a8ff422027dc0a574";
    // let data = await fetch(url);
    // console.log(data)
    // let pasrsedData =  data.json;
    // this.setState({articles:pasrsedData.articles})
  }

  handlePreviousClick = () => {
    this.setState({ loading: true });
    fetch(
      `https://newsapi.org/v2/top-headlines?country = ${
        this.props.country
      }&category = ${
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
        `https://newsapi.org/v2/top-headlines?country = ${
          this.props.country
        }&category = ${
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
        <h1 className="text-center">Daily News - Top Headlines</h1>
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
