import { useEffect, useState } from "react";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "e1436cd77d724911b001a3dc401fe973";
export default function Search({ foodData, setFoodData }){
    
    const [query, setQuery] = useState("pizza");

    useEffect(() => {
        async function fetchFood(){
         const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
         const data = await res.json();
         console.log(data.results);
         setFoodData(data.results);
        }
        fetchFood();
    }, [query])

    return(
    <div className={styles.searchContainer}>
        <input value={query}
        className={styles.input} 
        onChange={(e) => setQuery(e.target.value)} 
        type="text" />
    </div>);
}