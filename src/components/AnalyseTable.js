import React, { useState, useEffect } from "react";

function AnalyseTable() {
  const [matrix, setMatrix] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API_URL}/analyse`
      );
      const matrix = await response.json();
      setMatrix(matrix);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Result of /analyse Endpoint</h2>
      <div>
        <h3>Legend</h3>
        <ul>
          <li>date = date :D</li>
          <li>price = Bitcoin price at the end of the day</li>
          <li>score = Score/Rating of all news from this day</li>
          <li>advise = Recommendation of the Algorhymus what to do.</li>
          <li>
            fiatBalanceAfterAdvise = Fiat balance of the theoretical account,
            after the advise is executed.
          </li>
          <li>
            bitcoinBalanceAfterAdvise = Bitcoin balance of the theoretical
            account, after the advise is executed.
          </li>
        </ul>
        <h3>Advises</h3>
        <ul>
          <li>WAIT = Wait. Don't buy bitcoin.</li>
          <li>BUY = Buy bitcoin.</li>
          <li>HOLD = Hold you bitcoin.</li>
          <li>
            HOLD_RESET = Hold you bitcoin. Buy date is reseted. Maybe hold it
            longer.
          </li>
          <li>SELL_POSITIVE = Sell your bitcoin. With loss.</li>
          <li>SELL_NEGATIV = Sell your bitcoin. With profit.</li>
          <li>UNKNOWN = This should not happen...</li>
        </ul>
      </div>
      {isLoading && <p>Loading...</p>}
      <div style={{ display: "flex", gap: "30px" }}>
        {matrix.map((instance, instanceIndex) => (
          <table border="1">
            <thead>
              <tr>
                <th>date</th>
                <th>price</th>
                <th>score</th>
                <th>advise</th>
                <th>fiatBalanceAfterAdvise</th>
                <th>bitcoinBalanceAfterAdvise</th>
              </tr>
            </thead>
            <tbody>
              {instance.map((row) => (
                <tr
                  key={[
                    instanceIndex,
                    new Date(row.date.date).toLocaleDateString(),
                  ].join("-")}
                >
                  <td>{new Date(row.date.date).toLocaleDateString()}</td>
                  <td>{row.price.toFixed(2)}</td>
                  <td>{row.score}</td>
                  <td>{row.advise}</td>
                  <td>{row.fiatBalanceAfterAdvise.toFixed(2)}</td>
                  <td>{row.bitcoinBalanceAfterAdvise.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

export default AnalyseTable;
