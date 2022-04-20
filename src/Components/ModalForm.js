import { Autocomplete } from "@react-google-maps/api";

import React from "react";
import { Button, Form } from "react-bootstrap";

function ModalForm({ onSubmit, originRef, destinationRef }) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Origin</Form.Label>
        <Autocomplete>
          <Form.Control placeholder="Enter Origin" ref={originRef} />
        </Autocomplete>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Destination</Form.Label>
        <Autocomplete>
          <Form.Control placeholder="Enter Destination" ref={destinationRef} />
        </Autocomplete>
      </Form.Group>
      <Button variant="secondary">Add Stop</Button>
      <Button variant="primary" style={{ marginLeft: 10 }} type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ModalForm;
