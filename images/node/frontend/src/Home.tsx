import React from 'react';
import styles from './Home.module.css';
import UrlForm from './UrlForm';

// the main page for submitting urls to conver to a shorter link
export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.section_1}>
				<UrlForm/>
				<div className={styles.intro}>
					<h2 className={styles.title}>Welcome to TinyURL</h2>
					<h3 className={styles.subtitle}>A better TinyURL...</h3>

				</div>

			</div>			

		</div>
	);
}
