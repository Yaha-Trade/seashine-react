import React from "react";
import callServer from "../../services/callServer";
import Grid from "@material-ui/core/Grid";
import ModalData from "../../components/modal/ModalData";
import Loading from "../../components/Loading";
import TextField from "../../components/formfields/TextField";
import { validateEmail } from "../../services/Utils";

class UserData extends React.Component {
  state = {
    name: "",
    email: "",
    login: "",
    password: "",
    errors: [],
    isLoading: false,
  };

  onChangeForField = (id, newValue) => {
    this.setState({
      [id]: newValue,
      errors: this.state.errors.filter((value) => {
        return id !== value;
      }),
    });
  };

  saveData = async (saveAndExit) => {
    const errors = [];
    const { name, email, login, password } = this.state;

    if (name === "") {
      errors.push("name");
    }

    if (email === "" || !validateEmail(email)) {
      errors.push("email");
    }

    if (login === "") {
      errors.push("login");
    }

    this.setState({
      errors: errors,
    });

    if (errors.length > 0) {
      return;
    }

    this.setState({ isLoading: true });

    await this.props.onSave({
      name,
      email,
      login,
      password,
    });

    if (saveAndExit) {
      this.props.onClose();
    } else {
      const { idUser } = this.props;
      if (idUser && idUser !== -1) {
        this.fetchData(idUser);
      }
    }
  };

  fetchData = (idUser) => {
    callServer.get(`users/${idUser}`).then((response) => {
      this.setState({
        name: response.data.name,
        login: response.data.login,
        email: response.data.email,
        isLoading: false,
      });
    });
  };

  componentDidMount() {
    const { idUser } = this.props;

    if (idUser && idUser !== -1) {
      this.setState({ isLoading: true });
      this.fetchData(idUser);
    }
  }

  render() {
    const { onClose } = this.props;
    const { name, login, email, password, errors, isLoading } = this.state;

    return (
      <div>
        <ModalData
          onSave={this.saveData}
          isOpen={true}
          onClose={onClose}
          title="userdata"
        >
          <Loading isOpen={isLoading} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="name"
                label="name"
                value={name}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="login"
                label="login"
                value={login}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="email"
                label="email"
                value={email}
                required={true}
                onChange={this.onChangeForField}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="password"
                label="password"
                value={password}
                type="password"
                onChange={this.onChangeForField}
              />
            </Grid>
          </Grid>
        </ModalData>
      </div>
    );
  }
}

export default UserData;
