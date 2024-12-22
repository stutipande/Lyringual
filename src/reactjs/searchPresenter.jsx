import { observer } from "mobx-react-lite";
import { SearchFormView } from '../views/searchFormView.jsx';
import { SearchResultsView } from '../views/searchResultsView.jsx';
import { ClockLoader } from "react-spinners";
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS } from 'react-joyride';

import {defaultOptions} from '../tooltipStyle.js'


const Search = observer( 
function SearchRender(props) {
    const searchTypeOptions = ["artist", "title"];
    const searchText = props.model.searchParams.query;  
    const searchType = props.model.searchParams.type; 
    let steps;

    if ( props.model.showSearchTutorial ) {
    steps = [
        {
          target: '.languagePicker',
          content: 'Pick the language that you want to learn here!',
        },
        {
            target: '.song',
            content: 'Click on a song to start translating it!',
        }
    ];
}

    // Custom Event Handlers
    function handleTextChange(text) {
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

    function setPreferredLanguageACB(lang) {
        console.log('Language set to:', lang);
        props.model.setPreferredLanguage(lang); 
    }

    function renderSearchResults(promiseState) {
        if (!promiseState.promise) {
            return <div>No data</div>; 
        }

        if (promiseState.error) {
            return <div>Error: {promiseState.error.toString()}</div>; 
        }

        if (promiseState.promise && !promiseState.data) {
            return <div class="fullscreen">
            <ClockLoader
               color={'#03dac6'}
               loading={true}
               cssOverride={{
                   display: "block",
                   margin: "auto auto",
                   borderColor: "red",
                 }}
               size={50}
               aria-label="Loading Spinner"
               data-testid="loader"
           />
       </div>; 
        }

        if (promiseState.data) {
            return <SearchResultsView
                searchResults={promiseState.data.length ? promiseState.data : []}
                onSongClick={setCurrentSongACB} 
             
            />;
        }

    }

    const handleJoyrideCallback = (data) => {
        const { action, index, origin, status, type } = data;
        if (type == "tour:end") {
            console.log('Doing the thing!')
            props.model.disableSearchTutorial();
        }
      };

    return (
        <div>

        <Joyride
          steps={steps}
          callback={handleJoyrideCallback}
          styles={defaultOptions}
        />

            <SearchFormView
                text={searchText}
                type={searchType}
                searchTypeOptions={searchTypeOptions}
                onTextChange={handleTextChange}  
                onTypeChange={handleTypeChangeACB} 
                onSearchSong={searchNowACB} 
                onLanguageChange = {setPreferredLanguageACB}
                lastSongId={props.model.lastSongId} 
                lang={props.model.lang} 

            />

            {renderSearchResults(props.model.searchResultsPromiseState)}
        </div>
    );
}
);
export { Search };
