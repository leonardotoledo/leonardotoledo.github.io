import React from "react";
import { Box, Button, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        p: "2rem",
      }}
      className="about"
    >
      <Typography paragraph align="center" variant="h3">
        Hi!
      </Typography>
      <Typography paragraph align="center" variant="h4">
        I'm Leonardo, an engineer based in Brazil
      </Typography>
      <Typography paragraph align="center" variant="h5">
        In this page, you can find more about me, my work and research
      </Typography>
      <Typography paragraph align="center" variant="body1">
        In the
        <Button href="http://lattes.cnpq.br/6329248209954692">
          <b>Curriculum Lattes</b>
        </Button>
        page, you can find general info about my academic career
      </Typography>
      <Typography paragraph align="center" variant="h6">
        In short:
      </Typography>
      <Typography paragraph align="center" variant="body1">
        In 2019, I finished an undergraduate course in civil engineering in the
        <Button href="https://ufal.br/">
          <b>Federal University of Alagoas</b>
        </Button>
        (UFAL)
      </Typography>
      <Typography paragraph align="center" variant="body1">
        In 2020, I began a graduate course in civil engineering (with
        specialization in Structures) in UFAL's
        <Button href="https://ctec.ufal.br/posgraduacao/ppgec/content/leonardo-tol%C3%AAdo-ferreira">
          <b>Civil Engineering Postgraduate Program</b>
        </Button>
      </Typography>
      <Typography paragraph align="center" variant="body1">
        During my time in UFAL, I participated, among other , as:
      </Typography>
      <ul>
        <Typography paragraph align="center" variant="body1">
          <li
            style={{
              fontWeight: 400,
            }}
          >
            Differential calculus course assistant at
            <Button href="https://im.ufal.br/">
              <b>IM/UFAL</b>
            </Button>
          </li>
        </Typography>
        <Typography paragraph align="center" variant="body1">
          <li
            style={{
              fontWeight: 400,
            }}
          >
            Natural lighting and indoor comfort research assistant at
            <Button href="https://ctec.ufal.br/grupopesquisa/grilu/">
              <b>GRILU</b>
            </Button>
          </li>
        </Typography>
        <Typography paragraph align="center" variant="body1">
          <li
            style={{
              fontWeight: 400,
            }}
          >
            Numerical simulation of large deformation phenomena with the material
            point method as research assistant at
            <Button href="https://lccv.ufal.br/">
              <b>LCCV</b>
            </Button>
          </li>
        </Typography>
      </ul>
    </Box>
  );
};

export default About;
