import React from "react";
import { Box } from "@mui/material";

import About from "./About/About";
import Contact from "./Contact/Contact";
import Work from "./Work/Work";

export default function Content({ screenSize, selectedPage }) {
  
  const page = () => {
    switch (selectedPage) {
      case "contact":
        return <Contact />;
      case "work":
          return <Work screenSize={screenSize} />;
      default:
        return <About />;
    }
  };

  return <Box>{page()}</Box>;
}
