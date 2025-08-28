# React Note: Updating State for Arrays of Objects


## 1. Updating Array of Objects in State

When managing state that’s an **array of objects**, you must:

* Return a **new array** (immutability).
* Update only the object that changed.
* Leave unchanged objects as-is (don’t clone unnecessarily).

### Example: Toggling a property

```jsx
setPads(prevPads =>
  prevPads.map(obj =>
    obj.id === id
      ? { ...obj, on: !obj.on } // update this object
      : obj                     // return others as-is
  )
);
```

## 2. Pad Component Example

```jsx
export default function Pad(props) {
  return (
    <button 
      style={{ backgroundColor: props.color }}
      className={props.on ? "on" : undefined}
      onClick={() => props.toggle(props.id)}
    ></button>
  );
}
```

## 3. Breaking Down the `Pad` Component

### Props Used

* `props.color` → sets the background color of the button.
* `props.on` → determines whether the button is “active.”

  * If true, it applies the CSS class `"on"`.
  * If false, no extra class.
* `props.toggle` → function passed down from the parent (where the state lives).
* `props.id` → identifies which pad should be toggled.

### Why `onClick={() => props.toggle(props.id)}`?

This syntax can look confusing at first. Here is what happens:

1. React expects a function for `onClick`.

   ```jsx
   onClick={someFunction}
   ```

2. If you wrote:

   ```jsx
   onClick={props.toggle(props.id)}
   ```

   This would call `props.toggle` immediately when the component renders, instead of waiting for a click.

3. Instead, you give React a function to call later:

   ```jsx
   onClick={() => props.toggle(props.id)}
   ```

   * `() => ...` creates a new function (an arrow function).
   * Inside, it says: “when clicked, call `props.toggle` and give it this pad’s id.”
   * This way, `toggle` runs only when the button is clicked.

### Shortcut

* If you need to call a function with arguments on click, wrap it in `() => ...`.
* If you just need to pass a function directly (no arguments), you can do:

  ```jsx
  onClick={props.toggle}
  ```


## 4. Putting It All Together

Parent manages state:

```jsx
const [pads, setPads] = useState([
  { id: 1, color: "red", on: false },
  { id: 2, color: "blue", on: true },
]);

function toggle(id) {
  setPads(prevPads =>
    prevPads.map(pad =>
      pad.id === id ? { ...pad, on: !pad.on } : pad
    )
  );
}
```

Child (`Pad`) uses props:

```jsx
<Pad
  key={pad.id}
  id={pad.id}
  color={pad.color}
  on={pad.on}
  toggle={toggle}
/>
```

Clicking the button triggers `toggle(id)`, updating only that pad in the array.
