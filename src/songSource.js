import { GENIUS_ACCESS_TOKEN, GENIUS_CLIENT_ID, GENIUS_CLIENT_SERCRET, GENIUS_URL, PROXY_KEY, PROXY_URL_NEW } from "./apiConfig";
import { getLyrics, getSong, getSongById, searchSong } from 'genius-lyrics-api';

export function searchSongsACB(result) {

    if (result.status != 200) throw new Error('Invalid request!');
    return result.json();

}

export function parseResultsACB(result) {
    return result.results;
}

export async function processSongDetailsACB(result) {
    console.log(result);
    const reader = result.body.getReader();
    const decoder = new TextDecoder();    
    let text = '';                        

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        text += decoder.decode(value, { stream: true }); 
    }
    console.log(text);


    const matches = text.match(/document\.write\((JSON\.parse\(.*?\))\)/);
    let rawJsonString = '';
    if (matches && matches[1]) {

    const jsonParsePart = matches[1];

    const jsonStringMatch = jsonParsePart.match(/JSON\.parse\('(.+?)'\)/);
    
    if (jsonStringMatch && jsonStringMatch[1]) {
        rawJsonString = matches[1].replace("JSON.parse('", "").slice(0, -2);

        rawJsonString = rawJsonString
            .replace(/\\\\/g, "\\")
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'"); 

        console.log(rawJsonString);
            
        rawJsonString = JSON.parse(rawJsonString);

        console.log('Extracted JSON:', rawJsonString);

    } else {
        console.log('No JSON.parse content found.');
    }
    } else {
    console.log('No document.write with JSON.parse found.');
    }
    rawJsonString = rawJsonString.replace("<br>", "\n").replace(/\[.*?\]/g, '').replace("Powered by Genius", "");
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawJsonString, 'text/html');

    let textContent = doc.body.textContent || doc.body.innerText;

    textContent = textContent.split(/\r?\n/)

    const startIndex = textContent.findIndex(item => item.trim() !== "");

    textContent = textContent.slice(startIndex);


    return textContent.slice(0, textContent.length - 10);
}


export function getClientId() {

    const authorizeParamsObj = new URLSearchParams({
        client_id: GENIUS_CLIENT_ID,
        redirect_uri: 'https://lyringual.web.app',
        scope: 'me',
        state: 'login',
        response_type: 'code',
        grant_type: 'authorization_code'
    });

    const authorizeParamsParsed = authorizeParamsObj.toString();
    console.log('window', window);
    window.location.assign('https://api.genius.com/oauth/authorize'+authorizeParamsParsed);
    
}

export function searchSongs(searchParams, type) {

    console.log('Searching for songs..')

    console.log(searchParams);

    const options = {
        apiKey: GENIUS_ACCESS_TOKEN,
        title: type == 'title' ? searchParams : ' ',
        artist: type == 'artist' ? searchParams : ' ',
        optimizeQuery: true
    };

    console.log(options);

    return searchSong(options);

    

}

export function getSongDetails(id) {

    console.log('Getting lyrics..')

    const url = PROXY_URL_NEW + id + "/embed.js";
    const options = {
        method: 'GET',
        headers: {
            'X-DH2642-Key': PROXY_KEY,
            'X-DH2642-Group': '125'
        }
    };

    try {
        return fetch(url, options).then(processSongDetailsACB)
        .then((text) => {
            console.log("Decoded text:", text);
            return text;
        })
        .catch((error) => {
            console.error("Error fetching or processing song details:", error);
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get dishes');
        
    }

}

export function getDishDetails(id) {
   return getMenuDetails([id]).then(processDishDetailsACB);
}