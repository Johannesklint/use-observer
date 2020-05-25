# use-observer
Custom hook for IntersectionOberserver


## Installation
```
npm i use-observer-hook
```

## Usage
Let the hook return the `ref` for you. 
```jsx
function App() {
  const ref = useObserver(() => {
    // do magic
  });

  return <div ref={ref} />;
}
```
You can alternatively pass dependencies to the array,
much like how `React.useEffect` works. Then the hook will update accordingly. 
```jsx
function App() {
  const ref = useObserver(() => {
    // do magic
  }, {}, [some, argument]);

  return <div ref={ref} />;
}
```

Specify options(root, threshold) to the hook
```jsx
function App() {
  const ref = useObserver(
    () => {
      // do magic
    },
    { root: null, threshold: 1.0 },
    [some, argument],
  );

  return <div ref={ref} />;
}
```
