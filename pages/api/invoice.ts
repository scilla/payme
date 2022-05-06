import type { NextApiRequest, NextApiResponse } from "next";
import { bitPayConf } from "../env";
import { Buyer } from "bitpay-sdk/dist/Model/Invoice/Buyer";
import { json } from "stream/consumers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let body = {
    token: bitPayConf.BitPayConfiguration.EnvConfig.Test.ApiTokens.merchant,
    currency: "EUR",
    price: req.query.amount,
    buyer: {
      email: "sr.cilla@gmail.com"
    }
  };
  let invoice = await fetch(`https://test.bitpay.com/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  res.status(200).json(await invoice.json());
}
