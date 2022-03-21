import "./footer.scss";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { footerVariants } from "../../motionUtils";

const Footer = () => {
  const [ isMoviesPage, setIsMoviesPage ] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") setIsMoviesPage(true);
  }, [location]);

  return (
  <motion.footer className={`footer ${isMoviesPage ? "footer__movies" : ""}`} variants={footerVariants}>
    <span>Developed by</span>
    <a className="footer__linkWrp" href="https://github.com/Kasuken" target="_blank" rel="noreferrer">
      <span>Kasuken </span>
      <img className="footer__avatar" src="https://avatars.githubusercontent.com/u/2757486?v=4" alt="Kasuken Avatar" />
    </a>
    <span className="footer__linkWrp--and">&</span>
    <a className="footer__linkWrp" href="https://github.com/Th3Wall" target="_blank" rel="noreferrer">
      <span> Th3Wall</span>
      <img className="footer__avatar" src="https://avatars.githubusercontent.com/u/25078541?v=4" alt="Th3Wall Avatar" />
    </a>
  </motion.footer>
)};

export default Footer;