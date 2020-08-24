import { API_URL } from '../config';

export async function getNewChannel(channelId) {
	const CHANNEL_URL = `${API_URL}/channel/${channelId}`;

	const channel = await fetch(CHANNEL_URL).then(async (response) => {
		if (response.ok) {
			return await response.json();
		}
		throw new Error(response.message)
	})

	return channel;
}

export async function getNewVideos(channelId) {
	const videosSaved = await getVideos(channelId);
	let lastPublished = -1;
	if (videosSaved.length)
		lastPublished = videosSaved.reduce((newest, video, index, array) => {
			if (index === 0)
				return newest.publishTime;
			return new Date(newest.publishTime) > new Date(video.publishTime) ? newest.publishTime : video.publishTime;
		})

	const VIDEOS_URL = `${API_URL}/channel/${channelId}/videos/${lastPublished}`;
	const videos = await fetch(VIDEOS_URL)
		.then(async (response) => {
			if (response.ok) {
				return await response.json();
			}
			throw new Error(response.message)
		});

	return videos;
}

export async function getChannels() {
	const CHANNEL_URL = `${API_URL}/channels`

	const channels = await fetch(CHANNEL_URL).then(async (res) => {
		if (res.ok)
			return await res.json();

		throw new Error('Não foi possível coletar os canais.')
	})
	return channels;
}

export async function getVideos(channelId) {
	const VIDEOS_URL = `${API_URL}/videos?channelId=${channelId}`;

	const videos = await fetch(VIDEOS_URL).then(async (res) => {
		if (res.ok)
			return await res.json();

		throw new Error('Não foi possível coletar os canais.')
	})
	return videos;
}

export async function getAllWithVideos() {
	const CHANNEL_URL = `${API_URL}/channels?_embed=videos`;

	const channels = await fetch(CHANNEL_URL).then(async (res) => {
		if (res.ok)
			return await res.json();

		throw new Error('Não foi possível coletar os canais com vídeos.')
	});

	return channels;
}

export async function saveChannel(channel) {
	const CHANNEL_URL = `${API_URL}/channels`;
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(channel)
	};
	const result = await fetch(CHANNEL_URL, requestOptions).then(async (res) => {
		if (res.ok)
			return await res.json();

		throw new Error('Não foi possível salvar o canal.');
	});

	return result;
}

export async function saveVideos(videos) {
	const CHANNEL_URL = `${API_URL}/videos`;
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(videos)
	};
	const result = await fetch(CHANNEL_URL, requestOptions).then(async (res) => {
		if (res.ok)
			return await res.json();

		throw new Error('Não foi possível salvar os vídeos.');
	});

	return result;
}


