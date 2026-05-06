export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoProps {
  title: string;
  setTitle: (title: string) => void;
  todos: Todo[];
  addTodo: () => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}
