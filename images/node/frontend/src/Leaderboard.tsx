import React from 'react';
import styles from './Leaderboard.module.css';

function LeaderboardRow() {
	return (
		<tr className={styles.row}>
        	<td>www.roblox.com</td>
        	<td>Yes</td>
        	<td>32000</td>
		</tr>
	);
}

export default function Leaderboard() {
	return (
		<div className={styles.container}>
			<h2 className={styles.table_name}>Mappings</h2>
			<table className={styles.leaderboard_table}>
				<tr className={styles.table_header}>
            		<td>Link</td>
					<td>Has Password</td>
            		<td>Visits</td>
				</tr>
				<LeaderboardRow/>

			</table>
		</div>
	);
} 
