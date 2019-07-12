import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Styles
import { Card, Icon, Image } from 'semantic-ui-react';
import './App.css';

/* API KEY */
// https://api.nasa.gov/planetary/apod?api_key=zgYYmlEFly5eugxnKgtov0khEFcvpLbWw7s2Jitv

const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=zgYYmlEFly5eugxnKgtov0khEFcvpLbWw7s2Jitv';

function App() {
	const [state, setState] = useState({
		copyright: '',
		date: '',
		explanation: '',
		hdurl: '',
		media_type: '',
		service_version: '',
		title: '',
		url: '',
		error: ''
	});

	useEffect(() => {
		axios.get(baseUrl)
			.then(response => setState(response.data))
			.catch(err => err.response.data.error.message);
	}, []);

	const days = (month, year) =>
		[1, 3, 5, 7, 8, 10, 12].includes(month)
			? 31
			: [4, 6, 9, 11].includes(month)
			? 30
			: year % 4 == 0
			? 29
			: 28;

	function randomPhoto() {
		// 1995 first data point

		// Years: 1995 - current year (2019)

		const yearMin = 1995;
		const yearMax = 2019;
		const yearYear = Math.floor(
			Math.random() * (+yearMax - +yearMin) + +yearMin
		); // generate random year


		const monthMin = 1;
		const monthMax = 12;
		let month = Math.floor(
			Math.random() * (+monthMax - +monthMin) + +monthMin
		); // generate random month

		month = month.toString().padStart(2, '0')

		if (yearYear === 1995 && month < 6 ) {
			month += 6;
		}

		const minDay = 1;
		let maxDay = days(month, yearYear);
		const day = Math.floor(
			Math.random() * (+maxDay - +minDay) + +minDay
		); // generate random day

		axios.get(`${baseUrl}&date=${yearYear}-${month}-${day}`)
			.then(response => setState(response.data))
			.catch(err => err.response.data.error.message);
	}

	return (
		<div className="App">
			{state.error ? <p>{state.error}</p> : ''}

			<Card style={{ width: '800px' }} centered>
				<Card.Header>{state.title}</Card.Header>
				{state.media_type === 'video' ? (
					<iframe src={state.url} />
				) : (
					<img src={state.url} />
				)}

				<p>{state.explanation}</p>

				<button onClick={randomPhoto}>Random Date</button>
			</Card>
		</div>
	);
}

export default App;
