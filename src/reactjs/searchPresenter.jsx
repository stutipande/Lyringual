import { observer } from "mobx-react-lite";
import { SearchFormView } from '../views/searchFormView.jsx';
import { SearchResultsView } from '../views/searchResultsView.jsx';

const Search = observer( 
function SearchRender(props) {
    const searchTypeOptions = ["artist", "title"];
    const searchText = props.model.searchParams.query;  
    const searchType = props.model.searchParams.type;   

    // Custom Event Handlers
    function handleTextChange(text) {
        console.log(text);
        props.model.setSearchQuery(text); 
    }

    function handleTypeChangeACB(type) {
        props.model.setSearchType(type);  
    }

    function searchNowACB() {
        props.model.doSearch();  
    }

    function setCurrentSongACB(song) {
        console.log('Setting current song to:', song.id);
        props.model.setCurrentSongId(song.id); 
    }

    function renderSearchResults(promiseState) {
        if (!promiseState.promise) {
            return <div>No data</div>; 
        }

        if (promiseState.error) {
            return <div>Error: {promiseState.error.toString()}</div>; 
        }

        if (promiseState.promise && !promiseState.data) {
            return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />; 
        }

        if (promiseState.data) {
            return <SearchResultsView
                searchResults={promiseState.data.length ? promiseState.data : []}
                onSongClick={setCurrentSongACB} 
            />;
        }

    }

    return (
        <div>

            <SearchFormView
                text={searchText}
                type={searchType}
                searchTypeOptions={searchTypeOptions}
                onTextChange={handleTextChange}  
                onTypeChange={handleTypeChangeACB} 
                onSearchSong={searchNowACB} 
                
            />

            {renderSearchResults(props.model.searchResultsPromiseState)}
        </div>
    );
}
);
export { Search };
