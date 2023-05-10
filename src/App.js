import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Layout from "./pages/Layout";
import ProfileLayout from "./pages/Profile/ProfileLayout";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ProfileLayout />}>
          <Route index element={<Navigate to="/me" />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/:id" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<div>Not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
