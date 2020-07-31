import React from 'react';
import { VideoCardGroupContainer, Title, ExtraLink } from './styles';
import VideoCard from './components/VideoCard';
import Slider, { SliderItem } from './components/Slider';

function VideoCardGroup({
	ignoreFirstVideo,
	category,
	videos
}) {
	const categoryTitle = category.titulo;
	const categoryColor = category.cor;
	const categoryExtraLink = category.link_extra;

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
