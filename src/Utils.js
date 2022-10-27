import jwt_decode from "jwt-decode";

export function storeToken(token) {
    localStorage.setItem('TOKEN', token);
}

export function clearToken() {
    localStorage.removeItem('TOKEN');
}

export function getToken() {
    return localStorage.getItem('TOKEN');
}

export function getEmailFromToken() {
    return jwt_decode(getToken()).sub;
}