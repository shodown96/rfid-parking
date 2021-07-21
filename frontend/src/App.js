import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "react-image-gallery/styles/css/image-gallery.css";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Layout from './Layout';
import { useEffect } from 'react';
import axios from 'axios';
import { host } from './axios';

AOS.init({
  delay:50,
  duration:1000,
  easing:"ease-in-out-cubic",
  once:true
});

setTimeout(() => {
  console.clear()
}, 2000);


function App() {

useEffect(() => {
  axios.get(host)
})

  return (
    <div className="app">
    <Router>
      <Switch>
        <Route path="/register" component={Layout}/>
        <Route path="/user" component={Layout}/>
        <Route path="/parkapp" component={Layout}/>
        <Route exact path="/" component={Home}/>
        <Route path="" component={ErrorPage}/>
      </Switch>
    </Router>
    <ToastContainer position="bottom-center" hideProgressBar closeButton={false}/>
    </div>
  );
}

export default App;
