import { Route, Redirect } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.userReducer.user);
  if (token && user.role === "admin") {
    return <Route component={Component} {...rest} />;
  }
  return <Redirect to="/dashbord" />;
};

export default AdminRoute;
