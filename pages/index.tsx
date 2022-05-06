import type { NextPage, NextComponentType } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Slider, Typography } from "@mui/material";
import { bitPayConf, firebaseConfig } from "./env";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Dispatch, SetStateAction, useState } from "react";

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const Begger = (props: any) => {
  const [value, setValue] = useState(50);
  const [textValue, setTextValue] = useState(Math.round(10 ** (50 / 10)));
  const [fontSize, setFontSize] = useState(0.2 + (10.6 * 50) / 100);

  const handleChange = (event: Event, value: number | number[]) => {
    value = typeof value == "number" ? value : value[0];
    setValue(value);
    setFontSize(0.4 + (10.6 * value) / 100);
    setTextValue(Math.round(10 ** (value / 10)));
  };

  const openInvoice = (invoiceAmount: number) => {
    fetch(`/api/invoice?amount=` + invoiceAmount).then((res: Response) => {
      res.json().then((value) => {
        console.log(value);
        const script = document.createElement("script");
        script.innerHTML = `bitpay.enableTestMode();
        const event = new Event('closed');
          bitpay.onModalWillLeave(() => {
            window.dispatchEvent(event);
          }); 
          bitpay.showInvoice("${value.data.id}");
        `;
        console.log(script);
        window.addEventListener("closed", function (event) {
          props.setStatus("monitor")
        }, false);
        document.head.appendChild(script);
      });
    });
  };

  return (
    <>
      <h1 className={styles.title}>Pay me. Thank you.</h1>

      <Slider
        defaultValue={50}
        step={0.0001}
        aria-label="Default"
        valueLabelDisplay="auto"
        value={value}
        onChange={handleChange}
      />
      <Typography
        fontSize={fontSize + "rem"}
        style={{ wordBreak: "break-all", textAlign: "center" }}
      >
        {textValue}
      </Typography>
      <img
        onClick={() => {
          openInvoice(value);
        }}
        src="https://test.bitpay.com/cdn/en_US/bp-btn-pay-currencies.svg"
        style={{ width: "250px" }}
        alt="BitPay, the easy way to pay with bitcoins."
      />
    </>
  );
};

const Monitor = () => {
  return <>
    <h1 className={styles.title}>You closed the modal.</h1>
  </>;
};

const Home: NextPage = () => {
  const [status, setStatus] = useState("beggin");
  const [invoice, setInvoice] = useState({} as any)
  return (
    <div className={styles.container}>
      <Head>
        <script src="https://bitpay.com/bitpay.min.js"></script>
        <title>PayMe</title>
        <meta name="description" content="PayMe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {status == "beggin" ? <Begger setStatus={setStatus} setInvoice={setInvoice}/> : <Monitor />}
      </main>
    </div>
  );
};

export default Home;
