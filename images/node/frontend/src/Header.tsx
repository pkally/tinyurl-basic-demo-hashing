import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
	return (
		<header className={styles.container}>
			<div className={styles.left_container}>
				<h1 className={styles.heading}>ShorterURL</h1>					
				<nav className={styles.navigation}>
					<Link to="/">Home</Link>
				</nav>

			</div>
			<div className={styles.right_container}>

			</div>	

		</header>
	);

}
