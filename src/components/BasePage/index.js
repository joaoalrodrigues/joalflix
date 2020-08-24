import React from 'react';
import Menu from '../Menu';
import Footer from '../Footer';
import styled from 'styled-components';

const Main = styled.main`
background-color: var(--grayDark);
color: var(--white);
flex: 1;
padding-top: 50px; 
padding-right: 5%;
padding-left: 5%;
`;

const Home = styled.main`
background-color: var(--grayDark);
color: var(--white);
flex: 1;
`;

export function BasePage({ home, children }) {

	const Tag = home ? Home : Main;

	return (
		<>
			<Menu />
			<Tag>
				{children}
			</Tag>
			<Footer />
		</>
	)
}

export default BasePage;