import "./Main.css"
import restauranfood from "../images/restauranfood.jpg";
import { useNavigate } from "react-router-dom";



function Homepage() {
const navigate = useNavigate();
const handleReserve = () => {
  navigate("/booking");
};
return (
<section className="Main">
<section className="homepage">
<div className="pageText">
<h1>Little Lemon</h1>
<h2>Chicago</h2>
<p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
<button onClick={handleReserve}>Reserve a Table</button>
</div>
<div className="homeImage">
<img src = {restauranfood} alt = "Mediterranean restaurant food"/>
</div>
</section>
</section>


);
};

export default Homepage;