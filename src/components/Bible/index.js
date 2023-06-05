import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';

import "./style.css";
import bibleAA from '../../base/biblia/bible-aa.json'
import bibleACF from '../../base/biblia/bible-acf.json'
import bibleNVI from '../../base/biblia/bible-nvi.json'

function Bible() {

  const [biblia, setBiblia] = React.useState(bibleNVI);
  const [livro, setLivro] = React.useState("Livro");
  const [capitulo, setCapitulo] = React.useState("");
  const [versiculo, setVersiculo] = React.useState("Versículo");
  const [indexCapitulo, setIndexCapitulo] = React.useState("Capítulo");
  const [nomeLivro, setNomeLivro] = React.useState("Livro");
  const [textoLeitura, setTextoLeitura] = React.useState("");
  const [usarNomeId, setUsarNomeId] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const optionProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const escolherLivro = (index) => {
    setLivro(biblia[index]);
    setNomeLivro(biblia[index].name);
    setValue(1);
  }

  const escolherCapitulo = (index) => {
    setCapitulo(livro.chapters[index]);
    setIndexCapitulo(index + 1);
    setValue(2);
  }

  const escolherVersiculo = (index) => {
    setVersiculo(index + 1);
    let texto = [];
    for (let posicao = 0; posicao < capitulo.length; posicao++) {

      let lista_palavras_versiculo = capitulo[posicao].split(" ");
      texto.push((posicao + 1) + ' ');
      for (let posicao_versiculo = 0; posicao_versiculo < lista_palavras_versiculo.length; posicao_versiculo++) {
        if (posicao + 1 === index + 1) {
          texto.push((posicao + 1) + lista_palavras_versiculo[posicao_versiculo] + ' ');
        } else {
          texto.push(lista_palavras_versiculo[posicao_versiculo] + ' ');
        }
      }

    }
    setTextoLeitura(texto);
  }

  const clicarEmLivro = () => {
    pararDeLer()
    setIndexCapitulo("Capítulo");
    setVersiculo("Versículo");
    setTextoLeitura("");
  }

  const clicarEmCapitulo = () => {
    pararDeLer()
    setVersiculo("Versículo");
    setTextoLeitura("");
  }

  const clicarEmVersiculo = () => {
    pararDeLer()
    setTextoLeitura("");
    setVersiculo("Versículo");
  }

  const adicionandoId = (elemento) => {

    let nomeId = 'texto-normal';

    if (!isNaN(elemento)) {
      if (parseInt(elemento) === versiculo) {
        nomeId = 'numero-escolhido'
      } else {
        nomeId = 'numero';
      }

    } else if (elemento.includes(versiculo)) {
      nomeId = 'texto-normal-numero-escolhido'
    }
    return nomeId;
  }

  const formatarTexto = (texto) => {

    if (isNaN(texto)) {
      if (texto.includes(versiculo)) {
        texto = texto.replace(versiculo, '');
      }
    }

    return texto;
  }

  const lerCapitulo = () => {

    if ('speechSynthesis' in window) {
      const sintese = window.speechSynthesis;
      const voz = new SpeechSynthesisUtterance(capitulo);

      // Configuração da voz para a voz do Google em português do Brasil
      voz.voiceURI = 'Google português do Brasil';
      voz.lang = 'pt-BR';
      sintese.speak(voz);
    } else {
      alert('Este navegador não suporta a síntese de voz.');
    }
  }

  const pararDeLer = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

  }

  return (
    <div className='margin-spacing'>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label={`${nomeLivro}`}  {...optionProps(0)} onClick={() => { clicarEmLivro() }} />
          <Tab label={`${indexCapitulo}`} {...optionProps(1)} onClick={() => { clicarEmCapitulo() }} />
          <Tab label={`${versiculo}`} {...optionProps(2)} onClick={() => { clicarEmVersiculo() }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div id='lista-livros-biblia'>
            <Stack
              direction="row"
              alignItems="baseline"
              flexWrap="wrap"
              justifyContent="center"
            >
              {biblia.map((livro, index) => (

                <Button variant="contained" className='bloco button size-button' onClick={() => { escolherLivro(index) }}>
                  {`${livro.name}`}
                </Button>

              ))}
            </Stack>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div id='lista-capitulos-livro' className='break-justify'>
            {livro !== "Livro" ? (
              <Stack
                direction="row"
                alignItems="baseline"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                {livro.chapters.map((capitulo, index) => (
                  <Button variant="contained" className='bloco button' onClick={() => { escolherCapitulo(index) }}>
                    {`${index + 1}`}
                  </Button>
                ))}
              </Stack>) : null}
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {versiculo !== "Versículo" ? (
            <div>
              <Box
                mb={1}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  flexWrap="wrap"
                  alignContent="center"
                >
                  <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={() => { lerCapitulo() }}
                  >
                    <VolumeUpOutlinedIcon />
                  </IconButton>

                </Stack>
              </Box>
              <div className='break-justify'>
                {textoLeitura.map((elemento) => (
                  <div className='bloco' id={adicionandoId(elemento)}>
                    {formatarTexto(elemento)}
                  </div>
                ))}
              </div>
            </div>


          ) :
            <div id='lista-versiculos' className='break-justify'>
              {livro !== "Livro" && indexCapitulo !== "Capítulo" ?
                (<Stack
                  direction="row"
                  alignItems="baseline"
                  flexWrap="wrap"
                  justifyContent="space-between"
                >
                  {capitulo.map((versiculo, index) => (
                    <Button variant="contained" className='bloco button' onClick={() => { escolherVersiculo(index) }}>
                      {`${index + 1}`}
                    </Button>
                  ))}

                </Stack>) : null}
            </div>
          }

        </TabPanel>
      </Box>
    </div >
  );
}

export default Bible;