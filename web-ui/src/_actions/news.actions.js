import { newsConstants } from '../_constants'

// Rough implementation. Untested.
function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout( function() {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

export function fetchNews () {
    console.log("FETCHING NEWS")
    return function (dispatch) {
        // fetch('https://jsonplaceholder.typicode.com/posts')
        timeout(5000, fetch(`http://absheth-dev.grnoc.iu.edu:5000/top_headlines`))
            .then(res => res.json())
            .then(news => dispatch({
                type: newsConstants.GET_NEWS,
                payload: news
            })
            ).catch(error => console.log('News Fetch: TIME OUT'));
    }
}
