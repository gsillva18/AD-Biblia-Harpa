import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import harpaFile from "../../base/harpa/harpa-file.json";

import "./style.css";

function Harp() {

  const [harp, setHarp] = useState(harpaFile);
  const [hymn, setHymn] = useState("");
  const [filtro, setFiltro] = useState("");
  //existem dois tipos de visualização (list e hymn)
  const [visualizacao, setVisualizacao] = useState("list");
  const [mudou, setMudou] = useState(false);


  const escolherHino = (hinoEscolhido) => {
    setHymn(hinoEscolhido);
    mudarVisualizacao("hymn");
  }

  const mudarVisualizacao = (visualizacaoEscolhida) => {
    setVisualizacao(visualizacaoEscolhida);
    setFiltro("");
    filtrar("");
  }

  const filtrar = (valor) => {

    setHarp(harpaFile);
    let harpIteracao = harpaFile;

    if (valor.replace(/\s/g, '') !== "") {
      let listaFiltradaDeHinos = [];

      for (let posicao = 0; posicao < harpIteracao.length; posicao++) {
        let hymn = harpIteracao[posicao];

        let tituloVerificacao = hymn.title.toLocaleLowerCase().replace(/\s/g, '');
        let numeroHinoVerificacao = hymn.numberHymn.toString().toLocaleLowerCase().replace(/\s/g, '');
        let valorVerificacao = valor.toLocaleLowerCase().replace(/\s/g, '');

        if (tituloVerificacao.includes(valorVerificacao)
          || numeroHinoVerificacao.includes(valorVerificacao)
          || (numeroHinoVerificacao + tituloVerificacao).includes(valorVerificacao)) {
          listaFiltradaDeHinos.push(hymn);
        }
      }

      setHarp(listaFiltradaDeHinos);
    }

    setTimeout(() => {
      setMudou(true);
      setMudou(false);
    }, 400);

  }

  return (
    <div id="harp-christian">
      {!mudou ? (
        visualizacao === "list" ? (
          <div>
            <Box
              mt={3}
              mb={3}
              sx={{
                maxWidth: 500,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignContent="center"
              >
                <TextField
                  id="standard-basic"
                  label="busque"
                  variant="standard"
                  className="spacing"
                  sx={{ marginLeft: "5px", marginRight: "5px" }}
                  value={filtro}
                  onChange={(event) => {
                    setFiltro(event.target.value);
                    filtrar(event.target.value);
                  }}

                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Stack>
            </Box>
            <Box
              sx={{
                maxWidth: 410,
                margin: "auto"
              }}
            >
              <Stack
                flexWrap="wrap"
              >
                {harp.map((hymn, index) => (
                  <Button variant="contained" className='button' onClick={() => { escolherHino(hymn) }}>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      className="spacing"
                    >
                      <div className="aligment">{`${hymn.numberHymn}`}</div>
                      <div className="spacing">{`${hymn.title}`}</div>
                    </Stack>

                  </Button>
                ))}
              </Stack>
            </Box>
          </div>
        ) :
          <div id="hymn">
            <Box
              sx={{
                maxWidth: 400,
                margin: "auto",
                marginTop: 8
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                flexWrap="wrap"
                alignContent="center"
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  {hymn.title}
                </Typography>
              </Stack>

              {hymn.hymns.map((strofe, index) => (
                <Box
                  mt={4}
                  ml={2}
                  mr={2}
                  id={hymn.hymns.indexOf(strofe) === hymn.hymns.length - 1 ? "id-ultima-strofe" : "strofe " + index}
                >
                  {strofe.lines.map((linha) => (
                    <Stack
                      direction="row"
                      justifyContent="center"
                      flexWrap="wrap"
                      alignContent="center"
                    >
                      <Typography
                        variant="p"
                        sx={{
                          textAlign: "center",
                          fontSize: 20
                        }}
                        id={hymn.hymns.indexOf(strofe) === hymn.hymns.length - 1 ? "id-linha-autor" : !isNaN(linha) || isNaN(strofe.lines[0]) ? "id-linha-bold" : "id-linha-normal"}
                      >
                        {linha}
                      </Typography>
                    </Stack>
                  ))}
                </Box>

              ))}
            </Box>
            <Box
              mb={4}
              mr={2}
              ml={2}
            >
              <Stack
                direction="row"
                justifyContent="flex-end"
                flexWrap="wrap"
                alignContent="center"
              >
                <Button variant="contained" className='button' onClick={() => { mudarVisualizacao("list") }}>
                  Voltar
                </Button>
              </Stack>
            </Box>
          </div>
      ) : null}
    </div>
  );
}

export default Harp;