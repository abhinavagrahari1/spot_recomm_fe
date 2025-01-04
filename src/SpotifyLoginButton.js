// SpotifyLoginButton.js
import React from 'react';

const clientId = '059e595a368946bc833b58ab426d5451';
const redirectUri = `${process.env.REACT_APP_BASE_URL_BE_PROD}/auth/callback`;
const scopes = ['user-read-email', 'playlist-read-private', 'user-top-read'];

const SpotifyLoginButton = () => {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes.join(' '))}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    return (
        <button className='spotify-login-btn' onClick={() => window.location.href = authUrl}>
            Login with Spotify
        </button>
    );
};

export default SpotifyLoginButton;
