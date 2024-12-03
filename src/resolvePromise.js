export function resolvePromise(promise, promiseState) {

    if (!promise) return null;

    promiseState.promise = promise; //tracks which promise is currently being resolved
    promiseState.data = null; //holds resolved value of promise
    promiseState.error = null; //error, if promise is rejected

    function successACB(result) {

        if (promiseState.promise == promise) promiseState.data = result;
        // console.log('result', result);

    }

    function errorACB(error) {

        promiseState.error = error;

    }

    promise.then(successACB).catch(errorACB);
};