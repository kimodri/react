# Forms
Forms in React work much like plain HTML forms, but you often handle their submission yourself.
```jsx
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
```
## Preventing Default Submission

By default, submitting a form would reload the page. To stop that:
```jsx
event.preventDefault()
```
## Accessing Form Data
To grab the values from the form:
```js
const formEl = event.currentTarget  // the form where the handler is attached
const formData = new FormData(formEl)
const newIngredient = formData.get("ingredient")
```
- Why event.currentTarget?
    - event.target = the specific element that triggered the event (like the button).
    - event.currentTarget = the element the listener is bound to (the <form> itself).

Using currentTarget ensures you always get the entire form.

## Resetting the Form
After handling the data, you can clear the form fields:
```jsx
formEl.reset()
```
This returns the form to its initial state, ready for the next input.

## Form Action in React
React allows you to use either:
1. A URL (classic HTML form style).
2. A JavaScript function (React-style).
- Remember that `id=` is used for `<label htmlFor=""></label>` and `name=` is what you use in `formData.get(...)`
```jsx
<h1>Signup form</h1>
<form action={signUp}>
  <input type="email" name="email" />
  <button>Sign up</button>
</form>
```
**Note:**
- You cannot specify method or encType when using a function as action. React overrides them.
- When submitted, React calls your function with a FormData object.
```jsx
function signUp(formData) {
  const email = formData.get("email")
  console.log(email)
}
```
### Key Clarification
- Unlike HTML forms, no automatic HTTP request is made when you pass a function.
- **That doesn’t mean you can’t talk to the server — you can still send the data yourself with fetch or axios inside your function.**
- So it’s not “just local data.” It’s simply that React puts you in charge of how/when the backend is contacted.

## Talking to Django from React
- Even though React doesn’t auto-submit, you can still send the data to Django with `fetch` or `axios`.

`React:`
```jsx
async function signUp(formData) {
  const email = formData.get("email")

  // Send to Django backend
  const response = await fetch("http://localhost:8000/signup/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    credentials: "include" // important if you’re using sessions/cookies
  })

  const result = await response.json()
  console.log(result)
}
```
`Django view (views.py)`
```python
from django.http import JsonResponse
import json

def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        # Save to database (using ORM)
        # Example: User.objects.create(email=email)
        return JsonResponse({"message": f"User {email} created!"})
    return JsonResponse({"error": "Invalid request"}, status=400)
```

`urls.py`
```python
from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.signup, name="signup"),
]
```
- So the React function (fetch) is the bridge between your form and Django.

## Text Area
```jsx
 <label htmlFor="description">Description:</label>
  <textarea id="description" name="description"></textarea>
```
## Radio Button
- Remember that for you to be able to select just one radio button, what you would need to do is have them the same `name=`
```jsx
  <fieldset>
    <legend>Employment Status:</legend>
    <label>
      <input type="radio" name="employmentStatus" />
      Unemployed
  </label>
    <label>
      <input type="radio" name="employmentStatus" />
      Part-time
  </label>
    <label>
      <input type="radio" name="employmentStatus" />
      Full-time
  </label>
  </fieldset>
```
- If you do: `const employment = formData.get("employmentStatus")`
- It will return `on`
- You would need to add `value=` attribubte:
```jsx
   <label>
      <input type="radio" name="employmentStatus" value="full-time"/>
      Full-time
  </label>
```
### Default value
- 
```jsx
<input type="radio" name="employmentStatus" value="full-time" defaultChecked={true}/>
```
## Check boxes
```jsx
<fieldset>
    <legend>Dietary restrictions:</legend>
    <label>
      <input type="checkbox" name="dietaryRestrictions" value="kosher" />
      Kosher
    </label>
    ...
```
- Much like radio, you can also use `defaultChecked={true}`
- Instead of using `formData.get("dietaryRestrictions")`, use `formData.getAll(...)`

## Select Option
```jsx
 <label htmlFor="favColor">What is your favorite color?</label>
  <select id="favColor" name="favColor" defaultValue="indigo" required>
    <option value="" disabled>-- Choose a color --</option>
    <option value="red">Red</option>
    <option value="orange">Orange</option>
    ...
  </select>
```
## `Object.fromEntries(formData)`
``` js 
function signUp(formData) {
    console.log(Object.fromEntries(formData))
  }
```
> `{email: 'joe@schmoe.com', password: 'password123', description: 'This is a description', employmentStatus: 'full-time', dietaryRestrictions: 'gluten-free', favColor: 'orange'}`

### Issue
An **issue** here is that only one value will get returned from the checkbox.
- What you can do is manually get the checkboxes value
- have another `json` by spreading the value of `Object.fromEntries(formData)`
```jsx
const json = {
  ...Object.fromEntries(formData),
  dietaryData: arrayOfDietaryData
}
```