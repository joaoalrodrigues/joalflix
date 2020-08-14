const axios = require('axios');

const VIDEOS_PATH = "search?key=<API_KEY>&channelId=<CHANNEL_ID>&fields=items(id(videoId),snippet(channelId,title,description,thumbnails(high(url)),publishTime))&part=snippet&order=date&maxResults=20";
const CHANNEL_PATH = "channels?fields=items(id,brandingSettings(channel(title,description),image(bannerTvHighImageUrl)))&part=brandingSettings&id=<CHANNEL_ID>&key=<API_KEY>";

const service = {

	getNewChannel: async (channelId) => {
		let CHANNEL_URL = `${process.env.YOUTUBE_API_URL}${CHANNEL_PATH}`
		CHANNEL_URL = fixURL(CHANNEL_URL, channelId)

		const result = await axios.get(CHANNEL_URL).then(async (response) => {
			if (await response.data.error)
				throw new Error("Não foi possível coletar os dados.");
			return await response.data;
		}).catch(err => console.log(err));

		const channel = fixChannelProperties(result.items[0]);
		return channel;
	},

	getNewVideos: async (channelId, lastDate) => {
		const publishedAfter = lastDate != -1 ? `&publishedAfter=${lastDate}` : "";
		let VIDEOS_URL = `${process.env.YOUTUBE_API_URL}${VIDEOS_PATH}${publishedAfter}`;
		VIDEOS_URL = fixURL(VIDEOS_URL, channelId);

		const result = await axios.get(VIDEOS_URL)
			.then(async (response) => {
				if (await response.data.error)
					throw new Error("Não foi possível coletar os dados.");
				return await response.data;
			}).catch(err => console.log(err));

		const videos = result.items.map(video => fixVideoProperties(video));
		return videos;
	},

}

function fixURL(url, channelId) {
	url = url.replace("<API_KEY>", process.env.YOUTUBE_API_KEY);
	url = url.replace("<CHANNEL_ID>", channelId);
	return url;
}

function fixVideoProperties(video) {
	return {
		id: video.id.videoId,
		channelId: video.snippet.channelId,
		title: video.snippet.title,
		description: video.snippet.description,
		thumbnail: video.snippet.thumbnails.high.url,
		publishTime: video.snippet.publishTime,
		url: process.env.YOUTUBE_WATCH.replace("<VIDEO_ID>", video.id.videoId)
	};
}

function fixChannelProperties(channel) {
	return {
		id: channel.id,
		title: channel.brandingSettings.channel.title,
		description: channel.brandingSettings.channel.description,
		bannerImage: channel.brandingSettings.image.bannerTvHighImageUrl
	}
}

module.exports = service;