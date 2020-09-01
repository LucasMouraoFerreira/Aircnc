import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Place = (props) => (
  <div class="card m-2">
    <img class="card-img-top" src={props.place.image} alt="Card " />
    <div class="card-body">
      <h5 class="card-title text-center font-weight-bold">
        {props.place.name}
      </h5>
      <h5 class="card-text font-weight-bold text-success">
        R$ {props.place.price}
      </h5>
      <p class="card-text text-justify">{props.place.description}</p>
    </div>
    <div class="card-footer text-center">
      <Link
        class="btn btn-lg btn-success font-weight-bold"
        to={"/" + props.key}
      >
        Detalhes
      </Link>
    </div>
  </div>
);

export default class PlaceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceFilter: 100,
      locationFilter: "Belo Horizonte",
      nameFilter: null,
      places: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/places/")
      .then((response) => {
        this.setState({ places: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  placeList() {
    return this.state.places
      .filter(
        (place) =>
          place.price <= this.state.priceFilter &&
          place.name
            .toLowerCase()
            .includes(this.state.nameFilter.toLowerCase()) &&
          place.location === this.state.locationFilter
      )
      .map((place) => {
        return <Place place={place} key={place._id} />;
      });
  }

  render() {
    return (
      <div>
        <div className="text-center inline">
          Filtros
          <FontAwesomeIcon icon={faFilter} size="2x" />
        </div>
        <div class="form-inline">
          <input
            type="text"
            class="form-control mb-2 mr-sm-2"
            placeholder="Nome"
            onChange={(e) => {
              this.setState({ nameFilter: e.target.value });
            }}
            value={this.state.nameFilter}
          />
          <input
            type="text"
            class="form-control mb-2 mr-sm-2"
            placeholder="Preço máximo"
            onChange={(e) => {
              this.setState({ priceFilter: e.target.value });
            }}
            value={this.state.priceFilter}
          />
          <select
            class="custom-select mb-2 mr-sm-2"
            onChange={(e) => {
              this.setState({ locationFilter: e.target.value });
            }}
            value={this.state.locationFilter}
          >
            <option value="Belo Horizonte">Belo Horizonte</option>
            <option value="São Paulo">São Paulo</option>
            <option value="Rio de Janeiro">Rio de Janeiro</option>
          </select>
        </div>
        <div className="row">
          <div className="class-deck col-sm-12 col-md-6 col-lg-3">
            {this.placeList()}
          </div>
        </div>
      </div>
    );
  }
}
