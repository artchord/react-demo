import {
  Checkbox,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import type { TodoProps } from "@type/todo";
import { Delete } from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";

export default function TodoItemList({
  todos,
  deleteTodo,
  toggleTodo,
}: {
  todos: TodoProps["todos"];
  deleteTodo: TodoProps["deleteTodo"];
  toggleTodo: TodoProps["toggleTodo"];
}) {
  return (
    <List>
      <TransitionGroup>
        {todos.map((todo) => (
          <Fade in key={todo.id} timeout={500}>
            <ListItem
              key={todo.id}
              component={Paper}
              variant="outlined"
              sx={{ mb: 1 }}
              secondaryAction={
                <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                  <Delete />
                </IconButton>
              }
            >
              <ListItemButton onClick={() => toggleTodo(todo.id)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={todo.title}
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "text.disabled" : "text.primary",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Fade>
        ))}
      </TransitionGroup>
    </List>
  );
}
