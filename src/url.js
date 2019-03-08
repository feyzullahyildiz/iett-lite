
import RNFetchBlob from 'rn-fetch-blob';
const headers = { Authorization: 'Basic YW5kcm9pZDpuVGFmUXhWRDZNZnBHS1hvbkVxQQ==' }
const requestConfig = RNFetchBlob.config({trusty: true})
export const busListOnStop = (stopID) => {
    const url = `https://api-mobiett.verisun.com:8443/mobiett/rest/busstops/code/${stopID}/buslines?cityId=1`
    return requestConfig.fetch('GET', url, headers).then(x => JSON.parse(x.data))
    
}