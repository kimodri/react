# Custom Components 
Remember the last project where you have to do this:
- **Remember** that components should only return one element and therefore if you have more than one tag, you must enclose them inside a parent tag
```jsx
import { createRoot } from 'react-dom/client'

const root  = createRoot(document.getElementById('root'));

root.render(
  <div>
    <img width="40px" src="src/assets/react.svg"/>
    <h1>Fun Facts about React</h1>
    <ul>
      <li>Was first released in 2013</li>
      <li>Was originally created by Jordan Walke</li>
      <li>Has well over 100k stars on GitHub</li>
      <li>Is maintained by Meta</li>
      <li>Powers thousands of enterprise apps, including mobile apps</li>
    </ul>
  </div>
)
```

In react, you do not actually do that instead you create components:
```jsx
function TemporaryFunction(){
    return(
        <div>
            <img width="40px" src="src/assets/react.svg"/>
            <h1>Fun Facts about React</h1>
            <ul>
                <li>Was first released in 2013</li>
                <li>Was originally created by Jordan Walke</li>
                <li>Has well over 100k stars on GitHub</li>
                <li>Is maintained by Meta</li>
                <li>Powers thousands of enterprise apps, including mobile apps</li>
            </ul>
        </div> 
    )
}
```

And you just render it by doing:
```jsx
root.render(
    <TemporaryFunction />
)
```
## Fragment
When you are returning a component you should be only returning a one parent tag like a `<div></div>` but if you do not want to do that:
```jsx
import { Fragment } from "react"

function MyComponent(){
    return(
        <Fragment>
            ...
        </Fragment>
    );
}
```
or just do:
```jsx
import { Fragment } from "react"

function MyComponent(){
    return(
        <>
            ...
        </>
    );
}
```
## Parent Components
This is just having a component inside a component. For example:
```jsx
function Page() {
    return (
        <>
            <header>
                ...
            </header>
            <main>
                ...
            </main>
        </>
    )
}
```
If you want to separate the `<header></header>` and create another component for it, you can do:
```jsx
function Header(){
    return(
        <header> ... </header>
    )
}

function Page(){
    <>
        <Header />
        <main>
            ...
        </main>
    </>
}
```
You can even isolate the `<main></main>` into another component and the nest it inside the `Page` component for more modularity.

This can be seen in **cs50** as well:
```javascript
function Hello(props) {
    return (
        <h1>Hello</h1>
    );
}
function App() {
    return (
        <div>
            <Hello />
            <Hello />
            <Hello />
        </div>
    );
}
```
