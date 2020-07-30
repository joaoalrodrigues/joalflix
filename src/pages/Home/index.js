import React from 'react';
import './Home.css';
import Menu from '../../components/Menu';
import dadosIniciais from '../../data/dados_iniciais.json';
import BannerMain from '../../components/BannerMain';
import Carrousel from '../../components/Carousel';
import Footer from '../../components/Footer';

function Home() {
  return (
    <div style={{ background: "#141414" }}>
      <Menu />

      <BannerMain
        videoTitle={dadosIniciais.categorias[0].videos[0].titulo}
        url={dadosIniciais.categorias[0].videos[0].url}
        videoDescription={"O que é Front-end? Trabalhando na área"}
      />

      {
        dadosIniciais.categorias.map(categoria => (
          <Carrousel
            ignoreFirstVideo
            category={categoria}
          />
        ))
      }

      <Footer />
    </div >
  );
}

export default Home;
