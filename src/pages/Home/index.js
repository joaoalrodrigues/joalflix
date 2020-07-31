import React, { useState, useEffect } from 'react';
import './Home.css';
import BasePage from '../../components/BasePage';
import BannerMain from '../../components/BannerMain';
import Carrousel from '../../components/Carousel';
import categoryRepository from '../../repository/category';

function Home() {

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		categoryRepository.getAllWithVideos()
			.then((categorias) => {
				setCategories(categorias);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	const hasCategories = categories.length > 0;

	return (
		<BasePage >

			{
				!hasCategories && (<div>Loading...</div>)
			}

			{
				hasCategories && (
					<BannerMain video={categories[0].videos[0]} />
				) && (
					categories.map(categoria => (
						<Carrousel
							key={categoria.id}
							ignoreFirstVideo
							category={categoria}
							videos={categoria.videos}
						/>
					))
				)
			}

		</BasePage >
	);
}

export default Home;
