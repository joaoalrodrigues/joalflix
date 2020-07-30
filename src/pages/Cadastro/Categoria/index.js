import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasePage from '../../../components/BasePage';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
	const [categories, setCategories] = useState([]);

	const initialValues = {
		name: '',
		description: '',
		color: '#000',
	};

	const [values, setValues] = useState(initialValues);

	function handleChange(event) {
		const { value, name } = event.target;
		setValues({ [name]: value });
	}

	useEffect(() => {
		const isLocalhost = window.location.href.includes('localhost');
		const URL = isLocalhost ? 'http://localhost:8080/categorias' : 'https://joalflix.herokuapp.com/categorias';
		fetch(URL)
			.then(async (response) => {
				if (response.ok) {
					const result = await response.json();
					setCategories(result);
					return;
				}
				throw new Error('Não foi possível coletar os dados.')
			})
	}, []);

	return (
		<BasePage>
			<h1>Cadastro de Categoria: {values.name}</h1>

			<form onSubmit={function handleSubmit(event) {
				event.preventDefault();

				setCategories([
					...categories,
					values,
				]);

				setValues(initialValues);
			}}>

				<FormField
					label="Nome"
					type="text"
					name="name"
					value={values.name}
					handleChange={handleChange}
				/>

				<FormField
					label="Descrição"
					type="text"
					name="description"
					value={values.description}
					handleChange={handleChange}
					textarea
				/>

				<FormField
					label="Cor"
					type="color"
					name="color"
					value={values.color}
					handleChange={handleChange}
				/>

				<Button>
					Cadastrar
        		</Button>
			</form>

			<ul>
				{categories.map((categorie, index) => (
					<li key={`id_${index}`}>
						{categorie.titulo}
					</li>
				))}
			</ul>

			<Link to="/">
				Ir para home
			</Link>

		</BasePage >
	);
}

export default CadastroCategoria;
