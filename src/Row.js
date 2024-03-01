import React, { useState } from "react";
import axios from "axios";
import "./App.css";
const Row = ({ rowIndex, style, size, chooseMessage }) => {
  const defaultFont = "Arial, sans-serif";
  const [placeholder, setPlaceholder] = useState("");
  const [col, setCol] = useState("");
  let msg = "Saving...";
  const sumfunc = async (start, end, colIndex, event) => {
    try {
      const config = {
        header: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8;application/json",
        },
      };
      var result = 0;
      while (start <= end) {
        const { data } = await axios.post(
          "http://65.0.248.147:4000/api/fetch",
          {
            key: colIndex + start,
          },
          config
        );
        console.log("Fetching data ");
        console.log(data.message);

        if (!isNaN(data.message)) {
          result = result + Number(data.message);
        }
        start = await (start + 1);
      }
      const rowIndex = Number(end) + 1;
      const { data } = await axios.put(
        "http://65.0.248.147:4000/api/user",
        {
          key: colIndex + rowIndex,
          value: result,
        },
        config
      );
      console.log(result);
      event.target.value = result;
      chooseMessage("All Changes Saved");
    } catch (err) {}
  };

  const minusfunc = async (start, end, colIndex, event) => {
    try {
      const config = {
        header: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8;application/json",
        },
      };
      var flag = 0;
      var result = 0;
      while (start <= end) {
        const { data } = await axios.post(
          "http://65.0.248.147:4000/api/fetch",
          {
            key: colIndex + start,
          },
          config
        );
        console.log("Fetching data ");
        console.log(data.message);

        if (!isNaN(data.message)) {
          if (!flag) {
            result = Number(data.message);
            flag = 1;
          } else {
            result = result - Number(data.message);
          }
        }
        start = await (start + 1);
      }
      const rowIndex = Number(end) + 1;
      const { data } = await axios.put(
        "http://65.0.248.147:4000/api/user",
        {
          key: colIndex + rowIndex,
          value: result,
        },
        config
      );
      console.log(result);
      event.target.value = result;
      chooseMessage("All Changes Saved");
    } catch (err) {}
  };

  const productfunc = async (start, end, colIndex, event) => {
    try {
      const config = {
        header: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8;application/json",
        },
      };
      var result = 1;
      while (start <= end) {
        const { data } = await axios.post(
          "http://65.0.248.147:4000/api/fetch",
          {
            key: colIndex + start,
          },
          config
        );
        console.log("Fetching data ");
        console.log(data.message);

        if (!isNaN(data.message)) {
          result = result * Number(data.message);
        }
        start = await (start + 1);
      }
      const rowIndex = Number(end) + 1;
      const { data } = await axios.put(
        "http://65.0.248.147:4000/api/user",
        {
          key: colIndex + rowIndex,
          value: result,
        },
        config
      );
      console.log(result);
      event.target.value = result;
      chooseMessage("All Changes Saved");
    } catch (err) {}
  };

  const averagefunc = async (start, end, colIndex, event) => {
    try {
      const config = {
        header: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8;application/json",
        },
      };
      var result = 0;
      var count = 0;
      while (start <= end) {
        const { data } = await axios.post(
          "http://65.0.248.147:4000/api/fetch",
          {
            key: colIndex + start,
          },
          config
        );
        console.log("Fetching data ");
        console.log(data.message);

        if (!isNaN(data.message)) {
          count = count + 1;
          result = result + Number(data.message);
        }
        start = await (start + 1);
      }
      result = result / count;
      const rowIndex = Number(end) + 1;
      const { data } = await axios.put(
        "http://65.0.248.147:4000/api/user",
        {
          key: colIndex + rowIndex,
          value: result,
        },
        config
      );
      console.log(result);
      event.target.value = result;
      chooseMessage("All Changes Saved");
    } catch (err) {}
  };

  const handleChange = async (rowIndex, colIndex, val) => {
    try {
      const config = {
        header: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8;application/json",
        },
      };
      setPlaceholder("");
      setCol("");
      chooseMessage("All Changes Saved");
      const { data } = await axios.put(
        "http://65.0.248.147:4000/api/user",
        {
          key: colIndex + rowIndex,
          value: val,
        },
        config
      );
    } catch (err) {
      console.log("Error in updating data");
    }
  };
  return (
    <tr>
      <td style={{ padding: "0 10px" }}>{rowIndex}</td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "A" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("A");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("A");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("A");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("A");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "A", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "A", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "A", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "A", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "A", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "A", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "A", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "A", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "A", e.target.value);
              }
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "B" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("B");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("B");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("B");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("B");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "B", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "B", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "B", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "B", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "B", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "B", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "B", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "B", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "B", e.target.value);
              }
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "C" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("C");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("C");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("C");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("C");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "C", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "C", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "C", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "C", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "C", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "C", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "C", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "C", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "C", e.target.value);
              }
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "D" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("D");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("D");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("D");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("D");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "D", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "D", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "D", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "D", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "D", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "D", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "D", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "D", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "D", e.target.value);
              }
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "E" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("E");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("E");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("E");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("E");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "E", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "E", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "E", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "E", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "E", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "E", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "E", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "E", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "E", e.target.value);
              }
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "F" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("F");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("F");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("F");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("F");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "F", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "F", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "F", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "F", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "F", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "F", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "F", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "F", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "F", e.target.value);
              }
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "G" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("G");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("G");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("G");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("G");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "G", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "G", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "G", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "G", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "G", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "G", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "G", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "G", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "G", e.target.value);
              }
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "H" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("H");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("H");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("H");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("H");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "H", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "H", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "H", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "H", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "H", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "H", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "H", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "H", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "H", e.target.value);
              }
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "I" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("I");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("I");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("I");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("I");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "I", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "I", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "I", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "I", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "I", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "I", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "I", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "I", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "I", e.target.value);
              }
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "J" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("J");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("J");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("J");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("J");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "J", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "J", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "J", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "J", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "J", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "J", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "J", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "J", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "J", e.target.value);
              }
            }
          }}
        ></input>
      </td>
      <td>
        <input
          type="text"
          style={{
            textAlign: "center",
            fontFamily: `${style}, ${defaultFont}`,
            fontSize: `${size}`,
            padding: "5px",
          }}
          placeholder={col === "K" ? placeholder : ""}
          onKeyDown={(e) => {
            chooseMessage(msg);
            if (e.target.value === "<S>") {
              setPlaceholder("<Sum()>");
              setCol("K");
            } else if (e.target.value === "<M>") {
              setPlaceholder("<Minus()>");
              setCol("K");
            } else if (e.target.value === "<P>") {
              setPlaceholder("<Product()>");
              setCol("K");
            } else if (e.target.value === "<A>") {
              setPlaceholder("<Average()>");
              setCol("K");
            }

            if (e.key === "Enter") {
              if (
                e.target.value.includes("<Sum(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = sumfunc(Number(start), Number(end), "K", e);
                } else {
                  var result = sumfunc(1, rowIndex - 1, "K", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Minus(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = minusfunc(Number(start), Number(end), "K", e);
                } else {
                  var result = minusfunc(1, rowIndex - 1, "K", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Product(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = productfunc(Number(start), Number(end), "K", e);
                } else {
                  var result = productfunc(1, rowIndex - 1, "K", e);
                }
                console.log(result);
              } else if (
                e.target.value.includes("<Average(") &&
                e.target.value.includes(")>")
              ) {
                const str = e.target.value;
                if (/[0-9]/.test(str)) {
                  let i1 = str.indexOf("(");
                  let i2 = str.indexOf(",");
                  let i3 = str.indexOf(")");
                  var start = str.substring(i1 + 1, i2);
                  var end = str.substring(i2 + 1, i3);
                  var result = averagefunc(Number(start), Number(end), "K", e);
                } else {
                  var result = averagefunc(1, rowIndex - 1, "K", e);
                }
                console.log(result);
              } else {
                handleChange(rowIndex, "K", e.target.value);
              }
            }
          }}
        ></input>
      </td>
    </tr>
  );
};

export default Row;
