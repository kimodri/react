# Dynamic Styling in React

## In-line styling

  - Often we want to change styling on components based on a state or prop. In React, this is handled through **in-line styling**, where we pass a JavaScript object with CSS properties as the value of the `style` attribute. The CSS properties are written in **camelCase**.

<!-- end list -->

```jsx
const styles = {
    backgroundColor: darkMode ? "#222222" : "#cccccc"
}
return (
    <button style={styles}></button>
)
```

  - In the provided code, the `App` component receives a `darkMode` prop. We create a `styles` object with a `backgroundColor` property. The value of this property is determined by a **ternary expression** that checks if the `darkMode` prop is `true`. If it's true, the background color is set to a dark gray (`#222222`), otherwise it's a light gray (`#cccccc`).
  - The `styles` object is then passed as the value for the `style` prop on the `<button>` component. This allows the background color of the buttons to **dynamically change** based on the `darkMode` prop.
  - The `map` function iterates over the `pads` array, creating a button for each item. Since each button gets the same `styles` object, they all share the same dynamic styling.

-----