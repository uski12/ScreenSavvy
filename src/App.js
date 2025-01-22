import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Details from "./pages/DetailsPage";
import ShowsPage from "./pages/ShowsPage";

import PrivateRoute from "./PrivateRoute";
import AuthProvider from "./AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/:type/:id" element={<Details />} />
          <Route path="/movies" element={<ShowsPage type="movie" />} />
          <Route path="/tv" element={<ShowsPage type="tv" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
