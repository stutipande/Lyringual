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
    const reader = result.body.getReader(); // Access the ReadableStream and get the reader
    const decoder = new TextDecoder();     // To decode Uint8Array chunks into text
    let text = '';                         // To accumulate the data

    // Loop to read the stream
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break; // Exit the loop when the stream is done
        }
        text += decoder.decode(value, { stream: true }); // Decode the chunk and append it
    }
    console.log(text);

    // Extract the second document.write() content
    const matches = text.match(/document\.write\((JSON\.parse\(.*?\))\)/);
    let rawJsonString = '';
    if (matches && matches[1]) {
    // Extract the JSON.parse() part
    const jsonParsePart = matches[1];

    // Extract the string inside JSON.parse()
    const jsonStringMatch = jsonParsePart.match(/JSON\.parse\('(.+?)'\)/);
    
    if (jsonStringMatch && jsonStringMatch[1]) {
        // Unescape the JSON string
        rawJsonString = matches[1].replace("JSON.parse('", "").slice(0, -2);

        // Unescape the JSON string
        rawJsonString = rawJsonString
            .replace(/\\\\/g, "\\") // Unescape backslashes
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'");  // Unescape double quotes

        console.log(rawJsonString);
            
        rawJsonString = JSON.parse(rawJsonString);

        console.log('Extracted JSON:', rawJsonString);

        // You can now proceed to process the JSON as shown earlier
    } else {
        console.log('No JSON.parse content found.');
    }
    } else {
    console.log('No document.write with JSON.parse found.');
    }
    rawJsonString = rawJsonString.replace("<br>", "\n");
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawJsonString, 'text/html');

    // Extract the plain text from the parsed HTML
    const textContent = doc.body.textContent || doc.body.innerText;

    console.log(textContent);

    return textContent;
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