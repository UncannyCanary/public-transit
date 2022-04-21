import React, { useEffect, useRef, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import CustomModal from "./Modal";

const center = { lat: 12.92, lng: 77.66 };

function Directions() {
  const [routes, setRoutes] = useState([]);
  const [inputFieldStops, setInputFieldStops] = useState([]);
  const [map, setMap] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [routeInfo, setRouteInfo] = useState({});
  const [isEditFlow, setIsEditFlow] = useState(false);

  // eslint-disable-next-line no-undef
  const directionsRenderer = useRef(new google.maps.DirectionsRenderer());

  useEffect(() => {
    if (routes.length === 0) {
      directionsRenderer.current.setDirections({ routes: [] });
    }
  }, [routes, directionsRenderer]);

  const calculateRoute = async (e) => {
    e.preventDefault();

    let actualOrigin = e.target.elements.Origin.value;
    let actualDestination = e.target.elements.Destination.value;
    let actualStops = inputFieldStops;
    if (e.target.elements.Direction.value === "2") {
      actualOrigin = e.target.elements.Destination.value;
      actualDestination = e.target.elements.Origin.value;
      actualStops = inputFieldStops.reverse();
    }
    const routeObject = {
      id: uuidv4(),
      name: e.target.elements.Name.value,
      direction: e.target.elements.Direction.value,
      origin: actualOrigin,
      destination: actualDestination,
      stops: actualStops,
    };
    const waypointArray = actualStops.map((stop) => {
      return {
        location: stop.stopValue,
        stopover: true,
      };
    });
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    directionsRenderer.current.setMap(map);
    try {
      const results = await directionService.route({
        origin: routeObject.origin,
        destination: routeObject.destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypointArray,
      });
      directionsRenderer.current.setDirections(results);
      if (isEditFlow) {
        setRoutes(
          routes.map((route) => {
            if (route.name === e.target.elements.Name.value) {
              return {
                ...route,
                direction: e.target.elements.Direction.value,
                origin: actualOrigin,
                destination: actualDestination,
                stops: actualStops,
              };
            } else {
              return route;
            }
          })
        );
      } else {
        setRoutes((oldRoutes) => [...oldRoutes, routeObject]);
      }

      setInputFieldStops([]);
    } catch (e) {
      alert(
        "OOPS! Route couldn't be found ! Please give proper origin/destination!"
      );
    } finally {
      setIsEditFlow(false);
      closeModal();
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const deleteRoute = (id, event) => {
    const newRoutes = routes.filter((route) => route.id !== id);
    setRoutes(newRoutes);
  };

  const handleRouteOnClick = async (route, event) => {
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    directionsRenderer.current.setMap(map);
    try {
      const results = await directionService.route({
        origin: route.origin,
        destination: route.destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: route.stops,
      });
      directionsRenderer.current.setDirections(results);
    } catch (e) {
      console.log("Something went wrong");
    }
  };

  const editRoute = (route) => {
    setInputFieldStops(route.stops);
    setRouteInfo(route);
    setIsEditFlow(true);
    openModal();
  };

  const addRoute = () => {
    setInputFieldStops([]);
    setRouteInfo({});
    setIsEditFlow(false);
    openModal();
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={4} xs={12}>
          <Container
            fluid
            className="pt-3"
            style={{
              height: "95vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <h2>Routes</h2>
            {routes.length < 1 ? (
              <p>
                No routes added. Please add routes by clicking on Add Routes
                button.
              </p>
            ) : (
              <ListGroup className="w-100 mb-5">
                {routes.map((route) => (
                  <React.Fragment key={route.id}>
                    <ListGroup.Item
                      action
                      className="mt-5"
                      onClick={(event) => handleRouteOnClick(route, event)}
                    >
                      {route.name}
                      {" ---> Direction: " +
                        (route.direction === "1" ? "Up" : "Down")}
                    </ListGroup.Item>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "20px",
                      }}
                    >
                      <Button
                        variant="info"
                        onClick={(event) => editRoute(route)}
                      >
                        {" "}
                        Edit{" "}
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={(event) => deleteRoute(route.id, event)}
                      >
                        {" "}
                        Delete{" "}
                      </Button>
                    </div>
                  </React.Fragment>
                ))}
              </ListGroup>
            )}
            <Button variant="primary" onClick={addRoute} size="lg">
              Add Route
            </Button>
          </Container>
        </Col>
        <Col sm={8} xs={12}>
          <Container fluid className="pt-3">
            <GoogleMap
              center={center}
              zoom={12}
              mapContainerStyle={{
                width: "100%",
                height: "95vh",
              }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            ></GoogleMap>
          </Container>
        </Col>
      </Row>
      <CustomModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        onSubmit={calculateRoute}
        inputFieldStops={inputFieldStops}
        setInputFieldStops={setInputFieldStops}
        routeInfo={routeInfo}
        setRouteInfo={setRouteInfo}
      />
    </Container>
  );
}

export default Directions;
