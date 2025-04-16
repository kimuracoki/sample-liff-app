import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import ReadQRCode from "./components/ReadQRCode";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
        liff
          .getProfile()
          .then((profile) => {
            setName(profile.displayName);
            setPicture(profile.pictureUrl ? profile.pictureUrl : "");
          })
          .catch((err) => {
            console.log("error", err);
          });
      })
      .catch((e: Error) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });

  return (
    <div className="App">
      <ReadQRCode></ReadQRCode>
      <h1>create-liff-app</h1>
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      {name && <p>こんにちは、{name}さん</p>}
      {picture && <img width={"100%"} src={picture}></img>}
    </div>
  );
}

export default App;
