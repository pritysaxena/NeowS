import React, { Component } from "react";
import Card from "./components/card";
import Pagination from "./components/pagination";
import { apiKey } from "./utils/constants";
import { fetchApi } from "./utils/helpers";
class News extends Component {
  constructor() {
    super();
    this.state = {
      nasaDatas: [],
      currentNasaDatas: [],
      currentPage: null,
      totalPages: null,
      inputDate1: "",
      inputDate2: "",
    };
  }

  async componentDidMount() {
    let url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey.key}`;
    let response = await fetchApi(url);
    this.setState({ nasaDatas: response.near_earth_objects });
  }

  onPageChanged = (data) => {
    const { nasaDatas } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentNasaDatas = nasaDatas.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentNasaDatas, totalPages });
  };

  handleChange1 = (event) => {
    console.log(event.target.value);
    this.setState({ inputDate1: event.target.value });
  };
  handleChange2 = (event) => {
    this.setState({ inputDate2: event.target.value });
  };

  handleSubmit = (event) => {
    let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.state.inputDate1}&end_date=${this.state.inputDate2}&api_key=${apiKey.key}`;
    fetchApi(url).then((res) => {
      this.setState({ nasaDatas: res.near_earth_objects });
    });
    event.preventDefault();
  };

  render() {
    const { nasaDatas, currentNasaDatas, currentPage, totalPages } = this.state;
    const totalNasaDatas = nasaDatas.length;

    if (totalNasaDatas === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : "",
    ]
      .join(" ")
      .trim();
    return (
      <div className="container my-3">
        <h1>Neo feed</h1>
        <form>
          Select Start Date
          <input type="date" onChange={this.handleChange1} />
          Select End Date
          <input type="date" onChange={this.handleChange2} />
          <button onClick={this.handleSubmit}>Search</button>
        </form>

        <div className="row">
          {currentNasaDatas.map((elements) => {
            return (
              <div className="col-md-4" key={elements.id}>
                <Card
                  name={elements.name}
                  neodetail={elements.nasa_jpl_url}
                  absolute_magnitude_h={elements.absolute_magnitude_h}
                  designation={elements.designation}
                  imageUrl={"https://www.w3schools.com/css/img_5terre.jpg"}
                />
              </div>
            );
          })}
        </div>

        <div className="d-flex flex-row align-items-center">
          <h2 className={headerClass}>
            <strong className="text-secondary">{totalNasaDatas}</strong> Posts
          </h2>
        </div>
        <div className="d-flex flex-row py-4 align-items-center">
          <Pagination
            totalRecords={totalNasaDatas}
            pageLimit={10}
            pageNeighbours={1}
            onPageChanged={this.onPageChanged}
          />
        </div>
        {currentPage && (
          <span className="current-page d-inline-block h-100 pl-4 text-secondary">
            Page <span className="font-weight-bold">{currentPage}</span> /{" "}
            <span className="font-weight-bold">{totalPages}</span>
          </span>
        )}
      </div>
    );
  }
}
export default News;
