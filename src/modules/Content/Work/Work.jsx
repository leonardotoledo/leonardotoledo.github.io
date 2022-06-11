import React, { useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import terrain from "../../../assets/images/terrain.jpg";

import scientific from "../../../pages/scientific.md";
import translation from "../../../pages/translation.md";
import web from "../../../pages/web.md";

const Work = ({ screenSize }) => {

  const projects = [
    { img: terrain, title: "Scientific Computing", markdown: scientific },
    { img: terrain, title: "Web Development", markdown: web },
    { img: terrain, title: "Translation", markdown: translation }
  ];

  const [selectedWork, setSelectedWork] = useState();

  const loadMarkdown = (path) => {
    fetch(path)
    .then(response => response.text())
    .then(text => setSelectedWork(text))
  }

  const images = (
    <ImageList
      variant="quilted"
      cols={
          screenSize.smallScreen ? 1 : (
              screenSize.mediumScreen ? 2 : (
                  screenSize.largeScreen ? 3 : 3 // 4
              )
          )
      }
      gap={8}
    >
      {projects.map((item, i) => (
        <ImageListItem key={`imageListItem-${item.title}-${i}`} onClick={() => loadMarkdown(item.markdown)} >
          <img
            key={`img-${item.title}-${i}`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar position="bottom" title={item.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );

  return (
    <Box
      sx={{
        mx: "auto",
        p: 2,
      }}
    >
      {selectedWork === undefined && images}
      {selectedWork && (
        <Typography>
          <ReactMarkdown children={selectedWork} remarkPlugins={[remarkGfm]} />
        </Typography>
      )}
    </Box>
  );
};

export default Work;
