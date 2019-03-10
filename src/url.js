
import RNFetchBlob from 'rn-fetch-blob';
const host = 'http://durak.iett.gov.tr/';
const headers = { Authorization: 'Basic YW5kcm9pZDpuVGFmUXhWRDZNZnBHS1hvbkVxQQ==' }
const requestConfig = RNFetchBlob.config({trusty: true})
export const busListOnStop = (stopID) => {
    const url = `https://api-mobiett.verisun.com:8443/mobiett/rest/busstops/code/${stopID}/buslines?cityId=1`
    return requestConfig.fetch('GET', url, headers).then(x => JSON.parse(x.data))
    
}

export const searchStopByText = (text) => {
    return requestConfig.fetch('GET', `${host}duraklar/${text}`, headers).then(x => x.json())
}