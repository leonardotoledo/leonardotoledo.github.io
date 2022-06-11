import React, { useState, useMemo } from "react";
import {
  CssBaseline,
  Paper,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "./modules/Header/Header";
import Content from "./modules/Content/Content";
import Footer from "./modules/Footer/Footer";
import { darkMode, lightMode } from "./assets/palettes";
import terrain from "./assets/images/terrain.jpg"

const App = () => {

  const pages = [
    "about",
    "work",
    "contact"
  ];

  const [selectedMode, setSelectedMode] = useState(useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light");
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [scrollTarget, setScrollTarget] = useState();

  const theme = useMemo(() => createTheme({
    palette: selectedMode === "light" ? lightMode : darkMode,
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: selectedMode === "light" ? "black" : "white"
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              color: "white",
              backgroundColor: "#0891a6",
            }
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              color: "#0891a6",
            }
          }
        }
      }
    }
  }), [selectedMode]);

  const screenSize = {
    smallScreen: useMediaQuery(theme.breakpoints.down("sm")),
    mediumScreen: useMediaQuery(theme.breakpoints.down("md")),
    largeScreen: useMediaQuery(theme.breakpoints.down("lg"))
  };

  const scrollTrigger = useScrollTrigger({ target: scrollTarget });

  return (
    <ThemeProvider theme={theme}>
      <Paper
        style={{
          height: "100vh",
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
          backgroundImage: `url(${terrain})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "overlay",
          backgroundColor: selectedMode === "dark" ? "rgba(0,0,0, 0.6)" : "rgba(255,255,255, 0.75)"
        }}
      >
        <CssBaseline/>
        <Header
          hide={scrollTrigger}
          pages={pages}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
        />
        <main
          style={{
            overflow: "auto"
          }}
          ref={node => {
            if (node) {
              setScrollTarget(node);
            }
          }}
        >
          <Content
            screenSize={screenSize}
            selectedPage={selectedPage}
          />
        </main>
        <Footer/>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
