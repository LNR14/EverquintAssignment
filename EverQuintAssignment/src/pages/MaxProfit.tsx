import React, { useEffect, useState } from "react";

const MaxProfit = () => {
  const [inputValue, setInputValue] = useState<string>("13"); // Example input
  const [totalEarnings, setTotalEarnings] = useState<number | null>(null);
  const [solutions, setSolutions] = useState<string[]>([]);

  function calculateMaxEarnings(time: number) {
    const properties = [
      { name: "T", buildTime: 5, rate: 1500 },
      { name: "P", buildTime: 4, rate: 1000 },
      { name: "C", buildTime: 10, rate: 2000 },
    ];

    const dp = Array.from({ length: time + 1 }, () => ({
      earnings: 0,
      solutions: new Set<string>(),
    }));

    dp[0].solutions.add("0,0,0");

    for (let i = 1; i <= time; i++) {
      let maxAtI = 0;
      for (const prop of properties) {
        if (i >= prop.buildTime) {
          const currentBuildEarnings = (i - prop.buildTime) * prop.rate;
          const total = currentBuildEarnings + dp[i - prop.buildTime].earnings;
          if (total > maxAtI) maxAtI = total;
        }
      }

      dp[i].earnings = maxAtI;

      for (const prop of properties) {
        if (i >= prop.buildTime) {
          const total =
            (i - prop.buildTime) * prop.rate + dp[i - prop.buildTime].earnings;
          if (total === maxAtI && maxAtI > 0) {
            for (const prevSol of dp[i - prop.buildTime].solutions) {
              let counts = prevSol.split(",").map(Number);
              if (prop.name === "T") counts[0]++;
              if (prop.name === "P") counts[1]++;
              if (prop.name === "C") counts[2]++;
              dp[i].solutions.add(counts.join(","));
            }
          }
        }
      }
      if (dp[i].solutions.size === 0) dp[i].solutions.add("0,0,0");
    }

    return {
      maxEarnings: dp[time].earnings,
      allSolutions: Array.from(dp[time].solutions),
    };
  }

  // 2. HandleSubmit moved outside the logic function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const time = parseInt(inputValue);
    if (isNaN(time)) return;

    const { maxEarnings, allSolutions } = calculateMaxEarnings(time);
    setTotalEarnings(maxEarnings);
    setSolutions(allSolutions);
  };

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <label>
          Enter time units:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginLeft: "10px", width: "100px" }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Calculate
        </button>
      </form>

      {totalEarnings !== null && (
        <div>
          <h3>Max Earnings: ${totalEarnings}</h3>
          <h4>Possible Combinations:</h4>
          <ul>
            {solutions.map((sol, i) => {
              const [t, p, c] = sol.split(",");
              return (
                <li key={i}>
                  Theatre: {t}, Pub: {p}, Commercial: {c}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MaxProfit;
