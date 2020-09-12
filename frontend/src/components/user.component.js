import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.onSubmitNewPlace = this.onSubmitNewPlace.bind(this);
    this.onDeletePlace = this.onDeletePlace.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onEditPlace = this.onEditPlace.bind(this);

    this.state = {
      newPassword: "",
      places: [],
      email: "",
      newPlace: {},
      updatedPlace: {},
      modalShow: {},
      modalPassword: false,
    };

    this.Place = (props) => {
      return (
        <div className="col-sm-6">
          <div className="card m-2">
            <img className="card-img-top" src={props.place.image} alt="Card" />
            <div className="card-body">
              <h5 className="card-title text-center font-weight-bold">
                {props.place.name}
              </h5>
              <h5 className="card-text font-weight-bold">
                R$ {props.place.price}
              </h5>
              <p className="card-text text-justify">
                {props.place.description}
              </p>
            </div>
            <div className="card-footer text-center">
              <button
                className="btn btn-danger font-weight-bold mr-2"
                onClick={() => {
                  props.onDeletePlace(props.place._id);
                }}
              >
                Excluir
              </button>
              <button
                className="btn btn-primary font-weight-bold"
                onClick={() => {
                  this.setState({ updatedPlace: props.place });
                  this.setState({
                    modalShow: Object.assign(this.state.modalShow, {
                      [`modal_${props.place._id}`]: false,
                    }),
                  });
                }}
              >
                Alterar
              </button>
            </div>
          </div>
          <Modal
            show={this.state.modalShow[`modal_${props.place._id}`]}
            onHide={() =>
              this.setState({
                modalShow: Object.assign(this.state.modalShow, {
                  [`modal_${props.place._id}`]: false,
                }),
              })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() =>
                  this.setState({
                    modalShow: Object.assign(this.state.modalShow, {
                      [`modal_${props.place._id}`]: false,
                    }),
                  })
                }
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  this.setState({
                    modalShow: Object.assign(this.state.modalShow, {
                      [`modal_${props.place._id}`]: false,
                    }),
                  })
                }
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    };
  }

  onSubmitNewPlace(e) {
    // tratar formData
    e.preventDefault();

    axios
      .post("http://localhost:5000/places", this.state.newPlace)
      .then((res) => {
        this.setState({ places: [res.data, ...this.state.places] });
        this.setState({
          modalShow: [
            this.state.places
              .map((x) => {
                return Object.assign({}, { [`modal_${x._id}`]: false });
              })
              .reduce(function (acumulador, valorAtual) {
                return Object.assign(acumulador, valorAtual);
              }, {}),
          ],
        });
      });
  }

  onDeletePlace(id) {
    axios.delete("http://localhost:5000/places/" + id).then((res) => {
      this.setState({ places: this.state.places.filter((x) => x._id !== id) });
      this.setState({
        modalShow: [
          this.state.places
            .map((x) => {
              return Object.assign({}, { [`modal_${x._id}`]: false });
            })
            .reduce(function (acumulador, valorAtual) {
              return Object.assign(acumulador, valorAtual);
            }, {}),
        ],
      });
    });
  }

  onDeleteUser() {
    axios.delete("http://localhost:5000/users").then((res) => {
      localStorage.removeItem("tokenAircnc");
      window.location = "/login";
    });
  }

  onChangePassword(e) {
    e.preventDefault();
    this.setState({ modalPassword: false });
    axios
      .put("http://localhost:5000/users", { password: this.state.newPassword })
      .then((res) => {
        localStorage.setItem("tokenAircnc", res.data.token);
        this.setState({ newPassword: "" });
      });
  }

  onEditPlace(id) {
    // tratar formData
    axios
      .put("http://localhost:5000/places/" + id, this.state.updatedPlace)
      .then((res) => {
        this.setState({
          places: [...this.state.places.filter((x) => x._id !== id), res.data],
        });
      });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        this.setState({ places: response.data.places });
        this.setState({ email: response.data.email });
        this.setState({
          modalShow: [
            response.data.places
              .map((x) => {
                return Object.assign({}, { [`modal_${x._id}`]: false });
              })
              .reduce(function (acumulador, valorAtual) {
                return Object.assign(acumulador, valorAtual);
              }, {}),
          ],
        });
      })
      .catch((error) => {
        alert(error);
      });
  }

  placeList() {
    return this.state.places.map((place) => {
      return <this.Place place={place} key={place._id} />;
    });
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-9">
            <div className="row">{this.placeList()}</div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-body text-center">
                <FontAwesomeIcon icon={faUser} size="3x" />
                <p className="mt-2 mb-0">{this.state.email}</p>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-danger font-weight-bold mb-2"
                  onClick={() => {
                    this.onDeleteUser();
                  }}
                >
                  Excluir Conta
                </button>
                <button
                  className="btn btn-primary font-weight-bold"
                  onClick={() => this.setState({ modalPassword: true })}
                >
                  Alterar Senha
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={this.state.modalPassword}
          onHide={() => this.setState({ modalPassword: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-signin" onSubmit={this.onChangePassword}>
              <div className="form-label-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Senha"
                  required
                  onChange={(e) =>
                    this.setState({ newPassword: e.target.value })
                  }
                  value={this.state.newPassword}
                />
              </div>
              <button
                className="btn btn-lg btn-primary btn-block text-uppercase"
                type="submit"
              >
                Alterar Senha
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ modalPassword: false })}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
