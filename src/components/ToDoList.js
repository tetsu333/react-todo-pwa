import React, { useState, useEffect, useContext } from "react";
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Checkbox } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import * as Api from "../service/api";


const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 360,
    margin: "auto",
  },
  ul: {
    paddingLeft: 0,
    listStyle: "none",
  },
  list: {
    justifyContent: "space-between",
  },
}));

const ToDoList = (props) => {
  const classes = useStyles();
  const deleteHandle = (id) => {
    Api.todoDelete(id);
    props.fetch();
  };

  const checkHandle = async (id) => {
    await Api.toggleComple(id);
    props.fetch();
  }

  const todoList = props.todos.map((todo) => {
    return (
      <ListItem key={todo.id}>
        <ListItemIcon>
          <Checkbox checked={todo.isComplete} onChange={() => checkHandle(todo.id)}/>
        </ListItemIcon>
        <ListItemText primary={todo.content} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete"  onClick={() => deleteHandle(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
  return (
    <div className={classes.root}>
      <h2>あなたのToDo</h2>
      <ul className={classes.ul}>{todoList}</ul>
    </div>
  );
};
export default ToDoList;
