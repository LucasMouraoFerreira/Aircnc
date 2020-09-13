import React, { Component } from "react";
import axios from "axios";
import { faBed, faBath, faMale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class PlaceRent extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      numberOfdays: 1,
      numberOfGuests: 1,
      checkinDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      checkoutDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      place: {},
      selectNGuests: [],
    };
  }

  setFinalPrice() {
    const finalPrice =
      ((this.state.checkoutDate.getTime() - this.state.checkinDate.getTime()) /
        (24 * 3600 * 1000)) *
      this.state.numberOfGuests *
      this.state.place.price;

    return "R$" + finalPrice + ".00";
  }

  onSubmit(e) {
    e.preventDefault();
    const rent = {
      checkinDate: this.state.checkinDate,
      checkoutDate: this.state.checkoutDate,
      finalPrice:
        ((this.state.checkoutDate.getTime() -
          this.state.checkinDate.getTime()) /
          (24 * 3600 * 1000)) *
        this.state.numberOfGuests *
        this.state.place.price,
    };

    const placeId = this.state.place._id;

    axios
      .post("http://localhost:5000/places/rent/" + placeId, rent)
      .then((res) => {
        console.log(res.data);
      });
    window.location = "/";
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/places/" + this.props.match.params.id)
      .then((response) => {
        console.log(response);
        this.setState({ place: response.data });
        this.setState({ finalPrice: response.data.price });
        const tempVector = [];
        for (
          let index = 1;
          index <= this.state.place.maxNumberOfGuests;
          index++
        ) {
          tempVector.push(
            <option key={index} value={index}>
              {index}
            </option>
          );
        }
        this.setState({ selectNGuests: tempVector });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-8">
            <div className="card mb-4">
              <img
                className="card-img-top"
                src={this.state.place.image}
                alt="place"
              />
              <div className="card-body">
                <h4 className="font-weight-bold">{this.state.place.name}</h4>
                <h6 className="font-weight-bold">
                  Endereço: {this.state.place.address}
                </h6>
                <p>{this.state.place.description}</p>
                <h6 className="font-weight-bold">
                  Diária por pessoa: R${this.state.place.price}.00
                </h6>
                <p className="font-weight-bold">
                  Tipo: {this.state.place.type}
                </p>
                <p className="font-weight-bold">
                  <FontAwesomeIcon icon={faMale} className="mr-1" />
                  {"  " + this.state.place.maxNumberOfGuests + "   "}
                  <FontAwesomeIcon icon={faBed} className="ml-3 mr-1" />
                  {"  " + this.state.place.numberOfRooms + "   "}
                  <FontAwesomeIcon icon={faBath} className="ml-3 mr-1" />
                  {"  " + this.state.place.numberOfBathrooms}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <form onSubmit={this.onSubmit}>
              <div className="card">
                <div className="card-body">
                  <div className="form-group">
                    <label>Número de Hóspedes</label>
                    <select
                      required
                      className="form-control"
                      selected={this.state.numberOfGuests}
                      onChange={(e) => {
                        this.setState({ numberOfGuests: e.target.value });
                      }}
                    >
                      {this.state.selectNGuests}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Check-in </label>
                    <div>
                      <DatePicker
                        selected={this.state.checkinDate.setHours(10, 0, 0, 0)}
                        onChange={(date) => {
                          this.setState({ checkinDate: new Date(date) });
                        }}
                        showTimeSelect
                        includeTimes={[new Date().setHours(10, 0, 0, 0)]}
                        minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                        dateFormat="yyyy-MM-dd hh:mm"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Check-out </label>
                    <div>
                      <DatePicker
                        selected={this.state.checkoutDate.setHours(10, 0, 0, 0)}
                        onChange={(date) => {
                          this.setState({ checkoutDate: new Date(date) });
                        }}
                        showTimeSelect
                        includeTimes={[new Date().setHours(10, 0, 0, 0)]}
                        minDate={new Date(Date.now() + 48 * 60 * 60 * 1000)}
                        dateFormat="yyyy-MM-dd hh:mm"
                      />
                    </div>
                  </div>
                  <h6 className="font-weight-bold">
                    Preço total: {this.setFinalPrice()}
                  </h6>
                </div>
                <div className="card-footer">
                  <div className="form-group text-center m-0">
                    <input
                      type="submit"
                      value="Alugar"
                      className="btn btn-lg btn-dark"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
