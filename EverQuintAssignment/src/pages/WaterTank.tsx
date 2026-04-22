import { useState } from "react";
import WaterTankTable from "../components/WaterTankTable";
const WaterTank = () => {
  const [inputValue, setInputValue] = useState<string>(
    "0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1"
  );
  const [trappedWater, setTrappedWater] = useState<number | null>(null);

  function calculateWater(height: number[]): number {
    let left = 0,
      rightMax = 0,
      leftMax = 0,
      result = 0;
    let right = height.length - 1;
    while (left < right) {
      if (height[left] < height[right]) {
        if (leftMax < height[left]) {
          leftMax = height[left];
        } else {
          result += leftMax - height[left];
        }
        left++;
      } else {
        if (rightMax < height[right]) {
          rightMax = height[right];
        } else {
          result += rightMax - height[right];
        }
        right--;
      }
    }
    return result;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numArr = inputValue
      .split(",")
      .map((val) => parseInt(val.trim()))
      .filter((val) => !isNaN(val));

    const result = calculateWater(numArr);
    setTrappedWater(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Water Tank Calculator</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <label>
          Enter heights (comma separated):
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginLeft: "10px", width: "300px" }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Calculate
        </button>
      </form>

      {trappedWater !== null && (
        <div style={{ marginBottom: "20px" }}>
          <strong>Total Trapped Water: {trappedWater} units</strong>
        </div>
      )}

      <WaterTankTable data={inputValue.split(",").map(Number)} />
    </div>
  );
};
export default WaterTank;
