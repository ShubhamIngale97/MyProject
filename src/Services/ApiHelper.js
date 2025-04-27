import { makeApiCall } from "./Call"

export const syncDownload = (url,callback) => {
    console.log("url "+url);
    
    makeApiCall(url,'GET',{},(flag,response)=> {
        callback(flag,response)
    })
}