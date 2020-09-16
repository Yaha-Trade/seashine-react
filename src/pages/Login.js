import React, { useEffect, useState, useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import loginBackground from "../assets/images/loginBackground.jpg";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { login, isAuthenticated } from "../services/Auth";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import CollapseAlert from "../components/CollapseAlert";

function Copyright() {
  const { t } = useTranslation();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {t("copyright")}&nbsp;
      <Link color="inherit" href="https://yahacomex.com.br/">
        {t("yahatrade")}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${loginBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const { t } = useTranslation();

  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const goToApp = useCallback(() => {
    if (isAuthenticated()) {
      history.push("/home");
      window.location.reload();
    }
  }, [history]);

  const showAlert = () => {
    setOpenAlert(true);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    login(user, password, goToApp, showAlert);
  }

  const handleForgotPassword = (event) => {
    event.preventDefault();

    history.push("/forgot");
  };

  useEffect(() => {
    goToApp();
  }, [goToApp]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("seashine")}
          </Typography>

          <CollapseAlert
            title={t("error")}
            content={t("loginerror")}
            severity="error"
            isOpen={openAlert}
            closeAction={() => {
              setOpenAlert(false);
            }}
          />

          <form className={classes.form} autoComplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label={t("user")}
              name="login"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              {t("login")}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  href="/forgot"
                  variant="body2"
                  onClick={handleForgotPassword}
                >
                  {t("forgotpassword")}
                </Link>
              </Grid>
              <LanguageSelector />
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
