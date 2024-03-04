import React from "react";
import "./App.css";
import { Box } from "@chakra-ui/react";
import { Database } from "./models/server";

function App() {
  React.useLayoutEffect(() => {
    Database.INIT();
  }, []);

  return (
    <Box w={"100%"} height={"100%"}>
      test
    </Box>
  );
}

export default App;
