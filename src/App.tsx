import { Route, Routes } from "react-router";
import Todo from "./pages/Todo";
import FormBuilder from "./pages/FormBuilder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/form-builder" element={<FormBuilder />} />
    </Routes>
  );
}

export default App;
