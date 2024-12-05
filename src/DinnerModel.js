import { searchSongs, getSongDetails } from "./songSource";
import { resolvePromise } from "./resolvePromise";


/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
const model = {  
    currentDishId: null,  // null means "intentionally empty"
    searchParams: {},
    searchResultsPromiseState: {},
    currentSongId: null,
    clientId: null,
    lang: "fr",

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
        console.log('Setting songID');
        if(songId && this.currentSongId != songId ) resolvePromise(getSongDetails(songId),this.currentDishPromiseState);
        this.currentSongId = songId;
        
    },

};

export {model};
