import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
// import Dashboard from "../Dashboard/Dashboard";

const {
  SetCookie,
  DeleteCookie,
  hasCookie,
} = require("../Utility/CookieManager.js");
const CLIENT_ID = "245831246215-53071birgccga61h2a28fgngelbmtvq5.apps.googleusercontent.com"

const ConnectGoogleFit = () => {
  const [user, setUser] = useState({ haslogin: false, accessToken: "" });

  useEffect(() => {
    const cookieObject = hasCookie();
    if (cookieObject.haslogin) {
      setUser({
        ...cookieObject,
      });
    }
  }, []);
  function login(response) {
    if (response.wc.access_token) {
      setUser({
        ...response.profileObj,
        haslogin: true,
        accessToken: response.wc.access_token,
      });
    }
    SetCookie({
      ...response.profileObj,
      accessToken: response.wc.access_token,
    });
  }

  function logout(response) {
    setUser({ haslogin: false, accessToken: "" });
    DeleteCookie([
      "accessToken",
      "email",
      "givenName",
      "familyName",
      "imageUrl",
      "name",
      "googleId",
    ]);
  }

  function handleLoginFailure(response) {
    alert("Failed to log in");
  }
  function handleLogoutFailure(response) {
    alert("Failed to log out");
  }
  return (
    <div className="App">
          {user.haslogin ? (
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={logout}
              onFailure={handleLogoutFailure}
            ></GoogleLogout>
          ) : (
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Login"
              onSuccess={login}
              onFailure={handleLoginFailure}
              cookiePolicy={"single_host_origin"}
              responseType="code,token"
              scope={
                "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read"
              }
            />
          )}
      {/* <Dashboard user={user} /> */}
    </div>
  );
};

export default ConnectGoogleFit;
