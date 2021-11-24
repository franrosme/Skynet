import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
//import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
//import Home from "./views/Home";
//import Profile from "./views/Profile";
//import ExternalApi from "./views/ExternalApi";
//import ListProducts from "./pages/ListProducts";
//import AddProducts from "./pages/AddProducts";
//import AddSells from "./pages/AddSells";
//import ListSells from "./pages/ListSells";
//import ListUsers from "./pages/ListUsers";
//import AddUsers from "./pages/AddUsers";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import ListProjects from "./pages/ListProjects";
initFontAwesome();

const App = () => {
  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        {/* <NavBar />*/}
        <Container className="flex-grow-1 mt-5">
          <Switch>
            {/*<Route path="/" exact component={Home} />
             <Route path="/profile" component={Profile} />
            <Route path="/listarproductos" component={ListProducts} />
            <Route path="/listarproductos" component={ListProducts} />
            <Route path="/agregarproductos" component={AddProducts} />            
            <Route path="/listarventas" component={ListSells} />
            <Route path="/agregarventas" component={AddSells} />
            <Route path="/listarusuarios" component={ListUsers} />
            <Route path="/agregarusuarios" component={AddUsers} />*/}
            <Route path="/" component={ListProjects} />

          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;