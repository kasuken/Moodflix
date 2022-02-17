import {NavLink} from "react-router-dom";
import {LOGO_URL, WHITE_LOGO_URL} from "../../requests";

const NavLogo = ({ isScrolled }) => {
  return (
    <NavLink to="/">
      <img className="navbar__logo" src={!isScrolled ? LOGO_URL : WHITE_LOGO_URL} alt="Moodflix logo"/>
    </NavLink>
  )
}
export default NavLogo