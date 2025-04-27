import { Axios } from "axios"

export const makeApiCall = async (url, method = 'GET', request = {}, callback, extraHeaders = {}) => {
    try {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(
                    '[Success][url]' +
                    url +
                    '[Respons]' +
                    JSON.stringify(data),
                );
                callback(true, data)
            }
            )
            .catch(error => {
                console.log(
                    '[error][url]' +
                    url +
                    '[Respons]' +
                    JSON.stringify(error),
                );
                callback(false, error)
            }
            );
    } catch (error) {
        console.log(
            '[catch error][url]' +
            url +
            '[Respons]' +
            JSON.stringify(error),
        );
        callback(false, error)
    }
};