import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="navbar__nav">
      <ul className="navbar__nav navbar__navlinks">
        <li className="navbar__navlinks--link">
          <NavLink to="/home" activeClassName="activeNavLink">
            Home
          </NavLink>
        </li>
        <li className="navbar__navlinks--link">
          <NavLink to="/camera" activeClassName="activeNavLink">
            Take a selfie
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
export default NavLinks

