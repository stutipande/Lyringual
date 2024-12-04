export function SearchResultsView(props) {
 
    // Event handler for dish click
    function handleSongClickACB(song) {
            window.location.hash = '#/details';
            return props.onSongClick(song); 
    };

    // Render search results
    function renderSearchResultsCB() {
        return props.searchResults.map((song) => (
            <span 
                
                key={song.id} 
                onClick={() => handleSongClickACB(song)} 
            >
                <img
                    src={song.albumArt} 
                    alt={song.title} 
                    height="100"  
                />
                <div>{song.title}</div> 
                <button onClick={() => (window.location.hash = "#/details")}>View details</button><br></br>
            </span>
        ));
    };

    return (
        <div class="searchResult"> {renderSearchResultsCB()}</div>
    );
}
