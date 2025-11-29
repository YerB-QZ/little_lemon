import "./Nav.css"
import { Link } from "react-router-dom";

function Nav() {

return (

<nav  className="nav">
<Link to="/" className = "nav-item"> Homepage </Link>
<Link to = "/booking" className ="nav-item"> Booking Page </Link>
</nav>

);
};

export default Nav;