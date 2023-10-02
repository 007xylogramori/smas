import React, { useEffect, useState } from 'react'
import QRCode from "react-qr-code";

const QrPage = () => {

  const [hashCode, setHashCode] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    if (!token || !refresh) {
      window.location.href = "/";
    }

    const getHash = async () => {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/generate/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
          }
        }
      );

      const json = await response.json();

      if (response.status === 200) {
        setHashCode(json.hash);
      } else {
        alert("Please Enter Valid Credentials");
      }
    };

    getHash();

  },[])

  return (
    <div>
      <h1>QrPage</h1>
      <div style={{ height: "auto", margin: "0 auto", maxWidth: 164, width: "100%" }}>
          <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={hashCode}
          viewBox={`0 0 256 256`}
          />
      </div>
    </div>
  )
}

export default QrPage
