import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Todo from "./pages/Todo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
