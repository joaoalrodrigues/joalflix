import React, { useState, useEffect } from 'react';
import VideoIframeResponsive from './components/VideoIframeResponsive';
import { BannerMainContainer, ContentAreaContainer, WatchButton } from './styles';

function getYouTubeId(youtubeURL) {
	return youtubeURL
		.replace(
			/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
			'$7',
		);
}

export default function BannerMain() {
	const [video, setVideo] = useState({});

	useEffect(() => {
		const isLocalhost = window.location.href.includes('localhost');
		const URL = isLocalhost ? "http://localhost:8080/videos?id=2" : "https://joalflix.herokuapp.com/videos?id=2";
		fetch(URL)
			.then(async (response) => {
				if (response.ok) {
					const result = (await response.json())[0];
					result.youTubeID = getYouTubeId(result.url);
					result.bgUrl = `https://img.youtube.com/vi/${result.youTubeID}/maxresdefault.jpg`;
					setVideo(result);
					return;
				}
				throw new Error('Não foi possível coletar os dados.')
			});
	}, []);

	return (
		<BannerMainContainer backgroundImage={video.bgUrl}>
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
						youtubeID={video.youTubeID}
					/>
					<WatchButton>
						Assistir
          </WatchButton>
				</ContentAreaContainer.Item>
			</ContentAreaContainer>
		</BannerMainContainer>
	);
}
