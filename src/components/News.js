import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();
    this.state = { articles: [], loading: false, page: 1 };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=f61686f3257f45378d263a1035a6a021&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResult: parsedData.totalResults,
    });
  }

  handlePreClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=f61686f3257f45378d263a1035a6a021&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResult / 20))) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=f61686f3257f45378d263a1035a6a021&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h2 className="text-center">NewsMinkey - Top Headlines</h2>
          <div className="row">
            {this.state.articles &&
              this.state.articles.map((element) => {
                return (
                  <div
                    className="col-md-4"
                    key={element.url ? element.url : ""}
                  >
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imgUrl={element.urlToImage ? element.urlToImage : ""}
                      newsUrl={element.url ? element.url : ""}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePreClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
              disabled={
                this.state.page + 1 > Math.ceil(this.state.totalResult / 20)
              }
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}
