# Passing State as Props
You will do this often, an example is the following:
```jsx
// App.jsx
export default function App() {
    const [count, setCount] = React.useState(0)
    ...
    
    return (
        <main className="container">
            <div className="counter">
                <button
                    className="minus"
                    onClick={subtract}
                    aria-label="Decrease count"
                >-</button>

                <Count number={count} />

                <button
                    className="plus"
                    onClick={add}
                    aria-label="Increase count"
                >+</button>
            </div>
        </main>
    )
}

// Count.jsx
export default function Count(props) {
    console.log("Count rendered")
    <button>Click here</button>
    return (
        <h2 className="count">{props.number}</h2>
    )
}
```
## What if You want to change the state from the Count?
To do that, you gotta pass a function to the component's instance and that function (event) is seen as a prop.
```jsx
...
<Count  onClick={handleClick}/>
// Count.jsx
export default function Count(props) {
    console.log("Count rendered")
    <button onClick = {props.onClick}>Click here</button>
    return (
        <h2 className="count">{props.number}</h2>
    )
}
```