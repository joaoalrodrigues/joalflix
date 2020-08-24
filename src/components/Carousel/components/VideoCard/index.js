/* eslint-disable react/prop-types */
import React from 'react';
import VideoCardContainer from './styles';

function getYouTubeId(youtubeURL) {
	return youtubeURL
		.replace(
			/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
			'$7',
		);
}

function VideoCard({ video, channelColor, banner, handleClick }) {
	const image = `https://img.youtube.com/vi/${getYouTubeId(video.url)}/hqdefault.jpg`;
	return (
		<VideoCardContainer
			url={image}
			// href={videoURL}
			target="_blank"
			style={{ borderColor: channelColor }}
			title={video.title}
			onClick={() => handleClick(video, banner)}
		/>
	);
}

export default VideoCard;
