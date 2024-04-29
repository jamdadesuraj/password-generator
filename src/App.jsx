import { useState, useId, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const id = useId();
  const passwordRef = useRef();

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_:";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passGenerator();
  }, [length, numAllowed, charAllowed, passGenerator]);

  // useRef Hook

  const copyPassClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="bg-gray-600 rounded-lg p-4 w-full max-w-screen-md mx-auto shadow-lg">
        <h1 className="text-white">password generator</h1>
        <div className="flex mt-4">
          <input
            type="text"
            className="w-full rounded-lg py-3 px-3 border-none outline-none"
            placeholder="Enter Password"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-500 rounded-lg px-4 text-white"
            onClick={copyPassClipboard}
          >
            Copy
          </button>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <input
              type="range"
              min={0}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor={id} className="mx-2 text-orange-400 font-bold">
              Length : ({length})
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              className="h-4 w-4"
              defaultChecked={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
              id="numberInput"
            />
            <label htmlFor={id} className="mx-2 text-orange-400 font-bold">
              Number
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              className="h-4 w-4"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor={id} className="mx-2 text-orange-400 font-bold">
              Charactor
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
