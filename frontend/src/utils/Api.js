import { getJwtFromLocalStorage } from "./token";


export class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    __getHeaders(){
        const token = getJwtFromLocalStorage()

        let authHeaders = {}

        if(token){
            authHeaders = {
                Authorization: `Bearer ${token}`
            }
        }

        return{
            ...this._headers,
            ...authHeaders
        }
    }
  
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this.__getHeaders()
        })
        .then(res =>{
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

    getInitialCards(id){
        return fetch(`${this._baseUrl}/cards`, {
            headers: this.__getHeaders()
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
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.__getHeaders(),
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
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.__getHeaders(),
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
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this.__getHeaders(),
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
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.__getHeaders()
        }).then(res =>{
            if(res.ok){
                return { "message": "Card has been deleted" }
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }

changeLikeCardStatus(cardId, isCurrentlyLiked){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: isCurrentlyLiked ? "DELETE" : "PUT",
        headers: this.__getHeaders()
    }).then(res =>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    })
    
  }
}

export const api = new Api({
    baseUrl: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json"
    }
});