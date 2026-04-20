import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MaxProfit from "./pages/MaxProfit";
import WaterTank from "./pages/WaterTank";
import TeamWorkflow from "./pages/TeamWorkflow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "max-profit",
        element: <MaxProfit />,
      },
      {
        path: "watertank",
        element: <WaterTank />,
      },
      {
        path: "team-workflow",
        element: <TeamWorkflow />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
