import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasePage from '../../../components/BasePage';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';


function useForm(initialValues) {
	const [values, setValues] = useState(initialValues);

	function handleChange(event) {
		const { value, name } = event.target;
		setValues({ [name]: value });
	}

	function clearForm() {
		setValues(initialValues);
	}

	return {
		values,
		handleChange,
		clearForm,
	}
}

function CadastroCategoria() {
	const [categories, setCategories] = useState([]);

	const initialValues = {
		titulo: '',
		description: '',
		color: '#000',
	};

	const { handleChange, values, clearForm } = useForm(initialValues);


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

				clearForm();
			}}>

				<FormField
					label="Título"
					type="text"
					name="titulo"
					value={values.titulo}
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
