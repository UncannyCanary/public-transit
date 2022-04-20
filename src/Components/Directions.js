import React, { useRef, useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { Button, Col, Container, Row } from "react-bootstrap";

import CustomModal from "./Modal";

const center = { lat: 12.92, lng: 77.66 };

function Directions() {
  const [directionsResponse, setDirectionsResponse] = useState("");
  const [map, setMap] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const originRef = useRef();
  const destinationRef = useRef();

  const calculateRoute = async (e) => {
    e.preventDefault();
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: [
        {
          location: "12.974230180091968, 77.75332226377091",
          stopover: true,
        },
        {
          location: "12.32, 77.75332226377091",
          stopover: true,
        },
      ],
    });
    setDirectionsResponse(results);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={4} xs={12}>
          <Button variant="primary" onClick={openModal}>
            Set Route
          </Button>
        </Col>
        <Col sm={8} xs={12}>
          <Container fluid className="pt-3">
            <GoogleMap
              center={center}
              zoom={12}
              mapContainerStyle={{ width: "100%", height: "100vh" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => setMap(map)}
            >
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </Container>
        </Col>
      </Row>
      <CustomModal
        isVisible={isModalVisible}
        closeModal={closeModal}
        onSubmit={calculateRoute}
        originRef={originRef}
        destinationRef={destinationRef}
      />
    </Container>
  );
}

export default Directions;
