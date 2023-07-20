import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    
    };
  }

  async componentDidMount() {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=db6a8a37f2ab4b5a8ff422027dc0a574&page=1&pageSize=21"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ articles: data.articles,totalResults:data.totalResults });
      });
    // let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=db6a8a37f2ab4b5a8ff422027dc0a574";
    // let data = await fetch(url);
    // console.log(data)
    // let pasrsedData =  data.json;
    // this.setState({articles:pasrsedData.articles})
  }

  handlePreviousClick = () => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=db6a8a37f2ab4b5a8ff422027dc0a574&page=${
        this.state.page - 1
      }&pageSize=21`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ 
          page: this.state.page - 1,
          articles: data.articles 
        });
      });
  };

 handleNextClick = async () => {
  if(this.state.page + 1>Math.ceil(this.state.totalResults/20)){

  }
  else{
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=db6a8a37f2ab4b5a8ff422027dc0a574&page=${
        this.state.page + 1
      }&pageSize=21`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ 
          page: this.state.page + 1,
          articles: data.articles 
        });
      });
  }
    

  };
  render() {
    return (
      <div className="container my-3">
        <h1>Daily News - Top Headlines</h1>
        <div className="row">
          {this.state.articles &&
            this.state.articles.map((element) => {
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
            })}
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
          disabled={this.state.page>=Math.ceil(this.state.totalResults/20)}
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
