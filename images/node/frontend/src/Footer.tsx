import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.container}>
			<div className={styles.left_container}>
				<p className={styles.references}>Copyright @ ShorterURL</p>	
			</div>

			<div className={styles.right_container}>
			</div>

		</footer>
	);
}
