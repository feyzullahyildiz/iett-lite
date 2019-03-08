
const headers = { Authorization: 'Basic YW5kcm9pZDpuVGFmUXhWRDZNZnBHS1hvbkVxQQ==' }
export const busListOnStop = (stopID) => {
    const url = `https://api-mobiett.verisun.com:8443/mobiett/rest/busstops/code/${stopID}/buslines?cityId=1`
    console.log('URL', url);
    // return fetch(url, {
    //     headers
    // })
    // return fetch(url, {
    //     headers
    // })
    
}