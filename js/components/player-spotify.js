// Spotify Player Component JavaScript
export function initializeSpotifyPlayer() {
    console.log('Initializing Spotify player...');

    // Get the player container
    const spotifyPlayer = document.getElementById('spotify-player');
    if (!spotifyPlayer) {
        console.error('Spotify player container not found in the DOM');
        return;
    }

    console.log('Spotify player element found, preparing to populate it');

    // Create a simple playlist selector
    const playlistSelector = document.createElement('div');
    playlistSelector.className = 'playlist-selector';
    playlistSelector.style.marginBottom = '10px';
    playlistSelector.style.display = 'flex';
    playlistSelector.style.justifyContent = 'space-between';

    // Add preset playlists
    const playlists = [
        { name: "🌟", id: "2XGBNVpiiw1h1ecWlCMZgJ" },
        { name: "⭐", id: "65vVgisgV8vrEcjjUxXwuu" },
        { name: "Custom", id: "custom" }
    ];

    // Create buttons for each playlist
    playlists.forEach(playlist => {
        const button = document.createElement('button');
        button.textContent = playlist.name;
        button.className = 'control-button';
        button.style.margin = '0 2px';
        button.style.padding = '5px 10px';
        button.style.fontSize = '0.8rem';

        if (playlist.id === 'custom') {
            // Custom playlist handler
            button.addEventListener('click', () => {
                const url = prompt('Enter Spotify URL (playlist, album, or track):');
                if (url) {
                    try {
                        // Extract the ID from a Spotify URL
                        const match = url.match(/spotify\.com\/(playlist|album|track)\/([a-zA-Z0-9]+)/);
                        if (match) {
                            const type = match[1];
                            const id = match[2];
                            updateSpotifyEmbed(type, id);
                        } else {
                            alert('Invalid Spotify URL format');
                        }
                    } catch (err) {
                        console.error('Error processing Spotify URL:', err);
                    }
                }
            });
        } else {
            // Preset playlist handler
            button.addEventListener('click', () => {
                updateSpotifyEmbed('playlist', playlist.id);
            });
        }

        playlistSelector.appendChild(button);
    });

    // Create the iframe for embedding Spotify
    const spotifyEmbed = document.createElement('div');
    spotifyEmbed.id = 'spotify-embed';

    // Add elements to the player container
    spotifyPlayer.innerHTML = ''; // Clear any existing content
    spotifyPlayer.appendChild(playlistSelector);
    spotifyPlayer.appendChild(spotifyEmbed);

    // Make the player visible immediately
    spotifyPlayer.style.display = 'block';
    console.log('Spotify player is now visible');

    // Initialize with your specific playlist
    updateSpotifyEmbed('playlist', '2XGBNVpiiw1h1ecWlCMZgJ');

    // Listen for the player start event (for redundancy)
    document.addEventListener('startPlayer', function() {
        console.log('Received startPlayer event');
        spotifyPlayer.style.display = 'block';
        console.log('Spotify player display style set to block');
    });

    // Function to update the Spotify embed with a new playlist/album/track
    function updateSpotifyEmbed(type, id) {
        console.log(`Updating Spotify embed with ${type} ID: ${id}`);
        spotifyEmbed.innerHTML = `
            <iframe 
                src="https://open.spotify.com/embed/${type}/${id}" 
                width="100%" 
                height="380" 
                frameBorder="0" 
                allowtransparency="true" 
                allow="encrypted-media">
            </iframe>
        `;
    }
}