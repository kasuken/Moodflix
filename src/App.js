import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Catalogue from "./pages/Catalogue/Catalogue";
import Welcome from "./pages/Welcome/Welcome";
import Splash from "./pages/Splash/Splash";
import {AnimatePresence} from "framer-motion";

const App = () => (
  <AnimatePresence exitBeforeEnter>
    <Navbar />
      <Routes>
        <Route path="/splash" element={<Splash />} />
        <Route path="/camera" element={<Catalogue />} />
        <Route path="/home" element={<Homepage />} />
        <Route exact path="/" element={<Welcome />} />
      </Routes>
  </AnimatePresence>
)

export default App;
