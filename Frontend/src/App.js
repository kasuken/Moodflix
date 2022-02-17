import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Movies from "./pages/Movies/Movies";
import Welcome from "./pages/Welcome/Welcome";
import {AnimatePresence} from "framer-motion";

const App = () => (
  <AnimatePresence exitBeforeEnter>
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </>
  </AnimatePresence>
)

export default App;
