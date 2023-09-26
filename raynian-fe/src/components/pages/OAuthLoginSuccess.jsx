import React, { useEffect } from "react";

const OAuthLoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return <div className="h-screen w-screen bg-white">Login Successful</div>;
};

export default OAuthLoginSuccess;
