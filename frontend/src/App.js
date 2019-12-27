import React from 'react';
import Home from './Component/Home1';
import {Route, BrowserRouter} from "react-router-dom";
import Navbar from "./Component/Navbar";
import AddCountry from "./Component/AddCountry";
import AddCity from "./Component/AddCity"


function App() {
  return (
    <div className="container-fluid">
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/addcountry" component={AddCountry} />
        <Route path="/addcity" component={AddCity} />
      </React.Fragment>
    </BrowserRouter>
    </div>
  );
}

export default App;
