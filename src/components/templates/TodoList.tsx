import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useMemo } from "react";
import { TodoItemList } from "@components/organisms/TodoItemList";
import type { TodoProps } from "@type/todo";

export function TodoList({
  title,
  setTitle,
  todos,
  addTodo,
  toggleTodo,
  deleteTodo,
}: TodoProps) {
  const unTouchedTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos],
  );

  const unTouchedCount = useMemo(() => unTouchedTodos.length, [unTouchedTodos]);

  const completedCount = useMemo(() => completedTodos.length, [completedTodos]);

  return (
    <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ToDo アプリ
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="新しいタスク"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addTodo();
            }
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" onClick={addTodo}>
                    追加
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {unTouchedCount} 件
      </Typography>

      {/* 未対応 */}
      <TodoItemList
        todos={unTouchedTodos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />

      {/* 完了 */}
      {completedCount > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDropDown />}>
            <Typography component="span">完了 ({completedCount}件)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TodoItemList
              todos={completedTodos}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
            />
          </AccordionDetails>
        </Accordion>
      )}
    </Paper>
  );
}
