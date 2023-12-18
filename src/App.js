import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef } from "react";
import SimplePeer from "simple-peer";

function App() {
  const myVideoRef = useRef();
  const peerVideoRef = useRef();
  let peer;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myVideoRef.current.srcObject = stream;

        peer = new SimplePeer({
          initiator: window.location.hash === "#init",
          trickle: false,
          stream,
        });

        peer.on("signal", (data) => {
          // Enviar o objeto 'data' para o outro participante
        });

        peer.on("stream", (stream) => {
          peerVideoRef.current.srcObject = stream;
        });
      })
      .catch((error) =>
        console.error("Erro ao acessar câmera/microfone:", error)
      );

    return () => {
      peer && peer.destroy();
    };
  }, []);

  return (
    <div>
      <p>teste</p>
      <video ref={myVideoRef} autoPlay muted style={{ width: "50%" }} />
      <video ref={peerVideoRef} autoPlay style={{ width: "50%" }} />
    </div>
  );
}

export default App;
