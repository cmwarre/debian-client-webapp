import axios from 'axios';
import router from '../router';

function get(uri, onSuccess, onFailure){
    return axios.get(
        uri,
        {
            auth: {username: localStorage.getItem("username"), password: localStorage.getItem("password")}
        }
    ).then(response => {
        onSuccess ? onSuccess(response) : null;
    }).catch(e => {
        onFailure ? onFailure(e) : defaultErrorHandler(e);
    });
}

function post(uri, data, onSuccess, onFailure){
    return axios.post(
        uri,
        data,
        {
            auth: {username: localStorage.getItem("username"), password: localStorage.getItem("password")}
        },
    ).then(response => {
        onSuccess ? onSuccess(response) : null;
    }).catch(e => {
        onFailure ? onFailure(e) : defaultErrorHandler(e);
    });
}

function defaultErrorHandler(error){
    console.log(error);
    if(error.status == 403){
        router.props.history.push("/login");
    }
}

export function login(username, password, onSuccess, onFailure){
    return axios.post(
        "/api/login",
        {},
        {
            auth: {username: username, password: password}
        }
    ).then( response => {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        return onSuccess(response);
    }).catch(onFailure);
}

export function getSettings(onSuccess, onFailure){
    return get("/api/", onSuccess, onFailure);
}

export function postSettings(data, onSuccess, onFailure){
    return post("/api/", data, onSuccess, onFailure);
}

export function getNetworkSettings(onSuccess, onFailure){
    return get("/api/network", onSuccess, onFailure);
}

export function postNetworkSettings(data, onSuccess, onFailure){
    return post("/api/network", data, onSuccess, onFailure);
}

export function getIgnitionSettings(onSuccess, onFailure){
    return get("/api/ignition", onSuccess, onFailure);
}

export function postIgnitionSettings(data, onSuccess, onFailure){
    return post("/api/ignition", data, onSuccess, onFailure);
}

export function getNTPSettings(onSuccess, onFailure){
    return get("/api/ntp", onSuccess, onFailure);
}

export function postNTPSettings(data, onSuccess, onFailure){
    return post("/api/ntp", data, onSuccess, onFailure);
}



