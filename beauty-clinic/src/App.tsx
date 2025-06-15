import React from "react";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import { Homepage, Clinicians, BookingTreatment, Login, Landing } from "./pages";
import { BookNowBtn, Footer } from "./components";

export const App = () => {
  const location = useLocation();

  const hideBookNowLocations = ["/booking", "/admin"];
  const shouldShowButton = !hideBookNowLocations.includes(location.pathname);
  return (
    <>
      <NavBar />
      {shouldShowButton && <BookNowBtn />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/clinicians" element={<Clinicians />} />
        <Route path="/booking" element={<BookingTreatment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />

      </Routes>
      <Footer />
    </>
  );
};
