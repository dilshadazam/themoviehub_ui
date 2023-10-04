import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// import "react-swalify/dist/ReactSwalify.css";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Admin from "./routes/index";
// import Sidebar from "./components/Sidebar";
import Dashboard from "./components/dashboard";
// import { v4 as uuid } from "uuid";
//context

const App = () => {
  const { pathname } = useLocation();

  // const routes = Admin;
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <React.StrictMode>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </React.StrictMode>
  );
};
export default App;
