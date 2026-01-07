import "./Nav.css"
import { NavLink, useLocation, Link } from "react-router-dom";

function Nav() {

    const {pathname} = useLocation();

return (

<nav  className="nav">
  {pathname === "/" && <NavLink to = "/booking" className ="nav-item"> Booking Page </NavLink>}
  {pathname === "/booking" && <NavLink to="/" className = "nav-item"> Homepage </NavLink>}
  {pathname === "/" && <NavLink to="/confirmation" className = "nav-item"> Confirmation </NavLink>}
  {pathname === "/confirmation" && <NavLink to="/" className = "nav-item"> Hompage </NavLink>}
</nav>

);
};

export default Nav;