import "./scss/mainStyles.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/UI/Form/LoginForm";
import Registration from "./components/UI/Form/RgistrationForm";
import Layout from "./components/Layout/Layout";
import SidebarLayout from "./components/Layout/SidebarLayout";
import Profile from "./pages/Profile/Profile";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<SidebarLayout />}>
            <Route index element={<Navigate to="/me" />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/:id" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
