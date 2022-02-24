import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
import EmotionModal from './components/EmotionModal/EmotionModal';
import Movies from "./pages/Movies/Movies";
import Welcome from "./pages/Welcome/Welcome";
import ClarityScript from "./components/ClarityScript/ClarityScript";
import {AnimatePresence} from "framer-motion";

const App = () => (
  <AnimatePresence exitBeforeEnter>
    <>
      <Navbar />
      <Modal />
      <EmotionModal />
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
      <ClarityScript />
    </>
  </AnimatePresence>
)

export default App;
