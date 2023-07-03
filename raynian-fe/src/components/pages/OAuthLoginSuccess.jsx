import React, { useEffect } from "react";

const OAuthLoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return <div>Login Successful</div>;
};

export default OAuthLoginSuccess;
