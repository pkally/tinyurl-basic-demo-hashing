import React, { useState }  from 'react';
import styles from './UrlForm.module.css';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import api_format from './api_format';

const url_regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
export default function UrlForm() {
	let [url, setUrl] = useState('');
	let [retr_url, setRetrUrl] = useState('');

	function is_valid_url(url:string) {	
		if (url.match(url_regex))
			return true;
	
		console.error('Invalid url inputted.');
		return false;		
	}

	function send_url(url:string) {
		if (!is_valid_url(url)) {
			console.error('Not sending invalid url.');
			return;
		}

		const url_data:api_format = {
			api_version: '1.0',
			status: 'ok',
			method: 'url.post',
			data: [url]
		}

		const option:any = {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(url_data)
		}

	 	fetch('http://127.0.0.1:80/api/v1.0/mapping/', option)
		.then((response:any) => response.json())
		.then((data:any) => {
			if (data.status === 'ok') {
				setRetrUrl(data.new_url);
			
			}

		});

	}
	
	return (
		<form className={styles.container} onSubmit={(event) => event.preventDefault()}>
			<label htmlFor='url_input'>Enter a link to shorten!</label>
			<input id='url_input' name='url' type='text' placeholder='URL' value={url} onChange={(event) => setUrl(event.target.value)} className={styles.url_input}/>

			<button className={styles.url_form_button} onClick={() => send_url(url)}>Submit</button>
			<div className={styles.hcaptcha_container}>
				<HCaptcha sitekey='7a9ef0c8-c5fc-4201-86e7-4641625004fc'/>
			
			</div>

			<div className={styles.retr_url_container}>
				<h3 className={styles.retr_url}>{retr_url}</h3>

			</div>
	
		</form>
	);
}
