import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import "./InboxFishList.css";
import axios from "axios";
import FishInItem from "./FishInItem";
import background from "./BackgroundInbox.png";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../Message/messages";

const InboxFishList = () => {
  const baseURL = "https://fish-uat.globalpsa.com/AuthServer/getInbox/";
  const [fishesIn, setFishesIn] = useState([]);
  const [locale, setLocale] = useState("en");
  const sessionToken = sessionStorage.getItem("sessionToken");
  const sessionDetails = {
    username: sessionToken,
    orderBy: "DESC",
    id: 1,
    sortBy: "datetime",
    offset: 0,
  };
  useEffect(() => {
    if (!sessionStorage.getItem("locale")) {
      sessionStorage.setItem("locale", "en");
    }
    const sessionLocale = sessionStorage.getItem("locale");
    setLocale(sessionLocale);
    axios
      .post(baseURL, sessionDetails)
      .then((res) => {
        setFishesIn(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(fishesIn);

  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {/* <div style={{ backgroundImage: `url(${background})` }}> */}
        <Table className="fixed-table">
          <thead>
            <tr>
              <th className="text-center">
                <FormattedMessage id="date" />
              </th>
              <th className="text-center">
                <FormattedMessage id="sentby" />
              </th>
              <th className="text-center">
                <FormattedMessage id="fishnumber" />
              </th>
              <th className="text-center">
                <FormattedMessage id="message" />
              </th>
            </tr>
          </thead>
          <tbody>
            {fishesIn.map((fishIn) => (
              <FishInItem
                key={fishIn.id}
                date={fishIn.date}
                name={fishIn.name}
                fishcount={fishIn.fishcount}
                message={fishIn.message}
              ></FishInItem>
            ))}
          </tbody>
        </Table>
        {/* </div> */}
      </IntlProvider>
    </>
  );
};

export default InboxFishList;
