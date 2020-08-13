import React from 'react';
import Logo from '../../assets/img/Logo.png';
import { FooterBase, FooterLogo } from './styles';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<FooterBase>
			<Link href="/">
				<FooterLogo src={Logo} alt="Logo" />
			</Link>
		</FooterBase>
	);
}

export default Footer;
