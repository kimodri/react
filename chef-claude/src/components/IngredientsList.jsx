export default function IngredientsList(props){
    const plurality = props.ingredients.length > 1 ? "Ingredients" : "Ingredient" 

    const taggedIngredients = props.ingredients.map(ingredient=>(<li key={ingredient}>{ingredient}</li>))
    return(
        <> 
        <div className="ingredients-div">
            <h2 className="ingredients-title">{plurality} on Hand:</h2>
            <ul className="ingredients">
                {taggedIngredients}
            </ul>
        </div>
        </>

    )
}