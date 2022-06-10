import React from "react";
import { Box, IconButton } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faSoundcloud } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mt: "auto", // margin top
        p: 1, // padding
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Box>
        <IconButton
          color="inherit"
          href="https://www.linkedin.com/in/leonardotoledo"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </IconButton>
        <IconButton
          color="inherit"
          href="https://github.com/leonardotoledo"
        >
          <FontAwesomeIcon icon={faGithub} />
        </IconButton>
        <IconButton
          color="inherit"
          href="https://soundcloud.com/xchessx"
        >
          <FontAwesomeIcon icon={faSoundcloud} />
        </IconButton>
      </Box>
      <Box>
        © Leonardo Tolêdo ({new Date().getFullYear()}).
      </Box>
    </Box>
  );
}
