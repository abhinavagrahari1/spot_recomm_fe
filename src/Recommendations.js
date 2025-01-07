import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Recommendations.css';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const fetchRecommendations = async (token) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL_BE_PROD}/recommendation/recommend`, {}, {
                headers: {
                    'Spotify-Access-Token': token,
                },
            });
            setRecommendations(response.data.songs);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        const getToken = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL_BE_PROD}/auth/get-spotify-token`, {
                    withCredentials: true
                });
                setAccessToken(response.data.accessToken);
            } catch (error) {
                console.error('Error fetching the token:', error);
            }
        };

        getToken();
    }, []);

    useEffect(() => {
        if (accessToken) {
            fetchRecommendations(accessToken);
        }
    }, [accessToken]);

    const handleRetry = () => {
        setLoading(true);
        setError(false);
        fetchRecommendations(accessToken);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="container">
            <div className="sidebar-container">
                <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                    <h2>Menu</h2>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/recommendations">Recommendations</a></li>
                    </ul>
                </div>
                <button className="menu-btn" onClick={toggleMenu}>
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>
            </div>
            <div className="content">
                <div className="title">Recommendations</div>
                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <p>Something went wrong. Please try again.</p>
                        <button onClick={handleRetry} className="retry-btn">Refresh</button>
                    </div>
                ) : (
                    <div className="recommendations-box">
                        <ul className="recommendations-list">
                            {recommendations.map((rec, index) => (
                                <li key={index} className="recommendation-item">
                                    {rec.name} by {rec.artist} - <a href={rec.spotifyLink} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="table-box">
                    {/* Your table content here */}
                </div>
            </div>
        </div>
    );
};

export default Recommendations;
