import {NavLink} from "react-router-dom";
import {LOGO_URL} from "../../requests";

const NavLogo = () => {
  return (
    <NavLink to="/">
      <img className="navbar__logo" src={LOGO_URL} alt="Moodflix logo"/>
    </NavLink>
  )
}
export default NavLogo