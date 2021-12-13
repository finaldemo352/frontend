import React, { Children } from "react";
import { Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <>
      <div className="my-3">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>{children}</Col>
        </Row>
      </div>
    </>
  );
};

export default FormContainer;
