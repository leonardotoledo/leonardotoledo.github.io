import React, { useState, useRef } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Header = ({ hide, pages, selectedPage, setSelectedPage, selectedMode, setSelectedMode }) => {

  const anchorElement = useRef();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  if (hide) {
    return <></>;
  }

  return (
    <AppBar position="static" color="inherit" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title="menu" followCursor>
            <IconButton
              ref={anchorElement}
              edge="start"
              color="inherit"
              onClick={() => setMenuIsOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          </Tooltip>
          <Box sx={{flexGrow: 1, display: { xs: "flex", mx: "auto" }, mr: 1}}>
            <Menu
              id="menu-appbar"
              keepMounted
              edge="start"
              anchorEl={anchorElement.current}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={menuIsOpen}
              onClose={() => setMenuIsOpen(false)}
              sx={{
                mr: 2,
              }}
            >
              {pages.map((page) => {
                return (
                  <MenuItem
                    key={page}
                    onClick={() => setSelectedPage(page)}
                  >
                    <Typography variant="button" ><b>{page}</b></Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                color={ selectedPage === page ? "primary" : "inherit" }
                sx={{
                  my: 2,
                  display: "block"
                }}
                onClick={() => setSelectedPage(page)}
              >
                <Typography variant="button" ><b>{page}</b></Typography>
              </Button>
            ))}
          </Box>
          <Tooltip title={selectedMode === "dark" ? "light mode" : "dark mode"} followCursor>
            <IconButton
              color="inherit"
              onClick={() => setSelectedMode((prev) => (prev === "dark" ? "light" : "dark"))}
            >
              {selectedMode === "dark" ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
