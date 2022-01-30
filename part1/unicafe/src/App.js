import React, { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral, total }) => {
  return (
    <>
      <h1>statistics</h1>
      {total !== 0 ? (
        <>
          <div style={{ display: "block" }}>
            <table>
              <tbody>
                <StatisticLine value={good} text={"good"} />
                <StatisticLine value={neutral} text={"neutral"} />
                <StatisticLine value={bad} text={"bad"} />
                <StatisticLine value={total} text={"total"} />
                <StatisticLine
                  value={total !== 0 ? (good - bad) / total : 0}
                  text={"average"}
                />
                <StatisticLine
                  value={total !== 0 ? `${(good / total) * 100}%` : "0%"}
                  text={"positive"}
                />
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <p>No feedback given</p>
        </>
      )}
    </>
  );
};

const Button = ({ text, handleClick }) => {
  return (
    <button style={{ marginRight: "5px" }} onClick={() => handleClick(text)}>
      {text}
    </button>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleClick = (type) => {
    if (type === "good") {
      setGood(good + 1);
      setTotal(total + 1);
    }
    if (type === "bad") {
      setBad(bad + 1);
      setTotal(total + 1);
    }
    if (type === "neutral") {
      setNeutral(neutral + 1);
      setTotal(total + 1);
    }
  };

  return (
    <>
      <h1>Give FeedBack</h1>
      <div style={{ display: "flex" }}>
        <Button text={"good"} handleClick={handleClick} />
        <Button text={"neutral"} handleClick={handleClick} />
        <Button text={"bad"} handleClick={handleClick} />
      </div>

      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </>
  );
};

export default App;
