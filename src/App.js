import React, { useEffect, useRef } from "react";
import ScoreChart from "./components/ScoreChart";
import AnalyseTable from "./components/AnalyseTable";

function App() {
  return (
    <div>
      <ScoreChart />
      <AnalyseTable />
    </div>
  );
}

export default App;
