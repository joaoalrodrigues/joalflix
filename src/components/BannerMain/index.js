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

export default function BannerMain({ video }) {
	const youTubeID = getYouTubeId(video.url);
	const bgUrl = `https://img.youtube.com/vi/${youTubeID}/maxresdefault.jpg`;

	return (
		<BannerMainContainer backgroundImage={bgUrl}>
			<ContentAreaContainer>
				<ContentAreaContainer.Item>
					<ContentAreaContainer.Title>
						{video.titulo}
					</ContentAreaContainer.Title>

					<ContentAreaContainer.Description>
						{video.titulo}
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
