import React from "react";
import { IntlProvider, FormattedMessage, useIntl } from "react-intl";
import messages from "../Component/Message/messages";
import axios from "axios";

const ForgetPassword = (props) => {
  const intl = useIntl();
  const forgetPasswordURL =
    "https://fish-uat.globalpsa.com/AuthServer/getPassword";
  return (
    <IntlProvider locale={props.locale} messages={messages[props.locale]}>
      <div>
        <a
          className="forgetpw"
          onClick={() => {
            alert(
              intl.formatMessage({
                id: "forgetpasswordalert",
                defaultMessage: "Please check your email for new password",
              })
            );
            axios
              .post(forgetPasswordURL, {
                email: props.email,
              })
              .then((res) => {
                console.log(res.data.status).catch((err) => {
                  console.error(err);
                });
              });
          }}
        >
          <FormattedMessage id="forgetpassword" />
        </a>
      </div>
    </IntlProvider>
  );
};

export default ForgetPassword;
