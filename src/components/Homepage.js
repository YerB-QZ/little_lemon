import "./Main.css"
import restauranfood from "../images/restauranfood.jpg";

function Homepage() {

return (
<section className="Main">
<section className="homepage">
<div className="pageText">
<h1>Little Lemon</h1>
<h2>Chicago</h2>
<p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
<button>Reserve a Table</button>
</div>
<div className="homeImage">
<img src = {restauranfood} alt = "Mediterranean restaurant food"/>
</div>
</section>
</section>


);
};

export default Homepage;