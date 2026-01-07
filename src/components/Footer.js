import "./Footer.css"
import {MealCard} from "./mealCard"
import greekSalad from "../images/greek salad.jpg";
import bruchetta from "../images/bruchetta.svg";
function Footer() {

    const meals = [
        {
            image: greekSalad,
            title: "Greek Salad",
            description: "The famous greek salad of crispy lettuce, peppers, olives and fetta.",
            price: "$12.99",
        },
        {
            image: bruchetta,
            title: "Bruchetta",
            description: "Our Bruchetta is made from grilled bread that has been smeared",
            price: "$5.89",
        },
    ];


return (

<footer className="Footer">
    <h1>This week specials!</h1>
{meals.map((meal,index) => (

    <MealCard
    key = {index}
    image = {meal.image}
    title = {meal.title}
    description = {meal.description}
    price = {meal.price}
/>))
}
</footer>

);
};

export default Footer;