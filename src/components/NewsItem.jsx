import React, { Component } from "react";

export class NewsItem extends Component {

  render() {
    let {title,description, imageUrl,newsUrl} = this.props
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img className="card-img-top" src={imageUrl?imageUrl:"https://ichef.bbci.co.uk/news/1024/branded_news/1FE8/production/_130386180_6644eeb928bdf0dd28c7ae93dc33127fab7c530e0_0_4000_26671000x667.jpg"} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <a href={newsUrl} target="_blank" className="btn bth-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
