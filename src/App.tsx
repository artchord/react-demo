import { Route, Routes } from "react-router";
import Todo from "./pages/Todo";
import Builder from "./pages/Builder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Builder />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/builder" element={<Builder />} />
    </Routes>
  );
}

export default App;
