Let's say you have this:
```jsx
import React from "react"

export default function WindowTracker() {
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    
    React.useEffect(() => {
        window.addEventListener("resize", function() {
            console.log("Resized")
            setWindowWidth(window.innerWidth)
        })
    }, [])
    
    return (
        <h1>Window width: {windowWidth}</h1>
    )
}
```
This is a component for the `h1`:
![Alt text](assets\cleanup.jpeg)

What will happen of you toggle it on and off 7 times, and then resize?
> When we are adding an event listener to the `window` object, that is ahppening outside react, when you toggle it off (you don't use the component anymore), even though that is off, you are not saying to the outside world (window) that you are done with the event listener. When you toggle it on it is `remounting` the window component.

Remember that when we are using a `useEffect` we pass a function as the first argument but we are not returning in this case (specifically), and you may ask what react does to the `return` it turns out that what we can optionally return is a function:


when this component gets unmounted and react now wants to clean the useEffect, it will use the function you returned:
```jsx
    React.useEffect(() => {
        function watchWindowWidth () {
            console.log("Resized")
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", watchWindowWidth)
        return function() {
            window.removeEventListener("resize", )
        }
    }, [])
```
You want to do this manually because whatever you did to the outside world, react cannot control so even though the component unamounted, it may still run