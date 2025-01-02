import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SpotifyLoginButton from './SpotifyLoginButton';
import Recommendations from './Recommendations';
import './App.css';

const App = () => (
    <Router>
        <div className="app-container">
            <ConditionalLoginButton />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
        </div>
    </Router>
);

const ConditionalLoginButton = () => {
    const location = useLocation();
    return location.pathname === '/' ? <SpotifyLoginButton /> : null;
};

const Home = () => (
    <div className="home-container">
        <h1>Welcome to My Spotify App</h1>
        <p>Discover new music recommendations based on your Spotify listening history.</p>
    </div>
);

export default App;
