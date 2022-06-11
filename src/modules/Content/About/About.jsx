import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import about from "../../../pages/about.md";

const About = () => {

  const [text, setText] = useState();

  useEffect(() => {
    fetch(about)
    .then(response => response.text())
    .then(txt => setText(txt))
  }, []);

  return (
    <Box
      sx={{
        p: "2rem",
      }}
      className="about"
    >
      <Typography variant="h6" paragraph align="center" >
        <ReactMarkdown children={text} remarkPlugins={[remarkGfm]}/>
      </Typography>
    </Box>
  );
};

export default About;
