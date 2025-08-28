import React from "react"
import IngredientsList from "./IngredientsList"
import ChefClaude from "./ChefClaude"
import Recipe from "./Recipe"
import {getRecipeFromMistral} from "/src/ai.js"


export default function Main(){

    const [ingredients, setIngredients] = React.useState([])
    // const [isShown, setIsShown] = React.useState(false)
    const [recipe, setRecipe] = React.useState('')

    let recipeSection = React.useRef(null)

    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView()
        }
    }, [recipe])

    function addIngredients(formData){
        const ingredient = formData.get("ingredient")
        setIngredients(prevIngredient => ([...prevIngredient, ingredient]))
    }

    async function toggleRecipe() {
        const recipe = await getRecipeFromMistral(ingredients)
        setRecipe(recipe)
    }

    
    return(
        <main>
            <form action={addIngredients} className="add-ingredient-form">
                <input 
                    aria-label="Add ingredient"
                    placeholder="e.g. oregano"
                    type="text"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 ? <IngredientsList ingredients={ingredients}/> : null}
            {ingredients.length > 3 ? <ChefClaude isShown={recipe ? true : false} toggleIsShown={toggleRecipe} ref={recipeSection}/> : null}
            {recipe && <Recipe recipe={recipe} />}
        </main>
    )
}