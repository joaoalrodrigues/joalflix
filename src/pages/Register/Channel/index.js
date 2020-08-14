import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BasePage from '../../../components/BasePage';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import { getNewChannel, saveChannel, getNewVideos, saveVideos } from '../../../repository/channel';

const Banner = styled.section`
background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
`;


function useForm(initialValues) {
	const [values, setValues] = useState(initialValues);

	function handleChange(event) {
		const { value, name } = event.target;
		setValues({ [name]: value });
	}

	async function handleClickVerify(event) {
		event.preventDefault();

		const channel = await getNewChannel(values.id);
		setValues(channel);
	}

	function clearForm() {
		setValues(initialValues);
	}

	return {
		values,
		handleChange,
		handleClickVerify,
		clearForm,
	}
}

function ChannelRegister() {
	const [channels, setChannels] = useState([]);

	const initialValues = {
		id: '',
		title: '',
		description: '',
		bannerImage: '',
	};

	const { handleChange, values, handleClickVerify, clearForm } = useForm(initialValues);


	useEffect(() => {
		const isLocalhost = window.location.href.includes('localhost');
		const URL = isLocalhost ? 'http://localhost:8080/channels' : 'https://joalflix.herokuapp.com/channels';
		fetch(URL)
			.then(async (response) => {
				if (response.ok) {
					const result = await response.json();
					setChannels(result);
					return;
				}
				throw new Error('Não foi possível coletar os dados.')
			})
	}, []);

	return (
		<BasePage backgroudImage={values.bannerImage}>
			<Banner>
				<h1>Cadastro de Canal:</h1>

				<form onSubmit={async function handleSubmit(event) {
					event.preventDefault();

					setChannels([
						...channels,
						values,
					]);

					clearForm();

					const videos = await getNewVideos(values.id);
					saveChannel(values).then((response) => console.log(response));
					saveVideos(videos);
				}}>

					<FormField
						label="Id"
						type="text"
						name="id"
						value={values.id}
						handleChange={handleChange}
					/>

					<FormField
						label="Título"
						type="text"
						name="title"
						value={values.title}
						handleChange={handleChange}
						disable
					/>

					<FormField
						label="Descrição"
						type="text"
						name="description"
						value={values.description}
						handleChange={handleChange}
						textarea
						disable
					/>

					<Banner src={values.bannerImage} alt="Banner" />

					<Button type="button" onClick={handleClickVerify}>
						Verificar
        		</Button>

					<Button>
						Cadastrar
        		</Button>

				</form>

				<ul>
					{channels.map((channel, index) => (
						<li key={`id_${index}`}>
							{channel.title}
						</li>
					))}
				</ul>

				<Link to="/">
					Ir para home
			</Link>
			</Banner>
		</BasePage >
	);
}

export default ChannelRegister;
