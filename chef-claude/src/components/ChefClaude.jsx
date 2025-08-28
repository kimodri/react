export default function ChefClaude(props){
    return(
        <div ref={props.ref}className="recipe-div">
            <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
            </div>
            {/* <button onClick={props.toggleIsShown}>{props.isShown ? "Hide the Recipe" : "Get a Recipe"}</button> */}
            <button onClick={props.toggleIsShown}>Get a Recipe</button>
        </div>
    )
}