import "./navbar.scss";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";
import useScroll from "../../hooks/useScroll";

const Navbar = () => {
  const isScrolled = useScroll(75);
  return (
    <nav className={`navbar ${isScrolled ? "navbar__scrolled" : ""}`}>
      <NavLogo />
      <NavLinks />
    </nav>
  )
}

export default Navbar;