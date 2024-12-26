import { useEffect, useState } from "react";
import styles from "./foodDetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }){

        const [food, setFood] = useState({})
        const [isLoading, setIsLoading] = useState(true);
        const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
        const API_KEY = "e1436cd77d724911b001a3dc401fe973";

        useEffect(() => {
            async function fetchFood(){
               const res = await fetch(`${URL}?apiKey=${API_KEY}`);
               const data = await res.json();
               console.log(data);
               setFood(data);
               setIsLoading(false);
            }
            fetchFood();
        }, [foodId]);

        return(<div className={styles.recipeCard}>
            <div>
                <h1 className={styles.recipeName}>{food.title}</h1>
                <img classNmae={styles.recipeImage} src={food.image} alt="" />

            <div className={styles.recipeDetails}>

            <span>
                <strong>⌚ {food.readyInMinutes} Minutes</strong>
            </span>
            <span>
                🧑‍🤝‍🧑<strong> Serves {food.servings}</strong>
            </span>
            <span>
                <strong>{food.vegetarian ? "🥬 Vegitarian": "🍗 Non-Vegitarian"}</strong>
            </span>
            <span>
                <strong>{food.vegan ? "✔️ Vegan": "❌ Vegan"}</strong>
            </span> 
            </div>
            <div>
               💲 <span>{food.pricePerServing/100} per serving</span>
            </div>
            </div>

            <div>
                <h1>Ingredients</h1>
                <ItemList food={food} isLoading={isLoading} />
                <h2>Instructions</h2>
                <div className={styles.recipeInstructions}>
                    <ol>
                        {isLoading ? <p>Is Loading...</p>: food.analyzedInstructions[0].steps.map((step) => (<li>{step.step}</li>))}
                    </ol>
                </div>
            </div>
        </div>
        );
}