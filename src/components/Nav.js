import "./Nav.css"
import { NavLink} from "react-router-dom";
import { ReactComponent as HomeIcon } from "../images/home icon.svg";
import logo from "../images/Logo.svg";
import hamburger_menu from "../images/icon _hamburger.svg";
import basket from "../images/Basket.svg";


function Nav() {

    /*const {pathname} = useLocation();*/

return (

<nav  className="nav">
  <div className="nav-left">
  <img src = {hamburger_menu} className="menu-img" alt = "Hamburger menu"/> 
  <NavLink to = "/" className ="nav-item">
  <HomeIcon className="nav-icon"/>
  <span>Home</span>
  </NavLink>
  </div>
   <img src = {logo} className="logo-img" alt = "Logo Little Lemon R"/>  
  <div className="nav-right">
   <img src = {basket} className="basket-img" alt= "Basket Menu"/>
  </div>
 
</nav>

);
};

export default Nav;