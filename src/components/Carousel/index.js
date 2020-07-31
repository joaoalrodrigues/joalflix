import React, { useState, useEffect } from 'react';
import { VideoCardGroupContainer, Title, ExtraLink } from './styles';
import VideoCard from './components/VideoCard';
import Slider, { SliderItem } from './components/Slider';

function VideoCardGroup({
	ignoreFirstVideo,
	category
}) {
	const categoryTitle = category.titulo;
	const categoryColor = category.cor;
	const categoryExtraLink = category.link_extra;

	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const isLocalhost = window.location.href.includes('localhost');
		const URL = isLocalhost ? `http://localhost:8080/videos?categoriaId=${category.id}` : `https://joalflix.herokuapp.com/videos?categoriaId=${category.id}`;
		fetch(URL)
			.then(async (response) => {
				if (response.ok) {
					const result = await response.json();
					setVideos(result);
					return;
				}
				throw new Error('Não foi possível coletar os dados.')
			});
	}, []);

	return (
		<VideoCardGroupContainer>
			{categoryTitle && (
				<>
					<Title style={{ backgroundColor: categoryColor || 'red' }}>
						{categoryTitle}
					</Title>
					{categoryExtraLink
						&& (
							<ExtraLink href={categoryExtraLink.url} target="_blank">
								{categoryExtraLink.text}
							</ExtraLink>
						)}
				</>
			)}
			<Slider categoryColor={categoryColor}>
				{videos.map((video, index) => {
					if (ignoreFirstVideo && index === 0) {
						return null;
					}

					return (
						<SliderItem key={`slider_${video.id}`}>
							<VideoCard
								key={`card_${video.id}`}
								videoTitle={video.titulo}
								videoURL={video.url}
								categoryColor={categoryColor}
							/>
						</SliderItem>
					);
				})}
			</Slider>
		</VideoCardGroupContainer>
	);
}

export default VideoCardGroup;
