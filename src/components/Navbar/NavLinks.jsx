import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="navbar__nav">
      <ul className="navbar__nav navbar__navlinks">
        <li className="navbar__navlinks--link">
          <NavLink to="/movies" activeClassName="activeNavLink">
            Movies
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
export default NavLinks

