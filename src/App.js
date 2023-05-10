import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route index path="/login" element={<Login />} />
        <Route index path="/registration" element={<Registration />} />
      </Route>
    </Routes>
  );
}

export default App;
