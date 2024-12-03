import { PROXY_KEY, PROXY_URL } from "./apiConfig";

export function searchDishesACB(result) {

    if (result.status != 200) throw new Error('Invalid request!');
    return result.json();

}

export function parseResultsACB(result) {
    return result.results;
}

export function processDishDetailsACB(result) {
    return result[0];
}

export function searchDishes(searchParams) {

    const searchParamsObj = new URLSearchParams(searchParams);

    const searchParamsParsed = searchParamsObj.toString();

    const url = PROXY_URL + '/recipes/complexsearch?' + searchParamsParsed;
    const options = {
        method: 'GET',
        headers: {
            'X-DH2642-Key': PROXY_KEY,
            'X-DH2642-Group': '125'
        }
    };

    try {
        return fetch(url, options).then(searchDishesACB).then(parseResultsACB);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get dishes');
        
    }

    

}

export function getMenuDetails(ids_array) {

    ids_array = { ids: ids_array };

    const searchParamsObj = new URLSearchParams(ids_array);

    const searchParamsParsed = searchParamsObj.toString();

    const url = PROXY_URL + '/recipes/informationBulk?' + searchParamsParsed;

    console.log('url', url);

    const options = {
        method: 'GET',
        headers: {
            'X-DH2642-Key': PROXY_KEY,
            'X-DH2642-Group': '125'
        }
    }

    try {
        return fetch(url, options).then(searchDishesACB);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get dishes');
        
    }

}

export function getDishDetails(id) {
   return getMenuDetails([id]).then(processDishDetailsACB);
}