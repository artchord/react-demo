import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import TodoList from "@components/templates/TodoList";
import type { Todo } from "@type/todo";
import InfoBox from "@components/organisms/InfoBox";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedData = localStorage.getItem("todos");
    return savedData ? (JSON.parse(savedData) as Todo[]) : [];
  });

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
    <Container
      maxWidth="sm"
      sx={{ py: 4, display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <InfoBox title="使い方">
        <div>
          ・タスクを入力して「追加」ボタンを押すか、Enterキーを押してください。
        </div>
        <div>・タスクにチェックを入れると完了になります。</div>
        <div>・タスクの右端のゴミ箱アイコンを押すとタスクが削除されます。</div>
        <div>
          ・ローカルストレージに保存しているのでリロードしてもタスクは維持されます。
        </div>
      </InfoBox>
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
