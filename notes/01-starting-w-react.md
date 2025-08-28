# How to Think in React
When dealing with react, all you gotta know is that it works in components and those are just javascript functions:
```jsx
function hello(){
    return(
        <h1 clasName="hello">Hello from hello function</h1>
    );
}
```
That is a component and what you need to know is that these components go inside a root, that is container in an html file:
```html
<html>
    <head>
        <title>First react app</title>
    </head>
    <body>
        <div id="root"></div>
        <script ...></script>
    </body>
</html>
```
So to include that inside the root there are different ways for example, in **cs50w**'s way it is:
```html
<body>
        <div id="app"></div>

        <script type="text/babel">
            function App() {
                return (
                    <div>
                        Hello!
                    </div>
                );
            }

            ReactDOM.render(<App />, document.querySelector("#app"));
        </script>
    </body>
```
- You can see that the root in cs50 is called app

Whereas in **scrimba**'s way it is:
```jsx
import { createRoot } from "react-dom/client"

const root = createRoot(document.getElementById("root"));

root.render(
    <hello />
);
```

And inside the **scrimba**'s html is:
```html
<body>
	<div id="root"></div>
	<script src="/index.jsx" type="module"></script>
</body>
```
## Doing this in JS
Now, `js` is an imperative programming language that means you are guiding it step by step and therefore if you want to do the same thing you can:
```javascript
const h1 = document.createElement('h1', null);
h1.className = "header";
h1.textContent = "Hello from hello function!";
document.getElementById('root').appendChild(h1);
```


## Vite's Disclaimer    
We can see from the above that we are referencing a `.jsx` file; if you make it a `.js` it will still work however in `vite` it is recommended that whenever we have a `.js` file that uses a `jsx` syntax (that is html elements inside a `js`), we should rename it a `.jsx`