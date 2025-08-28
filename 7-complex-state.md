# Complex States
## `state` and Array
- Often with array we don't want to just `.push()` because it affects the old array and therefore we cannot reference it. What we can do then is the following:
```jsx
function handleSubmit() {
      setMyFavoriteThings(prevFavThings => [...prevFavThings, "Test"])
  }
```
For a better look on how we manipulate lists states:
```jsx
export default function Main() {


    const [ingredients, setIngredients] = React.useState([])
    const ingredientsListItems = ingredients.map(ingredient => {
        return <li key={ingredient}>{ingredient}</li>
    })

    function handleSubmit(event) {

        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        setIngredients(prevList => [...prevList, newIngredient])
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            <ul>
                {ingredientsListItems}
            </ul>
        </main>
    )
}
```
## Updating State Objects
Let's say we have this in our `state`:
```jsx
export default function App() {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (212) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: true
    })
 ...
```
we may be tempted to do:
```jsx
function handleClick(){
    setContact(prev => {
        return(
            {
                isFavorite = !prev.isFavorite
            }
        )
    })
}
```
That is tempting, but we don't do that because we are just returning a **new** object, instead what we can do is this:
```jsx
function handleClick(){
    setContact(prev => {
        return(
            {
                ...prev, // Spreading the object
                isFavorite = !prev.isFavorite
            }
        )
    })
}
```