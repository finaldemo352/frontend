import { Spinner } from "react-bootstrap";
import React from "react";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      style={{
        width: "200px",
        height: "200px",
        display: "block",
        margin: "auto",
      }}
      role="status"
    ></Spinner>
  );
};

export default Loader;
