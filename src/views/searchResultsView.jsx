export function SearchResultsView(props) {
 
    // Event handler for dish click
    function handleSongClickACB(song) {
            window.location.hash = '#/details';
            return props.onSongClick(song); 
    };

    // Render search results
    function renderSearchResultsCB() {
        return props.searchResults.map((song) => (
            <div 
                className="card song"
                key={song.id} 
                onClick={() => handleSongClickACB(song)} 
            >
                <img
                    src={song.albumArt} 
                    alt={song.title} 
                    height="100"  
                />
                <p>{song.title}</p> 
            </div>
        ));
    };

    return (
        <div className="searchResult"> {renderSearchResultsCB()}</div>
    );
}
