import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import ReadQRCode from "./components/ReadQRCode";
import QRScannerModal from "./components/QRScannerModal";
import { Button, Container, Typography } from "@mui/material";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Ticket Reader
      </Typography>
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        チケットを読む
      </Button>
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      {name && <p>こんにちは、{name}さん</p>}
      {picture && <img width={"40vw"} src={picture}></img>}
      <QRScannerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
}

export default App;
