import React, { Component } from 'react';

class NewsItem extends Component {
    render() {
        let { name, designation, imageUrl, absolute_magnitude_h, neodetail, close_approach_date, close_approach_date_full } = this.props;
        return (
            <div className="my-3">
                <div className="card" style={{ width: "20rem" }}>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">name {name}</h5>
                        <p className="card-text">designation {designation}</p>
                        <p className="card-text">absolute_magnitude_h {absolute_magnitude_h}</p>
                        <p className="card-text">close_approach_date {close_approach_date}</p>
                        <p className="card-text">close_approach_date_full {close_approach_date_full}</p>
                        <a href={neodetail} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsItem;