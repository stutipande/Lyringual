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
    user: {
        uid:null,
        email: null,
    },
    previousLang: null,
    lang: "en",
    testActivated: null,
    testResults: [],
    originalLyric: null,
    XP: {},

    setUser(user) {
        this.user = {
            uid: user.uid,
            email: user.email,
        };
    },

    setXP(xp) {
        this.XP = xp;
    },

    incrementXP() {
        this.XP[this.lang] = parseInt(this.XP[this.lang] ? this.XP[this.lang] : 0) + 1;
        this.XP = {...this.XP};
    },

    setTranslationTip(index) {
        this.originalLyric = this.currentSongPromiseState.data[0][index];
        this.currentSongPromiseState.data[0][index] = this.currentSongPromiseState.data[1][index];
        this.currentSongPromiseState.data = [...this.currentSongPromiseState.data];
    },

    removeTranslationTip(index) {
        this.currentSongPromiseState.data[0][index] = this.originalLyric;
        this.currentSongPromiseState.data = [...this.currentSongPromiseState.data];
    },

    startTest() {
        this.testActivated = true;
    },

    stopTest() {
        this.testActivated = false;
        this.testResults = [];
    },

    setTestResult(index, correct) {
        console.log('Setting', index, 'to', correct);
        this.testResults[index] = correct;
        this.testResults = [...this.testResults];
    },

    setClientId() {
        resolvePromise(getClientId(), this.searchResultsPromiseState);
    },

    setSearchQuery(query) {
        this.searchParams.query = query;
        this.searchParams = {...this.searchParams};
    },

    setSearchType(type) {
        this.searchParams.type = type;
        this.searchParams = {...this.searchParams};
    },

    doSearch() {
        console.log('Searching like crazy!');
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


getDashboardData() {
    return {
        email: this.user.email,
        XP: this.XP,
    };
},

};

export {model};
