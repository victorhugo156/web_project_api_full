import { BASE_URL } from "./auth";

export class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _getHeaders(){
        //const token = getJwtFromLocalStorage()

        let authHeaders = {}

        if(this._accessToken){
            authHeaders = {
                Authorization: `Bearer ${this._accessToken}`
            }
        }

        return{
            ...this._headers,
            ...authHeaders
        }
    }

    _refreshToken() {
        return fetch(`${this._baseUrl}/refresh`, {
            method: "POST",
            headers: this._headers,
            credentials: "include",
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }

    async _fetchWithRefresh(url, options) {
        const response = await fetch(url, options);

        // Only refresh when the access token failed. Do not read response.json()
        // here — that belongs to getUserInfo / addNewCard after a success.
        if (response.status !== 401) {
            return response;
        }

        const refreshResponse = await this._refreshToken();
        this.setAccessToken(refreshResponse.token);

        return fetch(url, {
            ...options,
            credentials: "include",
            headers: this._getHeaders(),
        });
    }

    setAccessToken(token){
        this._accessToken = token
    }

    refresh() {
        return this._refreshToken().then((data) => {
            this.setAccessToken(data.token);
            return data.token;
        });
    }
  
    getUserInfo() {
        return this._fetchWithRefresh(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders(),
            credentials: 'include'
        })
        .then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    getInitialCards(){
        return this._fetchWithRefresh(`${this._baseUrl}/cards`, {
            headers: this._getHeaders(),
            credentials: 'include'
        })
        .then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    getInitialData(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    updateUserInfo(name, description){
        return this._fetchWithRefresh(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._getHeaders(),
            credentials: 'include',
            body: JSON.stringify({
              name: name,
              about: description
            })
        }).then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
          });
    }

    updateUserAvatar(avatar){
        return this._fetchWithRefresh(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._getHeaders(),
            credentials: 'include',
            body: JSON.stringify({
              avatar: avatar
            })
        }).then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }
    addNewCard(name, link){
        return this._fetchWithRefresh(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._getHeaders(),
            credentials: 'include',
            body: JSON.stringify({
              name: name,
              link: link
            })
        }).then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    deleteCard(cardId){
        return this._fetchWithRefresh(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._getHeaders(),
            credentials: 'include'
        }).then(res =>{
            if(res.ok){
                return { "message": "Card has been deleted" }
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

changeLikeCardStatus(cardId, isCurrentlyLiked){
    return this._fetchWithRefresh(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: isCurrentlyLiked ? "DELETE" : "PUT",
        headers: this._getHeaders(),
        credentials: 'include'
    }).then(res =>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    })
    
  }

    logout() {
        return this._fetchWithRefresh(`${this._baseUrl}/logout`, {
            method: "POST",
            headers: this._getHeaders(),
            credentials: "include",
        }).then((res) => {
            if (res.ok || res.status === 204) {
                this.setAccessToken(null);
                return res;
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }
}



export const api = new Api({
    baseUrl: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});