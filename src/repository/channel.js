import config from '../config';


const VIDEOS_PATH = "search?key=<API_KEY>&channelId=<CHANNEL_ID>&fields=items(id(videoId),snippet(channelId,title,description,thumbnails(high(url)),publishTime))&part=snippet&order=date&maxResults=20";
const CHANNEL_PATH = "channels?fields=items(id,brandingSettings(channel(title,description,image(bannerTvHighImageUrl))&part=brandingSettings&id=<CHANNEL_ID>&key=<API_KEY>";

async function getNewChannel(channelId) {
  let CHANNEL_URL = `${config.YOUTUBE_API_URL}${CHANNEL_PATH}`;
  CHANNEL_URL = fixURL(CHANNEL_URL, channelId)

  const result = await fetch(CHANNEL_URL).then(async (response) => {
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Não foi possível coletar as informações do canal.')
  })

  const channel = fixChannelProperties(result.items[0]);
  return channel;
}

async function getNewVideos(channelId) {
  const videosSaved = await getVideos(channelId);
  let lastPublished;
  if (videosSaved.length)
    lastPublished = videosSaved.reduce((newest, video, index, array) => {
      if (index === 0)
        return newest.publishTime;
      return new Date(newest.publishTime) > new Date(video.publishTime) ? newest.publishTime : video.publishTime;
    })

  let VIDEOS_URL = `${config.YOUTUBE_API_URL}${VIDEOS_PATH}${lastPublished ? `&publishedAfter=${lastPublished}` : ''}`;
  VIDEOS_URL = fixURL(VIDEOS_URL, channelId);

  const result = await fetch(VIDEOS_URL)
    .then(async (response) => {
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Não foi possível coletar os vídeos novos.')
    });

  const videos = result.items.map(video => fixVideoProperties(video));

  return videos;
}

async function getChannels() {
  const CHANNEL_URL = `${config.API_URL}/channels`

  const channels = await fetch(CHANNEL_URL).then(async (res) => {
    if (res.ok)
      return await res.json();

    throw new Error('Não foi possível coletar os canais.')
  })
  return channels;
}

async function getVideos(channelId) {
  const VIDEOS_URL = `${config.API_URL}/videos?channelId=${channelId}`;

  const videos = await fetch(VIDEOS_URL).then(async (res) => {
    if (res.ok)
      return await res.json();

    throw new Error('Não foi possível coletar os canais.')
  })
  return videos;
}

export async function getAllWithVideos() {
  const CHANNEL_URL = `${config.API_URL}/channels?_embed=videos`;

  const channels = await fetch(CHANNEL_URL).then(async (res) => {
    if (res.ok)
      return await res.json();

    throw new Error('Não foi possível coletar os canais com vídeos.')
  });

  return channels;
  // const channels = await getChannels();

  // for (let i = 0; i < channels.length; i++) {
  //   const videos = await getVideos(channels[i].id);
  //   channels[i].videos = videos;
  // }

  // return channels;
}

export async function saveChannel(channel) {
  const CHANNEL_URL = `${config.API_URL}/channels`;
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
  const CHANNEL_URL = `${config.API_URL}/videos`;
  const requestOptions = {
    method: 'POST',
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

function fixURL(url, channelId) {
  url = url.replace("<API_KEY>", config.YOUTUBE_API_KEY);
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
    url: config.YOUTUBE_WATCH.replace("<VIDEO_ID>", video.id.videoId)
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
