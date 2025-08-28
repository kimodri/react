# On Event Listeners
Usually when typing for event listeners, what you do is write the function at the top of the component before the `return`:

```jsx
mport ReactDOM from 'react-dom/client';

function App() {
  
  function handleClick() {
    console.log("I was clicked!")
  }
  
  return (
    <main className="container">
      <button onClick={handleClick}>Click me</button>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

Here is the documentation:
> https://react.dev/learn/responding-to-events