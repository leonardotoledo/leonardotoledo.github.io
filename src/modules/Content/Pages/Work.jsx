import React from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import terrain from "../../../assets/images/terrain.jpg";

const Work = ({ screenSize }) => {

  const projects = [
    { img: terrain, title: "Terrain" },
    { img: terrain, title: "Terrain" },
    { img: terrain, title: "Terrain" },
    { img: terrain, title: "Terrain" },
  ];

  return (
    <Box
      sx={{
        mx: "auto",
        p: 2,
      }}
    >
      <ImageList
        variant="quilted"
        cols={
            screenSize.smallScreen ? 1 : (
                screenSize.mediumScreen ? 2 : (
                    screenSize.largeScreen ? 3 : 4
                )
            )
        }
        gap={8}
      >
        {projects.map((item, i) => (
          <ImageListItem key={`imageListItem-${item.title}-${i}`} onClick={e => console.log(e)} >
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
    </Box>
  );
};

export default Work;
