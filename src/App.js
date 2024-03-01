import logo from "./images/google-sheets.png";
import download from "./images/icons8-download-64.png";
import axios from "axios";
import "./App.css";
import React, { useState } from "react";
import Row from "./Row";
function App() {
  window.onload = async () => {
    try {
      const config = {
        header: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8;application/json",
        },
      };
      const { data } = await axios.delete("http://172.31.12.251:4000/api/delete", {}, config);
    } catch (err) {
      console.log("Error in deleting users");
    }
  };
  const [message, setMessage] = useState("All Changes Saved");
  const chooseMessage = (message) => {
    setMessage(message);
  };
  const defaultFont = "Arial, sans-serif";
  const [fontstyle, setFontstyle] = useState("Arial, sans-serif");
  const [fontsize, setFontsize] = useState("16px");
  const handleFontChange = (event) => {
    setFontstyle(event.target.value);
  };
  const handleFontSizeChange = (event) => {
    setFontsize(event.target.value);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "10px",
          margin: "0 10px",
        }}
      >
        <img src={logo} style={{ height: "35px" }}></img>
        <h2>My Sheets</h2>
        <div style={{ width: "85%", display: "flex", justifyContent: "end" }}>
          <h4
            style={{
              backgroundColor: "#B2D7EF",
              borderRadius: "20px",
              padding: "10px 20px",
              fontSize: "10px",
              fontWeight: "normal",
            }}
          >
            {message}
          </h4>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#EDF2FA",
          borderRadius: "20px",
          margin: "0 20px 20px",
          padding: "10px 0",
        }}
      >
        <div>
          <select id="fontSelector" onChange={handleFontChange}>
            value = {fontstyle}
            <option value="Arial, sans-serif">Arial</option>
            <option value="cursive">Cursive</option>
            <option value="Courier New, monospace">Courier New</option>
          </select>
        </div>
        <div>
          <select id="fontSizeSelector" onChange={handleFontSizeChange}>
            value = {fontsize}
            <option value="12px">12px</option>
            <option value="16px">16px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
          </select>
        </div>
        <img src={download} style={{ height: "25px" }}></img>
      </div>
      <table border="1" style={{ borderCollapse: "collapse", margin: "auto" }}>
        <tr
          style={{
            textAlign: "center",
            fontFamily: `${fontstyle}, ${defaultFont}`,
            fontSize: `${fontsize}`,
          }}
        >
          <td></td>
          <td>A</td>
          <td>B</td>
          <td>C</td>
          <td>D</td>
          <td>E</td>
          <td>F</td>
          <td>G</td>
          <td>H</td>
          <td>I</td>
          <td>J</td>
          <td>K</td>
        </tr>
        <Row
          rowIndex={1}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={2}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={3}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={4}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={5}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={6}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={7}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={8}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={9}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={10}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={11}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={12}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={13}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={14}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
        <Row
          rowIndex={15}
          style={fontstyle}
          size={fontsize}
          chooseMessage={chooseMessage}
        />
      </table>
    </div>
  );
}

export default App;
