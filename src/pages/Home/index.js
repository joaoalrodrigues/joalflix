import React, { useState, useEffect } from 'react';
import './Home.css';
import { BasePage } from '../../components/BasePage';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import { getAllWithVideos } from '../../repository/channel';

function Home() {

	const [channels, setChannels] = useState([]);
	const [video, setVideo] = useState({});
	const [banner, setBanner] = useState("");

	const handleClick = (video, banner) => {
		setVideo(video);
		setBanner(banner);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		getAllWithVideos().then((channels) => {
			setVideo(channels[0].videos[0]);
			setBanner(channels[0].bannerImage);
			setChannels(channels);
		}).catch((err) => {
			console.log(err.message);
		});

	}, []);

	return (
		<BasePage home>

			{channels.length === 0 && (<div>Loading...</div>)}

			{
				channels.map((channel, index) => {
					if (index === 0) {
						return (
							<div key={channel.id}>
								<BannerMain video={video} banner={banner} />
								<Carousel
									ignoreFirstVideo
									channel={channels[0]}
									handleClick={handleClick}
								/>
							</div>
						);
					}

					return (
						<Carousel
							key={channel.id}
							channel={channel}
							handleClick={handleClick}
						/>
					);
				})

			}

		</BasePage >
	);
}

export default Home;
