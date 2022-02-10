import "./navbar.scss";
import NavLogo from "./NavLogo";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLogo />
      <NavLinks />
    </nav>
  )
}

export default Navbar;