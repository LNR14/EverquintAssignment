import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Assignment
      </Typography>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/max-profit">
        Question - 1 (Max Profit)
      </Button>
      <Button color="inherit" component={Link} to="/watertank">
        Question - 2 (Water Tank)
      </Button>
      <Button color="inherit" component={Link} to="/team-workflow">
        Question -3 (Team WorkFlow)
      </Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
