// import React from 'react';
import { Routes, Route } from "react-router-dom";

import './App.css';

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {

  //<React.Fragment></React.Fragment>
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
      {/* <Main /> */}
      <Footer />
    </>
  );
}

export default App;
