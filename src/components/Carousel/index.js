import React from 'react';
import { VideoCardGroupContainer, Title } from './styles';
import VideoCard from './components/VideoCard';
import Slider, { SliderItem } from './components/Slider';

function VideoCardGroup({ channel, handleClick }) {
	const channelTitle = channel.title;
	const videos = channel.videos;

	return (
		<VideoCardGroupContainer>
			{channelTitle && (
				<>
					<Title style={{ backgroundColor: 'var(--primary)' }}>
						{channelTitle}
					</Title>
				</>
			)}
			<Slider>
				{videos.map((video) => {

					return (
						<SliderItem key={`slider_${video.id}`}>
							<VideoCard
								key={`card_${video.id}`}
								video={video}
								channelColor='var(--primary)'
								banner={channel.bannerImage}
								handleClick={handleClick}
							/>
						</SliderItem>
					);
				})}
			</Slider>
		</VideoCardGroupContainer>
	);
}

export default VideoCardGroup;
