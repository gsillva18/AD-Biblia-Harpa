import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import imagem from "../../assets/images/ad-logo-color-3.png"

import "./style.css";


function BarMain(props) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            className="spacing"
            flexWrap="wrap"
            alignContent="center"
          >
            <img
              src={imagem} alt="Imagem Assembléia de Deus Monteiro"
              className="conf-image"
              onClick={() => { props.setComponente("home") }}
            />

            <Stack
              direction="row"
              justifyContent="center"
            >
              <Button color="inherit" onClick={() => { props.setComponente("bible") }}>Bíblia</Button>
              <Button color="inherit" onClick={() => { props.setComponente("harp") }}>Harpa</Button>
            </Stack>

          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default BarMain;