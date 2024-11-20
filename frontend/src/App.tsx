import React from "react";
import { Box } from "@mui/material";

import TasksPage from "./pages/Tasks";
import { Navbar, Footer } from "./components";

const App = () => (
  <Box display="flex" flexDirection="column" minHeight="100vh">
    <Navbar />
    <TasksPage />
    <Footer />
  </Box>
);

export default App;
