import "./catalogue.scss";
import SelfieCamera from "../../components/SelfieCamera/SelfieCamera";
import {motion} from "framer-motion";

const Catalogue = () => {
  return (
    <motion.section className="catalogue page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SelfieCamera />
    </motion.section>
  )
}

export default Catalogue;