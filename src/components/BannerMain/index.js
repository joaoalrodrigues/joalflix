import React from 'react';
import VideoIframeResponsive from './components/VideoIframeResponsive';
import { BannerMainContainer, ContentAreaContainer, WatchButton } from './styles';

function getYouTubeId(youtubeURL) {
	return youtubeURL
		.replace(
			/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
			'$7',
		);
}

export default function BannerMain({ video, banner }) {
	const youTubeID = getYouTubeId(video.url);

	return (
		<BannerMainContainer backgroundImage={banner}>
			<ContentAreaContainer>
				<ContentAreaContainer.Item>
					<ContentAreaContainer.Title>
						{video.title}
					</ContentAreaContainer.Title>

					<ContentAreaContainer.Description>
						{video.description}
					</ContentAreaContainer.Description>
				</ContentAreaContainer.Item>

				<ContentAreaContainer.Item>
					<VideoIframeResponsive
						youtubeID={youTubeID}
					/>
					<WatchButton>
						Assistir
          </WatchButton>
				</ContentAreaContainer.Item>
			</ContentAreaContainer>
		</BannerMainContainer>
	);
}
