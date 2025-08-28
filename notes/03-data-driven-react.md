# Using Data when Creating a Component
- This section will talk about the use of props
- Creating components from the array of data

## Props
Let's say you have this:
```jsx
function App() {
    return (
        <div className="contacts">
            <Contact />
            <Contact />
            <Contact />
            <Contact />
        </div>
    )
}
```

We need to find a way to pass arguments to each of this component.

- You can pass in, whatever you want
```jsx
<Contact whateverIwant="something" />
```
- Now you still haven't started yet on how we can consume the properties (props) that we are passing on the components

After passing the correct props you may have:
```jsx
  <Contact
        img="./images/mr-whiskerson.png"
        name="Mr. Whiskerson"
        phone="(212) 555-1234"
        email="mr.whiskaz@catnap.meow"
    />
```

Now for these properties to work, you need to pass an `object` to the declaration of these components:
```jsx
function Contact(props){

}
```
- In python context this is like `**kwargs`. Now, remember that `<Component />` is simply a function call.

## The `props` object
Knowing that `props` is an object, you can now subsitute its keys to the functions:
```jsx
export default function Contact(props) {
    console.log(props)
    return (
        <article className="contact-card">
            <img
                src={props.img}
                alt={"Photo of Mr." + props.name}
            />
            <h3>props.name</h3>
            <div className="info-group">
                <img
                    src="./images/phone-icon.png"
                    alt="phone icon"
                />
                <p>{props.phone}</p>
            </div>
            <div className="info-group">
                <img
                    src="./images/mail-icon.png"
                    alt="mail icon"
                />
                <p>{props.email}</p>
            </div>
        </article>
    )
}
```
## Props Destructuring
Apparently `JS Object` can be unwrapped. Much like python, to do that, you can:
```javascript
const myObj = {
    img: "...",
    name: "...",
    phone: "...",
    email: "..."
}

const {img, name, ...} = myObj // this should match
console.log(img)
```
You can apply the same thing in function declaration so getting the function from above, we can do:
```jsx
export default function Contact({img, name, phone, email}) { 
    return <h1>{name}</h1>
}
```
## Conditional Rendering
You can add conditions here for example if a joke does not have a setup:
```jsx
export default function Joke(props) {
    return (
        <>
            {props.setup && <p className="setup">Setup: {props.setup}</p>}
            <p className="punchline">Punchline: {props.punchline}</p>
            <hr />
        </>
    )
}
```
or like this:
```jsx
    <p style={{display: props.setup ? "block" : "none"}} className="setup">Setup: {props.setup}</p>
    <p className="punchline">Punchline: {props.punchline}</p>
    <hr />
```
## Passing Non-String
You can also pass non-string for example:
```jsx
<Joke
        punchline="It's hard to explain puns to kleptomaniacs because they always take things literally."
        upvotes={10}
        isPun={true}
        comments={[
            {author: "", text: "", title: ""},
            {author: "", text: "", title: ""}
        ]}
    />
```
So maybe to get the `author`, you can do:

`prop.comments[0].author`

## Importing Static Assets
Sometimes just hardcoding the path of the images, does not work so you gotta do:
```jsx
import mrWhiskerson from "./images/mr-whiskerson.png"
import fluffykins from "./images/fluffykins.png"
import felix from "./images/felix.png"
import pumpkin from "./images/pumpkin.png"
```

## Rendering Arrays
React can render array for example:
```jsx
export default function App() {
    const ninjaTurtles = [
        <h2>Donatello</h2>, 
        <h2>Michaelangelo</h2>,
        <h2>Rafael</h2>,
        <h2>Leonardo</h2>
    ]
    return (
        <main>
            {ninjaTurtles}
        </main>
    )
}
```
This will return 4 `h2` on the browser. Now if it happens that all you have is an array of untagged elements, what you can do is apply `map` to it so you will have a new tagged array that you can use inside a component.

## Data and `.map()`
Let's say you have an array of objects:
```json
[
    {
        setup: "I got my daughter a fridge for her birthday.",
        punchline: "I can't wait to see her face light up when she opens it."
    },
    ...
]
```
You can do then is have it in your `.jsx` and then run a `.map()` on it:
- Remember that the argument should be enclosed inside `{}`

```jsx
// App.jsx
export default function App{
    
    const taggedJokes = jokes.map((joke) => {
        return(
        <Joke
            setup={joke.setup} 
            punchline={joke.punchline}
        />)
    })

    return(
        <main>
            {taggedJokes}
        </main>
    )
}
```
The joke component is the following:
```jsx
export default function Joke(props) {
    return (
        <>
            {props.setup && <p className="setup">Setup: {props.setup}</p>}
            <p className="punchline">Punchline: {props.punchline}</p>
            <hr />
        </>
    )
}
```

## `key` error with Data and `.map()`
Simply by doing the above code, you can get an error saying:

```Each child in a list should have a unique "key" prop. Check the render method of `App`. See https://react.dev/link/warning-keys for more information.```

That means that the data is expected to have a `key` attribute like in a database, and you put the **key** in the function call of the `Joke`

so it should be:
```jsx
export default function App{
    
    const taggedJokes = jokes.map((joke) => {
        <Joke 
            key={joke.key} // if there's any otherwise use your own
            setup={joke.setup} 
            punchline={joke.punchline}
        />
    })

    return(
        <main>
            {taggedJokes}
        </main>
    )
}
```

Take the following from the react documentation:
```jsx
export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```
## `prop as Object`
There will be times when the props you are assigning to a component gets big and so what you can do is just pass the entire object as a prop so you will have a `prop``dot``object``dot``params`:
```jsx
export default function App{
    
    const taggedJokes = jokes.map((joke) => {
        <Joke 
            object={joke}
        />
    })

    return(
        <main>
            {taggedJokes}
        </main>
    )
}
```
Then inside the `Joke`:
```jsx
export default function Joke(props) {
    return (
        <>
            {props.setup && <p className="setup">Setup: {props.object.setup}</p>}
            <p className="punchline">Punchline: {props.object.punchline}</p>
            <hr />
        </>
    )
}
```
### Another Trick: Spread
You can do this:
```jsx
export default function App() {
    
    const entryElements = data.map((entry) => {
        return (
            <Entry
                key={entry.id}
                {...entry}
            />
        )
    })
```
- What this does is react sees that and it will take all the property of the `entry` object adn create a new prop that matches the property of `entry`
- It's like doing:
    - id={entry.id} 
    - ...
- You can use `prop.id` again