import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Home() {
  return (
    <div id="id-home-componente">
      <Box>
        <Stack
          flexWrap="wrap"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          sx={{
            height: window.innerHeight - 110
          }}
        >
          <Typography variant="h6">
            "UNIÃO, COMUNHÃO E ORAÇÃO"
          </Typography>
          <Typography variant="body2">
            ESSE É O NOSSO LEMA
          </Typography>
          <Button
            variant="contained"
            sx={{
              top: 30,
              maxWidth: 150
            }}
          >
            SAIBA MAIS
          </Button>
        </Stack>

      </Box>
    </div>
  );
}

export default Home;