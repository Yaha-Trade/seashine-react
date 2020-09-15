import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import loginBackground from "../assets/images/loginBackground.jpg";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Link from "@material-ui/core/Link";
import CollapseAlert from "../components/CollapseAlert";
import { resetPassword } from "../services/Auth";
import Loading from "../components/Loading";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ForgotPassword = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setOpenLoading(true);

    resetPassword(email, onSuccess, onError);
  }

  const onSuccess = () => {
    setOpenLoading(false);
    setOpenSuccessAlert(true);
    setOpenErrorAlert(false);
  };

  const onError = () => {
    setOpenLoading(false);
    setOpenErrorAlert(true);
    setOpenSuccessAlert(false);
  };

  const backToLogin = (event) => {
    event.preventDefault();

    history.push("/login");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Loading isOpen={openLoading} />
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("forgotpassword")}
          </Typography>
          <Typography variant="subtitle1">
            {t("newpassworddirection")}
          </Typography>

          <CollapseAlert
            title={t("error")}
            content={t("emailnotfound")}
            severity="error"
            isOpen={openErrorAlert}
            closeAction={() => {
              setOpenErrorAlert(false);
            }}
          />

          <CollapseAlert
            title={t("success")}
            content={t("emailsuccess")}
            severity="success"
            isOpen={openSuccessAlert}
            closeAction={() => {
              setOpenSuccessAlert(false);
            }}
          />

          <form className={classes.form} autoComplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label={t("email")}
              name="login"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              {t("submit")}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2" onClick={backToLogin}>
                  {t("backlogin")}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
