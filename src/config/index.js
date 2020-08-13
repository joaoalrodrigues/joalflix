const config = {

	API_URL: window.location.href.includes('localhost') ? "http://localhost:8080" : "https://joalflix.herokuapp.com",

	YOUTUBE_API_URL: "https://www.googleapis.com/youtube/v3/",
	YOUTUBE_API_KEY: "AIzaSyBp6vKBK9e0ml1BD8IOX4yVBFUHfOqsdIQ",
	YOUTUBE_WATCH: "https://www.youtube.com/watch?v=<VIDEO_ID>"
}

export default config;