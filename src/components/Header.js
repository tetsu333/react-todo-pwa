import React, { useContext } from "react";
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  toolber: {
    justifyContent: "space-between",
  },
  button: {
    color: "#FFF",
  }
}));

const Header = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);

  const classes = useStyles();
  const buttonRender = () => {
    let buttonDom;
    if (dig(currentUser, "currentUser", "uid")) {
      buttonDom = <Button className={classes.button} variant="text" onClick={logOut}>ログアウト</Button>;
    } else {
      buttonDom = <Button className={classes.button} variant="text" onClick={signInWithGoogle}>ログイン</Button>;
    }
    return buttonDom;
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolber}>
        <Typography variant="h6">ReactToDo</Typography>
        {buttonRender()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
