import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Slider, Typography } from "@mui/material";
import { bitPayConf, firebaseConfig } from "./env";
const { Client, Env, Currency, Models, Tokens } = require("bitpay-sdk");

const bitPayClient = new Client(
  null,
  Env.Test,
  bitPayConf.BitPayConfiguration.EnvConfig.Test.PrivateKeyPath,
  Tokens
);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [value, setValue] = useState(50);
  const [textValue, setTextValue] = useState(Math.round(10 ** (50 / 10)));
  const [fontSize, setFontSize] = useState(0.2 + (4.6 * 50) / 100);

  const handleChange = (event: Event, value: number | number[]) => {
    value = typeof value == "number" ? value : value[0];
    setValue(value);
    setFontSize(0.4 + (8.6 * value) / 100);
    setTextValue(Math.round(10 ** (value / 10)));
  };


  return (
    <div className="App">
      <Slider
        defaultValue={50}
        aria-label="Default"
        valueLabelDisplay="auto"
        value={value}
        onChange={handleChange}
      />
      <Typography fontSize={fontSize + "rem"}>{textValue}</Typography>
      <img
        src="https://test.bitpay.com/cdn/en_US/bp-btn-pay-currencies.svg"
        style={{ width: "210px" }}
        alt="BitPay, the easy way to pay with bitcoins."
      />
    </div>
  );
}

export default App;
