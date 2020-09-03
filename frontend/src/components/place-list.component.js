import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Place = (props) => (
  <div className="col-sm-12 col-md-6 col-lg-4">
    <div className="card m-2">
      <img className="card-img-top" src={props.place.image} alt="Card" />
      <div className="card-body">
        <h5 className="card-title text-center font-weight-bold">
          {props.place.name}
        </h5>
        <h5 className="card-text font-weight-bold">R$ {props.place.price}</h5>
        <p className="card-text text-justify">{props.place.description}</p>
      </div>
      <div className="card-footer text-center">
        <Link
          className="btn btn-lg btn-dark font-weight-bold"
          to={"/places/" + props.place._id}
        >
          Detalhes
        </Link>
      </div>
    </div>
  </div>
);

export default class PlaceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceFilter: 100,
      locationFilter: "Belo Horizonte",
      nameFilter: "",
      places: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/place/")
      .then((response) => {
        console.log(response);
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
      <div className="container">
        <div className="text-center inline">
          <br />
          <FontAwesomeIcon icon={faFilter} size="2x" />
        </div>
        <br />

        <div className="text-center">
          <div className="form-inline justify-content-center">
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <span className="input-group-text font-weight-bold">Nome</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                onChange={(e) => {
                  this.setState({ nameFilter: e.target.value });
                }}
                value={this.state.nameFilter}
                id="nome-id"
              />
            </div>
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <span className="input-group-text font-weight-bold">
                  Preço Máximo (R$)
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  this.setState({ priceFilter: e.target.value });
                }}
                value={this.state.priceFilter}
              />
            </div>
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <span className="input-group-text font-weight-bold">
                  Localização
                </span>
              </div>
              <select
                className="custom-select"
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
          </div>
        </div>

        <div className="row">{this.placeList()}</div>
      </div>
    );
  }
}
