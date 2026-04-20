import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom"; // This is the key import
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <Box>
      {/* This stays on every page */}
      <Navbar />

      <Container sx={{ mt: 4 }}>
        {/* The Outlet is where the current route's 
           component (Home, MaxProfit, etc.) will be rendered.
        */}
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
