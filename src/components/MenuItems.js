import React, { Fragment, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { MenuPages } from "../config/MenuPages";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const MenuItems = () => {
  const { t } = useTranslation();
  const openStates = MenuPages.map((page, index) => {
    return true;
  });

  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(openStates);

  const handleRedirect = (page) => {
    history.push(page);
  };

  const handleClick = (clickIndex) => {
    const newOpen = open.map((obj, index) => {
      if (clickIndex === index) {
        return !obj;
      }

      return obj;
    });

    setOpen(newOpen);
  };

  const MenuItemPages = () => {
    const renderedItems = MenuPages.map((page, index) => {
      const innerPages = page.pages;
      const isParent = innerPages !== undefined;

      if (!isParent) {
        return (
          <ListItem
            button
            key={"ListItemParent" + index}
            onClick={() => {
              handleRedirect(page.path);
            }}
          >
            <ListItemText primary={t(page.text)} />
          </ListItem>
        );
      }

      const children = innerPages.map((child, index) => {
        return (
          <ListItem
            button
            key={"ListItemChild" + index}
            onClick={() => {
              handleRedirect(child.path);
            }}
            className={classes.nested}
          >
            <ListItemText primary={t(child.text)} />
          </ListItem>
        );
      });

      return (
        <Fragment key={"Fragment" + index}>
          <ListItem
            button
            onClick={() => {
              handleClick(index);
            }}
          >
            <ListItemText
              key={"ListItemText3" + index}
              primary={t(page.text)}
            />
            {open[index] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[index]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children}
            </List>
          </Collapse>
        </Fragment>
      );
    });

    return renderedItems;
  };

  return (
    <List>
      <MenuItemPages />
    </List>
  );
};

export default MenuItems;
