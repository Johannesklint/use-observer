# use-observer
Custom hook for IntersectionOberserver


## Installation
```
npm i use-observer-hook
```

## Usage
Pass in your ref that you want to observe
```jsx
function App() {
  const ref = useRef(null);
  useObserver(() => {
    // do magic
  }, ref);
  return <div ref={ref} />;
}
```
Let the hook return the ref for you
```jsx
function App() {
    const setRef = useObserver(() => {
    // do magic
  });

  return <div ref={setRef} />;
}
```
Pass in your ref that you want to observe, which is updated when some prop is passed but you don't want a re-render
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
