import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { TodoList } from "@components/templates/TodoList";
import type { Todo } from "@type/todo";

export function Todo() {
  const savedData = localStorage.getItem("todos");
  const defaultTodos: Todo[] = savedData
    ? (JSON.parse(savedData) as Todo[])
    : [];

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<Todo[]>(defaultTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    setTodos((current) => [
      ...current,
      { id: Date.now(), title: trimmed, completed: false },
    ]);
    setTitle("");
  };

  const toggleTodo = (id: number) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <ul>
        <li>
          タスクを入力して「追加」ボタンを押すか、Enter キーを押してください。
        </li>
        <li>タスクにチェックを入れると完了になります。</li>
        <li>タスクの右端のゴミ箱アイコンを押すとタスクが削除されます。</li>
        <li>
          ローカルストレージに保存しているのでリロードしてもタスクは維持されます。
        </li>
      </ul>
      <TodoList
        title={title}
        setTitle={setTitle}
        todos={todos}
        addTodo={addTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </Container>
  );
}
