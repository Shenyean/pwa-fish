import React, { useEffect, useState } from "react";
import FishDate from "../FishIn/FishDate";
import Table from "react-bootstrap/esm/Table";
import axios from "axios";
import FishOutItem from "./FishOutItem";
import FishInItem from "../FishIn/FishInItem";
import "./OutBoxFishList.css";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../Message/messages";
import "./OutBoxFishList.css";
//import background from "./BackgroundInbox.png";

const OutBoxFishList = () => {
  const baseURL = "https://fish-uat.globalpsa.com/AuthServer/getOutbox/";
  const [fishesOut, setFishesOut] = useState([]);
  const sessionToken = sessionStorage.getItem("sessionToken");
  const [locale, setLocale] = useState("en");
  console.log(sessionToken);
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
        setFishesOut(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(fishesOut);
  return (
    <>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Table className="fixed-table">
          <thead className="stickyheader">
            <tr>
              <th className="text-center">
                <FormattedMessage id="date" />
              </th>
              <th className="text-center">
                <FormattedMessage id="sentto" />
              </th>
              <th className="text-center">
                <FormattedMessage id="fishnumber" />
              </th>
              <th className="text-center">
                <FormattedMessage id="message" />
              </th>
            </tr>
          </thead>
          <tbody className="normalBody">
            {fishesOut.map((fishOut) => (
              <FishOutItem
                key={fishOut.id}
                date={fishOut.date}
                name={fishOut.name}
                fishcount={fishOut.fishcount}
                message={fishOut.message}
              />
            ))}
          </tbody>
        </Table>
      </IntlProvider>
    </>
  );
};

export default OutBoxFishList;
