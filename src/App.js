import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ImageSlider from "./components/ImageSlider";
import MobileList from "./components/MobileList";
import WatchList from "./components/WatchList";
import Filter from "./components/Filter";
import ContextFile from "./Shares/ContextFile";
import Footer from "./components/Footer";
import AddToCartList from "./components/AddToCartList";
import Login from "./components/Login/components/Login";
import SignUp from "./components/Login/components/SignUp";

function App() {
  const commonComponents = (
    <>
      <Header />
      <ImageSlider />
      <Filter />
    </>
  );

  return (
    <ContextFile>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {commonComponents}
                <ProductList />
                <Footer />
              </>
            }
          />
          <Route
            path="/ProductList"
            element={
              <>
                {commonComponents}
                <ProductList />
                <Footer />
              </>
            }
          />
          <Route
            path="/MobileList"
            element={
              <>
                {commonComponents}
                <MobileList />
                <Footer />
              </>
            }
          />
          <Route
            path="/WatchList"
            element={
              <>
                {commonComponents}
                <WatchList />
                <Footer />
              </>
            }
          />
          <Route
            path="/AddToCart"
            element={
              <>
                <Header />
                <AddToCartList />
              </>
            }
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ContextFile>
  );
}

export default App;
