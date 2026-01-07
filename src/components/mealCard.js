export function MealCard({image,title,description,price}) {

return (

<div className="mealCard">
<img src = {image}
alt = ""/>
<div className="mealCardHeader">
<h2>{title}</h2>
<span className="price">{price}</span>
</div>
<p>{description}</p>
</div>

);
};