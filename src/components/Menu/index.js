import React from 'react';
import Logo from '../../assets/img/Logo.png';
import './Menu.css';
import ButtonLink from './components/ButtonLink';
import { Link } from 'react-router-dom';

function Menu() {
	return (
		<nav className="Menu">
			<Link to="/">
				<img className="Logo" src={Logo} alt="joalflix logo" />
			</Link>

			<ButtonLink className=" ButtonLink" href="/register/channel">
				Novo canal
            </ButtonLink>
		</nav >
	);
}

export default Menu;