# `useEffect`

Docs: [https://react.dev/reference/react/useEffect](https://react.dev/reference/react/useEffect)

### Two parameters

1. **Callback function** – the effect (the thing React should do after render).
2. **Dependencies array** – tells React *when* to re-run the effect.


### Example 1: Empty dependencies

```jsx
React.useEffect(function() {
  console.log("Effect ran")
  fetch("https://swapi.dev/api/people/1")
    .then(res => res.json())
    // .then(data => setStarWarsData(data))
}, []); // empty array
```

This is like saying:

> “Why would I run the function again if nothing in my dependencies changed? I don’t depend on anything, so just run once on mount.”


### Example 2: With dependencies

```jsx
React.useEffect(function() {
  console.log("Effect ran")
  fetch(`https://swapi.dev/api/people/${count}`)
    .then(res => res.json())
    // .then(data => setStarWarsData(data))
}, [count]);  
```

This is like saying:

> “Every time `count` changes, I should re-run this effect. Because the thing I depend on (`count`) has changed, so the fetch URL must change too.”


### Why `useEffect` exists

React’s render is supposed to be pure:

* Given state + props → React calculates the UI.
* Nothing else should “leak” out during rendering (like API calls, timers, or touching `window`).

But in real apps, we often need to interact with the outside world:

* Fetching data from APIs.
* Starting/stopping timers.
* Adding/removing event listeners on `window` or `document`.
* Reading/writing to `localStorage`.

This is like saying:

> “I have something that React itself doesn’t control. I need to run it after React paints the UI. That’s what `useEffect` is for.”

### Cleanup function (optional return)

```jsx
useEffect(() => {
  function handleResize() {
    console.log("resized")
  }
  window.addEventListener("resize", handleResize)

  // cleanup: React calls this before unmount or before re-running effect
  return () => {
    window.removeEventListener("resize", handleResize)
  }
}, [])
```

This is like saying:

> “If I set something up (like a listener), I also need to clean it up when I’m done. Otherwise it just stays there forever and causes bugs.”

# `async` / `await`

* `async` makes a function return a Promise.
* `await` pauses until a Promise resolves.

This is like saying:

> “Hey, this line of code is asynchronous. Don’t move on yet — wait until it finishes, then continue.”

Used often in `useEffect` when fetching data:

```jsx
useEffect(() => {
  async function fetchData() {
    const res = await fetch("https://swapi.dev/api/people/1")
    const data = await res.json()
    console.log(data)
  }
  fetchData()
}, [])
```

### Rule of Thumb for when to use `useEffect`

This is like asking myself a checklist:

* Am I only updating React state or UI based on props/state?
  → No `useEffect`. (React already knows how to do that.)

* Am I touching something outside React’s control (like `window`, `document`, APIs, timers, sockets, storage)?
  → Yes, I must use `useEffect`.



React-managed things:

```jsx
<button onClick={handleClick}>Click me</button>
```

This is like saying:

> “I’ll let React handle the event for me.”
> React attaches and cleans up automatically.

Non-React things:

```jsx
window.addEventListener("resize", handleResize)
```

This is like saying:

> “I’m stepping outside React’s babysitting. I need to manage setup and cleanup myself → useEffect.”
