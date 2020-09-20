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
      newPlace: {
        image: null,
        name: "",
        description: "",
        price: 0,
        type: "Casa",
        address: "",
        location: "Belo Horizonte",
        maxNumberOfGuests: 1,
        numberOfRooms: 1,
        numberOfBathrooms: 1,
      },
      updatedPlace: {},
      modalShow: {},
      modalPassword: false,
      modalNewPlace: false,
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
                  this.onDeletePlace(props.place._id);
                }}
              >
                Excluir
              </button>
              <button
                className="btn btn-primary font-weight-bold"
                onClick={() => {
                  this.setState({
                    updatedPlace: { ...props.place, image: null },
                  });
                  this.setState({
                    modalShow: Object.assign(this.state.modalShow, {
                      [`modal_${props.place._id}`]: true,
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
              <Modal.Title>Atualizar Lugar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="form-signin" onSubmit={this.onEditPlace}>
                <div className="form-label-group">
                  <label>Nome</label>
                  <input
                    className="form-control"
                    placeholder="Nome"
                    required
                    onChange={(e) =>
                      this.setState({
                        updatedPlace: {
                          ...this.state.updatedPlace,
                          name: e.target.value,
                        },
                      })
                    }
                    value={this.state.updatedPlace.name}
                  />
                </div>
                <div className="form-label-group">
                  <label>Endereço</label>
                  <input
                    className="form-control"
                    placeholder="Endereço"
                    required
                    onChange={(e) =>
                      this.setState({
                        updatedPlace: {
                          ...this.state.updatedPlace,
                          address: e.target.value,
                        },
                      })
                    }
                    value={this.state.updatedPlace.address}
                  />
                </div>
                <div className="form-label-group">
                  <label>Descrição</label>
                  <input
                    className="form-control"
                    placeholder="Descrição"
                    required
                    onChange={(e) =>
                      this.setState({
                        updatedPlace: {
                          ...this.state.updatedPlace,
                          description: e.target.value,
                        },
                      })
                    }
                    value={this.state.updatedPlace.description}
                  />
                </div>
                <div className="form-label-group">
                  <label>Preço</label>
                  <input
                    className="form-control"
                    placeholder="Descrição"
                    type="number"
                    required
                    onChange={(e) =>
                      this.setState({
                        updatedPlace: {
                          ...this.state.updatedPlace,
                          price: e.target.value,
                        },
                      })
                    }
                    value={this.state.updatedPlace.price}
                  />
                </div>
                <div className="form-label-group">
                  <label>Tipo</label>
                  <input
                    className="form-control"
                    placeholder="Tipo"
                    required
                    onChange={(e) =>
                      this.setState({
                        updatedPlace: {
                          ...this.state.updatedPlace,
                          type: e.target.value,
                        },
                      })
                    }
                    value={this.state.updatedPlace.type}
                  />
                </div>
                <div className="form-label-group">
                  <label>Número máximo de hospedados</label>
                  <input
                    className="form-control"
                    placeholder="Número máximo de hospedados"
                    type="number"
                    required
                    onChange={(e) =>
                      this.setState({
                        updatedPlace: {
                          ...this.state.updatedPlace,
                          maxNumberOfGuests: e.target.value,
                        },
                      })
                    }
                    value={this.state.updatedPlace.maxNumberOfGuests}
                  />
                </div>
                <div className="form-label-group">
                  <label>Número de Quartos</label>
                  <input
                    className="form-control"
                    placeholder="Número de Quartos"
                    type="number"
                    required
                    onChange={(e) =>
                      this.setState({
                        updatedPlace: {
                          ...this.state.updatedPlace,
                          numberOfRooms: e.target.value,
                        },
                      })
                    }
                    value={this.state.updatedPlace.numberOfRooms}
                  />
                </div>
                <div className="form-label-group">
                  <label>Número de Banheiros</label>
                  <input
                    className="form-control"
                    placeholder="Número de Banheiros"
                    type="number"
                    required
                    onChange={(e) =>
                      this.setState({
                        updatedPlace: {
                          ...this.state.updatedPlace,
                          numberOfBathrooms: e.target.value,
                        },
                      })
                    }
                    value={this.state.updatedPlace.numberOfBathrooms}
                  />
                </div>
                <div className="form-label-group">
                  <label>Imagem</label>
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={(e) =>
                      this.setState({
                        updatedPlace: {
                          ...this.state.updatedPlace,
                          image: e.target.files[0],
                        },
                      })
                    }
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit"
                >
                  Alterar
                </button>
              </form>
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
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    };
  }

  onSubmitNewPlace(e) {
    e.preventDefault();
    this.setState({
      modalNewPlace: false,
    });

    const formData = new FormData();
    formData.append(
      "image",
      this.state.newPlace.image,
      `image_${this.state.newPlace.name}`
    );
    formData.append("name", this.state.newPlace.name);
    formData.append("description", this.state.newPlace.description);
    formData.append("price", this.state.newPlace.price);
    formData.append("type", this.state.newPlace.type);
    formData.append("address", this.state.newPlace.address);
    formData.append("maxNumberOfGuests", this.state.newPlace.maxNumberOfGuests);
    formData.append("numberOfRooms", this.state.newPlace.numberOfRooms);
    formData.append("numberOfBathrooms", this.state.newPlace.numberOfBathrooms);
    formData.append("location", this.state.newPlace.location);

    axios
      .post("http://localhost:5000/places", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
    axios
      .delete("http://localhost:5000/users")
      .then((res) => {
        localStorage.removeItem("tokenAircnc");
        console.log("Redirect");
        window.location = "/login";
      })
      .catch((error) => alert(error));
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

  onEditPlace(e) {
    e.preventDefault();
    this.setState({
      modalShow: Object.assign(this.state.modalShow, {
        [`modal_${this.state.updatedPlace._id}`]: false,
      }),
    });

    const formData = new FormData();
    if (this.state.updatedPlace.image) {
      formData.append(
        "image",
        this.state.updatedPlace.image,
        `image_${this.state.updatedPlace.name}`
      );
    }
    formData.append("name", this.state.updatedPlace.name);
    formData.append("description", this.state.updatedPlace.description);
    formData.append("price", this.state.updatedPlace.price);
    formData.append("type", this.state.updatedPlace.type);
    formData.append("address", this.state.updatedPlace.address);
    formData.append(
      "maxNumberOfGuests",
      this.state.updatedPlace.maxNumberOfGuests
    );
    formData.append("numberOfRooms", this.state.updatedPlace.numberOfRooms);
    formData.append(
      "numberOfBathrooms",
      this.state.updatedPlace.numberOfBathrooms
    );

    axios
      .put(
        "http://localhost:5000/places/" + this.state.updatedPlace._id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        this.setState({
          places: [
            ...this.state.places.filter(
              (x) => x._id !== this.state.updatedPlace._id
            ),
            res.data.place,
          ],
        });
      })
      .catch((error) => alert(error));
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
            <button
              className="btn btn-primary font-weight-bold mb-2"
              onClick={() => this.setState({ modalNewPlace: true })}
            >
              Incluir Novo Lugar
            </button>
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
            <Modal.Title>Alterar Senha</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-signin" onSubmit={this.onChangePassword}>
              <div className="form-label-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Nova Senha"
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
        <Modal
          show={this.state.modalNewPlace}
          onHide={() =>
            this.setState({
              modalNewPlace: false,
            })
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Incluir Lugar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-signin" onSubmit={this.onSubmitNewPlace}>
              <div className="form-label-group">
                <label>Nome</label>
                <input
                  className="form-control"
                  placeholder="Nome"
                  required
                  onChange={(e) =>
                    this.setState({
                      newPlace: {
                        ...this.state.newPlace,
                        name: e.target.value,
                      },
                    })
                  }
                  value={this.state.newPlace.name}
                />
              </div>
              <div className="form-label-group">
                <label>Endereço</label>
                <input
                  className="form-control"
                  placeholder="Endereço"
                  required
                  onChange={(e) =>
                    this.setState({
                      newPlace: {
                        ...this.state.newPlace,
                        address: e.target.value,
                      },
                    })
                  }
                  value={this.state.newPlace.address}
                />
              </div>
              <div className="form-label-group">
                <label>Localização</label>
                <input
                  className="form-control"
                  placeholder="Localização"
                  required
                  onChange={(e) =>
                    this.setState({
                      newPlace: {
                        ...this.state.newPlace,
                        location: e.target.value,
                      },
                    })
                  }
                  value={this.state.newPlace.location}
                />
              </div>
              <div className="form-label-group">
                <label>Descrição</label>
                <input
                  className="form-control"
                  placeholder="Descrição"
                  required
                  onChange={(e) =>
                    this.setState({
                      newPlace: {
                        ...this.state.newPlace,
                        description: e.target.value,
                      },
                    })
                  }
                  value={this.state.newPlace.description}
                />
              </div>
              <div className="form-label-group">
                <label>Preço</label>
                <input
                  className="form-control"
                  placeholder="Descrição"
                  type="number"
                  required
                  onChange={(e) =>
                    this.setState({
                      newPlace: {
                        ...this.state.newPlace,
                        price: e.target.value,
                      },
                    })
                  }
                  value={this.state.newPlace.price}
                />
              </div>
              <div className="form-label-group">
                <label>Tipo</label>
                <input
                  className="form-control"
                  placeholder="Tipo"
                  required
                  onChange={(e) =>
                    this.setState({
                      newPlace: {
                        ...this.state.newPlace,
                        type: e.target.value,
                      },
                    })
                  }
                  value={this.state.newPlace.type}
                />
              </div>
              <div className="form-label-group">
                <label>Número máximo de hospedados</label>
                <input
                  className="form-control"
                  placeholder="Número máximo de hospedados"
                  type="number"
                  required
                  onChange={(e) =>
                    this.setState({
                      newPlace: {
                        ...this.state.newPlace,
                        maxNumberOfGuests: e.target.value,
                      },
                    })
                  }
                  value={this.state.newPlace.maxNumberOfGuests}
                />
              </div>
              <div className="form-label-group">
                <label>Número de Quartos</label>
                <input
                  className="form-control"
                  placeholder="Número de Quartos"
                  type="number"
                  required
                  onChange={(e) =>
                    this.setState({
                      newPlace: {
                        ...this.state.newPlace,
                        numberOfRooms: e.target.value,
                      },
                    })
                  }
                  value={this.state.newPlace.numberOfRooms}
                />
              </div>
              <div className="form-label-group">
                <label>Número de Banheiros</label>
                <input
                  className="form-control"
                  placeholder="Número de Banheiros"
                  type="number"
                  required
                  onChange={(e) =>
                    this.setState({
                      newPlace: {
                        ...this.state.newPlace,
                        numberOfBathrooms: e.target.value,
                      },
                    })
                  }
                  value={this.state.newPlace.numberOfBathrooms}
                />
              </div>
              <div className="form-label-group">
                <label>Imagem</label>
                <input
                  type="file"
                  className="form-control-file"
                  onChange={(e) =>
                    this.setState({
                      newPlace: {
                        ...this.state.newPlace,
                        image: e.target.files[0],
                      },
                    })
                  }
                />
              </div>
              <button
                className="btn btn-lg btn-primary btn-block text-uppercase"
                type="submit"
              >
                Incluir
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  modalNewPlace: false,
                })
              }
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
