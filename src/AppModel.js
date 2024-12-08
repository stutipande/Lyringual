import { searchSongs, getSongDetails } from "./songSource";
import { resolvePromise } from "./resolvePromise";


/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
const model = {  
    currentSongId: null,  // null means "intentionally empty"
    lastSongId: null,
    searchParams: {},
    searchResultsPromiseState: {},
    currentSongPromiseState: {},
    clientId: null,
    previousLang: null,
    lang: "en",


    setClientId() {
        resolvePromise(getClientId(), this.searchResultsPromiseState);
    },

    setSearchQuery(query) {
        this.searchParams.query = query;
    },

    setSearchType(type) {
        this.searchParams.type = type;
    },

    doSearch() {
        resolvePromise(searchSongs(this.searchParams.query, this.searchParams.type),this.searchResultsPromiseState);
    },

    setCurrentSongId(songId){

        // Save current song as last song before updating
        const lastSongId = this.currentSongId;
        this.lastSongId = lastSongId; //Store last song's Id


        console.log('Setting songID', songId);
        if(songId && this.currentSongId != songId || this.lang != this.previousLang) {
            resolvePromise(getSongDetails(songId, this.lang),this.currentSongPromiseState);
        }
        this.previousLang = this.lang;
        this.currentSongId = songId;
        
    },

    setPreferredLanguage(language) {
        this.lang = language;
      },
};

export {model};
