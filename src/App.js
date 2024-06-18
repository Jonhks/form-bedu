import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Public from "./components/Public/Public";
import Header from "./components/Header/Header";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Gallery from "./components/Gallery/Gallery";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Public />}
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/gallery/*"
            element={<Gallery />}
          />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
