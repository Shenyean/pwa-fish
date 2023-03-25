import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Footer.css";
import fishnews from "./FISHNEWS.png";
import faqfish from "./FAQs.png";
import sendplane from "./SENDFISHTO.png";
import { IntlProvider, FormattedMessage } from "react-intl";
import messages from "../Message/messages";

const Footer = () => {
  const [locale, setLocale] = useState("en");
  const handleLogout = () => {
    sessionStorage.clear();
  };
  useEffect(() => {
    if (!sessionStorage.getItem("locale")) {
      sessionStorage.setItem("locale", "en");
    }
    const sessionLocale = sessionStorage.getItem("locale");
    setLocale(sessionLocale);
  }, []);
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Navbar className="fishfooter ">
        <Container>
          <div className="fishnewsBtn">
            <a
              className="fishnewsLink"
              href="https://globalpsa.sharepoint.com/sites/FishCulture-and-OD/SitePages/FISH-related-Awards.aspx "
              rel="noreferrer"
            >
              <img src={fishnews} className="fishnewsPic"></img>
            </a>
          </div>
          <div className="faqfishBtn">
            <a
              className="faqfishLink"
              href="http://www.google.com"
              rel="noreferrer"
            >
              <img src={faqfish} className="faqfishPic"></img>
            </a>
          </div>
          <div className="sendfishFooterBtn">
            <a className="sendfishFooterLink" href="/sendfish" rel="noreferrer">
              <img src={sendplane} className="sendfishFooterPic"></img>
            </a>
          </div>
          <div className="logoutBtn">
            <a className="Logout" href="/logout" onClick={handleLogout}>
              <FormattedMessage id="logout" />
            </a>
          </div>
        </Container>
      </Navbar>
    </IntlProvider>
  );
};

export default Footer;
