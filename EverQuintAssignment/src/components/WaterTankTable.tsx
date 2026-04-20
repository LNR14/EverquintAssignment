import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

interface Props {
  data: number[];
}

const WaterTankTable = ({ data }: Props) => {
  if (!data || data.length === 0) return null;

  const n = data.length;
  const maxHeight = Math.max(...data);
  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);
  const waterLevels = new Array(n).fill(0);

  leftMax[0] = data[0];
  for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], data[i]);

  rightMax[n - 1] = data[n - 1];
  for (let i = n - 2; i >= 0; i--)
    rightMax[i] = Math.max(rightMax[i + 1], data[i]);

  for (let i = 0; i < n; i++) {
    waterLevels[i] = Math.min(leftMax[i], rightMax[i]) - data[i];
  }
  const rows = [];
  for (let h = maxHeight; h >= 1; h--) {
    rows.push(h);
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: "fit-content", mt: 4 }}>
      <Table size="small" sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
        <TableBody>
          {rows.map((currentHeight) => (
            <TableRow key={currentHeight}>
              {data.map((height, colIndex) => {
                const water = waterLevels[colIndex];
                let bgColor = "transparent";

                if (currentHeight <= height) {
                  bgColor = "#FFD700";
                } else if (currentHeight <= height + water) {
                  bgColor = "#2196F3";
                }

                return (
                  <TableCell
                    key={colIndex}
                    sx={{
                      width: 30,
                      height: 30,
                      padding: 0,
                      backgroundColor: bgColor,
                      border: "0.5px solid #eee",
                    }}
                  />
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WaterTankTable;
