import React, { useState, useRef, useCallback } from "react";
function Title({ value }) {
  return <h4>{value}</h4>;
}
function Result({ value }) {
  return <h4>Result: {value}</h4>;
}
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
/*
 * Basic completion of the question without taking
 * optimization into account
 */
function Reverse1() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  const handleButtonClick = () => {
    const reverseValue = value.split("").reverse().join("");
    setResult(reverseValue);
    setValue("");
  };
  return (
    <div className="reverse-string">
      <Title value="Reverse String" />
      <input value={value} onChange={handleInputChange} />
      <Button onClick={handleButtonClick}>submit</Button>
      <Result value={result} />
    </div>
  );
}
/*
 * Form should not re-render when typing in the input
 * useRef prevents input state from updating unnecessarily
 * see https://reactjs.org/docs/hooks-reference.html#useref
 */
function Reverse2() {
  const inputRef = useRef();
  const [result, setResult] = useState("");
  const handleButtonClick = () => {
    const { value } = inputRef.current;
    const reverseValue = value.split("").reverse().join("");
    setResult(reverseValue);
    inputRef.current.value = "";
  };
  return (
    <div className="reverse-string">
      <Title value="Reverse String" />
      <input ref={inputRef} />
      <Button onClick={handleButtonClick}>reverse</Button>
      <Result value={result} />
    </div>
  );
}
/*
 * Title should never re-render (not while typing and not on submit)
 * use React.memo because we know Title doesn't need to frequently re-render
 * (if Title value were to change all the time, memo would be inefficient)
 * see https://reactjs.org/docs/react-api.html#reactmemo
 */
const MemoTitle = React.memo(Title);
function Reverse3() {
  const inputRef = useRef();
  const [result, setResult] = useState("");
  const handleButtonClick = () => {
    const { value } = inputRef.current;
    const reverseValue = value.split("").reverse().join("");
    setResult(reverseValue);
    inputRef.current.value = "";
  };
  return (
    <div className="reverse-string">
      <MemoTitle value="Reverse String" />
      <input ref={inputRef} />
      <Button onClick={handleButtonClick}>reverse</Button>
      <Result value={result} />
    </div>
  );
}
/*
 * Button should never re-render (not while typing and not on submit)
 * use React.memo for the Button component, too
 * use React.useCallback to make sure that handleButtonClick holds the
 * same reference every time this functional component is rendered
 * see https://reactjs.org/docs/hooks-reference.html#usecallback
 */
const MemoButton = React.memo(Button);
function Reverse4() {
  const inputRef = useRef();
  const [result, setResult] = useState("");
  const handleButtonClick = useCallback(() => {
    const { value } = inputRef.current;
    const reverseValue = value.split("").reverse().join("");
    setResult(reverseValue);
    inputRef.current.value = "";
  }, []);
  return (
    <div className="reverse-string">
      <MemoTitle value="Reverse String" />
      <input ref={inputRef} />
      <MemoButton onClick={handleButtonClick}>reverse</MemoButton>
      <Result value={result} />
    </div>
  );
}
function Answers() {
  return (
    <>
      <h1>React coding challenge answers</h1>
      <ul>
        <li>
          Reverse the submitted string on "Submit"
          <Reverse1 />
        </li>
        <li>
          Form should not re-render while entering an input
          <Reverse2 />
        </li>
        <li>
          Title should never re-render
          <Reverse3 />
        </li>
        <li>
          Button should never re-render
          <Reverse4 />
        </li>
      </ul>
    </>
  );
}
export default Answers;
