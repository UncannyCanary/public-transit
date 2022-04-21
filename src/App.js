import { useJsApiLoader } from "@react-google-maps/api";
import { Spinner } from "react-bootstrap";
import Directions from "./Components/Directions";

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) return <Spinner animation="border" />;
  return <Directions />;
}

export default App;
