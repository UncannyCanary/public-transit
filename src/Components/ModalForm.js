import { Autocomplete } from "@react-google-maps/api";

import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function ModalForm({
  onSubmit,
  inputFieldStops,
  setInputFieldStops,
  routeInfo,
  setRouteInfo,
}) {
  const handleChangeInputStop = (id, event) => {
    const newInputFields = inputFieldStops.map((stop) => {
      if (id === stop.id) {
        stop.stopValue = event.target.value;
      }
      return stop;
    });
    setInputFieldStops(newInputFields);
  };

  const addField = () => {
    setInputFieldStops([...inputFieldStops, { id: uuidv4(), stopValue: "" }]);
  };

  const removeField = (id) => {
    const newInputFields = inputFieldStops.filter((stop) => stop.id !== id);
    setInputFieldStops(newInputFields);
  };

  const onChangeOrigin = (e) => {
    let propertyName = "origin";
    if (routeInfo.hasOwnProperty(propertyName)) {
      setRouteInfo((prevState) => ({
        ...prevState,
        origin: e.target.value,
      }));
    } else {
      routeInfo.origin = e.target.value;
    }
  };

  const onChangeDestination = (e) => {
    let propertyName = "destination";
    if (routeInfo.hasOwnProperty(propertyName)) {
      setRouteInfo((prevState) => ({
        ...prevState,
        destination: e.target.value,
      }));
    } else {
      routeInfo.destination = e.target.value;
    }
  };

  const onChangeDirection = (e) => {
    let propertyName = "direction";
    if (routeInfo.hasOwnProperty(propertyName)) {
      setRouteInfo((prevState) => ({
        ...prevState,
        direction: e.target.value,
      }));
    } else {
      routeInfo.direction = e.target.value;
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" aria-required>
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          id="Name"
          placeholder="Enter Route Name: e.g: Commute"
          value={routeInfo?.name}
          disabled={routeInfo.name}
        />
      </Form.Group>
      <Form.Label>Direction</Form.Label>
      <Form.Select
        aria-label="Route Direction"
        required
        className="mb-3"
        id="Direction"
        value={routeInfo?.direction}
        onChange={(e) => onChangeDirection(e)}
      >
        <option>Please select a direction</option>
        <option value="1">Up</option>
        <option value="2">Down</option>
      </Form.Select>
      <Form.Group className="mb-3" aria-required>
        <Form.Label>Origin</Form.Label>
        <Autocomplete style={{ zindex: 2000 }}>
          <Form.Control
            required
            id="Origin"
            placeholder="Enter Origin"
            value={routeInfo?.origin}
            onChange={(e) => onChangeOrigin(e)}
            onBlur={(e) => onChangeOrigin(e)}
          />
        </Autocomplete>
      </Form.Group>
      {inputFieldStops?.map((stop, index) => (
        <React.Fragment key={stop.id}>
          <Form.Label>Stop</Form.Label>
          <Autocomplete>
            <InputGroup className="mb-3">
              <Form.Control
                name="Stop"
                id={stop.id}
                placeholder="Enter Stop"
                value={stop.stopValue}
                onChange={(event) => handleChangeInputStop(stop.id, event)}
                onBlur={(event) => handleChangeInputStop(stop.id, event)}
              />
              <Button
                id={"button-addon" + index}
                variant="danger"
                onClick={(e) => removeField(stop.id)}
              >
                Delete
              </Button>
            </InputGroup>
          </Autocomplete>
        </React.Fragment>
      ))}
      <Form.Group className="mb-3" aria-required>
        <Form.Label>Destination</Form.Label>
        <Autocomplete>
          <Form.Control
            required
            id="Destination"
            placeholder="Enter Destination"
            value={routeInfo?.destination}
            onChange={(e) => onChangeDestination(e)}
            onBlur={(e) => onChangeDestination(e)}
          />
        </Autocomplete>
      </Form.Group>

      <Button variant="success" onClick={addField}>
        Add Stop
      </Button>
      <Button variant="primary" style={{ marginLeft: 10 }} type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ModalForm;
