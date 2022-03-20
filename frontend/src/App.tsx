import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Routes } from "./navigation/Routes";
import { Connect } from "./pages/Connect";

function App() {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setAddress(document.cookie);
  }, [document.cookie]);

  return (
    <>
      {!address ? (
        <Connect setAddress={setAddress} />
      ) : (
        <Router>
          <Routes />
        </Router>
      )}
    </>
  );
}

export default App;
