import React, { Component } from 'react';
import NewsItem from './NewsItem';
//import data from './Sample.json';

class News extends Component {
    constructor() {
        super();
        this.state = {
            //products: data.near_earth_objects
            products: []
        };
    }

    async componentDidMount() {
        let url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=xeFoON5djhfw9S56PTh621eYdHMCK9s3HMJwMqIf";
        let data1 = await fetch(url);
        let parsedData = await data1.json();
        console.log("222222" + parsedData);
        this.setState({ products: parsedData.near_earth_objects })

    }

    render() {
        return (
            <div className="container my-3">
                <h1>Neo feed</h1>
                <div className="row">
                    {this.state.products.map((elements) => {
                        return <div className="col-md-4" key={elements.id}>
                            <NewsItem name={elements.name} neodetail={elements.nasa_jpl_url} absolute_magnitude_h={elements.absolute_magnitude_h} designation={elements.designation} imageUrl={"https://www.w3schools.com/css/img_5terre.jpg"}
                            />
                            {elements.close_approach_data.map((ele) => {
                                return <div key={ele.close_approach_date}>
                                    <NewsItem close_approach_date={ele.close_approach_date} close_approach_date_full={ele.close_approach_date_full} />

                                </div>
                            })}
                        </div>
                    })}
                </div>

            </div>
        )
    }
}
export default News;
