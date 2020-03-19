# use-observer
Custom hook for IntersectionOberserver


## Installation
```
npm i use-observer-hook
```

## Usage
Pass in your `ref` that you want to observe

Example:
```jsx
function App() {
  const ref = useRef(null);
  useObserver(() => {
    // do magic
  }, ref);
  return <div ref={ref} />;
}
```
Let the hook return the `ref` for you

Example:
```jsx
function App() {
    const setRef = useObserver(() => {
    // do magic
  });

  return <div ref={setRef} />;
}
```
If you want the observer to be updated depending on a prop or state just pass in a `ref` and then let the hook return the a new `ref` which you then set to an element.

Example:
 ```jsx
function App({ someProp }) {
  const ref = useRef(null);
  const setRef = useObserver(() => {
    // do magic
  }, ref);

  useEffect(() => {
    ref.current = someProp;
  }, [someProp]);

  return <div ref={setRef} />;
}
```
