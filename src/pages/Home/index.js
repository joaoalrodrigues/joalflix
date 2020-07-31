import React, { useState, useEffect } from 'react';
import './Home.css';
import Menu from '../../components/Menu';
import BannerMain from '../../components/BannerMain';
import Carrousel from '../../components/Carousel';
import Footer from '../../components/Footer';

function Home() {

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const isLocalhost = window.location.href.includes('localhost');
		const URL = isLocalhost ? "http://localhost:8080/categorias" : "https://joalflix.herokuapp.com/categorias";
		fetch(URL)
			.then(async (response) => {
				if (response.ok) {
					const result = await response.json();
					setCategories(result);
					return;
				}
				throw new Error('Não foi possível coletar os dados.')
			});
	}, []);

	const hasCategories = categories.length > 0;

	return (
		<div style={{ background: "#141414" }}>
			<Menu />

			<BannerMain />

			{hasCategories &&
				categories.map(categoria => (
					<Carrousel
						key={categoria.id}
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
