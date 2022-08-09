import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';

import Home from './Home';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className={styles.container}>
			<BrowserRouter>
				<Header/>
				<Routes>
					<Route path="/" element={<Home/>}/>
				</Routes>
				<Footer/>
			</BrowserRouter>
    </div>
  );
}

export default App;
