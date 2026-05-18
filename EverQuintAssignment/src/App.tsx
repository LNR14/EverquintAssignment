import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MaxProfit from "./pages/MaxProfit";
import WaterTank from "./pages/WaterTank";
import TeamWorkflow from "./pages/TeamWorkflow";
import NestedCheckBox from "./pages/NestedCheckBox";

const RootRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Home /> : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RootRoute />,
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
        path: "nested-checkbox",
        element: <NestedCheckBox />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "team-workflow",
            element: <TeamWorkflow />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
