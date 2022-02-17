import {NavLink, useLocation} from "react-router-dom";

const NavLinks = ({ isScrolled }) => {
  const history = useLocation();

  return (
    <div className="navbar__nav">
      <ul className="navbar__nav navbar__navlinks">
        <li className="navbar__navlinks--link">
          {history && history.pathname === "/movies" && (
            <NavLink to="/" className={isScrolled ? "scrolled" : ""}>
              Restart
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  )
}
export default NavLinks

