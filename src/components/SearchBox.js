import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={onSubmitHandler} inline>
      <Form.Control
        type="text"
        name="query"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Product"
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="Submit" variant="outline-success" className="p-2">
        Seach
      </Button>
    </Form>
  );
};

export default SearchBox;
