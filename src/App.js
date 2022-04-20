import { useJsApiLoader } from "@react-google-maps/api";
import Directions from "./Components/Directions";

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBgegtBlPki6qbu05Vh4fMZgctMFoujJn8",
    libraries: ["places"],
  });
  if (!isLoaded) return <></>;
  return <Directions />;
}

export default App;
