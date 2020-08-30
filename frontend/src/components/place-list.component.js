import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Place = (props) => (
  <tr>
    <td>{props.place.name}</td>
    <td>{props.place.price}</td>
    <td>{props.place.location}</td>
    <td>{props.place.category}</td>
    <td>
      <Link to={"/" + props.exercise._id}>Detalhes</Link>
    </td>
  </tr>
);

export default class PlaceList extends Component {
  constructor(props) {
    super(props);

    this.state = { search: null, places: [] };
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
    return this.state.places.map((place) => {
      return <Place place={place} key={place._id} />;
    });
  }

  searchPlace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter item to be searched"
          onChange={(e) => this.searchSpace(e)}
        />
        {this.placeList()}
      </div>
    );
  }
}
