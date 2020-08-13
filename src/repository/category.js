import config from '../config';

const PATH = `${config.API_URL}/categorias`

function getAllWithVideos() {
	const URL = `${PATH}?_embed=videos`
	return fetch(URL)
		.then(async (response) => {
			if (response.ok) {
				const result = await response.json();

				return result;
			}
			throw new Error('Não foi possível coletar os dados.')
		});
}

export default {
	getAllWithVideos,
};