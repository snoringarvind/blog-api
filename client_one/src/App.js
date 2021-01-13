import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import BlogDetail from "./components/BlogDetail";
import { BlogProvider } from "./components/BlogContext";

const App = () => {
  return (
    <BlogProvider>
      <Router>
        <div className="app">
          <Nav />
          <Switch>
            <Route path="/catalog/blogs" component={Home}></Route>
            <Route path="/catalog/blog/:id" component={BlogDetail}></Route>
          </Switch>
        </div>
      </Router>
    </BlogProvider>
  );
};
export default App;
