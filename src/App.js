import { useJsApiLoader } from "@react-google-maps/api";
import Directions from "./Components/Directions";

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) return <></>;
  return <Directions />;
}

export default App;
